
# 1. Use official Node.js image
FROM node:22-alpine

# 2. Set working directory inside container
WORKDIR /app

# 3. Copy package files
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy backend source code
COPY . .

# 6. Expose backend port
EXPOSE 5000

# 7. Start backend application
CMD ["npm", "run", "start"]

# Dockerfile = instructions to build an image.



# Docker image = packaged application.



# Docker container = running instance of that image.
