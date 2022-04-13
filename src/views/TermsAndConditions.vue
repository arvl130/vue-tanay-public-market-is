<script setup>
import NavBar from "../components/NavBar/NavBar.vue";
import PageHeader from "../components/PageHeader.vue";
import BackButton from "../assets/icons/BackButton.vue";
</script>

<template>
  <!-- <div class="py-32 text-center">
    <p class="font-extrabold text-4xl">About Page</p>
  </div> -->
  <div class="static-bg-container">
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

    <PageHeader>
      <h2 class="font-extrabold text-4xl mb-3">Terms & Conditions</h2>
      <!-- Actions -->
      <div class="flex justify-between">
        <router-link :to="{ name: 'Choose User' }" class="flex gap-2">
          <!-- Back Icon -->
          <BackButton />
          <span>Back</span>
        </router-link>
      </div>
    </PageHeader>

    <main class="max-w-6xl mx-auto px-6 pb-12 md:pr-48 lg:pr-56">
      <h3 class="font-bold text-2xl my-3">General Terms</h3>
      <p class="text-justify mb-3">
        By accessing and accepting the privacy policy, you confirm that you are
        in agreement with and bound by the terms of service contained in the
        Terms & Conditions outlined below. These terms apply to the entire
        website and any email or other type of communication between you and the
        website.
      </p>

      <p class="text-justify mb-3">
        Under no circumstances shall team be liable for any direct, indirect,
        special, incidental or consequential damages, including, but not limited
        to, loss of data or profit, arising out of the use, or the inability to
        use, the materials on this site, even if team or an authorized has been
        advised of the possibility of such damages. If your use of materials
        from this site results in the need for servicing, repair or correction
        of equipment or data, you assume any costs thereof.
      </p>

      <p class="text-justify mb-6">
        Will not be responsible for any outcome that may occur during the course
        of usage of our resources. We reserve the rights to change prices and
        revise the resources usage policy in any moment.
      </p>

      <h3 class="font-bold text-2xl mb-3">Restrictions</h3>
      <p class="text-justify mb-3">
        You agree not to, and you will not permit others to:
      </p>
      <ul class="list-disc text-justify mb-6 ml-5">
        <li>
          License, sell, rent, lease, assign, distribute, transmit, host,
          outsource, disclose or otherwise commercially exploit the service or
          make the platform available to any third party.
        </li>
        <li>
          Modify, make derivative works of, disassemble, decrypt, reverse
          compile or reverse engineer any part of the service.
        </li>
        <li>
          Remove, alter or obscure any proprietary notice (including any notice
          of copyright or trademark) of or its affiliates, partners, suppliers
          or the licensors of the service.
        </li>
      </ul>

      <h3 class="font-bold text-2xl mb-3">Your Suggestions</h3>
      <p class="text-justify mb-6">
        Any feedback, comments, ideas, improvements or suggestions
        (collectively, "Suggestions") provided by you to us with respect to the
        service shall remain the sole and exclusive property of us. We shall be
        free to use, copy, modify, publish, or redistribute the Suggestions for
        any purpose and in any way without any credit or any compensation to
        you.
      </p>

      <h3 class="font-bold text-2xl mb-3">Your Consent</h3>
      <p class="text-justify mb-6">
        We've updated our Terms & Conditions to provide you with complete
        transparency into what is being set when you visit our site and how it's
        being used. By using our service, registering an account, or making a
        purchase, you hereby consent to our Terms & Conditions.
      </p>

      <h3 class="font-bold text-2xl mb-3">Entire Agreement</h3>
      <p class="text-justify mb-6">
        The Agreement constitutes the entire agreement between you and us
        regarding your use of the service and supersedes all prior and
        contemporaneous written or oral agreements between you and us. You may
        be subject to additional terms and conditions that apply when you use or
        purchase other services from us, which we will provide to you at the
        time of such use or purchase.
      </p>

      <h3 class="font-bold text-2xl mb-3">Contact Us</h3>
      <p class="text-justify">
        Don't hesitate to contact us if you have any questions.
      </p>
      <ul class="list-disc text-justify ml-5">
        <li>e-mail: tanaypublicmarket@gmail.com</li>
      </ul>
    </main>
  </div>
</template>
