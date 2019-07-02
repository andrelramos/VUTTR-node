const mongoose = require("mongoose")

const Tool = mongoose.model("Tool", {
    title: {type: String, required: true},
    link: {type: String, required: true},
    description: {type: String, required: false},
    tags: [String]
})

module.exports = Tool