// services/api.ts
import axios from 'axios';
import { RegistroMarca, CreateRegistroMarca, UpdateRegistroMarca } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://registro-marca-api.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export class RegistroMarcaService {
  // Obtener todos los registros
  static async getAll(): Promise<RegistroMarca[]> {
    const response = await api.get('/registros/');
    return response.data;
  }

  // Obtener un registro por ID
  static async getById(id: number): Promise<RegistroMarca> {
    const response = await api.get(`/registros/${id}`);
    return response.data;
  }

  // Crear un nuevo registro
  static async create(registro: CreateRegistroMarca): Promise<RegistroMarca> {
    const response = await api.post('/registros/', registro);
    return response.data;
  }

  // Actualizar un registro
  static async update(id: number, registro: UpdateRegistroMarca): Promise<RegistroMarca> {
    const response = await api.put(`/registros/${id}`, registro);
    return response.data;
  }

  // Eliminar un registro
  static async delete(id: number): Promise<void> {
    await api.delete(`/registros/${id}`);
  }
}

export default RegistroMarcaService;
