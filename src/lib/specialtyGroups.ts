// Agrupa las especialidades tal como figuran en cada ficha oficial en opciones de filtro.
// La tarjeta del médico sigue mostrando el texto original; esto solo ordena el filtro.
const RULES: [RegExp, string][] = [
  [/psiquiatr|salud mental/, 'Psiquiatría y Salud Mental'],
  [/psicolog|psicoterap/, 'Psicología y Psicoterapia'],
  [/trabajo social/, 'Trabajo Social'],
  [/tdah|deficit de atencion/, 'TDAH'],
  [/desarrollo infantil|desarrollo pediatr/, 'Desarrollo Infantil'],
  [/ortoped|traumatolog|columna/, 'Ortopedia y Traumatología'],
  [/cirug|mastolog/, 'Cirugía'],
  [/oftalmolog|retina|estrabismo/, 'Oftalmología'],
  [/otorrino/, 'Otorrinolaringología (ORL)'],
  [/cardi/, 'Cardiología'],
  [/dermatolog/, 'Dermatología'],
  [/gastro|proctolog/, 'Gastroenterología y Proctología'],
  [/endocrin|diabet/, 'Endocrinología y Diabetes'],
  [/neurolog/, 'Neurología'],
  [/urolog/, 'Urología'],
  [/ginec|obstetr|embarazo|cuello uterino|cervical|ecografia|menopausia|fertilidad|reproductiva/, 'Ginecología y Obstetricia'],
  [/reumatolog/, 'Reumatología'],
  [/alerg|inmunolog/, 'Alergología e Inmunología'],
  [/nefrolog/, 'Nefrología'],
  [/neumo/, 'Neumología'],
  [/infec/, 'Infectología'],
  [/hematolog/, 'Hematología'],
  [/dolor/, 'Medicina del Dolor'],
  [/fisioterap/, 'Fisioterapia'],
  [/fonoaudiolog/, 'Fonoaudiología'],
  [/nutric/, 'Nutrición'],
  [/enfermer/, 'Enfermería'],
  [/radiolog/, 'Radiología'],
  [/pediatr|yeladim/, 'Pediatría'],
  [/geriatr/, 'Geriatría'],
  [/familiar|interna|general|mishpaj/, 'Medicina Familiar y General'],
];

const normalize = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export const specialtyGroup = (specialty: string): string => {
  const s = normalize(specialty || '');
  for (const [re, group] of RULES) if (re.test(s)) return group;
  return 'Otras especialidades';
};
