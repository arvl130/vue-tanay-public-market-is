<script setup>
import { getAuth } from "firebase/auth";
import { onMounted, reactive, ref } from "vue";
import getTenant from "../../composables/getTenant";
import updateFullName from "../../composables/update-profilesettings/updateFullName";

const auth = getAuth();
const originalUserInfo = reactive({
  firstName: "",
  lastName: "",
});

const userInfo = reactive({
  firstName: "",
  lastName: "",
});

const isEditable = ref(false);

onMounted(async () => {
  const uid = auth.currentUser.uid;
  const { firstName, lastName } = await getTenant(uid);

  if (firstName) {
    originalUserInfo.firstName = firstName;
    userInfo.firstName = firstName;
  }
  if (lastName) {
    originalUserInfo.lastName = lastName;
    userInfo.lastName = lastName;
  }
});

const onSave = async () => {
  const uid = auth.currentUser.uid;
  await updateFullName(uid, userInfo.firstName, userInfo.lastName);
  originalUserInfo.firstName = userInfo.firstName;
  originalUserInfo.lastName = userInfo.lastName;
  isEditable.value = false;
};

const onCancel = () => {
  userInfo.firstName = originalUserInfo.firstName;
  userInfo.lastName = originalUserInfo.lastName;
  isEditable.value = false;
};
</script>

<template>
  <!-- Desktop: row -->
  <div
    class="hidden sm:grid gap-4 mt-3 px-12 py-3 bg-gray-300"
    style="grid-template-columns: 2fr 3fr 1fr"
  >
    <div class="font-bold flex items-center">Name</div>
    <div>
      <div class="flex gap-2" v-if="isEditable">
        <input
          type="text"
          class="px-2 py-1 border border-gray-400 rounded"
          v-model="userInfo.firstName"
          placeholder="First name"
        />
        <input
          type="text"
          class="px-2 py-1 border border-gray-400 rounded"
          v-model="userInfo.lastName"
          placeholder="Last name"
        />
      </div>
      <div v-else>
        {{ `${originalUserInfo.firstName} ${originalUserInfo.lastName}` }}
      </div>
    </div>
    <div class="flex items-center">
      <div v-if="isEditable" class="flex gap-2">
        <button type="button" @click="onSave()">Save</button>
        <button type="button" @click="onCancel()">Cancel</button>
      </div>
      <button type="button" @click="isEditable = true" v-else>Edit</button>
    </div>
  </div>

  <!-- Mobile: card -->
  <div class="sm:hidden mt-3 px-12 py-3 bg-gray-300">
    <div class="font-bold flex items-center">Name:</div>
    <div>
      <div class="grid gap-2" v-if="isEditable">
        <input
          type="text"
          class="px-2 py-1 border border-gray-400 rounded"
          v-model="userInfo.firstName"
          placeholder="First name"
        />
        <input
          type="text"
          class="px-2 py-1 border border-gray-400 rounded"
          v-model="userInfo.lastName"
          placeholder="Last name"
        />
      </div>
      <div v-else>
        <div v-if="originalUserInfo.firstName || originalUserInfo.lastName">
          {{ `${originalUserInfo.firstName} ${originalUserInfo.lastName}` }}
        </div>
        <div class="italic" v-else>No name set.</div>
      </div>
    </div>
    <div class="flex items-center">
      <div v-if="isEditable" class="flex gap-2">
        <button type="button" @click="onSave()">Save</button>
        <button type="button" @click="onCancel()">Cancel</button>
      </div>
      <button type="button" @click="isEditable = true" v-else>Edit</button>
    </div>
  </div>
</template>
