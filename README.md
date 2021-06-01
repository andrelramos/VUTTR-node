# VUTTR (Very Useful Tools To Remember)
It's a simple microservice to save details of useful tools.

It's a BossaBox chalenge to back-end developers.
# How to execute
## Environment
- This repository has been developed using node 10.16.0. You can select this version using [nvm](https://github.com/nvm-sh/nvm).
- You will need run mongodb 3.6 on localhost. You can use the below docker command to run it on a container:
```
  docker run -it --rm --name=vuttr -p 27017:27017 -v $(pwd)/vuttr:/data/db mongo:3.6
```
- Install the node dependencies using npm i on project root

## npm scripts
- npm run start: Run the application on port 3000
- npm run lint: Run the lint checker on folders src/ and tests/
- npm run test: Run unit test suite
- npm run build:docs: Generate a code documentation on out/ path

## Tests
You can execute the `run-tests-sandbox.sh` to run the test suite and start a mongodb container configured to run tests and to doesn't persist the data after stoped.

### Coverage
The command npm run test executes the nyc coverage checker to calculate the test coverage. It'll raise an error if the coverage is lower than 95%.

# Swagger
This project uses swaggerUI to generate a swagger dashboard at route /api-docs. The base file used to generate it is `src/swagger.js`.

The components are generated from Joi schemas of each module.

# Schemas
All data schema is generated using the Joi lib. The schemas is used to validate the requests data on APIs and to generate mongoose models.

# Pre-commit
This project uses github hooks to runs some lint validations before each commit.

# CI/CD
All lint validations and unit tests will be executed on Pull requests. The merge only will allowed if all validations are passing.

When a code is pushed to the master branch the CD pipeline will be trigged and the belows steps will be executed:
- Create a github release based on version of package.json
- Build a docker image based on `Dockerfile`
- Deploy on Google Cloud Run and inject production secrets stored on github secrets

# Production
You can try the application running on production environment [clicking here](https://vuttr-6ew5k2dgka-uc.a.run.app/).