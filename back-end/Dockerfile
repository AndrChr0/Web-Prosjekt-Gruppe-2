FROM node:18.13.0

RUN mkdir /app

WORKDIR /app

COPY . . 

RUN npm install

EXPOSE 5151

CMD ["npm", "start"]
