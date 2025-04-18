FROM node:22.13.1

WORKDIR /app

COPY package*.json .

RUN npm i

COPY . .

RUN npm run build

COPY dist ./dist

RUN npx prisma generate

COPY src/images ./dist/src/images

EXPOSE 3000

CMD [ "npm", "start" ]