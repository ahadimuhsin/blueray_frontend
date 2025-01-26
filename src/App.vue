<template>
  <header class="py-6 bg-gray-100 shadow">
    <div class="container px-4 mx-auto">
      <nav class="flex gap-4 justify-between">
        <div class="flex gap-4 items-center">
          <template v-if="auth.check">
            <router-link :to="{ name: 'users.index' }" class="router-link">
              Users
            </router-link>
            <router-link :to="{ name: 'orders.index' }" class="router-link">
              Orders
            </router-link>
          </template>
          <template v-else>
            <RouterLink class="router-link" :to="{ name: 'home' }"> Home </RouterLink>
          </template>
        </div>

        <div class="flex gap-4 items-center">
          <template v-if="auth.check">
            <h5>{{ name }}</h5>
            <button @click="auth.logout" class="router-link">Logout</button>
          </template>
          <template v-else>
            <RouterLink class="router-link" :to="{ name: 'login' }"> Login </RouterLink>
            <RouterLink class="router-link" :to="{ name: 'register' }">
              Register
            </RouterLink>
          </template>
        </div>
      </nav>
    </div>
  </header>

  <div class="container px-4 pt-8 md:pt-16 mx-auto">
    <RouterView />
    <notifications />
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { useAuth } from "./stores/auth";

const name = localStorage.getItem("username");

// onUpdated(loggedInUser)

const auth = useAuth();
</script>
