// Interruptores del sitio.
// El asistente está oculto en el sitio publicado hasta que la versión nueva
// (rama asistente-real) esté aprobada.
export const ASSISTANT_ENABLED = false;

// Formularios de aportes (recomendar médicos, reseñas, sumar comercios o grupos).
// Apagados: por ahora el sitio no recibe datos de los visitantes.
export const SUBMISSIONS_ENABLED = false;

// Contacto del proyecto (Términos, Privacidad, Quiénes somos). Vacío = pendiente.
export const CONTACT_EMAIL = '';
export const LEGAL_LAST_UPDATED = '8 de noviembre de 2026';
// Nota: si se reactivan los formularios, sumar el dominio de Supabase a connect-src en vercel.json.
