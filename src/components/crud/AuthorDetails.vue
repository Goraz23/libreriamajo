<template>
    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-content">
        <h2 class="modal-title">Detalles del Autor</h2>
        <p><strong>Nombre:</strong> {{ authorDetails.nombre }}</p>
        <p><strong>Fotografías:</strong></p>
        <ul class="photo-list">
          <li v-for="foto in authorDetails.fotografias" :key="foto.pkFotografia">
            {{ foto.nombre }}
          </li>
        </ul>
        <button @click="closeModal" class="btn-primary">Cerrar</button>
      </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useAuthorsStore } from '@/store/authors/index.ts';

export default defineComponent({
    name: 'AuthorDetails',
    props: {
      authorId: {
        type: Number,
        required: true,
      },
    },
    setup(props) {
      const authorsStore = useAuthorsStore();
      const isModalOpen = ref(false);
      const authorDetails = ref({
        nombre: '',
        fotografias: [],
      });
  
      const openModal = async () => {
        const author = authorsStore.authors.find((a) => a.pkAuthor === props.authorId);
        if (author) {
          authorDetails.value = { ...author };
          isModalOpen.value = true;
        }
      };
  
      const closeModal = () => {
        isModalOpen.value = false;
      };
  
      watch(() => props.authorId, openModal, { immediate: true });
  
      return {
        authorDetails,
        isModalOpen,
        closeModal,
      };
    },
});
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