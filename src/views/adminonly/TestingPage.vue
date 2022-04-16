<script setup>
import NavBar from "../../components/NavBar/NavBar.vue";
import PageHeader from "../../components/PageHeader.vue";
import BackButton from "../../assets/icons/BackButton.vue";
import AdminSecondaryButtons from "../../components/NavBar/AdminSecondaryButtons.vue";
import WarningIcon from "../../assets/icons/WarningIcon.vue";
import listenForTenantsUsers from "../../composables/api/listenForTenantUsers";
import { computed, ref } from "vue";
import triggerManualRolloutOfPaymentsSingle from "../../composables/api/triggerManualRolloutOfPaymentsSingle";
import triggerManualRolloutOfPayments from "../../composables/api/triggerManualRolloutOfPayments";

const tenants = listenForTenantsUsers();

const tenantChosen = ref("");

const isIssuePaymentButtonIsDisabled = computed(() => {
  if (tenantChosen.value === "") return true;
  return false;
});

const onTriggerSinglePayment = async () => {
  if (!isIssuePaymentButtonIsDisabled.value) {
    triggerManualRolloutOfPaymentsSingle(tenantChosen.value);
  }
};

const isIssuePaymentOnAllTenantsDisabled = ref(false);
const onTriggerAllPayments = async () => {
  if (!isIssuePaymentOnAllTenantsDisabled.value) {
    await triggerManualRolloutOfPayments();
    isIssuePaymentOnAllTenantsDisabled.value = true;
  }
};
</script>

<template>
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
    <h2 class="font-extrabold text-4xl mb-3">Testing Page</h2>
    <!-- Actions -->
    <div class="flex justify-between">
      <router-link :to="{ name: 'Admin Settings' }" class="flex gap-2">
        <!-- Back Icon -->
        <BackButton />
        <span>Back</span>
      </router-link>
    </div>
  </PageHeader>

  <main class="max-w-6xl mx-auto p-6">
    <div class="mb-3">
      <div class="mb-1">
        Trigger payment rollout on all tenants for the current month:
      </div>
      <button
        type="button"
        class="rounded bg-gray-200 hover:bg-gray-300 px-2 py-1 flex items-end gap-1 text-lg shadow transition duration-200"
        :class="{
          'bg-slate-300': isIssuePaymentOnAllTenantsDisabled,
          'text-slate-500': isIssuePaymentOnAllTenantsDisabled,
          'pointer-events-none': isIssuePaymentOnAllTenantsDisabled,
        }"
        @click="onTriggerAllPayments()"
      >
        <WarningIcon styling="h-6 w-6" />
        Trigger
      </button>
    </div>

    <div>
      <div class="mb-1">
        Trigger payment rollout on selected tenant for the current month:
      </div>
      <select class="bg-gray-300 px-2 py-1 rounded mb-3" v-model="tenantChosen">
        <option value="">Choose a tenant ...</option>
        <option :value="tenant.uid" v-for="tenant in tenants" :key="tenant.uid">
          {{ `${tenant.uid} - ${tenant.firstName} ${tenant.lastName}` }}
        </option>
      </select>
      <button
        type="button"
        class="rounded bg-gray-200 hover:bg-gray-300 px-2 py-1 flex items-end gap-1 text-lg shadow transition duration-200"
        :class="{
          'bg-slate-300': isIssuePaymentButtonIsDisabled,
          'text-slate-500': isIssuePaymentButtonIsDisabled,
          'pointer-events-none': isIssuePaymentButtonIsDisabled,
        }"
        @click="onTriggerSinglePayment()"
      >
        <WarningIcon styling="h-6 w-6" />
        Trigger
      </button>
    </div>
  </main>
</template>
