<script setup>
import NavBar from "../../components/NavBar/NavBar.vue";
import PageHeader from "../../components/PageHeader.vue";
import BackButton from "../../assets/icons/BackButton.vue";
import AdminSecondaryButtons from "../../components/NavBar/AdminSecondaryButtons.vue";
import { computed, onMounted, reactive, ref } from "vue";
import getTenantsWithUnverifiedPayments from "../../composables/manage-letters/getTenantsWithUnverifiedPayments";
// import StoreChooser from "../../components/utils/StoreChooser.vue";
import { useNoticeLetter } from "../../stores/noticeLetter";
import { useRouter } from "vue-router";
import { Timestamp } from "firebase/firestore";
import getStoresFromTenantUnfulfilledPayments from "../../composables/manage-letters/getStoresFromTenantUnfulfilledPayments";
import { getAuth } from "firebase/auth";

const tenantsWithUnverifiedPayments = ref([]);

const newLetter = reactive({
  tenant_uid: "",
  admin_uid: "",
  stores: [],
  penalty: 0,
  timestamp: null,
});

const auth = getAuth();

onMounted(async () => {
  newLetter.admin_uid = auth.currentUser.uid;
  tenantsWithUnverifiedPayments.value =
    await getTenantsWithUnverifiedPayments();
  newLetter.timestamp = Timestamp.now();
});

const router = useRouter();
const noticeLetterStore = useNoticeLetter();
const onSubmit = async () => {
  if (!isGenerateButtonDisabled.value) {
    if (newLetter.tenant_uid) {
      const stores = await getStoresFromTenantUnfulfilledPayments(
        newLetter.tenant_uid
      );
      stores.forEach((store) => {
        newLetter.stores.push(store.id);
      });
    }

    noticeLetterStore.setNoticeLetter({ ...newLetter });
    router.push({ name: "Generated Notice Letter" });
  }
};

const isGenerateButtonDisabled = computed(() => {
  if (
    newLetter.tenant_uid === "" ||
    newLetter.admin_uid === "" ||
    !newLetter.timestamp ||
    newLetter.penalty === "" ||
    parseFloat(newLetter.penalty) < 0
  ) {
    return true;
  } else {
    return false;
  }
});

// const onOptionSelected = (selectedValue) => {
//   newLetter.stores = [...selectedValue];
// };
</script>

<template>
  <!-- <div class="py-32 text-center">
    <p class="font-extrabold text-4xl">New Notice Letter Page</p>
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
    <h2 class="font-extrabold text-4xl mb-3">New Notice Letter</h2>
    <!-- Actions -->
    <div class="flex justify-between">
      <router-link :to="{ name: 'Admin Notice Letters' }" class="flex gap-2">
        <!-- Back Icon -->
        <BackButton />
        <span>Back</span>
      </router-link>
    </div>
  </PageHeader>

  <main class="max-w-6xl mx-auto p-6">
    <!-- form -->
    <form class="grid">
      <label class="font-bold text-lg">List of Tenants</label>
      <select
        v-model="newLetter.tenant_uid"
        class="px-3 py-2 border border-gray-400 bg-white max-w-xs mb-1"
      >
        <option value="" selected disabled hidden>Choose an option</option>
        <option
          v-for="tenant in tenantsWithUnverifiedPayments"
          :key="tenant.uid"
          :value="tenant.uid"
        >
          {{ `${tenant.firstName} ${tenant.lastName}` }}
        </option>
      </select>
      <div class="text-sm mb-3" v-if="newLetter.tenant_uid !== ''">
        <span class="font-bold">UID:</span>
        {{ newLetter.tenant_uid }}
      </div>
      <!-- <div v-if="newLetter.tenant_uid !== ''">
        <div class="font-bold text-lg">Stores</div>
        <StoreChooser
          :tenant_uid="newLetter.tenant_uid"
          @option-selected="onOptionSelected"
        />
      </div> -->
      <label class="font-bold text-lg">Penalty</label>
      <input
        v-model="newLetter.penalty"
        class="p-1 border border-gray-400 rounded max-w-xs mb-3"
        type="number"
        min="0"
      />
      <div class="text-right mb-6">
        <button
          type="button"
          class="bg-green-500 hover:bg-green-600 text-white font-medium px-3 py-2 rounded shadow hover:shadow-md transition duration-200"
          @click="onSubmit()"
          :class="{
            'bg-slate-300': isGenerateButtonDisabled,
            'text-slate-500': isGenerateButtonDisabled,
            'pointer-events-none': isGenerateButtonDisabled,
          }"
        >
          Generate Letter
        </button>
      </div>
    </form>
  </main>
</template>
