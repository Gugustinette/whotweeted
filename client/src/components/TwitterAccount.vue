<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';

// Emit
const emit = defineEmits(['toggleTwitterAccount', 'removeTwitterAccount'])

const props = defineProps<{
  twitterAccount: any;
}>();

// selected ?
const selected = ref(false);
// Add Button
let addButton = ref(null);

// When clicking on the add button
const addTwitterAccount = () => {
  if (props.twitterAccount.forceActive) {
    emit('removeTwitterAccount', props.twitterAccount);
  }
  // Emit the event to the parent component
  emit('toggleTwitterAccount', props.twitterAccount);
  // Toggle selected
  selected.value = !selected.value;
};
</script>

<template>
  <div class="twitter-account">
    <div class="profile_image_url">
      <img :src="twitterAccount.profile_image_url" alt="Profile Image" />
    </div>
    <div class="name">
      <h4>{{ twitterAccount.name }}</h4>
      <h5>@{{ twitterAccount.username }}</h5>
    </div>
    <div class="actions">
      <div @click="addTwitterAccount"
        :class="{ active: selected || twitterAccount.forceActive }"
        ref="addButton"
      >
        <span v-if="selected || twitterAccount.forceActive">✓</span>
        <span v-else>+</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.twitter-account {
  height: 90px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 1fr;

  .profile_image_url {
    padding: 0 1rem;
    img {
      height: 100%;
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

  .actions {
    display: flex;
    justify-content: center;
    align-items: center;

    > div {
      height: 2rem;
      width: 2rem;
      border: none;
      border-radius: 50%;
      background: var(--background-color);
      border: solid 1px var(--primary-color);
      font-size: 1.5rem;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.1s ease-in-out;

      &:hover {
        background: var(--primary-color);
      }

      &.active {
        background: var(--primary-color);
      }
    }
  }
}
</style>
