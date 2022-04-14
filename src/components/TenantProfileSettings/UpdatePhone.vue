<script setup>
import { getAuth } from "firebase/auth";
import { onMounted, ref } from "vue";
import getTenant from "../../composables/getTenant";
import updatePhoneNumber from "../../composables/update-profilesettings/updatePhoneNumber";

const isEditable = ref(false);

const originalPhoneNumber = ref("");
const phoneNumber = ref("");

const auth = getAuth();
onMounted(async () => {
  const uid = auth.currentUser.uid;
  const { phoneNumber } = await getTenant(uid);
  originalPhoneNumber.value = phoneNumber || "";
});

const onEdit = () => {
  phoneNumber.value = originalPhoneNumber.value;
  isEditable.value = true;
};

const onCancel = () => {
  phoneNumber.value = originalPhoneNumber.value;
  isEditable.value = false;
};

const onSave = async () => {
  const uid = auth.currentUser.uid;
  await updatePhoneNumber(uid, phoneNumber.value);
  originalPhoneNumber.value = phoneNumber.value;
  isEditable.value = false;
};
</script>

<template>
  <!-- Desktop: row -->
  <div
    class="hidden mt-3 sm:grid px-12 py-3 bg-gray-300"
    style="grid-template-columns: 2fr 3fr 1fr"
  >
    <div class="font-bold flex items-center">Phone</div>
    <div>
      <input
        type="text"
        class="px-2 py-1 border border-gray-400 rounded"
        v-model="phoneNumber"
        placeholder="(+63)"
        v-if="isEditable"
      />
      <div v-else>
        <div v-if="originalPhoneNumber !== ''">{{ originalPhoneNumber }}</div>
        <div v-else>No phone number.</div>
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

  <!-- Mobile: card -->
  <div class="sm:hidden mt-3 px-12 py-3 bg-gray-300">
    <div class="font-bold flex items-center">Phone</div>
    <div>
      <input
        type="text"
        class="px-2 py-1 border border-gray-400 rounded"
        v-model="phoneNumber"
        placeholder="(+63)"
        v-if="isEditable"
      />
      <div v-else>
        <div v-if="originalPhoneNumber !== ''">{{ originalPhoneNumber }}</div>
        <div v-else>No phone number.</div>
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
