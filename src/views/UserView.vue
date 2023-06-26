<script setup lang="ts">
import { goToLoginIfNotLoggedIn } from '@/common/commonFunctions';
import MyHeader from '@/components/MyHeader.vue';
import PlayerCard from '@/components/PlayerCard.vue';
import router from '@/router';
import { usePlayerStore, type Player, type PlayerHome } from '@/stores/player';
import { useTeamStore, type Team } from '@/stores/team';
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { Icon } from '@iconify/vue';

const userStore = useUserStore();
const playerStore = usePlayerStore();
const teamStore = useTeamStore();
const user = userStore.getUser().value;
const team = ref<Team[]>([]);
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
    
    teamStore.getMyTeam()
        .then((response) => {
            team.value = response.data;
            console.log(team.value);

            response.data.forEach((element: Team) => {
                playerStore.getPlayerByTeam(element.id)
                    .then((res) => {
                        res.data.forEach((element: Player) => {
                            players.value.push({ player: element, details: true})
                        });    
                    })
                    .catch((e) => {
                        error = true;
                        isLoading.value = false;
                        dialogBadgeColor.value = 'red';
                        dialogMessage.value = 'Erro ao listar jogadores! ' + e;
                        dialogActive.value = true;
                    })
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

function toggleDetails(index: number) {
    players.value[index].details = !players.value[index].details;
}

function addPlayer() {
    router.push("/player");
}

function editPlayer(id: number | undefined) {
    router.push("/player/" + id);
}

</script>
<template>
    <MyHeader />
    <div id="mainUser">
        <v-card :loading="isLoading" v-if="isLoading">
            <v-overlay :value="isLoading">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-overlay>
            <v-card-title>
                <h3>Recuperando Dados...</h3>
            </v-card-title>
        </v-card>
        <div id="user">
            <h2>{{ user?.name }}</h2>
            <h4>Time: {{ team[0]?.name }}</h4>
            <h4>Telefone: {{ user?.phone }}</h4>
            <h4>Usuário: {{ user?.username }}</h4>
            <h4>Membro desde: {{ new Date(user?.created_at || '').toLocaleDateString() }}</h4>
        </div>
        <h2>Meus Jogadores</h2>
        <div id="players">
            <PlayerCard
                v-for="player, index in players"
                :key="index"
                :player="player"
                @toggleDetails="toggleDetails(index)"
                :edit="true"
                @editPlayer="editPlayer(player.player.id)"
            />
            <div id="addPlayer">
                <Icon icon="icon-park-solid:add" id="addIcon" @click="addPlayer"/>
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
#mainUser {
    position: absolute;
    top: 16vh;

    left: 50%;
    transform: translateX(-50%);
}

#mainUser h2, h4 {
    cursor: default;
}

#mainUser h2 {
    color: var(--cor-vermelho);
}

#mainUser h4 {
    color: #999999;
}

#user {
    padding: 2vh;

    text-align: center;
}

#players {
    padding: 2vh;

    display: grid;
    grid-template-columns: repeat(3, min-content);
    column-gap: 2vh;
    row-gap: 2vh;
}

.line {
    width: 90%;

    border-bottom: 1px solid var(--cor-vermelho);
}

#addPlayer {
    width: 35vh;
    height: 45vh;

    border: 1px solid var(--cor-vermelho);
    border-radius: 10px;

    display: grid;
    justify-content: center;
    align-items: center;
}

#addIcon {
    width: 10vh;
    height: 10vh;

    color: var(--cor-vermelho);

    cursor: pointer;
}

/* Mobile */
@media (max-width: 993px) {

    #players {
        grid-template-columns: repeat(1, min-content);
    }

}
</style>