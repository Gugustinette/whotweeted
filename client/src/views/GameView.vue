<script setup lang="ts">
// Import User Store
import { useUser } from '../store/user.store';
// Import Room Store
import { useRoom } from '../store/room.store';

// Get User Store
const user = useUser();
// Get Room Store
const room = useRoom();

// When connected
room.socket.on('connect', () => {
  console.log('Connected to server');
});

// When receiving information about the room, log it
room.socket.on('room_info', (data) => {
  console.log(data);
});

// Launch websocket connection
room.socket.connect();
</script>

<template>
  <div>
    Game View
    <button @click="room.createRoom('Gugustinette')">Join room</button>
    <p>Actual room id (in url) : {{ $route.params.roomId }}</p>
  </div>
</template>
