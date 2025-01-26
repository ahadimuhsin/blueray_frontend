<template>
    <form @submit.prevent="store.updateUser({id: route.params.id})" novalidate>
        <div class="flex flex-col mx-auto md:w-96 w-full">
            <h1 class="text-2xl font-bold mb-4 text-center">
                Edit User
            </h1>
            <div class="flex flex-col gap-2 mb-4">
                <label for="name" class="required">
                    Name
                </label>
                <input type="text" name="name" 
                id="name"
                v-model="store.form.name"
                class="form-input"
                placeholder="Name"
                :disabled="store.loading">
                <ValidationError :errors="store.errors" 
                field="name"></ValidationError>
            </div>

            <div class="flex flex-col gap-2">
                <label for="email" class="required">
                    Email
                </label>
                <input type="email" name="email" 
                id="email"
                v-model="store.form.email"
                class="form-input"
                placeholder="Toyota yang kenceng banget"
                :disabled="store.loading">
                <ValidationError :errors="store.errors" field="email"></ValidationError>
            </div>

            <div class="border-t h-[1px] my-6"></div>

            <div class="flex gap-2">
                <button type="submit" class="btn btn-primary w-full" :disabled="store.loading">
                    <IconSpinner v-show="store.loading" class="animate-spin"></IconSpinner>
                    Update
                </button>
                <router-link :to="{name: 'users.index'}" class="btn btn-secondary">
                    Cancel
                </router-link>
            </div>
        </div>
    </form>
</template>

<script setup>
import { onBeforeUnmount, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useUser } from '../../stores/user';

const store = useUser();
const route = useRoute();

onBeforeUnmount(store.resetForm)

watchEffect(async () => {
    store.getUser({id: route.params.id})
})
</script>