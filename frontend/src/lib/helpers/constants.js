export const STATUS_LABELS = {
  pending: "Pendiente",
  assigned: "Asignado",
  completed: "Completado",
};

export function getStatusLabel(status) {
  switch (status) {
    case "pending":
      return `
        <span class="status-icon" style="display:flex;align-items:center;gap:6px;font-weight:600;color:#EAB308;">
          <i class="fas fa-hourglass-half"></i> ${STATUS_LABELS[status]}
        </span>
      `;

    case "assigned":
      return `
        <span class="status-icon" style="display:flex;align-items:center;gap:6px;font-weight:600;color:#4E8EF7;">
          <i class="fas fa-user-check"></i> ${STATUS_LABELS[status]}
        </span>
      `;

    case "completed":
      return `
        <span class="status-icon" style="display:flex;align-items:center;gap:6px;font-weight:600;color:#16A34A;">
          <i class="fas fa-check-circle"></i> ${STATUS_LABELS[status]}
        </span>
      `;

    default:
      return `
        <span class="status-icon" style="display:flex;align-items:center;gap:6px;color:#9CA3AF;">
          <i class="fas fa-question-circle"></i> Desconocido
        </span>
      `;
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

export function formatTime(value) {
  if (value == null) return '';

  // Si es número (segundos desde medianoche)
  if (typeof value === 'number') {
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }

  // Si viene como string "HH:MM:SS"
  const val = String(value);
  const match = val.match(/^(\d{2}):(\d{2})/);
  if (match) return `${match[1]}:${match[2]}`;

  // Si viene como ISO "2025-10-10T22:01:00Z"
  const isoMatch = val.match(/T(\d{2}):(\d{2})/);
  if (isoMatch) return `${isoMatch[1]}:${isoMatch[2]}`;

  return val;
}


