<script setup lang="ts">
    import { goToLoginIfNotLoggedIn } from '@/common/commonFunctions';
    import MyHeader from '@/components/MyHeader.vue';
    import PlayerCard from '@/components/PlayerCard.vue';
    import { usePlayerStore } from '@/stores/player';
    import { onMounted, ref } from 'vue';

    const playerStore = usePlayerStore();
    const players = ref<any[]>([]);
    
    goToLoginIfNotLoggedIn();

    onMounted(() => {
        console.log(playerStore.getPlayers());
        players.value = playerStore.getPlayers();
    })
</script>
<template>
    <MyHeader />
    <div id="mainHome">
        <h2>Jogadores Disponíveis</h2>
        <div id="players">
            <PlayerCard
                v-for="player in players"
                :key="player.player.id"
            />
        </div>
    </div>
</template>
<style scoped>
    #mainHome {
        position: absolute;
        top: 16vh;

        left: 50%;
        transform: translateX(-50%);
    }

    #mainHome h2 {
        color: var(--cor-vermelho);
    }

    #players {
        margin-top: 3vh;

        display: grid;
        grid-template-columns: repeat(3, min-content);
        column-gap: 2vh;
        row-gap: 2vh;
    }
</style>