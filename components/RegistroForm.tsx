'use client';

import { useState, useEffect } from 'react';
import { RegistroMarca, CreateRegistroMarca, EstadoRegistro } from '@/types';
import { Save, X } from 'lucide-react';

interface RegistroFormProps {
  onSubmit: (data: CreateRegistroMarca | any) => Promise<void>;
  onCancel: () => void;
  initialData?: RegistroMarca | null;
}

const categorias = [
  'Productos alimenticios',
  'Bebidas',
  'Textiles y confecciones',
  'Productos farmacéuticos',
  'Productos químicos',
  'Maquinaria e instrumentos',
  'Materiales de construcción',
  'Vehículos',
  'Servicios de comunicación',
  'Servicios educativos',
  'Servicios financieros',
  'Servicios de entretenimiento',
  'Servicios médicos',
  'Servicios de restauración',
  'Otros'
];

const estadoOptions = [
  { value: EstadoRegistro.PENDIENTE, label: "Pendiente" },
  { value: EstadoRegistro.EN_REVISION, label: "En revisión" },
  { value: EstadoRegistro.APROBADO, label: "Aprobado" },
  { value: EstadoRegistro.RECHAZADO, label: "Rechazado" },
  { value: EstadoRegistro.VIGENTE, label: "Vigente" },
  { value: EstadoRegistro.VENCIDO, label: "Vencido" },
];

export default function RegistroForm({ onSubmit, onCancel, initialData }: RegistroFormProps) {
  const [formData, setFormData] = useState({
    nombre_marca: '',
    descripcion: '',
    categoria: '',
    clase_niza: '',
    solicitante: '',
    email_solicitante: '',
    estado: EstadoRegistro.PENDIENTE,
    numero_solicitud: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Cargar datos iniciales si estamos editando
  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre_marca: initialData.nombre_marca || '',
        descripcion: initialData.descripcion || '',
        categoria: initialData.categoria || '',
        clase_niza: initialData.clase_niza || '',
        solicitante: initialData.solicitante || '',
        email_solicitante: initialData.email_solicitante || '',
        estado: initialData.estado || EstadoRegistro.PENDIENTE,
        numero_solicitud: initialData.numero_solicitud || '',
      });
    }
  }, [initialData]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre_marca.trim()) {
      newErrors.nombre_marca = 'El nombre de la marca es requerido';
    }

    if (!formData.categoria.trim()) {
      newErrors.categoria = 'La categoría es requerida';
    }

    if (!formData.solicitante.trim()) {
      newErrors.solicitante = 'El nombre del solicitante es requerido';
    }

    if (!formData.email_solicitante.trim()) {
      newErrors.email_solicitante = 'El email es requerido';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email_solicitante)) {
        newErrors.email_solicitante = 'El email no tiene un formato válido';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Preparar datos para enviar (omitir campos vacíos opcionales)
      const submitData: any = {
        nombre_marca: formData.nombre_marca.trim(),
        categoria: formData.categoria.trim(),
        solicitante: formData.solicitante.trim(),
        email_solicitante: formData.email_solicitante.trim(),
      };

      if (formData.descripcion.trim()) {
        submitData.descripcion = formData.descripcion.trim();
      }

      if (formData.clase_niza.trim()) {
        submitData.clase_niza = formData.clase_niza.trim();
      }

      // Solo incluir estado y número de solicitud si estamos editando
      if (initialData) {
        submitData.estado = formData.estado;
        if (formData.numero_solicitud.trim()) {
          submitData.numero_solicitud = formData.numero_solicitud.trim();
        }
      }

      await onSubmit(submitData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nombre de la marca */}
        <div>
          <label htmlFor="nombre_marca" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre de la Marca *
          </label>
          <input
            type="text"
            id="nombre_marca"
            name="nombre_marca"
            value={formData.nombre_marca}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.nombre_marca ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Ingresa el nombre de la marca"
          />
          {errors.nombre_marca && (
            <p className="text-red-500 text-sm mt-1">{errors.nombre_marca}</p>
          )}
        </div>

        {/* Categoría */}
        <div>
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">
            Categoría *
          </label>
          <select
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.categoria ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.categoria && (
            <p className="text-red-500 text-sm mt-1">{errors.categoria}</p>
          )}
        </div>

        {/* Clase Niza */}
        <div>
          <label htmlFor="clase_niza" className="block text-sm font-medium text-gray-700 mb-1">
            Clase Niza
          </label>
          <input
            type="text"
            id="clase_niza"
            name="clase_niza"
            value={formData.clase_niza}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: 25, 35, 42"
          />
        </div>

        {/* Solicitante */}
        <div>
          <label htmlFor="solicitante" className="block text-sm font-medium text-gray-700 mb-1">
            Solicitante *
          </label>
          <input
            type="text"
            id="solicitante"
            name="solicitante"
            value={formData.solicitante}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.solicitante ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Nombre completo del solicitante"
          />
          {errors.solicitante && (
            <p className="text-red-500 text-sm mt-1">{errors.solicitante}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email_solicitante" className="block text-sm font-medium text-gray-700 mb-1">
            Email del Solicitante *
          </label>
          <input
            type="email"
            id="email_solicitante"
            name="email_solicitante"
            value={formData.email_solicitante}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email_solicitante ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="email@ejemplo.com"
          />
          {errors.email_solicitante && (
            <p className="text-red-500 text-sm mt-1">{errors.email_solicitante}</p>
          )}
        </div>

        {/* Estado (solo para edición) */}
        {initialData && (
          <div>
            <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <select
              id="estado"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {estadoOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Número de solicitud (solo para edición) */}
        {initialData && (
          <div>
            <label htmlFor="numero_solicitud" className="block text-sm font-medium text-gray-700 mb-1">
              Número de Solicitud
            </label>
            <input
              type="text"
              id="numero_solicitud"
              name="numero_solicitud"
              value={formData.numero_solicitud}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: REG-2024-001"
            />
          </div>
        )}
      </div>

      {/* Descripción */}
      <div>
        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Descripción detallada de la marca (opcional)"
        />
      </div>

      {/* Botones */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          <Save size={18} />
          {loading ? 'Guardando...' : initialData ? 'Actualizar' : 'Crear Registro'}
        </button>
        
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          <X size={18} />
          Cancelar
        </button>
      </div>
    </form>
  );
}
