FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
COPY packages ./packages
COPY apps/dashboard ./apps/dashboard
RUN npm install
WORKDIR /app/apps/dashboard
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
