'use client';

import { useState } from 'react';
import { useRegistros } from '@/hooks/useRegistros';
import { RegistroMarca, CreateRegistroMarca, UpdateRegistroMarca } from '@/types';
import RegistrosList from '@/components/RegistrosList';
import RegistroForm from '@/components/RegistroForm';
import { Plus } from 'lucide-react';
import Loading from '@/components/Loading';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';

export default function Home() {
  const { registros, loading, error, createRegistro, updateRegistro, deleteRegistro } = useRegistros();
  const [showForm, setShowForm] = useState(false);
  const [editingRegistro, setEditingRegistro] = useState<RegistroMarca | null>(null);

  const images = [
    '/images/loading1.jpg',
    '/images/loading2.jpg',
    '/images/loading3.jpg',
  ];

  const handleSubmitForm = async (data: CreateRegistroMarca | UpdateRegistroMarca) => {
    if (editingRegistro?.id) {
      const result = await updateRegistro(editingRegistro.id, data as UpdateRegistroMarca);
      if (result) {
        setEditingRegistro(null);
        setShowForm(false);
      }
    } else {
      const result = await createRegistro(data as CreateRegistroMarca);
      if (result) {
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
    return <Loading images={images} />;
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--corporate-red)' }}>
            Sistema de Registro de Marcas
          </h1>
          <p style={{ color: 'var(--foreground)' }}>
            Gestiona los registros de marcas de manera eficiente
          </p>
        </div>

        {error && (
          <div
            className="mb-6 px-4 py-3 rounded"
            style={{
              backgroundColor: 'rgba(248, 113, 113, 0.1)',
              border: '1px solid var(--corporate-red)',
              color: 'var(--corporate-red-dark)'
            }}
          >
            {error}
          </div>
        )}

        <div className="mb-6">
          <button
            onClick={() => setShowForm(true)}
            disabled={showForm}
            style={{
              backgroundColor: 'var(--corporate-red)',
              color: 'var(--text-light)',
              fontWeight: 600,
              padding: '8px 16px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = 'var(--corporate-red-dark)')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = 'var(--corporate-red)')}
          >
            <Plus size={20} />
            Nuevo Registro
          </button>
        </div>

        {showForm && (
          <div
            className="mb-8 rounded-lg shadow-md p-6"
            style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
          >
            <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--corporate-red)' }}>
              {editingRegistro ? 'Editar Registro' : 'Nuevo Registro'}
            </h2>
            <RegistroForm
              onSubmit={handleSubmitForm}
              onCancel={handleCancel}
              initialData={editingRegistro}
            />
          </div>
        )}

        <div
          className="rounded-lg shadow-md"
          style={{ backgroundColor: 'var(--background)' }}
        >
          <RegistrosList
            registros={registros}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
      <Footer />
    </motion.div>
  );
}
