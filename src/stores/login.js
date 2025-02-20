import { defineStore } from "pinia";
import { useAuth } from "./auth";
import { reactive, ref } from "vue";

export const useLogin = defineStore("login", () => {
    const auth = useAuth();
    const errors = reactive({})
    const loading = ref(false)

    const form = reactive({
        email: "",
        password: "",
        remember: false
    })

    let resetForm = () => {
        form.email = "";
        form.password = "";
        form.remember = false;
        
        errors.value = {}
    }

    async function handleSubmit()
    {
        if(loading.value) return;

        loading.value = true;
        errors.value = {};

        return window.axios
        .post("login", form)
        .then((response) => {
            auth.login(response.data.data.token, response.data.data.user.role, response.data.data.user.name)
        })
        .catch((err) => {
            console.error(err.response)
            if(err.response.status === 422)
            {
                errors.value = err.response.data.errors.errors;
            }
        })
        .finally(() => {
            form.password = ""
            loading.value = false;
        })
    }

    return {form, errors, loading, resetForm, handleSubmit}
})