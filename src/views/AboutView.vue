<template>
  <div class="about">
    <h1 class="text-ttt">This is an about page</h1>
  </div>
</template>

<script lang="ts" setup>
import request from "@/utils/http";

request.get("/api/test")({ id: 100 });
</script>

<style lang="scss">
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
