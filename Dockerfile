FROM node:16.18.1-slim
WORKDIR /var/www/app
COPY . .
CMD npm run server
EXPOSE 3000