<script setup>
import NavBar from "../../components/NavBar/NavBar.vue";
import PageHeader from "../../components/PageHeader.vue";
import BackButton from "../../assets/icons/BackButton.vue";
import getAvailableStores from "../../composables/getAvailableStores";
import { computed, onMounted, reactive, ref } from "vue";
import AdminSecondaryButtons from "../../components/NavBar/AdminSecondaryButtons.vue";
import createTenant from "../../composables/api/createTenant";
import { useRouter } from "vue-router";
import SimpleDialogModal from "../../components/modals/SimpleDialogModal.vue";

const newTenant = reactive({
  firstName: "",
  lastName: "",
  account_type: "tenant",
  username: "",
  password: "",
  stores: [],
});

const availableStores = ref([]);

onMounted(async () => {
  availableStores.value = await getAvailableStores();
});

const router = useRouter();

const onCreateTenant = async () => {
  try {
    if (!isCreateButtonDisabled.value) {
      isCreateButtonClicked.value = true;
      await createTenant({ ...newTenant });
      router.push({ name: "Manage Tenants" });
    }
  } catch (e) {
    if (e.message === "User exists") {
      isErrorModalVisible.value = true;
      errorMessage.header = "Username is already in use";
      errorMessage.body = "Please enter a different username.";
      isCreateButtonClicked.value = false;
    } else {
      console.log(e);
    }
  }
};

const errorMessage = reactive({
  header: "",
  body: "",
});

const isErrorModalVisible = ref(false);

const isCreateButtonDisabled = computed(() => {
  if (isCreateButtonClicked.value) return true;
  if (newTenant.firstName === "") return true;
  if (newTenant.lastName === "") return true;
  if (newTenant.account_type === "") return true;
  if (newTenant.username === "") return true;
  if (newTenant.password === "") return true;
  if (newTenant.password.length < 8) return true;
  else return false;
});

const isCreateButtonClicked = ref(false);
</script>
<template>
  <!-- <div class="py-32 text-center">
    <p class="font-extrabold text-4xl">New Tenant Page</p>
  </div> -->
  <NavBar>
    <template #primary>
      <router-link
        :to="{ name: 'Home' }"
        class="hidden sm:inline font-bold text-2xl uppercase text-gray-800 hover:underline"
      >
        Tanay Public Market
      </router-link>
    </template>
    <template #secondary>
      <AdminSecondaryButtons />
    </template>
  </NavBar>

  <PageHeader>
    <h2 class="font-extrabold text-4xl mb-3">Add New Tenant</h2>
    <!-- Actions -->
    <div class="flex justify-between">
      <router-link :to="{ name: 'Manage Tenants' }" class="flex gap-2">
        <!-- Back Icon -->
        <BackButton />
        <span>Back</span>
      </router-link>
    </div>
  </PageHeader>

  <main class="max-w-6xl mx-auto p-6">
    <!-- form -->
    <form class="grid">
      <label class="font-bold text-lg">
        First name
        <span class="text-red-700">*</span>
      </label>
      <input
        v-model="newTenant.firstName"
        class="p-1 border border-gray-400 rounded max-w-xs mb-3"
        type="text"
      />
      <label class="font-bold text-lg">
        Last name
        <span class="text-red-700">*</span>
      </label>
      <input
        v-model="newTenant.lastName"
        class="p-1 border border-gray-400 rounded max-w-xs mb-3"
        type="text"
      />
      <label class="font-bold text-lg">
        Username
        <span class="text-red-700">*</span>
      </label>
      <input
        v-model="newTenant.username"
        class="p-1 border border-gray-400 rounded max-w-xs mb-3"
        type="text"
      />
      <label class="font-bold text-lg">
        Password
        <span class="text-red-700">*</span>
      </label>
      <input
        v-model="newTenant.password"
        class="p-1 border border-gray-400 rounded max-w-xs"
        type="password"
      />
      <div class="mb-3 text-sm">Must be at least 8 characters long.</div>
      <label class="font-bold text-lg">Stores owned</label>
      <div class="mb-3">
        <select
          v-if="availableStores.length > 0"
          class="px-3 py-2 border border-gray-400"
          v-model="newTenant.stores"
          multiple
          :size="availableStores.length"
        >
          <option
            v-for="availableStore in availableStores"
            :key="availableStore.id"
            :value="availableStore.id"
          >
            {{ availableStore.id }} - {{ availableStore.section }}
          </option>
        </select>
        <span v-else class="italic">No stores available</span>
      </div>
      <div class="text-right">
        <button
          @click="onCreateTenant() /* createNewTenant({ ...newTenant })*/"
          type="button"
          class="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded shadow hover:shadow-md transition duration-200"
          :class="{
            'bg-slate-300': isCreateButtonDisabled,
            'text-slate-500': isCreateButtonDisabled,
            'pointer-events-none': isCreateButtonDisabled,
          }"
        >
          Create Tenant
        </button>
      </div>
    </form>
  </main>

  <SimpleDialogModal v-if="isErrorModalVisible">
    <template #header>
      {{ errorMessage.header }}
    </template>
    <template #body>
      {{ errorMessage.body }}
    </template>
    <template #controls>
      <button
        type="button"
        class="rounded bg-gray-200 hover:bg-gray-300 px-2 py-1 ml-auto"
        @click="isErrorModalVisible = false"
      >
        OK
      </button>
    </template>
  </SimpleDialogModal>
</template>
