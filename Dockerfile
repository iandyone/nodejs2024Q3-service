FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --no-cache

ENV PORT=4000

EXPOSE $PORT

COPY . .

ENTRYPOINT [ "npm", "run", "start:dev" ]
