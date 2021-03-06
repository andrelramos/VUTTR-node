FROM launcher.gcr.io/google/nodejs

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install depedencies
RUN npm install --only=prod

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run app.js when the container launches
CMD ["npm", "run", "start"]