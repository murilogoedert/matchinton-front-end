<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
import router from '@/router';
import { defineEmits } from 'vue';
import { defineProps } from 'vue';


const emit = defineEmits<{
    (event: 'loginFail', message: string): void
    (event: 'loginSuccess'): void
}>()

const props = defineProps({
    loginSuccessRoute: {
        type: String,
        required: true
    }
});



const username = ref('');
const password = ref('');
const userStore = useUserStore();
const isButtonLoading = ref(false);



function userNotEmpty(){
    return username.value.trim() != '' || "Campo obrigatório!";
}
function passNotEmpty(){
    return password.value.trim() != '' || "Campo obrigatório!";
}


async function loginAttempt() {
    if(typeof userNotEmpty() === 'boolean' && userNotEmpty() && typeof passNotEmpty() === 'boolean' && passNotEmpty()){
        isButtonLoading.value = true;
        const user = await userStore.login(username.value, password.value);
        if (user.value !== undefined && user.value !== null) {
            emit('loginSuccess')
            router.push(props.loginSuccessRoute);
        } else {
            emit('loginFail', "Usuário ou senha incorretos!");
        }
        isButtonLoading.value = false;
    }
}

</script>
<template>

    <VSheet class="pl-15 pr-15" style="background-color: transparent;">
        <VForm fast-fail @submit.prevent>
            <v-text-field v-model="username" :rules="[userNotEmpty]" req name="username" label="Usuário" id="username"></v-text-field>
            <v-text-field v-model="password" :rules="[passNotEmpty]" name="password" label="Senha" hint="Pelo menos 8 caracteres" min="8" max="16"
                type="password"></v-text-field>
            <VBtn @click="loginAttempt" :loading="isButtonLoading" type="submit" block class="mt-2 btn-login">Entrar</VBtn>
        </VForm>
    </VSheet>
</template>
<style scoped>
.btn-login {
    background-color: var(--cor-vermelho);
    color: white;
}
</style>
    