import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from "cors"
import User from './models/User.js';
import MobileNumber from './models/numb.js';
import { GoogleGenerativeAI } from "@google/generative-ai"
import dotenv from "dotenv"
import axios from 'axios';
// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
dotenv.config()
app.use(bodyParser.json());
app.use(cors())
// Connect to MongoDB
mongoose.connect(process.env.mongod_url, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true   
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Route to create a new user
app.post('/users', async (req, res) => {
    const { username, phone, caste, gender, age, categories, location,city,pincode,state, income, religion, education, domain } = req.body
    console.log(username, phone, caste, gender, age, categories, location, income, religion, education,domain)
    try {
        // Create a new user instance
        const newUser = new User({
            username,
            phone,
            caste,
            gender,
            age,
            categories,
            location,
            city,
            pincode,
            state,
            income,
            religion,
            education,
            domain
        });
        console.log(newUser)
        // Save the user to the database
        await newUser.save();

        // Log successful insertion of user
        console.log('User created successfully:', newUser);
        
        // Send response back to client
        res.status(201).json({ message: 'User created successfully', userId: newUser._id });
    } catch (error) {
        console.error('Error creating user:', error.message);
        
        // Handle duplicate key error for unique fields
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Duplicate key error: Username or Phone number already exists.' });
        }

        res.status(500).json({ error: error.message });

}});
//Route to send query to gemeni
// Route to send query to Gemini
app.post('/schemes', async (req, res) => {
    const { username, phone, caste, gender, age, categories, location, city, pincode, state, income, religion, education, domain } = req.body;

    const combinedString = `Caste: ${caste}, Gender: ${gender}, Age: ${age}, Categories: ${categories}, Location: ${location}, City: ${city}, State: ${state}, Income: ${income}, Religion: ${religion}, Education: ${education}, Domain: ${domain}`;

    // Output the result
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
            Occupational details should include occupation type (e.g., small farmer, tenant farmer, daily wage worker, salaried employee, entrepreneur) and any specific occupation-related needs (e.g., input subsidies, loans, or skill training). For education and skills, gather information on the current education level (e.g., illiterate, primary school, secondary school, higher education) and vocational training status (e.g., untrained, partially trained, fully trained). Once the profile is complete, analyze the user's details based on the seven divisions and identify all relevant government schemes. For each scheme, provide the name, eligibility criteria, benefits, amount/details (including specific numerical amounts or thresholds), and the implementing authority (e.g., Central Government, State Government, Ministry of Health). Include numerical thresholds for scheme eligibility, such as the Below Poverty Line (BPL) for those with an annual income less than ₹1,00,000, Economically Weaker Section (EWS) for incomes up to ₹8,00,000, and Middle-Income Group (MIG) for incomes between ₹2,50,001 and ₹12,00,000. Specify age-based categories (children, youth, working-age adults, and senior citizens), gender-specific schemes for women (e.g., pregnancy benefits), health-related categories like disability pension or chronic disease coverage, and occupational schemes for farmers, informal workers, and entrepreneurs. Lastly, include education-related schemes such as scholarships for students from families earning less than ₹2,50,000 annually and loan waivers or fee reimbursements for vocational courses.
            The details to the person are as follows:
            ${combinedString}`
        );

        // Extract the response text
        const responseText = result.response.text(); // Ensure this is the correct method to retrieve text

        // Log the response from AI
        console.log(responseText);

        // Send the response back to the client
        res.status(200).json({ message: "Schemes generated", schemes: responseText });

    } catch (error) {
        console.error('Error fetching schemes:', error.message);
        
        // Handle specific errors if necessary
        if (error.response) {
            // If there is a response from the AI service with error details
            return res.status(error.response.status).json({ error: error.response.data });
        }

        // General server error response
        res.status(500).json({ error: 'Failed to evaluate schemes' });
    }
});


// Route to add a mobile number for a user
app.post('/mobile-numbers', async (req, res) => {
    const { userId, mobileNumber } = req.body;
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});