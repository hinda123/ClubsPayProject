FROM node:14
RUN mkdir /clubs-pay
WORKDIR /clubs-pay
COPY . /clubs-pay
RUN yarn install
EXPOSE 3000
CMD ["yarn","start"]
