#################################################
#                                               # 
#  This script runs the command "npm run test"  #
# in an environment sandbox with a mongodb      #
# instance for tests                            #
#                                               #           
#################################################

# RUN MONGO FOR TEST
docker run -it --rm --name=mongo_test -p 27017:27017 --tmpfs /data/db mongo:3.6 --storageEngine ephemeralForTest --nojournal --logpath /dev/null &

# RUN TESTS
npm run test