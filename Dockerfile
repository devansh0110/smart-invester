# Step 1: Use a Node.js base image
FROM node:20-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and yarn.lock to install dependencies
COPY package.json yarn.lock ./

# Step 4: Install dependencies using Yarn
RUN yarn install --production

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Expose the port your application will run on
EXPOSE 3000

# Step 7: Command to start your application
CMD ["yarn", "start:prod"]
