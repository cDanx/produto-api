FROM node:16

WORKDIR /user/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 13000
CMD ["npm", "run", "dev"]
