const mongoose = require('mongoose');
const models = require('./models');
const schemas = require('./schemas');
const errors = require('../utils/errors');

/**
 * Format a tool object from mongoose to a valid style to return on response
 * @param {Tool} tool
 * @returns {object}
 */
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

/**
 * Get saved tools on database
 * @param {string} tag - tag name to  get tools with informed tag
 * @returns {Tool[]}
 */
async function getTools(tag = null) {
  let result = {};
  if (tag) {
    result = await models.Tool.find({ tags: { $in: [tag] } }).exec();
  } else {
    result = await models.Tool.find().exec();
  }
  return result.map((tool) => formatTool(tool));
}

/**
 * Save a tool on database
 * @param {object} toolData - tool object validated by toolSchema
 * @throws {InvalidSchema} - The toolData isn't valide with toolSchema
 * @see {@link toolSchema}
 * @throws {mongoose.Error.InvalidSchema} - Invalid mongoose schema
 * @returns {Tool} - saved tool
 * @see {@link Tool}
 */
async function saveTool(toolData) {
  const validateResult = schemas.toolSchema.validate(toolData);

  if (validateResult.error !== undefined) {
    throw new errors.InvalidSchema('Tool', validateResult.error.details);
  }

  const tool = new models.Tool(toolData);
  await tool.validate();

  return formatTool(await tool.save());
}

/**
 * Delete a tool from database
 * @param {string} toolId - The tool mongodb id
 */
async function deleteTool(toolId) {
  await models.Tool.findByIdAndDelete({ _id: new mongoose.Types.ObjectId(toolId) }).exec();
}

module.exports = { getTools, saveTool, deleteTool };
