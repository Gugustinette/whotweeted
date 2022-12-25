# Dockerfile for NestJS
FROM node:latest

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose port 5174
EXPOSE 5174

# Run the app
CMD [ "npm", "run", "dev" ]
