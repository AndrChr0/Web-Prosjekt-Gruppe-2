const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
    {
        content: {
            type: String,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    });

module.exports = mongoose.model("Notification", notificationSchema);