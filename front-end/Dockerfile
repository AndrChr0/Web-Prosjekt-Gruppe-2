FROM node:21 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build


EXPOSE 8082

CMD ["npm", "run", "serve"]
