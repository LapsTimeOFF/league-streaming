FROM node:18

RUN mkdir -p /app
WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm ci
COPY . /app
RUN npm run build

EXPOSE 80

ENV PORT=80

CMD ["npm", "run", "start"]