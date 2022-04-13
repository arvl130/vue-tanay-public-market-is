<script setup>
import ImageModal from "../modals/ImageModal.vue";
import { onMounted, ref } from "vue";
import getDownloadURLfromImagePath from "../../composables/tenants/getDownloadURLfromImagePath";

const props = defineProps({
  receipt: Object,
});

const imageUrl = ref(null);

onMounted(async () => {
  const imagePath = props.receipt.image_path;
  imageUrl.value = await getDownloadURLfromImagePath(imagePath);
});

const isModalVisible = ref(false);
</script>

<template>
  <!-- Desktop: row -->
  <div
    class="hidden sm:grid grid-cols-4 bg-gray-200 p-2 gap-2 mt-2 items-center text-center"
  >
    <div class="truncate text-ellipsis">{{ receipt.uid }}</div>
    <div>{{ receipt.stores.join(", ") }}</div>
    <div>{{ receipt.amount }}</div>
    <div class="flex justify-center gap-8">
      <button
        type="button"
        class="bg-white text-cyan-500 hover:bg-cyan-500 hover:text-white px-3 py-1 rounded-2xl border border-teal-800 inline-block"
        @click="isModalVisible = true"
      >
        View Image
      </button>
    </div>
  </div>
  <!-- Mobile: card -->
  <div class="sm:hidden bg-gray-200 p-2">
    <label class="font-bold">Receipt UID:</label>
    <div class="mb-3 text-2xl truncate text-ellipsis">{{ receipt.uid }}</div>

    <label class="font-bold">Stores:</label>
    <div class="mb-3 text-2xl">{{ receipt.stores.join(", ") }}</div>

    <label class="font-bold">Amount Paid:</label>
    <div class="mb-3 text-2xl">{{ receipt.amount }}</div>
    <div class="flex justify-center gap-8">
      <button
        type="button"
        class="bg-white text-cyan-500 hover:bg-cyan-500 hover:text-white px-3 py-1 rounded-2xl border border-teal-800 inline-block"
        @click="isModalVisible = true"
      >
        View Image
      </button>
    </div>
  </div>

  <ImageModal
    :imageUrl="imageUrl"
    :receipt_uid="receipt.uid"
    v-show="isModalVisible"
    @close="isModalVisible = false"
  />
</template>
