<template>
    <div class="dashboard-container">
      <h1>Panel de Control</h1>
  
      <!-- Mensaje de error -->
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  
      <!-- Estadísticas -->
      <div class="stats-grid">
        <div class="stat-card" v-for="stat in stats" :key="stat.label">
          <h3>{{ stat.label }}</h3>
          <p>{{ stat.value }}</p>
        </div>
      </div>
  
      <!-- Botón para actualizar estadísticas manualmente -->
      <button @click="fetchStats" class="refresh-button">Actualizar Estadísticas</button>
  
      <!-- Enlaces rápidos -->
      <div class="quick-links">
        <router-link to="/autores" class="link-card">Autores</router-link>
        <router-link to="/categorias" class="link-card">Categorías</router-link>
        <router-link to="/fotografias" class="link-card">Fotografías</router-link>
        <router-link to="/galerias" class="link-card">Galerías</router-link>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import axios from 'axios';
  
  export default defineComponent({
    name: 'Dashboard',
    setup() {
      const stats = ref([
        { label: 'Autores', value: 0 },
        { label: 'Categorías', value: 0 },
        { label: 'Fotografías', value: 0 },
        { label: 'Galerías', value: 0 }
      ]);
  
      const errorMessage = ref('');
  
      const fetchStats = async () => {
        try {
          errorMessage.value = ''; // Reiniciar mensaje de error
          const [autores, categorias, fotografias, galerias] = await Promise.all([
            axios.get('http://localhost:5072/api/Author'),
            axios.get('http://localhost:5072/api/Categoria'),
            axios.get('http://localhost:5072/api/Fotografia'),
            axios.get('http://localhost:5072/api/Galeria')
          ]);
  
          console.log('Autores:', autores.data);
          console.log('Categorías:', categorias.data);
          console.log('Fotografías:', fotografias.data);
          console.log('Galerías:', galerias.data);
  
          stats.value = [
            { label: 'Autores', value: Array.isArray(autores.data) ? autores.data.length : 0 },
            { label: 'Categorías', value: Array.isArray(categorias.data) ? categorias.data.length : 0 },
            { label: 'Fotografías', value: Array.isArray(fotografias.data) ? fotografias.data.length : 0 },
            { label: 'Galerías', value: Array.isArray(galerias.data) ? galerias.data.length : 0 }
          ];
        } catch (error) {
          errorMessage.value = 'Error cargando las estadísticas. Intenta de nuevo.';
          console.error('Error obteniendo estadísticas:', error);
        }
      };
  
      onMounted(fetchStats);
  
      return { stats, fetchStats, errorMessage };
    }
  });
  </script>
  
  <style scoped>
  .dashboard-container {
    max-width: 900px;
    margin: auto;
    padding: 20px;
    text-align: center;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }
  
  .stat-card {
    background: #2c3e50;
    color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .quick-links {
    margin-top: 30px;
    display: flex;
    gap: 15px;
    justify-content: center;
  }
  
  .link-card {
    background: #3498db;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    text-decoration: none;
    transition: 0.3s;
  }
  
  .link-card:hover {
    background: #2980b9;
  }
  
  .refresh-button {
    margin-top: 20px;
    background: #28a745;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: 0.3s;
  }
  
  .refresh-button:hover {
    background: #218838;
  }
  
  .error {
    color: red;
    font-weight: bold;
    margin-bottom: 15px;
  }
  </style>
  