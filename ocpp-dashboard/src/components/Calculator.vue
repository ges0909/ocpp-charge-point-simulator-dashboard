<script setup lang="ts">
import { ref, computed, ComputedRef } from "vue";

const num1: any = ref(0);
const num2: any = ref(0);
const sum: ComputedRef<number> = computed(
  () => parseInt(num1.value, 10) + parseInt(num2.value, 10)
);
</script>

<template>
  <h3>Calculator</h3>
  <form>
    <input type="number" v-model="num1" />
    <input type="number" v-model="num2" />
    <!--<input type="number" v-model="num1" min="10" max="100" />-->
  </form>
  <p>Result: {{ sum }}</p>
</template>

<style scoped></style>
