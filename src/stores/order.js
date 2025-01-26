import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import {useToast} from 'vue-toast-notification';

const $toast = useToast();

export const useOrder = defineStore("order", () => {
    const router = useRouter();
    const errors = reactive({});
    const loading = ref(false);
    const orders = ref([]);

    const tracks = ref([]);([]);

    const form = reactive({
         // sender
         sender_name : "",
         sender_address : "",
         sender_postal_code : "",
         sender_phone : "",

         // recipient
         recipient_name : "",
         recipient_address : "",
         recipient_postal_code : "",
         recipient_phone : "",

         //  item
         name : "",
         description : "",
         qty : "",
         weight : "",
         price : "",
    });

    function resetForm()
    {
        // sender
        form.sender_name = "";
        form.sender_address = "";
        form.sender_postal_code = "";
        form.sender_phone = "";

         // recipient
         form.recipient_name = "";
         form.recipient_address = "";
         form.recipient_postal_code = "";
         form.recipient_phone = "";

        //  item
        form.name = ""
        form.description = ""
        form.qty = ""
        form.weight = ""
        form.price = ""

        errors.value = {};
    }

    function storeOrder()
    {
        if(loading.value) return;

        loading.value = true;
        errors.value = {};

        window.axios.post("orders", form)
        .then(() => {
            $toast.open({
                message: "Order created!",
                type: "success",
                position: "top-right"
            });
            router.push({name: "orders.index"})
        })
        .catch((error) => {

            if(error.response.status === 422)
            {
                errors.value = error.response.data.errors.errors
            }

            $toast.open({
                message: "Order failed: "+error.response.data.message,
                type: "error",
                position: "top-right"
            });

            
        })
        .finally(() => {
            // sender
            form.sender_name = "";
            form.sender_address = "";
            form.sender_postal_code = "";
            form.sender_phone = "";

            // recipient
            form.recipient_name = "";
            form.recipient_address = "";
            form.recipient_postal_code = "";
            form.recipient_phone = "";

            //  item
            form.name = ""
            form.description = ""
            form.qty = ""
            form.weight = ""
            form.price = ""
            loading.value = false
        })
    }

    function getOrders()
    {
        return window.axios
        .get("orders")
        .then((response) => (orders.value = response.data.data))
    }
    

    function getTracking(order)
    {
        window.axios.get(`orders/tracking/${order.trackingId}`)
        .then((response) => {
            tracks.value = response.data.data
        })
    }

    return {errors, loading, storeOrder, 
        resetForm, form, 
        getOrders, orders, getTracking, tracks}
})