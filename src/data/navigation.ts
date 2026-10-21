import React from 'react';
import { 
  MessageCirclePlus, 
  Stethoscope, 
  Siren, 
  Store, 
  Landmark, 
  ClipboardCheck, 
  HardHat, 
  Calculator, 
  Car, 
  Ticket, 
  Users, 
  Martini,
  HeartPulse,
  FileText,
  Home
} from 'lucide-react';

export type CategoryGroupId = 'salud' | 'tramites' | 'comunidad';

export interface CategoryGroup {
  id: CategoryGroupId;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  colorFrom: string;
  colorTo: string;
  gradientClass: string;
  bgLightClass: string;
  borderColorClass: string;
  textColorClass: string;
  badgeBgClass: string;
  tabAccentClass: string;
}

export const CATEGORY_GROUPS: Record<CategoryGroupId, CategoryGroup> = {
  salud: {
    id: 'salud',
    name: 'Asistencia & Salud',
    icon: HeartPulse,
    colorFrom: '#1F5F8B',
    colorTo: '#2E78A8',
    gradientClass: 'from-[#1F5F8B] to-[#2E78A8]',
    bgLightClass: 'bg-[#1F5F8B]/10',
    borderColorClass: 'border-[#1F5F8B]/30',
    textColorClass: 'text-[#1F5F8B]',
    badgeBgClass: 'bg-white text-[#1F5F8B]',
    tabAccentClass: 'text-[#1F5F8B] border-[#1F5F8B]'
  },
  tramites: {
    id: 'tramites',
    name: 'Derechos & Trámites',
    icon: FileText,
    colorFrom: '#6B4FA0',
    colorTo: '#7F62B5',
    gradientClass: 'from-[#6B4FA0] to-[#7F62B5]',
    bgLightClass: 'bg-[#6B4FA0]/10',
    borderColorClass: 'border-[#6B4FA0]/30',
    textColorClass: 'text-[#6B4FA0]',
    badgeBgClass: 'bg-white text-[#6B4FA0]',
    tabAccentClass: 'text-[#6B4FA0] border-[#6B4FA0]'
  },
  comunidad: {
    id: 'comunidad',
    name: 'Comunidad & Emprendimientos',
    icon: Home,
    colorFrom: '#2A7050',
    colorTo: '#36835F',
    gradientClass: 'from-[#2A7050] to-[#36835F]',
    bgLightClass: 'bg-[#2A7050]/10',
    borderColorClass: 'border-[#2A7050]/30',
    textColorClass: 'text-[#2A7050]',
    badgeBgClass: 'bg-white text-[#2A7050]',
    tabAccentClass: 'text-[#2A7050] border-[#2A7050]'
  }
};

export interface SectionConfig {
  id: string;
  name: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  groupId: CategoryGroupId;
  groupName: string;
  badge?: string;
  description: string;
  featuredDescription?: string;
  isFeatured?: boolean;
  contextPromptHint: string;
  path: string;
}

export const SECTIONS: SectionConfig[] = [
  // 1. Asistencia & Salud
  {
    id: 'assistant',
    name: 'Asistente IA Olim',
    shortLabel: 'Asistente IA',
    icon: MessageCirclePlus,
    groupId: 'salud',
    groupName: 'Asistencia & Salud',
    badge: 'Popular',
    description: 'Consultas sobre salud, trámites y vida cotidiana en Israel con respuestas claras en español.',
    contextPromptHint: 'Asistente integral de Olim Conectados. Escribí tu consulta en español rioplatense.',
    path: '/asistente'
  },
  {
    id: 'doctors',
    name: 'Médicos en Español',
    shortLabel: 'Médicos',
    icon: Stethoscope,
    groupId: 'salud',
    groupName: 'Asistencia & Salud',
    badge: 'Top',
    isFeatured: true,
    description: 'Directorio con 370 médicos y especialistas en Maccabi, Clalit, Meuhedet y Leumit.',
    featuredDescription: 'Encontrá profesionales por kupa, ciudad y dirección física sin barreras de idioma.',
    contextPromptHint: 'Estás en: Médicos en Español. Preguntame por cartillas, copagos o cómo pedir turno.',
    path: '/medicos-en-espanol'
  },
  {
    id: 'emergency',
    name: 'Guardia & Miún SOS',
    shortLabel: 'Guardia / Miún',
    icon: Siren,
    groupId: 'salud',
    groupName: 'Asistencia & Salud',
    badge: 'SOS',
    isFeatured: true,
    description: 'Guía paso a paso para no pagar de más en salas de emergencia de hospitales y centros Terem.',
    featuredDescription: 'Conocé las reglas de derivación previa (hafniá) y números telefónicos de guardia urgente.',
    contextPromptHint: 'Estás en: Guardia & Miún SOS. Consultame sobre coberturas de guardia, Terem y derivaciones.',
    path: '/emergencias'
  },

  // 2. Derechos & Trámites
  {
    id: 'business-plan',
    name: 'Plan de Negocio',
    shortLabel: 'Plan de Negocio',
    icon: Store,
    groupId: 'tramites',
    groupName: 'Derechos & Trámites',
    badge: 'Oficial',
    description: 'Asesoramiento gratuito del Ministerio de Aliyah y Centros Maalot para emprendedores.',
    contextPromptHint: 'Estás en: Plan de Negocio. Preguntame sobre Maalot, apertura de Osek y beneficios del ministerio.',
    path: '/plan-de-negocio'
  },
  {
    id: 'crisis-civil',
    name: 'Crisis, Economía & Vida Civil',
    shortLabel: 'Crisis & Economía',
    icon: Landmark,
    groupId: 'tramites',
    groupName: 'Derechos & Trámites',
    description: 'Sal Klitá, subsidio de alquiler desde el mes 7, Teum Mas y pautas de Pikud HaOref.',
    contextPromptHint: 'Estás en: Crisis, Economía & Vida Civil. Consultame sobre Sal Klitá, subsidio de alquiler y Teum Mas.',
    path: '/crisis-civil'
  },
  {
    id: 'checklist',
    name: 'Mi Checklist de Oleh',
    shortLabel: 'Checklist Oleh',
    icon: ClipboardCheck,
    groupId: 'tramites',
    groupName: 'Derechos & Trámites',
    badge: 'Nuevo',
    isFeatured: true,
    description: 'Paso a paso ordenado desde el aeropuerto hasta la inserción laboral y civil completa.',
    featuredDescription: 'Seguimiento visual interactivo con guardado automático de tu progreso en el dispositivo.',
    contextPromptHint: 'Estás en: Mi Checklist de Oleh. Preguntame qué trámite hacer primero y qué papeles llevar.',
    path: '/checklist-aliyah'
  },
  {
    id: 'bituaj',
    name: 'Accidente & Bituaj Leumi',
    shortLabel: 'Bituaj Leumi',
    icon: HardHat,
    groupId: 'tramites',
    groupName: 'Derechos & Trámites',
    description: 'Lesiones de trabajo, formulario BL 250, médico laboral y derechos de seguridad social.',
    contextPromptHint: 'Estás en: Accidente & Bituaj Leumi. Preguntame por el formulario BL 250, ART y reclamos de invalidez.',
    path: '/bituaj-leumi'
  },
  {
    id: 'sick-leave',
    name: 'Calculadora Días Majalá',
    shortLabel: 'Días Majalá',
    icon: Calculator,
    groupId: 'tramites',
    groupName: 'Derechos & Trámites',
    description: 'Cálculo legal según Jok Dmei Majalá: porcentaje a cobrar en día 1, 2, 3 y acumulados.',
    contextPromptHint: 'Estás en: Calculadora Días Majalá. Consultame sobre cálculo de días de enfermedad según la ley israelí.',
    path: '/calculadora-dias-enfermedad'
  },
  {
    id: 'license',
    name: 'Licencia de Conducir',
    shortLabel: 'Licencia',
    icon: Car,
    groupId: 'tramites',
    groupName: 'Derechos & Trámites',
    description: 'Conversión y reválida de carné extranjero en Misrad HaRishuí con Tofes Yarok digital.',
    contextPromptHint: 'Estás en: Licencia de Conducir. Preguntame sobre el Tofes Yarok, test práctico y reválida de carné.',
    path: '/licencia-de-conducir'
  },
  {
    id: 'bureaucracy',
    name: 'Trámites & Vouchers',
    shortLabel: 'Trámites',
    icon: Ticket,
    groupId: 'tramites',
    groupName: 'Derechos & Trámites',
    isFeatured: true,
    description: 'Guías para Tofes 101, turnos con MyVisit, descuento de Arnoná y voucher de Ulpán.',
    featuredDescription: 'Explicación de cada campo en español con capturas y pasos a seguir en oficinas públicas.',
    contextPromptHint: 'Estás en: Trámites & Vouchers. Consultame sobre Tofes 101, MyVisit, descuento de Arnoná y Ulpán.',
    path: '/tramites-y-burocracia'
  },

  // 3. Comunidad & Emprendimientos
  {
    id: 'community',
    name: 'Comunidad & Redes',
    shortLabel: 'Comunidad',
    icon: Users,
    groupId: 'comunidad',
    groupName: 'Comunidad & Emprendimientos',
    description: 'Almacenes con productos latinos, carnicerías, panaderías y grupos de WhatsApp por ciudad.',
    contextPromptHint: 'Estás en: Comunidad & Redes. Preguntame sobre grupos de olim, almacenes latinos y vivienda.',
    path: '/comunidad'
  },
  {
    id: 'nightlife',
    name: 'Vida Nocturna',
    shortLabel: 'Vida Nocturna',
    icon: Martini,
    groupId: 'comunidad',
    groupName: 'Comunidad & Emprendimientos',
    description: 'Boliches latinos, fiestas temáticas, bares y movida social hispanohablante en Israel.',
    contextPromptHint: 'Estás en: Vida Nocturna. Consultame sobre fiestas latinas, boliches y movida cultural en Israel.',
    path: '/vida-nocturna'
  }
];

export const SECTION_MAP = SECTIONS.reduce((acc, sec) => {
  acc[sec.id] = sec;
  return acc;
}, {} as Record<string, SectionConfig>);

export const PATH_TO_SECTION = SECTIONS.reduce((acc, sec) => {
  acc[sec.path] = sec.id;
  return acc;
}, { '/': 'home' } as Record<string, string>);
