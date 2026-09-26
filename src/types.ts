export type KupaName = 'Maccabi' | 'Clalit' | 'Meuhedet' | 'Leumit' | 'Privado';

export type SpanishLevel = 'Nativo' | 'Fluido' | 'Básico';

export interface DoctorReview {
  id: string;
  author: string;
  date: string;
  rating: number; // 1 to 5
  spanishFluencyRating: number; // 1 to 5
  listeningTimeRating: number; // 1 to 5
  conservativeApproachRating: number; // 1 to 5: prioritizes non-invasive diagnostics before surgery
  comment: string;
  isVerifiedOle?: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  kupot: KupaName[];
  city: string;
  address: string;
  phone: string;
  spanishLevel: SpanishLevel;
  rating: number;
  reviewsCount: number;
  consultationFocus: string;
  receptionHours: string;
  acceptsNewPatients: boolean;
  reviews: DoctorReview[];
}

export interface CommunityStore {
  id: string;
  name: string;
  category: 
    | 'Almacén Rioplatense / Latino' 
    | 'Carnicería (Cortes Latinos)' 
    | 'Empanadas y Comida Casera' 
    | 'Panadería, Café y Facturas'
    | 'Emprendimiento de Olim (Sin Local / Por Encargo)';
  city: string;
  address: string;
  phone: string;
  description: string;
  specialties: string[];
  hours: string;
  isIconic?: boolean;
  isEntrepreneurship?: boolean; // Emprendimiento de Olim Jadashim
  orderMethod?: 'WhatsApp' | 'Instagram' | 'Local a la Calle' | 'Online';
  instagramOrWeb?: string;
}

export interface CommunityGroup {
  id: string;
  title: string;
  platform: 'WhatsApp' | 'Facebook';
  category: 'Búsqueda de Empleo' | 'Alquileres y Vivienda' | 'Trámites y Burocracia' | 'Comunidades por Ciudad';
  cityOrScope: string;
  membersCount: string;
  description: string;
  link: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
