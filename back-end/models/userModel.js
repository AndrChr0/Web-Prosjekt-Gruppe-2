import mongoose from 'mongoose';

// import bcrypt from 'bcryptjs'; // Temporarily disabled for development speed

const userSchema = new mongoose.Schema({
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
/* - Temporarily disable password hashing middleware for development speed
// module.exports = User;

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
*/
export const User = mongoose.model('User', userSchema); // Moved