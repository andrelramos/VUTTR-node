const mongoose = require('mongoose');
const Tool = require('./models');

function formatTool(tool) {
  return {
    tags: tool.tags,
    /* eslint no-underscore-dangle: 0 */
    id: tool._id,
    title: tool.title,
    link: tool.link,
    description: tool.description,
  };
}

async function getTools(tag = null) {
  let result = {};
  if (tag) {
    result = await Tool.find({ tags: { $in: [tag] } }).exec();
  } else {
    result = await Tool.find().exec();
  }
  return result.map((tool) => formatTool(tool));
}

async function saveTool(toolData) {
  const tool = new Tool(toolData);
  await tool.validate();

  return formatTool(await tool.save());
}

async function deleteTool(toolId) {
  await Tool.findByIdAndDelete({ _id: new mongoose.Types.ObjectId(toolId) }).exec();
}

module.exports = { getTools, saveTool, deleteTool };
