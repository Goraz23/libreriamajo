import { defineStore } from 'pinia'
import axios from 'axios'

export const useCategoriasStore = defineStore('categorias', {
  state: () => ({
    categorias: [] as Array<{ pkCategoria: number; nombreCategoria: string; fotografias: Array<any> }>,
  }),
  actions: {
    // Obtener todas las categorías
    async fetchCategorias() {
      try {
        const response = await axios.get('http://localhost:5072/api/Categoria')
        this.categorias = response.data
      } catch (error) {
        console.error('Error fetching categorias:', error)
      }
    },
    // Agregar una nueva categoría
    async addCategoria(categoria: { nombreCategoria: string; fotografias: Array<any> }) {
      try {
        const response = await axios.post('http://localhost:5072/api/Categoria', categoria)
        this.categorias.push(response.data)
      } catch (error) {
        console.error('Error adding categoria:', error)
      }
    },
    // Actualizar una categoría
    async updateCategoria(id: number, categoria: { nombreCategoria: string; fotografias: Array<any> }) {
      try {
        const response = await axios.put(`http://localhost:5072/api/Categoria/${id}`, categoria)
        const index = this.categorias.findIndex(c => c.pkCategoria === id)
        if (index !== -1) {
          this.categorias[index] = response.data
        }
      } catch (error) {
        console.error('Error updating categoria:', error)
      }
    },
    // Eliminar una categoría
    async deleteCategoria(id: number) {
      try {
        await axios.delete(`http://localhost:5072/api/Categoria/${id}`)
        this.categorias = this.categorias.filter(c => c.pkCategoria !== id)
      } catch (error) {
        console.error('Error deleting categoria:', error)
      }
    }
  }
})
