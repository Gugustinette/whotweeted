<script setup lang="ts">
// Import User Store
import { useUser } from '../store/user.store';
// Import Room Store
import { useRoom, Round } from '../store/room.store';
// Import defineProps
import { defineProps, onMounted, ref } from 'vue';

// Import GameInitView component
import GameInitView from './game/GameInitView.vue';
// Import GameRoundView component
import GameRoundView from './game/GameRoundView.vue';
// Import GameScoreView component
import GameScoreView from './game/GameScoreView.vue';
// Import GameLoadingView component
import GameLoadingView from './game/GameLoadingView.vue';

const props = defineProps<{
  roomId: string;
}>();

// Get User Store
const userStore = useUser();
// Get Room Store
const roomStore = useRoom();

// Game status
let gameStatus = ref('loading');
let actualRound = ref({} as Round);

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

  // When receiving information about the room, set the room
  roomStore.socket.on('room_info', (data) => {
    // Set room
    roomStore.room = data;
    if (gameStatus.value === 'loading') {
      gameStatus.value = 'init';
    }
  });

  // When player joined the room, add him to the room
  roomStore.socket.on('player_joined', (data) => {
    // Add player to room
    roomStore.room?.players.push(data.user);
  });

  // When a new round starts
  roomStore.socket.on('new_round', (data) => {
    actualRound.value = data.round;
    gameStatus.value = 'round';
  });

  // When a round end
  roomStore.socket.on('round_ended', (data) => {
    // Update room
    roomStore.room = data.room;
    gameStatus.value = 'score';
  });

  // When the game ends
  roomStore.socket.on('game_ended', (data) => {
    // Update room
    roomStore.room = data.room;
    gameStatus.value = 'end';
  });

  // When error
  roomStore.socket.on('error', (data) => {
    console.log('Error');
    alert(data.message);
  });

  // Launch websocket connection
  roomStore.socket.connect();
});

/**
 * When the user clicks on the start game button
 */
const startGame = () => {
  roomStore.startGame(
    roomStore.room?._id as string,
    userStore.user?._id as string,
    roomStore.room?.id_twitter_users as string[]
  )
};

/**
 * When the user answers to the question
 */
const giveAnswer = (answer: string) => {
  roomStore.answerRound(
    roomStore.room?._id as string,
    userStore.user?._id as string,
    answer
  );
  gameStatus.value = 'loading';
};

/**
 * When the user calls the next round
 */
const nextRound = () => {
  gameStatus.value = 'loading';
  roomStore.nextRound(
    roomStore.room?._id as string,
    userStore.user?._id as string
  );
};
</script>

<template>
  <div class="game-container">
    <header>
      <h4>Game id: {{ props.roomId }}</h4>
      <img src="../assets/logo-text.png" alt="WhoTwittedLogo - Text Variant" />
      <a href="/">Quit Room</a>
    </header>
    <main>
      <GameInitView
        v-if="gameStatus === 'init'"
        :room="roomStore.room as any"
        @start-game="startGame"
      />
      <GameRoundView
        v-else-if="gameStatus === 'round'"
        :round="actualRound"
        @answer="giveAnswer"
      />
      <GameLoadingView
        v-else-if="gameStatus === 'loading'"
      />
      <GameScoreView
        v-else-if="gameStatus === 'score'"
        :end="false"
        :room="roomStore.room as any"
        @next-round="nextRound"
      />
      <GameScoreView
        v-else-if="gameStatus === 'end'"
        :end="true"
        :room="roomStore.room as any"
        @next-round="nextRound"
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