import { defineStore } from 'pinia'
import axios from 'axios'

export const useGaleriasStore = defineStore('galerias', {
  state: () => ({
    galerias: [] as Array<{
      pkGaleria: number;
      nombreGaleria: string;
      descripcion: string;
      fechaCreacion: string;
    }>,
  }),
  actions: {
    // Obtener todas las galerías
    async fetchGalerias() {
      try {
        const response = await axios.get('http://localhost:5072/api/Galeria')
        this.galerias = response.data
      } catch (error) {
        console.error('Error fetching galerias:', error)
      }
    },
    // Agregar una nueva galería
    async addGaleria(galeria: {
      nombreGaleria: string;
      descripcion: string;
      fechaCreacion: string;
    }) {
      try {
        const response = await axios.post('http://localhost:5072/api/Galeria', galeria)
        this.galerias.push(response.data)
      } catch (error) {
        console.error('Error adding galeria:', error)
      }
    },
    // Actualizar una galería
    async updateGaleria(id: number, galeria: {
      nombreGaleria: string;
      descripcion: string;
      fechaCreacion: string;
    }) {
      try {
        const response = await axios.put(`http://localhost:5072/api/Galeria/${id}`, galeria)
        const index = this.galerias.findIndex(g => g.pkGaleria === id)
        if (index !== -1) {
          this.galerias[index] = response.data
        }
      } catch (error) {
        console.error('Error updating galeria:', error)
      }
    },
    // Eliminar una galería
    async deleteGaleria(id: number) {
      try {
        await axios.delete(`http://localhost:5072/api/Galeria/${id}`)
        this.galerias = this.galerias.filter(g => g.pkGaleria !== id)
      } catch (error) {
        console.error('Error deleting galeria:', error)
      }
    }
  }
})
