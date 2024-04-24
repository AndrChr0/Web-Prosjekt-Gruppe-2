const mongoose = require("mongoose");
const courseSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 100,
        },
        description: {
            type: String,
            default: "Give this course a description.."
        },
        courseCode: { //IDG2001 f.ex
            type: String,
            required: true,
            minLength: 4,
            maxLength: 10,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true

        },
    },
    {
        timestamps: true,
    });


module.exports = mongoose.model("Course", courseSchema);