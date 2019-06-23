import { Types } from "mongoose"
import Tool from "./models"

export async function getTools(tag = null) {
    let result = {}
    console.log(tag)
    try {
        if(tag) {
            result = Tool.find({"tags": {"$in": [tag]}}).exec()
        } else {
            result = Tool.find().exec()
        }
    } catch(e) {
        console.log(e)
        result = {"error": "Wasn't possible to find tools."}
    }
    return result
}

export async function saveTool(toolData) {  
    let result = {}

    try {
        let tool = new Tool(toolData)
        result = await tool.save()
    } catch(e) {
        console.log(e)
        result = {"error": "Wasn't possible save the new tool."}
    }

    return result
}

export async function deleteTool(toolId) {
    let result = {}

    try {
        result = Tool.findByIdAndDelete({"_id": new Types.ObjectId(toolId)}).exec()
    } catch(e) {
        console.log(e)
        result = {"error": "Wasn't possible save the new tool."}
    }

    return result
}