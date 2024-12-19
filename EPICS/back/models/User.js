import mongoose from 'mongoose';
import crypto from 'crypto';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    caste: {
        type: String // e.g., 'sc','st',etc
    },
    gender: {
        type: String, // e.g., 'Male', 'Female', 'Other'
        enum: ['male', 'female', 'others']
    },
    age: {
        type: String // e.g., '18-25', '26-35', etc.
    },
    categories: {
        type: String // e.g., 'Healthy', 'Chronic Illness', etc.
    },
    location: {
        type: String // e.g., 'urban','rular'
    },
    city: {
        type: String // e.g., 'urban','rular'
    },
    pincode: {
        type: String // e.g., 'urban','rular'
    },
    state: {
        type: String // e.g., 'urban','rular'
    },
    income: {
        type: String // e.g., 'urban','rular'
    },
    religion: {
        type: String // e.g., 'hindu','bhudist',etc
    },
    education: {
        type: String // e.g., 'High School', 'Bachelor's', etc.
    },
    domain: {
        type: String // e.g., 'High School', 'Bachelor's', etc.
    }
    
}, { timestamps: true });

// Method to set password
// UserSchema.methods.setPassword = function(password) {
//     this.salt = crypto.randomBytes(16).toString('hex');
//     this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
// };

// Method to validate password
// UserSchema.methods.validPassword = function(password) {
//     const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
//     return this.hash === hash;
// };
// Export the model
export default mongoose.models.User || mongoose.model('User', UserSchema);