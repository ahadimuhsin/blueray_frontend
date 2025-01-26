<template>
    <div class="flex flex-col">
        <h1 class="text-2xl font-bold mb-4 text-center">
            List Orders
        </h1>

        <router-link :to="{name: 'orders.create'}" class="router-link text-right">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add Order
            </button>
        </router-link>

        <p>Total Order:{{ store.orders.length }}</p>
        
        <table class="table-fixed my-4">
            <thead>
                <tr>
                <th class="border border-gray-600">Order ID</th>
                <th class="border border-gray-600">Item Name</th>
                <th class="border border-gray-600">Weight</th>
                <th class="border border-gray-600">Qty</th>
                <th class="border border-gray-600">Price</th>
                <th class="border border-gray-600">Tracking</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in store.orders" :key="order.id">
                    <td class="border border-gray-600 text-center">{{ order.order_id }}</td>
                    <td class="border border-gray-600 text-center">{{ order.item_name }}</td>
                    <td class="border border-gray-600 text-center">{{ order.weight }}</td>
                    <td class="border border-gray-600 text-center">{{ order.qty }}</td>
                    <td class="border border-gray-600 text-center">{{ order.price }}</td>
                    <td class="border border-gray-600 text-center">
                        <RouterLink :to="{name: 'orders.tracking', params: {trackingId: order.tracking_id}}" class="btn btn-secondary text-sm">
                            Track Order
                    </RouterLink>
                    </td>
                </tr>
            </tbody>
        </table>
    </div> 
    <!-- </div> -->
</template>

<script setup>
import { inject, onMounted } from 'vue';
import { useOrder } from '../../stores/order';

const store = useOrder();
onMounted(store.getOrders)
const swal = inject('$swal')

</script>