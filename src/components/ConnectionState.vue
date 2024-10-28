<template>
  {{ connected }}
</template>

<script setup lang="ts">
import { state } from "@/socket";
  const name = "ConnectionState"
  const connected = computed(() => { return state.connected; };
};
</script>
