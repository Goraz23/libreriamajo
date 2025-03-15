<template>
    <div>
      <CategoriaCrud />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  import CategoriaCrud from '../components/crud/CategoriaCrud.vue'
  
  
  export default defineComponent({
    name: 'CategoriaView',
    components: {
      CategoriaCrud
    }
  })
  </script>
  
  <style scoped>
  /* Estilos específicos para la vista de categorías */
  </style>
  