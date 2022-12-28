<script setup lang="ts">
// Import User Store
import { useUser } from '../store/user.store';
// Import Room Store
import { useRoom } from '../store/room.store';

// Get User Store
const user = useUser();
// Get Room Store
const room = useRoom();

// Log User Store
console.log(user);
// Log Room Store
console.log(room);
</script>

<template>
  <div>
    Game View
  </div>
</template>
