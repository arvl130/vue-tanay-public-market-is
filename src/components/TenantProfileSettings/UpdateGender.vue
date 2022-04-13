<script setup>
import { getAuth } from "firebase/auth";
import { onMounted, ref } from "vue";
import getTenant from "../../composables/getTenant";
import updateGender from "../../composables/update-profilesettings/updateGender";

const auth = getAuth();
const isEditable = ref(false);
const displayGender = ref("");
const gender = ref("");

onMounted(async () => {
  const uid = auth.currentUser.uid;
  const { gender } = await getTenant(uid);
  if (gender) {
    displayGender.value = gender;
  }
});

const onEdit = () => {
  gender.value = displayGender.value;
  isEditable.value = true;
};

const onCancel = () => {
  gender.value = displayGender.value;
  isEditable.value = false;
};

const onSave = async () => {
  const uid = auth.currentUser.uid;
  await updateGender(uid, gender.value);
  displayGender.value = gender.value;
  isEditable.value = false;
};
</script>

<template>
  <div
    class="hidden mt-3 sm:grid gap-4 px-12 py-3 bg-gray-300"
    style="grid-template-columns: 2fr 3fr 1fr"
  >
    <div class="font-bold">Gender</div>
    <div>
      <div v-if="isEditable">
        <select v-model="gender">
          <option value="" selected>Prefer not to say</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div v-else>
        <div v-if="displayGender" class="capitalize">{{ displayGender }}</div>
        <div v-else>Prefer not to say</div>
      </div>
    </div>
    <div>
      <div class="flex gap-4" v-if="isEditable">
        <button type="button" @click="onSave()">Save</button>
        <button type="button" @click="onCancel()">Cancel</button>
      </div>
      <button type="button" v-else @click="onEdit()">Edit</button>
    </div>
  </div>

  <!-- Mobile: card -->
  <div class="sm:hidden mt-3 px-12 py-3 bg-gray-300">
    <div class="font-bold">Gender</div>
    <div>
      <div v-if="isEditable">
        <select v-model="gender">
          <option value="" selected>Prefer not to say</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div v-else>
        <div v-if="displayGender" class="capitalize">{{ displayGender }}</div>
        <div v-else>Prefer not to say</div>
      </div>
    </div>
    <div>
      <div class="flex gap-4" v-if="isEditable">
        <button type="button" @click="onSave()">Save</button>
        <button type="button" @click="onCancel()">Cancel</button>
      </div>
      <button type="button" v-else @click="onEdit()">Edit</button>
    </div>
  </div>
</template>
