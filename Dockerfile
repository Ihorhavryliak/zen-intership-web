FROM node:19.6.1-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

COPY ./build ./build

CMD ["yarn", "run", "dev"]