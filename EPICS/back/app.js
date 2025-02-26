import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from "cors";
import User from './models/User.js';
import MobileNumber from './models/numb.js';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { startScheduler } from './weekly.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
dotenv.config();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.mongod_url, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true   
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Rule-Based Categorization Function (returns only the category number)
function assignCategory(income, age) {
    // Convert income and age to numbers (in case they're passed as strings)
    const annualIncome = Number(income);
    const userAge = Number(age);

    let incomeGroup;
    if (annualIncome < 100000) {
        incomeGroup = "BPL";
    } else if (annualIncome >= 100000 && annualIncome <= 800000) {
        incomeGroup = "EWS";
    } else {
        incomeGroup = "MIG";
    }

    let ageGroup;
    if (userAge < 18) {
        ageGroup = "Children";
    } else if (userAge > 60) {
        ageGroup = "Senior Citizens";
    } else {
        ageGroup = "Working Age";
    }

    // Determine final category based on incomeGroup and ageGroup
    if (incomeGroup === "BPL") {
        if (ageGroup === "Children") {
            return 1; // Category 1: BPL Children
        } else if (ageGroup === "Working Age") {
            return 3; // Category 3: BPL Working-Age Healthy
        } else if (ageGroup === "Senior Citizens") {
            return 4; // Category 4: BPL Senior Citizens
        }
    } else if (incomeGroup === "EWS") {
        if (ageGroup === "Children") {
            return 5; // Category 5: EWS Children
        } else if (ageGroup === "Working Age") {
            return 6; // Category 6: EWS Working-Age
        } else if (ageGroup === "Senior Citizens") {
            return 7; // Category 7: EWS Senior Citizens
        }
    } else { // MIG and Special Cases
        return 8; // Category 8: MIG and Special Cases
    }
}

// Route to create a new user with categorization
app.post('/users', async (req, res) => {
    const { username, phone, caste, gender, age, location, city, pincode, state, income, religion, education, domain } = req.body;
    console.log(username, phone, caste, gender, age, location, income, religion, education, domain);

    try {
        // Calculate the assigned category (number) using the rule-based function
        const assignedCategory = assignCategory(income, age);

        // Create a new user instance, including the assigned category field
        const newUser = new User({
            username,
            phone,
            caste,
            gender,
            age,
            location,
            city,
            pincode,
            state,
            income,
            religion,
            education,
            domain,
            category: assignedCategory  // saving the computed category number
        });
        console.log(newUser);
        
        // Save the user to the database
        await newUser.save();

        // Log successful insertion of user
        console.log('User created successfully:', newUser);
        
        // Send response back to client
        res.status(201).json({ message: 'User created successfully', userId: newUser._id, category: assignedCategory });
    } catch (error) {
        console.error('Error creating user:', error.message);
        
        // Handle duplicate key error for unique fields
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Duplicate key error: Username or Phone number already exists.' });
        }
        res.status(500).json({ error: error.message });
    }
});

// Route to send query to Gemini for scheme evaluation
app.post('/schemes', async (req, res) => {
    const { username, phone, caste, gender, age, categories, location, city, pincode, state, income, religion, education, domain } = req.body;
    const combinedString = `Caste: ${caste}, Gender: ${gender}, Age: ${age}, Categories: ${categories}, Location: ${location}, City: ${city}, State: ${state}, Income: ${income}, Religion: ${religion}, Education: ${education}, Domain: ${domain}`;
    
    // Output the combined details
    console.log(combinedString);
    
    // Initialize Google Generative AI
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Start a chat session
    const chat = model.startChat({
        history: [
            {
                role: "user",
                parts: [{ text: "Hello" }]
            },
            {
                role: "model", 
                parts: [{ text: "Great to meet you. What would you like to know?" }]
            },
        ],
    });
    
    try {
        // Create the message string with proper formatting
        let result = await chat.sendMessage(
            `You are an AI system tasked with evaluating the eligibility of individuals for government schemes in India. Based on the provided user details, categorize the individual into relevant divisions and generate a list of all the government schemes they are eligible for. The input details include economic, social, gender, age, health, occupational, and educational information. For economic details, include annual family income (e.g., ₹1,00,000, ₹2,50,000, ₹8,00,000) and whether the individual lives in an urban or rural area (e.g., urban slum, rural village). For social details, gather information
            on caste category (General, SC, ST, OBC, NT/DNT) and religious affiliation (Hindu, Muslim, Christian, Sikh, Buddhist, Jain, Parsi, etc.). Gender (Male, Female, or transgender) and exact age are also required, along with details about health status such as any physical or mental disabilities (Divyangjan), chronic illnesses (e.g., cancer, diabetes), communicable diseases (e.g., TB, HIV/AIDS), or maternal and child health needs (e.g., pregnancy or lactation).
            Occupational details should include occupation type (e.g., small farmer, tenant farmer, daily wage worker, salaried employee, entrepreneur) and any specific occupation-related needs (e.g., input subsidies, loans, or skill training). For education and skills, gather information on the current education level (e.g., illiterate, primary school, secondary school, higher education) and vocational training status (e.g., untrained, partially trained, fully trained). Once the profile is complete, analyze the user's details based on the seven divisions and identify all relevant government schemes. For each scheme, provide the name, eligibility criteria, benefits, amount/details (including specific numerical amounts or thresholds), and the implementing authority (e.g., Central Government, State Government, Ministry of Health). Include numerical thresholds for scheme eligibility, such as the Below Poverty Line (BPL) for those with an annual income less than ₹1,00,000, Economically Weaker Section (EWS) for incomes up to ₹8,00,000, and Middle-Income Group (MIG) for incomes between ₹2,50,001 and ₹12,00,000. Specify age-based categories (children, youth, working-age adults, and senior citizens), gender-specific schemes for women (e.g., pregnancy benefits), health-related categories like disability pension or chronic disease coverage, and occupational schemes for farmers, informal workers, and entrepreneurs. Lastly, include education-related schemes such as scholarships for students from families earning less than ₹2,50,000 annually and loan waivers or fee reimbursements for vocational courses. Also give the results in English and then in Hindi.
            The details to the person are as follows:
            ${combinedString}`
        );
    
        // Extract the response text from the AI result
        const responseText = result.response.text();
    
        // Log the AI response
        console.log(responseText);
    
        // Send the response back to the client
        res.status(200).json({ message: "Schemes generated", schemes: responseText });
    
    } catch (error) {
        console.error('Error fetching schemes:', error.message);
        if (error.response) {
            return res.status(error.response.status).json({ error: error.response.data });
        }
        res.status(500).json({ error: 'Failed to evaluate schemes' });
    }
});

// Route to add a mobile number for a user
app.post('/mobile-numbers', async (req, res) => {
    const { userId, mobileNumber } = req.body;
    // Implementation for saving mobile numbers goes here...
});

startScheduler();

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
