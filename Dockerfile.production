FROM node:18-alpine3.15

WORKDIR /usr/src/app

COPY . .

RUN npm install -g @nestjs/cli

RUN npm ci

CMD ["npm", "run", "start:dev"]
