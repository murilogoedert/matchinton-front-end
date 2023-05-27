<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import { useUserStore } from '@/stores/user';

    const userStore = useUserStore();
</script>
<template>
    <div id="mainHeader">
        <div id="divImg">
            <Router-link to="/">
                <div id="headerImg" onclick="">
                    <img src="../assets/banner.png" />
                </div>   
            </Router-link>
        </div>
        <div id="icons">
            <Router-link to="/user">
                <Icon icon="mdi:user" class="headerIcon"/>
            </Router-link>
            <Icon icon="majesticons:logout-line" class="headerIcon" @click=userStore.logout />
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

    #headerImg img {
        max-width: 25vh;
    }

    #icons {
        justify-self: center;

        margin-left: 20vh;

        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 2vh;
    }

    .headerIcon {
        width: 3vh;
        height: 3vh;

        color: #ffff;

        cursor: pointer;
    }
</style>