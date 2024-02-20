FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE $PORT
ENV MONGO_HOST=mongo

CMD npm start
