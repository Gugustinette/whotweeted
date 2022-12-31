<script setup lang="ts">
// Import User Store
import { useUser } from '../store/user.store';
// Import Room Store
import { useRoom } from '../store/room.store';
// Import defineProps
import { defineProps, onMounted, ref } from 'vue';

// Import GameInitView component
import GameInitView from './game/GameInitView.vue';

const props = defineProps<{
  roomId: string;
}>();

// Get User Store
const userStore = useUser();
// Get Room Store
const roomStore = useRoom();

// Game status
let gameStatus = ref('loading');

/**
 * On Mount
 */
onMounted(() => {
  // When connected
  roomStore.socket.on('connect', () => {
    // Join the room
    roomStore.socket.emit('join_room', {
      room_id: props.roomId,
      user_id: userStore.user?._id,
    });
  });

  // When receiving information about the room, log it
  roomStore.socket.on('room_info', (data) => {
    // Set room
    roomStore.room = data;
    if (gameStatus.value === 'loading') {
      gameStatus.value = 'init';
    }
  });

  // When player joined the room, log it
  roomStore.socket.on('player_joined', (data) => {
    // Add player to room
    roomStore.room?.players.push(data.user);
  });

  // Launch websocket connection
  roomStore.socket.connect();
});

/**
 * When the user clicks on the start game button
 */
const startGame = () => {
  // Log the room
  console.log(roomStore.room);
};
</script>

<template>
  <div class="game-container">
    <header>
      <h4>Game id: {{ props.roomId }}</h4>
      <img src="../assets/logo-text.png" alt="WhoTwittedLogo - Text Variant" />
      <router-link to="/">Quit room</router-link>
    </header>
    <main>
      <GameInitView
        v-if="gameStatus === 'init'"
        :room="roomStore.room as any"
        @start-game="startGame"
      />
    </main>
  </div>
</template>

<style lang="scss">
.game-container {
  height: 100%;
  width: 90%;

  header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    justify-items: center;

    > img {
      height: 8rem;
    }
    > a {
      justify-self: end;
    }
    > h4 {
      justify-self: start;
    }
  }
}

@media screen and (max-width: 768px) {
  .game-container {
    header {
      > h4 {
        width: 20px;
      }
    }
  }
}
</style>