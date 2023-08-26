FROM node:18-bullseye-slim
WORKDIR /usr/src/app
COPY package.json package-lock.json /usr/src/app/
RUN npm install && npm cache clean --force
# COPY . /usr/src/app
EXPOSE 3000
CMD ["npm", "run", "start"]