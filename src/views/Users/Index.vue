<template>
    <div class="flex flex-col w-full">
        <h1 class="text-2xl font-bold mb-4 text-center">
            User
        </h1>

        <div class="border-t h-[1px] my-6"></div>
        <table class="table-fixed my-4">
            <thead>
                <tr>
                <th class="border border-gray-600">ID</th>
                <th class="border border-gray-600">Name</th>
                <th class="border border-gray-600">Email</th>
                <th class="border border-gray-600">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in store.users" :key="user.id">
                    <td class="border border-gray-600 text-center">{{ index + 1 }}</td>
                    <td class="border border-gray-600 text-center">{{ user.name }}</td>
                    <td class="border border-gray-600 text-center">{{ user.email }}</td>
                    <td class="border border-gray-600 text-center">
                        <RouterLink :to="{name: 'users.edit', params: { id: user.id } }" 
                    class="btn btn-secondary text-sm">
                        Edit
                    </RouterLink>
                    <button v-if="role == 'admin'" type="button" 
                    class="btn text-white bg-red-600 
                    hover:bg-red-400 text-sm mx-4"
                    @click="deleteUser(user)">
                        Delete
                    </button>
                    </td>
                </tr>  
            </tbody>
        </table>

    </div>
</template>

<script setup>
import { inject, onMounted } from 'vue';
import { useUser } from '../../stores/user';
import { Skeleton } from 'vue-loading-skeleton';

const store = useUser();

const role = localStorage.getItem("role")

onMounted(store.getUsers)
const swal = inject('$swal')

const deleteUser= (user) => {
    swal({
        title: 'Are you sure?',
        text: `${user.name} is gonna be deleted!`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: "Delete"
    }).then((result) => {
        if(result.value)
        {
            store.deleteUser(user)
            // swal({
            //     title: "Success",
            //     text: "User is deleted!",
            //     icon: "success"
            // }) 
        }
    });

}
</script>