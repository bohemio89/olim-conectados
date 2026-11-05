// Envío de propuestas de la comunidad a Supabase (plan gratuito).
// La clave publicable es pública por diseño: la tabla solo permite insertar (RLS).
const SUPABASE_URL = 'https://ozwgihjdrrmmkhqxflfc.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_aVcCdGFSGVJT7HiAAzo_Mg_3Vi0p7v1';

export interface Propuesta {
  tipo: 'comercio' | 'grupo';
  nombre: string;
  zona: string;
  contacto: string;
  comentario?: string;
}

export async function enviarPropuesta(p: Propuesta): Promise<void> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/propuestas_comunidad`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({ ...p, comentario: p.comentario?.trim() || null }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}
