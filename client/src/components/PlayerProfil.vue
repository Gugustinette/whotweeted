<script lang="ts">
import { defineProps } from 'vue';
import { User } from '../store/user.store';

const props = defineProps<{
  user: User;
}>();

export default {
  name: 'PlayerProfil',
  props: {
    user: {
      type: Object as () => User,
      required: true,
    },
  },
};
</script>

<template>
  <div class="player-profil">
    <div class="player-profil__avatar">
      <img :src="user.url_pp || 'https://via.placeholder.com/150'" alt="Avatar" />
    </div>
    <div class="player-profil__name">
      <h4>{{ user.username }}</h4>
    </div>
  </div>
</template>

<style lang="scss">
.player-profil {
    height: 200px !important;
    width: 150px !important;
    display: grid;
    grid-template-rows: 3fr 1fr;
    grid-template-columns: 1fr;
    height: 100%;
    width: 100%;
    column-gap: 1rem;

    h4 {
        margin: 0;
    }

    .player-profil__avatar {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        img {
            width: 90%;
            object-fit: cover;
            border-radius: 50%;
        }
    }

    .player-profil__name {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    }
}
</style>
