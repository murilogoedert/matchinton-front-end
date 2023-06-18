<script setup lang="ts">
import { useTeamStore } from '@/stores/team';
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';

const emit = defineEmits<{
    (event: 'signUpFail', message: string): void
    (event: 'signUpSuccess'): void
}>()

const {signup} = useUserStore();
const {createTeam, verifyTeam} = useTeamStore();

const name = ref('');
const phone = ref('');
const email = ref('');
const team = ref('');
const username = ref('');
const password = ref('');
const repeatPass = ref('');

function signUpAttempt() {
    if(name.value == '' || team.value == '' || username.value == '' || phone.value == '' || email.value == '' || password.value == ''){
        emit('signUpFail', 'Não foram preenchidas todas as informações!');
        return;
    }

    if(password.value != repeatPass.value){
        emit('signUpFail', 'As senhas devem ser iguais!');
        return;
    }

    verifyTeam(team.value)
        .then((response) => {
            // Se esse time ainda nao existir
            if (response.data.length == 0) {
                signup(name.value, username.value, phone.value, email.value, password.value).then((res) => {
                    if(res.status == 201) {
                        createTeam(team.value, res.data.id)
                            .then(() => {
                                emit('signUpSuccess');
                            })
                            .catch((e) => {
                                console.log(e);
                                emit('signUpFail', 'Erro ao realizar cadastro! ' + res.statusText);
                            })
                    }else{
                        console.log(res);
                        emit('signUpFail', 'Erro ao realizar cadastro! ' + res.statusText);
                    }
                });
            } else {
                emit('signUpFail', 'Time informado já existe! ' + response.statusText);
            }
        })
        .catch((e) => {
            console.log(e);
        })
}

</script>
<template>
    <VSheet class="pl-15 pr-15" style="background-color: transparent;">
        <VForm fast-fail @submit.prevent>
            <v-text-field v-model="name" :rules="[(value) => value.trim().length > 0 || 'Este campo é obrigatório']"
                name="name" label="Nome" id="name"></v-text-field>
            <v-text-field v-model="team" :rules="[(value) => value.trim().length > 0 || 'Este campo é obrigatório']"
                name="time" label="Time" id="team"></v-text-field>
            <v-text-field v-model="email" :rules="[(value) => value.trim().length > 0 || 'Este campo é obrigatório']"
                name="email" label="Email" id="email"></v-text-field>                
            <v-text-field v-model="phone" :rules="[(value) => value.trim().length > 0 || 'Este campo é obrigatório']"
                name="phone" label="Telefone" id="phone"></v-text-field>
            <v-text-field v-model="username" :rules="[(value) => value.trim().length > 0 || 'Este campo é obrigatório']"
                name="username" label="Nome de usuário" id="username"></v-text-field>
            <v-text-field v-model="password" name="password" label="Senha" hint="Pelo menos 8 carácteres" min="8" max="16"
                type="password"></v-text-field>
            <v-text-field v-model="repeatPass" name="password repeat" label="Repita a senha" min="8" max="16"
                type="password"></v-text-field>
            <VBtn @click="signUpAttempt" type="submit" block class="mt-2 btn-login">Registrar</VBtn>
        </VForm>
    </VSheet>
</template>
<style scoped>
.btn-login {
    background-color: var(--cor-vermelho);
    color: white;
}
</style>
    