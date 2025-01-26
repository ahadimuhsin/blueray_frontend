import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { computed } from "vue";



export const useAuth = defineStore("auth", () => {
    const router = useRouter();
    const accessToken = useStorage("access_token", "")
    const name = useStorage("username", "")
    const role = useStorage("role", "");
    const check = computed (() => !!accessToken.value);

    function setAccessToken(value)
    {
        accessToken.value = value;
        window.axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${accessToken.value}`
    }

    function setRole(value)
    {
        role.value = value;
    }

    function setName(value)
    {
        name.value = value;
    }

    function login(accessToken, role, name, origin="login")
    {
        setAccessToken(accessToken);
        setRole(role);
        setName(name)

        if(origin === "login")
        {
            // return router.push({
            //     name: "orders.index",
            // })
            return router.push({name: "orders.index"}).then(() => {
                window.location.reload()
            })
        
        }
        else{
            return router.push({name: "login"});
        }
        
    }

    function destroyTokenAndRedirectTo(routeName = "login")
    {
        setAccessToken(null);
        setName(null)
        setRole(null);
        router.push({name: routeName})
    }

    async function logout()
    {
        return window.axios.post("logout").finally(() => {
            destroyTokenAndRedirectTo("login")
            window.location.reload();
        })
    }

    return {login, logout, check, destroyTokenAndRedirectTo}
})