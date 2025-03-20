<template>
  <div class="container">
    <h1 class="title">Gestión de Categorías</h1>

    <!-- Formulario para agregar o editar categoría -->
    <form @submit.prevent="handleSubmit" class="form-card">
      <div class="form-group">
        <label for="nombreCategoria">Nombre de la Categoría</label>
        <input v-model="categoriaData.nombreCategoria" type="text" id="nombreCategoria" required />
      </div>
      <button type="submit" class="btn-primary">{{ isEdit ? 'Actualizar' : 'Agregar' }} Categoría</button>
    </form>

    <!-- Lista de Categorías -->
    <div v-if="categorias.length" class="card">
      <h2 class="subtitle">Categorías</h2>
      <ul>
        <li v-for="categoria in categorias" :key="categoria.pkCategoria" class="list-item">
          <p>{{ categoria.nombreCategoria }}</p>
          <div class="button-group">
            <button @click="editCategoria(categoria)" class="btn-secondary">Editar</button>
            <button @click="deleteCategoria(categoria.pkCategoria)" class="btn-danger">Eliminar</button>
            <button @click="viewCategoriaDetails(categoria.pkCategoria)" class="btn-info">Ver Detalles</button>
          </div>
        </li>
      </ul>
    </div>

    <!-- Mensaje si no hay categorías -->
    <p v-else class="no-data">No hay categorías disponibles.</p>

    <!-- Modal para mostrar los detalles de la categoría -->
    <CategoriaDetails v-if="selectedCategoriaId" :categoriaId="selectedCategoriaId" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useCategoriasStore } from '@/store/categorias/index.ts';
import CategoriaDetails from '@/components/crud/CategoriaDetails.vue';

export default defineComponent({
  name: 'CategoriaCrud',
  components: {
    CategoriaDetails,
  },
  setup() {
    const categoriasStore = useCategoriasStore();
    const categoriaData = ref({ nombreCategoria: '' });
    const isEdit = ref(false);
    const currentCategoriaId = ref<number | null>(null);
    const selectedCategoriaId = ref<number | null>(null);

    onMounted(async () => {
      await categoriasStore.fetchCategorias();
    });

    const categorias = categoriasStore.categorias;

    const handleSubmit = async () => {
      if (isEdit.value) {
        if (currentCategoriaId.value) {
          await categoriasStore.updateCategoria(currentCategoriaId.value, categoriaData.value);
          isEdit.value = false;
          currentCategoriaId.value = null;
        }
      } else {
        await categoriasStore.addCategoria(categoriaData.value);
      }
      categoriaData.value = { nombreCategoria: '' };
    };

    const editCategoria = (categoria: { pkCategoria: number; nombreCategoria: string }) => {
      categoriaData.value = { nombreCategoria: categoria.nombreCategoria };
      isEdit.value = true;
      currentCategoriaId.value = categoria.pkCategoria;
    };

    const deleteCategoria = async (id: number) => {
      await categoriasStore.deleteCategoria(id);
    };

    const viewCategoriaDetails = (id: number) => {
      selectedCategoriaId.value = id;
    };

    return {
      categorias,
      categoriaData,
      isEdit,
      handleSubmit,
      editCategoria,
      deleteCategoria,
      viewCategoriaDetails,
      selectedCategoriaId,
    };
  },
});
</script>

<style scoped>
/* Contenedor principal */
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background: #edf2f4;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Títulos */
.title {
  text-align: center;
  color: #d90429;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
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

input, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

input:focus, textarea:focus {
  border-color: #007bff;
  outline: none;
}

/* Botones */
button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.3s ease, transform 0.1s ease;
}

button:active {
  transform: scale(0.98);
}

.btn-primary {
  background: #8d99ae;
  color: #000;
}

.btn-primary:hover {
  background: #7b8998;
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

/* Tarjeta de galerías */
.card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Lista de elementos */
.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #ddd;
}

.list-item:last-child {
  border-bottom: none;
}

.list-item p {
  font-size: 16px;
  font-weight: 500;
  color: #2c3e50;
}

/* Grupo de botones */
.button-group {
  display: flex;
  gap: 8px;
}

/* Mensaje de no datos */
.no-data {
  text-align: center;
  color: #6c757d;
  font-style: italic;
  font-size: 16px;
}
</style>
