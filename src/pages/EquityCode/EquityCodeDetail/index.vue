<template>
  <div>{{ id }}</div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
const id = route.query.id;
</script>