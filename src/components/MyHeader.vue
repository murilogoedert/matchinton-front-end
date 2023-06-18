<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';

const userStore = useUserStore();
const menuSuspenso = ref(false);

</script>
<template>
    <div id="mainHeader" @mouseleave="menuSuspenso = false">
        <div id="divImg">
            <Router-link to="/">
                <div id="headerImg" onclick="">
                    <img src="../assets/banner.png" />
                </div>   
            </Router-link>
        </div>
        <div id="icons">
            <Router-link to="/user" @mouseover="menuSuspenso = true">
                <Icon icon="mdi:user" class="headerIcon"/>
            </Router-link>
            <span id="nome-user" class="text-md-center tex" @mouseover="menuSuspenso = true" >Olá {{ userStore.getUser().value?.name }}</span>
            <Icon icon="majesticons:logout-line" class="headerIcon" @click=userStore.logout() />
        </div>
        <div id="menuSuspenso" v-if="menuSuspenso">
            <Router-link to="/user">
                <div class="itemMenuSuspenso">
                    <Icon icon="mdi:user" class="menuIcon"/>
                    <span>Meu Perfil</span>
                </div>
            </Router-link>
            <div class="menuLine" v-if="userStore.isAdmin()"></div>
            <Router-link to="/competitionList" v-if="userStore.isAdmin()">
                <div class="itemMenuSuspenso">        
                    <Icon icon="material-symbols:sports-score" class="menuIcon"/>
                    <span>Competições</span>
                </div>
            </Router-link>
        </div> 
    </div>
</template>
<style scoped>
    #mainHeader {
        width: 100%;
        height: 12vh;

        position: fixed;

        z-index: 2;

        background-color: var(--cor-vermelho);

        display: grid;
        grid-template-columns: repeat(2, 1fr);
        align-items: center;
    }

    #divImg {
        justify-self: center;
    }

    #headerImg {
        width: min-content;
        height: min-content;

        position: absolute;
        top: 3vh;
        
        margin-left: -10vh;

        padding: 1vh;

        background-color: #ffff;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 10px;

        cursor: pointer;
    }

    #nome-user{
        color: white;
        font-weight: 600;

        cursor: default;
    }

    #headerImg img {
        max-width: 25vh;
    }

    #icons {
        justify-self: center;

        margin-left: 20vh;

        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }

    #icons a{
        margin-top: .3rem;
    }

    .headerIcon, .menuIcon {
        width: 3vh;
        height: 3vh;

        cursor: pointer;
    }

    .headerIcon {
        color: #ffff;
    }

    .menuIcon {
        color: var(--cor-vermelho);
    }

    #menuSuspenso {
        width: max-content;
        height: min-content;

        position: absolute;

        top: 8vh;
        left: 70%;

        padding: 1vh;

        background-color: #ffff;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 5px;

        display: grid;
        grid-template-rows: repeat(3, min-content);
        row-gap: 0.5vh;

        justify-items: center;
    }

    .itemMenuSuspenso {
        padding: 0.5vh;

        color: var(--cor-vermelho);

        cursor: pointer;

        display: grid;
        grid-template-columns: repeat(2, max-content);
        column-gap: 1vh;
    }

    .itemMenuSuspenso span {
        align-self: center;
    }

    .menuLine {
        width: 90%;

        border-bottom: 1px solid #CECECE;
    }

    /* Mobile */
    @media (max-width: 993px) {

        #divImg {
            justify-self: end;
        }

        #headerImg {
            left: 12vh;
        }

        #headerImg img {
            max-width: 20vh;
        }

        #icons {
            margin-left: 5vh;
        }

        #nome-user {
            display: none;
        }

    }
</style>