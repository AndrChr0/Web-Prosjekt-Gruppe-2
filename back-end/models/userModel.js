import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // har installert package "npm install bcryptjs" 

const userSchema = mongoose.Schema({
    email: {
         type: String, 
         unique: true, 
         required: true 
        },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, enum: ['teacher', 'student'], 
        required: true 
    },
},
{
  timestamps: true,
});

export const User = mongoose.model('User', userSchema);
/* module.exports = User; */

// Hashes the password before saving the user model.. funker ikke enda
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        return next(error);
    }
});