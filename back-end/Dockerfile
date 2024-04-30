FROM node:21

RUN mkdir /app

WORKDIR /app

COPY . . 

RUN pwd

RUN ls

RUN npm install

EXPOSE 8092

CMD ["npm", "start"]
