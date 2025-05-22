# Use official Node.js LTS Alpine image for a small image size
FROM node:18.8.0-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and yarn.lock for dependency installation caching
COPY package.json yarn.lock* ./

# Install dependencies using yarn
RUN yarn install --frozen-lockfile

# Copy rest of the app code
COPY . .

# Expose port 5001 (as per your server config)
EXPOSE 5001

# Start the server using npm start script
CMD ["npm", "run", "start"]
