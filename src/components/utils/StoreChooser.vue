<script setup>
import { onMounted, ref, toRef, watch } from "vue";
import getStoresFromTenantUnfulfilledPayments from "../../composables/manage-letters/getStoresFromTenantUnfulfilledPayments";

const props = defineProps({
  tenant_uid: String,
});

const selectedStores = ref([]);
const emit = defineEmits(["option-selected"]);

const onChange = () => {
  emit("option-selected", [...selectedStores.value]);
};

const availableStores = ref([]);

watch(toRef(props, "tenant_uid"), async () => {
  availableStores.value = await getStoresFromTenantUnfulfilledPayments(
    props.tenant_uid
  );
});

onMounted(async () => {
  availableStores.value = await getStoresFromTenantUnfulfilledPayments(
    props.tenant_uid
  );
});
</script>

<template>
  <select
    multiple
    class="px-3 py-2 border border-gray-400 bg-white max-w-xs mb-1"
    v-model="selectedStores"
    :size="availableStores.length"
    @change="onChange()"
  >
    <option v-for="store in availableStores" :key="store" :value="store.id">
      {{ store.id }} - {{ store.section }}
    </option>
  </select>
</template>
