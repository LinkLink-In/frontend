FROM node:18-alpine
WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

EXPOSE 5000
ENV PORT=5000
ENV HOST=0.0.0.0

CMD [ "node", "build" ]
