# Base image
FROM node:20-alpine

# Workdir
WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install production deps
RUN npm ci --only=production

# Copy app source
COPY . .

# Expose port
ENV PORT=3000
EXPOSE 3000

# Start app
CMD ["node", "index.js"]
