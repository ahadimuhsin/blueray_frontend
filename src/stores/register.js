import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { useAuth } from "./auth";

const $toast = useToast();

export const useRegister = defineStore("register", () => {
    const errors = reactive({});
    const loading = ref(false);
    const auth = useAuth();
    const form = reactive({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: ""
    });

    function resetForm(){
        form.name = "";
        form.email = "";
        form.password = "";
        form.password_confirmation = "";
        form.role = "";

        errors.value = {};
    }
    
    async function handleSubmit()
    {
        if(loading.value){
            return;
        }
        loading.value = true;

        errors.value = {};
        return window.axios.post("register", form)
        .then((response) => {
            auth.login("", response.data.role, response.data.name, "register")
            $toast.open({
                message: response.data.message,
                type: "success",
                position: "top-right"
            });
        })
        .catch((err) => {
            
            if(err.response.status === 422)
            {
                errors.value = err.response.data.errors.errors;
            }    
        })
        .finally(() => {
            form.password = "";
            form.password_confirmation = "";
            loading.value = false;
        })
    }
    return {form, resetForm, handleSubmit, errors, loading}
})