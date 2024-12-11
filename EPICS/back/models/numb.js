import mongoose from 'mongoose';

const MobileNumberSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, { timestamps: true });
export default mongoose.models.MobileNumber || mongoose.model('MobileNumber', MobileNumberSchema);