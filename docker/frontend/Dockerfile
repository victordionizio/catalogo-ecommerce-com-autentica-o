FROM node:20-bookworm-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit

COPY . .

EXPOSE 5173

ENV VITE_API_URL=http://localhost:8080/api

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
