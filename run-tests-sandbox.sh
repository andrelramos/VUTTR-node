# SETTING TEST ENVS
 export MONGO_URI=mongodb://mongo:27017/vuttrtest

# RUN MONGO FOR TEST
docker run -it --rm --name=mongo_test -p 27017:27017 --tmpfs /data/db mongo:3.6 --storageEngine ephemeralForTest --nojournal --logpath /dev/null &

# RUN TESTS
npm run test