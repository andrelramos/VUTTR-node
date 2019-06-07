import mongoose from "mongoose";

const Tool = mongoose.model("Tool", {
    title: String,
    link: String,
    description: String,
    tags: [String]
})

export default Tool