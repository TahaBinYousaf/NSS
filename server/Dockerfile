FROM node:18.8.0-alpine AS build
WORKDIR ./app
COPY package.json ./
RUN npm install
COPY . .
CMD npm run start
