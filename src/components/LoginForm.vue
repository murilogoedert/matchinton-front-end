<script setup lang="ts">
</script>
<template>
    <VSheet class="pl-15 pr-15" style="background-color: transparent;">
        <VForm fast-fail @submit.prevent>
            <v-text-field name="username" label="Usuário" id="username"></v-text-field>
            <v-text-field name="password" label="Senha" hint="Pelo menos 8 caracteres" min="8" max="16"
                 type="password"></v-text-field>
            <VBtn type="submit" block class="mt-2 btn-login">Entrar</VBtn>
        </VForm>
    </VSheet>
</template>
<style scoped>
.btn-login {
    background-color: var(--cor-vermelho);
    color: white;
}
</style>
    