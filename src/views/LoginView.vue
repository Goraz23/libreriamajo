<template>
  <div class="login-container">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="login">
      <div>
        <label for="email">Correo</label>
        <input v-model="email" type="email" required />
      </div>

      <div>
        <label for="password">Contraseña</label>
        <input v-model="password" type="password" required />
      </div>

      <button type="submit">Ingresar</button>
    </form>

    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { defineEmits } from 'vue'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const emit = defineEmits(['auth-changed'])

// Simulación de usuarios registrados
const users = [
  { email: 'admin@example.com', password: '123456', name: 'Admin' },
  { email: 'user@example.com', password: 'password', name: 'User' }
]

const login = () => {
  const user = users.find(u => u.email === email.value && u.password === password.value)

  if (user) {
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('user', JSON.stringify(user)) // Guardamos el usuario
    emit('auth-changed') // Notificar que el usuario inició sesión
    router.push('/')
  } else {
    error.value = 'Correo o contraseña incorrectos'
  }
}
</script>

<style scoped>
/* Fondo principal del formulario */
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background: #edf2f4; /* Fondo principal */
  border-radius: 8px;
  text-align: center;
  display: flex
;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50vw;
    margin-top: 15%;
}

/* Estilo de los campos de entrada */
input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #656565;
  border-radius: 4px;
  color: #2b2d42; /* Color de párrafo */
}

/* Estilo del botón de login */
button {
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #8d99ae; /* Color para botones afirmativos */
  border: none;
  color: #000; /* Texto del botón afirmativo */
  cursor: pointer;
  border-radius: 4px;
}

/* Estilo del mensaje de error */
.error-message {
  color: #ef233c; /* Color de los mensajes de error */
}

/* Títulos */
h2 {
  color: #d90429; /* Color de texto para títulos */
}


</style>
