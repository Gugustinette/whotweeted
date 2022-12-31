<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

// Emit
const emit = defineEmits(['chooseTwitterAccount'])

const props = defineProps<{
  twitterAccount: any;
}>();

// When clicking on the add button
const chooseTwitterAccount = () => {
  // Emit the event to the parent component
  emit('chooseTwitterAccount', props.twitterAccount);
};
</script>

<template>
  <div class="twitter-answer" @click="chooseTwitterAccount">
    <div class="profile_image_url">
      <img :src="twitterAccount.profile_image_url" alt="Profile Image" />
    </div>
    <div class="name">
      <h4>{{ twitterAccount.name }}</h4>
      <h5>@{{ twitterAccount.username }}</h5>
    </div>
  </div>
</template>

<style lang="scss">
.twitter-answer {
  height: 90px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1fr;
  border-radius: 10px;
  background: var(--surface-color);
  gap: 1rem;

  .profile_image_url {
    padding: 0 1rem;
    display: grid;
    place-items: center;

    img {
      height: 90%;
      border-radius: 50%;
    }
  }

  .name {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    > * {
      margin: 0;
      padding: 0;
      margin-left: 1rem;
    }
  }
}
</style>
