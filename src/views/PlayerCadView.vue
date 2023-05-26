<script setup lang="ts">
    import MyHeader from '@/components/MyHeader.vue';
</script>
<template>
    <MyHeader />
    <div id="mainPlayer">
        <h2>Adicionar Jogador</h2>
        <div id="cadPlayer">
            <div id="infoPlayer">
                <v-text-field name="nome" label="Nome" id="nome" variant="solo"></v-text-field>
                <v-text-field type="date" name="dtNasc" label="Data de Nascimento" id="dtNasc" variant="solo"></v-text-field>
                <v-select
                    label="Competição"
                    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                    variant="solo"
                ></v-select>
                <v-text-field name="obs" label="Observação" id="obs" variant="solo"></v-text-field>               
                <v-file-input label="Adicionar Imagem" prepend-icon="mdi-camera" variant="solo" class="custom-file-input"></v-file-input>
            </div>
            <div id="categories">
                    <h3>Categorias</h3>
                    <v-checkbox
                        label="Principal"
                        value="main"
                        color="red"
                        density="compact"
                    ></v-checkbox>
                    <v-checkbox
                        label="Sub-23"
                        value="23"
                        color="red"
                        density="compact"
                    ></v-checkbox>
                    <v-checkbox
                        label="Sub-19"
                        value="19"
                        color="red"
                        density="compact"
                    ></v-checkbox>
                    <v-checkbox
                        label="Sub-17"
                        value="17"
                        color="red"
                        density="compact"                        
                    ></v-checkbox>
                    <v-checkbox
                        label="Sub-15"
                        value="15"
                        color="red"
                        density="compact"                        
                    ></v-checkbox>
                    <v-checkbox
                        label="Sub-13"
                        value="13"
                        color="red"
                        density="compact"                        
                    ></v-checkbox>
                    <v-checkbox
                        label="Sub-11"
                        value="11"
                        color="red"
                        density="compact"                        
                    ></v-checkbox>
                </div> 
        </div>
        <VBtn class="mt-2 btn-cad">Inserir Atleta</VBtn>
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

    .custom-file-input .v-icon {
        color: red; /* Defina a cor desejada para o ícone */
        }

    .btn-cad {
        color: #FFFF;
        background-color: var(--cor-vermelho);

        left: 50%;
        transform: translateX(-50%);
    }
</style>