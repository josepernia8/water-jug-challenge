FROM node:16-alpine

EXPOSE 3000 4000

WORKDIR /app

COPY . ./

RUN chown -R node:node /app

USER node

RUN npm ci

CMD ["npm", "run", "dev"]