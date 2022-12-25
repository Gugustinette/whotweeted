# whotweeted
An online game based on who tweeted a given tweet

## Installation

### Prerequisites
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Development

#### Steps
1. Clone the repository
2. Run `docker compose up` in the root directory
3. Open `localhost:9000` in your browser

#### Architecture
- [Vue.js](https://vuejs.org/) for the frontend
    - [Pinia](https://pinia.esm.dev/) for state management
- [Nest.js](https://nestjs.com/) for the backend
    - [Mongoose](https://mongoosejs.com/) for the database
- [MongoDB](https://www.mongodb.com/) for the database
- [Docker](https://www.docker.com/) for containerization

