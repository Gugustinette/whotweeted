<script setup lang="ts">
// Import Room Store
import { useRoom, Room } from '../../store/room.store';
// Import User Store
import { useUser } from '../../store/user.store';
// defineProps
import { defineProps, ref, defineEmits } from 'vue';

// Import PlayerProfil component
import PlayerProfil from '../../components/PlayerProfil.vue';
// Import TwitterAccount component
import TwitterAccount from '../../components/TwitterAccount.vue';

// Get Room Store
const roomStore = useRoom();
// Get User Store
const userStore = useUser();

// Start game event
const emit = defineEmits(['start-game']);

const foundTwitterAccount = ref({}) as any;
const keepedTwitterAccount = ref([]) as any;

// Props
const props = defineProps<{
  room: Room;
}>();

// When the user enters a search query
const searchTwitterAccounts = (event: any) => {
  if (event.target.value.length < 3) {
    return;
  }
  // Query the server
  userStore.searchUserByUsername(event.target.value).then((data) => {
    if (data.errors) {
      return;
    }
    // Set foundTwitterAccount
    foundTwitterAccount.value = data.data;
  });
};

// When the user clicks on a twitter account
const toggleTwitterAccount = (account: any) => {
  // Search for the account in keepedTwitterAccount
  const index = keepedTwitterAccount.value.findIndex(
    (a: any) => a.id === account.id
  );
  // If the account is already in keepedTwitterAccount
  if (index !== -1) {
    // Remove it
    keepedTwitterAccount.value.splice(index, 1);
    // Update room
    roomStore.room?.id_twitter_users.splice(index, 1);
  } else {
    // Create a new object
    account = { ...account };
    // Set forceActive to true
    account.forceActive = true;
    // Else, add it
    keepedTwitterAccount.value.push(account);
    // Update room
    roomStore.room?.id_twitter_users.push(account.id);
  }
};

// When user clicks on a selected twitter account
const removeTwitterAccount = (account: any) => {
  // Search for the account in keepedTwitterAccount
  const index = keepedTwitterAccount.value.findIndex(
    (a: any) => a.id === account.id
  );
  // If the account is already in keepedTwitterAccount
  if (index !== -1) {
    // Remove it
    keepedTwitterAccount.value.splice(index, 1);
    // Update room
    roomStore.room?.id_twitter_users.splice(index, 1);
  }
};
</script>

<template>
  <div class="game-init-panel">
    <div class="players">
      <h3>Players</h3>
      <div class="players-grid">
        <!-- For each player in room -->
        <PlayerProfil v-for="player in room.players" :key="player._id" :user="player" />
      </div>
    </div>
    <div class="game-config">
      <h3>Game Configuration</h3>
      <!-- Let the user choose twitter accounts by querying the server -->
      <div class="twitter-accounts">
        <header>
          <input type="text" placeholder="Search Twitter Accounts"
            @input="searchTwitterAccounts($event)"
          />
        </header>
        <main v-if="foundTwitterAccount && foundTwitterAccount.id">
          <TwitterAccount
            :twitterAccount="foundTwitterAccount"
            @toggleTwitterAccount="toggleTwitterAccount"
          />
          <TwitterAccount v-for="account in keepedTwitterAccount"
            :key="account.id"
            :twitterAccount="account"
            @removeTwitterAccount="removeTwitterAccount"
          />
        </main>
        <main v-else>
          <p>Try to search a twitter account !</p>
        </main>
      </div>
      <button class="start-game"
        @click="emit('start-game')"
      >
        Start Game
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.game-init-panel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "players game-config";
  height: 100%;
  width: 100%;
  column-gap: 1rem;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--surface-color);
    border-radius: 10px;
    height: 100%;
  }

  .players {
    .players-grid {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
  }

  .game-config {
    .twitter-accounts {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      header {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;

        input {
          width: 85%;
          height: 2rem;
          border: none;
          border-radius: 10px;
          padding: 0 1rem;
          background: var(--surface-color);
          color: var(--text-color);
          font-weight: 500;
          border: 1px solid var(--surface-color-hover);
        }
      }
    }

    .start-game {
      width: 100%;
      height: 3rem;
      border: none;
      border-radius: 10px;
      background: var(--primary-color);
      color: var(--surface-color);
      font-weight: 500;
      font-size: 1.2rem;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      &:hover {
        transform: scale(1.05);
      }
    }
  }
}

// On mobile, display game-init-panel in a column
@media screen and (max-width: 768px) {
  .game-init-panel {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
  }
}
</style>
