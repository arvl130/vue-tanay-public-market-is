<template>
  <div
    class="fixed padding-0 inset-0 bg-black bg-opacity-20 flex justify-center items-center"
  >
    <div
      class="max-w-prose max-h-screen bg-white p-6 m-3 shadow-2xl grid rounded-md"
    >
      <!-- Header -->
      <div class="font-bold text-2xl mb-3">
        <slot name="header"></slot>
      </div>
      <!-- Body -->
      <div class="mb-5">
        <slot name="body"></slot>
      </div>
      <!-- Controls -->
      <div class="flex justify-between gap-3">
        <slot name="controls"></slot>
      </div>
    </div>
  </div>
</template>
