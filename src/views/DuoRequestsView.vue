<script setup lang="ts">
import { ref } from 'vue';

import MyHeader from '@/components/MyHeader.vue';
import { onBeforeMount } from 'vue';
import { useDuoRequestStore, type DuoRequestUpdate, type DuoRequestResponse } from '@/stores/duo_request';
import { useUserStore } from '@/stores/user';
import type { AxiosResponse } from 'axios';
import PlayerCard from '@/components/PlayerCard.vue';
import { Icon } from '@iconify/vue';
import router from '@/router';
import { goToLoginIfNotLoggedIn } from '@/common/commonFunctions';

const isLoading = ref(false);
const dialogActive = ref(false);
const dialogBadgeColor = ref('red');
const dialogMessage = ref('');

const duoRequestStore = useDuoRequestStore();
const userStore = useUserStore();
var duoRequests = ref<DuoRequestResponse[]>([]);

const showOnlyPending = ref(true);

//Caso não logado, volta para o /login
goToLoginIfNotLoggedIn();

onBeforeMount(async () => {
    isLoading.value = true;
    const user = userStore.getUser();
    const duos = await duoRequestStore.getAllDuoRequestsByTeam(user.value?.team_id || 0) as AxiosResponse<DuoRequestResponse[]>;
    
    if (duos.data && duos.data.length > 0) {
        duoRequests.value = duos.data;
    }
        
    isLoading.value = false;
});

function trataStatus(statusString: string | undefined) {
    switch (statusString) {
        case 'PENDING':
            return 'Pendente'
        case 'ACCEPTED':
            return 'Aceita'
        case 'DENIED':
            return 'Negada'
        case 'CANCELED':
            return 'Cancelada'
        case 'DISREGARDED':
            return 'Desconsiderada'
        default:
            return 'Desconhecido'
    }
}

function updateDuoRequest(duoUpdate: DuoRequestUpdate) {
    isLoading.value = true;

    duoRequestStore.updateDuoRequest(duoUpdate).then(() => {
        isLoading.value = false;

        dialogBadgeColor.value = 'green';
        dialogMessage.value = 'Solicitação ' + trataStatus(duoUpdate.status) + ' com sucesso!'
        dialogActive.value = true;

        setTimeout(() => {
            router.go(0);
        }, 2000);

    }).catch((err) => {
        dialogBadgeColor.value = 'red';
        dialogMessage.value = err.response?.data?.message
        dialogActive.value = true;
    });
}

function checkCancelEnabled(duoRequest: DuoRequestResponse) {
    // return duoRequest.status == 'PENDING' && duoRequest.player_target?.team_id == userStore.getUser().value?.team_id;
    return duoRequest.status == 'PENDING' && duoRequest.player_origin?.team_id == userStore.getUser().value?.team_id;
}

function checkDenyEnabled(duoRequest: DuoRequestResponse) {
    // return duoRequest.status == 'PENDING' && duoRequest.player_origin?.team_id == userStore.getUser().value?.team_id;
    return duoRequest.status == 'PENDING' && duoRequest.player_target?.team_id == userStore.getUser().value?.team_id;
}

function checkAcceptEnabled(duoRequest: DuoRequestResponse) {
    // return duoRequest.status == 'PENDING' && duoRequest.player_origin?.team_id == userStore.getUser().value?.team_id;
    return duoRequest.status == 'PENDING' && duoRequest.player_target?.team_id == userStore.getUser().value?.team_id;
}

function getPendingRequests() {
    return duoRequests.value.filter(duo => duo.status === 'PENDING').length;
}

</script>
<template>
    <MyHeader />
    <div id="mainReqs">
        <v-card :loading="isLoading" v-if="isLoading">
            <v-overlay :value="isLoading">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-overlay>
            <v-card-title>
                <h3>Recuperando Dados...</h3>
            </v-card-title>
        </v-card>    
        <div id="title">
            <h2>Minhas Requisições</h2>
            <v-checkbox
                label="Exibir somente requisições pendentes"
                color="red"
                density="compact"
                hide-details
                v-model="showOnlyPending"
            ></v-checkbox>
        </div>
            <h2 v-if="showOnlyPending && getPendingRequests() === 0">Não há nenhuma requisição pendente para seus jogadores</h2>
        <ul>
            <li v-for="duoRequest in duoRequests">
                <div class="request-info" v-if="!showOnlyPending || (showOnlyPending && duoRequest.status === 'PENDING')">
                    <div class="player-cards">
                        <PlayerCard :edit="false" :show-duo-request="false"
                            :player="{ player: duoRequest.player_origin, details: false }"></PlayerCard>
                        <Icon class="icon-sport" icon="material-symbols:sports-tennis" />
                        <PlayerCard :edit="false" :show-duo-request="false"
                            :player="{ player: duoRequest.player_target, details: false }"></PlayerCard>
                    </div>
                    <div class="area-info">
                        <div class="info-request">
                            <div>Competição: {{ duoRequest.competition.name }}</div>
                            <div>Status: {{ trataStatus(duoRequest.status) }}</div>
                        </div>
                        <div class="actions">
                            <v-btn @click="updateDuoRequest({
                                id: duoRequest.id,
                                player_id: duoRequest.player_origin?.id || 0,
                                status: 'CANCELED'
                            })" title="Teste" color="red" v-if="checkCancelEnabled(duoRequest)">
                                <Icon icon="material-symbols:close" />
                                Cancelar
                            </v-btn>
                            <v-btn color="pink" @click="updateDuoRequest({
                                id: duoRequest.id,
                                player_id: duoRequest.player_target?.id || 0,
                                status: 'DENIED'
                            })" v-if="checkDenyEnabled(duoRequest)">
                                <Icon color="white" icon="material-symbols:delete" />
                                <span style="color:white">Negar</span>
                            </v-btn>
                            <v-btn color="green" @click="updateDuoRequest({
                                id: duoRequest.id,
                                player_id: duoRequest.player_target?.id || 0,
                                status: 'ACCEPTED'
                            })" v-if="checkAcceptEnabled(duoRequest)">
                                <Icon icon="material-symbols:check" />
                                Aceitar
                            </v-btn>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
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
                    <v-btn variant="text" @click="dialogActive = false">Fechar</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>
<style scoped>
#mainReqs {
    position: absolute;
    top: 16vh;
    
    left: 50%;
    transform: translateX(-50%);
}

#mainReqs h2 {
    color: var(--cor-vermelho);
}

#title {
    margin-bottom: 2vh;
}

.icon-sport {
    height: 10vh;
    width: 10vh;
    color: var(--cor-vermelho);
}

ul {
    width: 100%;
}

li {
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
}

.request-info {
    display: grid;
    background-color: rgba(255, 76, 78, 0.2);
    border-radius: 15px;
    padding: 2rem;
    width: 50rem;
    height: 35rem;
    margin-bottom: 5rem;
}

.info-request {
    font-family: sans-serif;
    font-weight: 600;
    width: 50%;
}

.actions {
    width: 50%;
    display: flex;
    gap: 1rem;
    justify-content: center;
}

.area-info {
    display: flex;
    justify-content: center;
    align-items: center;
}

.player-cards {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
</style>