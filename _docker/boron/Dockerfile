FROM node:boron
WORKDIR /usr/src/apps/mock-bi
COPY ["app.js","package.json", "./"]
RUN npm install --no-bin-links
EXPOSE 80
ENTRYPOINT ["node", "app"]
