<template>
    <!-- Modal para mostrar detalles de la categoría -->
    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-content">
        <h2>Detalles de la Categoría</h2>
        <p><strong>Nombre:</strong> {{ categoriaDetails.nombreCategoria }}</p>
        <p><strong>Fotografías:</strong></p>
        <ul>
          <li v-for="foto in categoriaDetails.fotografias" :key="foto.pkFotografia">
            {{ foto.nombre }}
          </li>
        </ul>
        <button @click="closeModal">Cerrar</button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useCategoriasStore } from '@/store/categorias/index.ts'
  
  export default defineComponent({
    name: 'CategoriaDetails',
    props: {
      categoriaId: {
        type: Number,
        required: true
      }
    },
    setup(props) {
      const categoriasStore = useCategoriasStore()
      const isModalOpen = ref(false)
      const categoriaDetails = ref({
        nombreCategoria: '',
        fotografias: []
      })
  
      // Abrir el modal
      const openModal = async () => {
        const categoria = categoriasStore.categorias.find(c => c.pkCategoria === props.categoriaId)
        if (categoria) {
          categoriaDetails.value = { ...categoria }
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
        categoriaDetails,
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