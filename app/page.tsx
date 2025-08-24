'use client';

import { useState } from 'react';
import { useRegistros } from '@/hooks/useRegistros';
import { RegistroMarca, CreateRegistroMarca, UpdateRegistroMarca } from '@/types';
import RegistrosList from '@/components/RegistrosList';
import RegistroForm from '@/components/RegistroForm';
import { Plus } from 'lucide-react';
import Loading from '@/components/Loading';

export default function Home() {
  const { registros, loading, error, createRegistro, updateRegistro, deleteRegistro } = useRegistros();
  const [showForm, setShowForm] = useState(false);
  const [editingRegistro, setEditingRegistro] = useState<RegistroMarca | null>(null);

  const handleCreate = async (data: CreateRegistroMarca) => {
    const result = await createRegistro(data);
    if (result) setShowForm(false);
  };

  const handleUpdate = async (data: UpdateRegistroMarca) => {
    if (editingRegistro?.id) {
      const result = await updateRegistro(editingRegistro.id, data);
      if (result) {
        setEditingRegistro(null);
        setShowForm(false);
      }
    }
  };


  const handleEdit = (registro: RegistroMarca) => {
    setEditingRegistro(registro);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este registro?')) {
      await deleteRegistro(id);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingRegistro(null);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Sistema de Registro de Marcas
          </h1>
          <p className="text-gray-600">
            Gestiona los registros de marcas de manera eficiente
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="mb-6">
          <button
            onClick={() => setShowForm(true)}
            disabled={showForm}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={20} />
            Nuevo Registro
          </button>
        </div>

        {showForm && (
          <div className="mb-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingRegistro ? 'Editar Registro' : 'Nuevo Registro'}
            </h2>
            <RegistroForm
              onSubmit={editingRegistro ? handleUpdate : handleCreate}
              onCancel={handleCancel}
              initialData={editingRegistro}
            />
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md">
          <RegistrosList
            registros={registros}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
