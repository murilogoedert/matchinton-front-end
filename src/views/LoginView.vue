<script setup lang="ts">
    import IconMatchintonLogo from '@/components/icons/IconMatchintonLogo.vue';
</script>
<template>
    <div id="container-login">
        <div id="white"></div>
        <div id="red"></div>
    </div>
    <div id="form-overlay">
        <IconMatchintonLogo/>
    </div>
</template>
<style scoped>

    #container-login{
        display: grid;
        grid-template-columns: 65% 35%;
        height: 100%;
        width: 100%;
        position: relative;
    }
    #red{
        background-color: var(--cor-vermelho);
    }

    #form-overlay{
        background-color: rgba(0,0,0,0.1);
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1;
        top: 0;
    }

</style>