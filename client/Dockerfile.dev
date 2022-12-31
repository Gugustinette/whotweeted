# Dockerfile for vite + vue3 + typescript
FROM node:latest

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose port 5173
EXPOSE 5173
# Expose port 9002
EXPOSE 9002

# Run the app
CMD [ "npm", "run", "dev" ]
