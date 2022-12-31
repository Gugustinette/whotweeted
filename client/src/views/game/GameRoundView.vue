<script setup lang="ts">
// Import Room Store
import { useRoom, Round } from '../../store/room.store';
// Import User Store
import { useUser } from '../../store/user.store';
// defineProps
import { defineEmits, onMounted } from 'vue';

// Import TwitterAnswer component
import TwitterAnswer from '../../components/TwitterAnswer.vue';

// Get Room Store
const roomStore = useRoom();
// Get User Store
const userStore = useUser();

// Props
const props = defineProps<{
  round: Round;
}>();

// Start game event
const emit = defineEmits(['answer']);

// When the user responds to the question
const giveAnswer = (answer: string) => {
    emit('answer', answer);
};
</script>

<template>
  <div class="game-round-panel">
    <h2>Who tweeted this tweet ?</h2>
    <div class="tweet-wrapper">
        <div class="tweet">
            <p>
                {{ props.round.tweet.text }}
            </p>
        </div>
    </div>
    <div class="answers">
        <div class="answer" v-for="answer in props.round.id_twitter_user_propositions" :key="answer" @click="giveAnswer(answer)">
            <TwitterAnswer :twitterAccount="props.round.twitter_users_profiles[answer]" />
        </div>
    </div>
  </div>
</template>

<style lang="scss">
.game-round-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    .tweet-wrapper {
        .tweet {
            padding: 1rem;
            border-radius: 10px;
            background: var(--surface-color);
        }
    }

    .answers {
        display: grid;
        grid-template-columns: 1fr 1fr;
        place-items: center;
        gap: 1rem;
        width: 100%;

        .answer {
            cursor: pointer;
            width: 100%;
        }
    }
}

// On mobile
@media screen and (max-width: 768px) {
    .game-round-panel {
        .answers {
            grid-template-columns: 1fr;
        }
    }
}
</style>
