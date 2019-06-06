import mongoose from "mongoose";
mongoose.connect('mongodb://localhost:27017/test')

const Tool = mongoose.model("Tool", {
    title: String,
    link: String,
    description: String,
    tags: [String]
})