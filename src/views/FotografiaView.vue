<template>
    <div>
      <FotografiaCrud />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  import FotografiaCrud from '../components/crud/FotografiaCrud.vue'
  
  export default defineComponent({
    name: 'FotografiaView',
    components: {
      FotografiaCrud
    }
  })
  </script>
  
  <style scoped>
  /* Estilos específicos para la vista de fotografías */
  </style>
  