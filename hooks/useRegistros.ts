import { useState, useEffect } from 'react';
import { RegistroMarca, CreateRegistroMarca, UpdateRegistroMarca } from '@/types';
import RegistroMarcaService from '@/services/api';

export const useRegistros = () => {
  const [registros, setRegistros] = useState<RegistroMarca[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar todos los registros
  const fetchRegistros = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await RegistroMarcaService.getAll();
      setRegistros(data);
    } catch (err) {
      setError('Error al cargar los registros');
      console.error('Error fetching registros:', err);
    } finally {
      setLoading(false);
    }
  };

  // Crear un nuevo registro
  const createRegistro = async (registro: CreateRegistroMarca): Promise<RegistroMarca | null> => {
    try {
      setError(null);
      const newRegistro = await RegistroMarcaService.create(registro);
      setRegistros(prev => [...prev, newRegistro]);
      return newRegistro;
    } catch (err) {
      setError('Error al crear el registro');
      console.error('Error creating registro:', err);
      return null;
    }
  };

  // Actualizar un registro
  const updateRegistro = async (id: number, registro: UpdateRegistroMarca): Promise<RegistroMarca | null> => {
    try {
      setError(null);
      const updatedRegistro = await RegistroMarcaService.update(id, registro);
      setRegistros(prev => prev.map(r => r.id === id ? updatedRegistro : r));
      return updatedRegistro;
    } catch (err) {
      setError('Error al actualizar el registro');
      console.error('Error updating registro:', err);
      return null;
    }
  };

  // Eliminar un registro
  const deleteRegistro = async (id: number): Promise<boolean> => {
    try {
      setError(null);
      await RegistroMarcaService.delete(id);
      setRegistros(prev => prev.filter(r => r.id !== id));
      return true;
    } catch (err) {
      setError('Error al eliminar el registro');
      console.error('Error deleting registro:', err);
      return false;
    }
  };

  // Cargar registros al montar el componente
  useEffect(() => {
    fetchRegistros();
  }, []);

  return {
    registros,
    loading,
    error,
    fetchRegistros,
    createRegistro,
    updateRegistro,
    deleteRegistro,
  };
};
