FROM node:18-alpine

# create app directory
WORKDIR /app

# copy package files first (better caching)
COPY package*.json ./

# install dependencies
RUN npm install

# copy remaining source code
COPY . .

# expose app port
EXPOSE 3000

# start application
CMD ["node", "index.js"]
