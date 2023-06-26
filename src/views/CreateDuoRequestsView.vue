<script setup lang="ts">
import MyHeader from '@/components/MyHeader.vue';
import { useCompStore, type Competition } from '@/stores/competition';
import { useUserStore } from '@/stores/user';
import { usePlayerStore, type Player } from '@/stores/player';
import { useDuoRequestStore } from '@/stores/duo_request';
import type { AxiosError, AxiosResponse } from 'axios';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';

const route = useRoute();
var competitions: Competition[];
var players: Player[];


const dialogActive = ref(false);
const dialogBadgeColor = ref('red');
const dialogMessage = ref('');

const competitionsList = ref<string[]>([]);
const playersList = ref<string[]>([]);

const playerName = ref('');

const competitionStore = useCompStore();
const userStore = useUserStore();
const playerStore = usePlayerStore();
const duoRequestStore = useDuoRequestStore();

const selectedCompetition = ref('');
const selectedPlayer = ref('');

onMounted(async () => {

    const playerRoute = await playerStore.getPlayer(route.params.player_id) as AxiosResponse<Player>;
    playerName.value = playerRoute.data.name;

    const compData = await competitionStore.getComps() as AxiosResponse<Competition[]>;
    competitions = compData.data;

    competitions.map((comp) => {
        competitionsList.value.push(comp.name);
    });

    const playersData = await playerStore.getPlayerByTeam(userStore.getUser().value?.team_id) as AxiosResponse<Player[]>;
    if (playersData.data && playersData.data.length > 0) {
        players = playersData.data;
        players.map((player) => {
            playersList.value.push(player.name);
        });
    }

});

function onSubmit() {
    if (selectedCompetition.value.trim() !== '' && selectedPlayer.value.trim() !== '') {
        duoRequestStore.createDuoRequest({
            player1: +route.params.player_id,
            player2: +(players.filter((play) => { return play.name == selectedPlayer.value })[0].id || 0),
            competition: +(competitions.filter((comp) => { return comp.name == selectedCompetition.value })[0].id || 0)
        }).then(() => {
            dialogBadgeColor.value = 'green';
            dialogMessage.value = 'Solicitação criada com sucesso!'
            dialogActive.value = true;


            setTimeout(() => {
                router.push('/');
            }, 1500);
        }).catch((err) => {
            dialogBadgeColor.value = 'red';
            dialogMessage.value = err.response?.data?.message
            dialogActive.value = true;
        });
    }
}


</script>
<template>
    <MyHeader />
    <div class="content">
        <h3>Selecione um jogador para fazer dupla com: <strong> {{ playerName }}</strong></h3>
        <v-form label="Solicitação de Dupla">
            <v-select variant="solo" required v-model="selectedCompetition" :items="competitionsList"
                label="Selecione a competição"></v-select>
            <v-select variant="solo" :items="playersList" required v-model="selectedPlayer" label="Selecione um jogador"
                no-data-text="Nenhum Jogador Encontrado"></v-select>
            <v-btn @click="onSubmit" color="success">Solicitar dupla</v-btn>
        </v-form>
    </div>
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
.content {
    position: relative;
    top: 16vh;
    width: 50vw;
    margin-left: auto;
    margin-right: auto;

    text-align: center;
}

.content h3 {
    color: var(--cor-vermelho);

    margin-bottom: 2vh;
}

</style>