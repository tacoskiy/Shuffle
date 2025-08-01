FROM node:18

WORKDIR /container-frontend

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 6060

CMD ["npm", "run", "dev"]