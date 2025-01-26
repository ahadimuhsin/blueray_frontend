import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import {useToast} from 'vue-toast-notification';

const $toast = useToast();

export const useUser = defineStore("user", () => {
    const router = useRouter();
    const errors = reactive({});
    const loading = ref(false);
    const users = ref([]);
    const user = ref([]);
    const errorCodeDelete = ref("")

    const role = localStorage.getItem("role");

    const form = reactive({
        name: "",
        email: ""
    });

    function resetForm()
    {
        form.name = "";
        form.email = "";

        errors.value = {};
    }


    function getUsers()
    {
        return window.axios
        .get("users")
        .then((response) => (users.value = response.data.data))
    }

    function getCurrentUser()
    {
        return window.axios
        .get("user")
        .then((response) => {
            user.value = response.data

            console.log(response.data)
        })
    }

    function updateUser(user)
    {
        if(loading.value) return;

        loading.value = true;
        errors.value = {};

        window.axios.put(`users/${user.id}`, form)
        .then(() => {
            $toast.open({
                message: "User is updated!",
                type: "success",
                position: "top-right"
            });
            router.push({name: 'users.index'})
        })
        .catch((error) => {
            if(error.response.status === 422)
            {
                errors.value = error.response.data.errors
            }
        }).finally(() => {
            loading.value = false
        })
    }

    function getUser(user)
    {
        window.axios.get(`users/${user.id}`)
        .then((response) => {
            console.log(response)
            form.name = response.data.data.name;
            form.email = response.data.data.email;
        })
    }

    function deleteUser(user)
    {
        window.axios.delete(`users/${user.id}`)
            .then(() => {
                $toast.open({
                    message: "User is deleted!",
                    type: "success",
                    position: "top-right"
                });
                getUsers();
            })
            .catch((error) => {
                console.error(error)
                $toast.open({
                    message: "Action denied",
                    type: "error",
                    position: "top-right"
                });
            });
    
    }

    return {errors, loading,
        resetForm, form,
        getUsers, users, user, getUser, role, getCurrentUser,
        updateUser, deleteUser, errorCodeDelete}
})