FROM node:18-bullseye

WORKDIR /mysql

EXPOSE 3000

COPY . .


RUN npm install

CMD [ "npm","start" ]

