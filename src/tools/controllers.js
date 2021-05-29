const mongoose = require('mongoose');
const models = require('./models');
const schemas = require('./schemas');
const errors = require('../utils/errors');

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
    result = await models.Tool.find({ tags: { $in: [tag] } }).exec();
  } else {
    result = await models.Tool.find().exec();
  }
  return result.map((tool) => formatTool(tool));
}

async function saveTool(toolData) {
  const validateResult = schemas.toolSchema.validate(toolData);

  if (validateResult.error !== undefined) {
    throw new errors.InvalidSchema('Tool', validateResult.error.details);
  }

  const tool = new models.Tool(toolData);
  await tool.validate();

  return formatTool(await tool.save());
}

async function deleteTool(toolId) {
  await models.Tool.findByIdAndDelete({ _id: new mongoose.Types.ObjectId(toolId) }).exec();
}

module.exports = { getTools, saveTool, deleteTool };
