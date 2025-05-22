FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Set longer fetch timeout to avoid network errors
RUN npm config set fetch-retries 5 \
    && npm config set fetch-retry-mintimeout 20000 \
    && npm config set fetch-retry-maxtimeout 120000 \
    && npm install

# Copy the rest of the app
COPY . .

# Optional: expose app port
EXPOSE 3000

# Start app
CMD ["npm", "run", "dev"]
