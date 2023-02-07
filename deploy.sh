#!/usr/bin/env bash

# This script is used to deploy the application to the server.
# It is assumed that the server is already configured with the
# correct environment variables.

# Change to the public directory
cd public

# Run the test suite to make sure everything is working
yarn test

# Bail if the tests fail
if [ $? -ne 0 ]; then
  echo "Tests failed. Aborting deployment."
  exit 1
fi

# Build the application
yarn build

# Git add, commit, and push the changes
git add .
git commit -m "Deploying to production"
git push