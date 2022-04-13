<script setup>
import ImageModal from "../modals/ImageModal.vue";
import { onMounted, ref } from "vue";
import getDownloadURLfromImagePath from "../../composables/tenants/getDownloadURLfromImagePath";

const props = defineProps({
  receipt: Object,
});

const imageUrl = ref(null);
const isImageModalVisible = ref(false);

onMounted(async () => {
  const imagePath = props.receipt.image_path;
  imageUrl.value = await getDownloadURLfromImagePath(imagePath);
});
</script>

<template>
  <!-- Desktop: row -->
  <div
    class="hidden sm:grid grid-cols-4 bg-gray-200 p-2 gap-2 mt-2 items-center"
  >
    <div class="text-center truncate text-ellipsis">
      {{ receipt.uid }}
    </div>
    <div class="text-center">
      {{ receipt.amount }}
    </div>
    <div class="text-center">
      {{ receipt.stores.join(", ") }}
    </div>
    <div class="flex justify-center">
      <button
        type="button"
        class="bg-white text-cyan-500 hover:bg-cyan-500 hover:text-white px-3 py-1 rounded-2xl border border-teal-800 inline-block"
        @click="isImageModalVisible = true"
        v-if="imageUrl"
      >
        View Image
      </button>
    </div>
  </div>

  <!-- Mobile: card -->
  <div></div>
  <div></div>
  <div></div>
  <div></div>

  <ImageModal
    :imageUrl="imageUrl"
    :receipt_uid="receipt.uid"
    v-show="isImageModalVisible"
    @close="isImageModalVisible = false"
  />
</template>
