<template>
    <div>
      <AuthorCrud />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  import AuthorCrud from '../components/crud/AuthorCrud.vue'
  
  export default defineComponent({
    name: 'AuthorView',
    components: {
      AuthorCrud
    }
  })
  </script>
  
  <style scoped>
  /* Estilos específicos para la vista de autores */
  </style>
  