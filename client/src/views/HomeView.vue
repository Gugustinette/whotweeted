<script setup lang="ts">
// Import User Store
import { useUser } from '../store/user.store';
// Import Room Store
import { useRoom } from '../store/room.store';
// Import Router
import { useRouter } from 'vue-router';

// Get User Store
const userStore = useUser();
// Get Room Store
const roomStore = useRoom();
// Get Router
const router = useRouter();

// ID put by the user in the input
let roomId: string = '';
// Usernames put by the user in the input
let username: string = '';

/**
 * When creating a game, create a room and redirect to the game room view
 */
const createGame = () => {
  // Create a room
  roomStore.createRoom(username).then((data) => {
    // Set user information
    userStore.user = {
      _id: data.user._id,
      username: data.user.username,
      url_pp: data.user.url_pp,
      nb_won_game: data.user.nb_won_game,
    };
    // Redirect to the game room view
    router.push(`/game/${data.room_id}`);
  });
};
/**
 * When joining a game, create a user and redirect to the game room view
 */
const joinGame = () => {
  // Create a user
  userStore.createUser(username).then((user) => {
    // Set user information
    userStore.user = {
      _id: user._id,
      username: user.username,
      url_pp: user.url_pp,
      nb_won_game: user.nb_won_game,
    };
    // Redirect to the game room view
    router.push(`/game/${roomId}`);
  });
};
</script>

<template>
  <div class="home-view">
    <header>
      <img src="../assets/logo.png" alt="WhoTwittedLogo" />
    </header>
    <div class="buttons">
      <div class="username-input">
        <h4>Enter your username :</h4>
        <input type="text" placeholder="Username" v-model="username" />
      </div>
      <h4>Choose an option :</h4>
      <button to="/create-game" @click="createGame">Create a game</button>
      <div class="join-input">
        <input type="text" placeholder="Room ID" v-model="roomId" />
        <button id="join-game-button" @click="joinGame">Join a game</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.home-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  max-height: 100vh;

  header {
    img {
      width: 100%;
      max-width: 500px;
    }
  }

  .buttons {
    min-width: 300px;
    display: flex;
    flex-direction: column;
    row-gap: 20px;

    .username-input {
      display: flex;
      flex-direction: column;
      row-gap: 10px;

      input {
        border-radius: 20px;
        border: 1px solid var(--surface-color-hover);

        &:focus {
          border: 1px solid var(--primary-color);
          outline: none;
        }
      }
    }

    button {
      padding: 10px 20px;
      border-radius: 20px;
      background: var(--surface-color);
      border: 1px solid var(--surface-color);
      transition: all 0.2s ease-in-out;

      &:hover {
        background: var(--surface-color-hover);
        border: 1px solid var(--primary-color);
      }

      &#join-game-button {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }

    .join-input {
      display: flex;
      flex-direction: row;

      input {
        border-radius: 20px 0 0 20px;
        border-right: solid 1px var(--surface-color-hover);

        &:focus {
          border: 1px solid var(--primary-color);
          outline: none;
        }
      }
    }
  }
}
</style>