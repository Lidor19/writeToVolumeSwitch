FROM node
WORKDIR /usr/src/app
COPY . . 
CMD [ "npm", "start" ]