<script setup>
defineProps({
  imageUrl: String,
  receipt_uid: String,
});

const emit = defineEmits(["close"]);
</script>

<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center"
  >
    <div
      class="max-w-2xl max-h-screen bg-white p-3 m-3 shadow-2xl grid"
      style="height: 95vh; grid-template-rows: min-content"
    >
      <div class="flex justify-between items-center mb-2">
        <!-- title -->
        <div>
          Receipt ID: <span class="font-bold">{{ receipt_uid }}</span>
        </div>
        <!-- controls -->
        <div>
          <button
            class="rounded bg-gray-200 hover:bg-gray-300 px-2 py-1"
            @click="emit('close')"
          >
            Close
          </button>
        </div>
      </div>
      <!-- image -->
      <img class="w-full h-full object-contain" :src="imageUrl" alt="" />
    </div>
  </div>
</template>
