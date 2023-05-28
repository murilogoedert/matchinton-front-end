<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import { onMounted } from 'vue';
    import { ref } from 'vue';
    import type { PropType } from 'vue';

    const details = ref(false);
</script>
<template>
    <div id="card">
        <div id="topCard">
            <div id="infoTop" v-if="!details">
                <h3>Luis Felipe</h3>
                <h5>Rio do Sul - SC</h5>
                <h5>22 anos</h5>
            </div>
            <Icon icon="akar-icons:info-fill" color="#FFFF" class="icTop" v-if="!details" @click="details = !details" />
        </div>
        <div id="bottomCard">
            <Icon icon="material-symbols:check-circle-rounded" color="#50c055" class="icBottom" />
            <Icon icon="material-symbols:cancel-rounded" color="#ff4c4e" class="icBottom" />
        </div>
        <div id="bottomBox"></div>
        <div id="details" v-if="details">
            <div id="topDetails">
                <div>
                    <h3>Luis Felipe</h3>
                    <h5>22 anos</h5>
                    <h5>Categoria Principal</h5>
                </div>
                <Icon icon="mingcute:down-fill" color="#ff4c4e" class="icTop" @click="details = !details" />
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
        width: 25vh;
        height: 34vh;

        padding: 1vh;

        color: #FFFF;

        background-image: url("src/assets/perfil.jpg");
        background-size: cover;
        background-position: center;

        border: 1px solid var(--cor-vermelho);
        border-radius: 10px;

        display: grid;
        grid-template-rows: repeat(2, 1fr);
    }

    #topCard {
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
        align-self: end;
        justify-self: center;

        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 6vh;
    }

    .icBottom {
        width: 8vh;
        height: 8vh;

        z-index: 2;

        cursor: pointer;
    }

    #bottomBox {
        width: 25vh;
        height: 12vh;

        z-index: 0;

        bottom: 0vh;
        left: 0vh;

        position: absolute;

        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
        border-radius: 10px;
    }

    #details {
        width: 25vh;
        height: 26vh;

        position: absolute;
        bottom: 0vh;
        left: 0vh;

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

    #details.menu-out {
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