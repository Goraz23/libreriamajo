<template>
    <div>
      <GaleriaCrud />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  import GaleriaCrud from '../components/crud/GaleriaCrud.vue'
  
  export default defineComponent({
    name: 'GaleriaView',
    components: {
      GaleriaCrud
    }
  })
  </script>
  
  <style scoped>
  /* Estilos específicos para la vista de galerías */
  </style>
  