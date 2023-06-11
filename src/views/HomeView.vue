<script setup lang="ts">
    import { goToLoginIfNotLoggedIn } from '@/common/commonFunctions';
    import MyHeader from '@/components/MyHeader.vue';
    import PlayerCard from '@/components/PlayerCard.vue';
    import { usePlayerStore, type Player, type PlayerHome } from '@/stores/player';
    import { onMounted, ref } from 'vue';

    const playerStore = usePlayerStore();
    const players = ref<PlayerHome[]>([]);

    //Caso não logado, volta para o /login
    goToLoginIfNotLoggedIn();        

    onMounted(() => {
        playerStore.getAllPlayers()
            .then((response) => {
                // console.log(response.data);

                response.data.forEach((element: Player) => {
                    players.value.push({ player: element, details: false})
                });
            })
            .catch((e) => {
                console.log(e);
            })
    })

    function toggleDetails(index: number) {
        players.value[index].details = !players.value[index].details;
    }
</script>
<template>
    <MyHeader />
    <div id="mainHome">
        <h2>Jogadores Disponíveis</h2>
        <div id="players">
            <PlayerCard
                v-for="player, index in players"
                :key="index"
                :player="player"
                @toggleDetails="toggleDetails(index)"
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