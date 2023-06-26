<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { usePlayerStore } from '@/stores/player';
import { IMG_URL, type doGetImage } from '@/stores/api';
import router from '@/router';

const props = defineProps({
    player: {
        type: Object,
        required: true
    },
    // Se o card estiver no formato de edição
    edit: {
        type: Boolean,
    },

    showDuoRequest: {
        type: Boolean,
        default: true
    }
})
const emit = defineEmits(["toggleDetails", "editPlayer"]);
const playerStore = usePlayerStore();
const jogador = ref(props.player.player);
const image = "background-image: url(" + IMG_URL + '/' + jogador.value.photo + ");";

function toggleDetails() {
    emit("toggleDetails");
}

function editPlayer() {
    emit("editPlayer");
}

function routeDuo() {
    router.push('/duo/' + props.player.player.id);
}
</script>
<template>
    <div id="card" :style="image">
        <div id="topCard">
            <div id="infoTop" v-if="!props.player.details">
                <h3>{{ jogador.name }}</h3>
                <h5>{{ jogador.city }} - {{ jogador.state }}</h5>
                <h5>{{ playerStore.calcAge(jogador.birth_date) }} anos</h5>
            </div>
            <Icon icon="akar-icons:info-fill" color="#FFFF" class="icTop" v-if="!props.player.details"
                @click="toggleDetails" />
        </div>
        <div id="bottomCard" v-if="!props.player.details && !props.edit">
            <Icon v-if="props.showDuoRequest" @click="routeDuo" icon="material-symbols:group-add" color="#50c055"
                class="icBottom" />
        </div>
        <div id="bottomBox" v-if="!props.player.details && !props.edit"></div>
        <div id="divDetails" v-if="props.player.details">
            <div id="topDetails">
                <div>
                    <h3>{{ jogador.name }}</h3>
                    <div class="line"></div>
                    <h5>{{ playerStore.calcAge(jogador.birth_date) }} anos</h5>
                    <h5>Categoria Principal</h5>
                </div>
                <Icon icon="mingcute:down-fill" color="#ff4c4e" class="icTop" @click="toggleDetails" />
            </div>
            <Icon icon="material-symbols:edit" class="icEdit" @click="editPlayer()" v-if="props.edit" />
        </div>
    </div>
</template>
<style scoped>
@keyframes fadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@keyframes fadeOut {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

#card {
    width: 35vh;
    height: 45vh;

    color: #FFFF;

    background-color: var(--cor-vermelho);
    background-size: cover;
    background-position: center;

    border: 1px solid var(--cor-vermelho);
    border-radius: 10px;

    display: grid;
    grid-template-rows: repeat(2, 1fr);
}

#topCard {
    padding: 1vh;

    display: grid;
    grid-template-columns: max-content 1fr;
}

#infoTop {
    display: grid;
    grid-template-rows: repeat(3, min-content);
    row-gap: 0vh;
}

.icTop {
    width: 3vh;
    height: 3vh;

    justify-self: end;

    cursor: pointer;
}

#bottomCard {
    padding: 1vh;

    align-self: end;
    justify-self: center;

    margin-bottom: -11vh;

    display: grid;
    grid-template-columns: repeat(1, 1fr);
    column-gap: 6vh;
}

.icBottom {
    width: 11vh;
    height: 11vh;

    z-index: 2;

    cursor: pointer;
}

#bottomBox {
    width: 35vh;
    height: 12vh;

    z-index: 0;

    /* position: absolute; 
        bottom: 0vh;
        left: 0vh; */

    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
    border-radius: 10px;
}

#divDetails {
    width: 100%;
    height: 25vh;

    /* position: absolute;
        bottom: 0vh;
        left: 0vh; */

    z-index: 1;

    padding: 1vh;

    color: #13293B;

    background-color: #FFFF;
    border: 1px solid var(--cor-vermelho);
    border-radius: 10px;

    /* Animacao de entrada
            Ja inicia com o componente */
    -webkit-animation: fadeIn 0.15s ease-in-out;
    animation: fadeIn 0.15s ease-in-out;
}

#divDetails.menu-out {
    /* Animacao de saida
           Classe adicionada via script */
    -webkit-animation: fadeOut 0.2s ease-in-out;
    animation: fadeOut 0.2s ease-in-out;
}

#topDetails {
    display: grid;
    grid-template-columns: max-content 1fr;
}

.line {
    width: 80%;

    margin-top: 1vh;
    margin-bottom: 1vh;

    border: 1px solid var(--cor-vermelho);
}

.icEdit {
    width: 3vh;
    height: 3vh;

    margin-top: 11vh;
    margin-left: 90%;

    color: var(--cor-vermelho);

    cursor: pointer;
}
</style>