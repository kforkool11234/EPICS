import { GoogleGenerativeAI } from "@google/generative-ai";
import cron from "node-cron";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";  // Adjust the path if needed

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.mongod_url, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true   
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define the prompt for the Gemini API.
const prompt = `
Please provide government schemes, divided into the following categories with appropriate details:

1. BPL Children (income < 1,00,000, age < 18)
2. BPL Working-Age with Health Issues (income < 1,00,000, 18<=age<=60, with any health issue)
3. BPL Working-Age Healthy (income < 1,00,000, 18<=age<=60, no health issues)
4. BPL Senior Citizens (income < 1,00,000, age > 60)
5. EWS Children (income 1,00,000 to 8,00,000, age < 18)
6. EWS Working-Age (income 1,00,000 to 8,00,000, 18<=age<=60)
7. EWS Senior Citizens (income 1,00,000 to 8,00,000, age > 60)
8. MIG and Special Cases (income > 8,00,000)

For each category, list all available schemes, eligibility criteria, benefits provided, and any additional relevant details in json format only so i can format it furthur also no need to tell additional stuff like live details are not available this is just for testing give category number also in json.
`;

// Helper function to remove markdown code block markers.
function cleanResponseText(text) {
  return text.replace(/```json\s*/, "").replace(/\s*```$/, "").trim();
}

// Helper function to extract a JSON block (array or object) from text.
function extractJson(text) {
  // Try to extract a JSON array.
  const arrayMatch = text.match(/(\[.*\])/s);
  if (arrayMatch) {
    return arrayMatch[1];
  }
  // Otherwise, try to extract a JSON object.
  const objectMatch = text.match(/(\{.*\})/s);
  if (objectMatch) {
    return objectMatch[1];
  }
  return text;
}

// Function to send the Gemini API prompt and augment the JSON response with phone numbers.
async function sendGeminiPrompt() {
  // Initialize the Gemini client.
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  // Start a chat session.
  const chat = model.startChat({
    history: [
      { role: "user", parts: [{ text: "Hello" }] },
      { role: "model", parts: [{ text: "Great to meet you. What would you like to know?" }] },
    ],
  });

  try {
    // Send the prompt and retrieve the response text.
    const result = await chat.sendMessage(prompt);
    let responseText = result.response.text();
    console.log("Original Gemini Response:\n", responseText);
    
    // Clean and extract the JSON part.
    responseText = cleanResponseText(responseText);
    responseText = extractJson(responseText);
    console.log("Extracted JSON Text:\n", responseText);
    
    // Parse the JSON.
    let parsedJson;
    try {
      parsedJson = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse extracted JSON:", parseError);
      return;
    }
    
    // Determine if parsedJson is an array or an object with a 'schemes' property.
    let schemesArray = [];
    if (Array.isArray(parsedJson)) {
      schemesArray = parsedJson;
    } else if (parsedJson.schemes && Array.isArray(parsedJson.schemes)) {
      schemesArray = parsedJson.schemes;
    } else {
      console.error("Parsed JSON does not have the expected format (array or object with 'schemes').");
      return;
    }
    
    // For each scheme, query the database for matching users and attach their phone numbers.
    for (const scheme of schemesArray) {
      const categoryNumber = Number(scheme.category);
      const matchedUsers = await User.find({ category: categoryNumber });
      const phoneNumbers = matchedUsers.map(user => user.phone);
      scheme.phoneNumbers = phoneNumbers;
      
      // Log the category and phone numbers.
      console.log(`Category: ${scheme.category} - Phone Numbers: ${phoneNumbers.join(", ")}`);
    }
    
    // Log the augmented JSON.
    console.log("Augmented Schemes JSON:\n", JSON.stringify(schemesArray, null, 2));
    
  } catch (error) {
    console.error("Error calling Gemini API:", error);
  }
}

// Scheduler to run the Gemini prompt every 2 minutes.
export function startScheduler() {
  cron.schedule("*/2 * * * *", () => {
    console.log("Gemini API prompt triggered (every 2 minutes).");
    sendGeminiPrompt();
  });
  
  console.log("Scheduler started. The Gemini API prompt will be sent every 2 minutes for testing.");
}
