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

// Función para asignar clase CSS según el estado
const getEstadoBadgeClass = (estado: EstadoRegistro): string => {
  switch (estado) {
    case EstadoRegistro.PENDIENTE:
      return 'badge-pendiente';
    case EstadoRegistro.EN_REVISION:
      return 'badge-en_revision';
    case EstadoRegistro.APROBADO:
      return 'badge-aprobado';
    case EstadoRegistro.RECHAZADO:
      return 'badge-rechazado';
    case EstadoRegistro.VIGENTE:
      return 'badge-vigente';
    case EstadoRegistro.VENCIDO:
      return 'badge-vencido';
    default:
      return 'badge-vencido';
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

const formatEstado = (estado: EstadoRegistro): string => estadoLabels[estado] || "Desconocido";

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
      <div className="p-8 text-center" style={{ fontFamily: 'var(--font-sans)' }}>
        <div className="mb-4">
          <Tag size={48} className="mx-auto" style={{ color: 'var(--corporate-red)' }} />
        </div>
        <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--corporate-red-dark)' }}>
          No hay registros de marcas
        </h3>
        <p style={{ color: 'var(--foreground)' }}>
          Comienza creando tu primer registro de marca usando el botón &quot;Nuevo Registro&quot;
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto" style={{ fontFamily: 'var(--font-sans)' }}>
      <table className="min-w-full" style={{ borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: 'var(--background)' }}>
          <tr>
            {['Marca', 'Categoría', 'Solicitante', 'Estado', 'Fecha Solicitud', 'Acciones'].map((text) => (
              <th
                key={text}
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                style={{ color: 'var(--corporate-red-dark)' }}
              >
                {text}
              </th>
            ))}
          </tr>
        </thead>
        <tbody style={{ backgroundColor: 'var(--background)' }}>
          {registros.map((registro) => (
            <tr
              key={registro.id}
              className="transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col">
                  <div style={{ color: 'var(--foreground)', fontWeight: 600 }}>
                    {registro.nombre_marca}
                  </div>
                  {registro.numero_solicitud && (
                    <div style={{ color: 'var(--foreground)', fontSize: '0.75rem' }}>
                      N° {registro.numero_solicitud}
                    </div>
                  )}
                  {registro.clase_niza && (
                    <div style={{ color: 'var(--corporate-red-dark)', fontSize: '0.75rem' }}>
                      Clase: {registro.clase_niza}
                    </div>
                  )}
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <div style={{ color: 'var(--foreground)' }}>{registro.categoria}</div>
                {registro.descripcion && (
                  <div
                    style={{
                      color: 'var(--foreground)',
                      fontSize: '0.75rem',
                      maxWidth: '200px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {registro.descripcion}
                  </div>
                )}
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <User size={16} style={{ color: 'var(--foreground)' }} />
                  <div className="ml-2">
                    <div style={{ color: 'var(--foreground)', fontWeight: 600 }}>
                      {registro.solicitante}
                    </div>
                    <div style={{ color: 'var(--foreground)', fontSize: '0.75rem', display: 'flex', alignItems: 'center' }}>
                      <Mail size={12} className="mr-1" />
                      {registro.email_solicitante}
                    </div>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEstadoBadgeClass(registro.estado)}`}
                >
                  {formatEstado(registro.estado)}
                </span>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <div style={{ color: 'var(--foreground)', fontSize: '0.875rem', display: 'flex', alignItems: 'center' }}>
                  <Calendar size={14} className="mr-1" />
                  {formatDate(registro.fecha_solicitud)}
                </div>
                {registro.fecha_aprobacion && (
                  <div style={{ color: 'var(--corporate-red-dark)', fontSize: '0.75rem' }}>
                    Aprobado: {formatDate(registro.fecha_aprobacion)}
                  </div>
                )}
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onEdit(registro)}
                    className="px-2 py-1 rounded transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                    style={{ color: 'var(--corporate-red-dark)' }}
                  >
                    <Edit size={16} />
                  </button>

                  <button
                    onClick={() => registro.id && onDelete(registro.id)}
                    className="px-2 py-1 rounded transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                    style={{ color: 'var(--corporate-red)' }}
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
