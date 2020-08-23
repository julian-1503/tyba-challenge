FROM node:12

RUN mkdir /myapp

EXPOSE 3000

WORKDIR /myapp

ADD . /myapp

RUN apt-get update && apt-get install -y build-essential && apt-get install -y python && npm install

ENV NODE_ENV=production
ENV PORT=3000
ENV DATABASE_URI=mongodb://db:27017/tyba

RUN npm install

CMD ["npm", "start"] 
