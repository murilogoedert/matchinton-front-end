<script setup lang="ts">
    import MyHeader from '@/components/MyHeader.vue';
    import { usePlayerStore } from '@/stores/player';
    import type { Ref } from 'vue';
    import { ref } from 'vue';

    const playerStore = usePlayerStore();
    const name = ref("");
    const dtNasc =  ref(new Date());
    const uf = ref("");
    const cidade = ref("");
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
        // Provisoriamente enviando somente dados de cadastro
        const player = {
            name: name.value,
            birth_date: dtNasc.value,
            city: cidade.value,
            state: uf.value,
            observation: obs.value,
            photo: imageData.value,
            team_id: 4
        };
        
        playerStore.addPlayer(player);
    }
</script>
<template>
    <MyHeader />
    <div id="mainPlayer">
        <h2>Adicionar Jogador</h2>
        <div id="cadPlayer">
            <div class="rowCadPlayer">
                <v-text-field name="nome" label="Nome" id="nome" variant="solo" v-model="name" class="extraLong"></v-text-field>
            </div>
            <div class="rowCadPlayer">
                <v-text-field type="date" name="dtNasc" label="Data de Nascimento" id="dtNasc" variant="solo" v-model="dtNasc" class="medium"></v-text-field>
                <v-file-input name="img" label="Adicionar Imagem" id="img" prepend-icon="mdi-camera" variant="solo" @change="handlerImg" class="medium img"></v-file-input>                
            </div>                       
            <div class="rowCadPlayer">
                <v-select
                    label="Estado"
                    :items="['SC', 'PR', 'RS', 'SP', 'RJ']"
                    variant="solo"
                    v-model="uf"
                    class="short"
                ></v-select>
                <v-text-field name="cidade" label="Cidade" id="cidade" variant="solo" v-model="cidade" class="long"></v-text-field>
            </div>                        
            <div class="rowCadPlayer">
                <v-text-field name="obs" label="Observação" id="obs" variant="solo" v-model="obs" class="extraLong"></v-text-field>                               
            </div>
            <!-- Provisoriamente enviando somente dados de cadastro -->
            <!-- <v-select
                label="Competição"
                :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                variant="solo"
                v-model="camp"
            ></v-select> -->          
            <!-- <div id="categories">
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
            </div> -->
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
        margin-top: 3vh;

        display: grid;
        grid-template-rows: repeat(4, 1fr);
    }

    .rowCadPlayer {
        width: min-content;
        position: relative;

        display: grid;
        grid-template-columns: min-content min-content;
        column-gap: 2vh;
    } 

    .img {     
        color: red;
    }

    #categories {
        display: grid;
        justify-content: center;
    }

    .btn-cad {
        left: 50%;
        transform: translateX(-50%);

        color: #FFFF;
        background-color: var(--cor-vermelho);
    }

    .short {
        width: 10vh;
    }

    .medium {
        width: 25vh;
    }

    .long {
        width: 40vh;
    }

    .extraLong {
        width: 52vh;
    }


</style>