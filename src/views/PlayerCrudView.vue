<script setup lang="ts">
import { goToLoginIfNotLoggedIn } from '@/common/commonFunctions';
import MyHeader from '@/components/MyHeader.vue';
import router from '@/router';
import { usePlayerStore, type Player } from '@/stores/player';
import { doUploadImagePlayer } from '@/stores/api';
import type { Ref } from 'vue';
import { ref } from 'vue';
import type { AxiosResponse } from 'axios';

//Caso não logado, volta para o /login
goToLoginIfNotLoggedIn();

const playerStore = usePlayerStore();
const name = ref("");
const dtNasc = ref("");
const uf = ref("SC");
const cidade = ref("");
const camp = ref("");
const obs = ref("");
const catgs = ref<string[]>([]);
const isLoading = ref(false);

const dialogActive = ref(false);
const dialogBadgeColor = ref('green');
const dialogMessage = ref('');
var error = false;

const selectedFile: Ref<File | null> = ref(null);
const imageData: Ref<string | null> = ref(null);

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
        router.go(0);
    }
}

function addPlayer() {
    isLoading.value = true;
    // Provisoriamente enviando somente dados de cadastro
    const player = {
        name: name.value,
        birth_date: dtNasc.value,
        city: cidade.value,
        state: uf.value,
        observation: obs.value,
        photo: '',
        team_id: 4
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
</script>
<template>
    <MyHeader />
    <div id="mainPlayer">
        <h2>Adicionar Jogador</h2>
        <div id="cadPlayer">
            <div class="rowCadPlayer">
                <v-text-field name="nome" label="Nome" id="nome" variant="solo" v-model="name"
                    class="extraLong"></v-text-field>
            </div>
            <div class="rowCadPlayer">
                <v-text-field type="date" name="dtNasc" label="Data de Nascimento" id="dtNasc" variant="solo"
                    v-model="dtNasc" class="medium"></v-text-field>
                <v-file-input name="img" ref="inputFileReference" label="Adicionar Imagem" id="img-player"
                    prepend-icon="mdi-camera" variant="solo" @change="handlerImg" class="medium img"></v-file-input>
            </div>
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
            <!-- Provisoriamente enviando somente dados de cadastro -->
            <!-- <v-select
                                label="Competição"
                                :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                                variant="solo"
                                v-model="camp"
                            ></v-select> -->
            <!-- <div id="categories">
                                <h3>Categorias</h3>
                                <v-checkbox
                                    v-for="item in playerStore.getCatgs()"
                                    v-model="catgs"
                                    :id="item.value"
                                    :label="item.text"
                                    :value="item.value"
                                    color="red"
                                    density="compact"
                                    hide-details
                                ></v-checkbox>
                            </div> -->
        </div>
        <VBtn class="mt-2 btn-cad" :loading="isLoading" @click="addPlayer">Inserir Jogador</VBtn>
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
    </div>
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

.btn-cad {
    left: 50%;
    transform: translateX(-50%);

    color: #FFFF;
    background-color: var(--cor-vermelho);
}

</style>