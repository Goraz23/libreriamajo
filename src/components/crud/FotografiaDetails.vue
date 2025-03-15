<template>
    <div class="container mx-auto py-8">
      <div v-if="fotografia">
        <h1 class="text-3xl font-bold">{{ fotografia.title }}</h1>
        <p class="text-xl">{{ fotografia.description }}</p>
        <img :src="fotografia.image" alt="Fotografia Image" class="w-full h-auto object-cover rounded-lg">
      </div>
      <LoadingSpinner v-else />
    </div>
  </template>
  
  <script lang="ts">
  import { ref, onMounted } from 'vue';
  import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  
  export default {
    name: 'FotografiaDetails',
    components: {
      LoadingSpinner
    },
    setup() {
      const route = useRoute();
      const fotografia = ref(null);
  
      onMounted(async () => {
        try {
          const response = await axios.get(`http://localhost:5072/api/Fotografia/${route.params.id}`);
          fotografia.value = response.data;
        } catch (error) {
          console.error(error);
        }
      });
  
      return {
        fotografia
      };
    }
  }
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