<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import { onMounted } from 'vue';
    import { ref } from 'vue';
    import { usePlayerStore } from '@/stores/player';
    import { IMG_URL, type doGetImage } from '@/stores/api';

    const props = defineProps({
        player: {
            type: Object,
            required: true
        }
    })
    const emit = defineEmits(["toggleDetails"]);
    const playerStore = usePlayerStore();    
    const jogador = ref(props.player.player);
    const image = "background-image: url("+ IMG_URL + '/' + jogador.value.photo + ");";

    function toggleDetails() {
        emit("toggleDetails");
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
            <Icon icon="akar-icons:info-fill" color="#FFFF" class="icTop" v-if="!props.player.details" @click="toggleDetails" />
        </div>
        <div id="bottomCard" v-if="!props.player.details">
            <Icon icon="material-symbols:check-circle-rounded" color="#50c055" class="icBottom" />
            <Icon icon="material-symbols:cancel-rounded" color="#ff4c4e" class="icBottom" />
        </div>
        <div id="bottomBox" v-if="!props.player.details"></div>
        <div id="divDetails" v-if="props.player.details">
            <div id="topDetails">
                <div>
                    <h3>{{ jogador.name }}</h3>
                    <h5>{{ playerStore.calcAge(jogador.birth_date) }} anos</h5>
                    <h5>Categoria Principal</h5>
                </div>
                <Icon icon="mingcute:down-fill" color="#ff4c4e" class="icTop" @click="toggleDetails" />
            </div>
            <div class="line"></div>
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

        /* background-image: url("https://matchintonimages.nyc3.cdn.digitaloceanspaces.com/0b1c6a4a536ee0528f377fee2a4ea463"); */
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
        grid-template-columns: repeat(2, 1fr);
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

        border: 1px solid var(--cor-vermelho);        
    }
</style>