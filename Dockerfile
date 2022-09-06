from node:current-alpine

COPY package*.json ./

RUN npm install

COPY . .

ENV port=3000
ENV expressAppName='Cooking Match'

ENTRYPOINT ["node", "index.js"]

EXPOSE 3000
