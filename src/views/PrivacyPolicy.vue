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
      <h2 class="font-extrabold text-4xl mb-3">Privacy Policy</h2>
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
      <p class="my-6 text-justify">
        <span class="font-bold italic">rentIE</span>. ("<span class="italic"
          >we</span
        >," "<span class="italic">our</span>," or "<span class="italic">us</span
        >") is committed to protecting your privacy. This Privacy Policy
        explains how your personal information is collected, used, and disclosed
        by rentlE. This Privacy Policy applies to our website, WEBSITE URL, and
        its associated subdomains (collectively, our "Service"). By accessing or
        using our Service, you signify that you have read, understood, and agree
        to our collection, storage, use, and disclosure of your personal
        information as described in this Privacy Policy and our Terms of
        Service.
      </p>

      <h3 class="font-bold text-2xl mb-3">What information do we collect?</h3>
      <p class="text-justify">
        We collect information from you when you visit our service, register,
        place an order, subscribe to our newsletter, respond to a survey or fill
        out a form.
      </p>
      <ul class="list-disc mb-6 ml-5">
        <li>Name / Username</li>
        <li>Phone Number</li>
        <li>Email Address</li>
        <li>Gender</li>
        <li>Age</li>
        <li>Password</li>
      </ul>

      <h3 class="font-bold text-2xl mb-3">
        How do we use the information we collect?
      </h3>
      <p class="text-justify">
        Any of the information we collect from you may be used in one of the
        following ways:
      </p>
      <ul class="list-disc mb-6 ml-5">
        <li>
          To personalize your experience (your information helps us to better
          respond to your individual needs)
        </li>
        <li>
          To improve our service (we continually strive to improve our service
          offerings based on the information and feedback we receive from you)
        </li>
        <li>
          To improve customer service (your information helps us to more
          effectively respond to your customer service requests and support
          needs)
        </li>
        <li>To process transactions</li>
        <li>To send periodic emails</li>
      </ul>

      <h3 class="font-bold text-2xl mb-3">
        Where and when is information collected from customers and end users?
      </h3>
      <p class="mb-6 text-justify">
        We will collect personal information that you submit to us. We may also
        receive personal information about you.
      </p>

      <h3 class="font-bold text-2xl mb-3">
        How do we use your e-mail address?
      </h3>
      <p class="mb-6 text-justify">
        By submitting your email address on this website, you agree to receive
        emails from us. You can cancel your participation in any of these email
        lists at any time by clicking on the opt-out link or other unsubscribe
        option that is included in the respective email. We only send emails to
        people who have authorized us to contact them, either directly, or
        through a third party. We do not send unsolicited commercial emails,
        because we hate spam as much as you do. Email addresses submitted only
        through the order processing page will be used for the sole purpose of
        sending you information and updates pertaining to your concern. If,
        however, you have provided the same email to us through another method,
        we may use it for any of the purposes stated in this Policy. Note: If at
        any time you would like to unsubscribe from receiving future emails, we
        include detailed unsubscribe instructions at the bottom of each email.
      </p>

      <h3 class="font-bold text-2xl mb-3">
        Is the information collected through our service secure?
      </h3>
      <p class="mb-6 text-justify">
        We take precautions to protect the security of your information. We have
        physical, electronic, and managerial procedures to help safeguard,
        prevent unauthorized access, maintain data security, and correctly use
        your information. However, neither people nor security systems are
        foolproof, including encryption systems. In addition, people can commit
        intentional crimes, make mistakes or fail to follow policies. Therefore,
        while we use reasonable efforts to protect your personal information, we
        cannot guarantee its absolute security. If applicable law imposes any
        non-disclaimable duty to protect your personal information, you agree
        that intentional misconduct will be the standards used to measure our
        compliance with that duty.
      </p>

      <h3 class="font-bold text-2xl mb-3">
        How long do we keep your information?
      </h3>
      <p class="mb-6 text-justify">
        We keep your information only so long as we need it to provide service
        to you and fulfill the purposes described in this policy. This is also
        the case for anyone that we share your information with and who carries
        out services on our behalf. When we no longer need to use your
        information and there is no need for us to keep it to comply with our
        legal or regulatory obligations, we'll either remove it from our systems
        or depersonalize it so that we can't identify you.
      </p>

      <h3 class="font-bold text-2xl mb-3">
        How do we protect your information?
      </h3>
      <p class="mb-6 text-justify">
        We implement a variety of security measures to maintain the safety of
        your personal information when you place an order or enter, submit, or
        access your personal information. We offer the use of a secure server.
        After a transaction, your private information (credit cards, social
        security numbers, financials, etc.) is never kept on file. We cannot,
        however, ensure or warrant the absolute security of any information you
        transmit to us or guarantee that your information on the Service may not
        be accessed, disclosed, altered, or destroyed by a breach of any of our
        physical, technical, or managerial safeguards.
      </p>

      <h3 class="font-bold text-2xl mb-3">Your Consent</h3>
      <p class="mb-6 text-justify">
        By using our service, registering an account, or making a purchase, you
        consent to this Privacy Policy.
      </p>

      <h3 class="font-bold text-2xl mb-3">Contact Us</h3>
      <p class="text-justify">
        Don't hesitate to contact us if you have any questions.
      </p>
      <ul class="list-disc ml-5">
        <li>e-mail: tanaypublicmarket@gmail.com</li>
      </ul>
    </main>
  </div>
</template>

<style>
.static-bg-container {
  background-image: url("../assets/img/static-page-bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
</style>
