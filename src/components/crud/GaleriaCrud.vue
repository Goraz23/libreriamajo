<template>
  <div class="container">
    <h1 class="title">Gestión de Galerías</h1>

    <!-- Formulario para agregar o editar galería -->
    <form @submit.prevent="handleSubmit" class="form-card">
      <div class="form-group">
        <label for="nombreGaleria">Nombre de la Galería</label>
        <input v-model="galeriaData.nombreGaleria" type="text" id="nombreGaleria" required />
      </div>
      <div class="form-group">
        <label for="descripcion">Descripción</label>
        <textarea v-model="galeriaData.descripcion" id="descripcion" required></textarea>
      </div>
      <div class="form-group">
        <label for="fechaCreacion">Fecha de Creación</label>
        <input v-model="galeriaData.fechaCreacion" type="date" id="fechaCreacion" required />
      </div>
      <button type="submit" class="btn-primary">{{ isEdit ? 'Actualizar' : 'Agregar' }} Galería</button>
    </form>

    <!-- Lista de Galerías -->
    <div v-if="galerias.length" class="card">
      <h2>Galerías</h2>
      <ul>
        <li v-for="galeria in galerias" :key="galeria.pkGaleria" class="list-item">
          <p>{{ galeria.nombreGaleria }}</p>
          <div class="button-group">
            <button @click="editGaleria(galeria)" class="btn-edit">Editar</button>
            <button @click="deleteGaleria(galeria.pkGaleria)" class="btn-delete">Eliminar</button>
            <button @click="viewGaleriaDetails(galeria.pkGaleria)" class="btn-view">Ver Detalles</button>
          </div>
        </li>
      </ul>
    </div>

    <!-- Mensaje si no hay galerías -->
    <p v-else class="no-data">No hay galerías disponibles.</p>

    <!-- Modal para mostrar los detalles de la galería -->
    <GaleriaDetails v-if="selectedGaleriaId" :galeriaId="selectedGaleriaId" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useGaleriasStore } from '@/store/galerias/index.ts'
import GaleriaDetails from '@/components/crud/GaleriaDetails.vue'

export default defineComponent({
  name: 'GaleriaCrud',
  components: {
    GaleriaDetails
  },
  setup() {
    const galeriasStore = useGaleriasStore()
    const galeriaData = ref({ nombreGaleria: '', descripcion: '', fechaCreacion: '' })
    const isEdit = ref(false)
    const currentGaleriaId = ref<number | null>(null)
    const selectedGaleriaId = ref<number | null>(null)

    // Obtener las galerías al montar el componente
    onMounted(async () => {
      await galeriasStore.fetchGalerias()
    })

    // Obtener las galerías desde el store
    const galerias = galeriasStore.galerias

    // Función para manejar el formulario
    const handleSubmit = async () => {
      if (isEdit.value) {
        if (currentGaleriaId.value) {
          await galeriasStore.updateGaleria(currentGaleriaId.value, galeriaData.value)
          isEdit.value = false
          currentGaleriaId.value = null
        }
      } else {
        await galeriasStore.addGaleria(galeriaData.value)
      }
      galeriaData.value = { nombreGaleria: '', descripcion: '', fechaCreacion: '' }
    }

    // Función para editar una galería
    const editGaleria = (galeria: { pkGaleria: number; nombreGaleria: string }) => {
      galeriaData.value = { nombreGaleria: galeria.nombreGaleria, descripcion: galeria.descripcion, fechaCreacion: galeria.fechaCreacion }
      isEdit.value = true
      currentGaleriaId.value = galeria.pkGaleria
    }

    // Función para eliminar una galería
    const deleteGaleria = async (id: number) => {
      await galeriasStore.deleteGaleria(id)
    }

    // Función para ver los detalles de una galería
    const viewGaleriaDetails = (id: number) => {
      selectedGaleriaId.value = id
    }

    return {
      galerias,
      galeriaData,
      isEdit,
      handleSubmit,
      editGaleria,
      deleteGaleria,
      viewGaleriaDetails,
      selectedGaleriaId
    }
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
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Título */
.title {
  text-align: center;
  color: #2c3e50;
  font-size: 24px;
  font-weight: bold;
}

/* Tarjeta de formulario */
.form-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

/* Grupo de formulario */
.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 5px;
  color: #495057;
}

input, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  transition: border-color 0.3s ease-in-out;
}

input:focus, textarea:focus {
  border-color: #007bff;
  outline: none;
}

/* Botones */
button {
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s, transform 0.2s;
}

button:hover {
  transform: scale(1.05);
}

.btn-primary {
  background: #28a745;
  color: white;
}

.btn-primary:hover {
  background: #218838;
}

.btn-edit {
  background: #ffc107;
  color: black;
}

.btn-edit:hover {
  background: #e0a800;
}

.btn-delete {
  background: #dc3545;
  color: white;
}

.btn-delete:hover {
  background: #c82333;
}

.btn-view {
  background: #007bff;
  color: white;
}

.btn-view:hover {
  background: #0056b3;
}

/* Tarjeta de galerías */
.card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
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
}
</style>

