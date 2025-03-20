import { defineStore } from 'pinia'
import axios from 'axios'

export const useFotografiasStore = defineStore('fotografias', {
  state: () => ({
    fotografias: [] as Array<{
      pkFotografia: number;
      fechaPublicacion: string;
      fkAuthor: number;
      author: any | null;
      fkCategoria: number;
      categoria: any | null;
      fkGaleria: number;
      galeria: any | null;
    }>,
  }),
  actions: {
    // Obtener todas las fotografías
    async fetchFotografias() {
      try {
        const response = await axios.get('http://localhost:5072/api/Fotografia')
        this.fotografias = response.data
      } catch (error) {
        console.error('Error fetching fotografias:', error)
      }
    },
    // Agregar una nueva fotografía
    async addFotografia(fotografia: {
      fechaPublicacion: string;
      fkAuthor: number;
      fkCategoria: number;
      fkGaleria: number;
    }) {
      try {
        console.log(fotografia);
        
        const response = await axios.post('http://localhost:5072/api/Fotografia', fotografia)
        this.fotografias.push(response.data)
      } catch (error) {
        console.error('Error adding fotografia:', error)
      }
    },
    // Actualizar una fotografía
    async updateFotografia(id: number, fotografia: {
      nombre: string;
      fechaPublicacion: string;
      fkAuthor: number;
      fkCategoria: number;
      fkGaleria: number;
    }) {
      try {    
        console.log(fotografia);
        const response = await axios.put(`http://localhost:5072/api/Fotografia/${id}`, fotografia);
        const index = this.fotografias.findIndex(f => f.pkFotografia === id);
        if (index !== -1) {
          this.fotografias[index] = response.data;
        }
      } catch (error) {
        console.error('Error updating fotografia:', error);
      }
    },    
    // Eliminar una fotografía
    async deleteFotografia(id: number) {
      try {
        console.log(id);
        
        await axios.delete(`http://localhost:5072/api/Fotografia/${id}`)
        this.fotografias = this.fotografias.filter(f => f.pkFotografia !== id)
      } catch (error) {
        console.error('Error deleting fotografia:', error)
      }
    }
  }
})
