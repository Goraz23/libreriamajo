<template>
    <!-- Modal para mostrar detalles de la galería -->
    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-content">
        <h2 class="modal-title">Detalles de la Galería</h2>
        <p><strong>Nombre:</strong> {{ galeriaDetails.nombreGaleria }}</p>
        <p><strong>Descripción:</strong> {{ galeriaDetails.descripcion }}</p>
        <p><strong>Fecha de Creación:</strong> {{ galeriaDetails.fechaCreacion }}</p>
        <button @click="closeModal" class="btn-primary">Cerrar</button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useGaleriasStore } from '@/store/galerias/index.ts'
  
  export default defineComponent({
    name: 'GaleriaDetails',
    props: {
      galeriaId: {
        type: Number,
        required: true
      }
    },
    setup(props) {
      const galeriasStore = useGaleriasStore()
      const isModalOpen = ref(false)
      const galeriaDetails = ref({
        nombreGaleria: '',
        descripcion: '',
        fechaCreacion: ''
      })
  
      // Abrir el modal
      const openModal = async () => {
        const galeria = galeriasStore.galerias.find(g => g.pkGaleria === props.galeriaId)
        if (galeria) {
          galeriaDetails.value = { ...galeria }
          isModalOpen.value = true
        }
      }
  
      // Cerrar el modal
      const closeModal = () => {
        isModalOpen.value = false
      }
  
      // Llamar a la función para abrir el modal al montar el componente
      openModal()
  
      return {
        galeriaDetails,
        isModalOpen,
        closeModal
      }
    }
  })
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 400px;
    text-align: center;
  }
  
  .modal-title {
    color: #2c3e50;
    margin-bottom: 15px;
  }
  
  button {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-primary {
    background: #28a745;
    color: white;
  }
  </style>
  