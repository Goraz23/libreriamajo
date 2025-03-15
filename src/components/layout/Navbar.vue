<template>
  <nav class="navbar">
    <ul class="nav-list">
      <li><router-link to="/" class="nav-link">Inicio</router-link></li>
      <li><router-link to="/autores" class="nav-link">Autores</router-link></li>
      <li><router-link to="/categorias" class="nav-link">Categorías</router-link></li>
      <li><router-link to="/fotografias" class="nav-link">Fotografías</router-link></li>
      <li><router-link to="/galerias" class="nav-link">Galerías</router-link></li>
    </ul>
  </nav>
</template>

<script lang="ts">
export default {
  name: "Navbar",
};
</script>

<style scoped>
/* Barra de navegación */
.navbar {
  background: #2c3e50;
  padding: 15px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

/* Lista de navegación */
.nav-list {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 0;
  margin: 0;
}

/* Elementos de la lista */
.nav-list li {
  padding: 10px;
}

/* Enlaces de navegación */
.nav-link {
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 5px;
  transition: background 0.3s ease, transform 0.1s ease;
}

.nav-link:hover {
  background: #1a252f;
  transform: scale(1.05);
}
</style>
