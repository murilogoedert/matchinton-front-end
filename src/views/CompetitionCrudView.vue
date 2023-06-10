<script setup lang="ts">

import { goToLoginIfNotLoggedIn } from '@/common/commonFunctions';
import MyHeader from '@/components/MyHeader.vue';
import { usePlayerStore } from '@/stores/player';

//Caso não logado, volta para o /login
goToLoginIfNotLoggedIn();

const playerStore = usePlayerStore();

</script>
<template>
    <MyHeader />
    <!-- Para adicionar um novo competition -->
    <div id="mainComp">
        <h2>Adicionar Competição</h2>
        <div id="cadComp">
            <div class="colCadComp">
                <v-text-field 
                    name="nome" label="Nome" id="nome" variant="solo" class="medium"
                ></v-text-field>
                <v-text-field 
                    type="date" name="dtStart" label="Data de Início" id="dtStart" variant="solo" class="medium"
                ></v-text-field>
                <v-text-field 
                    type="date" name="dtEnd" label="Data de Término" id="dtEnd" variant="solo" class="medium"
                ></v-text-field>
            </div>
            <div class="colCadComp">
                <div id="categories">
                    <h3>Categorias</h3>
                    <v-checkbox
                        v-for="item in playerStore.getCatgs()"
                        :id="item.value"
                        :label="item.text"
                        :value="item.value"
                        color="red"
                        density="compact"
                        hide-details
                    ></v-checkbox>
                </div>
            </div>
        </div>
        <VBtn class="mt-2 btn-cad">Inserir Competição</VBtn>
    </div>
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