<template>
  <button
    class="mb-3 inline-flex items-center border border-indigo-300 px-3 py-1.5 rounded-md text-indigo-500 hover:bg-indigo-50"
    @click="goBack"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="h-6 w-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M7 16l-4-4m0 0l4-4m-4 4h18"
      ></path>
    </svg>
    <span class="ml-1 font-bold text-lg">Back</span>
  </button>
  <div class="my-5 grow sm:mt-8 lg:mt-0">
    <div
      class="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
    >
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Order history</h3>

      <ol class="relative ms-3 border-s border-gray-200 dark:border-gray-700">
        <li
          v-for="item in store.tracks.history"
          :key="item.note"
          class="ms-6 text-primary-700 dark:text-primary-500"
        >
          <span
            class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800"
          >
            <svg
              class="h-4 w-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 11.917 9.724 16.5 19 7.5"
              />
            </svg>
          </span>
          <div>
            <h4 class="mb-0.5 font-semibold text-gray-400 dark:text-white">
              {{ formatDate(item.updated_at) }}
            </h4>
            <a href="#" class="text-sm font-medium hover:underline text-gray-400 dark:text-white">{{
              item.note
            }}</a>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import { useOrder } from '../../stores/order'
import { useRoute, useRouter } from 'vue-router'
import { watchEffect } from 'vue'
import { getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()

const store = useOrder()
const route = useRoute()
const router = useRouter()

watchEffect(async () => {
  store.getTracking({ trackingId: route.params.trackingId })
})

function goBack() {
  router.back()
}

function formatDate(isoString) {
  const date = new Date(isoString)
  return ` ${date.getDate()} ${
    proxy.$monthNames[date.getMonth()]
  } ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}
</script>