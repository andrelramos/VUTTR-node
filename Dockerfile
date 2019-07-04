FROM launcher.gcr.io/google/nodejs

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install depedencies
RUN npm i

# Make port 3000 available to the world outside this container
EXPOSE 300

# Define environment variable
COPY local.env env.env
RUN source /env.env

# Run app.py when the container launches
CMD ["npm", "run", "start"]