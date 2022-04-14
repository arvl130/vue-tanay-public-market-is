<script setup>
import { onMounted, ref } from "vue";
import getUser from "../../composables/getUser";
import unixSecondsToWordDate from "../../composables/utils/unixSecondsToWordDate";

const props = defineProps({
  letter: Object,
});

const formattedDate = ref("");
onMounted(() => {
  formattedDate.value = unixSecondsToWordDate(props.letter.timestamp.seconds);
});

const prettyNameAdmin = ref("loading...");
onMounted(async () => {
  const { firstName, lastName } = await getUser(props.letter.admin_uid);
  if (firstName || lastName) prettyNameAdmin.value = `${firstName} ${lastName}`;
  else prettyNameAdmin.value = "";
});

const prettyNameTenant = ref("loading...");
onMounted(async () => {
  const { firstName, lastName } = await getUser(props.letter.tenant_uid);
  if (firstName || lastName)
    prettyNameTenant.value = `${firstName} ${lastName}`;
  else prettyNameTenant.value = "";
});
</script>

<template>
  <!-- Desktop: row -->
  <div
    class="hidden sm:grid grid-cols-5 bg-gray-200 p-2 gap-2 mt-2 items-center text-center"
  >
    <div class="truncate text-ellipsis">{{ letter.uid }}</div>
    <div>{{ formattedDate }}</div>
    <div>
      <span v-if="prettyNameAdmin">{{ prettyNameAdmin }}</span>
      <span v-else class="italic">no data</span>
    </div>
    <div>
      <span v-if="prettyNameTenant">{{ prettyNameTenant }}</span>
      <span v-else class="italic">no data</span>
    </div>
    <div class="flex justify-center text-center">
      <router-link
        class="bg-white text-cyan-500 hover:bg-cyan-500 hover:text-white px-3 py-1 rounded-2xl border border-teal-800"
        :to="{ name: 'Tenant View Notice Letter', params: { id: letter.uid } }"
      >
        View Letter
      </router-link>
    </div>
  </div>

  <!-- Mobile: card -->
  <div class="sm:hidden bg-gray-200 p-2 overflow-hidden">
    <label class="font-bold">UID:</label>
    <div class="mb-3 text-2xl truncate text-ellipsis">{{ letter.uid }}</div>
    <label class="font-bold">Date sent:</label>
    <div class="mb-3 text-2xl">{{ formattedDate }}</div>
    <label class="font-bold">Sent by:</label>
    <div class="mb-3 text-2xl">
      <span v-if="prettyNameAdmin">{{ prettyNameAdmin }}</span>
      <span v-else class="italic">no data</span>
    </div>
    <label class="font-bold">Tenant name:</label>
    <div class="mb-3 text-2xl">{{ prettyNameTenant }}</div>
    <div class="flex justify-center text-center">
      <router-link
        class="bg-white text-cyan-500 hover:bg-cyan-500 hover:text-white px-3 py-1 rounded-2xl border border-teal-800"
        :to="{ name: 'Tenant View Notice Letter', params: { id: letter.uid } }"
      >
        View Letter
      </router-link>
    </div>
  </div>
</template>
