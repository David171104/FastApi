export const STATUS_LABELS = {
  pending: "Pendiente",
  assigned: "Asignado",
  completed: "Completado",
};

export function getStatusLabel(status) {
  switch (status) {
    case "pending":
      return `<span class="status-icon text-yellow-500 font-semibold flex items-center gap-2">
        <i class="fas fa-hourglass-half"></i> ${STATUS_LABELS[status]}
      </span>`;
    case "asigned":
      return `<span class="status-icon text-blue-500 font-semibold flex items-center gap-2">
        <i class="fas fa-user-check"></i> ${STATUS_LABELS[status]}
      </span>`;
    case "completed":
      return `<span class="status-icon text-green-500 font-semibold flex items-center gap-2">
        <i class="fas fa-check-circle"></i> ${STATUS_LABELS[status]}
      </span>`;
    default:
      return `<span class="text-gray-400"><i class="fas fa-question-circle"></i> Desconocido</span>`;
  }
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
