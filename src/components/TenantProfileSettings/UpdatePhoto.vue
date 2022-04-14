<script setup>
import { getAuth } from "firebase/auth";
import { computed, onMounted, ref } from "vue";
import getTenant from "../../composables/getTenant";
import deleteRemoteFile from "../../composables/tenants/deleteRemoteFile";
import getDownloadURLfromImagePath from "../../composables/tenants/getDownloadURLfromImagePath";
import uploadProfilePicture from "../../composables/tenants/uploadProfilePicture";
import updateProfilePicturePath from "../../composables/update-profilesettings/updateProfilePicturePath";

const isEditable = ref(false);

const auth = getAuth();
const profilePictureFile = ref();
const originalProfilePictureFullPath = ref(null);

const onSave = async () => {
  if (profilePictureFile.value.files.length > 0) {
    const { fullPath } = await uploadProfilePicture(
      profilePictureFile.value.files[0]
    );

    const uid = auth.currentUser.uid;

    await updateProfilePicturePath(uid, fullPath);
    originalProfilePictureFullPath.value = fullPath;
    profilePictureURL.value = await getDownloadURLfromImagePath(fullPath);
  }
  isEditable.value = false;
};

const profilePictureURL = ref("");
onMounted(async () => {
  const uid = auth.currentUser.uid;
  const { profilePictureFullPath } = await getTenant(uid);
  if (profilePictureFullPath) {
    originalProfilePictureFullPath.value = profilePictureFullPath;
    profilePictureURL.value = await getDownloadURLfromImagePath(
      profilePictureFullPath
    );
  }
});

// Action for removing profile picture
const onRemove = async () => {
  const uid = auth.currentUser.uid;
  await deleteRemoteFile(originalProfilePictureFullPath.value);
  await updateProfilePicturePath(uid, "");
  profilePictureURL.value = "";
};

const filesAreChosen = ref(true);
const filesAreCorrectSize = ref(true);
const onPhotoInputChanged = (e) => {
  if (e.target.files.length > 0) filesAreChosen.value = true;
  else filesAreChosen.value = false;

  if (e.target.files && e.target.files.length > 1) {
    filesAreCorrectSize.value = false;
  } else if (
    e.target.files &&
    e.target.files.length === 1 &&
    // Do not accept files equal or larger than 1 MiB
    e.target.files[0].size >= 1 * 1024 * 1024
  ) {
    filesAreCorrectSize.value = false;
  } else {
    filesAreCorrectSize.value = true;
  }
};

const isSaveButtonDisabled = computed(() => {
  if (!filesAreChosen.value) return true;
  if (!filesAreCorrectSize.value) return true;
  return false;
});
</script>

<template>
  <div
    class="mt-3 sm:grid gap-4 px-12 py-3 bg-gray-300"
    style="grid-template-columns: 2fr 3fr 1fr"
  >
    <div class="font-bold">Photo</div>
    <div>
      <div v-if="isEditable">
        <input
          type="file"
          accept="image/*"
          class="text-sm"
          ref="profilePictureFile"
          @change="onPhotoInputChanged"
        />
        <div class="italic text-sm">Maximum file size: 1MiB</div>
      </div>
      <div v-else>
        <div class="flex max-w-xs max-h-48" v-if="profilePictureURL">
          <img class="object-contain" :src="profilePictureURL" alt="" />
        </div>
        <div v-else>Add a photo to personalize your account.</div>
      </div>
    </div>
    <div>
      <div v-if="isEditable" class="flex gap-2">
        <button
          type="button"
          :class="{
            'bg-slate-300': isSaveButtonDisabled,
            'text-slate-500': isSaveButtonDisabled,
            'pointer-events-none': isSaveButtonDisabled,
          }"
          @click="onSave()"
        >
          Save
        </button>
        <button type="button" class="" @click="isEditable = false">
          Cancel
        </button>
      </div>
      <div v-else class="flex gap-2">
        <button type="button" class="" @click="isEditable = true">Edit</button>
        <button type="button" v-if="profilePictureURL" @click="onRemove()">
          Remove
        </button>
      </div>
    </div>
  </div>
</template>
