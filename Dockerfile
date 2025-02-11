FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# For Production
# RUN npm install --only=production

COPY . .
EXPOSE 8080
CMD ["npm","start"]