<template>
  <div class="container">
    <h1>Gestión de Fotografías</h1>

    <!-- Formulario para agregar o editar fotografía -->
    <div class="card">
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="nombre">Nombre de la Fotografía</label>
          <input v-model="fotografiaData.nombre" type="text" id="nombre" required />
        </div>
        <div>
          <label for="fechaPublicacion">Fecha de Publicación</label>
          <input v-model="fotografiaData.fechaPublicacion" type="date" id="fechaPublicacion" required />
        </div>
        <button type="submit" class="btn-primary">{{ isEdit ? 'Actualizar' : 'Agregar' }} Fotografía</button>
      </form>
    </div>

    <!-- Lista de Fotografías -->
    <div v-if="fotografias.length" class="card">
      <h2>Fotografías</h2>
      <ul>
        <li v-for="fotografia in fotografias" :key="fotografia.pkFotografia">
          <p>{{ fotografia.nombre }}</p>
          <div class="button-group">
            <button @click="editFotografia(fotografia)" class="btn-edit">Editar</button>
            <button @click="deleteFotografia(fotografia.pkFotografia)" class="btn-delete">Eliminar</button>
            <button @click="viewFotografiaDetails(fotografia.pkFotografia)" class="btn-view">Ver Detalles</button>
          </div>
        </li>
      </ul>
    </div>

    <p v-else class="no-data">No hay fotografías disponibles.</p>

    <FotografiaDetails v-if="selectedFotografiaId" :fotografiaId="selectedFotografiaId" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useFotografiasStore } from '@/store/fotografias/index.ts'
import FotografiaDetails from '@/components/crud/FotografiaDetails.vue'

export default defineComponent({
  name: 'FotografiaCrud',
  components: {
    FotografiaDetails
  },
  setup() {
    const fotografiasStore = useFotografiasStore()
    const fotografiaData = ref({ nombre: '', fechaPublicacion: '', fkAuthor: 0, fkCategoria: 0, fkGaleria: 0 })
    const isEdit = ref(false)
    const currentFotografiaId = ref<number | null>(null)
    const selectedFotografiaId = ref<number | null>(null)

    onMounted(async () => {
      await fotografiasStore.fetchFotografias()
    })

    const fotografias = fotografiasStore.fotografias
    console.log(fotografias);
    

    const handleSubmit = async () => {
      if (isEdit.value) {
        if (currentFotografiaId.value) {
          await fotografiasStore.updateFotografia(currentFotografiaId.value, fotografiaData.value)
          isEdit.value = false
          currentFotografiaId.value = null
        }
      } else {
        await fotografiasStore.addFotografia(fotografiaData.value)
      }
      fotografiaData.value = { nombre: '', fechaPublicacion: '', fkAuthor: 0, fkCategoria: 0, fkGaleria: 0 }
    }

    const editFotografia = (fotografia: { pkFotografia: number; nombre: string }) => {
      fotografiaData.value = { nombre: fotografia.nombre, fechaPublicacion: fotografia.fechaPublicacion, fkAuthor: fotografia.fkAuthor, fkCategoria: fotografia.fkCategoria, fkGaleria: fotografia.fkGaleria }
      isEdit.value = true
      currentFotografiaId.value = fotografia.pkFotografia
    }

    const deleteFotografia = async (id: number) => {
      await fotografiasStore.deleteFotografia(id)
    }

    const viewFotografiaDetails = (id: number) => {
      selectedFotografiaId.value = id
    }

    return {
      fotografias,
      fotografiaData,
      isEdit,
      handleSubmit,
      editFotografia,
      deleteFotografia,
      viewFotografiaDetails,
      selectedFotografiaId
    }
  }
})
</script>

<style scoped>
/* Colores solicitados */
:root {
  --color-fondo: #edf2f4; /* Fondo principal */
  --color-titulo: #d90429; /* Títulos */
  --color-parrafo: #2b2d42; /* Párrafos */
  --color-boton-positivo: #8d99ae; /* Botones afirmativos */
  --color-boton-positivo-texto: #000; /* Texto botones afirmativos */
  --color-boton-negativo: #ef233c; /* Botones negativos */
  --color-boton-negativo-texto: #fff; /* Texto botones negativos */
}

.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background: var(--color-fondo);
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  color: var(--color-titulo);
  text-align: center;
}

.card {
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

input, textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background: var(--color-boton-positivo);
  color: var(--color-boton-positivo-texto);
}

.btn-edit {
  background: var(--color-boton-positivo);
  color: var(--color-boton-positivo-texto);
}

.btn-delete {
  background: var(--color-boton-negativo);
  color: var(--color-boton-negativo-texto);
}

.btn-view {
  background: #007bff;
  color: white;
}

.no-data {
  text-align: center;
  color: #6c757d;
}
</style>
