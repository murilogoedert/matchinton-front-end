<script setup lang="ts">
import { goToLoginIfNotLoggedIn } from '@/common/commonFunctions';
import MyHeader from '@/components/MyHeader.vue';
import router from '@/router';
import { usePlayerStore, type Player } from '@/stores/player';
import { IMG_URL, doUploadImagePlayer } from '@/stores/api';
import type { Ref } from 'vue';
import { ref } from 'vue';
import type { AxiosResponse } from 'axios';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { format } from 'date-fns';
import { useUserStore } from '@/stores/user';

//Caso não logado, volta para o /login
goToLoginIfNotLoggedIn();

const playerStore = usePlayerStore();
const userStore = useUserStore();
const name = ref("");
const dtNasc = ref("");
const genero = ref("");
const uf = ref("SC");
const cidade = ref("");
const obs = ref("");

const isLoading = ref(false);
const dialogActive = ref(false);
const dialogBadgeColor = ref('green');
const dialogMessage = ref('');
var error = false;

const selectedFile: Ref<File | null> = ref(null);
const imageData: Ref<string | null> = ref(null);

const route = useRoute();
const player = ref<Player>({
    name: "",
    birth_date: "2023-05-26T00:09:55.795Z",
    state: "",
    city: "",
    observation: "",
    photo: "" ,
    team_id: 0,
    gender: ""
});
const imgSearch = ref("");

const genders = [
    {title: 'Feminino', value: "FEM"},
    {title: 'Masculino', value: "MAS"},
];

onMounted(() => {
    if (route.params.id) {
        isLoading.value = true;
        error = false;

        playerStore.getPlayer(route.params.id)
            .then((response) => {
                player.value = response.data;

                // Ajustes por conta da conversão de data
                let playerBirth = new Date(player.value.birth_date);
                playerBirth.setDate(playerBirth.getDate() + 1);

                player.value.birth_date = format(playerBirth, 'yyyy-MM-dd')

                isLoading.value = false;
            })
            .catch((e) => {
                error = true;
                isLoading.value = false;
                dialogBadgeColor.value = 'red';
                dialogMessage.value = 'Erro ao consultar jogador! ' + e;
                dialogActive.value = true;
            });
    }    
})

function handlerImg(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files.length > 0) {
        selectedFile.value = target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            imageData.value = reader.result as string;
        };

        reader.readAsDataURL(selectedFile.value);
    }
}

function routePlayer() {
    if (!error) {
        router.push("/user");
    }
}

function addPlayer() {
    isLoading.value = true;

    const player = {
        name: name.value,
        birth_date: new Date(dtNasc.value).toISOString(),
        city: cidade.value,
        state: uf.value,
        observation: obs.value,
        photo: '',
        team_id: userStore.getUser().value?.team_id,
        gender: genero.value,
    };
    function errorDialog(e: any) {
        error = true;
        isLoading.value = false;
        dialogBadgeColor.value = 'red';
        dialogMessage.value = 'Erro ao cadastrar jogador! ' + e;
        dialogActive.value = true;
    }

    function successDialog() {
        isLoading.value = false;
        dialogBadgeColor.value = 'green';
        dialogMessage.value = 'Jogador cadastrado com sucesso!';
        dialogActive.value = true;
    }

    playerStore.addPlayer(player).then((response: AxiosResponse<Player>) => {
        error = false;
        let newPlayer = response.data;
        doUploadImagePlayer(newPlayer.id as number, selectedFile.value as File).then((response) => {
            successDialog();
        }).catch(errorDialog);
    }).catch(errorDialog);
}

function editPlayer() {
    isLoading.value = true;

    playerStore.updatePlayer(player.value, userStore.getUser().value?.team_id)
        .then((response) => {
            isLoading.value = false;
            dialogBadgeColor.value = 'green';
            dialogMessage.value = 'Jogador alterado com sucesso!';
            dialogActive.value = true;
        })
        .catch((e) => {
            error = true;
            isLoading.value = false;
            dialogBadgeColor.value = 'red';
            dialogMessage.value = 'Erro ao alterar jogador! ' + e;
            dialogActive.value = true;

            console.log(e);
        })
}

</script>
<template>
    <MyHeader />
    <!-- Para adicionar um novo player -->
    <div id="mainPlayer" v-if="!route.params.id">
        <h2>Adicionar Jogador</h2>
        <div id="cadPlayer">
            <div class="rowCadPlayer">
                <v-text-field 
                    name="nome" label="Nome" id="nome" variant="solo" v-model="name"
                    class="extraLong"></v-text-field>
            </div>
            <div class="rowCadPlayer">
                <v-text-field type="date" name="dtNasc" label="Data de Nascimento" id="dtNasc" variant="solo"
                    v-model="dtNasc" class="medium"></v-text-field>
                <v-select label="Gênero" variant="solo" v-model="genero" class="medium"
                    :items="genders" item-title="title" item-value="value"></v-select>                      
            </div>
            <v-file-input name="img" ref="inputFileReference" label="Adicionar Imagem" id="img-player"
                    prepend-icon="mdi-camera" variant="solo" @change="handlerImg" class="extraLong img"></v-file-input>
            <div class="rowCadPlayer">
                <v-select label="Estado" :items="['SC', 'PR', 'RS', 'SP', 'RJ']" variant="solo" v-model="uf"
                    class="short"></v-select>
                <v-text-field name="cidade" label="Cidade" id="cidade" variant="solo" v-model="cidade"
                    class="long"></v-text-field>
            </div>
            <div class="rowCadPlayer">
                <v-text-field name="obs" label="Observação" id="obs" variant="solo" v-model="obs"
                    class="extraLong"></v-text-field>
            </div>
        </div>
        <VBtn class="mt-2 btn-cad" :loading="isLoading" @click="addPlayer">Inserir Jogador</VBtn>
    </div>
    <!-- Para visualizar um player cadastrado -->
    <div id="mainPlayer" v-if="route.params.id">
        <v-card :loading="isLoading" v-if="isLoading">
            <v-overlay :value="isLoading">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-overlay>
            <v-card-title>
                <h3>Recuperando Dados...</h3>
            </v-card-title>
        </v-card>
        <h2>Consultar Jogador</h2>
        <div id="getPlayer">
            <v-img
                :width="200"
                aspect-ratio="1/1"
                cover
                :src="IMG_URL + '/' + player.photo"
                id="imgPlayer"
            ></v-img>
            <div id="cadPlayer">
                <div class="rowCadPlayer">
                    <v-text-field name="nome" label="Nome" v-model="player.name" id="nome" variant="solo"
                        class="extraLong"></v-text-field>
                </div>
                <div class="rowCadPlayer">
                    <v-text-field type="date" name="dtNasc" label="Data de Nascimento" v-model="player.birth_date" id="dtNasc" variant="solo"
                        class="medium" disabled></v-text-field>
                    <!-- <v-file-input name="img" ref="inputFileReference" label="Alterar Imagem" id="img-player"
                        prepend-icon="mdi-camera" variant="solo" @change="handlerImg" class="medium img"></v-file-input>                         -->
                </div>
                <div class="rowCadPlayer">
                    <v-select label="UF" :items="['SC', 'PR', 'RS', 'SP', 'RJ']" v-model="player.state" variant="solo" class="short"></v-select>
                    <v-text-field name="cidade" label="Cidade" v-model="player.city" id="cidade" variant="solo" class="long"></v-text-field>
                </div>
                <div class="rowCadPlayer">
                    <v-text-field name="obs" label="Observação" v-model="player.observation" id="obs" variant="solo"
                        class="extraLong"></v-text-field>
                </div>
            </div>
        </div>
        <VBtn class="mt-2 btn-cad" :loading="isLoading" @click="editPlayer">Editar Informações</VBtn>
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
#mainPlayer {
    position: absolute;
    top: 16vh;

    left: 50%;
    transform: translateX(-50%);
}

#mainPlayer h2,
h3 {
    color: var(--cor-vermelho);
    margin-bottom: 1vh;
}

#cadPlayer {
    margin-top: 3vh;

    display: grid;
    grid-template-rows: repeat(4, 1fr);
}

.rowCadPlayer {
    width: min-content;
    position: relative;

    display: grid;
    grid-template-columns: min-content min-content;
    column-gap: 2vh;
}

.img {
    color: red;
}

#categories {
    display: grid;
    justify-content: center;
}

#getPlayer {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2vh;
}

#imgPlayer {
    border: 1px solid var(--cor-vermelho);
    border-radius: 7px;
}

</style>