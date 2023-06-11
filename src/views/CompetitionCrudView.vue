<script setup lang="ts">

import { goToLoginIfNotLoggedIn } from '@/common/commonFunctions';
import MyHeader from '@/components/MyHeader.vue';
import router from '@/router';
import { useCompStore, type Category, type Competition } from '@/stores/competition';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

//Caso não logado, volta para o /login
goToLoginIfNotLoggedIn();

const compStore = useCompStore();
const catgs = ref<Category[]>([]);
const name = ref("");
const dtStart = ref("");
const dtEnd = ref("");
const compCatgs = ref<string[]>([]);

const isLoading = ref(false);
const dialogActive = ref(false);
const dialogBadgeColor = ref('green');
const dialogMessage = ref('');
var error = false;

const route = useRoute();
const competition = ref({
    name: "",
    start_date: "2023-05-26T00:09:55.795Z",
    end_date: "2023-05-26T00:09:55.795Z"    
});

onMounted(() => { 
    // compStore.getComps()
    //         .then((response) => {
    //             console.log(response.data);
    //         })
    //         .catch((e) => {
    //             error = true;
    //             isLoading.value = false;
    //             dialogBadgeColor.value = 'red';
    //             dialogMessage.value = 'Erro ao consultar competição! ' + e;
    //             dialogActive.value = true;
    //         });

    isLoading.value = true;
    error = false;

    compStore.getCatgs()
        .then((response) => {
            // console.log(response.data)

            catgs.value = response.data;
            isLoading.value = false;
        })
        .catch((e) => {
            error = true;
            isLoading.value = false;
            dialogBadgeColor.value = 'red';
            dialogMessage.value = 'Erro ao consultar Categorias! ' + e;
            dialogActive.value = true;
        })

    if (route.params.id) {
        isLoading.value = true;
        error = false;

        compStore.getCompetition(route.params.id)
            .then((response) => {
                competition.value = response.data;
                isLoading.value = false;

                console.log(response.data);
            })
            .catch((e) => {
                error = true;
                isLoading.value = false;
                dialogBadgeColor.value = 'red';
                dialogMessage.value = 'Erro ao consultar competição! ' + e;
                dialogActive.value = true;
            });
    }
})

function addCompetition() {
    isLoading.value = true;

    const comp: Competition = {
        name: name.value,
        start_date: dtStart.value,
        end_date: dtStart.value,
        categories: compCatgs.value
    }

    console.log(comp);

    compStore.addCompetition(comp)
        .then(() => {
            isLoading.value = false;
            dialogBadgeColor.value = 'green';
            dialogMessage.value = 'Competição cadastrada com sucesso!';
            dialogActive.value = true;
        })
        .catch((e) => {
            error = true;
            isLoading.value = false;
            dialogBadgeColor.value = 'red';
            dialogMessage.value = 'Erro ao cadastrar competição! ' + e;
            dialogActive.value = true;
        })
}

function routePlayer() {
    if (!error) {
        router.go(0);
    }
}

</script>
<template>
    <MyHeader />
    <!-- Para adicionar uma nova competicao -->
    <div id="mainComp" v-if="!route.params.id">
        <v-card :loading="isLoading" v-if="isLoading">
            <v-overlay :value="isLoading">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-overlay>
            <v-card-title>
                <h3>Recuperando Dados...</h3>
            </v-card-title>
        </v-card>
        <h2>Adicionar Competição</h2>
        <div id="cadComp">
            <div class="colCadComp">
                <v-text-field 
                    name="nome" label="Nome" id="nome" variant="solo" class="medium" v-model="name"
                ></v-text-field>
                <v-text-field 
                    type="date" name="dtStart" label="Data de Início" id="dtStart" variant="solo" class="medium" v-model="dtStart"
                ></v-text-field>
                <v-text-field 
                    type="date" name="dtEnd" label="Data de Término" id="dtEnd" variant="solo" class="medium" v-model="dtEnd"
                ></v-text-field>
                <VBtn class="mt-2 btn-cad" @click="addCompetition">Inserir Competição</VBtn>
            </div>
            <div class="colCadComp">
                <div id="categories">
                    <h3>Categorias</h3>
                    <v-checkbox
                        v-for="item in catgs"
                        :id="item.name"
                        :label="item.name"
                        :value="item.id"
                        color="red"
                        density="compact"
                        hide-details
                        v-model="compCatgs"
                    ></v-checkbox>
                </div>
            </div>
        </div>
    </div>
    <!-- Para visualizar um player cadastrado -->
    <div id="mainComp" v-if="route.params.id">
        <h2>Consultar Competição</h2>
        <div id="cadComp">
            <div class="colCadComp">
                <v-text-field 
                    name="nome" :label="competition.name" id="nome" variant="solo" class="medium"
                ></v-text-field>
                <v-text-field 
                    type="text" name="dtStart" :label="new Date(competition.start_date).toLocaleDateString()" id="dtStart" variant="solo" class="medium"
                ></v-text-field>
                <v-text-field 
                    type="text" name="dtEnd" :label="new Date(competition.end_date).toLocaleDateString()" id="dtEnd" variant="solo" class="medium"
                ></v-text-field>
                <VBtn class="mt-2 btn-cad">Inserir Competição</VBtn>
            </div>
            <div class="colCadComp">
                <div id="categories">
                    <h3>Categorias</h3>
                    <v-checkbox
                        v-for="item in catgs"
                        :id="item.name"
                        :label="item.name"
                        :value="item.id"
                        color="red"
                        density="compact"
                        hide-details
                    ></v-checkbox>
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
#mainComp {
    position: absolute;
    top: 16vh;

    left: 50%;
    transform: translateX(-50%);
}

#mainComp h2,
h3 {
    color: var(--cor-vermelho);
    margin-bottom: 1vh;
}

#cadComp {
    margin-top: 3vh;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 5vh;
}

.colCadComp {
    align-self: center;
}
</style>