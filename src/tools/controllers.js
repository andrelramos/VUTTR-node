import Tool from "./models"

const controller = {}

controller.getAll = async () => {
    result = await Tool.find({}).exec()
    return result
}

controller.saveTool = async () => {
    const tool = new Tool({ title: 'Zildjian', link: 'haha', description: "bbbbb", tags: ["t", "a", "g"]})
    await tool.save()
    console.log('foi salvo')
}

export default controller