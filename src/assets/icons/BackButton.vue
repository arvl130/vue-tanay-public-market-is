<script setup>
const props = defineProps({
  styling: String,
});

const styling = props.styling ?? "h-6 w-6";
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :class="`h-6 w-6 ${styling}`"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
</template>
