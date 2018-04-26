FROM node:boron
COPY . /usr/src/
WORKDIR /usr/src/apps/mock-bi
RUN npm install --no-bin-links
EXPOSE 80
ENTRYPOINT ["node", "app"]
