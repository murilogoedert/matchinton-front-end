<script setup lang="ts">
import { goToLoginIfNotLoggedIn } from '@/common/commonFunctions';
import MyHeader from '@/components/MyHeader.vue';

//Caso não logado, volta para o /login
goToLoginIfNotLoggedIn();

</script>
<template>
    <MyHeader />
</template>
<style scoped>

</style>