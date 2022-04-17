<script setup>
import NavBar from "../../components/NavBar/NavBar.vue";
import PageHeader from "../../components/PageHeader.vue";
import BackButton from "../../assets/icons/BackButton.vue";
import TenantSecondaryButtons from "../../components/NavBar/TenantSecondaryButtons.vue";
import { computed, onMounted, reactive, ref } from "vue";
import {
  getAuth,
  signInWithEmailAndPassword,
  updateEmail,
} from "firebase/auth";
import getUser from "../../composables/getUser";
import { useRouter } from "vue-router";
import SimpleDialogModal from "../../components/modals/SimpleDialogModal.vue";

const userInfo = reactive({
  firstName: "",
  lastName: "",
  username: "",
});

const auth = getAuth();
onMounted(async () => {
  const uid = auth.currentUser.uid;
  const { firstName, lastName } = await getUser(uid);
  userInfo.firstName = firstName;
  userInfo.lastName = lastName;
  userInfo.username = auth.currentUser.email.split("@")[0];
});

const userCredentials = reactive({
  username: "",
  password: "",
});

const router = useRouter();
const onSubmit = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      auth.currentUser.email,
      userCredentials.password
    );
    await updateEmail(
      userCredential.user,
      `${userCredentials.username}@noemail.com`
    );
    router.push({ name: "Tenant Profile" });
  } catch (e) {
    if (e.code === "auth/email-already-in-use") {
      isErrorModalVisible.value = true;
      errorMessage.header = "Username is already in use";
      errorMessage.body = "Please enter a different username.";
    }
    if (e.code === "auth/wrong-password") {
      isErrorModalVisible.value = true;
      errorMessage.header = "Wrong password";
      errorMessage.body = "Please try again.";
    } else {
      console.log("Error while updating user:", e);
    }
  }
};

const isChangeButtonDisabled = computed(() => {
  if (userCredentials.password === "") return true;
  if (userCredentials.username === "") return true;
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
    <h2 class="font-extrabold text-4xl mb-3">Change Username</h2>
    <!-- Actions -->
    <div class="flex justify-between">
      <router-link :to="{ name: 'Tenant Profile' }" class="flex gap-2">
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
      <div>
        <label class="font-bold text-lg">Current username: </label>
        <span>{{ userInfo.username }}</span>
      </div>
      <label class="font-bold text-lg">New username</label>
      <input
        v-model="userCredentials.username"
        class="p-1 border border-gray-400 rounded max-w-xs mb-3"
        type="text"
      />
      <label class="font-bold text-lg">Enter Password</label>
      <input
        v-model="userCredentials.password"
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
          Change Username
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
