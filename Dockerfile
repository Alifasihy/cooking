from node:current-alpine

COPY package*.json ./

RUN npm install

COPY . .

ENV port=3000
ENV expressAppName='Cooking Match'
ENV db='mongodb://admin:nimda@database:27017'
ENV baseURL='https://cookingmatch.staging.geekology.ir'

ENTRYPOINT ["node", "index.js"]

EXPOSE 3000
