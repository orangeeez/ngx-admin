#STAGE 1
FROM node:16.10 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN mkdir dist
RUN npm install
RUN npm install -g @angular/cli@12.1.0
COPY . .
RUN npm run build:prod

#STAGE 2
FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html