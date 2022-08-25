FROM node:16

WORKDIR /code

COPY package*.json ./
RUN npm install

# COPY <src> <dest>
COPY . .

EXPOSE 3000

CMD ["node", "index.js"]