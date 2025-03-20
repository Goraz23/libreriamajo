<template>
  <div class="container">
    <h1 class="title">Gestión de Autores</h1>

    <form @submit.prevent="handleSubmit" class="form">
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input v-model="authorData.nombre" type="text" id="nombre" required />
      </div>
      <button type="submit" class="btn-primary">{{ isEdit ? 'Actualizar' : 'Agregar' }} Autor</button>
    </form>

    <div v-if="authors.length" class="author-list">
      <h2 class="subtitle">Autores</h2>
      <ul>
        <li v-for="author in authors" :key="author.pkAuthor" class="list-item">
          <p>{{ author.nombre }}</p>
          <div class="button-group">
            <button @click="editAuthor(author)" class="btn-positive">Editar</button>
            <button @click="deleteAuthor(author.pkAuthor)" class="btn-negative">Eliminar</button>
            <button @click="viewAuthorDetails(author.pkAuthor)" class="btn-details">Ver Detalles</button>
          </div>
        </li>
      </ul>
    </div>

    <p v-else>No hay autores disponibles.</p>

    <AuthorDetails v-if="selectedAuthorId" :authorId="selectedAuthorId" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useAuthorsStore } from '@/store/authors/index.ts';
import AuthorDetails from '@/components/crud/AuthorDetails.vue';

export default defineComponent({
  name: 'AuthorCrud',
  components: { AuthorDetails },
  setup() {
    const authorsStore = useAuthorsStore();
    const authorData = ref({ nombre: '' });
    const isEdit = ref(false);
    const currentAuthorId = ref<number | null>(null);
    const selectedAuthorId = ref<number | null>(null);

    const authors = ref([]);

    // Obtener autores al montar el componente
    onMounted(async () => {
      await authorsStore.fetchAuthors();
      // Listado de autores de la tienda
      authors.value = authorsStore.authors;
    });


    const handleSubmit = async () => {
      if (isEdit.value) {
        if (currentAuthorId.value) {
          await authorsStore.updateAuthor(currentAuthorId.value, authorData.value);
          // Refrescar la lista después de actualizar
          await authorsStore.fetchAuthors();
          isEdit.value = false;
          currentAuthorId.value = null;
        }
      } else {
        await authorsStore.addAuthor(authorData.value);
        // Refrescar la lista después de agregar
        await authorsStore.fetchAuthors();
      }
      await authorsStore.fetchAuthors();
      // Listado de autores de la tienda
      authors.value = authorsStore.authors;
      authorData.value = { nombre: '' };
    };

    const editAuthor = (author: { pkAuthor: number; nombre: string }) => {
      authorData.value = { nombre: author.nombre };
      isEdit.value = true;
      currentAuthorId.value = author.pkAuthor;
    };

    const deleteAuthor = async (id: number) => {
      await authorsStore.deleteAuthor(id);
      await authorsStore.fetchAuthors();
      // Listado de autores de la tienda
      authors.value = authorsStore.authors;
    };

    const viewAuthorDetails = (id: number) => {
      selectedAuthorId.value = id;
    };

    return {
      authors,
      authorData,
      isEdit,
      handleSubmit,
      editAuthor,
      deleteAuthor,
      viewAuthorDetails,
      selectedAuthorId,
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
  background: #edf2f4; /* Color principal */
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Títulos */
.title {
  text-align: center;
  color: #d90429; /* Color principal de texto para títulos */
  font-size: 24px;
  margin-bottom: 20px;
}

.subtitle {
  text-align: center;
  color: #2b2d42; /* Color de párrafo */
  font-size: 20px;
  margin-top: 20px;
}

/* Formulario */
.form {
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
  background: #8d99ae; /* Color afirmativo */
  color: #000;
}

.btn-primary:hover {
  background: #607d8b;
}

.btn-positive {
  background: #8d99ae; /* Botón afirmativo */
  color: #000;
}

.btn-positive:hover {
  background: #607d8b;
}

.btn-negative {
  background: #ef233c; /* Botón negativo */
  color: #fff;
}

.btn-negative:hover {
  background: #d81e1f;
}

.btn-details {
  background: #007bff;
  color: white;
}

.btn-details:hover {
  background: #0056b3;
}

/* Lista de Autores */
.author-list {
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

/* Mensaje cuando no hay autores */
p {
  text-align: center;
  color: #6c757d;
  font-size: 16px;
}
</style>
