'use client';

import { RegistroMarca, EstadoRegistro } from '@/types';
import { Edit, Trash2, Calendar, User, Mail, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface RegistrosListProps {
  registros: RegistroMarca[];
  onEdit: (registro: RegistroMarca) => void;
  onDelete: (id: number) => void;
}

const getEstadoBadgeColor = (estado: EstadoRegistro): string => {
  switch (estado) {
    case EstadoRegistro.PENDIENTE:
      return 'bg-yellow-100 text-yellow-800';
    case EstadoRegistro.EN_REVISION:
      return 'bg-blue-100 text-blue-800';
    case EstadoRegistro.APROBADO:
      return 'bg-green-100 text-green-800';
    case EstadoRegistro.RECHAZADO:
      return 'bg-red-100 text-red-800';
    case EstadoRegistro.VIGENTE:
      return 'bg-emerald-100 text-emerald-800';
    case EstadoRegistro.VENCIDO:
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const estadoLabels: Record<EstadoRegistro, string> = {
  [EstadoRegistro.PENDIENTE]: "Pendiente",
  [EstadoRegistro.EN_REVISION]: "En revisión",
  [EstadoRegistro.APROBADO]: "Aprobado",
  [EstadoRegistro.RECHAZADO]: "Rechazado",
  [EstadoRegistro.VIGENTE]: "Vigente",
  [EstadoRegistro.VENCIDO]: "Vencido",
};

const formatEstado = (estado: EstadoRegistro): string => {
  return estadoLabels[estado] || "Desconocido";
};

const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return 'N/A';
  try {
    return format(new Date(dateString), 'dd/MM/yyyy', { locale: es });
  } catch {
    return 'Fecha inválida';
  }
};

export default function RegistrosList({ registros, onEdit, onDelete }: RegistrosListProps) {
  if (registros.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="mb-4">
          <Tag size={48} className="mx-auto text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No hay registros de marcas
        </h3>
        <p className="text-gray-500">
          Comienza creando tu primer registro de marca usando el botón &quot;Nuevo Registro&quot;
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Marca
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Categoría
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Solicitante
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha Solicitud
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {registros.map((registro) => (
            <tr key={registro.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col">
                  <div className="text-sm font-medium text-gray-900">
                    {registro.nombre_marca}
                  </div>
                  {registro.numero_solicitud && (
                    <div className="text-xs text-gray-500">
                      N° {registro.numero_solicitud}
                    </div>
                  )}
                  {registro.clase_niza && (
                    <div className="text-xs text-blue-600">
                      Clase: {registro.clase_niza}
                    </div>
                  )}
                </div>
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{registro.categoria}</div>
                {registro.descripcion && (
                  <div className="text-xs text-gray-500 max-w-xs truncate">
                    {registro.descripcion}
                  </div>
                )}
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <User size={16} className="text-gray-400" />
                  </div>
                  <div className="ml-2">
                    <div className="text-sm font-medium text-gray-900">
                      {registro.solicitante}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center">
                      <Mail size={12} className="mr-1" />
                      {registro.email_solicitante}
                    </div>
                  </div>
                </div>
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEstadoBadgeColor(registro.estado)}`}>
                  {formatEstado(registro.estado)}
                </span>
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm text-gray-900">
                  <Calendar size={14} className="mr-1" />
                  {formatDate(registro.fecha_solicitud)}
                </div>
                {registro.fecha_aprobacion && (
                  <div className="text-xs text-green-600">
                    Aprobado: {formatDate(registro.fecha_aprobacion)}
                  </div>
                )}
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onEdit(registro)}
                    className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50 transition-colors"
                    title="Editar registro"
                  >
                    <Edit size={16} />
                  </button>
                  
                  <button
                    onClick={() => registro.id && onDelete(registro.id)}
                    className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50 transition-colors"
                    title="Eliminar registro"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
