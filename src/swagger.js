const j2s = require('joi-to-swagger');
const tools = require('./tools/schemas');
const errors = require('./utils/errors');

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'VUTTR (Very Useful Tools to Remember) API',
    description: 'API to store and manage very useful tools to remember. Using it you can save, read and delete tools in database',
    version: '0.0.8',
  },
  servers: [
    {
      url: 'https://vuttr-6ew5k2dgka-uc.a.run.app/',
      description: 'production server',
    },
    {
      url: 'http://localhost:3000/',
      description: 'local server',
    },
  ],
  components: {
    schemas: {
      ObjectId: {
        type: 'string',
        format: 'hex',
        example: '54759eb3c090d83494e2d804',
      },
      Tool: j2s(tools.toolSchema).swagger,
      SavedTool: {
        allOf: [
          {
            type: 'object',
            properties: {
              id: {
                $ref: '#/components/schemas/ObjectId',
              },
            },
          },
          {
            $ref: '#/components/schemas/Tool',
          },
        ],
      },
      InvalidSchema: j2s(errors.invalidDetailsSchema).swagger,
    },
  },
  paths: {
    '/tools/{id}': {
      delete: {
        summary: 'Delete a tool from database',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Id of tool that must be deleted',
            schema: {
              $ref: '#/components/schemas/ObjectId',
            },
          },
        ],
        responses: {
          204: {
            description: 'Deleted successfully',
          },
        },
      },
    },
    '/tools': {
      post: {
        summary: 'Save a new tool in database',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Tool',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Returns the saved tools',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SavedTool',
                },
              },
            },
          },
          400: {
            description: 'Invalid tool schema has been informed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/InvalidSchema',
                },
              },
            },
          },
        },
      },
      get: {
        summary: 'Return a list with saved tools',
        description: 'This API return a list with saved tools. You can use the tag argument to filter tools that contains the informed tag',
        parameters: [
          {
            name: 'tag',
            in: 'query',
            required: false,
            description: 'Inform this param to filter tools by tag',
            schema: {
              type: 'string',
              example: 'planning',
            },
          },
        ],
        responses: {
          200: {
            description: 'A JSON array of saved tools',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/SavedTool',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = swaggerDocument;
