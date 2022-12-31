<script setup lang="ts"></script>

<template>
  <div class="main-app-container">
    <router-view />
  </div>
</template>

<style lang="scss">
.main-app-container {
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
}
</style>
