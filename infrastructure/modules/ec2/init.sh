#!/bin/bash

sudo apt update
sudo apt install -y ca-certificates curl gnupg

sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

NODE_MAJOR=20
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list

sudo apt update
sudo apt install -y nodejs

node --version
npm --version

cd /home/ubuntu

git clone https://{KEY_HERE}@github.com/UOA-CS732-SE750-Students-2024/project-group-apricot-aardvarks.git

sleep 60

cd /home/ubuntu/project-group-apricot-aardvarks/backend

sudo npm i
sudo npm install -g pm2

cd /home/ubuntu/project-group-apricot-aardvarks/backend

pm2 start src/app.js

pm2 save
