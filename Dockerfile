# build environment
FROM node:13.12.0-alpine as build
ARG API_URL
ARG SPOTIFY_CLIENT_ID
ARG SPOTIFY_REDIRECT_URI
ENV REACT_APP_API_URL ${API_URL}
ENV REACT_APP_SPOTIFY_CLIENT_ID ${SPOTIFY_CLIENT_ID}}
ENV REACT_APP_SPOTIFY_REDIRECT_URI ${SPOTIFY_REDIRECT_URI}}
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --silent 
COPY . ./
RUN yarn build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
