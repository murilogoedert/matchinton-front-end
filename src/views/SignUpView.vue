<script setup lang="ts">
import { ref } from 'vue';
import { goToRouteIfLoggedIn, goToRoute } from '@/common/commonFunctions';
import SignupForm from '@/components/SignupForm.vue';


const dialogActive = ref(false);
const loginMessage = ref("");
const badgeColor = ref('red');


function onSignupFail(message: string){
    badgeColor.value = 'red';
    loginMessage.value = message;
    dialogActive.value = true;
}

function onSignUpSuccess(){
    badgeColor.value = 'green';
    loginMessage.value = 'Usuário cadastrado com sucesso!';
    dialogActive.value = true;

    setTimeout(() => {
        goToRoute('/login');
    }, 1000);
}

//Caso logado, redireciona para home
goToRouteIfLoggedIn('/');


</script>
<template>
    <div id="container-login">
        <div id="white">
            <img src="../assets/logo.png" />
        </div>
        <div id="red"></div>
    </div>
    <div id="form-overlay">
        <div id="login-form">
            <span id="text-welcome">Seja bem vindo!</span>
            
            <SignupForm @sign-up-fail="onSignupFail" @sign-up-success="onSignUpSuccess" />
        </div>
    </div>
    <v-dialog v-model="dialogActive" transition="dialog-bottom-transition" width="auto">
        <template v-slot:default="{ isActive }">
            <v-card>
                <v-toolbar id="dialog-badge" :color="badgeColor">Erro</v-toolbar>
                <v-card-text>
                    <div class="text-h5 pa-3">{{ loginMessage }}</div>
                </v-card-text>
                <v-card-actions class="justify-end">
                    <v-btn variant="text" @click="isActive.value = false">Fechar</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>
<style scoped> 
#red {
    background-color: var(--cor-vermelho);
} 

#dialog-badge{
    color: white;
    font-size: 1rem;
    height: 4rem;
    padding-left: 1rem;
    font-weight: 600;
}

#white {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}
 
#white img {
    width: 75%;
}

#container-login {
    display: grid;
    grid-template-columns: 60vw 40vw;
    height: 100%;
    width: 100%;
    position: relative;
}

#form-overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    top: 0;
    display: flex;
    padding-right: 24vw;
    justify-content: flex-end;
    align-items: center;
}

#login-form {
    background-color: white;
    border: 2px solid var(--cor-vermelho);
    border-radius: .6rem;
    height: 70vh;
    width: 30vw;
    display: grid;
    grid-template-rows: 2fr 6fr 1fr;
}

#login-form #signup-text {
    color: grey;
    font-size: 1renm;
    font-weight: bold;
    text-align: center;

}

#login-form #signup-text button {
    color: var(--cor-vermelho);
}

#text-welcome {
    color: var(--cor-vermelho);
    font-size: 1.2rem;
    text-align: center;
    line-height: 2rem;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
}


/* Mobile */
@media (max-width: 993px) {

    #red {
        display: none;
    }

    #container-login {

        grid-template-columns: auto;
    }

    #login-form {
        width: 100%;
        border: 0px;
        height: 60%;
    }

    #form-overlay {
        padding: 0;
        align-items: flex-end;
    }

    #white {
        justify-content: flex-start;
        align-items: center;
    }

    #white img {
        width: 350px;
    }

}
</style>