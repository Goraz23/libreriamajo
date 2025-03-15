<template>
  <div >
    <Navbar />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Navbar from '@/components/layout/Navbar.vue'

export default defineComponent({
  name: 'App',
  components: {
    Navbar
  }
})
</script>

<style scoped>
/* Contenedor principal */
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Títulos */
.title {
  text-align: center;
  color: #2c3e50;
  font-size: 24px;
  margin-bottom: 20px;
}

.subtitle {
  text-align: center;
  color: #495057;
  font-size: 20px;
  margin-top: 20px;
}

/* Formulario */
.form-card {
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
  color: #343a40;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Botones */
button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.1s ease;
  font-size: 16px;
  font-weight: bold;
}

button:active {
  transform: scale(0.98);
}

.btn-primary {
  background: #28a745;
  color: white;
}

.btn-primary:hover {
  background: #218838;
}

.btn-secondary {
  background: #ffc107;
  color: black;
}

.btn-secondary:hover {
  background: #e0a800;
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-danger:hover {
  background: #c82333;
}

.btn-info {
  background: #007bff;
  color: white;
}

.btn-info:hover {
  background: #0056b3;
}

/* Lista de Categorías */
.category-list {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #ddd;
}

.button-group {
  display: flex;
  gap: 8px;
}

/* Mensaje cuando no hay categorías */
p {
  text-align: center;
  color: #6c757d;
  font-size: 16px;
}
</style>
