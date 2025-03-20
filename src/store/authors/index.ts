import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthorsStore = defineStore('authors', {
  state: () => ({
    authors: [] as Array<{ pkAuthor: number; nombre: string; fotografias: Array<any> }>,
  }),
  actions: {
    // Obtener todos los autores
    async fetchAuthors() {
      try {
        const response = await axios.get('http://localhost:5072/api/Author')
        this.authors = response.data
      } catch (error) {
        console.error('Error fetching authors:', error)
      }
    },
    // Agregar un nuevo autor
    async addAuthor(author: { nombre: string; fotografias: Array<any> }) {
      try {
        const response = await axios.post('http://localhost:5072/api/Author', author)
        // Actualiza la lista localmente sin necesidad de una nueva solicitud
        this.authors.push(response.data)
      } catch (error) {
        console.error('Error adding author:', error)
      }
    },
    // Actualizar un autor
    async updateAuthor(id: number, author: { nombre: string; fotografias: Array<any> }) {
      try {
        const response = await axios.put(`http://localhost:5072/api/Author/${id}`, author)
        // Actualiza el autor correspondiente localmente
        const index = this.authors.findIndex(a => a.pkAuthor === id)
        if (index !== -1) {
          this.authors[index] = response.data
        }
      } catch (error) {
        console.error('Error updating author:', error)
      }
    },
    // Eliminar un autor
    async deleteAuthor(id: number) {
      try {
        await axios.delete(`http://localhost:5072/api/Author/${id}`)
        // Elimina el autor localmente
        this.authors = this.authors.filter(a => a.pkAuthor !== id)
      } catch (error) {
        console.error('Error deleting author:', error)
      }
    }
  }
})
