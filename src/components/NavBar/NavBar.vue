<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
  disableBg: Boolean,
});

const shouldUseBg = ref(true);
onMounted(() => {
  if (props.disableBg === true) shouldUseBg.value = false;
});
</script>

<template>
  <nav :class="{ 'custom-bg-gradient-cyan-to-blue': shouldUseBg }">
    <div class="max-w-6xl mx-auto flex justify-between items-center px-6">
      <div class="flex items-center pr-2">
        <!-- Logo -->
        <div class="flex items-center space-x-3 mr-4 my-2 h-16">
          <img
            src="../../assets/img/logo.webp"
            class="w-16 hidden sm:block"
            alt=""
          />
        </div>
        <!-- Primary nav -->
        <div>
          <slot name="primary"></slot>
        </div>
      </div>
      <!-- Secondary nav -->
      <div class="flex items-center h-16 pl-2 gap-8">
        <slot name="secondary">secondary here</slot>
      </div>
    </div>
  </nav>
</template>
