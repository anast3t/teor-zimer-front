FROM node:latest as develop-stage
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY ./ .

FROM develop-stage as build-stage
RUN yarn build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
