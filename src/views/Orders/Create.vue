<template>
  <form @submit.prevent="store.storeOrder" novalidate>
    <div class="flex flex-col mx-auto md:w-98 w-full">
      <h1 class="text-2xl font-bold mb-4 text-center">Add Order</h1>
      
      <div class="border-t h-[1px] my-6"></div>
      
      <h1 class="text-2xl font-bold mb-2 text-center">Barang</h1>
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-2 mb-4">
          <label for="name" class="required"> Nama </label>
          <input
            type="text"
            name="name"
            v-model="store.form.name"
            class="form-input"
            placeholder="Nama barang"
            :disabled="store.loading"
          />
          <ValidationError :errors="store.errors" field="name"></ValidationError>
        </div>

        <div class="flex flex-col gap-2">
          <label for="description" class="required"> Deskripsi </label>
          <input
            type="text"
            name="description"
            id="description"
            v-model="store.form.description"
            class="form-input"
            placeholder="Deskripsi Barang"
            :disabled="store.loading"
          />
          <ValidationError :errors="store.errors" field="description"></ValidationError>
        </div>

        <div class="flex flex-col gap-2 mb-4">
          <label for="weight" class="required"> Berat (gram) </label>
          <input
            type="number"
            name="weight"
            id="weight"
            v-model="store.form.weight"
            class="form-input"
            placeholder="Berat barang"
            :disabled="store.loading"
          />
          <ValidationError :errors="store.errors" field="weight"></ValidationError>
        </div>

        <div class="flex flex-col gap-2 mb-4">
          <label for="qty" class="required"> Quantity </label>
          <input
            type="number"
            name="qty"
            id="qty"
            v-model="store.form.qty"
            class="form-input"
            placeholder="Berat barang"
            :disabled="store.loading"
          />
          <ValidationError :errors="store.errors" field="qty"></ValidationError>
        </div>

        <div class="flex flex-col gap-2 mb-4">
          <label for="price" class="required"> Harga </label>
          <input
            type="number"
            name="price"
            id="price"
            v-model="store.form.price"
            class="form-input"
            placeholder="Harga barang"
            :disabled="store.loading"
          />
          <ValidationError :errors="store.errors" field="price"></ValidationError>
        </div>
      </div>

      <div class="border-t h-[1px] my-6"></div>

      <h1 class="text-2xl font-bold my-4 text-center">Pengirim</h1>
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-2 mb-4">
          <label for="sender_name" class="required"> Nama </label>
          <input
            type="text"
            name="sender_name"
            v-model="store.form.sender_name"
            class="form-input"
            placeholder="Nama barang"
            :disabled="store.loading"
          />
          <ValidationError :errors="store.errors" field="sender_name"></ValidationError>
        </div>

        <div class="flex flex-col gap-2">
          <label for="sender_address" class="required"> Alamat </label>
          <input
            type="text"
            name="sender_address"
            id="sender_address"
            v-model="store.form.sender_address"
            class="form-input"
            placeholder="Alamat"
            :disabled="store.loading"
          />
          <ValidationError :errors="store.errors" field="sender_address"></ValidationError>
        </div>

        <div class="flex flex-col gap-2 mb-4">
          <label for="sender_postal_code" class="required"> Kode Pos </label>
          <input
            type="number"
            name="sender_postal_code"
            id="sender_postal_code"
            v-model="store.form.sender_postal_code"
            class="form-input"
            placeholder="Kode Pos"
            :disabled="store.loading"
          />
          <ValidationError :errors="store.errors" field="sender_postal_code"></ValidationError>
        </div>

        <div class="flex flex-col gap-2 mb-4">
          <label for="sender_phone" class="required"> Nomor HP </label>
          <input
            type="number"
            name="sender_phone"
            id="sender_phone"
            v-model="store.form.sender_phone"
            class="form-input"
            placeholder="Nomor HP"
            :disabled="store.loading"
          />
          <ValidationError :errors="store.errors" field="sender_phone"></ValidationError>
        </div>
      </div>

      <div class="border-t h-[1px] my-6"></div>

      <h1 class="text-2xl font-bold my-4 text-center">Penerima</h1>
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-2 mb-4">
          <label for="recipient_name" class="required"> Nama </label>
          <input
            type="text"
            name="recipient_name"
            v-model="store.form.recipient_name"
            class="form-input"
            placeholder="Nama barang"
            :disabled="store.loading"
          />
          <ValidationError :errors="store.errors" field="recipient_name"></ValidationError>
        </div>

        <div class="flex flex-col gap-2">
          <label for="recipient_address" class="required"> Alamat </label>
          <input
            type="text"
            name="recipient_address"
            id="recipient_address"
            v-model="store.form.recipient_address"
            class="form-input"
            placeholder="Alamat"
            :disabled="store.loading"
          />
          <ValidationError :errors="store.errors" field="recipient_address"></ValidationError>
        </div>

        <div class="flex flex-col gap-2 mb-4">
          <label for="sender_postal_code" class="required"> Kode Pos </label>
          <input
            type="number"
            name="recipient_postal_code"
            id="recipient_postal_code"
            v-model="store.form.recipient_postal_code"
            class="form-input"
            placeholder="Kode Pos"
            :disabled="store.loading"
          />
          <ValidationError :errors="store.errors" field="recipient_postal_code"></ValidationError>
        </div>

        <div class="flex flex-col gap-2 mb-4">
          <label for="sender_phone" class="required"> Nomor HP </label>
          <input
            type="number"
            name="recipient_phone"
            id="recipient_phone"
            v-model="store.form.recipient_phone"
            class="form-input"
            placeholder="Nomor HP"
            :disabled="store.loading"
          />
          <ValidationError :errors="store.errors" field="recipient_phone"></ValidationError>
        </div>
      </div>

      <div class="border-t h-[1px] my-6"></div>

      <div class="flex gap-2">
        <button type="submit" class="btn btn-primary w-full" :disabled="store.loading">
          <IconSpinner v-show="store.loading" class="animate-spin"></IconSpinner>
          Save
        </button>
        <router-link :to="{ name: 'orders.index' }" class="btn btn-secondary"> Cancel </router-link>
      </div>
    </div>
  </form>
</template>

<script setup>
import { onBeforeUnmount } from 'vue'
import { useOrder } from '../../stores/order'

const store = useOrder()
onBeforeUnmount(store.resetForm)
</script>