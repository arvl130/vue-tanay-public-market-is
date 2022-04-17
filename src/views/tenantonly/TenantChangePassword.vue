<script setup>
import NavBar from "../../components/NavBar/NavBar.vue";
import PageHeader from "../../components/PageHeader.vue";
import BackButton from "../../assets/icons/BackButton.vue";
import TenantSecondaryButtons from "../../components/NavBar/TenantSecondaryButtons.vue";
import { computed, onMounted, reactive, ref } from "vue";
import {
  getAuth,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import getUser from "../../composables/getUser";
import { useRouter } from "vue-router";
import SimpleDialogModal from "../../components/modals/SimpleDialogModal.vue";

const userInfo = reactive({
  firstName: "",
  lastName: "",
});

const auth = getAuth();
onMounted(async () => {
  const uid = auth.currentUser.uid;
  const { firstName, lastName } = await getUser(uid);
  userInfo.firstName = firstName;
  userInfo.lastName = lastName;
});

const userCredentials = reactive({
  password: "",
  newPassword: "",
  retypeNewPassword: "",
});

const router = useRouter();
const onSubmit = async () => {
  try {
    if (!isChangeButtonDisabled.value) {
      if (userCredentials.newPassword !== userCredentials.retypeNewPassword) {
        const error = new Error("New password and retyped does not match");
        error.code = "auth/password-mismatch";
        throw error;
      }

      const userCredential = await signInWithEmailAndPassword(
        auth,
        auth.currentUser.email,
        userCredentials.password
      );
      await updatePassword(userCredential.user, userCredentials.newPassword);
      router.push({ name: "Tenant Settings" });
    }
  } catch (e) {
    if (e.code === "auth/wrong-password") {
      isErrorModalVisible.value = true;
      errorMessage.header = "Wrong password";
      errorMessage.body = "Please try again.";
    } else if (e.code === "auth/password-mismatch") {
      isErrorModalVisible.value = true;
      errorMessage.header = "Password mismatch";
      errorMessage.body =
        "New password and retyped does not match. Please try again.";
      userCredentials.retypeNewPassword = "";
    } else {
      console.log("Error occured while changing password:", e);
    }
  }
};

const isChangeButtonDisabled = computed(() => {
  if (userCredentials.password === "") return true;
  if (userCredentials.newPassword === "") return true;
  if (userCredentials.retypeNewPassword === "") return true;
  if (userCredentials.newPassword.length < 8) return true;
  if (
    userCredentials.newPassword.length !==
    userCredentials.retypeNewPassword.length
  )
    return true;
  return false;
});

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
      <TenantSecondaryButtons />
    </template>
  </NavBar>

  <PageHeader>
    <h2 class="font-extrabold text-4xl mb-3">Change Password</h2>
    <!-- Actions -->
    <div class="flex justify-between">
      <router-link :to="{ name: 'Tenant Settings' }" class="flex gap-2">
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
        {{ userInfo.firstName }}
        {{ userInfo.lastName }}
      </span>
      <label class="font-bold text-lg">Current Password</label>
      <input
        v-model="userCredentials.password"
        class="p-1 border border-gray-400 rounded max-w-xs mb-3"
        type="password"
      />

      <label class="font-bold text-lg">New Password</label>
      <input
        v-model="userCredentials.newPassword"
        class="p-1 border border-gray-400 rounded max-w-xs"
        type="password"
      />
      <div class="mb-3 text-sm">Must be at least 8 characters long.</div>

      <label class="font-bold text-lg">Re-type New Password</label>
      <input
        v-model="userCredentials.retypeNewPassword"
        class="p-1 border border-gray-400 rounded max-w-xs mb-3"
        type="password"
      />

      <div class="text-right">
        <button
          type="button"
          class="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-2 rounded shadow hover:shadow-md transition duration-200"
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
