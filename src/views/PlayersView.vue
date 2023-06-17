<script setup lang="ts">
import { goToLoginIfNotLoggedIn } from '@/common/commonFunctions';
import MyHeader from '@/components/MyHeader.vue';
import { usePlayerStore, type Player } from '@/stores/player';
import { onMounted } from 'vue';
import { ref } from 'vue';
import router from '@/router';
import { IMG_URL } from '@/stores/api';
import { Icon } from '@iconify/vue';

const playerStore = usePlayerStore();
const players = ref<Player[]>([]);

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

    // Por enquanto pegando todos os players
    // Alterar para mostrar apenas os do meu time
    playerStore.getAllPlayers()
        .then((response) => {
            response.data.forEach((element: Player) => {
                players.value.push(element);
            });

            isLoading.value = false;
        })
        .catch((e) => {
            error = true;
            isLoading.value = false;
            dialogBadgeColor.value = 'red';
            dialogMessage.value = 'Erro ao listar jogadores! ' + e;
            dialogActive.value = true;
        })    
});

function addPlayer() {
    router.push("/player");
}

function editPlayer(id: number | undefined) {
    router.push("/player/" + id);
}

</script>
<template>
    <MyHeader />
    <div id="mainList">
        <v-card :loading="isLoading" v-if="isLoading">
            <v-overlay :value="isLoading">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-overlay>
            <v-card-title>
                <h3>Recuperando Dados...</h3>
            </v-card-title>
        </v-card>
        <div id="title">
            <h2>Meus Jogadores</h2>        
            <Icon icon="icon-park-solid:add" class="iconList" @click="addPlayer"/>
        </div>
        <div id="players">
            <div class="player" v-for="player, index in players">
                <v-img
                    :width="200"
                    aspect-ratio="1/1"
                    cover
                    :src="IMG_URL + '/' + player.photo"
                    class="playerImg"
                ></v-img>
                <div class="playerDetails">
                    <div class="playerName">
                        <h2>{{ player.name }}</h2>
                        <Icon icon="mdi:eye" class="iconList" @click="editPlayer(player.id)"/>
                    </div>
                    <div>
                        <h4>{{ player.state }} - {{ player.city }}</h4>
                        <h4>{{ player.observation }}</h4>
                    </div>
                </div>
            </div>
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
    #mainList {
        position: absolute;
        top: 16vh;

        left: 50%;
        transform: translateX(-50%);
    }

    #mainList h2 {
        color: var(--cor-vermelho);
    }

    #mainList h4 {
        font-weight: 400;
        
        color: #999999;
    }

    #title {
        display: grid;
        grid-template-columns: repeat(2, max-content);
        column-gap: 2vh;

        align-items: center;
    }

    #players {
        padding: 2vh;

        display: grid;
    }

    .player {
        padding: 2vh;

        border-bottom: 1px solid var(--cor-vermelho);

        display: grid;
        grid-template-columns: repeat(2, max-content);
        column-gap: 2vh;
    }
    
    .playerImg {
        border: 1px solid var(--cor-vermelho);
        border-radius: 7px;
    }

    .playerDetails {
        display: grid;
        grid-template-rows: repeat(2, max-content);
    }

    .playerName {
        display: grid;
        grid-template-columns: repeat(2, max-content);
        column-gap: 2vh;

        align-items: center;
    }

    .iconList {
        width: 3vh;
        height: 3vh;

        color: var(--cor-vermelho);

        cursor: pointer;
    }
</style>