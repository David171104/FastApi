export const STATUS_LABELS = {
  pending: "Pendiente",
  completed: "Completado",
  cancelled: "Cancelado",
};

export function getStatusLabel(status) {
  return STATUS_LABELS[status] || "Desconocido";
}

export function formatDate(value) {
  if (!value && value !== 0) return '';

  if (value instanceof Date) {
    const d = value;
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }


  if (typeof value === 'number') {
    return formatDate(new Date(value));
  }


  if (typeof value === 'string') {
    // YYYY-MM-DD (fecha pura -> evitar shift por timezone)
    const onlyDateMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (onlyDateMatch) {
      const [, y, m, d] = onlyDateMatch;
      return `${d}/${m}/${y}`;
    }

    
  }

  return '';
}

/**
 * Formatea hora a HH:MM.
 * Acepta: Date, timestamp (número), 'HH:MM:SS', 'HH:MM', 'YYYY-MM-DDTHH:MM:SS...'
 */
export function formatTime(value) {
  if (!value && value !== 0) return '';

  // Si es Date
  if (value instanceof Date) {
    const d = value;
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  }


  if (typeof value === 'number') {
    return formatTime(new Date(value));
  }


  if (typeof value === 'string') {
    // Si viene "HH:MM:SS" o "HH:MM"
    const timeOnlyMatch = value.match(/^(\d{2}):(\d{2})/);
    if (timeOnlyMatch) return `${timeOnlyMatch[1]}:${timeOnlyMatch[2]}`;

    // Si viene ISO "YYYY-MM-DDTHH:MM:SS..."
    const isoPart = value.split('T').pop(); 
    const isoMatch = isoPart && isoPart.match(/^(\d{2}):(\d{2})/);
    if (isoMatch) return `${isoMatch[1]}:${isoMatch[2]}`;
  }

  return '';
}
