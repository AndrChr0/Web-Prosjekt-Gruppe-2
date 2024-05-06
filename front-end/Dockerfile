FROM node:21 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build


# FROM nginx:stable-alpine

# COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8082

CMD ["npm", "run", "serve"]
