<script setup>
import NavBar from "../../components/NavBar/NavBar.vue";
import PageHeader from "../../components/PageHeader.vue";
import BackButton from "../../assets/icons/BackButton.vue";
import getAvailableStores from "../../composables/getAvailableStores";
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import getTenant from "../../composables/api/getTenant";
import getTenantStores from "../../composables/getStoresByTenantUID";
import AdminSecondaryButtons from "../../components/NavBar/AdminSecondaryButtons.vue";
import SimpleDialogModal from "../../components/modals/SimpleDialogModal.vue";
import deleteTenant from "../../composables/api/deleteTenant";
import updateTenant from "../../composables/api/updateTenant";
import LockOpenIcon from "../../assets/icons/LockOpenIcon.vue";

const route = useRoute();
const tenant_uid = route.params.id;

const currTenant = reactive({
  uid: tenant_uid,
  username: "",
  firstName: "",
  lastName: "",
  account_type: "",
  stores: [],
});

const choosableStores = ref([]);

onMounted(async () => {
  const availableStores = await getAvailableStores();
  const tenantStores = await getTenantStores(tenant_uid);
  choosableStores.value = [...tenantStores, ...availableStores];

  const { firstName, lastName, account_type, username } = await getTenant(
    tenant_uid
  );
  currTenant.firstName = firstName;
  currTenant.lastName = lastName;
  currTenant.account_type = account_type;
  currTenant.username = username;

  tenantStores.map((store) => {
    currTenant.stores.push(store.id);
  });
});
const router = useRouter();

const onUpdate = async () => {
  try {
    if (!isUpdateButtonDisabled.value) {
      await updateTenant({
        uid: currTenant.uid,
        username: currTenant.username,
        firstName: currTenant.firstName,
        lastName: currTenant.lastName,
        account_type: currTenant.account_type,
        stores: [...currTenant.stores],
      });
      router.push({ name: "Manage Tenants" });
    }
  } catch (e) {
    if (e.message === "User exists") {
      isErrorModalVisible.value = true;
      errorMessage.header = "Username is already in use";
      errorMessage.body = "Please enter a different username.";
    } else {
      console.log("Error while updating user:", e);
    }
  }
};

const isDeleteModalVisible = ref(false);

const onDelete = async () => {
  try {
    await deleteTenant(tenant_uid);
    router.push({ name: "Manage Tenants" });
  } catch (e) {
    console.log({ e });
  }
};

const isUpdateButtonDisabled = computed(() => {
  if (
    currTenant.username === "" ||
    currTenant.firstName === "" ||
    currTenant.lastName === "" ||
    currTenant.account_type === ""
  )
    return true;
  else return false;
});

const isDeleteButtonDisabled = computed(() => {
  if (currTenant.username === "") return true;
  else return false;
});

const openDeletePrompt = () => {
  if (!isDeleteButtonDisabled.value) isDeleteModalVisible.value = true;
};

const errorMessage = reactive({
  header: "",
  body: "",
});

const isErrorModalVisible = ref(false);
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
    <h2 class="font-extrabold text-4xl mb-3">Update Tenant</h2>
    <!-- Actions -->
    <div class="flex justify-between">
      <router-link :to="{ name: 'Manage Tenants' }" class="flex gap-2">
        <!-- Back Icon -->
        <BackButton />
        <span>Back</span>
      </router-link>

      <router-link
        :to="{ name: 'Change Tenant Password', params: { id: tenant_uid } }"
        class="flex gap-2 bg-gray-200 px-4 py-2 shadow hover:shadow-md hover:bg-gray-300 rounded transition duration-200"
      >
        <!-- Lock Icon -->
        <LockOpenIcon />
        <span>Change Password</span>
      </router-link>
    </div>
  </PageHeader>

  <main class="max-w-6xl mx-auto p-6">
    <!-- form -->
    <form class="grid">
      <label class="font-bold text-lg">First name</label>
      <input
        v-model="currTenant.firstName"
        class="p-1 border border-gray-400 rounded max-w-xs mb-3"
        type="text"
      />
      <label class="font-bold text-lg">Last name</label>
      <input
        v-model="currTenant.lastName"
        class="p-1 border border-gray-400 rounded max-w-xs mb-3"
        type="text"
      />
      <label class="font-bold text-lg">Username</label>
      <input
        v-model="currTenant.username"
        class="p-1 border border-gray-400 rounded max-w-xs mb-3"
        type="text"
      />
      <label class="font-bold text-lg">Stores owned</label>
      <div class="mb-3">
        <select
          v-if="choosableStores.length > 0"
          class="px-3 py-2 border border-gray-400"
          v-model="currTenant.stores"
          multiple
          :size="choosableStores.length"
        >
          <option
            v-for="choosableStore in choosableStores"
            :key="choosableStore.id"
            :value="choosableStore.id"
          >
            {{ choosableStore.id }} - {{ choosableStore.section }}
          </option>
        </select>
        <span v-else class="italic">No stores available</span>
      </div>
      <div class="flex justify-between">
        <button
          type="button"
          class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded shadow hover:shadow-md transition duration-200"
          :class="{
            'bg-slate-300': isDeleteButtonDisabled,
            'text-slate-500': isDeleteButtonDisabled,
            'pointer-events-none': isDeleteButtonDisabled,
          }"
          @click="openDeletePrompt"
        >
          Delete Tenant
        </button>
        <button
          type="button"
          class="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded shadow hover:shadow-md transition duration-200"
          :class="{
            'bg-slate-300': isUpdateButtonDisabled,
            'text-slate-500': isUpdateButtonDisabled,
            'pointer-events-none': isUpdateButtonDisabled,
          }"
          @click="onUpdate()"
        >
          Update Tenant
        </button>
      </div>
    </form>

    <SimpleDialogModal v-if="isDeleteModalVisible">
      <template #header>Confirm Delete Tenant</template>
      <template #body>
        The following action will delete this tenant account. This action cannot
        be undone. Continue?
      </template>
      <template #controls>
        <button
          type="button"
          class="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded shadow hover:shadow-md transition duration-200"
          @click="isDeleteModalVisible = false"
        >
          Cancel
        </button>
        <button
          type="button"
          class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded shadow hover:shadow-md transition duration-200"
          @click="onDelete()"
        >
          Yes, delete it.
        </button>
      </template>
    </SimpleDialogModal>

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
  </main>
</template>
