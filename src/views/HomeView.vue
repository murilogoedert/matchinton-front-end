<script setup lang="ts">
import { goToLoginIfNotLoggedIn } from '@/common/commonFunctions';
import MyHeader from '@/components/MyHeader.vue';

goToLoginIfNotLoggedIn();
</script>
<template>
    <MyHeader />
</template>
<style scoped></style>