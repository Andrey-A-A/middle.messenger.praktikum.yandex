FROM --platform=linux/amd64 node:16.18.1-slim
WORKDIR /var/www/app
COPY . /var/www/app
CMD npm run start
EXPOSE 3000
