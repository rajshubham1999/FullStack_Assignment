const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    episodes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "episodes",
    }]
});

module.exports = mongoose.model("projects", projectSchema);
