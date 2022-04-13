<script setup>
import { getAuth } from "firebase/auth";
import { onMounted, ref } from "vue";
import getTenant from "../../composables/getTenant";
import updateEmail from "../../composables/update-profilesettings/updateEmail";

const isEditable = ref(false);

const originalEmail = ref("");
const email = ref("");

const auth = getAuth();
onMounted(async () => {
  const uid = auth.currentUser.uid;
  const { email } = await getTenant(uid);
  originalEmail.value = email || "";
});

const onEdit = () => {
  email.value = originalEmail.value;
  isEditable.value = true;
};

const onCancel = () => {
  email.value = originalEmail.value;
  isEditable.value = false;
};

const onSave = async () => {
  const uid = auth.currentUser.uid;
  console.log(email.value);
  await updateEmail(uid, email.value);
  originalEmail.value = email.value;
  isEditable.value = false;
};
</script>

<template>
  <div
    class="mt-3 grid px-12 py-3 bg-gray-300"
    style="grid-template-columns: 2fr 3fr 1fr"
  >
    <div class="font-bold flex items-center">Email</div>
    <div>
      <input
        type="text"
        class="px-2 py-1 border border-gray-400 rounded"
        v-model="email"
        placeholder="user@example.com"
        v-if="isEditable"
      />
      <div v-else>
        <div v-if="originalEmail !== ''">{{ originalEmail }}</div>
        <div v-else>No email address.</div>
      </div>
    </div>
    <div class="flex items-center">
      <div v-if="isEditable" class="flex gap-2">
        <button type="button" @click="onSave()">Save</button>
        <button type="button" @click="onCancel()">Cancel</button>
      </div>
      <button type="button" v-else @click="onEdit()">Edit</button>
    </div>
  </div>
</template>
