FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .
ENV NODE_ENV=development
CMD [ "npm" ,"start"]
