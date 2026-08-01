FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY server ./server
COPY src/data/products.json ./src/data/products.json
EXPOSE 3001
CMD ["node", "server/index.js"]
