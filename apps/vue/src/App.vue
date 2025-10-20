<script setup lang="ts">
import "vue-sonner/style.css";
</script>

<template>
  <header>

    <div class="wrapper bg-amber-400">
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </div>
  </header>
  <Toaster />
  <RouterView />
</template>

<style scoped></style>
