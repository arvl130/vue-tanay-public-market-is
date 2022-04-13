<script setup>
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import NavBar from "../components/NavBar/NavBar.vue";
import signIn from "../composables/auth/signIn";
import SimpleDialogModal from "../components/modals/SimpleDialogModal.vue";
import signOut from "../composables/auth/signOut";

const adminCredentials = reactive({
  username: "",
  password: "",
});

const router = useRouter();
const onSignIn = async () => {
  try {
    if (!isLoginButtonDisabled.value) {
      const user = await signIn({ ...adminCredentials });
      const idTokenResult = await user.getIdTokenResult();
      if (idTokenResult.claims.account_type === "admin") {
        router.push({ name: "Admin Dashboard" });
      } else {
        await signOut();
        const error = new Error("No such user.");
        error.code = "auth/user-not-found";
        throw error;
      }
    }
  } catch (e) {
    isErrorModalVisible.value = true;
    switch (e.code) {
      case "auth/invalid-email":
      case "auth/user-not-found":
      case "auth/wrong-password":
        errorMessage.header = "Invalid username or password";
        errorMessage.body = "Please try again.";
        break;
    }
  }
};

const errorMessage = reactive({
  header: "",
  body: "",
});

const isErrorModalVisible = ref(false);

const isLoginButtonDisabled = computed(() => {
  if (adminCredentials.username === "" || adminCredentials.password === "")
    return true;
  else return false;
});

const isForgotPasswordModalVisible = ref(false);
</script>

<template>
  <!-- Filler text -->
  <!--
  <div class="py-32 text-center">
    <p class="font-extrabold text-4xl">Admin Login Page</p>
  </div>
  -->
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
      <router-link :to="{ name: 'Home' }" class="hover:underline">
        Home
      </router-link>
      <router-link :to="{ name: 'About' }" class="hover:underline">
        About
      </router-link>
    </template>
  </NavBar>

  <div class="sm:pt-32">
    <div class="sm:flex items-center">
      <!-- Admin icon -->
      <div class="sm:w-1/2 flex justify-center">
        <!-- <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-64 w-64 text-cyan-700 sm:block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
          />
        </svg> -->
        <img src="../assets/img/admin.png" alt="" class="w-1/2 my-6 sm:my-0" />
      </div>
      <!-- Login form -->
      <div class="sm:w-1/2 text-center sm:text-left">
        <div class="inline-block text-center">
          <h2
            class="font-extrabold uppercase text-4xl lg:text-6xl mb-7 text-center"
          >
            Administrator
          </h2>
          <div class="inline-block">
            <div class="mb-3 text-right">
              <label class="font-extrabold mr-2">Username:</label>
              <input
                v-model="adminCredentials.username"
                type="text"
                class="p-1 border border-gray-400 rounded"
              />
            </div>
            <div class="mb-4 text-right">
              <label class="font-extrabold mr-2">Password:</label>
              <input
                v-model="adminCredentials.password"
                type="password"
                class="p-1 border border-gray-400 rounded"
              />
            </div>
            <button
              @click="onSignIn()"
              class="bg-cyan-800 text-white px-6 py-2 hover:bg-cyan-700 sm:block sm:mx-auto"
              :class="{
                'bg-slate-300': isLoginButtonDisabled,
                'pointer-events-none': isLoginButtonDisabled,
              }"
            >
              Login
            </button>
            <!-- <div class="mt-5">
              <a href="#" class="text-sm">Forgot password?</a>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>

  <SimpleDialogModal v-if="isForgotPasswordModalVisible">
    <template #header>Forgot Password</template>
    <template #body>
      You may request for a password reset by contacting the public market
      admins.
    </template>
    <template #controls>
      <button
        type="button"
        class="rounded bg-gray-200 hover:bg-gray-300 px-2 py-1 ml-auto"
        @click="isForgotPasswordModalVisible = false"
      >
        OK
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
</template>
