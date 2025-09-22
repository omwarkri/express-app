# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first (caches npm install if unchanged)
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy the rest of the app
COPY . .

# Set environment variable for port
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "index.js"]

