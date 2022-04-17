<script setup>
import NavBar from "../../components/NavBar/NavBar.vue";
import PageHeader from "../../components/PageHeader.vue";
import BackButton from "../../assets/icons/BackButton.vue";
import AdminSecondaryButtons from "../../components/NavBar/AdminSecondaryButtons.vue";
import { useRoute, useRouter } from "vue-router";
import deleteLetter from "../../composables/notice-letter/deleteLetter";
import TrashIcon from "../../assets/icons/TrashIcon.vue";
import PrintIcon from "../../assets/icons/PrintIcon.vue";
import LetterSection from "../../components/ViewNoticeLetter/LetterSection.vue";

const route = useRoute();
const letter_uid = route.params.id;

const router = useRouter();
const onDelete = async () => {
  await deleteLetter(letter_uid);
  router.push({ name: "Admin Notice Letters" });
};
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
    <h2 class="font-extrabold text-4xl mb-3">View Notice Letter</h2>
    <!-- Actions -->
    <div class="flex justify-between">
      <router-link :to="{ name: 'Admin Notice Letters' }" class="flex gap-2">
        <!-- Back Icon -->
        <BackButton />
        <span>Back</span>
      </router-link>

      <div class="grid sm:flex gap-4">
        <button
          type="button"
          class="flex gap-2 bg-gray-200 p-2 shadow hover:shadow-md hover:bg-gray-300 rounded transition duration-200"
          @click="onDelete()"
        >
          <!-- Trash Icon -->
          <TrashIcon />
          Delete
        </button>

        <router-link
          class="flex gap-2 bg-gray-200 py-2 px-3 shadow hover:shadow-md hover:bg-gray-300 rounded transition duration-200"
          :to="{
            name: 'Admin Print Notice Letter',
            params: { id: letter_uid },
          }"
          target="_blank"
        >
          <!-- Print Icon -->
          <PrintIcon />
          Print
        </router-link>
      </div>
    </div>
  </PageHeader>

  <main class="max-w-6xl mx-auto p-6">
    <!-- Letter -->
    <LetterSection :letter_uid="letter_uid" />
  </main>
</template>
