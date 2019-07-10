const mongoose = require("mongoose")
const Tool = require("./models.js")

async function getTools(tag = null) {
    let result = {}
    if(tag) {
        result = await Tool.find({"tags": {"$in": [tag]}}).exec()
    } else {
        result = await Tool.find().exec()
    }
    return result.map((tool) => {
        return formatTool(tool)
    })
}

async function saveTool(toolData) {  
    let tool = new Tool(toolData)
    return formatTool(await tool.save())
}

async function deleteTool(toolId) {
    Tool.findByIdAndDelete({"_id": new mongoose.Types.ObjectId(toolId)}).exec()
}

function formatTool(tool) {
    return {
        "tags": tool.tags,
        "id": tool._id,
        "title": tool.title,
        "link": tool.link,
        "description": tool.description,
    }
}

module.exports = {getTools, saveTool, deleteTool}