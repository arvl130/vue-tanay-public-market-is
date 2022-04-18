<script setup>
import NavBar from "../../components/NavBar/NavBar.vue";
import PageHeader from "../../components/PageHeader.vue";
import BackButton from "../../assets/icons/BackButton.vue";
import DocumentIcon from "../../assets/icons/DocumentIcon.vue";
import AdminSecondaryButtons from "../../components/NavBar/AdminSecondaryButtons.vue";
import { useNoticeLetter } from "../../stores/noticeLetter";
import { computed, onMounted, onUnmounted, reactive, ref } from "vue";
import unixSecondsToWordDate from "../../composables/utils/unixSecondsToWordDate";
import getTenant from "../../composables/getTenant";
import getArrearsByTenantUID from "../../composables/notice-letter/getArrearsByTenantUID";
import createNewLetter from "../../composables/notice-letter/createNewLetter";
import { useRouter } from "vue-router";

const noticeLetterStore = useNoticeLetter();

onUnmounted(() => {
  noticeLetterStore.$reset();
});

const letterInfo = reactive({
  firstName: "",
  lastName: "",
  dateToday: "",
});

onMounted(async () => {
  if (noticeLetterStore.getNoticeLetter) {
    const { firstName, lastName } = await getTenant(
      noticeLetterStore.getNoticeLetter.tenant_uid
    );
    letterInfo.firstName = firstName;
    letterInfo.lastName = lastName;
    letterInfo.dateToday = unixSecondsToWordDate(
      noticeLetterStore.getNoticeLetter.timestamp.seconds
    );
  }
});

const arrears = ref(0);
onMounted(async () => {
  if (noticeLetterStore.getNoticeLetter) {
    arrears.value = await getArrearsByTenantUID(
      noticeLetterStore.getNoticeLetter.tenant_uid
    );
  }
});

const grandTotalArrears = computed(() => {
  const penalty = noticeLetterStore.getNoticeLetter.penalty / 100;
  const penaltyToAdd = arrears.value * penalty;
  return arrears.value + penaltyToAdd;
});

const router = useRouter();
const onSave = async () => {
  if (!isSaveButtonDisabled.value) {
    isSaved.value = true;
    await createNewLetter({
      ...noticeLetterStore.getNoticeLetter,
      arrears: arrears.value,
    });
    router.push({ name: "Admin Notice Letters" });
  }
};

const isSaved = ref(false);
const isSaveButtonDisabled = computed(() => {
  if (isSaved.value) return true;
  return false;
});
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
    <h2 class="font-extrabold text-4xl mb-3">Generated Notice Letter</h2>
    <!-- Actions -->
    <div class="flex justify-between">
      <router-link :to="{ name: 'Admin Notice Letters' }" class="flex gap-2">
        <!-- Back Icon -->
        <BackButton />
        <span>Back</span>
      </router-link>

      <button
        type="button"
        class="flex gap-2 bg-gray-200 p-2 shadow hover:shadow-md hover:bg-gray-300 rounded transition duration-200"
        :class="{
          'bg-slate-300': isSaveButtonDisabled,
          'text-slate-500': isSaveButtonDisabled,
          'pointer-events-none': isSaveButtonDisabled,
        }"
        v-if="noticeLetterStore.getNoticeLetter"
        @click="onSave()"
      >
        <!-- Document Icon -->
        <DocumentIcon />
        <span>Issue Letter</span>
      </button>
    </div>
  </PageHeader>

  <main class="max-w-6xl mx-auto p-6">
    <div v-if="noticeLetterStore.getNoticeLetter">
      <!-- Letter -->
      <div class="mb-16 max-w-4xl mx-auto shadow-2xl">
        <div class="max-w-3xl py-20 px-12 mx-auto">
          <!-- letterhead -->
          <div class="flex mb-4">
            <img
              src="../../assets/img/logo.webp"
              alt=""
              class="h-28 absolute ml-16 hidden md:inline-block"
            />
            <div class="h-28 grid content-center mx-auto text-center">
              <div>REPUBLIC OF THE PHILIPPINES</div>
              <div>PROVINCE OF RIZAL</div>
              <div>MUNICIPALITY OF TANAY</div>
            </div>
            <div></div>
          </div>
          <!-- Office name -->
          <div class="flex justify-center font-bold mb-4">
            OFFICE OF THE PUBLIC MARKET
          </div>
          <!-- Date Address -->
          <div class="mb-8">
            <div class="mb-8">{{ letterInfo.dateToday }}</div>
            <div>
              <span class="underline">
                Mr./Ms.
                {{ `${letterInfo.firstName} ${letterInfo.lastName}` }}
              </span>
            </div>
            <div>
              Commercial Stall
              <span class="underline">
                {{ `#${noticeLetterStore.getNoticeLetter.stores.join(", #")}` }}
              </span>
            </div>
            <div>Tanay Public Market</div>
            <div>Tanay, Rizal</div>
          </div>
          <!-- Body -->
          <div>
            <p class="mb-8">
              Dear, Mr./Ms.
              <span class="underline">
                {{ letterInfo.lastName }}
              </span>
            </p>
            <p class="text-justify mb-8">
              Attached herewith the statement of account of Tanay Public Market
              Commercial Stall
              <span class="underline">
                {{ `#${noticeLetterStore.getNoticeLetter.stores.join(", #")}` }}
              </span>
              amounting to
              <span class="underline">
                {{ `₱${arrears.toFixed(2)}` }}
              </span>
              arrears (with
              <span class="underline">
                {{ `${noticeLetterStore.getNoticeLetter.penalty}%` }}
              </span>
              penalty) with the grand total amount of
              <span class="underline">
                {{ `₱${grandTotalArrears.toFixed(2)}` }}
              </span>
              at Tanay Public Market is now due.
            </p>
            <p class="text-justify mb-8">
              This is also with connection to TAX ORDINANCE NO. 3 SERIES OF 1998
              Article VII- DELIQUENCY IN PAYMENT OF MONTHLY RENTAL A. In case of
              default in payment of monthly rental by the SECOND PARTY for three
              (3) consecutive months, the FIRST PARTY shall have the right to
              close down the stall and business, upon prior notice to, of the
              SECOND PARTY. The stall maybe allowed to commercially operate
              again only after payment of all ones by the SECOND PARTY.
            </p>
            <p class="text-justify mb-8">
              We respectfully request you to settle the amount immediately to
              avoid further concerns in your rental fee.
            </p>
            <p class="mb-8">Very truly yours,</p>
            <p>JEFFREY M. PINO, DPA EnP</p>
            <p>LEIPO/Market in charged</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>No notice letter found.</div>
  </main>
</template>
