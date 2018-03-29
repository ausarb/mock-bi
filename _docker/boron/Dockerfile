FROM node:boron
WORKDIR /usr/src
RUN git clone --depth=1 --branch master https://github.com/Mattersight/mock-bi.git apps/mock-bi
WORKDIR /usr/src/apps/mock-bi
RUN npm install --no-bin-links
EXPOSE 80
ENTRYPOINT ["node", "app"]
