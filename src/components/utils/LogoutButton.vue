<script setup>
import signOut from "../../composables/auth/signOut";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const showLogoutModal = ref(false);

watch(showLogoutModal, (refNow) => {
  if (refNow === true) {
    document.querySelector("body").classList.add("overflow-y-hidden");
  } else {
    document.querySelector("body").classList = [];
  }
});

const router = useRouter();
const onSignOut = async () => {
  document.querySelector("body").classList = [];
  await signOut();
  router.push({ name: "Home" });
};
</script>

<template>
  <button @click="showLogoutModal = true" class="font-normal hover:underline">
    Logout
  </button>

  <!-- Logout modal -->
  <div
    class="fixed padding-0 inset-0 bg-black bg-opacity-20 flex justify-center items-center"
    v-show="showLogoutModal"
  >
    <div
      class="max-w-2xl max-h-screen border-t border-gray-500 bg-cyan-100 px-10 pt-4 pb-12 m-3 shadow-2xl grid"
    >
      <!-- Question -->
      <div class="mb-5 font-medium pb-4">Are you sure you want to logout?</div>
      <!-- Options -->
      <div class="flex justify-around gap-3">
        <button
          type="button"
          @click="showLogoutModal = false"
          class="bg-gray-50 hover:bg-gray-200 font-medium px-6 py-2 shadow hover:shadow-md transition duration-200"
        >
          No
        </button>
        <button
          type="button"
          class="bg-gray-50 hover:bg-gray-200 font-medium px-6 py-2 shadow hover:shadow-md transition duration-200"
          @click="onSignOut()"
        >
          Yes
        </button>
      </div>
    </div>
  </div>
</template>
