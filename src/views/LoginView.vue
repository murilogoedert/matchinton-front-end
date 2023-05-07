<script setup lang="ts">

</script>
<template>
    <div id="container-login">
        <div id="white">
            <img width="70%" src="../assets/logo.png">
        </div>
        <div id="red"></div>
    </div>
    <div id="form-overlay">
        <div id="login-form">

        </div>
    </div>
</template>
<style scoped>

    #container-login{
        display: grid;
        grid-template-columns: 60vw 40vw;
        height: 100%;
        width: 100%;
        position: relative;
    }
    #red{
        background-color: var(--cor-vermelho);
    }

    #white{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }

    #form-overlay{
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1;
        top: 0;
        border: 2px solid black;
        display: flex;
        padding-right: 24vw;
        justify-content: flex-end;
        align-items: center;
    }

    #login-form{
        background-color: white;
        border: 2px solid var(--cor-vermelho);
        border-radius: .6rem;
        height: 50vh;
        width: 30vw;
    }


</style>