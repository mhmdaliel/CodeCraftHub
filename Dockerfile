FROM node:14 AS build

# Set the working directory
WORKDIR /user-service/src/app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application (if applicable)
RUN npm run build

# Use a lightweight web server to serve the application
FROM nginx:alpine
COPY --from=build /user-service/src/app/build

# Expose port 80 for the web server
EXPOSE 5000

# Start the NGINX server
CMD ["node", "src/server.js"]

# MongoDB setup
FROM mongo:latest

# Expose the default MongoDB port
EXPOSE 27017

# Set environment variables for MongoDB (optional)
ENV MONGO_INITDB_ROOT_USERNAME=root
ENV MONGO_INITDB_ROOT_PASSWORD=example

# Use Docker Compose to link the application and MongoDB