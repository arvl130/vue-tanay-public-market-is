<script setup>
import { onMounted, ref, toRefs } from "vue";
import getTenantStores from "../../composables/getStoresByTenantUID";

const props = defineProps({
  tenant: Object,
});

const { firstName, lastName } = toRefs(props.tenant);

const storesHeld = ref([]);
const sections = ref([]);

onMounted(async () => {
  const tenantStores = await getTenantStores(props.tenant.uid);
  // populate stores held by tenant
  tenantStores.map((store) => {
    storesHeld.value.push(store.id);
  });
  // populate sections occupied by tenant
  tenantStores.map((store) => {
    if (!sections.value.includes(store.section))
      sections.value.push(store.section);
  });
});
</script>

<template>
  <!-- Desktop: row -->
  <div
    class="hidden sm:grid grid-cols-4 bg-gray-200 p-2 gap-2 mt-2 items-center text-center"
  >
    <div>{{ `${lastName}, ${firstName}` }}</div>

    <div v-if="storesHeld.length > 0">{{ storesHeld.join(", ") }}</div>
    <div class="italic" v-else>no data</div>

    <div v-if="sections.length > 0">{{ sections.join(", ") }}</div>
    <div class="italic" v-else>no data</div>

    <div class="flex justify-center gap-2">
      <router-link
        :to="{ name: 'Tenant Payments', params: { id: tenant.uid } }"
        class="bg-white text-cyan-500 hover:bg-cyan-500 hover:text-white px-3 py-1 rounded-2xl border border-teal-800"
      >
        View History
      </router-link>
      <router-link
        :to="{ name: 'Update Tenant', params: { id: tenant.uid } }"
        class="bg-white text-cyan-500 hover:bg-cyan-500 hover:text-white px-3 py-1 rounded-2xl border border-teal-800"
      >
        Update Info
      </router-link>
    </div>
  </div>
  <!-- Mobile: card -->
  <div class="sm:hidden bg-gray-200 p-2">
    <label class="font-bold">Name:</label>
    <div class="mb-3 text-2xl">{{ `${lastName}, ${firstName}` }}</div>

    <label class="font-bold">Stores held:</label>
    <div class="mb-3 text-2xl" v-if="storesHeld.length > 0">
      {{ storesHeld.join(", ") }}
    </div>
    <div class="mb-3 italic text-2xl" v-else>no data</div>

    <label class="font-bold">Sections:</label>
    <div class="mb-3 text-2xl" v-if="sections.length > 0">
      {{ sections.join(", ") }}
    </div>
    <div class="mb-3 italic text-2xl" v-else>no data</div>

    <div class="flex justify-center gap-8">
      <router-link
        :to="{ name: 'Tenant Payments', params: { id: tenant.uid } }"
        class="bg-white text-cyan-500 hover:bg-cyan-500 hover:text-white px-3 py-1 rounded-2xl border border-teal-800"
      >
        View History
      </router-link>
      <router-link
        :to="{ name: 'Update Tenant', params: { id: tenant.uid } }"
        class="bg-white text-cyan-500 hover:bg-cyan-500 hover:text-white px-3 py-1 rounded-2xl border border-teal-800"
      >
        Update Info
      </router-link>
    </div>
  </div>
</template>
