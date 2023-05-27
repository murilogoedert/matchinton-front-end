<script setup lang="ts">
    import MyHeader from '@/components/MyHeader.vue';
    import { usePlayerStore } from '@/stores/player';
    import type { Ref } from 'vue';
    import { ref } from 'vue';

    const playerStore = usePlayerStore();
    const name = ref("");
    const dtNasc =  ref(new Date());
    const camp = ref("");
    const obs = ref("");
    const catgs = ref<string[]>([]);

    const selectedFile: Ref<File | null> = ref(null);
    const imageData: Ref<string | null> = ref(null);

    function handlerImg(event: Event) {
        const target = event.target as HTMLInputElement;

        if (target.files && target.files.length > 0) {
            selectedFile.value = target.files[0];
            const reader = new FileReader();

            reader.onload = () => {
                imageData.value = reader.result as string;
            };

            reader.readAsDataURL(selectedFile.value);
        }
    }

    function addPlayer() {
        const player = {
            name: name.value,
            dtNasc: dtNasc.value,
            camp: camp.value,
            obs: obs.value,
            img: imageData.value,
            catg: catgs.value
        };
        
        playerStore.addPlayer(player);
    }
</script>
<template>
    <MyHeader />
    <div id="mainPlayer">
        <h2>Adicionar Jogador</h2>
        <div id="cadPlayer">
            <div id="infoPlayer">
                <v-text-field name="nome" label="Nome" id="nome" variant="solo" v-model="name"></v-text-field>
                <v-text-field type="date" name="dtNasc" label="Data de Nascimento" id="dtNasc" variant="solo" v-model="dtNasc"></v-text-field>
                <v-select
                    label="Competição"
                    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                    variant="solo"
                    v-model="camp"
                ></v-select>
                <v-text-field name="obs" label="Observação" id="obs" variant="solo" v-model="obs"></v-text-field>               
                <v-file-input name="img" label="Adicionar Imagem" id="img" prepend-icon="mdi-camera" variant="solo" @change="handlerImg"></v-file-input>
            </div>
            <div id="categories">
                <h3>Categorias</h3>
                <v-checkbox
                    v-for="item in playerStore.getCatgs()"
                    v-model="catgs"
                    :id="item.value"
                    :label="item.text"
                    :value="item.value"
                    color="red"
                    density="compact"
                    hide-details
                ></v-checkbox>
            </div> 
        </div>
        <VBtn class="mt-2 btn-cad" @click="addPlayer">Inserir Atleta</VBtn>
    </div>    
</template>
<style scoped>
    #mainPlayer {
        position: absolute;
        top: 16vh;

        left: 50%;
        transform: translateX(-50%);
    }

    #mainPlayer h2, h3 {
        color: var(--cor-vermelho);
    }

    #cadPlayer {
        margin-top: 4vh;

        display: grid;
        grid-template-columns: repeat(2, min-content);
        column-gap: 10vh;
    }

    #infoPlayer {     
        width: 30vh;
    }

    #categories {
        display: grid;
        justify-content: center;
    }

    .btn-cad {
        color: #FFFF;
        background-color: var(--cor-vermelho);

        left: 50%;
        transform: translateX(-50%);
    }
</style>