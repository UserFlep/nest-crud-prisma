FROM node:18-alpine As builder
# Create app directory
WORKDIR /app

# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
COPY package.json ./
COPY yarn.lock ./
COPY prisma ./prisma/

# Install app dependencies
RUN yarn

# Bundle app source
COPY . .

RUN yarn build

FROM node:18-alpine

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000

# Start the server using the production build
CMD [ "yarn", "start" ]