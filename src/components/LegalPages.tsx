import React from 'react';
import { FileText, ShieldCheck, Users, Mail, ArrowLeft } from 'lucide-react';
import { CONTACT_EMAIL, LEGAL_LAST_UPDATED } from '../config';

export type LegalPageId = 'terms' | 'privacy' | 'about';

interface LegalPagesProps {
  page: LegalPageId;
  onNavigateToTab: (tab: string) => void;
}

const META: Record<LegalPageId, { title: string; intro: string; icon: React.ComponentType<{ className?: string }> }> = {
  terms: {
    title: 'Términos y Condiciones',
    intro: 'Las reglas de uso de Olim Conectados, en pocas palabras.',
    icon: FileText,
  },
  privacy: {
    title: 'Política de Privacidad',
    intro: 'Qué datos usa el sitio y cuáles no.',
    icon: ShieldCheck,
  },
  about: {
    title: 'Quiénes somos',
    intro: 'Qué es Olim Conectados y cómo trabajamos la información.',
    icon: Users,
  },
};

const Block: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="bg-white rounded-2xl border border-black/5 p-5 sm:p-6 shadow-2xs">
    <h2 className="text-lg sm:text-xl font-extrabold text-[#0E2559]">{title}</h2>
    <div className="mt-2 space-y-2 text-slate-700 text-[15px] sm:text-base leading-relaxed">{children}</div>
  </section>
);

const ContactLine: React.FC = () =>
  CONTACT_EMAIL ? (
    <p className="flex items-center gap-2">
      <Mail className="w-4 h-4 text-[#1F5F8B] shrink-0" />
      <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-[#1F5F8B] underline break-all">
        {CONTACT_EMAIL}
      </a>
    </p>
  ) : (
    <p className="rounded-xl bg-amber-50 border border-amber-300 text-amber-900 px-3 py-2 font-semibold">
      Correo de contacto: pendiente de definir.
    </p>
  );

const NotAffiliated: React.FC = () => (
  <p>
    Olim Conectados es un proyecto personal, independiente y sin fines de lucro. No está afiliado, patrocinado ni
    respaldado por el Ministerio de Aliá e Integración, la Agencia Judía, el Bituaj Leumi, las Kupot Jolim ni ninguna
    otra entidad gubernamental de Israel.
  </p>
);

const Terms: React.FC = () => (
  <>
    <Block title="1. Qué es este sitio">
      <NotAffiliated />
    </Block>
    <Block title="2. Información orientativa">
      <p>
        La información se arma a partir de fuentes oficiales y cada sección indica cuándo se revisó. Las normas,
        montos y requisitos cambian, así que antes de decidir confirma siempre con el organismo que corresponde.
      </p>
      <p>
        Nada de lo que publicamos reemplaza una consulta médica, asesoramiento legal o contable, ni las decisiones del
        Bituaj Leumi, tu Kupá u otra autoridad.
      </p>
      <p className="font-bold text-[#0E2559]">
        En una emergencia llama al 101 (Magen David Adom), 100 (Policía) o 102 (Bomberos).
      </p>
    </Block>
    <Block title="3. Médicos">
      <p>
        El directorio muestra médicos que figuran en la ficha oficial de su Kupá. No es una recomendación ni una
        evaluación profesional. Turnos, cobertura y disponibilidad se consultan directamente con tu Kupá.
      </p>
    </Block>
    <Block title="4. Comercios y vida nocturna">
      <p>
        Direcciones, horarios y contactos salen de las cuentas de cada lugar y de Google Maps al momento de cargarlos.
        Son datos de referencia: confírmalos con el lugar antes de ir o comprar.
      </p>
    </Block>
    <Block title="5. Enlaces a otros sitios">
      <p>
        Enlazamos a sitios oficiales y a cuentas de comercios. No controlamos su contenido y cada uno tiene sus propios
        términos y su política de privacidad.
      </p>
    </Block>
    <Block title="6. Uso del contenido">
      <p>
        Puedes compartir la información del sitio mencionando a Olim Conectados. No está permitido copiar el sitio de
        forma masiva o automatizada.
      </p>
    </Block>
    <Block title="7. Comentarios y aportes">
      <p>
        Por ahora el sitio no recibe ni publica comentarios, reseñas ni recomendaciones de visitantes. Si eso cambia,
        lo vamos a avisar acá antes de habilitarlo.
      </p>
    </Block>
    <Block title="8. Cambios">
      <p>
        Podemos actualizar estos términos. La fecha de abajo indica la última versión. Al usar el sitio aceptas los
        términos vigentes.
      </p>
    </Block>
  </>
);

const Privacy: React.FC = () => (
  <>
    <Block title="1. No pedimos datos personales">
      <p>
        No hay registro, cuentas ni formularios. El sitio no te pide nombre, correo, teléfono ni ningún otro dato
        personal.
      </p>
    </Block>
    <Block title="2. Medición anónima de visitas">
      <p>
        Contamos visitas de forma agregada con Vercel Web Analytics, que no usa cookies y no nos muestra quién eres.
        Solo vemos totales, como cuántas personas entraron a cada sección.
      </p>
    </Block>
    <Block title="3. Lo que queda guardado en tu teléfono">
      <p>
        Algunas preferencias se guardan solo en tu navegador, para que no tengas que repetirlas: el tamaño de letra, el
        menú lateral abierto o cerrado, tu avance en el checklist y tu tipo de Aliá. No nos llegan. Puedes borrarlas
        eliminando los datos del sitio en tu navegador.
      </p>
    </Block>
    <Block title="4. Proveedores">
      <p>
        El sitio está alojado en Vercel. Como cualquier servidor, Vercel procesa datos técnicos de la conexión, como la
        dirección IP y el tipo de navegador, para mostrarte el sitio y protegerlo de ataques. Las tipografías se
        cargan desde nuestro propio sitio, no desde servicios externos.
      </p>
    </Block>
    <Block title="5. Enlaces externos">
      <p>
        Cuando abres un enlace a una Kupá, a gov.il, a WhatsApp o a la cuenta de un comercio, pasas a otro sitio con su
        propia política de privacidad.
      </p>
    </Block>
    <Block title="6. Tus derechos">
      <p>
        Como no guardamos datos personales tuyos, no hay información para consultar, corregir o borrar. Si tienes
        dudas, escríbenos. También puedes dirigirte a la Autoridad de Protección de la Privacidad del Ministerio de
        Justicia de Israel.
      </p>
      <ContactLine />
    </Block>
    <Block title="7. Cambios">
      <p>
        Si el sitio empieza a usar datos personales (por ejemplo, con un formulario o el Asistente), actualizaremos esta
        política antes de activarlo.
      </p>
    </Block>
  </>
);

const About: React.FC<{ onNavigateToTab: (tab: string) => void }> = ({ onNavigateToTab }) => (
  <>
    <Block title="Qué es Olim Conectados">
      <p>
        Una guía en español para olim que viven en Israel: médicos que hablan español, trámites, Bituaj Leumi,
        emergencias y comunidad, en un solo lugar y en todo el país.
      </p>
    </Block>
    <Block title="Cómo trabajamos la información">
      <p>
        Usamos solo fuentes oficiales: gov.il, el Bituaj Leumi, las Kupot Jolim y otros organismos. Kol Zchut se usa
        únicamente como respaldo. Cada sección indica su fecha de revisión.
      </p>
      <p>
        Los médicos se verifican en la ficha oficial de su Kupá. No publicamos reseñas ni puntajes.
      </p>
    </Block>
    <Block title="Independientes">
      <NotAffiliated />
    </Block>
    <Block title="¿Encontraste un error?">
      <p>Escríbenos y lo revisamos contra la fuente oficial.</p>
      <ContactLine />
    </Block>
    <button
      onClick={() => onNavigateToTab('home')}
      className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0E2559] text-white font-bold text-sm"
    >
      <ArrowLeft className="w-4 h-4" />
      Volver al inicio
    </button>
  </>
);

export const LegalPages: React.FC<LegalPagesProps> = ({ page, onNavigateToTab }) => {
  const meta = META[page];
  const Icon = meta.icon;
  return (
    <article className="max-w-3xl mx-auto space-y-4">
      <header className="rounded-2xl bg-[#0E2559]/5 border border-[#0E2559]/10 p-5 sm:p-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[#0E2559] text-white flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0E2559] leading-tight">{meta.title}</h1>
          <p className="text-slate-600 mt-0.5">{meta.intro}</p>
        </div>
      </header>
      {page === 'terms' && <Terms />}
      {page === 'privacy' && <Privacy />}
      {page === 'about' && <About onNavigateToTab={onNavigateToTab} />}
      <p className="text-xs text-slate-500 text-center pt-2">Última actualización: {LEGAL_LAST_UPDATED}</p>
    </article>
  );
};
