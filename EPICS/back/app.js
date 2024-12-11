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
    const { username, phone, caste, gender, age, categories, location, income, religion, education ,domain} = req.body;
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
app.post('/schemes', async (req, res) => {
    const { username, phone, caste, gender, age, categories, location, income, religion, education, domain } = req.body;
    const combinedString = `Username: ${username}, Phone: ${phone}, Caste: ${caste}, Gender: ${gender}, Age: ${age}, Categories: ${categories}, Location: ${location}, Income: ${income}, Religion: ${religion}, Education: ${education}, Domain: ${domain}`;

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

    // Create the message string with proper formatting
    

    try {
        // Send the message to the AI model
        let result = await chat.sendMessage(
            `You are an AI system that evaluates the eligibility of individuals for government schemes in India. 
            Based on the provided user details, categorize the individual into relevant divisions and generate 
            a list of all the government schemes they are eligible for. The details are given below:
            ${combinedString} just give the scheme name info and link nothing else like warning etc`
        );

        // Log the result and respond to the client
        result=(result.response.text());
        console.log(result)
        res.status(200).json({ schemes: result.response.text() });
    } catch (error) {
        console.error('Error fetching schemes:', error);
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