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
            <span id="nome-user" class="text-md-center tex">Olá {{ userStore.getUser().value?.name }}</span>
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

    #nome-user{
        color: white;
        font-weight: 600;
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

    .headerIcon {
        width: 3vh;
        height: 3vh;

        color: #ffff;

        cursor: pointer;
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