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
