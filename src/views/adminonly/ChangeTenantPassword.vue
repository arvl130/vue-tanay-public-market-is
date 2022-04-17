<script setup>
import NavBar from "../../components/NavBar/NavBar.vue";
import PageHeader from "../../components/PageHeader.vue";
import BackButton from "../../assets/icons/BackButton.vue";
import AdminSecondaryButtons from "../../components/NavBar/AdminSecondaryButtons.vue";
import SimpleDialogModal from "../../components/modals/SimpleDialogModal.vue";
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import getTenant from "../../composables/api/getTenant";
import changeTenantPassword from "../../composables/api/changeTenantPassword";

const route = useRoute();
const tenant_uid = route.params.id;

const tenantCredentials = reactive({
  tenant_uid,
  firstName: "",
  lastName: "",
  username: "",
  newPassword: "",
});

onMounted(async () => {
  const { firstName, lastName, username } = await getTenant(tenant_uid);
  tenantCredentials.firstName = firstName;
  tenantCredentials.lastName = lastName;
  tenantCredentials.username = username;
});

const isChangeButtonDisabled = computed(() => {
  if (tenantCredentials.newPassword === "") return true;
  if (tenantCredentials.newPassword.length < 8) return true;
  return false;
});

const router = useRouter();
const onSubmit = async () => {
  try {
    if (!isChangeButtonDisabled.value) {
      await changeTenantPassword(
        tenantCredentials.tenant_uid,
        tenantCredentials.newPassword
      );
      router.push({
        name: "Manage Tenants",
      });
    }
  } catch (e) {
    isErrorModalVisible.value = true;
    errorMessage.header = "An error occured while changing user password";
    errorMessage.body = "Please inform the site administrator.";
  }
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
    <h2 class="font-extrabold text-4xl mb-3">Change Tenant Password</h2>
    <!-- Actions -->
    <div class="flex justify-between">
      <router-link
        :to="{ name: 'Update Tenant', params: tenant_uid }"
        class="flex gap-2"
      >
        <!-- Back Icon -->
        <BackButton />
        <span>Back</span>
      </router-link>
    </div>
  </PageHeader>

  <main class="max-w-6xl mx-auto p-6">
    <!-- form -->
    <form class="grid">
      <span class="font-bold text-3xl mb-3">
        {{ tenantCredentials.firstName }}
        {{ tenantCredentials.lastName }}
      </span>
      <div>
        <label class="font-bold text-lg">UID:</label>
        {{ tenantCredentials.tenant_uid }}
      </div>
      <div class="mb-3">
        <label class="font-bold text-lg">Username:</label>
        {{ tenantCredentials.username }}
      </div>
      <label class="font-bold text-lg">New Password</label>
      <input
        v-model="tenantCredentials.newPassword"
        class="p-1 border border-gray-400 rounded max-w-xs mb-3"
        type="password"
      />

      <div class="text-right">
        <button
          type="button"
          class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded shadow hover:shadow-md transition duration-200"
          :class="{
            'bg-slate-300': isChangeButtonDisabled,
            'text-slate-500': isChangeButtonDisabled,
            'pointer-events-none': isChangeButtonDisabled,
          }"
          @click="onSubmit()"
        >
          Change Password
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
