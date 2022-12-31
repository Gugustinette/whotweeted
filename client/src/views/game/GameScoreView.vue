<script setup lang="ts">
// Import Room Store
import { useRoom, Room } from '../../store/room.store';
// Import User Store
import { useUser } from '../../store/user.store';
// defineProps
import { defineProps, defineEmits } from 'vue';

// Get Room Store
const roomStore = useRoom();
// Get User Store
const userStore = useUser();

// Next Round event
const emit = defineEmits(['next-round']);

// Props
const props = defineProps<{
  room: Room;
  end: boolean;
}>();

// When next round button is clicked
const nextRound = () => {
  emit('next-round');
};
</script>

<template>
  <div class="game-score-panel">
    <h2>{{ props.end ? 'Final' : '' }} Score</h2>
    <div class="score">
      <div class="player" v-for="player in props.room.players" :key="player._id">
        <div class="player-name">
          {{ player.username }}
        </div>
        <div class="player-score">
          {{ props.room.scores[player._id] }}
        </div>
      </div>
    </div>
    <div
      class="next-round-button"
      v-if="props.room.master._id === userStore.user?._id && !props.end"
      @click="nextRound"
    >
        Next Round
    </div>
  </div>
</template>

<style lang="scss">
.game-score-panel {
    display: flex;
    flex-direction: column;

    .score {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .player {
            background: var(--surface-color);
            padding: 1rem;
            border-radius: 10px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            
        }
    }

    .next-round-button {
        background: var(--primary-color);
        padding: 1rem;
        border-radius: 10px;
        margin-top: 1rem;
        color: var(--on-primary-color);
        cursor: pointer;
        transition: all 0.1s ease-in-out;

        &:hover {
            transform: scale(1.05);
        }
    }
}

// On mobile, display game-init-panel in a column
@media screen and (max-width: 768px) {
}
</style>
