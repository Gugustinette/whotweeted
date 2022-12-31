# WhoTweeted
<img src="./ressources/logo.png" width="500" style="display: block; margin: auto;">

## Description
An online game based on who tweeted a given tweet

## Installation

### Prerequisites
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Architecture
- [Vue.js](https://vuejs.org/) for the frontend
    - [Pinia](https://pinia.esm.dev/) for state management
- [Nest.js](https://nestjs.com/) for the backend
    - [Mongoose](https://mongoosejs.com/) for the database
- [MongoDB](https://www.mongodb.com/) for the database
- [Docker](https://www.docker.com/) for containerization
- [Socket.io](https://socket.io/) for the websocket connection

### Development environment

1. Clone the repository
2. Run `docker compose -f docker/dev/docker-compose.yml up` in the root directory
    - In order to run the containers in the background, add `-d` to the command
3. Open `localhost:9000` in your browser

To stop the containers, run `docker compose -f docker/dev/docker-compose.yml down` in the root directory

### Production environment

1. Clone the repository
2. Run `docker compose -f docker/prod/docker-compose.yml up` in the root directory
    - In order to run the containers in the background, add `-d` to the command

To stop the containers, run `docker compose -f docker/prod/docker-compose.yml down` in the root directory

#### Deployment

The first time you deploy the application, you need to run the `ressources/deployment/deploy:setup.sh` script

Requirements:
- [Nginx](https://www.nginx.com/) set up on the server

1. Clone the repository
2. Run the `ressources/deployment/deploy.sh` script

To add support for HTTPS, use [certbot](https://certbot.eff.org/) as follows:
1. Install certbot: `sudo apt install certbot`
2. Run cert : `sudo certbot --nginx -d whotweeted.fr -d www.whotweeted.fr -d api.whotweeted.fr`

You also need to copy the '.env.example' file in the server folder and create a '.env' file with the following content (Twitter API keys are required):
```
TWITTER_APP_NAME=
TWITTER_APP_ID=
TWITTER_API_KEY=
TWITTER_API_KEY_SECRET=
TWITTER_BEARER_TOKEN=
```
