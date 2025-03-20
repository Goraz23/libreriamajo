<template>

  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600&display=swap" rel="stylesheet">

    <div>
      <nav v-if="isAuthenticated" class="navbar">
        <span>Bienvenido, {{ user?.name }}</span>
        <router-link to="/">Inicio</router-link>
        <router-link to="/autores">Autores</router-link>
        <router-link to="/categorias">Categorías</router-link>
        <router-link to="/fotografias">Fotografías</router-link>
        <router-link to="/galerias">Galerías</router-link>
        <button @click="logout" class="logout-btn">Cerrar Sesión</button>
      </nav>

      <router-view @auth-changed="checkAuth" />
    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isAuthenticated = ref(false)
const user = ref(null)

// Función para verificar autenticación
const checkAuth = () => {
  isAuthenticated.value = localStorage.getItem('isAuthenticated') === 'true'
  user.value = JSON.parse(localStorage.getItem('user')) || null
}

// Función para cerrar sesión
const logout = () => {
  localStorage.removeItem('isAuthenticated')
  localStorage.removeItem('user')
  isAuthenticated.value = false
  user.value = null
  router.push('/login')
}

onMounted(checkAuth)
</script>

<style scoped>
/* Fuentes */
body,
* {
  font-family: 'Nunito', sans-serif;
  margin: 0;
  padding: 0;
}

/* Fondo principal */
body {
  background-color: #edf2f4;
  color: #2b2d42;
}

/* Navbar */
.navbar {
  display: flex;
  gap: 10px;
  background-color: #d90429;
  /* Color de fondo de la barra de navegación */
  padding: 10px;
  color: white;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 5px 10px;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #8d99ae;
  /* Botón afirmativo */
  color: #000;
  /* Texto del botón afirmativo */
}

button:hover {
  opacity: 0.8;
}

/* Botón de cerrar sesión (negativo) */
.logout-btn {
  background-color: #ef233c;
  /* Botón negativo */
  color: #fff;
}

.logout-btn:hover {
  opacity: 0.8;
}

/* Títulos */
h1,
h2,
h3,
h4,
h5,
h6 {
  color: #d90429;
  /* Color de los títulos */
}

/* Párrafos */
p {
  color: #2b2d42;
  /* Color de los párrafos */
}
</style>
