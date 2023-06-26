<script setup lang="ts">
import { goToLoginIfNotLoggedIn } from '@/common/commonFunctions';
import MyHeader from '@/components/MyHeader.vue';
import PlayerCard from '@/components/PlayerCard.vue';
import router from '@/router';
import { usePlayerStore, type Player, type PlayerHome } from '@/stores/player';
import { useUserStore } from '@/stores/user';
import { onMounted, ref } from 'vue';

const playerStore = usePlayerStore();
const userStore =  useUserStore();
const players = ref<PlayerHome[]>([]);

const isLoading = ref(false);
const dialogActive = ref(false);
const dialogBadgeColor = ref('green');
const dialogMessage = ref('');
var error = false;

//Caso não logado, volta para o /login
goToLoginIfNotLoggedIn();        

function routePlayer() {
    if (!error) {
        router.go(0);
    }
}      

onMounted(() => {
    isLoading.value = true;
    error = false;

    console.log(userStore.getUser().value);

    playerStore.getAllPlayers()
        .then((response) => {
            response.data.forEach((element: Player) => {
                players.value.push({ player: element, details: false})
            });

            isLoading.value = false;
        })
        .catch((e) => {
            error = true;
            isLoading.value = false;
            dialogBadgeColor.value = 'red';
            dialogMessage.value = 'Erro ao listar jogadores! ' + e;
            dialogActive.value = true;

            console.log(e);
        })
})

function toggleDetails(index: number) {
    players.value[index].details = !players.value[index].details;
}

</script>
<template>
    <MyHeader />
    <div id="mainHome">
        <v-card :loading="isLoading" v-if="isLoading">
            <v-overlay :value="isLoading">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-overlay>
            <v-card-title>
                <h3>Recuperando Dados...</h3>
            </v-card-title>
        </v-card>        
        <h2>Jogadores Disponíveis</h2>
        <h2 v-if="players.length == 0">Não há nenhum jogador disponível no momento</h2>
        <div id="players">
            <PlayerCard
                v-for="player, index in players"
                :key="index"
                :player="player"
                @toggleDetails="toggleDetails(index)"
            />
        </div>
    </div>
    <!-- Mensagem de erro -->
    <v-dialog v-model="dialogActive" transition="dialog-bottom-transition" width="auto">
        <template v-slot:default="{ isActive }">
            <v-card>
                <v-toolbar id="dialog-badge" :color="dialogBadgeColor"></v-toolbar>
                <v-card-text>
                    <div class="text-h5 pa-3">{{ dialogMessage }}</div>
                </v-card-text>
                <v-card-actions class="justify-end">
                    <v-btn variant="text" @click="routePlayer">Fechar</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>  
</template>
<style scoped>
#mainHome {
    position: absolute;
    top: 16vh;

    left: 50%;
    transform: translateX(-50%);
}

#mainHome h2 {
    color: var(--cor-vermelho);
}

#players {
    margin-top: 3vh;

    display: grid;
    grid-template-columns: repeat(3, min-content);
    column-gap: 2vh;
    row-gap: 2vh;
}

/* Mobile */
@media (max-width: 993px) {

    #players {
        grid-template-columns: repeat(1, min-content);
    }

}
</style>