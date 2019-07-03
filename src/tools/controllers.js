const mongoose = require("mongoose")
const Tool = require("./models.js")

async function getTools(tag = null) {
    let result = {}
    if(tag) {
        result = await Tool.find({"tags": {"$in": [tag]}}).exec()
    } else {
        result = await Tool.find().exec()
    }
    return result
}

async function saveTool(toolData) {  
    let tool = new Tool(toolData)
    return await tool.save()
}

async function deleteTool(toolId) {
    return await Tool.findByIdAndDelete({"_id": new mongoose.Types.ObjectId(toolId)}).exec()
}

module.exports = {getTools, saveTool, deleteTool}