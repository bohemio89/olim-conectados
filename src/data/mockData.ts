import { Doctor, CommunityStore, CommunityGroup, NightlifeVenue } from '../types';

// Solo se muestran médicos verificados en la ficha oficial de su Kupá.
// Directorio comunitario de medicos hispanohablantes en Israel. Cargado manualmente
// a partir del listado publico de PL Digital para las especialidades mas buscadas
// (medicina familiar, pediatria, psicologia/psiquiatria, traumatologia).
// IMPORTANTE: no se agrego ninguna resena, puntaje ni testimonio -- reviewsCount y
// rating quedan en 0 y reviews vacio hasta que usuarios reales carguen su experiencia.
// El campo spanishLevel se dejo como 'Fluido' por defecto (no verificado individualmente:
// el listado de origen agrupa medicos de habla hispana pero no distingue nivel exacto).
// acceptsNewPatients se dejo en false por defecto (no confirmado) para no mostrar ese
// badge sin verificar. Direccion exacta no disponible en la fuente: se usa la ciudad.

export const INITIAL_DOCTORS: Doctor[] = [
  {
    "id": "doc-1",
    "name": "Milman Uzi",
    "specialty": "Medicina Familiar (Rofé Mishpajá)",
    "kupot": [
      "Clalit"
    ],
    "city": "Naharía",
    "phone": "04-9921119",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-2",
    "name": "Cytryn Denise I.",
    "specialty": "Medicina Familiar (Rofé Mishpajá)",
    "kupot": [
      "Clalit"
    ],
    "city": "Rosh HaAyin",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-4",
    "name": "Dra. Jenny Frenkel",
    "specialty": "Medicina Familiar y Dolor",
    "kupot": [
      "Clalit"
    ],
    "city": "Modi'in",
    "phone": "03-6170700 / 03-9436215",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=41220&eservicecode=2&employeeid=3A4E203D881C99A40C87E456CB146560"
  },
  {
    "id": "doc-5",
    "name": "Arditi Esther",
    "specialty": "Medicina Familiar (Rofé Mishpajá)",
    "kupot": [
      "Clalit"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "03-6981400",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=23400&eservicecode=2&employeeid=02E1D0A616AE97046932C56E52A115D9"
  },
  {
    "id": "doc-6",
    "name": "Biber Isidro Leon",
    "specialty": "Medicina Familiar (Rofé Mishpajá)",
    "kupot": [
      "Clalit"
    ],
    "city": "Kfar Saba",
    "phone": "054-5758780",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=129811&eservicecode=2&employeeid=84557BB26D91B5ADBEE77D4FED99E590"
  },
  {
    "id": "doc-7",
    "name": "Dr. Yuval Shilman",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Jerusalén",
    "phone": "053-8411232",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=128524&eservicecode=2&employeeid=C80C5327940AEA6237813B160CF27221"
  },
  {
    "id": "doc-8",
    "name": "Dr. Gabriel Sardel",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Be'er Sheva",
    "phone": "08-6475555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=93300&eservicecode=2&employeeid=804974320A0A657A4EF5D5A60F237399"
  },
  {
    "id": "doc-9",
    "name": "Dra. Regina P. Maaravi",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Herzliya",
    "phone": "09-9592333",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=121240&eservicecode=2&employeeid=C9EF8A82CAD1D76750215535EB42FCE1"
  },
  {
    "id": "doc-10",
    "name": "Weisberg Inbal",
    "specialty": "Medicina Familiar (Rofé Mishpajá)",
    "kupot": [
      "Clalit"
    ],
    "city": "Modi'in",
    "phone": "08-8614430",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=74390&eservicecode=2&employeeid=4F4B6E0914EF5DA086661567DD99FA33"
  },
  {
    "id": "doc-11",
    "name": "Prof. Finkelstein Renato",
    "specialty": "Medicina Familiar (Rofé Mishpajá)",
    "kupot": [
      "Clalit",
      "Maccabi",
      "Privado"
    ],
    "city": "Haifa",
    "phone": "04-8378940",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-12",
    "name": "Dr. Gabriel Lerner",
    "specialty": "Medicina Familiar (Rofé Mishpajá)",
    "kupot": [
      "Clalit"
    ],
    "city": "Netanya",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=128506&eservicecode=2&employeeid=586F174EBBACE70E5E7D9B58DD6C1187"
  },
  {
    "id": "doc-13",
    "name": "Kaplan Salvador",
    "specialty": "Medicina Familiar (Rofé Mishpajá)",
    "kupot": [
      "Leumit"
    ],
    "city": "Hertzlia",
    "phone": "09-972-7500",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-16",
    "name": "Blank Sonia",
    "specialty": "Medicina Familiar (Rofé Mishpajá)",
    "kupot": [
      "Maccabi"
    ],
    "city": "Kiriat Gat",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-17",
    "name": "Dr. Shul Amsalem Vidan",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Givatayim",
    "phone": "03-5739260",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "Katznelson 96"
  },
  {
    "id": "doc-18",
    "name": "Dra. Helena Honigman",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "03-5602469",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "Yavne 17",
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=ACF342B238B78698815B83CF2D79A4E0EC970CCD2A5A573A3CBE9437F58D728A&RequestId=1bc9100b-64a6-3a29-a32d-583a7234e2f2&Source=SearchPageResults"
  },
  {
    "id": "doc-19",
    "name": "Nice Moshe",
    "specialty": "Medicina Familiar (Rofé Mishpajá)",
    "kupot": [
      "Maccabi"
    ],
    "city": "Naharía",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-20",
    "name": "Shemesh Lior",
    "specialty": "Medicina Familiar (Rofé Mishpajá)",
    "kupot": [
      "Maccabi"
    ],
    "city": "Netanya",
    "phone": "09-7447322",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-21",
    "name": "Elbaz Liron",
    "specialty": "Medicina Familiar (Rofé Mishpajá)",
    "kupot": [
      "Maccabi"
    ],
    "city": "Yavne",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-22",
    "name": "Fajnwaks Levy Karina",
    "specialty": "Medicina Familiar (Rofé Mishpajá)",
    "kupot": [
      "Maccabi"
    ],
    "city": "Ierujam (20 min de Beer Sheva)",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-23",
    "name": "Dra. Sara Spinrad",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Givatayim",
    "phone": "03-5726262",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "Aliyat HaNoar 25"
  },
  {
    "id": "doc-24",
    "name": "Dorin Uriel Matías",
    "specialty": "Medicina Familiar (Rofé Mishpajá)",
    "kupot": [
      "Maccabi"
    ],
    "city": "Netanya",
    "phone": "*3555 / 1-700-50-53-53 / 09-8868450",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-26",
    "name": "Elnatan Stern Lilian",
    "specialty": "Medicina Familiar (Rofé Mishpajá)",
    "kupot": [
      "Maccabi"
    ],
    "city": "Even Yehuda",
    "phone": "*3555 / 1-700-50-53-53",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-27",
    "name": "Guershon Ben Zaken Debi",
    "specialty": "Medicina Familiar (Rofé Mishpajá)",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Mond",
    "phone": "*3555 / 1-700-50-53-53",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-28",
    "name": "Sharon-Nofeq Charlotte",
    "specialty": "Medicina Familiar (Rofé Mishpajá)",
    "kupot": [
      "Maccabi"
    ],
    "city": "Raanana",
    "phone": "09-7421750",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-29",
    "name": "Ben Gigi Yaakov",
    "specialty": "Medicina Familiar (Rofé Mishpajá)",
    "kupot": [
      "Maccabi"
    ],
    "city": "Hadera",
    "phone": "04-6860775",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-30",
    "name": "Kushnir Yosef",
    "specialty": "Medicina Familiar (Rofé Mishpajá)",
    "kupot": [
      "Maccabi"
    ],
    "city": "Haifa",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-31",
    "name": "Rubinstein Lucy",
    "specialty": "Medicina Familiar (Rofé Mishpajá)",
    "kupot": [
      "Maccabi"
    ],
    "city": "Gedera",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-32",
    "name": "Sde Esther",
    "specialty": "Medicina Familiar (Rofé Mishpajá)",
    "kupot": [
      "Maccabi"
    ],
    "city": "Petah Tikva",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-33",
    "name": "Fajnwaks Karina",
    "specialty": "Medicina Familiar (Rofé Mishpajá)",
    "kupot": [
      "Maccabi"
    ],
    "city": "Be'er Sheva",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-34",
    "name": "Strier Adam",
    "specialty": "Medicina Familiar (Rofé Mishpajá)",
    "kupot": [
      "Maccabi"
    ],
    "city": "Haifa",
    "phone": "04-8340280",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-35",
    "name": "Prof. Felix Mor",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Ramat Gan",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=C167C458B39DB8739D979D78553DE261F1CF9651D9937E267FEFCBA14A864DD6&RequestId=b347c568-789a-b4ce-7b05-1b439eaa832d&Source=SearchPageResults",
    "address": "Arlozorov 4"
  },
  {
    "id": "doc-36",
    "name": "Kertész Judith",
    "specialty": "Medicina Familiar (Rofé Mishpajá)",
    "kupot": [
      "Maccabi"
    ],
    "city": "Kfar Saba",
    "phone": "09-7446765",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-38",
    "name": "Tarica Alberto",
    "specialty": "Medicina Familiar (Rofé Mishpajá)",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Harish",
    "phone": "04-7743900",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-39",
    "name": "Kukvak Dalia",
    "specialty": "Medicina Familiar (Rofé Mishpajá)",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Beit Shemesh",
    "phone": "*3833",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-40",
    "name": "Lozano Julio",
    "specialty": "Medicina Familiar (Rofé Mishpajá)",
    "kupot": [
      "Privado"
    ],
    "city": "Beer Sheva / Tel Aviv",
    "phone": "053-4285697",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-41",
    "name": "Martinez Jorge",
    "specialty": "Pediatría (Rofé Yeladim)",
    "kupot": [
      "Clalit"
    ],
    "city": "Ashdod",
    "phone": "08-8519400",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-42",
    "name": "Arieh Raz",
    "specialty": "Pediatría (Rofé Yeladim)",
    "kupot": [
      "Clalit"
    ],
    "city": "Kfar Saba",
    "phone": "09-7400855",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-43",
    "name": "Polak Yael",
    "specialty": "Pediatría (Rofé Yeladim)",
    "kupot": [
      "Clalit"
    ],
    "city": "Kiriat Bialik",
    "phone": "04-8787966",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-44",
    "name": "Dra. Rebecca Yael Young",
    "specialty": "Pediatría",
    "kupot": [
      "Clalit"
    ],
    "city": "Raanana",
    "phone": "09-7707111",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=121330&eservicecode=40&employeeid=8ADA0F906A2F8E6C2D358D7B07641CF2"
  },
  {
    "id": "doc-45",
    "name": "Tenenbaum Ariel",
    "specialty": "Pediatría (Rofé Yeladim)",
    "kupot": [
      "Clalit"
    ],
    "city": "Rosh Hayin",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-46",
    "name": "Dra. Silvia A. Weisse",
    "specialty": "Pediatría",
    "kupot": [
      "Clalit"
    ],
    "city": "Kfar Saba",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=121250&eservicecode=40&employeeid=FC79B6C0F1A0ED4E33AA798FA011B7A0"
  },
  {
    "id": "doc-48",
    "name": "Gordon Bercholc Irina",
    "specialty": "Pediatría (Rofé Yeladim)",
    "kupot": [
      "Leumit"
    ],
    "city": "Kohav Yaakov / Tel Tzion / Shaar Binyamin",
    "phone": "1-700-507-507 / *507",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-49",
    "name": "Rubinstein Uri",
    "specialty": "Pediatría (Rofé Yeladim)",
    "kupot": [
      "Maccabi",
      "Clalit"
    ],
    "city": "Netanya",
    "phone": "09-8655688",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=122920&eservicecode=40&employeeid=7FC425263F0CEB26136085034EBCC46E"
  },
  {
    "id": "doc-50",
    "name": "Lev Efrat",
    "specialty": "Pediatría (Rofé Yeladim)",
    "kupot": [
      "Maccabi"
    ],
    "city": "Kfar Saba",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-51",
    "name": "Lahman Vanesa",
    "specialty": "Pediatría (Rofé Yeladim)",
    "kupot": [
      "Maccabi"
    ],
    "city": "Naharia / Kiryat Yam",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-52",
    "name": "Brick Tulio",
    "specialty": "Pediatría (Rofé Yeladim)",
    "kupot": [
      "Maccabi"
    ],
    "city": "Be'er Sheva",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-53",
    "name": "Sapir Daniel",
    "specialty": "Pediatría (Rofé Yeladim)",
    "kupot": [
      "Maccabi"
    ],
    "city": "Shoham",
    "phone": "03-9730308",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-54",
    "name": "Katz Gabriel",
    "specialty": "Pediatría (Rofé Yeladim)",
    "kupot": [
      "Maccabi"
    ],
    "city": "Modi'in",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-55",
    "name": "Dr. Daniel Schneiderman",
    "specialty": "Pediatría y TDAH Infantil",
    "kupot": [
      "Maccabi"
    ],
    "city": "Holon",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=E3912099C1673173E109678B304A203E2E8236843FBB2AD1DB96814A8C9486BA&RequestId=7fbf94d1-3051-f8d8-224e-cdda70e8ce7e&Source=SearchPageResults",
    "address": "Rafael Eitan 4"
  },
  {
    "id": "doc-56",
    "name": "Moore Naomi",
    "specialty": "Pediatría (Rofé Yeladim)",
    "kupot": [
      "Maccabi",
      "Meuhedet"
    ],
    "city": "Raanana",
    "phone": "09-7452640",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-57",
    "name": "Orenstein Monica",
    "specialty": "Pediatría (Rofé Yeladim)",
    "kupot": [
      "Maccabi"
    ],
    "city": "Bnei Brak",
    "phone": "03-5605001 / 053-9956151",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-58",
    "name": "Duchett Arnaldo",
    "specialty": "Pediatría (Rofé Yeladim)",
    "kupot": [
      "Maccabi"
    ],
    "city": "Ashkelon",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-59",
    "name": "Rosenzweig Lorena",
    "specialty": "Pediatría (Rofé Yeladim)",
    "kupot": [
      "Maccabi"
    ],
    "city": "Yehud",
    "phone": "*3555 / 1-700-50-53-53",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-60",
    "name": "Kasagrandi Daniela",
    "specialty": "Pediatría (Rofé Yeladim)",
    "kupot": [
      "Maccabi"
    ],
    "city": "Carmiel",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-61",
    "name": "Orbach Dalia",
    "specialty": "Pediatría (Rofé Yeladim)",
    "kupot": [
      "Maccabi"
    ],
    "city": "Eilat",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-62",
    "name": "Levin Peggy",
    "specialty": "Pediatría (Rofé Yeladim)",
    "kupot": [
      "Maccabi"
    ],
    "city": "Jerusalem",
    "phone": "02-5822903",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-63",
    "name": "Zimerman Ana",
    "specialty": "Pediatría (Rofé Yeladim)",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Bnei Brak / Guivat Shmuel",
    "phone": "*3833",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-64",
    "name": "Saieg Spilberg Shirly",
    "specialty": "Pediatría (Rofé Yeladim)",
    "kupot": [
      "Meuhedet",
      "Privado"
    ],
    "city": "Jerusalem",
    "phone": "*3833 / 02-6518921",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-65",
    "name": "Jamszon Ideses Samanta",
    "specialty": "Psicología / Psicoterapia",
    "kupot": [
      "Clalit",
      "Privado"
    ],
    "city": "Raanana",
    "phone": "054-6620064",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-66",
    "name": "Lic. Sandra Mordetzki",
    "specialty": "Psicología y Psicoterapia",
    "kupot": [
      "Clalit",
      "Privado"
    ],
    "city": "Hod HaSharon",
    "phone": "052-8305272",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=40228&eservicecode=576&employeeid=ACBE43CD7F0BF6160A028F371047E590"
  },
  {
    "id": "doc-67",
    "name": "Lic. Gladys Tareb",
    "specialty": "Trabajo Social y Psicoterapia",
    "kupot": [
      "Clalit",
      "Privado"
    ],
    "city": "Rishon LeZion",
    "phone": "054-5716876",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=70202&eservicecode=1765&employeeid=5AAB50B80A555DF612254403495EF9B3"
  },
  {
    "id": "doc-68",
    "name": "Grad Ricardo",
    "specialty": "Psicología / Psicoterapia",
    "kupot": [
      "Leumit",
      "Meuhedet",
      "Privado"
    ],
    "city": "Ashdod",
    "phone": "050-4615495",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-69",
    "name": "Blinder Schmoisman Graciela",
    "specialty": "Psicología / Psicoterapia",
    "kupot": [
      "Meuhedet",
      "Privado"
    ],
    "city": "Kfar Saba",
    "phone": "050-6484373 / 050-648437",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-70",
    "name": "Broitman Fabián",
    "specialty": "Psicología / Psicoterapia",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Petaj Tikva / Tel Aviv / Raanana / Kfar Saba",
    "phone": "*3833",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-71",
    "name": "Gisèle Cababié",
    "specialty": "Psicología / Psicoterapia",
    "kupot": [
      "Privado"
    ],
    "city": "Raanana",
    "phone": "054-7925310",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-72",
    "name": "Blaustein Kobrinsky Bettina",
    "specialty": "Psicología / Psicoterapia",
    "kupot": [
      "Privado"
    ],
    "city": "Or Yehuda",
    "phone": "054-3088571",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-73",
    "name": "Funtowicz Marcelo",
    "specialty": "Psicología / Psicoterapia",
    "kupot": [
      "Privado"
    ],
    "city": "Kfar Saba",
    "phone": "050-7236478",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-74",
    "name": "Sakson Sílvia",
    "specialty": "Psicología / Psicoterapia",
    "kupot": [
      "Privado"
    ],
    "city": "Kfar Saba",
    "phone": "054-4573903",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-75",
    "name": "Fischer Gabriela",
    "specialty": "Psicología / Psicoterapia",
    "kupot": [
      "Privado"
    ],
    "city": "Kfar Saba",
    "phone": "052-5018410",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-76",
    "name": "Hersh Gabriela",
    "specialty": "Psicología / Psicoterapia",
    "kupot": [
      "Privado"
    ],
    "city": "Ramat Gan",
    "phone": "054-3242807",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-77",
    "name": "Polansky Claudia",
    "specialty": "Psicología / Psicoterapia",
    "kupot": [
      "Privado"
    ],
    "city": "Moshav Hosen",
    "phone": "052-8593216",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-78",
    "name": "Rozanzki Tamara",
    "specialty": "Psicología / Psicoterapia",
    "kupot": [
      "Privado"
    ],
    "city": "Hod HaSharon",
    "phone": "053-3731823",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-79",
    "name": "Rosenberg Mariana",
    "specialty": "Psicología / Psicoterapia",
    "kupot": [
      "Privado"
    ],
    "city": "Eilat",
    "phone": "052-8040977",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-80",
    "name": "Helfer Gabriela",
    "specialty": "Psicología / Psicoterapia",
    "kupot": [
      "Privado"
    ],
    "city": "Gan Yavne",
    "phone": "054-5388369",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-81",
    "name": "Bar Lavi Luna",
    "specialty": "Psicología / Psicoterapia",
    "kupot": [
      "Privado"
    ],
    "city": "Mevatseret Tzion / Jerusalem",
    "phone": "054-8730700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-82",
    "name": "Konfederak Melina",
    "specialty": "Psicología / Psicoterapia",
    "kupot": [
      "Privado"
    ],
    "city": "Kiriat Yam",
    "phone": "053-2318802",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-83",
    "name": "Lic. Verónica Milstein",
    "specialty": "Psicología Infantil",
    "kupot": [
      "Privado",
      "Clalit"
    ],
    "city": "Modi'in",
    "phone": "08-9736113",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=74304&eservicecode=758&employeeid=ABC8220CFD64E05355337F6F6265A63D"
  },
  {
    "id": "doc-84",
    "name": "Naymark Chait Silvia",
    "specialty": "Psicología / Psicoterapia",
    "kupot": [
      "Privado"
    ],
    "city": "Nahariya",
    "phone": "050-6882045",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-85",
    "name": "Schejtman Beatriz",
    "specialty": "Psicología / Psicoterapia",
    "kupot": [
      "Privado"
    ],
    "city": "Be'er Sheva",
    "phone": "050-6221109",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-86",
    "name": "Presman Ruty",
    "specialty": "Psicología / Psicoterapia",
    "kupot": [
      "Privado"
    ],
    "city": "Pardes Hana Karkur",
    "phone": "055-6874124",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-87",
    "name": "Vivi Arvilly Copitt",
    "specialty": "Psicología / Psicoterapia",
    "kupot": [
      "Privado"
    ],
    "city": "Kfar Saba",
    "phone": "054-4348034",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-88",
    "name": "Raijer Beatriz",
    "specialty": "Psicología / Psicoterapia",
    "kupot": [
      "Privado"
    ],
    "city": "Harish",
    "phone": "052-8773707",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-89",
    "name": "Golinski Judy",
    "specialty": "Psicología / Psicoterapia",
    "kupot": [
      "Privado"
    ],
    "city": "Ramat Gan",
    "phone": "052-3267306",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-90",
    "name": "Kleiner Yosef",
    "specialty": "Psicología / Psicoterapia",
    "kupot": [
      "Privado"
    ],
    "city": "Rehovot",
    "phone": "052-5361531",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-91",
    "name": "Erroch Alberto",
    "specialty": "Psicología / Psicoterapia",
    "kupot": [
      "Privado"
    ],
    "city": "Modi'in",
    "phone": "052-2637595",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-92",
    "name": "Blumencweig David",
    "specialty": "Psicología / Psicoterapia",
    "kupot": [
      "Privado"
    ],
    "city": "Kfar Saba",
    "phone": "054-4795763",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-93",
    "name": "Jacobi Mirta",
    "specialty": "Psicología / Psicoterapia",
    "kupot": [
      "Privado"
    ],
    "city": "Kfar Saba",
    "phone": "050-6561482",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-94",
    "name": "Nahmod Adriana",
    "specialty": "Psicología / Psicoterapia",
    "kupot": [
      "Privado"
    ],
    "city": "Raanana",
    "phone": "054-7828501",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-95",
    "name": "Junowicz Marga",
    "specialty": "Psicología / Psicoterapia",
    "kupot": [
      "Privado"
    ],
    "city": "Netanya",
    "phone": "054-7654880",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-96",
    "name": "Duniek Eduardo",
    "specialty": "Psicología / Psicoterapia",
    "kupot": [
      "Privado"
    ],
    "city": "Modi'in",
    "phone": "052-5546004",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-97",
    "name": "Cohenca Diana",
    "specialty": "Psicología / Psicoterapia",
    "kupot": [
      "Privado"
    ],
    "city": "Ramat Hasharon",
    "phone": "052-4642395",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-98",
    "name": "Zkorenblut Rosana",
    "specialty": "Psicología / Psicoterapia",
    "kupot": [
      "Privado"
    ],
    "city": "Netanya",
    "phone": "054-4328563",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-99",
    "name": "Bar El Iair Juan",
    "specialty": "Psiquiatría",
    "kupot": [
      "Clalit",
      "Privado"
    ],
    "city": "Haifa",
    "phone": "04-8371221",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-100",
    "name": "Rojas Marina",
    "specialty": "Psiquiatría",
    "kupot": [
      "Clalit"
    ],
    "city": "Kiriat Haim",
    "phone": "04-8470074",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-102",
    "name": "Kripper Gabriel",
    "specialty": "Psiquiatría",
    "kupot": [
      "Clalit",
      "Meuhedet"
    ],
    "city": "Haifa / Kiriat Yam",
    "phone": "04-861-2320",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-103",
    "name": "Dra. Gabriela Beitler",
    "specialty": "Psiquiatría",
    "kupot": [
      "Clalit",
      "Privado"
    ],
    "city": "Modi'in",
    "phone": "052-8467422",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=72213&eservicecode=73&employeeid=7E64FBDAF1E18C223D2148137201C27B"
  },
  {
    "id": "doc-104",
    "name": "Tartacovsky Eduardo",
    "specialty": "Psiquiatría",
    "kupot": [
      "Clalit",
      "Maccabi",
      "Meuhedet"
    ],
    "city": "Hedera / Netanya",
    "phone": "*2700 / *3555 / *3833",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-105",
    "name": "Efron Martín",
    "specialty": "Psiquiatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Netanya / Kfar Saba",
    "phone": "09-8924271",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-106",
    "name": "Feldman Romina",
    "specialty": "Psiquiatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "03-5425285",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-107",
    "name": "Mordel Clara",
    "specialty": "Psiquiatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Raanana",
    "phone": "09-7470777",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-108",
    "name": "Lisak Claudio",
    "specialty": "Psiquiatría",
    "kupot": [
      "Maccabi",
      "Privado"
    ],
    "city": "Raanana",
    "phone": "03-5193553",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-109",
    "name": "Bolovic Luisa",
    "specialty": "Psiquiatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Netanya",
    "phone": "09-8924271",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-110",
    "name": "Mitelpunkt Roberto",
    "specialty": "Psiquiatría",
    "kupot": [
      "Privado"
    ],
    "city": "Hertzlia",
    "phone": "WhatsApp +972 54-4549710",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-111",
    "name": "Rozencwaig Silvio",
    "specialty": "Psiquiatría",
    "kupot": [
      "Privado"
    ],
    "city": "Kfar Saba",
    "phone": "052-2244134",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-112",
    "name": "Rajmil Daniela",
    "specialty": "Psiquiatría",
    "kupot": [
      "Privado"
    ],
    "city": "Kfar Yona",
    "phone": "+972 52-9663703",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-113",
    "name": "Borinsky Peter",
    "specialty": "Traumatología y Ortopedia",
    "kupot": [
      "Clalit"
    ],
    "city": "Acco",
    "phone": "04-9957070",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=59192&eservicecode=58&employeeid=203B9BCA0CE4B2C7F17247B0B2735431"
  },
  {
    "id": "doc-114",
    "name": "Alterman Eitan",
    "specialty": "Traumatología y Ortopedia",
    "kupot": [
      "Clalit"
    ],
    "city": "Hedera",
    "phone": "04-6328585",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-115",
    "name": "Marcelo Posnik",
    "specialty": "Traumatología y Ortopedia",
    "kupot": [
      "Clalit"
    ],
    "city": "Netanya",
    "phone": "09-8603555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-116",
    "name": "Dr. Alejandro Wolowelski",
    "specialty": "Traumatología y Ortopedia",
    "kupot": [
      "Clalit"
    ],
    "city": "Kiriat Bialik",
    "phone": "04-8787800",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=56512&eservicecode=405&employeeid=FBA76F96442838D3C7DAFCFAA98D56DC"
  },
  {
    "id": "doc-117",
    "name": "Fraiman Sergio",
    "specialty": "Traumatología y Ortopedia",
    "kupot": [
      "Clalit"
    ],
    "city": "Ariel / Petaj Tikva / Ramat Gan",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-118",
    "name": "Dr. Gabriel Gustavo Merino",
    "specialty": "Ortopedia y Traumatología",
    "kupot": [
      "Clalit"
    ],
    "city": "Petah Tikva",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=44112&eservicecode=58&employeeid=57E03A267F8C79FEE2F3E3D46190FE30"
  },
  {
    "id": "doc-119",
    "name": "Levy Mark",
    "specialty": "Traumatología y Ortopedia",
    "kupot": [
      "Maccabi",
      "Privado"
    ],
    "city": "Raanana",
    "phone": "09-7742780 / 09-9745929",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-120",
    "name": "Transalteur Paul",
    "specialty": "Traumatología y Ortopedia",
    "kupot": [
      "Maccabi"
    ],
    "city": "Ramat Hasharon",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-121",
    "name": "Berenstein Wayel Tamar",
    "specialty": "Traumatología y Ortopedia",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Beit Shemesh / Jerusalem (Hospital Shaarey Zedek)",
    "phone": "*3833 / 02-6555999",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-122",
    "name": "Dr. Brant Armando",
    "specialty": "Medicina Familiar, Interna y General (especialista en Geriatría)",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "address": "Sderot Shaul HaMelech 8 (Edificio Amot HaMishpat / Migdal Psagot, piso -1)",
    "phone": "03-5562454 (turnos: *3555)",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il) el 27/09/2026. Habla hebreo, espanol e ingles. Sin costo de copago para socios de Maccabi.",
    "receptionHours": "Dom 9:00-13:15, Lun 15:30-20:00, Mar 15:30-20:00 (segun cartilla oficial de Maccabi, verificar vigencia)",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=C22C12CDFAB5322E5A7E3837AA2BB889433B5DC29EE4B9CCF3672DAF7D594CE6&RequestId=1bc9100b-64a6-3a29-a32d-583a7234e2f2&Source=SearchPageResults"
  },
  {
    "id": "doc-123",
    "name": "Dr. Michael Ashkenazi",
    "specialty": "Ginecología y Obstetricia",
    "kupot": [
      "Clalit"
    ],
    "city": "Rishon LeZion",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=78550&eservicecode=63&employeeid=83121FB10667E4DEFE0A0147226EBAF6"
  },
  {
    "id": "doc-124",
    "name": "Dr. Roni Arad",
    "specialty": "Ginecología y Obstetricia",
    "kupot": [
      "Clalit"
    ],
    "city": "Rishon LeZion",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=73380&eservicecode=63&employeeid=173FFBE1A4F78DA4E1D7ED8A8B0C10B0"
  },
  {
    "id": "doc-125",
    "name": "Dr. Walid Armoush",
    "specialty": "Otorrinolaringología (ORL)",
    "kupot": [
      "Clalit"
    ],
    "city": "Tamra",
    "phone": "04-9948938 / *2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=59164&eservicecode=62&employeeid=EF0AAE6A4932C1E407AA4B1910A23FB8"
  },
  {
    "id": "doc-126",
    "name": "Dr. Najla Bayda",
    "specialty": "Dermatología",
    "kupot": [
      "Clalit"
    ],
    "city": "Jerusalén",
    "phone": "02-5854347 / 02-5853995",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=14450&eservicecode=31&employeeid=E53833F00B9E65DB8038FF03A8E917A3"
  },
  {
    "id": "doc-127",
    "name": "Dr. Mana Mashhour",
    "specialty": "Oftalmología",
    "kupot": [
      "Clalit"
    ],
    "city": "Jerusalén",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=13114&eservicecode=61&employeeid=C275C45B3F95C2388D9FD3ACC5401682"
  },
  {
    "id": "doc-128",
    "name": "Dr. Wasim Jaber",
    "specialty": "Oftalmología",
    "kupot": [
      "Clalit"
    ],
    "city": "Abu Ghosh",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=14230&eservicecode=61&employeeid=B2F330173383BB362C89EE93A54C46EA"
  },
  {
    "id": "doc-129",
    "name": "Dr. Ariel Gustavo Eisenberg",
    "specialty": "Ginecología y Obstetricia",
    "kupot": [
      "Clalit"
    ],
    "city": "Elad",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=45135&eservicecode=63&employeeid=61197EA3E1B124E0743FDEE324DC0DDB"
  },
  {
    "id": "doc-130",
    "name": "Dra. Katerina Weintz",
    "specialty": "Otorrinolaringología (ORL)",
    "kupot": [
      "Clalit"
    ],
    "city": "Arad",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=91260&eservicecode=62&employeeid=8338E33082349A91AFA096607DCEBEE1"
  },
  {
    "id": "doc-131",
    "name": "Dr. Alex Yitzhak Zimmerman",
    "specialty": "Ginecología y Obstetricia",
    "kupot": [
      "Clalit"
    ],
    "city": "Nahariya",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=51115&eservicecode=63&employeeid=7E629889304CF5A3078556FAF12EEA97"
  },
  {
    "id": "doc-132",
    "name": "Dr. David Díaz Polak",
    "specialty": "Dermatología",
    "kupot": [
      "Clalit"
    ],
    "city": "Binyamina - Giv'at Ada",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=123320&eservicecode=31&employeeid=B4CBB9D35EA575BC6F6EC21DF190E376"
  },
  {
    "id": "doc-134",
    "name": "Dra. Elizabeth Carmel",
    "specialty": "Otorrinolaringología (ORL)",
    "kupot": [
      "Clalit"
    ],
    "city": "Ashdod",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=72660&eservicecode=62&employeeid=C1F7F497956C49B4C91C65E079446FE4"
  },
  {
    "id": "doc-136",
    "name": "Dr. Mario Zaltz",
    "specialty": "Oftalmología",
    "kupot": [
      "Clalit"
    ],
    "city": "Pardes Hanna - Karkur",
    "phone": "057-8411285",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=129806&eservicecode=61&employeeid=EF468EC8F6B244E6A706AE7495377F02"
  },
  {
    "id": "doc-137",
    "name": "Dr. Víctor Gastón Levín",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Hod HaSharon",
    "phone": "09-7624600",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=45310&eservicecode=2&employeeid=56498EE60C7B8FD9BEEEE1907E5A2DF8"
  },
  {
    "id": "doc-138",
    "name": "Dra. Gabriela Wernikowski",
    "specialty": "Ginecología y Obstetricia",
    "kupot": [
      "Clalit"
    ],
    "city": "Holon",
    "phone": "03-7503300",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=21350&eservicecode=63&employeeid=3ECE33EB481CEDC62AEB5305CA30EB6D"
  },
  {
    "id": "doc-139",
    "name": "Lic. Judith Helwani",
    "specialty": "Fonoaudiología Pediátrica",
    "kupot": [
      "Clalit"
    ],
    "city": "Ashdod",
    "phone": "08-8623222",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=72672&eservicecode=362&employeeid=8BF2832E2719EB9D63D66A9C4D3EBCC9"
  },
  {
    "id": "doc-140",
    "name": "Dra. Sinaya Cohen Pungol",
    "specialty": "Dermatología",
    "kupot": [
      "Clalit"
    ],
    "city": "Jerusalén",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=11190&eservicecode=31&employeeid=EF22CCF5A19C31F27F59CAAC53C91AA9"
  },
  {
    "id": "doc-141",
    "name": "Dra. Noa Gonen",
    "specialty": "Ginecología y Obstetricia",
    "kupot": [
      "Clalit"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "03-7503140 / *2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=24249&eservicecode=63&employeeid=A13EC9EBBC7A9C66AE4B7FC0A00F79EE"
  },
  {
    "id": "doc-142",
    "name": "Dr. Pinhas Dueñas",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Yehud-Monosson",
    "phone": "02-5378608",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=12170&eservicecode=2&employeeid=9C4C69BB78BBF2180C8178351475FD4A"
  },
  {
    "id": "doc-143",
    "name": "Dr. Arie Freifeld",
    "specialty": "Insuficiencia Cardíaca",
    "kupot": [
      "Clalit"
    ],
    "city": "Be'er Ya'akov",
    "phone": "08-6107100",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=74070&eservicecode=143&employeeid=FB1E681F2999C9DDE392FC5C844925B2"
  },
  {
    "id": "doc-144",
    "name": "Dra. Christine Matanes",
    "specialty": "Retina Ocular",
    "kupot": [
      "Clalit"
    ],
    "city": "Haifa",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=56129&eservicecode=533&employeeid=C148BB76759311714A4BA45A2EE1753B"
  },
  {
    "id": "doc-145",
    "name": "Dra. Silvina Schwartz",
    "specialty": "Dermatología",
    "kupot": [
      "Clalit"
    ],
    "city": "Rosh HaAyin",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=45620&eservicecode=31&employeeid=072C91599AA7561930ED69C95DD99BFA"
  },
  {
    "id": "doc-146",
    "name": "Dra. María Stein-Schneider",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Eilon",
    "phone": "04-9858222",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=51420&eservicecode=2&employeeid=3EB294636184C67060C5D6CA12AE784B"
  },
  {
    "id": "doc-147",
    "name": "Dra. Orna Levin-Dickstein",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Kfar Netter",
    "phone": "09-8997948",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=122640&eservicecode=2&employeeid=A40FDFCCEE8504A221F3ED4E0B32ADCD"
  },
  {
    "id": "doc-148",
    "name": "Lic. Merav Bilert",
    "specialty": "Trabajo Social",
    "kupot": [
      "Clalit"
    ],
    "city": "Nahariya",
    "phone": "04-8809222",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=52950&eservicecode=751&employeeid=D8E8D2B2C03FC17C51F8D9B312D83D70"
  },
  {
    "id": "doc-149",
    "name": "Dr. Daniel El Kushnir",
    "specialty": "Nefrología",
    "kupot": [
      "Clalit"
    ],
    "city": "Sderot",
    "phone": "04-8568205",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=56333&eservicecode=412&employeeid=7200803DB591EB1A8F7F7CE572A37639"
  },
  {
    "id": "doc-150",
    "name": "Dr. Moshe Kulikowski",
    "specialty": "Clínica de Heridas Complejas y Pie Diabético",
    "kupot": [
      "Clalit"
    ],
    "city": "Sderot",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=58881&eservicecode=617&employeeid=E13210D014593C531820D96D095B14B4"
  },
  {
    "id": "doc-151",
    "name": "Dr. Yosef Penso",
    "specialty": "Alergología e Inmunología Clínica",
    "kupot": [
      "Clalit"
    ],
    "city": "Sderot",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=56121&eservicecode=13&employeeid=BBDB1029F05D33BBE57F32C0E4B34EDB"
  },
  {
    "id": "doc-152",
    "name": "Dr. Nidal Moasi",
    "specialty": "Gastroenterología",
    "kupot": [
      "Clalit"
    ],
    "city": "Sderot",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=56332&eservicecode=27&employeeid=54B73544394F5306A430D464CEF4F594"
  },
  {
    "id": "doc-153",
    "name": "Dra. Hagit Daskal-Wiechendler",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Kiryat Tiv'on",
    "phone": "04-9539300",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=55210&eservicecode=2&employeeid=FEB39E7985C6F1E57F8C8A08A64BEEDA"
  },
  {
    "id": "doc-154",
    "name": "Dr. Alberto Olchovsky",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Binyamina - Giv'at Ada",
    "phone": "04-6388335",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=123500&eservicecode=2&employeeid=39F70E01FC17DA1D2449B1626CCBD2BE"
  },
  {
    "id": "doc-155",
    "name": "Dr. Elio Siffle",
    "specialty": "Urología",
    "kupot": [
      "Clalit"
    ],
    "city": "Rishon LeZion",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=73210&eservicecode=56&employeeid=04CF3D2A40A02DE9DC39DEED40149D1D"
  },
  {
    "id": "doc-156",
    "name": "Dr. Abraham Tepper",
    "specialty": "Ginecología y Obstetricia",
    "kupot": [
      "Clalit"
    ],
    "city": "Nof HaGalil",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=154217&eservicecode=63&employeeid=64D5FB14F6DE616D960040CB9611DB20"
  },
  {
    "id": "doc-157",
    "name": "Dra. Sandra Glusman",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Pardes Hanna - Karkur",
    "phone": "04-6174222",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=123310&eservicecode=2&employeeid=262C047A4F06F19A80F4FD29AEF43F6F"
  },
  {
    "id": "doc-158",
    "name": "Dr. Leandro Keselman",
    "specialty": "Ecografía Obstétrica / Morfológica Fetal",
    "kupot": [
      "Clalit"
    ],
    "city": "Nof HaGalil",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=154217&eservicecode=658&employeeid=0AE4A8E34B139B2427A42D3D3CAF5820"
  },
  {
    "id": "doc-159",
    "name": "Lic. Lisa Yael Newman",
    "specialty": "Trabajo Social",
    "kupot": [
      "Clalit"
    ],
    "city": "Haifa",
    "phone": "04-8590202 / *2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=53180&eservicecode=751&employeeid=9D9C9B5B1AF8835E5D3BCBF273E94AC6"
  },
  {
    "id": "doc-160",
    "name": "Dr. Muhammad Hussein",
    "specialty": "Neurología y Desarrollo Pediátrico",
    "kupot": [
      "Clalit"
    ],
    "city": "Jerusalén",
    "phone": "02-5658222",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=14390&eservicecode=122&employeeid=733A54D05E5B07EC7C91EB7B0D49DA51"
  },
  {
    "id": "doc-161",
    "name": "Dr. Yonatan Lifshitz",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Beit Shemesh",
    "phone": "02-9901777 / *2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=13200&eservicecode=2&employeeid=ABE72C533F7E14D303F13BB998B3F249"
  },
  {
    "id": "doc-162",
    "name": "Dr. Daniel Roitman",
    "specialty": "Alergología e Inmunología Clínica",
    "kupot": [
      "Clalit"
    ],
    "city": "Bat Yam",
    "phone": "03-5004600",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=22280&eservicecode=13&employeeid=3842E854A9A92D62E43971E768997646"
  },
  {
    "id": "doc-163",
    "name": "Dra. Brigitte Medina",
    "specialty": "Alergología e Inmunología Clínica",
    "kupot": [
      "Clalit"
    ],
    "city": "Jerusalén",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=13107&eservicecode=13&employeeid=B5F385B5989BB965DFCCA0041E7048F7"
  },
  {
    "id": "doc-164",
    "name": "Dra. Tzofia Dueñas",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Efrat",
    "phone": "02-9937540",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=11180&eservicecode=2&employeeid=590ED9188884145E090C8168CA0F359E"
  },
  {
    "id": "doc-165",
    "name": "Lic. Constanza Silverman",
    "specialty": "Trabajo Social",
    "kupot": [
      "Clalit"
    ],
    "city": "Jerusalén",
    "phone": "02-6706750",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=12369&eservicecode=751&employeeid=1ED503F0C3FE57AAC70835566C164CAC"
  },
  {
    "id": "doc-166",
    "name": "Dra. Daniela Marquizano",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Netanya",
    "phone": "09-8603800",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=122240&eservicecode=2&employeeid=EBB13FC9C041E837C463331E5320706E"
  },
  {
    "id": "doc-167",
    "name": "Dra. Bibiana Hazan",
    "specialty": "Infectología",
    "kupot": [
      "Clalit"
    ],
    "city": "Nof HaGalil",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=154200&eservicecode=299&employeeid=0AF8BC23E6C852270AC664FE78E75EF5"
  },
  {
    "id": "doc-168",
    "name": "Dra. Li Paula Cohen Avraham",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Modi'in",
    "phone": "08-8614420 / *2700 / 09-8603800",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=74390&eservicecode=2&employeeid=CD3EE193F82230B31020DF2DCAF3503A"
  },
  {
    "id": "doc-169",
    "name": "Dr. Roni Torten",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Ma'ale Adumim",
    "phone": "02-5353500",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=11010&eservicecode=2&employeeid=CBDE4B8007918C6CEFF19F098C1DAAE6"
  },
  {
    "id": "doc-170",
    "name": "Dr. Yonatan Levin",
    "specialty": "Oftalmología",
    "kupot": [
      "Clalit"
    ],
    "city": "Efrat",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=11180&eservicecode=61&employeeid=BA33255BC97C1C796CBB4134DA13E186"
  },
  {
    "id": "doc-171",
    "name": "Dr. Shlomo Gur",
    "specialty": "Oftalmología",
    "kupot": [
      "Clalit"
    ],
    "city": "Jerusalén",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=11190&eservicecode=61&employeeid=DCA3793E9A21BCE896CA3BA29B690753"
  },
  {
    "id": "doc-172",
    "name": "Lic. Tal Shemesh",
    "specialty": "Fisioterapia",
    "kupot": [
      "Clalit"
    ],
    "city": "Jerusalén",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=11223&eservicecode=101&employeeid=B27F99A52184D23CB718424EAF7B1C4C"
  },
  {
    "id": "doc-173",
    "name": "Dra. Yael Meisler",
    "specialty": "Oftalmología",
    "kupot": [
      "Clalit"
    ],
    "city": "Beit Shemesh",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=13170&eservicecode=61&employeeid=C72F095993B31725A454A392E538F131"
  },
  {
    "id": "doc-174",
    "name": "Lic. Dafna Boretz",
    "specialty": "Nutrición Clínica",
    "kupot": [
      "Clalit"
    ],
    "city": "Nesher",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=55760&eservicecode=411&employeeid=9879F354C57CB7870F2E3713F411A897"
  },
  {
    "id": "doc-175",
    "name": "Dr. Sergio Lusthaus",
    "specialty": "Cirugía Plástica",
    "kupot": [
      "Clalit"
    ],
    "city": "Jerusalén",
    "phone": "02-5311233",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=11347&eservicecode=360&employeeid=FF2B4E413A8B773C8D995650E32537BA"
  },
  {
    "id": "doc-176",
    "name": "Lic. Idan Banon",
    "specialty": "Fisioterapia",
    "kupot": [
      "Clalit"
    ],
    "city": "Jerusalén",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=11433&eservicecode=101&employeeid=E4802499B87479947CB5191AEDD868BC"
  },
  {
    "id": "doc-177",
    "name": "Dr. Aharon Medina",
    "specialty": "Cardiología",
    "kupot": [
      "Clalit"
    ],
    "city": "Jerusalén",
    "phone": "02-5889533 / *2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=11445&eservicecode=21&employeeid=77B2FC3AF6305B228D05CABF9EF16FF5"
  },
  {
    "id": "doc-178",
    "name": "Dr. Daniel Barash",
    "specialty": "Pediatría",
    "kupot": [
      "Clalit"
    ],
    "city": "Jerusalén",
    "phone": "02-6460600",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=12090&eservicecode=40&employeeid=9366FD20E593042891FA4D36AED6D048"
  },
  {
    "id": "doc-179",
    "name": "Dr. Rotem Mark Silbertrest",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Tzora",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=12160&eservicecode=2&employeeid=D18D62FA691BF78FA127B56C1D5CA9B6"
  },
  {
    "id": "doc-180",
    "name": "Dra. Michelle Yael Danto",
    "specialty": "Pediatría",
    "kupot": [
      "Clalit"
    ],
    "city": "Jerusalén",
    "phone": "02-6441666",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=11280&eservicecode=40&employeeid=8EF53FA43A80A8E1D94450886EC51400"
  },
  {
    "id": "doc-181",
    "name": "Lic. Nehama Ora Had",
    "specialty": "Servicios de Enfermería y Cuidados Ginecológicos",
    "kupot": [
      "Clalit"
    ],
    "city": "Jerusalén",
    "phone": "02-5843222 / *2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=11450&eservicecode=659&employeeid=9A2B7D02447431262511EC269B65C0FD"
  },
  {
    "id": "doc-182",
    "name": "Dr. Pablo Ari Roitman",
    "specialty": "Psiquiatría y Salud Mental",
    "kupot": [
      "Clalit"
    ],
    "city": "Beitar Illit",
    "phone": "02-5887000",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=12300&eservicecode=71&employeeid=7FA3DC96DF482DAA0EDB09041CD09AD0"
  },
  {
    "id": "doc-183",
    "name": "Dra. Regina Feldman",
    "specialty": "Dermatología",
    "kupot": [
      "Clalit"
    ],
    "city": "Ma'ale Adumim",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=12210&eservicecode=31&employeeid=19C9BEB3F4F1C9BC5CBA3484C50EF497"
  },
  {
    "id": "doc-184",
    "name": "Lic. Rachel Duks",
    "specialty": "Psicología",
    "kupot": [
      "Clalit"
    ],
    "city": "Beit Shemesh",
    "phone": "02-5098170",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=12375&eservicecode=576&employeeid=425B9466AE046CE64CE9688A5769301E"
  },
  {
    "id": "doc-185",
    "name": "Lic. Dafna Esther Lifshitz",
    "specialty": "Psicología",
    "kupot": [
      "Clalit"
    ],
    "city": "Beit Shemesh",
    "phone": "02-5098170",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=12374&eservicecode=576&employeeid=F4ABB458836F3E4497FA04C2350D602F"
  },
  {
    "id": "doc-186",
    "name": "Dra. Inbar Kobel",
    "specialty": "Dermatología",
    "kupot": [
      "Clalit"
    ],
    "city": "Mevaseret Zion",
    "phone": "*2700 / 02-5098170",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=12240&eservicecode=31&employeeid=C4D0930D8FB49FAF39846DFAE06F4B76"
  },
  {
    "id": "doc-187",
    "name": "Dr. José Antonio Rivera Vázquez",
    "specialty": "Oftalmología",
    "kupot": [
      "Clalit"
    ],
    "city": "Jerusalén",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=13114&eservicecode=61&employeeid=F1D0F5459648F6C396FB638840A03E6B"
  },
  {
    "id": "doc-188",
    "name": "Dra. Viviana Levy Hamasi",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Beit Shemesh",
    "phone": "02-9902666",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=13290&eservicecode=2&employeeid=BA3E782D7099DB290619A77DC86A6D8C"
  },
  {
    "id": "doc-189",
    "name": "Dr. Munir Alian",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Jerusalén",
    "phone": "02-5327304 / 02-5327305",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=14250&eservicecode=2&employeeid=70354FAD3325A129CB44F59F93F04F0B"
  },
  {
    "id": "doc-190",
    "name": "Dr. Zuhair Nasser El-Din",
    "specialty": "Pediatría",
    "kupot": [
      "Clalit"
    ],
    "city": "Jerusalén",
    "phone": "02-5658222",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=14330&eservicecode=40&employeeid=E3834E80CC48CE4B749885AC14614601"
  },
  {
    "id": "doc-191",
    "name": "Dr. Miaad Siam",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Jerusalén",
    "phone": "02-6733715",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=14510&eservicecode=2&employeeid=50625E39CF1901D8CBC71D8C9D397975"
  },
  {
    "id": "doc-192",
    "name": "Dr. Ahmad El-Sabah",
    "specialty": "Ginecología y Obstetricia",
    "kupot": [
      "Clalit"
    ],
    "city": "Jerusalén",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=14390&eservicecode=63&employeeid=7ED66CC0448C89B3437427FE718045CD"
  },
  {
    "id": "doc-193",
    "name": "Lic. Yehuda Amitai",
    "specialty": "Fisioterapia",
    "kupot": [
      "Clalit"
    ],
    "city": "Beit El",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=18638&eservicecode=101&employeeid=342308310E0E329D277527B48847059D"
  },
  {
    "id": "doc-194",
    "name": "Lic. Patricia María Kukierman",
    "specialty": "Psicología y Psicoterapia",
    "kupot": [
      "Clalit"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "*2700 / 054-9223289",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=20215&eservicecode=576&employeeid=7433CE4C857303CEA98C621FB23E0EF6"
  },
  {
    "id": "doc-195",
    "name": "Prof. Nehama Linder",
    "specialty": "Pediatría",
    "kupot": [
      "Clalit"
    ],
    "city": "Jerusalén",
    "phone": "03-5239430 / 054-9223289",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=18546&eservicecode=40&employeeid=33F039F4697351A3AF56AD7E20CBD91B"
  },
  {
    "id": "doc-196",
    "name": "Lic. Tamara Sheila Yael Laufer Kozinsky",
    "specialty": "Servicios de Enfermería",
    "kupot": [
      "Clalit"
    ],
    "city": "Jerusalén",
    "phone": "02-5608333 / *2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=15530&eservicecode=659&employeeid=2F5A7E41EA8458584C424302AA63D1F8"
  },
  {
    "id": "doc-197",
    "name": "Dr. Alex Barenboim",
    "specialty": "Cirugía General",
    "kupot": [
      "Clalit"
    ],
    "city": "Proctología y Mastología",
    "phone": "Tel Aviv - Yafo",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "✓ Verificado en cartilla oficial,https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=20972&eservicecode=514&employeeid=5A186FC800BF4176C1D284DBB79166E8"
  },
  {
    "id": "doc-198",
    "name": "Dr. Yaron Unger",
    "specialty": "Otorrinolaringología (ORL)",
    "kupot": [
      "Clalit"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "03-7622300 / *2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=22124&eservicecode=62&employeeid=4C4A6B20C9018FA9678791B8724C03CD"
  },
  {
    "id": "doc-199",
    "name": "Dra. Rosane Abramoff Ness",
    "specialty": "Endocrinología y Diabetes",
    "kupot": [
      "Clalit"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "03-7622300",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=22144&eservicecode=12&employeeid=B42AEB91B256EE7A2A1DD6F2A31DA755"
  },
  {
    "id": "doc-200",
    "name": "Lic. Nesi Golani",
    "specialty": "Trabajo Social y Psicoterapia",
    "kupot": [
      "Clalit"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "050-3720144",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=20295&eservicecode=751&employeeid=34F22C63C96AE9FE9A151AB191742D6A"
  },
  {
    "id": "doc-201",
    "name": "Dr. Daniel Moreninks",
    "specialty": "Cardiología e Insuficiencia Cardíaca",
    "kupot": [
      "Clalit"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "03-7471200",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=22146&eservicecode=143&employeeid=8B4798544B4EC4F1B2AA5E25871AA1E9"
  },
  {
    "id": "doc-202",
    "name": "Dr. Christian Frutos",
    "specialty": "Cirugía General y Traumatología",
    "kupot": [
      "Clalit"
    ],
    "city": "Holon",
    "phone": "03-7471200",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=21853&eservicecode=50&employeeid=5E37897AB4529D034C44AF8D85796E0B"
  },
  {
    "id": "doc-203",
    "name": "Dr. Ilan Amos Markushemer",
    "specialty": "Cardiología",
    "kupot": [
      "Clalit"
    ],
    "city": "Holon",
    "phone": "03-6301825",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=21864&eservicecode=21&employeeid=7964AE9828EF2949273770B9BF8C75CC"
  },
  {
    "id": "doc-204",
    "name": "Lic. Alan Martín Neve Tzook",
    "specialty": "Fisioterapia",
    "kupot": [
      "Clalit"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=24262&eservicecode=101&employeeid=3A3AF73CFE16603A448A3FB8F5A5743E"
  },
  {
    "id": "doc-205",
    "name": "Dr. Eduardo Israel",
    "specialty": "Ginecología y Obstetricia",
    "kupot": [
      "Clalit"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "03-5423888",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=23298&eservicecode=63&employeeid=0B258CB193E6C64091D316FDEE1A12C8"
  },
  {
    "id": "doc-206",
    "name": "Dra. Susana Feldman",
    "specialty": "Radiología Diagnóstica",
    "kupot": [
      "Clalit"
    ],
    "city": "Bat Yam",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=25102&eservicecode=498&employeeid=18E90ADE3A0779D49C5C2ECC7ED19740"
  },
  {
    "id": "doc-207",
    "name": "Lic. Tal Litvak",
    "specialty": "Fisioterapia",
    "kupot": [
      "Clalit"
    ],
    "city": "Bat Yam",
    "phone": "03-5556505 / *2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=25103&eservicecode=101&employeeid=CD298D74B790869ADBFE2B673D14F0A1"
  },
  {
    "id": "doc-208",
    "name": "Lic. Micaela Y. Kravchik",
    "specialty": "Trabajo Social",
    "kupot": [
      "Clalit"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "03-5068110",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=24380&eservicecode=751&employeeid=837F44758B2DA1A12C8C6BACACE59C97"
  },
  {
    "id": "doc-209",
    "name": "Dr. Tzlil Tanai",
    "specialty": "Pediatría",
    "kupot": [
      "Clalit"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "03-7451500",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=23390&eservicecode=40&employeeid=AFF4B10E693C356E6D987B81AE209C06"
  },
  {
    "id": "doc-210",
    "name": "Dra. Mirta Worchow",
    "specialty": "Ginecología y Cuello Uterino",
    "kupot": [
      "Clalit"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "*2700 / 03-7451500",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=24430&eservicecode=63&employeeid=5E8FEA9D8FC10A2001F9DC1A4BBD374B"
  },
  {
    "id": "doc-211",
    "name": "Dr. Yishai Shofeti",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "053-9956259",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=28633&eservicecode=2&employeeid=21F00CE82B86A0BB8F6DBB5344290EC4"
  },
  {
    "id": "doc-212",
    "name": "Dr. Dylan Gil Mergui",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "03-7622310 / 051-5912251",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=28913&eservicecode=2&employeeid=A49F643494F46E7BDD2A10184DD98DF6"
  },
  {
    "id": "doc-213",
    "name": "Lic. Sharon Suxter Blank",
    "specialty": "Psicología y Psicoterapia",
    "kupot": [
      "Clalit"
    ],
    "city": "Kiryat Ono",
    "phone": "052-4383363",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=40284&eservicecode=1765&employeeid=C2102D7723F4C683A8AB0F870FCAA348"
  },
  {
    "id": "doc-215",
    "name": "Dr. Yitzhak Ben Aharon",
    "specialty": "Pediatría",
    "kupot": [
      "Clalit"
    ],
    "city": "Bnei Brak",
    "phone": "03-5777205",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=42215&eservicecode=40&employeeid=43E6E460BADB9DA052C7BE0FC314764D"
  },
  {
    "id": "doc-216",
    "name": "Dr. Bernardo Seidenstein",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Bnei Brak",
    "phone": "03-6717800",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=42290&eservicecode=2&employeeid=7DF301873919AB764C07F6C34B0313CD"
  },
  {
    "id": "doc-217",
    "name": "Lic. Yoav Blecher",
    "specialty": "Fisioterapia",
    "kupot": [
      "Clalit"
    ],
    "city": "Kiryat Ono",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=43203&eservicecode=101&employeeid=7FA25D79D95F76403A76187F7EC45F38"
  },
  {
    "id": "doc-218",
    "name": "Lic. Cynthia Breyer Navon",
    "specialty": "Psicología Infantil y Psicoterapia",
    "kupot": [
      "Clalit"
    ],
    "city": "Petah Tikva",
    "phone": "054-5537465",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=40294&eservicecode=576&employeeid=C87ED23ED112C36BB865FF9C43133D0D"
  },
  {
    "id": "doc-219",
    "name": "Dra. Inés Tzur",
    "specialty": "Psicología y Psicoterapia",
    "kupot": [
      "Clalit"
    ],
    "city": "Hod HaSharon",
    "phone": "052-3409773",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=40297&eservicecode=1765&employeeid=FF5208E64231253B2EFAE1830C44E67E"
  },
  {
    "id": "doc-220",
    "name": "Dr. Abba Ratner",
    "specialty": "Medicina del Dolor",
    "kupot": [
      "Clalit"
    ],
    "city": "Petah Tikva",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=44120&eservicecode=35&employeeid=1AF165866B1798A1510E4EBFB0EF2CD5"
  },
  {
    "id": "doc-221",
    "name": "Dr. Amin Badir",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Petah Tikva",
    "phone": "03-9120400",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=44200&eservicecode=2&employeeid=E02E86E929ACF3146E1019A23F46F086"
  },
  {
    "id": "doc-222",
    "name": "Dr. Gustavo Janowski",
    "specialty": "Pediatría",
    "kupot": [
      "Clalit"
    ],
    "city": "Kiryat Bialik",
    "phone": "04-8776277",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=54330&eservicecode=40&employeeid=ED735990F86187374C0D1FCCDEAF51F8"
  },
  {
    "id": "doc-223",
    "name": "Dr. Yona Pablo Worchow",
    "specialty": "Pediatría",
    "kupot": [
      "Clalit"
    ],
    "city": "Safed (Tzfat)",
    "phone": "04-6918300",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=151340&eservicecode=40&employeeid=DBFFD5343A85C8EA40B455A6BED99F25"
  },
  {
    "id": "doc-224",
    "name": "Dr. Alberto Levy",
    "specialty": "Pediatría",
    "kupot": [
      "Clalit"
    ],
    "city": "Petah Tikva",
    "phone": "03-9089743",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=44370&eservicecode=40&employeeid=E5D29235CC1D6ECC0B1EA7CC366CE687"
  },
  {
    "id": "doc-225",
    "name": "Dr. Michael Sarel",
    "specialty": "Pediatría y TDAH",
    "kupot": [
      "Clalit"
    ],
    "city": "Petah Tikva",
    "phone": "03-9089743",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=44370&eservicecode=40&employeeid=22584FC7734948C84360A2527B563900"
  },
  {
    "id": "doc-226",
    "name": "Dr. Muhammad Taha",
    "specialty": "Otorrinolaringología (ORL)",
    "kupot": [
      "Clalit"
    ],
    "city": "Rosh HaAyin",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=45100&eservicecode=62&employeeid=B39A72529C2D3EEAB70CA91D2C4C2B8B"
  },
  {
    "id": "doc-227",
    "name": "Dr. Shabtai Tagger",
    "specialty": "Pediatría y TDAH",
    "kupot": [
      "Clalit"
    ],
    "city": "Elad",
    "phone": "02-9937266",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=45140&eservicecode=769&employeeid=500B5DC2787E0094A92124F8618A85AD"
  },
  {
    "id": "doc-228",
    "name": "Lic. Sagi Weinberg",
    "specialty": "Nutrición Clínica",
    "kupot": [
      "Clalit"
    ],
    "city": "Givatayim",
    "phone": "02-6441777",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=41250&eservicecode=411&employeeid=F4D0FB64C0077535CC97DC15867E70CA"
  },
  {
    "id": "doc-229",
    "name": "Dr. Roi Rao Salem",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Jerusalén",
    "phone": "02-5867111",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=11330&eservicecode=2&employeeid=3FD75A596A11B5037BC3D2EA3E743D74"
  },
  {
    "id": "doc-231",
    "name": "Dr. Yamin Bentolila",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Jerusalén",
    "phone": "09-7627200",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=11400&eservicecode=2&employeeid=12334D0A05CA21A26129F3DF27861BD1"
  },
  {
    "id": "doc-232",
    "name": "Dr. Olivier Ephraim Zerbib",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Hod HaSharon",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=45350&eservicecode=2&employeeid=55C6904C34803F3AB3CAC06963EE756B"
  },
  {
    "id": "doc-233",
    "name": "Dr. André Matalon",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Einat",
    "phone": "03-9385175",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=45510&eservicecode=2&employeeid=5FBD1734F067B38D970E647BFA288083"
  },
  {
    "id": "doc-234",
    "name": "Dr. Joseph Van der Walde",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Rehovot",
    "phone": "08-9464104",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=78655&eservicecode=2&employeeid=24EE14E2B81E5110B67A59BC5BDAE0D7"
  },
  {
    "id": "doc-235",
    "name": "Lic. Pablo Fernando Nedrichny",
    "specialty": "Psicoterapia",
    "kupot": [
      "Clalit"
    ],
    "city": "Sderot",
    "phone": "052-5013473",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=90749&eservicecode=1765&employeeid=EEAE194A69857ED67B67C43A860F5E73"
  },
  {
    "id": "doc-236",
    "name": "Lic. Yanai Gottlieb",
    "specialty": "Psicoterapia y Trabajo Social",
    "kupot": [
      "Clalit"
    ],
    "city": "Be'er Sheva",
    "phone": "052-5013473",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=91111&eservicecode=1765&employeeid=41424B146E81732EE2C60B02AF18B242"
  },
  {
    "id": "doc-237",
    "name": "Dra. María Katz",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Modi'in",
    "phone": "08-6308910",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=74880&eservicecode=2&employeeid=392D1659C5A3D0731A41888E446F80C4"
  },
  {
    "id": "doc-238",
    "name": "Dr. Sami Levy",
    "specialty": "Cirugía General y Mastología",
    "kupot": [
      "Clalit"
    ],
    "city": "Petah Tikva",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=45660&eservicecode=52&employeeid=6723D9DC5A14D02F70340D1E30DEA0F5"
  },
  {
    "id": "doc-239",
    "name": "Lic. Ruth Spandau",
    "specialty": "Psicología y Psicoterapia",
    "kupot": [
      "Clalit"
    ],
    "city": "Nahariya",
    "phone": "054-5404668",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=50202&eservicecode=1765&employeeid=6E64615BC8C1251820FFE94EBAFE7A42"
  },
  {
    "id": "doc-240",
    "name": "Dr. Meshulam Hart",
    "specialty": "Pediatría",
    "kupot": [
      "Clalit"
    ],
    "city": "Bnei Brak",
    "phone": "03-5799247",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=48502&eservicecode=40&employeeid=A63CA5B1FE2B2A35A20B8364CE06337C"
  },
  {
    "id": "doc-241",
    "name": "Dr. Yosef Goldberg",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Petah Tikva",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=48703&eservicecode=2&employeeid=46DC735D2FC663A1B8C32FDCBD9A2EAF"
  },
  {
    "id": "doc-242",
    "name": "Dr. Zvi Rosenfeld",
    "specialty": "Pediatría",
    "kupot": [
      "Clalit"
    ],
    "city": "Kiryat Ono",
    "phone": "03-9247651",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=48711&eservicecode=40&employeeid=691197D2F929052F859AF6AB16DF1699"
  },
  {
    "id": "doc-243",
    "name": "Dr. Hussein Majdoub",
    "specialty": "Endocrinología Pediátrica",
    "kupot": [
      "Clalit"
    ],
    "city": "Karmiel",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=52270&eservicecode=212&employeeid=D63910F6D059D38EED7B74F90B5D1CD0"
  },
  {
    "id": "doc-244",
    "name": "Dr. George Grayeb",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Haifa",
    "phone": "09-8901200",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=58779&eservicecode=2&employeeid=2DC87C43213A3FC43BAD2C7652A6DFFD"
  },
  {
    "id": "doc-245",
    "name": "Dr. Alaa Abu Saleh",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Deir Hanna",
    "phone": "04-6786219",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=52310&eservicecode=2&employeeid=1473BAB223D7C83C5912FDF5FAFBC952"
  },
  {
    "id": "doc-246",
    "name": "Dr. Abdelrahim Bashir",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Sakhnin",
    "phone": "04-6191155",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=52360&eservicecode=2&employeeid=A94E008072D8BF84E849B23ED62EFF66"
  },
  {
    "id": "doc-247",
    "name": "Dr. Ron Ilan Ashkenazi",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Kiryat Ata",
    "phone": "04-8449387",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=54250&eservicecode=2&employeeid=12E1AB40F9C374158238693392C4730D"
  },
  {
    "id": "doc-248",
    "name": "Dr. Basel Khalaila",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Haifa",
    "phone": "04-8462300",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=54260&eservicecode=2&employeeid=9B43E9D8B7D5CD0BA07AE7277FE7A885"
  },
  {
    "id": "doc-249",
    "name": "Dr. Albert Lahmani",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Kiryat Motzkin",
    "phone": "04-8781222",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=54320&eservicecode=2&employeeid=429D391B491C9B8938413033023B053B"
  },
  {
    "id": "doc-250",
    "name": "Dr. Walid Tarabeih",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Kiryat Ata",
    "phone": "04-8432400",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=54230&eservicecode=2&employeeid=DC9E8000DE8390FB2054EE2A9ABC3453"
  },
  {
    "id": "doc-251",
    "name": "Dra. Renata Zlot Seiner",
    "specialty": "Pediatría",
    "kupot": [
      "Clalit"
    ],
    "city": "Haifa",
    "phone": "04-8141300 / 04-8430700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=53310&eservicecode=40&employeeid=1E3B5769189A21F1CC26FDE5BCC20EB5"
  },
  {
    "id": "doc-252",
    "name": "Dra. Noga Rogin-Maor",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Rechasim",
    "phone": "04-6641025",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=55770&eservicecode=2&employeeid=EAB81FFFFEE3A4C8665AE5E0420B51E7"
  },
  {
    "id": "doc-253",
    "name": "Dr. Aharon Schiff",
    "specialty": "Neurología Pediátrica y TDAH",
    "kupot": [
      "Clalit"
    ],
    "city": "Tirat Carmel",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=55310&eservicecode=122&employeeid=CE1864DC6C384BA1D53162B2FA4A0AFD"
  },
  {
    "id": "doc-254",
    "name": "Lic. Nir Bela",
    "specialty": "Fisioterapia",
    "kupot": [
      "Clalit"
    ],
    "city": "Haifa",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=56883&eservicecode=101&employeeid=019F227C1A9D8B91D092BA93A844A8D8"
  },
  {
    "id": "doc-255",
    "name": "Dr. Malek Abu Raya",
    "specialty": "Medicina Interna",
    "kupot": [
      "Clalit"
    ],
    "city": "Kiryat Bialik",
    "phone": "04-8774590",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=56525&eservicecode=1049&employeeid=009CFD8E5C62E379D9BD50A7A257490C"
  },
  {
    "id": "doc-256",
    "name": "Dr. Dov Tiosano",
    "specialty": "Pediatría",
    "kupot": [
      "Clalit"
    ],
    "city": "Kiryat Bialik",
    "phone": "052-2264740 / *2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=59147&eservicecode=40&employeeid=55B48F03EC12413323F91458B6BDC8FA"
  },
  {
    "id": "doc-257",
    "name": "Dra. Mónica Kraus",
    "specialty": "Pediatría",
    "kupot": [
      "Clalit"
    ],
    "city": "Haifa",
    "phone": "04-6036400",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=58100&eservicecode=40&employeeid=E75D93DCEA60522944C7EF1B1081B2EE"
  },
  {
    "id": "doc-258",
    "name": "Dr. Yirmiyahu Lubasch",
    "specialty": "Pediatría",
    "kupot": [
      "Clalit"
    ],
    "city": "Haifa",
    "phone": "04-8787934",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=58608&eservicecode=40&employeeid=8B97BAC1A7AFC6AE752447E7A9F152E6"
  },
  {
    "id": "doc-259",
    "name": "Dr. Ariel Ezra Shami",
    "specialty": "Cirugía General y Proctología",
    "kupot": [
      "Clalit"
    ],
    "city": "Kiryat Bialik",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=58723&eservicecode=65&employeeid=747395A89852232B25DF8F5BDF508F90"
  },
  {
    "id": "doc-260",
    "name": "Dr. Dan Navon",
    "specialty": "Oftalmología",
    "kupot": [
      "Clalit"
    ],
    "city": "Haifa",
    "phone": "04-6283867",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=58884&eservicecode=61&employeeid=5D4F178F961A9EC318DB088991A0F44F"
  },
  {
    "id": "doc-261",
    "name": "Dr. Yosef Abu-Saleh",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Sakhnin",
    "phone": "04-6747628",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=59259&eservicecode=2&employeeid=5352316573550EC7985704E36F56A628"
  },
  {
    "id": "doc-262",
    "name": "Dr. Diab Farhat",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Majd al-Krum",
    "phone": "04-9981147",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=59268&eservicecode=2&employeeid=67C28A9E49ED00D00235F85071130ED7"
  },
  {
    "id": "doc-263",
    "name": "Dr. Daniel Gustavo Albirt",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Kfar Menahem",
    "phone": "08-8508400",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=71620&eservicecode=2&employeeid=EC37438897737682C0519700CDB10FF9"
  },
  {
    "id": "doc-264",
    "name": "Dra. Adi Ramot Ashkenazi",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Na'an",
    "phone": "08-9442821",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=71660&eservicecode=2&employeeid=56E54737A789689A5D82DACC1675BF22"
  },
  {
    "id": "doc-265",
    "name": "Lic. Alicia Viviana Itzkovich Flaner",
    "specialty": "Psicología y Psicoterapia",
    "kupot": [
      "Clalit"
    ],
    "city": "Rehovot",
    "phone": "054-3192195",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=70201&eservicecode=1765&employeeid=8564C9C2C0CD28E2F3B53A28F007C1F5"
  },
  {
    "id": "doc-266",
    "name": "Lic. Cathy Ish-Shalom",
    "specialty": "Psicología",
    "kupot": [
      "Clalit"
    ],
    "city": "Mazkeret Batya",
    "phone": "054-8188249",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=70277&eservicecode=576&employeeid=7243C99524D74300490AA7E024362A1E"
  },
  {
    "id": "doc-268",
    "name": "Dr. Guy Shmuel Haber",
    "specialty": "Cardiología",
    "kupot": [
      "Clalit"
    ],
    "city": "Ashdod",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=72660&eservicecode=21&employeeid=BA3FC9FA456E8AE5CBC32EC38B71C1FE"
  },
  {
    "id": "doc-269",
    "name": "Dr. Andrés Al Silberfish",
    "specialty": "Ecografía Morfológica Fetal y Translucencia Nucal",
    "kupot": [
      "Clalit"
    ],
    "city": "Rishon LeZion",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=73380&eservicecode=658&employeeid=D01811D07FEF6D16F6431813F792E593"
  },
  {
    "id": "doc-270",
    "name": "Dra. Aída Modrich-Mandel",
    "specialty": "Pediatría",
    "kupot": [
      "Clalit"
    ],
    "city": "Sderot",
    "phone": "08-9770006",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=74216&eservicecode=40&employeeid=9088EA3C8DB108EA6C2F6ECD338721B8"
  },
  {
    "id": "doc-271",
    "name": "Lic. Vanina Lorena Cohen",
    "specialty": "Trabajo Social",
    "kupot": [
      "Clalit"
    ],
    "city": "Ashdod",
    "phone": "08-8560831",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=72210&eservicecode=751&employeeid=748DFF0E3C47AE28CF4F69526231984D"
  },
  {
    "id": "doc-272",
    "name": "Dr. Yehiel Lynn",
    "specialty": "Medicina Familiar y Diagnóstico TDAH",
    "kupot": [
      "Clalit"
    ],
    "city": "Modi'in Illit",
    "phone": "08-9781200",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=74310&eservicecode=2&employeeid=CEC15045302F810E57CFC0F2D9793A2A"
  },
  {
    "id": "doc-273",
    "name": "Prof. Naftali (Heinrich) Freud",
    "specialty": "Cirugía Pediátrica",
    "kupot": [
      "Clalit"
    ],
    "city": "Modi'in Illit",
    "phone": "08-9781200",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=74310&eservicecode=404&employeeid=DACE5F07B3C40C5E586E22ACB20BA3D8"
  },
  {
    "id": "doc-274",
    "name": "Dr. Moshe Yaakov Shechtman",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Kfar Chabad",
    "phone": "03-9602400",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=74740&eservicecode=2&employeeid=4E7D5AF91DEA5D6636961119C73CF1A2"
  },
  {
    "id": "doc-275",
    "name": "Dr. Aviel Sidi",
    "specialty": "Medicina Interna e Insuficiencia Cardíaca",
    "kupot": [
      "Clalit"
    ],
    "city": "Be'er Sheva",
    "phone": "08-6299661",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=91259&eservicecode=143&employeeid=5B18E69ED18F480BBF61E1B666CC7125"
  },
  {
    "id": "doc-276",
    "name": "Dra. Rosana Shechter",
    "specialty": "Gastroenterología",
    "kupot": [
      "Clalit"
    ],
    "city": "Modi'in",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=74385&eservicecode=27&employeeid=DD780E7C55C9A66C7ED3A019704316F7"
  },
  {
    "id": "doc-277",
    "name": "Dra. Dorienys Torres Martínez",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Shoham",
    "phone": "03-9775300",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=74650&eservicecode=2&employeeid=CB285CAFAEFE90A85B5FC467CF723F26"
  },
  {
    "id": "doc-278",
    "name": "Dr. Héctor Rosenblum",
    "specialty": "Pediatría",
    "kupot": [
      "Clalit"
    ],
    "city": "Sderot",
    "phone": "08-9558222",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=91290&eservicecode=40&employeeid=1F41768FA22E44D213A354D1DA0B34A8"
  },
  {
    "id": "doc-279",
    "name": "Lic. Julio Ozdoba",
    "specialty": "Fisioterapia",
    "kupot": [
      "Clalit"
    ],
    "city": "Sderot",
    "phone": "08-6621239",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=92222&eservicecode=101&employeeid=097B4717F2C803442634C9A895D3381E"
  },
  {
    "id": "doc-280",
    "name": "Dr. Sergio Gerber",
    "specialty": "Pediatría y Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Hura",
    "phone": "08-6682222",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=91820&eservicecode=40&employeeid=4A6AA8A2A6086A148FAA98BB21DE1479"
  },
  {
    "id": "doc-281",
    "name": "Lic. Cynthia Levy Selanovic",
    "specialty": "Fonoaudiología Pediátrica",
    "kupot": [
      "Clalit"
    ],
    "city": "Be'er Sheva",
    "phone": "08-6299600",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=93104&eservicecode=362&employeeid=0EA7CF463F35EB485107441CC2C88C05"
  },
  {
    "id": "doc-282",
    "name": "Dr. Scott Art Richards",
    "specialty": "Oftalmología y Retina",
    "kupot": [
      "Clalit"
    ],
    "city": "Be'er Sheva",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=93114&eservicecode=61&employeeid=A79BF2A288FC8663EF2A8D11E60AEA7F"
  },
  {
    "id": "doc-283",
    "name": "Dr. Michael Beym",
    "specialty": "Cirugía de Mama (Mastología)",
    "kupot": [
      "Clalit"
    ],
    "city": "Be'er Sheva",
    "phone": "08-6292770",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=93115&eservicecode=501&employeeid=2B1E2FF387D670DCB512C111E102CF27"
  },
  {
    "id": "doc-284",
    "name": "Dra. Analía Michalowski",
    "specialty": "Desarrollo Infantil",
    "kupot": [
      "Clalit"
    ],
    "city": "Be'er Sheva",
    "phone": "08-6299600 / *2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=93104&eservicecode=433&employeeid=D51C7B52B0C48FF4F93EB52D1D6C2E07"
  },
  {
    "id": "doc-285",
    "name": "Dr. Yaron Stanovsky",
    "specialty": "Cardiología y Prueba de Esfuerzo",
    "kupot": [
      "Clalit"
    ],
    "city": "Be'er Sheva",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=93138&eservicecode=21&employeeid=6DE34866F39CFD39B4175B42EEE7AAD2"
  },
  {
    "id": "doc-287",
    "name": "Dra. Norma Kaplan",
    "specialty": "Pediatría",
    "kupot": [
      "Clalit"
    ],
    "city": "Tel Sheva",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=93365&eservicecode=40&employeeid=26A0411DCDF2026BC6080E201701C59D"
  },
  {
    "id": "doc-288",
    "name": "Dra. Elisa Lee Friedman",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Be'er Sheva",
    "phone": "08-6268844",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=93300&eservicecode=2&employeeid=80E5B0252DA66BA8BBAC79AF1AA62638"
  },
  {
    "id": "doc-289",
    "name": "Dra. Fabiana Binyaminov",
    "specialty": "Gastroenterología",
    "kupot": [
      "Clalit"
    ],
    "city": "Endoscopia y Colonoscopia",
    "phone": "Be'er Sheva",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "✓ Verificado en cartilla oficial,https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=93142&eservicecode=1039&employeeid=A153E15DEF157B35498A72726919FCB7"
  },
  {
    "id": "doc-290",
    "name": "Dra. Ronit Sonnenschein",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Be'er Sheva",
    "phone": "08-6475222",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=93280&eservicecode=2&employeeid=769743DB22E9116A912E16515326AE57"
  },
  {
    "id": "doc-291",
    "name": "Dra. Mirta Grinbaum",
    "specialty": "Medicina del Dolor",
    "kupot": [
      "Clalit"
    ],
    "city": "Be'er Sheva",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=93202&eservicecode=35&employeeid=206D6FAC465E0256D0BA6DBC1416A0A2"
  },
  {
    "id": "doc-292",
    "name": "Dra. Rina Reisin",
    "specialty": "Oftalmología",
    "kupot": [
      "Clalit"
    ],
    "city": "Kiryat Gat",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=94222&eservicecode=61&employeeid=642F0A57742710F21317B2F997671C70"
  },
  {
    "id": "doc-293",
    "name": "Prof. Alberto Lieberman",
    "specialty": "Otorrinolaringología (ORL)",
    "kupot": [
      "Clalit"
    ],
    "city": "Be'er Sheva",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=96175&eservicecode=62&employeeid=962DAB86370001AEC8826A64DF36F70F"
  },
  {
    "id": "doc-294",
    "name": "Dra. Elisa Portuguez",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Be'er Sheva",
    "phone": "08-6246222",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=93370&eservicecode=2&employeeid=4A577E4D863D93ED940F398ED0AF58FA"
  },
  {
    "id": "doc-295",
    "name": "Dra. Idit Dubi Sobol",
    "specialty": "Urología y Urología Pediátrica",
    "kupot": [
      "Clalit"
    ],
    "city": "Be'er Sheva",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=98523&eservicecode=605&employeeid=CFFD98081035F8020B6A9BA4DEDF147C"
  },
  {
    "id": "doc-296",
    "name": "Dr. Daniel Monkiar",
    "specialty": "Cardiología y Ecocardiograma",
    "kupot": [
      "Clalit"
    ],
    "city": "Herzliya",
    "phone": "09-9620700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=121139&eservicecode=591&employeeid=10E95ED1CB91B5DC9897BDAD8A0E414B"
  },
  {
    "id": "doc-297",
    "name": "Dr. Yishai Hoisler",
    "specialty": "Ginecología y Obstetricia / Alto Riesgo",
    "kupot": [
      "Clalit"
    ],
    "city": "Tzur Yitzhak",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=121160&eservicecode=63&employeeid=670D12EC764D212340EB9A3F43BFF44F"
  },
  {
    "id": "doc-298",
    "name": "Dra. Simonette Ben-Shloush Shraga",
    "specialty": "Oftalmología",
    "kupot": [
      "Clalit"
    ],
    "city": "Herzliya",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=121114&eservicecode=61&employeeid=C760A2842A91F702D8BD23288A0AC9A5"
  },
  {
    "id": "doc-299",
    "name": "Dr. Noam Dominitz",
    "specialty": "Ginecología y Obstetricia",
    "kupot": [
      "Clalit"
    ],
    "city": "Sderot",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=98595&eservicecode=63&employeeid=FEAF3A6D19C0348B389A810F1BF480F1"
  },
  {
    "id": "doc-300",
    "name": "Lic. Ruth Tzaig Patsch",
    "specialty": "Psicología y Psicoterapia",
    "kupot": [
      "Clalit"
    ],
    "city": "Raanana",
    "phone": "09-8878983",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=120218&eservicecode=576&employeeid=A548CBC20345897ED8D0A962B645034F"
  },
  {
    "id": "doc-302",
    "name": "Lic. Betty Blank Berger",
    "specialty": "Psicología y Psicoterapia",
    "kupot": [
      "Clalit"
    ],
    "city": "Herzliya",
    "phone": "052-3900683",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=120279&eservicecode=576&employeeid=6791B64E1A86EAAEFC194BAA47102DCB"
  },
  {
    "id": "doc-303",
    "name": "Lic. Viviana Apter-Petrucci",
    "specialty": "Psicología y Psicoterapia Infantil",
    "kupot": [
      "Clalit"
    ],
    "city": "Kfar Saba",
    "phone": "*2700 / 052-4848675",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=120274&eservicecode=1765&employeeid=6EF1CA9C57C5E733836FB0DBA2032FED"
  },
  {
    "id": "doc-304",
    "name": "Dr. Oded Cohen",
    "specialty": "Otorrinolaringología (ORL)",
    "kupot": [
      "Clalit"
    ],
    "city": "Herzliya",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=121340&eservicecode=62&employeeid=71ECC4096F1D337037723B09F2A7C0AE"
  },
  {
    "id": "doc-305",
    "name": "Dr. Liron Reber",
    "specialty": "Pediatría y Desarrollo Infantil",
    "kupot": [
      "Clalit"
    ],
    "city": "Netanya",
    "phone": "09-8304700 / 09-8635400",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=122124&eservicecode=433&employeeid=F78A32F1FD57425E13062B34B74A2EDF"
  },
  {
    "id": "doc-306",
    "name": "Dra. Yael Rubise",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Kfar Saba",
    "phone": "09-7631200 / 09-7631222",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=121260&eservicecode=2&employeeid=04F01DB70FF62B61B2BAAE87562523C9"
  },
  {
    "id": "doc-309",
    "name": "Dra. Laura Gloser Karni",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Eyal",
    "phone": "09-7639100",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=121400&eservicecode=2&employeeid=71E227672F82765C0C0C227D604ACECC"
  },
  {
    "id": "doc-310",
    "name": "Dra. Cynthia Zudiker-Poznansky",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Kfar Saba",
    "phone": "09-7634000 / *2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=121220&eservicecode=2&employeeid=595AF0B2B53093593800CB0E42EDC810"
  },
  {
    "id": "doc-311",
    "name": "Lic. Dina Yehudit Horowitz",
    "specialty": "Fisioterapia",
    "kupot": [
      "Clalit"
    ],
    "city": "Herzliya",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=121203&eservicecode=101&employeeid=D39D3D6CA6236C1F62DD8EF5AACDD0EE"
  },
  {
    "id": "doc-312",
    "name": "Dr. Liron Yurman",
    "specialty": "Ginecología y Obstetricia",
    "kupot": [
      "Clalit"
    ],
    "city": "Immanuel",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=121480&eservicecode=63&employeeid=5AA952C9D50D182A44C022DF68B69B9D"
  },
  {
    "id": "doc-313",
    "name": "Lic. Martín Susovitch",
    "specialty": "Nutrición Clínica",
    "kupot": [
      "Clalit"
    ],
    "city": "Kfar Saba",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=121660&eservicecode=411&employeeid=906C0BAC383AEB8DF8A891919BD07AA6"
  },
  {
    "id": "doc-314",
    "name": "Lic. Dana Peles",
    "specialty": "Fisioterapia",
    "kupot": [
      "Clalit"
    ],
    "city": "Netanya",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=122102&eservicecode=101&employeeid=E97C5DE3199C794B62960D928CB24EB2"
  },
  {
    "id": "doc-315",
    "name": "Dra. Ronit Einav-Bachar",
    "specialty": "Endocrinología Pediátrica",
    "kupot": [
      "Clalit"
    ],
    "city": "Kfar Saba",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=121665&eservicecode=212&employeeid=C447D012E7EDD1204A1C5E05C90BCAFE"
  },
  {
    "id": "doc-316",
    "name": "Dra. Verónica Moshe",
    "specialty": "Reumatología y Pediatría",
    "kupot": [
      "Clalit"
    ],
    "city": "Kfar Saba",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=121665&eservicecode=666&employeeid=AE14267546B356D0FF68E355C44A28C6"
  },
  {
    "id": "doc-317",
    "name": "Dra. Cecilia Fligler",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Kfar Saba",
    "phone": "09-7946500",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=121660&eservicecode=2&employeeid=97851A6DE80262C8191A9841D04CB116"
  },
  {
    "id": "doc-318",
    "name": "Lic. Noa Gaistut",
    "specialty": "Trabajo Social",
    "kupot": [
      "Clalit"
    ],
    "city": "Netanya",
    "phone": "09-8635222",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=122220&eservicecode=751&employeeid=A7764D0F3CFF0895C8C92BB096490819"
  },
  {
    "id": "doc-319",
    "name": "Dra. Julie Schleifer",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Kfar Saba",
    "phone": "09-7946500",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=121660&eservicecode=2&employeeid=CA8F1C0FF4A7A523CB06D61A9FB1DB9C"
  },
  {
    "id": "doc-320",
    "name": "Dr. Ariel Sochi",
    "specialty": "Pediatría",
    "kupot": [
      "Clalit"
    ],
    "city": "Kfar Yona",
    "phone": "09-8902222",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=122280&eservicecode=40&employeeid=45A52EB400642C4E6F415968B31ADE82"
  },
  {
    "id": "doc-321",
    "name": "Dr. Gabriel Alok",
    "specialty": "Medicina Familiar y Dolor",
    "kupot": [
      "Clalit"
    ],
    "city": "Pardes Hanna - Karkur",
    "phone": "04-6174600 / *2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=123125&eservicecode=35&employeeid=7A9300EE79D2A1508C4CF6B9D7EDAFED"
  },
  {
    "id": "doc-322",
    "name": "Dra. Mariana Ordóñez Márquez",
    "specialty": "Uroginecología",
    "kupot": [
      "Clalit"
    ],
    "city": "Hadera",
    "phone": "04-6638600",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=123159&eservicecode=551&employeeid=1C31BDA929BDB2471DDC0910E5E71F67"
  },
  {
    "id": "doc-323",
    "name": "Lic. Hadas Kadoshi",
    "specialty": "Nutrición Clínica",
    "kupot": [
      "Clalit"
    ],
    "city": "Hadera",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=123100&eservicecode=619&employeeid=54AA9B6E645AFFFB5B57CC813E4C8089"
  },
  {
    "id": "doc-324",
    "name": "Dra. Marina Rogovsky",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Mishmar HaSharon",
    "phone": "09-8661500 / *2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=122870&eservicecode=2&employeeid=0F5E4032C3DF36DA0F38DD13BD656026"
  },
  {
    "id": "doc-325",
    "name": "Dr. Ariel Ro Mizrahi",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Or Akiva",
    "phone": "04-6102111",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=123200&eservicecode=2&employeeid=181F969FC5B84BB5BADB402C2C5F3013"
  },
  {
    "id": "doc-326",
    "name": "Dr. Rafael Sulam",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Or Akiva",
    "phone": "04-6102111 / *2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=123200&eservicecode=2&employeeid=DE753486CE676801670C0321D3C19D49"
  },
  {
    "id": "doc-327",
    "name": "Lic. Hila Bak",
    "specialty": "Trabajo Social",
    "kupot": [
      "Clalit"
    ],
    "city": "Hadera",
    "phone": "04-6327012",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=123230&eservicecode=751&employeeid=E26F1FFD0402E80E8BFB35090416D005"
  },
  {
    "id": "doc-328",
    "name": "Lic. Mayan Barda",
    "specialty": "Nutrición Clínica",
    "kupot": [
      "Clalit"
    ],
    "city": "Hadera",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=123230&eservicecode=421&employeeid=79515E955D8707D69638832BB1EADDEA"
  },
  {
    "id": "doc-329",
    "name": "Dr. Abd Al-Fattah Otamneh",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Kafr Qara",
    "phone": "04-6357124",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=128510&eservicecode=2&employeeid=EC318EBC36A23A9930851123D5583096"
  },
  {
    "id": "doc-331",
    "name": "Dr. Israel Tschernin",
    "specialty": "Pediatría",
    "kupot": [
      "Clalit"
    ],
    "city": "Pardes Hanna - Karkur",
    "phone": "04-6372241 / 073-2417381",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=128809&eservicecode=40&employeeid=4FA6119E55C87F9B0B4DAF887FA36D29"
  },
  {
    "id": "doc-332",
    "name": "Dr. Ibrahim Zalka",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Kafr Qara",
    "phone": "050-4314530",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=128846&eservicecode=2&employeeid=50FDA44CD27AD6E4C2531146767A9506"
  },
  {
    "id": "doc-333",
    "name": "Dr. Zeev Horev",
    "specialty": "Pediatría",
    "kupot": [
      "Clalit"
    ],
    "city": "Ramat Hasharon",
    "phone": "03-5497294",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=128923&eservicecode=40&employeeid=64F66AC052753D4329D80D2E4683C1CF"
  },
  {
    "id": "doc-334",
    "name": "Dr. Israel Treiber",
    "specialty": "Neumonología",
    "kupot": [
      "Clalit"
    ],
    "city": "Herzliya",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=128924&eservicecode=26&employeeid=5A2867C6D23AE51190C146E873FDB7CB"
  },
  {
    "id": "doc-335",
    "name": "Dr. Jorge Tromper",
    "specialty": "Pediatría",
    "kupot": [
      "Clalit"
    ],
    "city": "Afula",
    "phone": "04-6403318",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=158524&eservicecode=40&employeeid=F9563CDB591796D3EB23758EE86219F4"
  },
  {
    "id": "doc-336",
    "name": "Dr. Muhammad Abu Ras",
    "specialty": "Pediatría",
    "kupot": [
      "Clalit"
    ],
    "city": "Afula",
    "phone": "04-6403318 / 04-6141760",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=158524&eservicecode=40&employeeid=2D6C722244B21CFF78EEE28AD5F9E75F"
  },
  {
    "id": "doc-337",
    "name": "Prof. Shmuel Viskin",
    "specialty": "Cardiología y Marcapasos",
    "kupot": [
      "Clalit"
    ],
    "city": "Eilat",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=161130&eservicecode=21&employeeid=8B433ABFA48858AA1D69CD6443C71781"
  },
  {
    "id": "doc-338",
    "name": "Dra. Vivian Katran",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Eilat",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=168524&eservicecode=2&employeeid=C546625B901A19D94CA67C5CB9195E12"
  },
  {
    "id": "doc-339",
    "name": "Dr. Andrés Katz",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Clalit"
    ],
    "city": "Jerusalén",
    "phone": "08-6381111",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=161200&eservicecode=2&employeeid=89410AB8493A51086E80C9E967A5961E"
  },
  {
    "id": "doc-340",
    "name": "Dra. Shoshana Cabot",
    "specialty": "Desarrollo Infantil",
    "kupot": [
      "Clalit"
    ],
    "city": "Eilat",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=161206&eservicecode=433&employeeid=7A07EA1EFE864F4C8036A4AB200E6870"
  },
  {
    "id": "doc-341",
    "name": "Dr. Alberto L. Gil",
    "specialty": "Oftalmología",
    "kupot": [
      "Clalit"
    ],
    "city": "Eilat",
    "phone": "08-6334836",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=161330&eservicecode=61&employeeid=FA94CDD9FD92D9AFEB0004C64BA2316E"
  },
  {
    "id": "doc-342",
    "name": "Dr. Emil Gilad",
    "specialty": "Oftalmología",
    "kupot": [
      "Clalit"
    ],
    "city": "Eilat",
    "phone": "076-8629021",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=161330&eservicecode=61&employeeid=706146661E21C03366E63909AEBEA132"
  },
  {
    "id": "doc-343",
    "name": "Dr. Hugo-Danny Cabot",
    "specialty": "Radiología Diagnóstica",
    "kupot": [
      "Clalit"
    ],
    "city": "Eilat",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=309410&eservicecode=498&employeeid=4CD340F4C6B43600133E3B3072CB2D5F"
  },
  {
    "id": "doc-344",
    "name": "Dr. Jorge Israel Meneses Pollos",
    "specialty": "Cirugía de Mama (Mastología)",
    "kupot": [
      "Clalit"
    ],
    "city": "Ashdod",
    "phone": "03-9765777",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=72660&eservicecode=501&employeeid=DCF3D1C7E2A3FB85F459D7CD847BB03C"
  },
  {
    "id": "doc-345",
    "name": "Prof. Avner Shemer",
    "specialty": "Dermatología y Venereología",
    "kupot": [
      "Clalit"
    ],
    "city": "Ariel",
    "phone": "03-9765777 / 054-7701621",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=910000443&eservicecode=31&employeeid=91FE3E0F7DDBFE5DC1039972923F0B82"
  },
  {
    "id": "doc-346",
    "name": "Lic. Sofía Yadid",
    "specialty": "Servicios de Enfermería",
    "kupot": [
      "Clalit"
    ],
    "city": "Holon",
    "phone": "03-6366111",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=21250&eservicecode=659&employeeid=98B7321B03801A1B567A7F90C5F99316"
  },
  {
    "id": "doc-347",
    "name": "Lic. Yarden Pick",
    "specialty": "Fisioterapia",
    "kupot": [
      "Clalit"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "*2700",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=24203&eservicecode=101&employeeid=B4F1663FC3FCC7BC78799989B39F1F76"
  },
  {
    "id": "doc-348",
    "name": "Dra. Adi Gurfinkel Muchtar",
    "specialty": "Pediatría y Diagnóstico TDAH",
    "kupot": [
      "Clalit"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "03-7662121 / 03-6366111",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=23280&eservicecode=769&employeeid=68793AF78B9EF42E63D4D8A436F0C007"
  },
  {
    "id": "doc-349",
    "name": "Dr. Yoel Dascalu",
    "specialty": "Dermatología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Givatayim",
    "phone": "053-9859839",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "Weizmann 42",
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=7FBB41DAEDEF996841DF7DDA8330D64F352CDBB38CD410317581B347FEEA76D9"
  },
  {
    "id": "doc-350",
    "name": "Dra. Judith Pross",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Givatayim",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "Aliyat HaNoar 25",
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=F4C9B86CA1A2CD211D8A29A09B42D1594F3C8A081AF37B4D9428B71638D7E369"
  },
  {
    "id": "doc-351",
    "name": "Dr. Gabriel Kenet",
    "specialty": "Gastroenterología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Givatayim",
    "phone": "053-9955965",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "Borochov 54"
  },
  {
    "id": "doc-352",
    "name": "Dr. Uriel Katz",
    "specialty": "Inmunología / Alergología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "03-5476685",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "Weizmann 14",
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=EE964FF3D9E9DF52AC6CD9F3FCD8AE5C50BCA45520E9E67F0563BC60B5B2E1EF"
  },
  {
    "id": "doc-353",
    "name": "Dra. Lilian Maoz",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "03-5287505",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "Bar Giora 16",
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=4D00D5E4D895786C147A572F35DF803F217A9B9CA6EBFAEAFA893693FEEAF9D0"
  },
  {
    "id": "doc-354",
    "name": "Dr. Tal Romah",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "Yigal Alon 82",
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=F0824B390C918EFFAA5D37DD8C6796CBBF220DD27A2FD9A3A0C27F611C33F4A2&RequestId=1bc9100b-64a6-3a29-a32d-583a7234e2f2&Source=SearchPageResults"
  },
  {
    "id": "doc-355",
    "name": "Dr. Zvi Cohen",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "03-5195090",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "Beker Aharon 8",
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=4E370144CD1813098D5C0F7E5AF3C41BCA7FBF996A754D470371BFE7D7AD58E8&RequestId=1bc9100b-64a6-3a29-a32d-583a7234e2f2&Source=SearchPageResults"
  },
  {
    "id": "doc-356",
    "name": "Dr. Zeev Marmor",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "053-9955472",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "Shlomo HaMelech 105",
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=684FF230A395BB2D03C325E791221F5BC29C6E3169DA6A4FDC36B7BA37046C83&RequestId=1bc9100b-64a6-3a29-a32d-583a7234e2f2&Source=SearchPageResults"
  },
  {
    "id": "doc-357",
    "name": "Dr. Eyal Risher",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "Derech HaHagana 41",
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=994A2C7C895A92F6987D1C019BEE2EE46B2234E3100CDD7E243391EB9DD20503&RequestId=1bc9100b-64a6-3a29-a32d-583a7234e2f2&Source=SearchPageResults"
  },
  {
    "id": "doc-358",
    "name": "Dr. Hagai Ben Sasson",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "053-9956083",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=FA1610511029301C1B6F9A33B83477D9FC98F3C6DD219D96626A6B6720EB74E8&RequestId=1bc9100b-64a6-3a29-a32d-583a7234e2f2&Source=SearchPageResults"
  },
  {
    "id": "doc-359",
    "name": "Dra. Eliani Weinfeld",
    "specialty": "Medicina Familiar / General y Geriatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo / Ramat Gan",
    "phone": "03-7463240 / *3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=772CC19C15D7A26FC239BB685D5287DC119A7D5B0D499BD901E446932567F779&RequestId=1bc9100b-64a6-3a29-a32d-583a7234e2f2&Source=SearchPageResults",
    "address": "Raoul Wallenberg 32 (Tel Aviv) / Landau Chaim 7, Derech Negba 48 (Ramat Gan)"
  },
  {
    "id": "doc-360",
    "name": "Dr. Eduardo Schechter",
    "specialty": "Ginecología / Cuello Uterino",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "Yigal Alon 96",
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=4068E7DFB4DEF1AF3A73932FC7C1332F538836E4C612E1FCE9DE73896FE60B49&RequestId=1bc9100b-64a6-3a29-a32d-583a7234e2f2&Source=SearchPageResults"
  },
  {
    "id": "doc-361",
    "name": "Dr. Eliakim Weitzbard",
    "specialty": "Cirugía General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "03-6495885",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "Kehilat Riga 9",
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=193B09703317BE82B3E3D8A853554725665029A7DFA5A271EBF844E423FA910D&RequestId=1bc9100b-64a6-3a29-a32d-583a7234e2f2&Source=SearchPageResults"
  },
  {
    "id": "doc-362",
    "name": "Dra. Miriam Herman",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "03-5281888",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "Melchett 1",
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=4A24939D42D2D7A67ECFB7C14ACDF0C5A423DA4CBA6FAD37832069CE1B382A07&RequestId=1bc9100b-64a6-3a29-a32d-583a7234e2f2&Source=SearchPageResults"
  },
  {
    "id": "doc-363",
    "name": "Dr. Ami Hirsch",
    "specialty": "Oftalmología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "053-9857459",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "Frish Daniel 3",
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=0EED2270C290B6954F9672A32313F5EB1003EEEAD72D4E304CA0855E60D42BA6&RequestId=1bc9100b-64a6-3a29-a32d-583a7234e2f2&Source=SearchPageResults"
  },
  {
    "id": "doc-364",
    "name": "Dr. Amos Bar",
    "specialty": "Ginecología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "03-6994575",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "Uri Zvi Greenberg 25",
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=7CCFCCB74AA6B2762F324B7933853952C27D264F95FA5B9400E8B008970EB90A&RequestId=1bc9100b-64a6-3a29-a32d-583a7234e2f2&Source=SearchPageResults"
  },
  {
    "id": "doc-365",
    "name": "Dr. Daniel Kugler",
    "specialty": "Ginecología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "03-5117787",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "Hirshenberg 3",
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=CCBDE5AAA0607DC4B4AE3A6C6569832F226196DCB03C596B955221B429D4CA20&RequestId=1bc9100b-64a6-3a29-a32d-583a7234e2f2&Source=SearchPageResults"
  },
  {
    "id": "doc-366",
    "name": "Dr. Ricardo Tuber",
    "specialty": "Cardiología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "HaTkuma 36",
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=9EAB5430130633E48547D9637A144DC14CA93EB1025E221C715B2BF9282365F3&RequestId=1bc9100b-64a6-3a29-a32d-583a7234e2f2&Source=SearchPageResults"
  },
  {
    "id": "doc-367",
    "name": "Dra. Nino Kikozashvili",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "HaShla 7",
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=9FFDAAC564754519505F3479D486FF10356B727326E633A06B2ADD36166C33A2&RequestId=1bc9100b-64a6-3a29-a32d-583a7234e2f2&Source=SearchPageResults"
  },
  {
    "id": "doc-368",
    "name": "Dra. Tamar Shafran",
    "specialty": "Oftalmología Infantil",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "053-9956573",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "Yigal Alon 82",
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=571F74E36D7C873A3EA581D9FD2117FEF7A1CC78D6CA5B395551D9D34103E200&RequestId=1bc9100b-64a6-3a29-a32d-583a7234e2f2&Source=SearchPageResults"
  },
  {
    "id": "doc-369",
    "name": "Dra. Sharon Gutman Robins",
    "specialty": "Oftalmología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "053-9955373",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "Yigal Alon 82",
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=440F6C53FF0C914B23FC087B23014E42A268E6F0D353B44F8531715DC586E605&RequestId=1bc9100b-64a6-3a29-a32d-583a7234e2f2&Source=SearchPageResults"
  },
  {
    "id": "doc-370",
    "name": "Dra. Silvia Rotenberg",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "053-8411208",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=73772998974F4EDB59B8BA5EAA3750137967D1AB1C74409145842A011161C731&RequestId=1bc9100b-64a6-3a29-a32d-583a7234e2f2&Source=SearchPageResults"
  },
  {
    "id": "doc-371",
    "name": "Dr. Yoram Miron",
    "specialty": "Oftalmología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "Sprinzak 3",
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=326ECADC5E8A95F87DADD978E79E689128D5813F4306E1254C14C1D780544209&RequestId=1bc9100b-64a6-3a29-a32d-583a7234e2f2&Source=SearchPageResults"
  },
  {
    "id": "doc-372",
    "name": "Dra. Michal Dayan",
    "specialty": "Otorrinolaringología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "Yigal Alon 82",
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=C36F86038AC4BF6506FC7DB8DA6A653870E9C3812491B3F7B636D515EE7F0614&RequestId=1bc9100b-64a6-3a29-a32d-583a7234e2f2&Source=SearchPageResults"
  },
  {
    "id": "doc-373",
    "name": "Dra. Galia Halevy",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "Achimeir Abba 27",
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=3D97568F824341D0255D2D96BE56D3CC3F958E64EB144AA127FA9C6CF41509F8&RequestId=1bc9100b-64a6-3a29-a32d-583a7234e2f2&Source=SearchPageResults"
  },
  {
    "id": "doc-374",
    "name": "Dra. Sara Rotman",
    "specialty": "Otorrinolaringología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "053-9957198",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "HaBarzel 24",
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=0EA74F95DAB7EAC1DB4C196EBE4357FA91B143252F53F2F03D31E34D575B316F&RequestId=1bc9100b-64a6-3a29-a32d-583a7234e2f2&Source=SearchPageResults"
  },
  {
    "id": "doc-375",
    "name": "Dr. Moti Karpman",
    "specialty": "Ginecología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "03-7178244",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "La Guardia 58",
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=58FB0D22358D9DD7BAD99AC12CEB48E62D8FE1F39C8F10F7183277D26DB241FA&RequestId=1bc9100b-64a6-3a29-a32d-583a7234e2f2&Source=SearchPageResults"
  },
  {
    "id": "doc-376",
    "name": "Dr. Ariel Margolis",
    "specialty": "Otorrinolaringología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "053-9956836",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "HaBarzel 24",
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=6C388E9CAC780F4C0A5EB68A070FF5356FAABCA83D5B24BEABB4D227DF363C92&RequestId=1bc9100b-64a6-3a29-a32d-583a7234e2f2&Source=SearchPageResults"
  },
  {
    "id": "doc-377",
    "name": "Dr. Carlos Idsses",
    "specialty": "Dermatología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "03-6964885",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "Sprinzak 3",
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=9374B570D15BC63DB71DF9E4FEE84D31D60C31B4D85717CA8723651B4B45B2DC&RequestId=1bc9100b-64a6-3a29-a32d-583a7234e2f2&Source=SearchPageResults"
  },
  {
    "id": "doc-378",
    "name": "Dr. Simon Israeli-Koren",
    "specialty": "Neurología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "053-9956105",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "Weizmann 14",
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=CA020DA82630E7DFC10E1FE6F2F263B3140A0ADBC93D1B9831E4FA3271D383A0&RequestId=1bc9100b-64a6-3a29-a32d-583a7234e2f2&Source=SearchPageResults"
  },
  {
    "id": "doc-379",
    "name": "Dra. Sofia Masalha",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Holon",
    "phone": "03-5080355",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=17F6967F9145FFF31AC45FDC511C5217107DA89292A171F0098B26CDDEB6D939&RequestId=7fbf94d1-3051-f8d8-224e-cdda70e8ce7e&Source=SearchPageResults",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "Rabinovich Yehoshua 58"
  },
  {
    "id": "doc-380",
    "name": "Dr. Michael Salam",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Holon",
    "phone": "03-5530000",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=F2DADD329DDC4B8BB89699DB35FB8737119F59F5572FDD472F10097665597397&RequestId=7fbf94d1-3051-f8d8-224e-cdda70e8ce7e&Source=SearchPageResults",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "Geulim 43"
  },
  {
    "id": "doc-381",
    "name": "Dr. Ariel Katz",
    "specialty": "Otorrinolaringología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Holon",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=BE6A03ACB26373E918A67884C43416BABE899C890E9950CD36927384186180D1&RequestId=7fbf94d1-3051-f8d8-224e-cdda70e8ce7e&Source=SearchPageResults",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "Hofien 13"
  },
  {
    "id": "doc-382",
    "name": "Dr. Yoav Gilburd",
    "specialty": "Ginecología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Holon",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=8E6E8DD64312789FD818CD0955765F66F56898C2900FB9CB137C2B6BFD162994&RequestId=7fbf94d1-3051-f8d8-224e-cdda70e8ce7e&Source=SearchPageResults",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "Rafael Eitan 4"
  },
  {
    "id": "doc-383",
    "name": "Dr. Yoav Apel",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Ramat Gan",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=509185A93CE563DE15D340CBA744E7B541C441A48243CF9AED2B37EC2BA9A2AA&RequestId=b347c568-789a-b4ce-7b05-1b439eaa832d&Source=SearchPageResults",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "Shalem 32"
  },
  {
    "id": "doc-384",
    "name": "Dra. Deborah Wilkovsky",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Ramat Gan",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=03BB67F3E6E41BD0207DEF80A1AD65A4008679B2767FE88279EE24EF48EB45D2&RequestId=b347c568-789a-b4ce-7b05-1b439eaa832d&Source=SearchPageResults",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "Ora 4"
  },
  {
    "id": "doc-385",
    "name": "Dra. Frida Feldman-Kopler",
    "specialty": "Psiquiatría de Adultos",
    "kupot": [
      "Maccabi"
    ],
    "city": "Ramat Gan",
    "phone": "03-6778828",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=D59BDF7B05A19971796484DB4342A72AF81A87FD4D29DC01C24920460F2028D2&RequestId=b347c568-789a-b4ce-7b05-1b439eaa832d&Source=SearchPageResults",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "HaGaon Eliyahu 2"
  },
  {
    "id": "doc-386",
    "name": "Dra. Oshrit Heresh Chiger",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Ramat Gan",
    "phone": "053-8411220",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=DAE9D950C0EC3B0A3093871D506D8DE9DC0DB2CDB834F6B63D5C71BD2E5DC3CC&RequestId=b347c568-789a-b4ce-7b05-1b439eaa832d&Source=SearchPageResults",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "Krinitzi 35"
  },
  {
    "id": "doc-387",
    "name": "Dra. Anat Gabay",
    "specialty": "Oftalmología y Neuro-oftalmología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Ramat Gan",
    "phone": "052-2603272",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=166A33CBC28F75108CB91E95A595F082D2B6FA6AB6A8462D5D63BB7CAEE76FD1&RequestId=b347c568-789a-b4ce-7b05-1b439eaa832d&Source=SearchPageResults",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": [],
    "address": "Achimeir Abba 4"
  },
  {
    "id": "doc-388",
    "name": "Prof. Abraham Avital",
    "specialty": "Neumología Pediátrica",
    "kupot": [
      "Leumit"
    ],
    "city": "Mevaseret Zion",
    "phone": "02-5852300",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=13178&code=061&doctorType=2&place=6552",
    "address": "Hermón 2 2, Mevaseret Sion"
  },
  {
    "id": "doc-389",
    "name": "Dr. Mónica Ester Ornstein",
    "specialty": "Pediatría",
    "kupot": [
      "Leumit"
    ],
    "city": "Bnei Brak",
    "phone": "03-6769441",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=156888&code=037&doctorType=2&place=4557",
    "address": "Har Sinai 17, Bnei Brak"
  },
  {
    "id": "doc-390",
    "name": "Dr. Wafiq Amon",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Leumit"
    ],
    "city": "Deir al-Asad",
    "phone": "04-9981053",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=117519&code=001&doctorType=2&place=3578",
    "address": "Al-Shabab 8, Deir al-Asad"
  },
  {
    "id": "doc-391",
    "name": "Dr. Wafiq Amon",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Leumit"
    ],
    "city": "Karmiel",
    "phone": "04-9081802",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=117519&code=001&doctorType=2&place=3332",
    "address": "Jativat Harel 9, Karmiel"
  },
  {
    "id": "doc-392",
    "name": "Dr. Morsi Badir",
    "specialty": "Pediatría",
    "kupot": [
      "Leumit"
    ],
    "city": "Rosh HaAyin",
    "phone": "03-9000800",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=34465&code=037&doctorType=2&place=101",
    "address": "Shabazi 26, Rosh HaAyin"
  },
  {
    "id": "doc-393",
    "name": "Dr. Morsi Badir",
    "specialty": "Pediatría",
    "kupot": [
      "Leumit"
    ],
    "city": "Kafr Qasim",
    "phone": "03-9072202",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=34465&code=037&doctorType=2&place=4546",
    "address": "Omar Ibn al-Jattab, Kafr Qasim"
  },
  {
    "id": "doc-394",
    "name": "Dr. Serguéi Boykov",
    "specialty": "Ortopedia",
    "kupot": [
      "Leumit"
    ],
    "city": "Eilat",
    "phone": "08-6306200",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=32327&code=004&doctorType=2&place=4157",
    "address": "Gan-Binyamin 12, Eilat"
  },
  {
    "id": "doc-395",
    "name": "Dr. Ohad Ben-Zvi",
    "specialty": "Ginecología",
    "kupot": [
      "Leumit"
    ],
    "city": "Peduel",
    "phone": "03-9329769",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=116943&code=005&doctorType=2&place=4530",
    "address": "D. N. Modiín, Peduel"
  },
  {
    "id": "doc-396",
    "name": "Dr. Ohad Ben-Zvi",
    "specialty": "Ginecología",
    "kupot": [
      "Leumit"
    ],
    "city": "Ariel",
    "phone": "03-9065800",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=116943&code=005&doctorType=2&place=4571",
    "address": "Derej HaNajshonim 41, Ariel"
  },
  {
    "id": "doc-397",
    "name": "Dr. Ohad Ben-Zvi",
    "specialty": "Ginecología",
    "kupot": [
      "Leumit"
    ],
    "city": "Beit Arye",
    "phone": "08-9770800",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=116943&code=005&doctorType=2&place=4527",
    "address": "HaZait 1, Beit Arye"
  },
  {
    "id": "doc-398",
    "name": "Dr. Ohad Ben-Zvi",
    "specialty": "Ginecología",
    "kupot": [
      "Leumit"
    ],
    "city": "Shilo",
    "phone": "02-9941293",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=116943&code=005&doctorType=2&place=2678",
    "address": "HaMesilá HaOlá, Shilo"
  },
  {
    "id": "doc-399",
    "name": "Dr. Ohad Ben-Zvi",
    "specialty": "Ginecología",
    "kupot": [
      "Leumit"
    ],
    "city": "Jerusalén",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=116943&code=005&doctorType=2&place=6066",
    "address": ".., Jerusalén"
  },
  {
    "id": "doc-400",
    "name": "Dr. Ohad Ben-Zvi",
    "specialty": "Ginecología",
    "kupot": [
      "Leumit"
    ],
    "city": "Elkana",
    "phone": "03-9362801",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=116943&code=005&doctorType=2&place=4526",
    "address": "Shir HaShirim 1, Elkana"
  },
  {
    "id": "doc-401",
    "name": "Dr. Ronen Bar",
    "specialty": "Otorrinolaringología",
    "kupot": [
      "Leumit"
    ],
    "city": "Harish",
    "phone": "04-8800400",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=33207&code=002&doctorType=1&place=92",
    "address": "Derej Eretz 39, Harish"
  },
  {
    "id": "doc-402",
    "name": "Prof. Reuven Bromiker",
    "specialty": "Pediatría",
    "kupot": [
      "Leumit"
    ],
    "city": "Beit Shemesh",
    "phone": "02-5953777",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=23964&code=037&doctorType=2&place=4418",
    "address": "Javakuk HaNavi 11, Beit Shemesh"
  },
  {
    "id": "doc-403",
    "name": "Dr. Raúl Barak",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Leumit"
    ],
    "city": "Giva Binyamin",
    "phone": "02-9978111",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=29354&code=001&doctorType=2&place=2649",
    "address": "HaOman 1, Shaar Binyamin, Giva Binyamin"
  },
  {
    "id": "doc-404",
    "name": "Dr. Wasim Jabar",
    "specialty": "Oftalmología",
    "kupot": [
      "Leumit"
    ],
    "city": "Lod",
    "phone": "08-9188500",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=100799&code=006&doctorType=2&place=3730",
    "address": "Arba HaOnot 14, Lod"
  },
  {
    "id": "doc-405",
    "name": "Dr. José Jamus",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Leumit"
    ],
    "city": "Jerusalén",
    "phone": "02-5482888",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=199631&code=001&doctorType=2&place=2639",
    "address": "Birkat Abraham 10, Jerusalén"
  },
  {
    "id": "doc-406",
    "name": "Dr. José Jamus",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Leumit"
    ],
    "city": "Jerusalén",
    "phone": "02-6773800",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=199631&code=001&doctorType=2&place=6054",
    "address": "Jazon Ish 10, Jerusalén"
  },
  {
    "id": "doc-407",
    "name": "Dr. José Jamus",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Leumit"
    ],
    "city": "Jerusalén",
    "phone": "02-6260323",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=199631&code=001&doctorType=2&place=4038",
    "address": "Sonnenfeld 3, Jerusalén"
  },
  {
    "id": "doc-408",
    "name": "Dr. Yigal Gabrieli",
    "specialty": "Neurología",
    "kupot": [
      "Leumit"
    ],
    "city": "Ashdod",
    "phone": "08-8687600",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=29816&code=008&doctorType=2&place=174",
    "address": "Kineret 71, Ashdod"
  },
  {
    "id": "doc-409",
    "name": "Dr. Yigal Gabrieli",
    "specialty": "Neurología",
    "kupot": [
      "Leumit"
    ],
    "city": "Kiryat Gat",
    "phone": "08-6923300",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=29816&code=008&doctorType=2&place=5193",
    "address": "Sderot Lajish 157, Kiryat Gat"
  },
  {
    "id": "doc-410",
    "name": "Dr. Yigal Gabrieli",
    "specialty": "Neurología",
    "kupot": [
      "Leumit"
    ],
    "city": "Rehovot",
    "phone": "08-9377800",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=29816&code=008&doctorType=2&place=3759",
    "address": "Bilu 2, Rejovot"
  },
  {
    "id": "doc-411",
    "name": "Dr. Yigal Gabrieli",
    "specialty": "Neurología",
    "kupot": [
      "Leumit"
    ],
    "city": "Be'er Sheva",
    "phone": "08-6268666",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=29816&code=008&doctorType=2&place=146",
    "address": "Cohen Yaakov 6, Beer Sheva"
  },
  {
    "id": "doc-412",
    "name": "Dr. Yigal Gabrieli",
    "specialty": "Neurología",
    "kupot": [
      "Leumit"
    ],
    "city": "Kiryat Malají",
    "phone": "08-8589888",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=29816&code=008&doctorType=2&place=4612",
    "address": "Jabotinsky 22, Kiryat Malají"
  },
  {
    "id": "doc-413",
    "name": "Dr. Yigal Gabrieli",
    "specialty": "Neurología",
    "kupot": [
      "Leumit"
    ],
    "city": "Lod",
    "phone": "08-9583555",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=29816&code=008&doctorType=2&place=4581",
    "address": "HaAyalon 14, Lod"
  },
  {
    "id": "doc-414",
    "name": "Dr. Dafna Silvina Gotkovski",
    "specialty": "Otorrinolaringología",
    "kupot": [
      "Leumit"
    ],
    "city": "Ariel",
    "phone": "03-9065800",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=185773&code=002&doctorType=2&place=4571",
    "address": "Derej HaNajshonim 41, Ariel"
  },
  {
    "id": "doc-415",
    "name": "Dr. Dafna Silvina Gotkovski",
    "specialty": "Otorrinolaringología",
    "kupot": [
      "Leumit"
    ],
    "city": "Hod HaSharon",
    "phone": "09-7621500",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=185773&code=002&doctorType=2&place=4545",
    "address": "HaBanim 14, Hod HaSharon"
  },
  {
    "id": "doc-416",
    "name": "Dr. Tatiana Naama Goldstein",
    "specialty": "Pediatría",
    "kupot": [
      "Leumit"
    ],
    "city": "Ashdod",
    "phone": "08-8627200",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=83017&code=037&doctorType=2&place=179",
    "address": "Rabí Yehuda HaNasí 4, Ashdod"
  },
  {
    "id": "doc-417",
    "name": "Dr. Irina Gordon Barholtz",
    "specialty": "Pediatría",
    "kupot": [
      "Leumit"
    ],
    "city": "Kokhav Yaakov",
    "phone": "02-9974263",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=153276&code=037&doctorType=2&place=2677",
    "address": "Tirat Kesef 1, Kokhav Yaakov"
  },
  {
    "id": "doc-418",
    "name": "Dr. Irina Gordon Barholtz",
    "specialty": "Pediatría",
    "kupot": [
      "Leumit"
    ],
    "city": "Giva Binyamin",
    "phone": "02-9978111",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=153276&code=037&doctorType=2&place=2649",
    "address": "HaOman 1, Shaar Binyamin, Giva Binyamin"
  },
  {
    "id": "doc-419",
    "name": "Dr. Jamal Ghazmawi",
    "specialty": "Cirugía General",
    "kupot": [
      "Leumit"
    ],
    "city": "Arara",
    "phone": "04-6808720",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=19706&code=003&doctorType=1&place=4827",
    "address": "A la entrada del pueblo, Arara"
  },
  {
    "id": "doc-420",
    "name": "Dr. Rose Gasniar",
    "specialty": "Embarazo de Alto Riesgo",
    "kupot": [
      "Leumit"
    ],
    "city": "Netanya",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=108494&code=116&doctorType=2&place=6065",
    "address": "HaJorutzim, Netanya"
  },
  {
    "id": "doc-421",
    "name": "Dr. Rose Gasniar",
    "specialty": "Embarazo de Alto Riesgo",
    "kupot": [
      "Leumit"
    ],
    "city": "Bnei Brak",
    "phone": "03-5778700",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=108494&code=116&doctorType=2&place=4556",
    "address": "Yehuda Halevi 1, Bnei Brak"
  },
  {
    "id": "doc-422",
    "name": "Dr. Uri Samuel Duak",
    "specialty": "Cirugía Plástica",
    "kupot": [
      "Leumit"
    ],
    "city": "Ashdod",
    "phone": "08-8687500",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=127478&code=025&doctorType=1&place=171",
    "address": "Ahad HaAm 22, Ashdod"
  },
  {
    "id": "doc-423",
    "name": "Dr. Gabriel Esteban Duak",
    "specialty": "Gastroenterología",
    "kupot": [
      "Leumit"
    ],
    "city": "Modi'in",
    "phone": "08-6470700",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=80182&code=015&doctorType=2&place=6456",
    "address": "Jaim Weizmann 11, Modiín-Macabim-Reut"
  },
  {
    "id": "doc-424",
    "name": "Dr. Gabriel Esteban Duak",
    "specialty": "Gastroenterología",
    "kupot": [
      "Leumit"
    ],
    "city": "Ashdod",
    "phone": "08-8579800",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=80182&code=015&doctorType=2&place=180",
    "address": "Derej Menajem Begin 1, Ashdod"
  },
  {
    "id": "doc-425",
    "name": "Dr. Yosef Deutsch",
    "specialty": "Ortopedia",
    "kupot": [
      "Leumit"
    ],
    "city": "Jerusalén",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=143385&code=004&doctorType=2&place=5646",
    "address": "Hartom, Jerusalén"
  },
  {
    "id": "doc-426",
    "name": "Dr. Michael Barry Dinerman",
    "specialty": "Pediatría",
    "kupot": [
      "Leumit"
    ],
    "city": "Beit Shemesh",
    "phone": "02-6325500",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=174149&code=037&doctorType=2&place=5194",
    "address": "Nahar HaYarden 1, Beit Shemesh"
  },
  {
    "id": "doc-427",
    "name": "Dr. Michael Barry Dinerman",
    "specialty": "Pediatría",
    "kupot": [
      "Leumit"
    ],
    "city": "Beit Shemesh",
    "phone": "02-6328500",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=174149&code=037&doctorType=2&place=5759",
    "address": "Miriam HaNeviá 1, Beit Shemesh"
  },
  {
    "id": "doc-428",
    "name": "Dr. Karin Hagopian",
    "specialty": "Pediatría",
    "kupot": [
      "Leumit"
    ],
    "city": "Beit Shemesh",
    "phone": "02-5953777",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=170132&code=037&doctorType=2&place=4418",
    "address": "Javakuk HaNavi 11, Beit Shemesh"
  },
  {
    "id": "doc-429",
    "name": "Dr. Tamir Horowitz",
    "specialty": "Dermatología y Venereología",
    "kupot": [
      "Leumit"
    ],
    "city": "Rishon LeZion",
    "phone": "03-9633200",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=146628&code=007&doctorType=2&place=6179",
    "address": "Sderot Yaakov 50, Rishon LeZion"
  },
  {
    "id": "doc-430",
    "name": "Dr. Tamir Horowitz",
    "specialty": "Dermatología y Venereología",
    "kupot": [
      "Leumit"
    ],
    "city": "Holon",
    "phone": "03-5519999",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=146628&code=007&doctorType=2&place=3719",
    "address": "Rabinovich Yehoshua 58, Holon"
  },
  {
    "id": "doc-431",
    "name": "Dr. Tamir Horowitz",
    "specialty": "Dermatología y Venereología",
    "kupot": [
      "Leumit"
    ],
    "city": "Ramla",
    "phone": "08-9135500",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=146628&code=007&doctorType=2&place=3733",
    "address": "HaShiryon 45, Ramla"
  },
  {
    "id": "doc-432",
    "name": "Dr. Susana Halevi Gliksberg",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Leumit"
    ],
    "city": "Ashdod",
    "phone": "08-8687600",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=22114&code=001&doctorType=2&place=174",
    "address": "Kineret 71, Ashdod"
  },
  {
    "id": "doc-433",
    "name": "Dr. Susana Halevi Gliksberg",
    "specialty": "Diabetología",
    "kupot": [
      "Leumit"
    ],
    "city": "Ashdod",
    "phone": "08-6332444",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=22114&code=034&doctorType=2&place=6560",
    "address": "Sderot Tel Jai 29, Ashdod"
  },
  {
    "id": "doc-434",
    "name": "Dr. Judith Halper",
    "specialty": "Salud Mental de la Mujer",
    "kupot": [
      "Leumit"
    ],
    "city": "Ramat Gan",
    "phone": "03-6756888",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=31666&code=161&doctorType=2&place=3157",
    "address": "Bialik 76, Ramat Gan"
  },
  {
    "id": "doc-435",
    "name": "Dr. Iris Harel",
    "specialty": "Ginecología",
    "kupot": [
      "Leumit"
    ],
    "city": "Eilat",
    "phone": "08-6306200",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=131218&code=005&doctorType=2&place=4157",
    "address": "Gan Binyamin 12, Eilat"
  },
  {
    "id": "doc-436",
    "name": "Dr. Israel Yaakov Weiss",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Leumit"
    ],
    "city": "Jerusalén",
    "phone": "02-5608800",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=161224&code=001&doctorType=2&place=2637",
    "address": "Gesher HaChaim 14, Jerusalén"
  },
  {
    "id": "doc-437",
    "name": "Dr. Michel Don Wolf",
    "specialty": "Ginecología",
    "kupot": [
      "Leumit"
    ],
    "city": "Jerusalén",
    "phone": "02-6260323",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=128497&code=005&doctorType=2&place=4038",
    "address": "Sonnenfeld 3, Jerusalén"
  },
  {
    "id": "doc-438",
    "name": "Dr. Asher Wilkansky",
    "specialty": "Pediatría",
    "kupot": [
      "Leumit"
    ],
    "city": "Sderot",
    "phone": "08-6825500",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=88479&code=037&doctorType=2&place=5248",
    "address": "Keren Kayemet LeYisrael 22, Sderot"
  },
  {
    "id": "doc-439",
    "name": "Dr. Yana Vinikov",
    "specialty": "Ginecología",
    "kupot": [
      "Leumit"
    ],
    "city": "Dimona",
    "phone": "08-6503600",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=126206&code=005&doctorType=1&place=3700",
    "address": "Sderot HaNasi 45, Dimona"
  },
  {
    "id": "doc-440",
    "name": "Dr. Yana Vinikov",
    "specialty": "Ginecología",
    "kupot": [
      "Leumit"
    ],
    "city": "Be'er Sheva",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=126206&code=005&doctorType=2&place=6067",
    "address": ".., Beer Sheva"
  },
  {
    "id": "doc-441",
    "name": "Dr. Masudi Weisman",
    "specialty": "Oftalmología",
    "kupot": [
      "Leumit"
    ],
    "city": "Netanya",
    "phone": "050-8666593",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=159132&code=006&doctorType=1&place=6163",
    "address": "HaOrezim 23, Netanya"
  },
  {
    "id": "doc-442",
    "name": "Dr. Ilana Wallerstein (Ezra)",
    "specialty": "Trastornos por déficit de atención e hiperactividad",
    "kupot": [
      "Leumit"
    ],
    "city": "Beitar Illit",
    "phone": "02-5887300",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=29590&code=101&doctorType=2&place=4515",
    "address": "Yismach Yisrael 1, Beitar Illit"
  },
  {
    "id": "doc-443",
    "name": "Dr. Ilana Wallerstein (Ezra)",
    "specialty": "Pediatría",
    "kupot": [
      "Leumit"
    ],
    "city": "Beitar Illit",
    "phone": "02-5480888",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=29590&code=037&doctorType=2&place=4522",
    "address": "Elazar HaModa'i 1, Beitar Illit"
  },
  {
    "id": "doc-444",
    "name": "Dr. Kristina Hazan",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Leumit"
    ],
    "city": "Nazaret",
    "phone": "04-6026400",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=161583&code=001&doctorType=2&place=4648",
    "address": "Paulus VI 1030, Nazaret"
  },
  {
    "id": "doc-445",
    "name": "Dr. Samer Tahbub",
    "specialty": "Ortopedia",
    "kupot": [
      "Leumit"
    ],
    "city": "Modi'in Illit",
    "phone": "08-9142500",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=120832&code=004&doctorType=2&place=6300",
    "address": "Netivot HaMishpat 5, Modi'in Illit"
  },
  {
    "id": "doc-446",
    "name": "Dr. Samer Tahbub",
    "specialty": "Ortopedia",
    "kupot": [
      "Leumit"
    ],
    "city": "Beit Aryeh",
    "phone": "08-9770800",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=120832&code=004&doctorType=2&place=4527",
    "address": "HaZayit 1, Beit Aryeh"
  },
  {
    "id": "doc-447",
    "name": "Dr. Samer Tahbub",
    "specialty": "Ortopedia",
    "kupot": [
      "Leumit"
    ],
    "city": "Jerusalén",
    "phone": "02-6483123",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=120832&code=004&doctorType=2&place=4705",
    "address": "Akev, Jerusalén"
  },
  {
    "id": "doc-448",
    "name": "Dr. Samer Tahbub",
    "specialty": "Ortopedia",
    "kupot": [
      "Leumit"
    ],
    "city": "Modi'in Illit",
    "phone": "08-6855100",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=120832&code=004&doctorType=2&place=6293",
    "address": "Rashba 7, Modi'in Illit"
  },
  {
    "id": "doc-449",
    "name": "Dr. Nur al-Din Yagmor",
    "specialty": "Neurología",
    "kupot": [
      "Leumit"
    ],
    "city": "Jerusalén",
    "phone": "02-6645900",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=117234&code=008&doctorType=2&place=4706",
    "address": "Nur al-Din 1, Jerusalén"
  },
  {
    "id": "doc-450",
    "name": "Dr. Nur al-Din Yagmor",
    "specialty": "Neurología",
    "kupot": [
      "Leumit"
    ],
    "city": "Jerusalén",
    "phone": "02-6442300",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=117234&code=008&doctorType=2&place=2651",
    "address": "Tzur Baher, Jerusalén"
  },
  {
    "id": "doc-451",
    "name": "Dr. Eduardo Israel",
    "specialty": "Ginecología",
    "kupot": [
      "Leumit"
    ],
    "city": "Yokneam Illit",
    "phone": "04-6773700",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=38088&code=005&doctorType=2&place=4650",
    "address": "Sderot HaYovel 1, Yokneam Illit"
  },
  {
    "id": "doc-452",
    "name": "Dr. Eduardo Israel",
    "specialty": "Ginecología",
    "kupot": [
      "Leumit"
    ],
    "city": "Nesher",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=38088&code=005&doctorType=2&place=6063",
    "address": ", Nesher"
  },
  {
    "id": "doc-453",
    "name": "Dr. Eduardo Israel",
    "specialty": "Embarazo de Alto Riesgo",
    "kupot": [
      "Leumit"
    ],
    "city": "Haifa",
    "phone": "04-8607800",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=38088&code=116&doctorType=2&place=68",
    "address": "Khuri 2, Haifa"
  },
  {
    "id": "doc-454",
    "name": "Dr. Jesse Daniel Cohen",
    "specialty": "Cirugía vascular",
    "kupot": [
      "Leumit"
    ],
    "city": "Jerusalén",
    "phone": "02-5608800",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=146842&code=009&doctorType=2&place=2637",
    "address": "Gesher HaChaim 14, Jerusalén"
  },
  {
    "id": "doc-455",
    "name": "Prof. Malena Cohen Simberkano",
    "specialty": "Pediatría",
    "kupot": [
      "Leumit"
    ],
    "city": "Jerusalén",
    "phone": "02-6773800",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=35430&code=037&doctorType=2&place=6054",
    "address": "Hazon Ish 10, Jerusalén"
  },
  {
    "id": "doc-456",
    "name": "Dr. Gabriel Lishevitz",
    "specialty": "Endocrinología",
    "kupot": [
      "Leumit"
    ],
    "city": "Beit Shemesh",
    "phone": "02-9661400",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=114920&code=013&doctorType=2&place=4160",
    "address": "Ben Zion Abba Shaul 6, Beit Shemesh"
  },
  {
    "id": "doc-457",
    "name": "Dr. Gabriel Lishevitz",
    "specialty": "Endocrinología",
    "kupot": [
      "Leumit"
    ],
    "city": "Beitar Illit",
    "phone": "02-5887300",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=114920&code=013&doctorType=2&place=4515",
    "address": "Yismach Yisrael 1, Beitar Illit"
  },
  {
    "id": "doc-458",
    "name": "Dr. Gabriel Lishevitz",
    "specialty": "Endocrinología",
    "kupot": [
      "Leumit"
    ],
    "city": "Modi'in",
    "phone": "08-9735222",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=114920&code=013&doctorType=2&place=6290",
    "address": "Emek Beit She'an 30, Modi'in-Maccabim-Re'ut"
  },
  {
    "id": "doc-459",
    "name": "Dr. Gabriel Lishevitz",
    "specialty": "Endocrinología",
    "kupot": [
      "Leumit"
    ],
    "city": "Modi'in Illit",
    "phone": "08-9142500",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=114920&code=013&doctorType=2&place=6300",
    "address": "Netivot HaMishpat 5, Modi'in Illit"
  },
  {
    "id": "doc-460",
    "name": "Dr. Gabriel Lishevitz",
    "specialty": "Endocrinología",
    "kupot": [
      "Leumit"
    ],
    "city": "Jerusalén",
    "phone": "02-5677677",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=114920&code=013&doctorType=2&place=16",
    "address": "Mesilat Yesharim 14, Jerusalén"
  },
  {
    "id": "doc-461",
    "name": "Dr. Nader Majdoub",
    "specialty": "Pediatría",
    "kupot": [
      "Leumit"
    ],
    "city": "Kiryat Gat",
    "phone": "08-6114400",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=180147&code=037&doctorType=2&place=4767",
    "address": "Netivot Shalom 16, Kiryat Gat"
  },
  {
    "id": "doc-462",
    "name": "Dr. Emmanuel Motahadeh",
    "specialty": "Pediatría",
    "kupot": [
      "Leumit"
    ],
    "city": "Modi'in Illit",
    "phone": "08-9142500",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=22023&code=037&doctorType=2&place=6300",
    "address": "Netivot HaMishpat 5, Modi'in Illit"
  },
  {
    "id": "doc-463",
    "name": "Dr. Emmanuel Motahadeh",
    "specialty": "Pediatría",
    "kupot": [
      "Leumit"
    ],
    "city": "Modi'in Illit",
    "phone": "08-6855100",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=22023&code=037&doctorType=2&place=6293",
    "address": "Rashba 7, Modi'in Illit"
  },
  {
    "id": "doc-464",
    "name": "Dr. Rasha Musleh",
    "specialty": "Oftalmología pediátrica",
    "kupot": [
      "Leumit"
    ],
    "city": "Bnei Brak",
    "phone": "03-6717700",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=130091&code=056&doctorType=2&place=4541",
    "address": "HaRav Kahaneman 86, Bnei Brak"
  },
  {
    "id": "doc-465",
    "name": "Dr. Dona Cohen Moritz",
    "specialty": "Enfermedades infecciosas",
    "kupot": [
      "Leumit"
    ],
    "city": "Beit Shemesh",
    "phone": "02-6664700",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=174141&code=066&doctorType=2&place=6383",
    "address": "Roi Klein 19, Beit Shemesh"
  },
  {
    "id": "doc-466",
    "name": "Dr. Dona Cohen Moritz",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Leumit"
    ],
    "city": "Beit Shemesh",
    "phone": "02-5953777",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=174141&code=001&doctorType=2&place=4418",
    "address": "Habaqquq HaNavi 11, Beit Shemesh"
  },
  {
    "id": "doc-467",
    "name": "Dr. Michal Rivka Miller",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Leumit"
    ],
    "city": "Cruce de Gush Etzion",
    "phone": "02-5698400",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=197783&code=001&doctorType=2&place=6571",
    "address": ", Cruce de Gush Etzion"
  },
  {
    "id": "doc-468",
    "name": "Dr. Markesa Maman",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Leumit"
    ],
    "city": "Modi'in Illit",
    "phone": "08-9142500",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=35434&code=001&doctorType=2&place=6300",
    "address": "Netivot HaMishpat 5, Modi'in Illit"
  },
  {
    "id": "doc-469",
    "name": "Dr. Markesa Maman",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Leumit"
    ],
    "city": "Modi'in Illit",
    "phone": "08-9770600",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=35434&code=001&doctorType=2&place=6296",
    "address": "Rashbi 1, Modi'in Illit"
  },
  {
    "id": "doc-470",
    "name": "Dr. Natalie Zehava Marmur",
    "specialty": "Cirugía Plástica",
    "kupot": [
      "Leumit"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "03-6970306",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=149764&code=025&doctorType=1&place=5",
    "address": "Haftman 4, Tel Aviv"
  },
  {
    "id": "doc-471",
    "name": "Dr. Luciano Gabriel Segal",
    "specialty": "Pediatría",
    "kupot": [
      "Leumit"
    ],
    "city": "Or Akiva",
    "phone": "04-6260516",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=115595&code=037&doctorType=2&place=4559",
    "address": "HaShikmim 8, Or Akiva"
  },
  {
    "id": "doc-472",
    "name": "Dr. Luciano Gabriel Segal",
    "specialty": "Pediatría",
    "kupot": [
      "Leumit"
    ],
    "city": "Netanya",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=115595&code=037&doctorType=2&place=5633",
    "address": "Yad Harutzim 19, Netanya"
  },
  {
    "id": "doc-473",
    "name": "Dr. Rafael Sukenik",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Leumit"
    ],
    "city": "Bnei Brak",
    "phone": "03-5778700",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=20238&code=001&doctorType=2&place=4556",
    "address": "Yehuda HaLevi 1, Bnei Brak"
  },
  {
    "id": "doc-474",
    "name": "Dr. Rafael Sukenik",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Leumit"
    ],
    "city": "Netanya",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=20238&code=001&doctorType=2&place=5633",
    "address": "Yad Harutzim 19, Netanya"
  },
  {
    "id": "doc-475",
    "name": "Dr. Rafael Sukenik",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Leumit"
    ],
    "city": "Bnei Brak",
    "phone": "03-6465500",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=20238&code=001&doctorType=2&place=6323",
    "address": "HaHalutzim 20, Bnei Brak"
  },
  {
    "id": "doc-476",
    "name": "Dr. Denis Sitrin",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Leumit"
    ],
    "city": "Givatayim",
    "phone": "03-7317211",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=168823&code=001&doctorType=2&place=3159",
    "address": "Katzenelson 2, Givatayim"
  },
  {
    "id": "doc-477",
    "name": "Dr. Oksana Sapir",
    "specialty": "Ginecología",
    "kupot": [
      "Leumit"
    ],
    "city": "Lod",
    "phone": "08-9188500",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=200318&code=005&doctorType=2&place=3730",
    "address": "Arba HaOnot 14, Lod"
  },
  {
    "id": "doc-478",
    "name": "Dr. Oksana Sapir",
    "specialty": "Ginecología",
    "kupot": [
      "Leumit"
    ],
    "city": "Lod",
    "phone": "08-6777200",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=200318&code=005&doctorType=2&place=5814",
    "address": "Harav Elyashiv 6, Lod"
  },
  {
    "id": "doc-479",
    "name": "Dr. Oksana Sapir",
    "specialty": "Ginecología",
    "kupot": [
      "Leumit"
    ],
    "city": "Lod",
    "phone": "08-9180400",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=200318&code=005&doctorType=2&place=3731",
    "address": "Kikar HaPalmach 1, Lod"
  },
  {
    "id": "doc-480",
    "name": "Dr. Oksana Sapir",
    "specialty": "Ginecología",
    "kupot": [
      "Leumit"
    ],
    "city": "Bat Yam",
    "phone": "03-5556900",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=200318&code=005&doctorType=2&place=106",
    "address": "Mokhrei HaSigariyot 3, Bat Yam"
  },
  {
    "id": "doc-481",
    "name": "Dr. Oksana Sapir",
    "specialty": "Ginecología",
    "kupot": [
      "Leumit"
    ],
    "city": "Ramla",
    "phone": "08-9543300",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=200318&code=005&doctorType=2&place=6268",
    "address": "Mas Dani 13, Ramla"
  },
  {
    "id": "doc-482",
    "name": "Dr. Naser Amer",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Leumit"
    ],
    "city": "Deir Hanna",
    "phone": "04-6959578",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=88693&code=001&doctorType=2&place=3931",
    "address": "Kfar Deir Hanna, Deir Hanna"
  },
  {
    "id": "doc-483",
    "name": "Dr. Einat Oz Markushamer",
    "specialty": "Ginecología",
    "kupot": [
      "Leumit"
    ],
    "city": "Netanya",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=135855&code=005&doctorType=2&place=6065",
    "address": "HaHarutzim, Netanya"
  },
  {
    "id": "doc-484",
    "name": "Dr. Einat Oz Markushamer",
    "specialty": "Ginecología",
    "kupot": [
      "Leumit"
    ],
    "city": "Bnei Brak",
    "phone": "03-7435300",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=135855&code=005&doctorType=2&place=5459",
    "address": "Hazon Ish 89, Bnei Brak"
  },
  {
    "id": "doc-485",
    "name": "Dr. Haim Amar",
    "specialty": "Pediatría",
    "kupot": [
      "Leumit"
    ],
    "city": "Ashdod",
    "phone": "08-8590800",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=134101&code=037&doctorType=2&place=175",
    "address": "Hanna Senesh 1, Ashdod"
  },
  {
    "id": "doc-486",
    "name": "Dr. Ilana Fund",
    "specialty": "Ginecología",
    "kupot": [
      "Leumit"
    ],
    "city": "Jerusalén",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=158107&code=005&doctorType=2&place=6066",
    "address": ".., Jerusalén"
  },
  {
    "id": "doc-487",
    "name": "Dr. Ilana Fund",
    "specialty": "Ginecología",
    "kupot": [
      "Leumit"
    ],
    "city": "Beit Shemesh",
    "phone": "02-5492200",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=158107&code=005&doctorType=2&place=6269",
    "address": "Harav Menachem Porush 1, Beit Shemesh"
  },
  {
    "id": "doc-488",
    "name": "Dr. Yael Pasternak",
    "specialty": "Embarazo de Alto Riesgo",
    "kupot": [
      "Leumit"
    ],
    "city": "Netanya",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=119419&code=116&doctorType=2&place=6065",
    "address": "HaHarutzim, Netanya"
  },
  {
    "id": "doc-489",
    "name": "Dr. Yael Pasternak",
    "specialty": "Embarazo de Alto Riesgo",
    "kupot": [
      "Leumit"
    ],
    "city": "Herzliya",
    "phone": "09-9727500",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=119419&code=116&doctorType=2&place=3162",
    "address": "Herzog 13, Herzliya"
  },
  {
    "id": "doc-490",
    "name": "Dr. Yael Pasternak",
    "specialty": "Embarazo de Alto Riesgo",
    "kupot": [
      "Leumit"
    ],
    "city": "Raanana",
    "phone": "09-7487016",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=119419&code=116&doctorType=2&place=3236",
    "address": "Jerusalén 32, Ra'anana"
  },
  {
    "id": "doc-491",
    "name": "Dr. Gabriela Friedman",
    "specialty": "Pediatría",
    "kupot": [
      "Leumit"
    ],
    "city": "Haifa",
    "phone": "04-8607800",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=25625&code=037&doctorType=2&place=68",
    "address": "Khuri 2, Haifa"
  },
  {
    "id": "doc-492",
    "name": "Dr. Fernando Chernomordik",
    "specialty": "Cardiología",
    "kupot": [
      "Leumit"
    ],
    "city": "Ashkelon",
    "phone": "08-6790555",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=114578&code=010&doctorType=2&place=4605",
    "address": "Katzenelson 10, Ashkelon"
  },
  {
    "id": "doc-493",
    "name": "Dr. Michael Kaufman",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Leumit"
    ],
    "city": "Nof Ayalon",
    "phone": "057-8411239",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=22472&code=001&doctorType=2&place=3962",
    "address": "Ariel 21, Nof Ayalon"
  },
  {
    "id": "doc-494",
    "name": "Dr. Michael Kaufman",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Leumit"
    ],
    "city": "Modi'in",
    "phone": "08-9735222",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=22472&code=001&doctorType=2&place=6290",
    "address": "Emek Beit She'an 30, Modiin-Maccabim-Reut"
  },
  {
    "id": "doc-495",
    "name": "Dr. Paula Andrea Klein Shaul",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Leumit"
    ],
    "city": "Beit Shemesh",
    "phone": "02-9919923",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=178632&code=001&doctorType=2&place=4053",
    "address": "Rib'l 3, Beit Shemesh"
  },
  {
    "id": "doc-496",
    "name": "Dr. Paula Andrea Klein Shaul",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Leumit"
    ],
    "city": "Beitar Illit",
    "phone": "02-5806868",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=178632&code=001&doctorType=2&place=4514",
    "address": "Mifal HaShas 33, Beitar Illit"
  },
  {
    "id": "doc-497",
    "name": "Dr. Paula Andrea Klein Shaul",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Leumit"
    ],
    "city": "Beitar Illit",
    "phone": "02-5480888",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=178632&code=001&doctorType=2&place=4522",
    "address": "Elazar HaModai 1, Beitar Illit"
  },
  {
    "id": "doc-498",
    "name": "Dr. Gerardo Gabriel Camario Sepeda",
    "specialty": "Cirugía General",
    "kupot": [
      "Leumit"
    ],
    "city": "Netanya",
    "phone": "09-8607222",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=135965&code=003&doctorType=2&place=79",
    "address": "Stampfer 17, Netanya"
  },
  {
    "id": "doc-499",
    "name": "Dr. Ilan Rabay",
    "specialty": "Cardiología",
    "kupot": [
      "Leumit"
    ],
    "city": "Netanya",
    "phone": "09-8607222",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=100794&code=010&doctorType=2&place=79",
    "address": "Stampfer 17, Netanya"
  },
  {
    "id": "doc-500",
    "name": "Dr. Yair Rubinstein",
    "specialty": "Oftalmología",
    "kupot": [
      "Leumit"
    ],
    "city": "Rehovot",
    "phone": "053-9957023",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=89751&code=006&doctorType=2&place=5827",
    "address": "Horovitz 27, Rejovot"
  },
  {
    "id": "doc-501",
    "name": "Dr. Adi Rom Broida",
    "specialty": "Reumatología/Articulaciones",
    "kupot": [
      "Leumit"
    ],
    "city": "Hadera",
    "phone": "04-8684400",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=85125&code=014&doctorType=2&place=6023",
    "address": "Gamla 3, Hadera"
  },
  {
    "id": "doc-502",
    "name": "Dr. Adi Rom Broida",
    "specialty": "Reumatología/Articulaciones",
    "kupot": [
      "Leumit"
    ],
    "city": "Netanya",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=85125&code=014&doctorType=2&place=5633",
    "address": "Yad Harutzim 19, Netanya"
  },
  {
    "id": "doc-503",
    "name": "Dr. Herzl Shabtai",
    "specialty": "Neurología",
    "kupot": [
      "Leumit"
    ],
    "city": "Bnei Brak",
    "phone": "03-5778700",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=20193&code=008&doctorType=2&place=4556",
    "address": "Yehuda Halevi 1, Bnei Brak"
  },
  {
    "id": "doc-504",
    "name": "Dr. Yoel Shifter",
    "specialty": "Gastroenterología",
    "kupot": [
      "Leumit"
    ],
    "city": "Jerusalén",
    "phone": "02-6461222",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=131355&code=015&doctorType=2&place=22",
    "address": "Tzvia VeYitzhak 5, Jerusalén"
  },
  {
    "id": "doc-505",
    "name": "Dr. Caroline Sharvit Ben David",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Leumit"
    ],
    "city": "Netanya",
    "phone": "09-9662670",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=174351&code=001&doctorType=2&place=4251",
    "address": "Berman Bnei 2, Netanya"
  },
  {
    "id": "doc-506",
    "name": "Dr. Caroline Sharvit Ben David",
    "specialty": "Medicina Familiar",
    "kupot": [
      "Leumit"
    ],
    "city": "Netanya",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=174351&code=001&doctorType=2&place=5633",
    "address": "Yad Harutzim 19, Netanya"
  },
  {
    "id": "doc-507",
    "name": "Dr. Oleg Odovichenko",
    "specialty": "Ver especialidad en la ficha oficial",
    "kupot": [
      "Leumit"
    ],
    "city": "Tiberias",
    "phone": "04-8134300",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=177961&code=None&doctorType=2&place=6387",
    "address": "HaNasi Weizmann 46, Tiberias"
  },
  {
    "id": "doc-508",
    "name": "Dr. Galya Mazor",
    "specialty": "Ver especialidad en la ficha oficial",
    "kupot": [
      "Leumit"
    ],
    "city": "Yokneam Illit",
    "phone": "04-9091900",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Leumit (leumit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Leumit",
    "reviews": [],
    "officialLink": "https://leumit.co.il/doctorssearch/doctorssearchresults/doctor/?licenseId=13067&code=None&doctorType=2&place=4490",
    "address": "HaHardufim 20, Yokneam Illit"
  },
  {
    "id": "doc-509",
    "name": "Dr. César Mizrahi",
    "specialty": "Ortopedia de columna vertebral",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Netanya",
    "phone": "*3833 / 09-8601333",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/001518500082500127000000000000_99",
    "address": "Smilansky 20, Netanya"
  },
  {
    "id": "doc-510",
    "name": "Prof. Yishai Lichter",
    "specialty": "Gastroenterología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Haifa",
    "phone": "04-8255401",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000176260042000013000000000000_99",
    "address": "Oren 15, Haifa"
  },
  {
    "id": "doc-511",
    "name": "Dr. Moshe Gips",
    "specialty": "Cirugía",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Petah Tikva",
    "phone": "03-9130921 / 053-9955413",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000144880169400103000000000000_99",
    "address": "HaHistadrut 26, Petaj Tikvá"
  },
  {
    "id": "doc-512",
    "name": "Dr. Shlomo Gur",
    "specialty": "Oftalmología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Netanya",
    "phone": "09-8610767",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000143160082800153000000000000_99",
    "address": "Smilansky 33, Netanya"
  },
  {
    "id": "doc-513",
    "name": "Dr. Shmuel Bar",
    "specialty": "Oftalmología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Petah Tikva",
    "phone": "053-9955389 / 03-9040880",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000139990088600153000000000000_99",
    "address": "Spiegel Zisa 3, Petaj Tikvá"
  },
  {
    "id": "doc-514",
    "name": "Dr. Eliezer Ariam",
    "specialty": "Otorrinolaringología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Kadima",
    "phone": "09-8991587",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000127030234700163000000000000_99",
    "address": "Ahad Ha'am 35, Kadima"
  },
  {
    "id": "doc-515",
    "name": "Dr. Eliezer Ariam",
    "specialty": "Otorrinolaringología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Kadima",
    "phone": "09-8919129",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000127030211600163000000000000_99",
    "address": "HaHasida, Kadima"
  },
  {
    "id": "doc-516",
    "name": "Dr. Eliezer Ariam",
    "specialty": "Otorrinolaringología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Kafr Bara",
    "phone": "03-9102770",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000127030170000163000000000000_99",
    "address": "HaShkhuna HaMizrahit, Kafr Bara"
  },
  {
    "id": "doc-517",
    "name": "Dr. Eliezer Ariam",
    "specialty": "Otorrinolaringología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Netanya",
    "phone": "*3833 / 09-8640100",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000127030112500163000000000000_99",
    "address": "Pinhas Lavon 18, Netanya"
  },
  {
    "id": "doc-518",
    "name": "Dr. Eliezer Ariam",
    "specialty": "Otorrinolaringología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Netanya",
    "phone": "09-8611112",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000127030083200163000000000000_99",
    "address": "Krauze 10, Netanya"
  },
  {
    "id": "doc-519",
    "name": "Dr. Gabriel Kriper",
    "specialty": "Psiquiatría",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Kiryat Yam",
    "phone": "04-9074000",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/001826430939900812000000000000_0",
    "address": "Iris 1, Kiryat Yam"
  },
  {
    "id": "doc-520",
    "name": "Dr. Melanie Yael Misler",
    "specialty": "Oftalmología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Lod",
    "phone": "*3833 / 08-6606000 / 08-6606001",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/001526090947000153000000000000_0",
    "address": "Baal HaTanya 1, Lod"
  },
  {
    "id": "doc-521",
    "name": "Dr. Tamer Khreish",
    "specialty": "Urgencias híbridas",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "*3833",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/001522690955300181000000000000_100",
    "address": "Ibn Gabirol 124, Tel Aviv"
  },
  {
    "id": "doc-522",
    "name": "Dr. Uri Rosen",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "*3833 / 03-6941555",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/001422990974800004000000000000_0",
    "address": "Derekh Dayan Moshe 66, Tel Aviv"
  },
  {
    "id": "doc-523",
    "name": "Dr. Uri Rosen",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "*3833 / 03-6941555",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/001422990058100004000000000000_0",
    "address": "Shprinzak 15, Tel Aviv"
  },
  {
    "id": "doc-524",
    "name": "Dr. Sarah Ashkenazi",
    "specialty": "Pediatría",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Yad Binyamin",
    "phone": "*3833 / 08-6520443",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/001196290580000312000000000000_0",
    "address": "Derekh Yonatan, Yad Binyamin"
  },
  {
    "id": "doc-525",
    "name": "Dr. Sarah Ashkenazi",
    "specialty": "Pediatría",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Yad Binyamin",
    "phone": "08-6520443",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/001196290297400312000000000000_0",
    "address": "HaRimon 6, Yad Binyamin"
  },
  {
    "id": "doc-526",
    "name": "Dr. Gabriel Lishvitz",
    "specialty": "Endocrinología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Beit Shemesh",
    "phone": "*3833 / 02-5301000",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/001149200950700014000000000000_0",
    "address": "Devorah HaNeviah, Beit Shemesh"
  },
  {
    "id": "doc-527",
    "name": "Dr. Gabriel Lishevitz",
    "specialty": "Endocrinología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Jerusalén",
    "phone": "02-6442999",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/001149200946800014000000000000_0",
    "address": "HaPisga 20, Jerusalén"
  },
  {
    "id": "doc-528",
    "name": "Dr. Gabriel Lishevitz",
    "specialty": "Endocrinología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Jerusalén",
    "phone": "*3833 / 02-5312777",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/001149200937200014000000000000_0",
    "address": "Haggai 22, Jerusalén"
  },
  {
    "id": "doc-529",
    "name": "Dr. Gabriel Lishevitz",
    "specialty": "Endocrinología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Jerusalén",
    "phone": "02-5770820",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/001149200185600014000000000000_0",
    "address": "Yafo 208, Jerusalén"
  },
  {
    "id": "doc-530",
    "name": "Dr. Muhammad Salem",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Giv'at Ze'ev",
    "phone": "*3833 / 02-5360333",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/001057490190000001000000000000_0",
    "address": "HaMakabim 48, Giv'at Ze'ev"
  },
  {
    "id": "doc-531",
    "name": "Dr. Alexandra Erlich",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Modi'in",
    "phone": "08-9737000",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/001041650228800004000000000000_0",
    "address": "Lev HaIr 16, Modiin-Maccabim-Reut"
  },
  {
    "id": "doc-532",
    "name": "Dr. Maya Topilski Dahan",
    "specialty": "Obstetricia y Ginecología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Kfar Chabad",
    "phone": "03-9552600",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000932130905400613000000000000_0",
    "address": "HaRabi MiLubavitch 4, Kfar Chabad"
  },
  {
    "id": "doc-533",
    "name": "Dr. Ida Roisman",
    "specialty": "Pediatría",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Kadima",
    "phone": "09-8919129",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000885810211600312000000000000_0",
    "address": "HaHasida, Kadima"
  },
  {
    "id": "doc-534",
    "name": "Dr. Shirley Saig",
    "specialty": "Pediatría",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Jerusalén",
    "phone": "02-5710355",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000845140989400312000000000000_0",
    "address": "Mintz 1, Jerusalén"
  },
  {
    "id": "doc-535",
    "name": "Dr. Shirley Saig",
    "specialty": "Pediatría",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Jerusalén",
    "phone": "02-5437700",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000845140937000312000000000000_0",
    "address": "Sderot Golda Meir 255, Jerusalén"
  },
  {
    "id": "doc-536",
    "name": "Dr. Ami Werber",
    "specialty": "Medicina del Dolor",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Rehovot",
    "phone": "053-9956812",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000381790313800050000000000000_0",
    "address": "Eli Horovitz 12, Rejovot"
  },
  {
    "id": "doc-537",
    "name": "Dr. Bat Goldstein",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Jerusalén",
    "phone": "02-5815444",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000377020322400213000000000000_0",
    "address": "HaHagana 21, Jerusalén"
  },
  {
    "id": "doc-538",
    "name": "Dr. Gila Buskila",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Haifa",
    "phone": "*3833",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000366070997100004002693100001_0",
    "address": "Simha Golan 54, Haifa"
  },
  {
    "id": "doc-539",
    "name": "Dr. Xavier Pilz",
    "specialty": "Cardiología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Rishon LeZion",
    "phone": "*3833 / 03-9480808",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000357290224200010000000000000_0",
    "address": "Pika 31, Rishon LeZion"
  },
  {
    "id": "doc-540",
    "name": "Dr. Xavier Pilz",
    "specialty": "Cardiología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Eilat",
    "phone": "08-6300800",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000357290014200010000000000000_0",
    "address": "Sderot Sheshet HaYamim 310, Eilat"
  },
  {
    "id": "doc-541",
    "name": "Dr. Yaron Stanovski",
    "specialty": "Cardiología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Be'er Sheva",
    "phone": "08-6248000",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000340370245500010000000000000_0",
    "address": "Yitzhak Ben Zvi 9, Beer Sheva"
  },
  {
    "id": "doc-542",
    "name": "Dr. Yaron Stanovski",
    "specialty": "Insuficiencia Cardíaca",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Ashkelon",
    "phone": "08-6741741 / 08-6734739",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000340370197300805000000000000_0",
    "address": "HaGvura 11, Ashkelon"
  },
  {
    "id": "doc-543",
    "name": "Dr. Yaron Stanovski",
    "specialty": "Cardiología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Lod",
    "phone": "08-9520404",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000340370124800010000000000000_0",
    "address": "HaNasi 11, Lod"
  },
  {
    "id": "doc-544",
    "name": "Dr. Nick Beilinson",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Herzliya",
    "phone": "*3833 / 09-9574236",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000336820231300213000000000000_0",
    "address": "Ben Gurion 2, Herzliya"
  },
  {
    "id": "doc-545",
    "name": "Dr. Tatiana Vartenstein",
    "specialty": "Trastornos por déficit de atención e hiperactividad",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Kfar Saba",
    "phone": "09-7482230",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000336230314600991000000000000_0",
    "address": "Rappaport 3, Kfar Saba"
  },
  {
    "id": "doc-546",
    "name": "Dr. Tatiana Vartenstein",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Kfar Saba",
    "phone": "09-7641222",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000336230074800213000000000000_0",
    "address": "HaMeyasdim 20, Kfar Saba"
  },
  {
    "id": "doc-547",
    "name": "Prof. Ariel Tenenbaum",
    "specialty": "Pediatría",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Jerusalén",
    "phone": "02-6548666",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000292860146400312000000000000_0",
    "address": "Elkabetz 1, Jerusalén"
  },
  {
    "id": "doc-548",
    "name": "Dr. Meir Hager Elhart",
    "specialty": "Obstetricia y Ginecología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Jerusalén",
    "phone": "02-5789800",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000276080218100613000000000000_0",
    "address": "Reshit Hokhma 23, Jerusalén"
  },
  {
    "id": "doc-549",
    "name": "Prof. Ariel Rogin",
    "specialty": "Cardiología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Zikhron Yaakov",
    "phone": "04-6299111",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000273570109300010000000000000_0",
    "address": "HaDagan 2, Zikhron Yaakov"
  },
  {
    "id": "doc-550",
    "name": "Prof. Ariel Rogin",
    "specialty": "Cardiología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Haifa",
    "phone": "04-8117117",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000273570047200010000000000000_0",
    "address": "Smolenskin 3, Haifa"
  },
  {
    "id": "doc-551",
    "name": "Dr. Gabriel Rosenstein",
    "specialty": "Cardiología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Be'er Sheva",
    "phone": "08-6248000",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000271770245500010000000000000_0",
    "address": "Yitzhak Ben Zvi 9, Beer Sheva"
  },
  {
    "id": "doc-552",
    "name": "Dr. Graciela Finkel",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "*3833 / 03-5220722",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000253900057100001000000000000_0",
    "address": "Reines 18, Tel Aviv"
  },
  {
    "id": "doc-553",
    "name": "Dr. Daniel Katz",
    "specialty": "Pediatría",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Rehovot",
    "phone": "*3833 / 08-9399444",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000231810577900312000000000000_0",
    "address": "Binyamin 4, Rejovot"
  },
  {
    "id": "doc-554",
    "name": "Dr. Reuven Singer",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Rehovot",
    "phone": "077-3301897 / 077-3301895 / 053-9955954",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000231440186500004000000000000_0",
    "address": "Herzl 182, Rejovot"
  },
  {
    "id": "doc-555",
    "name": "Dr. Laura Dines Olchowski",
    "specialty": "Dermatología y Venereología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Arara",
    "phone": "04-6354273",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000230420974700003000000000000_0",
    "address": "Estación de servicio Dor Alon, Ar'ara"
  },
  {
    "id": "doc-556",
    "name": "Dr. Laura Dines Olchowski",
    "specialty": "Dermatología y Venereología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Umm al-Fahm",
    "phone": "04-6308383",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000230420560400003000000000000_0",
    "address": "Barrio Al-Shajur, Umm al-Fahm"
  },
  {
    "id": "doc-557",
    "name": "Dr. Laura Dines Olchowski",
    "specialty": "Dermatología y Venereología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Hadera",
    "phone": "04-9110504",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000230420310100003000000000000_0",
    "address": "Sderot Rothschild 21, Hadera"
  },
  {
    "id": "doc-558",
    "name": "Dr. Laura Dines Olchowski",
    "specialty": "Dermatología y Venereología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Kafr Qara",
    "phone": "04-6354047",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000230420293400003000000000000_0",
    "address": "Rehov Al-Mashmash, Kafr Qara"
  },
  {
    "id": "doc-559",
    "name": "Dr. Laura Dines Olchowski",
    "specialty": "Dermatología y Venereología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Baqa al-Gharbiyye",
    "phone": "04-6190444",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000230420116800003000000000000_0",
    "address": "Rehov Mikhlala Al-Qas, Baqa al-Gharbiyye"
  },
  {
    "id": "doc-560",
    "name": "Dr. Daniel Katz",
    "specialty": "Pediatría",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Rehovot",
    "phone": "*3833 / 08-9399444",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000231810095300312000000000000_0",
    "address": "Binyamin 23, Rejovot"
  },
  {
    "id": "doc-561",
    "name": "Dr. Héctor Roizin",
    "specialty": "Pediatría",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Rishon LeZion",
    "phone": "03-9617426",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000223090090900312000000000000_0",
    "address": "HaYekinton 1, Rishon LeZion"
  },
  {
    "id": "doc-562",
    "name": "Dr. Daniel Karpf",
    "specialty": "Urología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Ma'alot-Tarshiha",
    "phone": "04-9079111",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000214970584800844000000000000_0",
    "address": "Uzi Narkis, Ma'alot-Tarshiha"
  },
  {
    "id": "doc-563",
    "name": "Dr. Daniel Karpf",
    "specialty": "Urología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Karmiel",
    "phone": "*3833 / 04-9087111",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000214970571300844000000000000_0",
    "address": "Morad HaGai 100, Karmiel"
  },
  {
    "id": "doc-564",
    "name": "Dr. Daniel Karpf",
    "specialty": "Urología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Kiryat Bialik",
    "phone": "04-8471515",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000214970111100844000000000000_0",
    "address": "Sderot Weizmann 27, Kiryat Bialik"
  },
  {
    "id": "doc-565",
    "name": "Dr. Daniel Karpf",
    "specialty": "Urología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Zikhron Yaakov",
    "phone": "04-6299111",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000214970109300844000000000000_0",
    "address": "HaDagan 2, Zikhron Yaakov"
  },
  {
    "id": "doc-566",
    "name": "Dr. Daniel Karpf",
    "specialty": "Urología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Kiryat Ata",
    "phone": "04-8430111",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000214970074100844000000000000_0",
    "address": "Zevulun 13, Kiryat Ata"
  },
  {
    "id": "doc-567",
    "name": "Dr. Daniel Karpf",
    "specialty": "Urología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Kafr Kanna",
    "phone": "04-6413700",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000214970005100844000000000000_0",
    "address": "Clínica del pueblo, zona, Kafr Kanna"
  },
  {
    "id": "doc-568",
    "name": "Dr. Ilana Hasson",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Jerusalén",
    "phone": "02-5801800",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000213610909900001000000000000_0",
    "address": "Man 2, Jerusalén"
  },
  {
    "id": "doc-569",
    "name": "Dr. Mario Zalts",
    "specialty": "Oftalmología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Pardes Hanna - Karkur",
    "phone": "04-6231366",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000212720930700153000000000000_0",
    "address": "HaOranim 10, Pardes Hanna-Karkur"
  },
  {
    "id": "doc-570",
    "name": "Dr. Clara Aleini",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Raanana",
    "phone": "*3833 / 09-7426117",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000207990174400001000000000000_0",
    "address": "Shivtei Israel 27, Ra'anana"
  },
  {
    "id": "doc-571",
    "name": "Dr. Bernardo Strauss",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Kfar Saba",
    "phone": "09-7425998",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000203610992200001000000000000_0",
    "address": "Weizmann 83, Kfar Saba"
  },
  {
    "id": "doc-572",
    "name": "Dr. Eva Weinstock",
    "specialty": "Oftalmología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Ashkelon",
    "phone": "*3833 / 08-6741741",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000201030197300153000000000000_0",
    "address": "HaGvura 11, Ashkelon"
  },
  {
    "id": "doc-573",
    "name": "Dr. Baruj Klein",
    "specialty": "Cirugía",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Giv'at Ze'ev",
    "phone": "02-6266000",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000201010325000103000000000000_0",
    "address": "HaAyelot 41, Giv'at Ze'ev"
  },
  {
    "id": "doc-574",
    "name": "Dr. Baruj Klein",
    "specialty": "Cirugía",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Beit Shemesh",
    "phone": "*3833 / 02-9905444",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000201010301600103000000000000_0",
    "address": "Derekh Yitzhak Rabin 2, Beit Shemesh"
  },
  {
    "id": "doc-575",
    "name": "Dr. Baruj Klein",
    "specialty": "Cirugía",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Jerusalén",
    "phone": "02-6548666",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000201010146400103000000000000_0",
    "address": "Elkabetz 1, Jerusalén"
  },
  {
    "id": "doc-576",
    "name": "Dr. Armando Brent",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "*3833 / 03-5562454",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000198090306600004000000000000_0",
    "address": "Sderot Shaul HaMelekh 8, Tel Aviv"
  },
  {
    "id": "doc-577",
    "name": "Dr. Armando Barent",
    "specialty": "Geriatría",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Holon",
    "phone": "03-5021414",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000198090072700022000000000000_0",
    "address": "Av. Kugel 45, Jolón"
  },
  {
    "id": "doc-578",
    "name": "Dr. Mordechai Karpman",
    "specialty": "Obstetricia y Ginecología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Hod HaSharon",
    "phone": "09-7400874",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000195290174100613000000000000_0",
    "address": "HaBanim 14, Hod HaSharon"
  },
  {
    "id": "doc-579",
    "name": "Dr. Smadar Fink",
    "specialty": "Oftalmología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Holon",
    "phone": "03-5042892",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000194560072000153000000000000_0",
    "address": "Sokolov 36, Jolón"
  },
  {
    "id": "doc-580",
    "name": "Dr. Alex Ginzburg",
    "specialty": "Dermatología y Venereología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Raanana",
    "phone": "09-7603406 / 053-9955907",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000190570103400003000000000000_0",
    "address": "Ahuza 98, Ra'anana"
  },
  {
    "id": "doc-581",
    "name": "Dr. Tsahi Barsheshet",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Netanya",
    "phone": "09-8846310",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000190530082700001000000000000_0",
    "address": "Smilansky 22, Netanya"
  },
  {
    "id": "doc-582",
    "name": "Dr. Carlos Singer",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Pardes Hanna - Karkur",
    "phone": "04-6239888",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000184530085100213000000000000_0",
    "address": "HaDekalim 99, Pardes Hanna-Karkur"
  },
  {
    "id": "doc-583",
    "name": "Dr. Yehuda Schwartz",
    "specialty": "Neumología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Netanya",
    "phone": "053-2121335",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000182520141100007000000000000_0",
    "address": "Pinsker 20, Netanya"
  },
  {
    "id": "doc-584",
    "name": "Dr. Marcelo Greenwald",
    "specialty": "Dermatología y Venereología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Be'er Sheva",
    "phone": "08-6278979 / 053-8411205",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000171500108300003000000000000_0",
    "address": "Av. Yitzhak Rager 28, Beer Sheva"
  },
  {
    "id": "doc-585",
    "name": "Dr. Natan Lederman",
    "specialty": "Gastroenterología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Bat Yam",
    "phone": "*3833 / 076-8134848",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000164050971300013000000000000_0",
    "address": "Naomi Shemer 9, Bat Yam"
  },
  {
    "id": "doc-586",
    "name": "Dr. Natan Lederman",
    "specialty": "Gastroenterología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Holon",
    "phone": "03-6173606",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000164050175400013000000000000_0",
    "address": "HaRav Herzog 16, Jolón"
  },
  {
    "id": "doc-587",
    "name": "Dr. Ze'ev Marmur",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "054-4579391 / 03-5230386",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000154420168500213000000000000_0",
    "address": "Shlomo HaMelech 105, Tel Aviv"
  },
  {
    "id": "doc-588",
    "name": "Dr. Reuven Saranga",
    "specialty": "Urología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "*3833 / 03-7400200",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000152510294700844000000000000_0",
    "address": "Brodetsky 43, Tel Aviv"
  },
  {
    "id": "doc-589",
    "name": "Dr. Reuven Saranga",
    "specialty": "Urología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Ramat Gan",
    "phone": "*3833 / 03-6754343",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000152510102600844000000000000_0",
    "address": "Natan 6, Ramat Gan"
  },
  {
    "id": "doc-590",
    "name": "Dr. Yirmiya Lovash",
    "specialty": "Pediatría",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Haifa",
    "phone": "052-8404052",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000148430166300312000000000000_0",
    "address": "Geula 18, Haifa"
  },
  {
    "id": "doc-591",
    "name": "Dr. Yehoshua Englander",
    "specialty": "Pediatría",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Hod HaSharon",
    "phone": "09-7405332 / 09-7406231",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000145330112200312000000000000_0",
    "address": "Yehoshua Ben Gamla 13, Hod HaSharon"
  },
  {
    "id": "doc-592",
    "name": "Prof. Yosef Zimmerman",
    "specialty": "Gastroenterología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Jerusalén",
    "phone": "02-6442222",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000130250153000013000000000000_0",
    "address": "Uruguay A/3, Jerusalén"
  },
  {
    "id": "doc-593",
    "name": "Dr. Carlos Idses",
    "specialty": "Dermatología y Venereología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Raanana",
    "phone": "*3833 / 09-7713239",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000128360941300003000000000000_0",
    "address": "Arlozorov 2, Ra'anana"
  },
  {
    "id": "doc-594",
    "name": "Dr. Tzvi Rosenfeld",
    "specialty": "Pediatría",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Kiryat Ono",
    "phone": "03-5344471",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000127530919600312000000000000_0",
    "address": "Yerushalayim 39, Kiryat Ono"
  },
  {
    "id": "doc-595",
    "name": "Dr. Moshe Weinstein",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Jerusalén",
    "phone": "050-5898262 / 02-5819329",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/Doctors/000116020323500001000000000000_0",
    "address": "HaHagana 11, Jerusalén"
  },
  {
    "id": "doc-596",
    "name": "Dr. Gabriel Kriper",
    "specialty": "Psiquiatría",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Haifa",
    "phone": "04-8612320",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/MedicalInstitution/098853400182643081200000000000_0",
    "address": "HaNevi'im 18, Haifa"
  },
  {
    "id": "doc-597",
    "name": "Dr. Maximo Meiseles",
    "specialty": "Diabetología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Ramla",
    "phone": "08-9183700",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/MedicalInstitution/090092700015651001900000000000_0",
    "address": "Av. Herzl 59, Ramla"
  },
  {
    "id": "doc-598",
    "name": "Dr. Shahar Auerbach",
    "specialty": "Medicina del Desarrollo Infantil",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Ashdod",
    "phone": "08-8579111",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/MedicalInstitution/056112800121489011000000000000_0",
    "address": "Rogozin 41, Ashdod"
  },
  {
    "id": "doc-599",
    "name": "Dr. Maximo Meiseles",
    "specialty": "Diabetología",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Ashkelon",
    "phone": "08-6741741",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/MedicalInstitution/019732700015651001900000000000_0",
    "address": "HaGevura 11, Ashkelon"
  },
  {
    "id": "doc-600",
    "name": "Dr. Shahar Auerbach",
    "specialty": "Pediatría de Hospitalización de Día",
    "kupot": [
      "Meuhedet"
    ],
    "city": "Ashdod",
    "phone": "08-8549777",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Meuhedet (meuhedet.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Meuhedet",
    "reviews": [],
    "officialLink": "https://www.meuhedet.co.il/poi/MedicalInstitution/000274200121489011200000000000_0",
    "address": "Keren HaYesod 8, Ashdod"
  },
  {
    "id": "doc-601",
    "name": "Dr. Ronit Einav-Bachar",
    "specialty": "Pediatría",
    "kupot": [
      "Clalit"
    ],
    "city": "Kokhav Yair",
    "phone": "09-7934600",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=121630&eservicecode=40&employeeid=C447D012E7EDD1204A1C5E05C90BCAFE",
    "address": "Basalt 7, Kokhav Yair, 2.ª planta, centro comercial Mitzpe Sapir, zona industrial de Tzur Yigal"
  },
  {
    "id": "doc-602",
    "name": "Dr. Menachem Singer",
    "specialty": "Ortopedia Pediátrica",
    "kupot": [
      "Clalit"
    ],
    "city": "Hod HaSharon",
    "phone": "09-7481816 / 09-7487744",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=999004046&eservicecode=494&employeeid=E68BFDC79A463EB740983EF37BD39101",
    "address": "Derekh Ramatayim 96, Hod HaSharon"
  },
  {
    "id": "doc-603",
    "name": "Prof. Naftali (Heinrich) Freud",
    "specialty": "Cirugía Pediátrica",
    "kupot": [
      "Clalit"
    ],
    "city": "Petah Tikva",
    "phone": "03-7419772 / 03-9306449",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=999002820&eservicecode=404&employeeid=DACE5F07B3C40C5E586E22ACB20BA3D8",
    "address": "Herman Zvi Shapira 43, Petaj Tikvá"
  },
  {
    "id": "doc-604",
    "name": "Dr. Aharon Shiff",
    "specialty": "Tratamiento de los Trastornos por Déficit de Atención e Hiperactividad",
    "kupot": [
      "Clalit"
    ],
    "city": "Haifa",
    "phone": "053-9956970 / 073-3906600",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=999009064&eservicecode=1492&employeeid=CE1864DC6C384BA1D53162B2FA4A0AFD",
    "address": "Albert Einstein 139, Haifa"
  },
  {
    "id": "doc-605",
    "name": "Dr. Eduardo Podlishevski",
    "specialty": "Psiquiatría",
    "kupot": [
      "Clalit"
    ],
    "city": "Ganei Tikva",
    "phone": "03-5348814 / 050-6263540",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=999011193&eservicecode=71&employeeid=1B54E1DFC72A88213587D28DF283479F",
    "address": "Derekh HaMeshi 15 / 39, Ganei Tikva"
  },
  {
    "id": "doc-606",
    "name": "Dr. Amir Hasharoni",
    "specialty": "Ortopedia",
    "kupot": [
      "Clalit"
    ],
    "city": "Holon",
    "phone": "03-5616500",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=999010594&eservicecode=58&employeeid=8A0D4CFA2EB707732737012C7056A28A",
    "address": "HaRokmim 21, Jolón"
  },
  {
    "id": "doc-607",
    "name": "Dr. Nissim Aloni",
    "specialty": "Tratamiento del Dolor",
    "kupot": [
      "Clalit"
    ],
    "city": "Rosh HaAyin",
    "phone": "*2700",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=45620&eservicecode=35&employeeid=1AF165866B1798A1510E4EBFB0EF2CD5",
    "address": "Nisim Aloni 2, Rosh HaAyin, esquina con Yigal Alon"
  },
  {
    "id": "doc-608",
    "name": "Dr. Yuval Kaufman",
    "specialty": "Ginecología",
    "kupot": [
      "Clalit"
    ],
    "city": "Haifa",
    "phone": "072-3728083 / 073-3869130",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=999005966&eservicecode=63&employeeid=1422F837E33A398DEDC2E70B019C55FB",
    "address": "Shderot HaHistadrut 55, Haifa"
  },
  {
    "id": "doc-609",
    "name": "Prof. Avner Shemer",
    "specialty": "Dermatología",
    "kupot": [
      "Clalit"
    ],
    "city": "Netanya",
    "phone": "073-3746169 / 077-5610063",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=999005489&eservicecode=31&employeeid=91FE3E0F7DDBFE5DC1039972923F0B82",
    "address": "HaTzoran 2, Netanya"
  },
  {
    "id": "doc-610",
    "name": "Dr. Simonet Ben-Shlush Shraga",
    "specialty": "Oftalmología",
    "kupot": [
      "Clalit"
    ],
    "city": "Kfar Saba",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=121190&eservicecode=61&employeeid=C760A2842A91F702D8BD23288A0AC9A5",
    "address": "Ben Gurion 43, Kfar Saba, primera y segunda planta"
  },
  {
    "id": "doc-611",
    "name": "Dr. Mohamed Taha",
    "specialty": "Otorrinolaringología",
    "kupot": [
      "Clalit"
    ],
    "city": "Kafr Qasim",
    "phone": "052-3222401",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=999010568&eservicecode=62&employeeid=B39A72529C2D3EEAB70CA91D2C4C2B8B",
    "address": "A-Sultani 27, Kafr Qasim"
  },
  {
    "id": "doc-612",
    "name": "Dr. Silvia Zelikovich",
    "specialty": "Psiquiatría infantil y del adolescente",
    "kupot": [
      "Clalit"
    ],
    "city": "Hod HaSharon",
    "phone": "054-6377392",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=999006559&eservicecode=73&employeeid=2314DB238E922D6E6EABC24995AFC556",
    "address": "Jabotinsky 91, Hod HaSharon"
  },
  {
    "id": "doc-613",
    "name": "Dr. José Ben Dahan",
    "specialty": "Proctología",
    "kupot": [
      "Clalit"
    ],
    "city": "Kfar Saba",
    "phone": "09-7665026 / 053-2121405",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/Pages/doctordetails.aspx?edeptcode=999002419&eservicecode=65&employeeid=2ED29BA513E3EA95D52B14B7857B4C77",
    "address": "HaTa'as 18, Kfar Saba"
  },
  {
    "id": "doc-614",
    "name": "Dr. Inés Tzur",
    "specialty": "Psicología",
    "kupot": [
      "Clalit"
    ],
    "city": "Kfar Saba",
    "phone": "052-3409773",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Clalit (clalit.co.il).",
    "receptionHours": "Consultar según cartilla oficial de Clalit",
    "reviews": [],
    "officialLink": "https://www.clalit.co.il/he/sefersherut/pages/doctordetails.aspx?edeptcode=120224&eservicecode=576&employeeid=FF5208E64231253B2EFAE1830C44E67E",
    "address": "Nahshon 13, Kfar Saba"
  },
  {
    "id": "doc-615",
    "name": "Dr. Tal Livneh",
    "specialty": "Especialista en dolor - Medicina familiar/interna",
    "kupot": [
      "Maccabi"
    ],
    "city": "Kiryat Ata",
    "phone": "04-8888238 / 04-8888237",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=F7CA25795B3D58228B9EF530AD77E55363D6E92584C9B615F1C0E8505C92D0C4",
    "address": "Berdyczewski 8, Kiryat Ata",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-616",
    "name": "Dr. Nur al-Din Yagmor",
    "specialty": "Neurología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Jerusalén",
    "phone": "02-9708850 / 02-9702760",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=7A2EB51CD8112DA4EC9A944897796CE7EACAA0544404F9F098914470421B3774",
    "address": "Jasr al-Nasf 10, Jerusalén",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-617",
    "name": "Dr. Gabriel Weinstein",
    "specialty": "Neurología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Eilat",
    "phone": "08-6332265",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=E0E766A09E4554B7EDBA66F2D1018B007CE6DB33F5BE29D3056C931A1F64C693",
    "address": "Derej HaArava 6, Eilat",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-618",
    "name": "Dr. Florencia Díaz Germoy",
    "specialty": "Trastorno por déficit de atención e hiperactividad (TDAH) en adultos",
    "kupot": [
      "Maccabi"
    ],
    "city": "Be'er Sheva",
    "phone": "08-6267222 / 073-2284764",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=D1F6A12569814284DC49065ACB943E3675EA0D101431718ED408A6EDE3A8C19A",
    "address": "Shderot Rothschild 4, Beer Sheva",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-619",
    "name": "Prof. Ángel Gollimstock",
    "specialty": "Neurología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Modi'in Illit",
    "phone": "08-9132111 / 073-2132699",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=244FABE74C72B73392388940DA66B0543A51E4EAE54B816F2A07D01D6946D1C1",
    "address": "Avnei Nezer 46, Modi'in Illit",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-620",
    "name": "Dr. Rodrigo Jung",
    "specialty": "Psiquiatría de Adultos",
    "kupot": [
      "Maccabi"
    ],
    "city": "Petah Tikva",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=B27515F4867DFBDBF044CD0C202C5573C46C9C7D9FFD30527F9F7FD293FB5F3E",
    "address": "HaRav Meshorer Yeshayahu 11, Petaj Tikvá",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-621",
    "name": "Dr. Yitzhak Faybel Loizman",
    "specialty": "Trastorno por déficit de atención e hiperactividad (TDAH) en adultos",
    "kupot": [
      "Maccabi"
    ],
    "city": "Ofakim",
    "phone": "08-6261453",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=9731915CAD57E8D911F240C1398847EC8FCAEB5368F3766CC14F34A217998B8E",
    "address": "Shderot Herzl 36, Ofakim",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-622",
    "name": "Dr. Nur al-Din Yagmor",
    "specialty": "Neurología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Jerusalén",
    "phone": "02-5060650",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=F303AE809FF50F1E8C65B8C42B3206B8EBC4E8C9BEADEC63A836080A9B89AB73",
    "address": "Al-Omri 27, Jerusalén",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-623",
    "name": "Prof. Ángel Gollimstock",
    "specialty": "Neurología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Mevaseret Zion",
    "phone": "02-9935900 / 073-2132682",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=5DF19FF55EA2499A34FB33FF8462A82E54BF64923C745A0414CB6C66EFDE2928",
    "address": "Shderot HaHoshen 3, Mevaseret Zion",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-624",
    "name": "Dr. Gabriel Weinstein",
    "specialty": "Neurología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Netanya",
    "phone": "053-9956767 / 09-8868450 / 076-8893000",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=85EDE669D1377D04D11DA915D22E76D14EF6560F6A5572CDA78171C05F5DDFCC",
    "address": "Shderot Agam Kineret 6, Netanya",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-625",
    "name": "Dr. Gabriel Weinstein",
    "specialty": "Neurología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Kfar Saba",
    "phone": "053-9956767 / 09-7909000 / 09-7909009",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=DCCC7B9EF6DDBC02D51C52C77EE96446A9A1E7EEC5BB6095DF6286B3F366C445",
    "address": "Horowitz Eli 12, Kfar Saba",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-626",
    "name": "Dr. Claudio Lisak",
    "specialty": "Psiquiatría de Adultos",
    "kupot": [
      "Maccabi"
    ],
    "city": "Raanana",
    "phone": "03-5193553",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=D62767CCBEAF50C99FDFE3F4816C6B1C1D391CF41B30535BC5A95DC95EB156EA",
    "address": "Ahuza 142, Ra'anana",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-627",
    "name": "Dr. Marina Rojas",
    "specialty": "Psiquiatría de Adultos",
    "kupot": [
      "Maccabi"
    ],
    "city": "Kiryat Motzkin",
    "phone": "053-9955936 / 050-8894575",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=9B19A207DA02FAC24D2922323ABC71B418AEFD8CB72D416414B2A3016060E687",
    "address": "Shderot Moshe Goshen 91, Kiryat Motzkin",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-628",
    "name": "Prof. Ángel Gollimstock",
    "specialty": "Neurología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Jerusalén",
    "phone": "02-5060290 / 076-8893330",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=52171D88A3E6D4C706103F6EFAAB7FEFE817ACB71BCE126ABDC20463B1280704",
    "address": "Hazon Ish 14, Jerusalén",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-629",
    "name": "Dr. Michael Rauscher",
    "specialty": "Psiquiatría de Adultos",
    "kupot": [
      "Maccabi"
    ],
    "city": "Beit Shemesh",
    "phone": "02-9917587 / 073-2132680",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=8430325C29A9ED50838333CCEE7F74EDA01B928E26EA3E8E6D4640AF7425DE4F",
    "address": "Derej Yitzhak Rabin 2, Beit Shemesh",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-630",
    "name": "Dr. Nur al-Din Yagmor",
    "specialty": "Neurología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Jerusalén",
    "phone": "02-5829417 / 02-5829910",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=F20BABA962F38B11B4A5DC3AE5748C5FC9CC79979565ED8A0A5D1C66D95DA345",
    "address": "Clínica de médicos Maccabi, Beit Rofim Kshan, Shuafat, Jerusalén",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-631",
    "name": "Prof. Ángel Gollimstock",
    "specialty": "Neurología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Modi'in",
    "phone": "08-9737666 / 073-2132694",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=4148CFEC03AD31D2A5DF6648ACC4725D5184B438E999251CC53FB54792FD82B7",
    "address": "Taltan 8, Modi'in-Maccabim-Re'ut",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-632",
    "name": "Prof. Ángel Gollimstock",
    "specialty": "Neurología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Beit Shemesh",
    "phone": "02-9917587",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=E0FEAB91E7F2C80B8D4ADDC678BE511BA542BA69CBC4B2FA779702D58BB4DE8D",
    "address": "Derej Yitzhak Rabin 2, Beit Shemesh",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-633",
    "name": "Dr. Alejandro Israel Lukyak",
    "specialty": "Neurología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Haifa",
    "phone": "073-3700700 / 09-7438117",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=976DB9A689922199EA4893401F50BF933CD9991EC276F837EE006CBBAD3D1C35",
    "address": "Shderot HaHistadrut 55, Haifa",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-634",
    "name": "Dr. Salo Haratz",
    "specialty": "Neurología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Kiryat Ono",
    "phone": "03-5560600",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=B737DBFC86A672CEB0431DC4A48620238ACF2A2901EA4B82881FD9C5EE11D879",
    "address": "HaDuvdevan 7, Kiryat Ono",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-635",
    "name": "Dr. Yonatan Wagmeister",
    "specialty": "Urología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Be'er Sheva",
    "phone": "08-6267777",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=39758150203BD9BA90BF49D18090467B575A908D614EF3D470655E1089D0D5C1",
    "address": "Yitzhak Ben Zvi 10, Beer Sheva",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-636",
    "name": "Dr. Yonatan Wagmeister",
    "specialty": "Urología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Be'er Sheva",
    "phone": "053-4515307",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=69F00FD9F56E979E2DBDC402828E4877F6C12D2D8AFC1A1AE9CC65AEE46230B8",
    "address": "Haim Yahil 7, Beer Sheva",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-637",
    "name": "Dr. Helio Sifla",
    "specialty": "Urología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Lod",
    "phone": "053-8411211 / 08-9242219 / 08-9248515",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=55EEFA9D608511929F459A7B1C1BD69D21489E326C59EC657B3372922BC64B41",
    "address": "Shderot HaTziyonut 1, Lod",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-638",
    "name": "Dr. Reut Shashar",
    "specialty": "Urología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Haifa",
    "phone": "04-8280400",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=7B1EC3B0528AFA92B8CD3B72AB0DE5FF615DEC7F15834F6A83A9126A44EA6F44",
    "address": "Horev 15, Haifa",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-639",
    "name": "Dr. Gabriel Farji",
    "specialty": "Urología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Hod HaSharon",
    "phone": "053-9955412 / 09-7726444 / 09-7422522",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=36AFD304005EC0B160D38B43EF12AE63DC54A3C4E1C063427304EC97644FC326",
    "address": "Sokolov 46, Hod HaSharon",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-640",
    "name": "Dr. Helio Sifla",
    "specialty": "Urología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Rishon LeZion",
    "phone": "03-5117427 / 03-9400055 / 03-9400066",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=106C21713CCE01E9E9EB8FC3F80C659EE75D33CC621EA9312486997C4AEF14D1",
    "address": "Shmuel Shirira 3, Rishon LeZion",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-641",
    "name": "Prof. Zvi Lider",
    "specialty": "Neurocirugía",
    "kupot": [
      "Maccabi"
    ],
    "city": "Herzliya",
    "phone": "09-9592555 / 09-9592929 / 09-9592919",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=7356A7CED475F6B311B4717841BEAF08B86F3E1B38BCEAC7E0D225FF8E1E1F5E",
    "address": "HaHoshlim 8, Herzliya",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-642",
    "name": "Dr. Pablo Kodner",
    "specialty": "Pruebas cardiológicas",
    "kupot": [
      "Maccabi"
    ],
    "city": "Pardes Hanna - Karkur",
    "phone": "04-8202089 / 04-8141800 / 073-2284105",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=99BBFBA76192AC85C98CA77393377E6731409ACD0B4AA61D890ACB2325D09AC1",
    "address": "Derej HaBanim 17, Pardes Hanna-Karkur",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-643",
    "name": "Dr. Moti Karpman",
    "specialty": "Ginecología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Hod HaSharon",
    "phone": "053-9956983 / 09-7400874 / 09-7443187",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=BDF29239B78F998646C717E0A1319671816438DB242523EB96E4B867037E2DB3",
    "address": "HaBanim 14, Hod HaSharon",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-644",
    "name": "Dr. Gali Gordon-Freund",
    "specialty": "Ginecología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Kiryat Yearim",
    "phone": "02-5341005 / 076-8893645",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=BA65663460002CE24633D11C55C352CCD56CAF984B55E5EB96AC15863C5E5936",
    "address": "HaRav Bloch 20, Kiryat Yearim",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-645",
    "name": "Dr. Yosef Ben Dayan",
    "specialty": "Ginecología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Modi'in",
    "phone": "08-6866370 / 08-6406075",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=0ECBAF42256FA3736C31B61799DF3CDAE17879942E5E5B018500A45162DC081F",
    "address": "Golda Meir 257, Modi'in-Maccabim-Re'ut",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-646",
    "name": "Dr. Gil Gottwirtz",
    "specialty": "Fertilidad femenina",
    "kupot": [
      "Maccabi"
    ],
    "city": "Arad",
    "phone": "08-6867800 / 08-9957377",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=8D455373AA4E00D87C0AF6F25C5CEC833159EA76F282EFDA0B01A26BB702A26B",
    "address": "Elazar Ben Yair 39, Arad",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-647",
    "name": "Dr. Gary Greenstein",
    "specialty": "Ginecología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Giv'at Ze'ev",
    "phone": "02-5362835 / 073-2132696",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=63E0BF2F4D8A5B745380D513AA8E737A05542542A9D66F685355BD0418A0792C",
    "address": "HaMaccabim 50, Givat Ze'ev",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-648",
    "name": "Dr. Yair Gefen",
    "specialty": "Ginecología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Rishon LeZion",
    "phone": "03-9634800",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=EB87A33B84707FB22290E89EC5A362C5F17A2666FBD1646BA4F7E71692061145",
    "address": "Jerusalén 129, Rishon LeZion",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-649",
    "name": "Dr. Gary Greenstein",
    "specialty": "Ginecología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Ramla",
    "phone": "08-9275858 / 08-9251972",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=0113C2FA7B2EF9D567209DC24F9A6282BC2E1C9155A4CC93E3BE5A7B36720260",
    "address": "Dani Mas 16, Ramla",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-650",
    "name": "Dr. Gary Greenstein",
    "specialty": "Ginecología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Ma'ale Adumim",
    "phone": "02-5913200 / 073-2132690",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=10A0F24BC010613BC53F3D1ACDBFDF1CE1823C8B82A9B65BBDF499B3F42AF15B",
    "address": "Derej Kedem 5, Ma'ale Adumim",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-651",
    "name": "Dr. Gary Greenstein",
    "specialty": "Ginecología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Jerusalén",
    "phone": "02-5060290 / 02-6280590",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=2205A4288174A2E28B70CED4BC39F2F0DBE315BCC65E8C4760D86943B6070F52",
    "address": "Druck Shlomo Zalman 105, Jerusalén",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-652",
    "name": "Dr. Carlos Rosenberg",
    "specialty": "Ginecología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Hod HaSharon",
    "phone": "053-9955440 / 09-7749192",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=A33FF99EC8C9421AA2481CC9C88103BCA899036C89C199F060050AC12A987ABE",
    "address": "Paamonit 25, Hod HaSharon",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-653",
    "name": "Dr. Karina Becher",
    "specialty": "Ginecología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Modi'in Illit",
    "phone": "08-9132111 / 073-2132699",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=B3F4BCECF56AFCF1B8D3136B67001E3DB321F6D32C535453A60DF80678EB6F03",
    "address": "Avnei Nezer 46, Modi'in Illit",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-654",
    "name": "Dr. Einat Oz-Markushmer",
    "specialty": "Ginecología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Rehovot",
    "phone": "053-9859451",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=F34C5AABE9D2F20110EC744A4267B70D4CFA397AFFB6AFE21901B64D7A0BE5C6",
    "address": "Eli Horowitz 27, Rejovot",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-655",
    "name": "Dr. Einat Oz-Markushmer",
    "specialty": "Medicina reproductiva",
    "kupot": [
      "Maccabi"
    ],
    "city": "Azor",
    "phone": "03-5593941",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=3DC4D574BFB001FFF8657C38174DD5F9AC441A2474BB771C58E12AD8ECF314F2",
    "address": "HaAliya HaShniya 43, Azor",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-656",
    "name": "Dr. Yair Gefen",
    "specialty": "Ginecología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Rishon LeZion",
    "phone": "03-7462350 / 03-9039934",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=00F4468373143CF36108569C1CFDCB1041DC6242C2BA84488366A554C08CEB5A",
    "address": "HaAtzmaut 21, Rishon LeZion",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-657",
    "name": "Dr. Sandra Cohen Weinstein",
    "specialty": "Ginecología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Zikhron Yaakov",
    "phone": "04-6898885 / 04-6345959",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=36892A2A9895CF1CEF1F7D0A587750072E55B4E2EBC9CBBC5A7EA74622EE2E3C",
    "address": "Hohit 16, Zikhron Yaakov",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-658",
    "name": "Dr. Daniel Kabot",
    "specialty": "Ginecología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Netivot",
    "phone": "08-6866880 / 08-6531175",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=9D79E9A8076E71462928CA627CCAD33E2C744A217E8766F83728DA990A756CD6",
    "address": "Ganei Tal 2, Netivot",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-659",
    "name": "Dr. Karina Becher",
    "specialty": "Ginecología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Modi'in",
    "phone": "053-2224222 / 077-2299000 / 077-2299099",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=D42DC5E5459A5057C21B6990894F52C849FE7CF563730C985E5E19FFC2200D09",
    "address": "Ar'ar 9, Modi'in-Maccabim-Re'ut",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-660",
    "name": "Dr. Daniel Kabot",
    "specialty": "Ginecología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Be'er Sheva",
    "phone": "08-6405640 / 03-7178577",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=A1815EFBC0C30BFCBCED57AEB07768C5887E508789FDAE9DB208D24E14F08D83",
    "address": "Nahal Perat 20, Beer Sheva",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-661",
    "name": "Dr. Janine Tsinamon Eizman",
    "specialty": "Ginecología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Modi'in",
    "phone": "08-6866560 / 08-6913079",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=3D802B2B5EFD1A20F30BE7381A6713856454BABD5349078AAB1BA68FA09839DB",
    "address": "Hasida 21, Modi'in-Maccabim-Re'ut",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-662",
    "name": "Dr. Janine Tsinamon Eizman",
    "specialty": "Ginecología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Lod",
    "phone": "08-9275858 / 073-2132673",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=1541D24B14C839EB5FCD4144476D0A923697E563F33D3DFAF7BACAD742B3EAC1",
    "address": "Haim Moshe Shapira 31, Lod",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-663",
    "name": "Dr. Karina Becher",
    "specialty": "Ginecología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Modi'in",
    "phone": "08-6405600",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=E754E1F178EE2B02B662CDED201D31FE6A449BB3723AF6B8BA1A67F9B055BE58",
    "address": "Golda Meir 257, Modi'in-Maccabim-Re'ut",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-664",
    "name": "Dr. Ana Karol",
    "specialty": "Ginecología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Bnei Brak",
    "phone": "03-5605001 / 03-6182226 / 03-5296548",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=CEF0F30767E63402ED22F503DE64AF1FB1CB6E402ADC7E18B43517FEA375DD85",
    "address": "Reuven Aharonovich 19, Bnei Brak",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-665",
    "name": "Dr. Mariana Ordóñez",
    "specialty": "Ginecología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Rosh HaAyin",
    "phone": "03-9386111 / 073-2132446",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=961CA5E3872A229DFE81E865A3A0C723AF58DDE53A501F07BEB15634D121AFD1",
    "address": "Derech HaTziyonut 17, Rosh HaAyin",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-666",
    "name": "Dr. Miri Godin",
    "specialty": "Ginecología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Jerusalén",
    "phone": "02-6238238 / 02-5001880",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=54A585853BC932F23B293C14FA206BC57173CDA5B62964716B957E7286CF3281",
    "address": "Agripas 40, Jerusalén",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-667",
    "name": "Dr. Yoav Gilboard",
    "specialty": "Ginecología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Rishon LeZion",
    "phone": "03-7462350 / 03-9039934",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=341555487ED9A8D33B8347FB5E0F041C4EBACE245748A7F4B76F7FB4D0A4A5F7",
    "address": "HaAtzmaut 21, Rishon LeZion",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-668",
    "name": "Dr. Mihai Meirovitz",
    "specialty": "Patología cervical y enfermedades de la vulva",
    "kupot": [
      "Maccabi"
    ],
    "city": "Be'er Sheva",
    "phone": "08-6267222 / 08-6267376",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=1613240EC6E52DAC25672FA84EB1C943EF1988794383CFE8CC96C226D483D090",
    "address": "Rothschild Blvd. 4, Beer Sheva",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-669",
    "name": "Dr. Gary Greenstein",
    "specialty": "Patología cervical y enfermedades de la vulva",
    "kupot": [
      "Maccabi"
    ],
    "city": "Beit Shemesh",
    "phone": "02-9917587 / 073-2132680",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=F822828EDA21D4F84A939EF8D121980B70E54E90414F1F59CE7806616F000D52",
    "address": "Yitzhak Rabin 2, Beit Shemesh",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-670",
    "name": "Dr. Gil Gottwirtz",
    "specialty": "Medicina reproductiva",
    "kupot": [
      "Maccabi"
    ],
    "city": "Be'er Sheva",
    "phone": "08-6267222 / 08-6267376",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=E16FF502977DAB96AAE583011C8A759C2AA298382EFF7D6FF6A301936EAC4CFE",
    "address": "Rothschild Blvd. 4, Beer Sheva",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-671",
    "name": "Dr. Eduardo Israel",
    "specialty": "Embarazo de Alto Riesgo",
    "kupot": [
      "Maccabi"
    ],
    "city": "Netanya",
    "phone": "09-8924222",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=525A93784C26DB81CCEA0368359311A51F4C65BCE9421A054EABB019C2F5D6B5",
    "address": "Tom Lantos Blvd. 26, Netanya",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-672",
    "name": "Dr. Gabriela Vernikovsky",
    "specialty": "Ginecología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Gadera",
    "phone": "08-6867888 / 073-2284795",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=1BD4DB42E3CC4E271784C700CBACCE63EC696246A9D9625C1F75336EE32C277B",
    "address": "Menachem Begin Blvd. 12, Gadera",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-673",
    "name": "Dr. Adi Cooperman-Shani",
    "specialty": "Medicina reproductiva",
    "kupot": [
      "Maccabi"
    ],
    "city": "Ashdod",
    "phone": "08-8688111 / 073-2284852",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=3F9E0D2B5226FDCAB06EAD4EC3F51EFD39420F91437AFFDF9F7060A33E4722E1",
    "address": "Rashbi 15, Ashdod",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-674",
    "name": "Dr. Yana Vinikov",
    "specialty": "Ginecología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Dimona",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=566F72B1D48494CF3146534345ED6C480BF46EEAE8480D60C89AA00FC39CB853",
    "address": "Golda Meir Blvd. 20, Dimona",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-675",
    "name": "Dr. Yuval Kaufman",
    "specialty": "Ginecología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Haifa",
    "phone": "073-3869130 / 050-9500525",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=5943E0CB36376A9597C26A59FA6D557659629E0C37AECD426CD5A7FAECF535CC",
    "address": "Histadrut Blvd. 55, Haifa",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-676",
    "name": "Dr. Mihai Meirovitz",
    "specialty": "Ginecología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Be'er Sheva",
    "phone": "08-6267777 / 052-2768246",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=01689A840DFCAF1DED1FC3D6E70E8A8F3C3E0D248CF3C45C2610B9A3EE4EF92B",
    "address": "Yitzhak Ben Zvi 10, Beer Sheva",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-677",
    "name": "Prof. David Soriano",
    "specialty": "Ginecología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "03-6447215 / 03-6447410",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=3089BD331C59A554D1D6355853F1D371D022E6346DB00BD048D9F8A0C4E127AC",
    "address": "HaBarzel 11, Tel Aviv",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-678",
    "name": "Prof. Yaakov Ashkenazi",
    "specialty": "Medicina reproductiva",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "phone": "03-6992635 / 03-6994414 / 054-8002000",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=361AD26647143B2069DBD64F6AE30C67DB4CEE9F0DC91B527F664BAF3C90989F",
    "address": "Yehuda Burla 38, Tel Aviv",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-679",
    "name": "Dr. Jorge Samuel Delgado",
    "specialty": "Gastroenterología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Be'er Sheva",
    "phone": "08-6267222 / 073-2284764",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=6618DDCC82ACED5C9DC53205489214D58366DFA5C1A43938C8AEF99575B4ED17",
    "address": "Rothschild Blvd. 4, Beer Sheva",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-680",
    "name": "Dr. Hagai Schweinstein",
    "specialty": "Gastroenterología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Kiryat Ono",
    "phone": "053-9957187 / 03-5560600",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=6D377AA87D8A680BC49E4CC6364C168AF5AA5AD4B45987DBAC68B92C8C989E0D",
    "address": "HaDuvdevan 7, Kiryat Ono",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-681",
    "name": "Dr. Jorge Samuel Delgado",
    "specialty": "Gastroenterología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Ashkelon",
    "phone": "053-9956100 / 08-6308600",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=1D57719F20DAC12A2CDB2EE51C447A82FA2A9C40FF4C00F4E54A247861360410",
    "address": "Ben Gurion Blvd. 17, Ashkelon",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-682",
    "name": "Dr. Omer Goldstein",
    "specialty": "Gastroenterología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Haifa",
    "phone": "04-8312103 / 04-6883179",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=6DF0134D5E33529FEDE0A3010ECE837898033B82EC795702B62846367D9F48AA",
    "address": "HaNasi Blvd. 29, Haifa",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-683",
    "name": "Dr. Jorge Pfeffer",
    "specialty": "Gastroenterología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Herzliya",
    "phone": "053-2121400 / 09-9584415 / 09-9584416",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=9763F4ED50A2216AAEA22545CF840BEE42392C449D9A651C966EDE8FC2F6DD80",
    "address": "Tzamarot 2, Herzliya",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-684",
    "name": "Dr. Amiel Migdal",
    "specialty": "Gastroenterología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Modi'in",
    "phone": "08-9758685 / 08-9264702",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=7AEFE2E8556BCB3C35D08C85AF2BAC8CC329D0E67402E1DF340747141D1EA9CC",
    "address": "Yigal Yadin 41, Modi'in-Maccabim-Re'ut",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-685",
    "name": "Dr. Perry Milman",
    "specialty": "Gastroenterología pediátrica",
    "kupot": [
      "Maccabi"
    ],
    "city": "Efrat",
    "phone": "02-9932140 / 073-2132679",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=EACD1235D0D7F5190B8F33A24A4C499AEC3CFD856521DFB52C78AEFDA90EEF33",
    "address": "King David Blvd. 39, Efrat",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-686",
    "name": "Dr. Amiel Migdal",
    "specialty": "Gastroenterología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Shoham",
    "phone": "03-5325856 / 03-5329460",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=0B9FA2DC6B116F4256A81E9F0D3F7A2A184643CBD45A4CDB1DB9D883D58C6B4F",
    "address": "Emek Ayalon Blvd. 30, Shoham",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-687",
    "name": "Dr. Perry Milman",
    "specialty": "Gastroenterología pediátrica",
    "kupot": [
      "Maccabi"
    ],
    "city": "Jerusalén",
    "phone": "053-2121399 / 02-6504404 / 02-6713008",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=CAEAA106B363C12FD64F51CAF34FC662DBE8E36CB23D255F7E248BF0F85BA6E4",
    "address": "Reish Lakish 6, Jerusalén",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-688",
    "name": "Dr. Jorge Samuel Delgado",
    "specialty": "Gastroenterología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Arad",
    "phone": "08-9951515 / 073-2284735",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=D1675125598401C5BCC8AA5E0D838ED13C660F93F62E789FB4490A4674B974F2",
    "address": "Shimon 13, Arad",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-689",
    "name": "Dr. Dov Vengrover",
    "specialty": "Gastroenterología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Jerusalén",
    "phone": "02-6555999",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=E1B4B22864C158767E7172BEF9481546F9BC71EA417A0EBEAAD9B3B5ADB36C5C",
    "address": "Beit Shmuel 12, Jerusalén",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-690",
    "name": "Dr. Maurice Bodo",
    "specialty": "Geriatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Modi'in",
    "phone": "08-9737666 / 073-2132694",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=D0C033EA743B5EA6507C69037C16651B0974B694E052DC0D128A83BF06A50B77",
    "address": "Taltan 8, Modi'in-Maccabim-Re'ut",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-691",
    "name": "Dr. Ali Abu Ria",
    "specialty": "Geriatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Karmiel",
    "phone": "04-9027222 / 073-2132747",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=7AC6F948C1CADAB5C8CBC9AFA18319BF1077A462B6412377B4AC310CB430B8EE",
    "address": "HaShoshanim 128, Karmiel",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-692",
    "name": "Dr. Tzvi Bokman",
    "specialty": "Geriatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Beit Shemesh",
    "phone": "02-9917587 / 073-2132680",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=113782005BF706700BFA9225EE6A300F610B67867F252E2D5465192DBABFE6D4",
    "address": "Yitzhak Rabin 2, Beit Shemesh",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-693",
    "name": "Dr. Elaini Winfeld",
    "specialty": "Geriatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Ramat Gan",
    "phone": "03-6750333",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=17CA9EE8E591B0A4E4BD678AF2301857668FAEFA4064968170814FA53E81B001",
    "address": "Derej Negba 48, Ramat Gan",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-694",
    "name": "Dr. Adrián Duek",
    "specialty": "Hematología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Rehovot",
    "phone": "08-9702314 / 08-9705857",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=7CBC8E04204001B64CE76D4D5C9963E68CCA52EF1B1D412F313B3A5124482694",
    "address": "Eli Horovitz 27, Rejovot",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-695",
    "name": "Dr. Meir Weinstein",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Kiryat Bialik",
    "phone": "04-8705771 / 04-8707718 / 04-8702277",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=F2184FAD12C038175BB57CDF24D6CE895F577D4FCD802AC7CEEBC67CDF5E8B44",
    "address": "HaGefen 27, Kiryat Bialik",
    "acceptsNewPatients": false
  },
  {
    "id": "doc-696",
    "name": "Dr. Daniel Lubin",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Bnei Brak",
    "phone": "053-8411274 / 03-7462220 / 03-7730699",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=7A1FC43F5013531CD30E4D496C59BD87F2DE7269778E4E20A6F192CBE425DE5B",
    "address": "Damasco Eliezer 12, Bnei Brak",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-697",
    "name": "Dr. Leah Liat Nesich",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Jerusalén",
    "phone": "02-5060390 / 076-8893632",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=4619DBE8851889DC1AFBE8FCE152544165DCD9573797A1A6A2F79C077E54164D",
    "address": "Eleazar HaModai 18, Jerusalén",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-698",
    "name": "Dr. Noni Reina",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Hod HaSharon",
    "phone": "03-5123187 / 09-7441221",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=5F789BDC09FB5A2A45EB85EBE47F646760CB25B13999C6B11D5EACD5471DF5D8",
    "address": "HaBanim 14, Hod HaSharon",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-699",
    "name": "Dr. Yirmiyahu Lovash",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Haifa",
    "phone": "052-8404052 / 04-8620203",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=6AB41BE04EA402CBDE539A3FC25A997B16AA1E8F0A8A847E4E24984E154A7226",
    "address": "Geula 18, Haifa",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-700",
    "name": "Dr. Lorena Rozentsvaig",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Yehud-Monosson",
    "phone": "03-5396222",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=514DBD6279676BAE78F643EBF73F1789242D35D19F530BB22E67A8718315E070",
    "address": "Derej HaAtzmaut 56, Yehud-Monosson",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-701",
    "name": "Dr. Daniela Halpern",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Modi'in",
    "phone": "08-6405600 / 08-6487127",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=9BD173FB3990D94005E2BFB2E30BD27D9468CB8BF1438C6872B4F7F5DC0BBBC6",
    "address": "Golda Meir 257, Modi'in-Maccabim-Re'ut",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-702",
    "name": "Dr. Naomi Mor",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Raanana",
    "phone": "09-7452640 / 09-7489916",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=F4E709C4FEFA52EF0921599A113F3AA1C12B8CE10FDFAABD59DE5F5D57472E44",
    "address": "Raúl Wallenberg 16, Raanana",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-703",
    "name": "Dr. Monica Ornstein",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Bnei Brak",
    "phone": "03-5605001 / 03-5296548",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=EA974C3C1B3F0DFD22030923CCF423F45CA280B322BBD2EE8ADBFA261316F921",
    "address": "Reuven Aharonovitch 19, Bnei Brak",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-704",
    "name": "Dr. Kevin Benjamín Benita Zlochzover",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Bnei Brak",
    "phone": "053-9860119 / 03-7462220 / 03-7730699",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=79F2D6872BC4F370F4743ABEB4AE887C7068906DD94BD90197AFBDD61C9748B8",
    "address": "Damasco Eliezer 12, Bnei Brak",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-705",
    "name": "Dr. Dalia Orbach",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Eilat",
    "phone": "08-6337517 / 08-6336145",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=A6BDF3DC428782C85FD18EB82C6178DB73DB402119B7B178D35CEF532DA1FC10",
    "address": "Los Ángeles 1199, Eilat",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-706",
    "name": "Dr. Efrat Lev",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Kfar Saba",
    "phone": "09-8868200 / 076-8893081",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=05250E7690EF31B77900CE41A1F76B86BA7F2876BA0EE4A4A5BF1536E5E91EA9",
    "address": "Rappaport 3, Kfar Saba",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-707",
    "name": "Dr. Lior Weizel",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Or Akiva",
    "phone": "04-6165300 / 03-7178301",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=0EBBB8F330B56C349AB71A97F7D54ABE297D94ED42DABEE77EF1557F5581DC83",
    "address": "Pardes Rimonim 2, Or Akiva",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-708",
    "name": "Dr. Eduardo Lerner",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Petah Tikva",
    "phone": "03-7462020 / 076-8893177",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=74378F2D81E0460929F2019987F5DB5A5F3805BCEACEA34CC352928CAE540607",
    "address": "Ezra y Nehemías 37, Petaj Tikvá",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-709",
    "name": "Dr. Ingrid Karina Fainvaks Levi",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Yeruham",
    "phone": "08-6583004 / 073-2284761",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=0A20B60DE058341E83EA97760ADC6B12BBCB0829135B1EB2DFD7FE457DEAFACC",
    "address": "Tzvi Borenstein 199, Yeruham",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-710",
    "name": "Dr. Daniel Lubin",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Bnei Brak",
    "phone": "053-9858125 / 03-5004580 / 03-7178401",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=15193B095705D6333A0EED9145A30DD67FD815898513D1C90E8716FD6DBCF6CC",
    "address": "HaRav Kahaneman 147, Bnei Brak",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-711",
    "name": "Dr. Leah Liat Nesich",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Jerusalén",
    "phone": "02-6237111 / 02-6230514",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=E32048174531364630C402A9C5569FC8D7F3D650FD2390CC20CD320FD90E2269",
    "address": "Strauss 24, Jerusalén",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-712",
    "name": "Dr. Jorge Luis Martins",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Ashkelon",
    "phone": "08-6867840 / 08-9549162",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=B19EBF239158E5BD7AEAB5A26BCB1B7E91BDE471CC98AA2A98DB3D5B40A2B01A",
    "address": "Bik'at Rimon 11, Ashkelon",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-713",
    "name": "Dr. Kevin Benjamín Benita Zlochzover",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Bnei Brak",
    "phone": "03-5771313 / 076-8893219",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=82DCE97798F269ED836690AF2F75965FEBFD22D1568A7FA49B77CD1BC7669035",
    "address": "Rabí Akiva 86, Bnei Brak",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-714",
    "name": "Dr. Avraham Mizrahi",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Modi'in",
    "phone": "053-2224222 / 077-2299000 / 077-2299099",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=D185F19308A3AFAE2DC4DEF0903E124AB2A6FA6C9FFF947782BD99488189DD00",
    "address": "Aro'er 9, Modi'in-Maccabim-Re'ut",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-715",
    "name": "Prof. Yitzhak Sarugo",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Kiryat Tiv'on",
    "phone": "04-9037700 / 073-2284305",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=8E8DF10E281AE515DF42FEC587E6BD2C1E8A11E85666307B89C64EACB7F79DC6",
    "address": "HaRimonim 1, Kiryat Tiv'on",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-716",
    "name": "Dr. Daniel Sapir",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Shoham",
    "phone": "053-9900344 / 03-9730308 / 03-9791829",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=84D30A40E49E74992ECC63F1D224DDCF4D6C8818F6E6F2155D134EA083F6B5D8",
    "address": "Sderot Emek Ayalon 30, Shoham",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-717",
    "name": "Dr. Gabriel Katz",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Modi'in",
    "phone": "08-6261440 / 08-9717579",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=61003BC209BAE6CC467560442E6E265A805745A329BE115B36094428DAB039CE",
    "address": "Bedolaj 19, Modi'in-Maccabim-Re'ut",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-718",
    "name": "Dr. Ze'ev Sonis",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Nahariya",
    "phone": "04-6164270 / 04-8277634",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=D018B4AA9DA1E14B466DCC3B78A1FF6B6CC5FF68682EB9A7E53E45EB827D1D26",
    "address": "Najaliali 2, Nahariya",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-719",
    "name": "Dr. Florencia Díaz Germoy",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Be'er Sheva",
    "phone": "08-6496220 / 073-2284788",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=6C487798B1B35A4FCDBFFD72B884BEF122723869BFC49BDBAE971C3E9CF823A7",
    "address": "Óscar Schindler 32, Beer Sheva",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-720",
    "name": "Dr. Boris Kostenzki",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Netivot",
    "phone": "08-9939400 / 073-2284781",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=94C0E8CFC5F745636852565B4F00350799155A6B9858C3BB64B1D2A2356A13AD",
    "address": "Sderot Jerusalén 18, Netivot",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-721",
    "name": "Dr. Alex Greenberg",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Gan Yavne",
    "phone": "08-8573613 / 073-2284765",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=EB08A32874DEFE2194A35233B8FDCEA546DE6A323295B83603A895FF2678C7FF",
    "address": "HaMaguinim 56, Gan Yavne",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-722",
    "name": "Dr. Alex Greenberg",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Rehovot",
    "phone": "08-6866290 / 08-9367079",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=EE3BAE701420FB244F42C781D9E35818542D6AF4C9FBFCB619CE9A35D7500F92",
    "address": "Har HaTzofim 17, Rejovot",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-723",
    "name": "Dr. Elihai Berliner",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Beit Shemesh",
    "phone": "02-5060740 / 02-5791995",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=28F4FD80F7722B8238F0F78C84CFA1EDA9755722FB44CD2CFB6AB1234BBE38A0",
    "address": "Sderot HaAmoraim 69, Beit Shemesh",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-724",
    "name": "Dr. Tulio Brick",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Be'er Sheva",
    "phone": "08-6496220 / 073-2284788",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=A7B36A9158EEA7E8FDED2B5038A9FF7E12ADAE73A13528CC682F000CFFA1A87A",
    "address": "Óscar Schindler 32, Beer Sheva",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-725",
    "name": "Dr. Roberta Kolton",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Modi'in",
    "phone": "08-9737666 / 073-2132694",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=6B26B4E93DE306F36436F598625952C91FBCD8443291BC6FCB6D7E590CEF37AC",
    "address": "Taltan 8, Modi'in-Maccabim-Re'ut",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-726",
    "name": "Dr. Tamar Orgad",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Beit Shemesh",
    "phone": "02-5820776 / 02-5061930",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=F8E26F2169D22C53BE6A32D9A7B14707682742E952FCD0962C93D81EEC20CC81",
    "address": "HaRav Israel Grossman 68, Beit Shemesh",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-727",
    "name": "Dr. Daniela Kasagrandi",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Karmiel",
    "phone": "04-9072222 / 073-2132747",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=529098F1F169C0C7BB2B2D22BF16A5F852FD77435184BA1B42D5A560E17B092C",
    "address": "HaShoshanim 128, Karmiel",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-728",
    "name": "Dr. Judy Balter-Sari Levi",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Bnei Brak",
    "phone": "03-5771313 / 073-2284983",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=C6CDB86B4F2180D7EA5A6D284457F8709F2873EE9560AF6AAF8314587BC6B949",
    "address": "HaRav Kahaneman 64 Vav, Bnei Brak",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-729",
    "name": "Dr. Ronen Mankita",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Meitar",
    "phone": "08-6510034 / 073-2284785",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=E66707B9528EE69A4153491C71BCE5FBCC1EF5C56C7503974FBE7889469FA4B5",
    "address": "Sderot HaMeyasdim 1, Meitar",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-730",
    "name": "Dr. Yehoshua Englander",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Hod HaSharon",
    "phone": "09-7405332 / 09-7406231 / 09-7407168",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=74F9AECAAC9D409C7D0FAA0C7EDCD025912E1C388FD6C070AB066D553E788F18",
    "address": "Yehoshua Ben Gamla 13, Hod HaSharon",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-731",
    "name": "Dr. Aryeh Alon",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Rishon LeZion",
    "phone": "053-9956451 / 03-9667907 / 03-9663913",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=24CBEFF459BADEA1A5A6E3B53A2435265543A1BFAE244ED42B0C0DFA3E01B9C5",
    "address": "Ein HaKore 10, Rishon LeZion",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-732",
    "name": "Dr. Héctor Roizin",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Rishon LeZion",
    "phone": "053-9858065",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=52C1F0EA5FECE6344BC3A01D8D907B1D6FC8096552491DE2AB56F50A0DCBDCB8",
    "address": "HaYakinton 1, Rishon LeZion",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-733",
    "name": "Dr. Tair Abu Jibel",
    "specialty": "Ortopedia Pediátrica",
    "kupot": [
      "Maccabi"
    ],
    "city": "Nazaret",
    "phone": "04-6508888 / 073-2284310",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=0A3F9D0BB9698495E3B180D48D79FC8D9FAACB0342220AB8E829C84623723BD7",
    "address": "Paulus VI 100, Nazaret",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-734",
    "name": "Dr. Rinat Barak",
    "specialty": "Ortopedia Pediátrica",
    "kupot": [
      "Maccabi"
    ],
    "city": "Ramat Magshimim",
    "phone": "04-6164880 / 073-2284378",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=7E1EC800E9E08E86F6F2F214E857C1095DF51C697DDE1CC0E396D3A521290F9E",
    "address": "Daliyot 1, Ramat Magshimim",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-735",
    "name": "Dr. Tair Abu Jibel",
    "specialty": "Ortopedia Pediátrica",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tiberíades",
    "phone": "04-6165630 / 04-6114050",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=ACCC9BDEE708E7695EA98751B1D66EE4BE76D2529BB185C3D260E503797D99F9",
    "address": "HaNasi Weizmann, Tiberíades",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-736",
    "name": "Dr. Tair Abu Jibel",
    "specialty": "Ortopedia Pediátrica",
    "kupot": [
      "Maccabi"
    ],
    "city": "Nof HaGalil",
    "phone": "04-6164920",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=DEE609358845FAB1FDDEDEECF54433A95C469F6BE8B43D48F298AC0E33BB0321",
    "address": "HaAdmor MiBelz 3, Nof HaGalil",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-737",
    "name": "Dr. Alan Aner",
    "specialty": "Ortopedia Pediátrica",
    "kupot": [
      "Maccabi"
    ],
    "city": "Kiryat Ono",
    "phone": "053-2121323 / 03-5351014 / 03-5340677",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=40DDFE198CC495FCAC306F683B03BC4E679521166FF59EAF6E6854349E2E3238",
    "address": "Yerushalayim 39, Kiryat Ono",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-738",
    "name": "Dr. Menachem Singer",
    "specialty": "Cirugía Ortopédica",
    "kupot": [
      "Maccabi"
    ],
    "city": "Hod HaSharon",
    "phone": "053-9858707 / 09-7481816 / 09-7487744",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=4A602BBD4F68084FFBB59DFF5D97E62D10B91A6F8B0365F563D972A2731F1835",
    "address": "HaHarash 15, Hod HaSharon",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-739",
    "name": "Dra. Hana Luder",
    "specialty": "Endocrinología Pediátrica",
    "kupot": [
      "Maccabi"
    ],
    "city": "Karmiel",
    "phone": "04-6164230 / 04-6044902",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=05A1576DB27A6CCAC6BE97248DB8E3545A9F4BA7C794AFC5397C8CD3A47BA2E5",
    "address": "Morad HaGai 100, Karmiel",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-740",
    "name": "Prof. Ester Liberman",
    "specialty": "Endocrinología Pediátrica",
    "kupot": [
      "Maccabi"
    ],
    "city": "Be'er Sheva",
    "phone": "08-6652333 / 08-6652444",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=BA0D10EC499F373F4930B85DAFD3563058E6F7F058661CDECF80229127747251",
    "address": "Avenida Yitzhak Rager 22, Beer Sheva",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-741",
    "name": "Dr. Daniel Sapir",
    "specialty": "Trastorno por Déficit de Atención e Hiperactividad en Niños",
    "kupot": [
      "Maccabi"
    ],
    "city": "Shoham",
    "phone": "053-9900344",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=10DBCE64BCDEC0E20CDDD3E2127269229B427987F00C023E7A75D3D9C123BDB2",
    "address": "Avenida Emek Ayalon 30, Shoham",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-742",
    "name": "Dr. Yitzhak Feivel Loisman",
    "specialty": "Trastorno por Déficit de Atención e Hiperactividad en Niños",
    "kupot": [
      "Maccabi"
    ],
    "city": "Jerusalén",
    "phone": "02-5061640 / 076-8893330",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=0DB24F1F277DAA2492010446D5DA2B67F8F7666066430E9F11093FDAB693947C",
    "address": "Hazon Ish 14, Jerusalén",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-743",
    "name": "Dr. Yitzhak Feivel Loisman",
    "specialty": "Trastorno por Déficit de Atención e Hiperactividad en Niños",
    "kupot": [
      "Maccabi"
    ],
    "city": "Jerusalén",
    "phone": "02-5061640 / 02-6361774",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=C2F43098DD6EAAFEA62EF16E8131195A34DB7D7AEB86CC04534936C6C47B61E8",
    "address": "Givat Shaul 17, Jerusalén",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-744",
    "name": "Dr. Aaron Schiff",
    "specialty": "Neurología Pediátrica",
    "kupot": [
      "Maccabi"
    ],
    "city": "Haifa",
    "phone": "053-9956970 / 073-3906600",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=7EC70A9769355DDC21FD717F4A0829403344D63615712B60E38EA842BC21BAEC",
    "address": "Einstein 139, Haifa",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-745",
    "name": "Dra. Mariella Forshpan",
    "specialty": "Psiquiatría infantil y del adolescente",
    "kupot": [
      "Maccabi"
    ],
    "city": "Omer",
    "phone": "053-9234890",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=022EA2AC0189D0C5EC6B56A343B3705EF04252DD6683798BC458DB8F8DA220E7",
    "address": "Omerim 9",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-746",
    "name": "Dr. Marcelo Spitz",
    "specialty": "Psiquiatría infantil y del adolescente",
    "kupot": [
      "Maccabi"
    ],
    "city": "Yokneam (Moshava)",
    "phone": "04-9890499",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=064FA4ECBDB13B6949205D1674BD64DC7529B50E58D2B6522BE8B2A8CC6A0057",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-747",
    "name": "Dr. Baruch Klein",
    "specialty": "Cirugía Pediátrica",
    "kupot": [
      "Maccabi"
    ],
    "city": "Ashdod",
    "phone": "08-8516666 / 073-2284749",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=D5BDABE090E3162E5840C9A62642E3D24BDF7E7A59874FFE8FC1E5FF2EDC03EC",
    "address": "HaPalmach 20, Ashdod",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-748",
    "name": "Prof. Naftali Freud",
    "specialty": "Cirugía Pediátrica",
    "kupot": [
      "Maccabi"
    ],
    "city": "Ramat Hasharon",
    "phone": "03-5484646 / 073-2284185",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=70E4D4DEC0E70BC79FF507D84809915BA48F1F15EE9A76A07F37C08F12F3676D",
    "address": "HaNetzach 3, Ramat HaSharon",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-749",
    "name": "Prof. Naftali Freud",
    "specialty": "Cirugía Pediátrica",
    "kupot": [
      "Maccabi"
    ],
    "city": "Petah Tikva",
    "phone": "053-9956041 / 03-7419772 / 03-7414448",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=FBBF1E980A8477AAC7384701870FC9FAA2686B7F199F81CEAC522DFB9872F6E8",
    "address": "Shapira Herman Zvi 43, Petaj Tikvá",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-750",
    "name": "Dr. Baruch Klein",
    "specialty": "Cirugía General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Beit Shemesh",
    "phone": "02-9917587 / 073-2132680",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=0591F27D9159D9AD46505E2255F8316A0957BDB214A24B9BB7C250EFCCC09BB7",
    "address": "Carretera Yitzhak Rabin 2, Beit Shemesh",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-751",
    "name": "Dr. Baruch Klein",
    "specialty": "Cirugía Pediátrica",
    "kupot": [
      "Maccabi"
    ],
    "city": "Jerusalén",
    "phone": "02-5864222 / 073-2132695",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=C6C3EEE1742AB4B3EF6E66CACAC37FF86A82A083C10F8AB5BDCBF636D830EB88",
    "address": "Avenida Golda Meir 255, Jerusalén",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-752",
    "name": "Dr. Baruch Klein",
    "specialty": "Cirugía General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Mevaseret Zion",
    "phone": "02-9935900 / 073-2132682",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=8492789959A4754F064ADECA5DFEAEE87A3A1C4533885088843469C422104827",
    "address": "Avenida HaJoshen 3, Mevaseret Zion",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-753",
    "name": "Prof. Daniel Landau",
    "specialty": "Nefrología Pediátrica",
    "kupot": [
      "Maccabi"
    ],
    "city": "Ramat Gan",
    "phone": "053-9956186",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=274B866F4D1B00310E4C5C0F162169FA913C575F357ACAF3A3741E9BB619426F",
    "address": "Yeshayahu 24, Ramat Gan",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-754",
    "name": "Dra. Yael Lubin Levy",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Rishon LeZion",
    "phone": "053-9955400 / 03-5511140 / 03-5511180",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=FCA8C2ECAA93726E150337FEE250B936534FAB52B36BB75BD8A0B0310E09B624",
    "address": "Z.D.L. 5, Rishon LeZion",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-755",
    "name": "Dra. Nurit Ariella Adelberg",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Hadera",
    "phone": "04-6305666 / 073-2132406",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=80EF481DFB2F8A052AF5901B2FCF625B0C5D2982CBE8AECDC3925D455F3AC507",
    "address": "Hillel Yaffe 13, Hadera",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-756",
    "name": "Dr. Yaakov Abrahams",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Karmiel",
    "phone": "04-6165230 / 04-6826748",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=947836FC4BD8FB54160F78493F2D96F8FFF306BC32819848CBF1FC424E5A87C4",
    "address": "HaGalil 2, Karmiel",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-757",
    "name": "Dra. Tamar Harpaz",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Harish",
    "phone": "04-6164310 / 073-2132410",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=90462786B9FBA99AC0A92E88C0195904E1E622267E5592E26E65ACAEBB7C8037",
    "address": "Derej Eretz 35, Harish",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-758",
    "name": "Dr. Ralph Guggenheim",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Hod HaSharon",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=8514F9CF2507C615C6C4F25ABF7700ED58DE87F71B922BFB0DA9A771F51B7DD9",
    "address": "HaBanim 14A, Hod HaSharon",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-759",
    "name": "Dra. Ruth Stern-Gur",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Kiryat Ono",
    "phone": "03-5304111 / 03-5229485",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=280E2BB1254D60164E1C0CBFE7AC83D9B76C08E0289DC5833A3239F653BFD772",
    "address": "Yerushalayim 39, Kiryat Ono",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-760",
    "name": "Prof. Abdelraouf Hijazi",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Beit Shemesh",
    "phone": "053-9956045 / 02-5953555 / 02-5953554",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=032FF365A86D5D063FDFFCDA35482114E27D35C6EDCCE51ADC3BA094874EB1DD",
    "address": "Carretera Yitzhak Rabin 2, Beit Shemesh",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-761",
    "name": "Dr. Uriel Matias Dorin",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Netanya",
    "phone": "076-8893013",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=1DDF213F79DAA961C22F977590F191E71EE6DBC3068325DBE7F10A2150CADC8C",
    "address": "Avenida Tom Lantos 60, Netanya",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-762",
    "name": "Dr. Li Erez",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Haifa",
    "phone": "053-7037013",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=63B90DDE5443B5587C1C169C1EAA226E7BE755C1E8EEF5E481BB61C73C50D880",
    "address": "Avenida HaNasi 40, Haifa",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-763",
    "name": "Dr. Ali Abu Ria",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Kiryat Motzkin",
    "phone": "04-6164350 / 076-8893476",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=2FCE11DEDD97902CB8AAEC0281F25C073933BF3C9AF38B59EBA36A71C4A13F8E",
    "address": "Derej Akko 271, Kiryat Motzkin",
    "acceptsNewPatients": false
  },
  {
    "id": "doc-764",
    "name": "Dr. Adiel Reutman",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Bnei Brak",
    "phone": "03-6331333 / 03-6581446",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=D0FA9018D3204353A86777991CDD533F8773B1165B4ED0850C497FFF6B41A39B",
    "address": "Harav Shach 60, Bnei Brak",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-765",
    "name": "Dr. Yishai Mintzker",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Centro Regional Misgav",
    "phone": "04-8141816 / 073-2132747",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=7C65D02E28047D7856C185AC29253637555572A3A5C238A676611BA5407D0DB5",
    "address": "Consejo Regional, Centro Regional Misgav",
    "acceptsNewPatients": false
  },
  {
    "id": "doc-766",
    "name": "Dr. Liron Elbaz",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Yavne",
    "phone": "08-6866230 / 073-2132451",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=1FE41B38EC1C4BFC775F5B0CE168428289D22938DDFE1B21A6739AF6795541F0",
    "address": "HaDogit 16, Yavne",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-767",
    "name": "Dr. Eden Simonov",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Bat Yam",
    "phone": "03-5001212 / 076-8893344",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=E2D2BC8C9CA96DA781A23A403CB2C0F437EFB77472F38B2BB262DF44206EFE81",
    "address": "Berl Katznelson 37, Bat Yam",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-768",
    "name": "Dra. Sausan Saruji",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Nazaret",
    "phone": "04-8737043",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=A7FB6CA5E7051E32A38AA5C7070B20A170566536E69C5BF745C231215A954266",
    "address": "Tawfiq Ziad 11, Nazaret",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-769",
    "name": "Dra. Hodaya Stein",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Shimshit",
    "phone": "04-6164900",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=8192062D987B51B39F76554C7A2BB565A5266294A9024BFEAA1CDE298BE50927",
    "address": "Nehalim 30, Shimshit",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-770",
    "name": "Dr. Mordechai Schechter",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Modi'in Illit",
    "phone": "08-9132111 / 073-2132699",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=3BDFAA63584EAD63E3F1A2EE94D82D5B5242F7472E44DA193F0144A0C28ACA3B",
    "address": "Avnei Nezer 46, Modi'in Illit",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-771",
    "name": "Dra. Charlotte Sharon-Nofach",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Raanana",
    "phone": "09-7421750 / 09-7422871",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=2CA9BA56612A0CF935D6E8263A495F1229AB37ABEAEA3E3202E5D889B9CA6D52",
    "address": "Eshkol Levi 2, Ra'anana",
    "acceptsNewPatients": false
  },
  {
    "id": "doc-772",
    "name": "Dra. Yael Kliper",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Kadima-Zoran",
    "phone": "09-8868340 / 076-8893181",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=2CF8ACAC3E79B2DBFC775F64F85A00C62DD59CA6E6453275A11962AAEC40A519",
    "address": "HaOfe 1, Kadima-Zoran",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-773",
    "name": "Dr. Morris Bodo",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Modi'in",
    "phone": "053-8411252 / 08-9731887 / 08-9712134",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=4BB5E81499B571ADA56AFFD5A1FFA5AEDE20CB7D69DB76133C5D7C09783A2496",
    "address": "Teniente General Yigal Yadin 37, Modi'in-Maccabim-Re'ut",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-774",
    "name": "Dr. Lior Shemesh",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Netanya",
    "phone": "053-9956324 / 09-7447322 / 09-7443948",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=420324BEC54987D8D527E9BE2AE154487341B3FAB4E719BFFF1B070D526DE3A4",
    "address": "Amnon veTamar 6, Netanya",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-775",
    "name": "Dra. Ingrid Karina Feinwaks Levy",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Be'er Sheva",
    "phone": "08-6416622 / 073-2284757",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=C1C9A7D321D5D6E858B1CB5A8A962083F3F2F66C4CE676ADF0A3FF616730B869",
    "address": "Yohanna Jabotinsky 30, Beer Sheva",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-776",
    "name": "Dra. Ester Sadeh",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Petah Tikva",
    "phone": "03-9767220 / 03-6326422",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=BC4773D08FB32FAD41115C672FD83A4FF9A2706E683DFC3F32CF7660A9E11E7B",
    "address": "Carretera Menachem Begin 94, Petaj Tikvá",
    "acceptsNewPatients": false
  },
  {
    "id": "doc-777",
    "name": "Dra. Sonia Blank",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Ashkelon",
    "phone": "08-6554419",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=D3C8A7B571E47BE3F01A46E235592A2F902BF6004C7E66ACB73912E7D015DB25",
    "address": "HaGdud HaIvri 10, Ashkelon",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-778",
    "name": "Dr. Vivian Shul Amsalem",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Givatayim",
    "phone": "03-5739260 / 03-5739261",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=F0D03491132414A1F61FD192037377F01615BE7481E6FE5E449229AAFB61FC0A",
    "address": "Katzenelson 96, Givatayim",
    "acceptsNewPatients": false
  },
  {
    "id": "doc-779",
    "name": "Dr. Silvina Metzkin",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Yehud-Monosson",
    "phone": "03-5396222",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=C5921C95C08159BE7366A4A10488CF1584B8B2B60E5F302F1ADF3EF72701A938",
    "address": "Derech HaAtzmaut 56, Yehud-Monosson",
    "acceptsNewPatients": false
  },
  {
    "id": "doc-780",
    "name": "Dr. Moshe Nechmad",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Nahariya",
    "phone": "04-9878400 / 073-2284309",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=71AF365C465A9A84CD1C1E5E4D9F9DE4902835EB84BF63E6C665C71BE2E22B89",
    "address": "Wolfson 4, Nahariya",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-781",
    "name": "Dr. Zvi Bokman",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Beit Shemesh",
    "phone": "053-9900321 / 02-9915008 / 02-6544306",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=BC09B854ADFAE7C10E43443AC5776854364AD56C0FE36394AFD482366FAF8DDC",
    "address": "Derech Yitzhak Rabin 2, Beit Shemesh",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-782",
    "name": "Dr. Liat Lin Gilad Toren",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Kiryat Ono",
    "phone": "052-5609130 / 03-5229485",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=833F0F07DBF26D8BEBF863547C4B4FA1509C00BF9AAAD37AF97EBE8E3EAD7D1A",
    "address": "Jerusalem 39, Kiryat Ono",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-783",
    "name": "Dr. Yehudit Kartas",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Kfar Saba",
    "phone": "09-7446765 / 09-7446769",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=166FB92DFB161997E6B7EF9968BE24CE8F01FA99308691353EC9051652538D87",
    "address": "Weizmann 42, Kfar Saba",
    "acceptsNewPatients": false
  },
  {
    "id": "doc-784",
    "name": "Dr. Yaakov Ben Gigi",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Hadera",
    "phone": "053-9956768 / 04-6860775 / 04-6860776",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=F91372060531721984755D0A4AA656C663ABEA1BB81AD07FA00DA4DFD278CC71",
    "address": "Hillel Yaffe Street 11, Hadera",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-785",
    "name": "Dr. Shadi Khoury",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Karmiel",
    "phone": "04-9027222",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=4A16167CB1E146B210FA2B03A05A2047E777A572259C41877B35FD51C577707D",
    "address": "HaShoshanim 128, Karmiel",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-786",
    "name": "Dr. Lilian Elnatan-Stern",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Even Yehuda",
    "phone": "09-7774600 / 073-2284107",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=F2A1B483A0599E08BA7A1D8FAA46CEB502E8E99C1B86584DF7EE2194201FB6E6",
    "address": "HaMeyasdim 62, Even Yehuda",
    "acceptsNewPatients": false
  },
  {
    "id": "doc-787",
    "name": "Dr. Rachel Shechtman",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Modi'in Illit",
    "phone": "08-6258700 / 073-2132699",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=A4FE68CD4530EE4B3CEAF3303879EFA662DF343E062A4497E4798607479844BD",
    "address": "Avnei Nezer 46, Modi'in Illit",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-788",
    "name": "Dr. Adam Strier",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Haifa",
    "phone": "053-9955410 / 04-8340280 / 04-8242899",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=321ED4B6185F53DC2228013501ED9A2FC3FC7BD2FCB48AFC4DB9E2092C20BAF3",
    "address": "Sderot Moriah 84, Haifa",
    "acceptsNewPatients": false
  },
  {
    "id": "doc-789",
    "name": "Dr. Rachel Shechtman",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Modi'in Illit",
    "phone": "08-6258700 / 073-2132699",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=A5034951CCD310EC6CC025B44F2CBFD7EDBA56990DB9E22D82650D669B172F77",
    "address": "Sderot HaRav MiPonevezh 9, Modi'in Illit",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-790",
    "name": "Dr. Shani Glazer-Reiss",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Gan Yavne",
    "phone": "08-8573613 / 073-2284765",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=EB89C60A1FF6C50E088E643ECB9B837FAB69ABDA56B23853AFFC987AA8988B5B",
    "address": "HaMeginim 56, Gan Yavne",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-791",
    "name": "Dr. Judith Prus",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Givatayim",
    "phone": "03-5726262 / 073-2132380",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=DA011FC4F4BC312C76169C7E7976F422453462AB1EE6E77020068A871E1AE13B",
    "address": "Aliyat HaNoar 25, Givatayim",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-792",
    "name": "Dr. Lilian Blum",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Haifa",
    "phone": "03-5114148 / 04-6087050",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=D6C4BBBEA17F597018838A71CD4F4E0EDAD76EAC5DBD3B47C91748773D5FA9D8",
    "address": "HaTichon 37, Haifa",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-793",
    "name": "Dr. Alon Spitz",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Gan Yavne",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=39C0F66A9098295F9FE047956C9162CA4F4B4BFB7C5589D6952B7BA000884F69",
    "address": "HaMeginim 56, Gan Yavne",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-794",
    "name": "Dr. Yosef Kushnir",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Haifa",
    "phone": "04-6164860 / 076-8893597",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=A17288BB23A67BA3E7BB8DC0BCE60C028AF911A4119BFBEC32D0B999AC78E1A9",
    "address": "Moshe Pliman 8, Haifa",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-795",
    "name": "Dr. Elaini Weinfeld",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Ramat Gan",
    "phone": "03-6750333 / 073-2132373",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=96D1B5349D4C2518AB51600D18609DAFF02A891AF2A95EF11FAD8C3B737F291F",
    "address": "Haim Landau 7, Ramat Gan",
    "acceptsNewPatients": false
  },
  {
    "id": "doc-796",
    "name": "Dr. Hashmonai Drazon",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Bat Yam",
    "phone": "03-6588870 / 03-5084043",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=3A32B00796414540D38A2E659651C77081AC94FE573C83CBE59292A02611C5DB",
    "address": "Rothschild 7, Bat Yam",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-797",
    "name": "Dr. Omer Goldstein",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Haifa",
    "phone": "04-8332070 / 04-6883179",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=E6B4AF1BB2A61B455AF6226CB5FDE50E82EBA195EAC9AF0792F3864B1351249B",
    "address": "Sderot HaNasi 29, Haifa",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-798",
    "name": "Dr. Ibrahim Dandis",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Jerusalén",
    "phone": "02-6280964 / 02-6260136",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=09AB133649AE458BE2CE080930C68A75C628C0E21EF1B6200F8FD142C067E08A",
    "address": "Salah al-Din 10, Jerusalén",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-799",
    "name": "Dr. Urian Globus",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tzur Yitzhak",
    "phone": "09-8868270",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=490F050A2AAF8529CF8F812F966D19BB4E83A394F8C73DD7EFED21355393D4D9",
    "address": "Nahal Ayalon 20, Tzur Yitzhak",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-800",
    "name": "Dr. Iris Bichler-Karshin",
    "specialty": "Neurooftalmología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Bat Yam",
    "phone": "03-5517001 / 03-5082059",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=FAE053A2ADB6D46710CF5C3D2C93C2718A774AFE90DA482D67E795AB8DDA758E",
    "address": "Rothschild 29, Bat Yam",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-801",
    "name": "Dr. Anat Gabay",
    "specialty": "Neurooftalmología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Ramat Gan",
    "phone": "052-2603272",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=3B6C58126E16D02A502CB0806B8EAF97ECED940F64D7F3A4241585041197E0E3",
    "address": "Abba Ahimeir 4, Ramat Gan",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-802",
    "name": "Dr. Karina Bachar",
    "specialty": "Medicina de la menopausia",
    "kupot": [
      "Maccabi"
    ],
    "city": "Modi'in",
    "phone": "08-9737666 / 08-6866960",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=5EECFFD06C024E91491A396205A24B5640BEB2A0592DAB59AB3BEAFCD34078B0",
    "address": "Taltan 8, Modi'in-Maccabim-Reut",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-803",
    "name": "Dr. Veronika Yehezkel",
    "specialty": "Oftalmología pediátrica y estrabismo",
    "kupot": [
      "Maccabi"
    ],
    "city": "Netanya",
    "phone": "073-2349706",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=0326A870F7D0C64F1BE612466EA5B0C10A54A9438A4F164A00EBAAC47D9387F7",
    "address": "Karl Popper 7, Netanya",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-804",
    "name": "Dr. Tamar Shafran",
    "specialty": "Oftalmología pediátrica y estrabismo",
    "kupot": [
      "Maccabi"
    ],
    "city": "Hadera",
    "phone": "03-5116008 / 04-6307089 / 054-9042272 הודעות ווטס-אפ",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=E2FB47373E34AEA50E091C0ED26EFBC91762A0D39D00CEEA72314B343EC7E683",
    "address": "Prof. Dan Shechtman 10, Hadera",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-805",
    "name": "Dr. Claudia Yahalom",
    "specialty": "Oftalmología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Jerusalén",
    "phone": "02-6778899",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=A2237FBBD6748695C751EB01221A5C41336ADDE2B7334D52464E186089295694",
    "address": "Centro Médico Hadassah Ein Kerem, Jerusalén",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-806",
    "name": "Dr. Daniel Moraninكس",
    "specialty": "Cardiología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Lod",
    "phone": "08-9242219 / 08-9248515 / 15386918848",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=3C9235C02273577317DD8CCBF6A6EAAC13A1EBD2A3CDBEA25FEF5B7D09377C35",
    "address": "Sderot HaTziyonut 1, Lod",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-807",
    "name": "Dr. Ricardo Tovar",
    "specialty": "Cardiología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Ness Ziona",
    "phone": "08-6866580 / 076-8893702",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=38C40942EA124C3BBAAD62E7F76E50868F88EB0D16295C236AF53469F87A45B3",
    "address": "Avner Ben Ner 1, Ness Ziona",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-808",
    "name": "Dr. Daniel Moraninكس",
    "specialty": "Cardiología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Modi'in",
    "phone": "08-9737666 / 073-2132694",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=952254E1D604DDC4059483A063B8F937D547D105A8303287C1D264D564004F58",
    "address": "Taltan 8, Modi'in-Maccabim-Reut",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-809",
    "name": "Dr. Alberto Handler",
    "specialty": "Cardiología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Rishon LeZion",
    "phone": "053-9955344 / 073-3214130 / 073-3214140",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=3F78CBAEEF984CC5CCB4E8F06CB6BAA7ECE807B11CD9A675DA310B7ED1B1F29C",
    "address": "HaNachshol 30, Rishon LeZion",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-810",
    "name": "Dr. Gustavo Goldenberg",
    "specialty": "Cardiología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Kiryat Ono",
    "phone": "03-7462360 / 03-5789930",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=9C5DC7BBA3E2114778E7A465F7B8576EF649F5CE81BD201DA55DB47F0128C30D",
    "address": "Yitzhak Rabin 30, Kiryat Ono",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-811",
    "name": "Dr. Pablo Kodner",
    "specialty": "Cardiología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Harish",
    "phone": "04-6164310 / 073-2132410",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=2BA621BFD85EEE90FF1CF40E873628BAD37C478E58248E665F7717418243FF4C",
    "address": "Derech Eretz 35, Harish",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-812",
    "name": "Dr. Pablo Kodner",
    "specialty": "Cardiología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Pardes Hanna - Karkur",
    "phone": "04-8202089 / 04-8141800 / 073-2284105",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=98D75AA2CC979AC6D1BA43D5F764FC17B7B7BD0483347CF359A6C3E927521CB5",
    "address": "Derech HaBanim 17, Pardes Hanna-Karkur",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-813",
    "name": "Dr. Carlos Kafri",
    "specialty": "Cardiología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Be'er Sheva",
    "phone": "08-6267777 / 08-6267799",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=D3EB82FA2AF0A763594D4D0D41732D816026B50F31F87733BE2046EE921FE213",
    "address": "Yitzhak Ben Zvi 10, Beer Sheva",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-814",
    "name": "Prof. Ariel Rogin",
    "specialty": "Cardiología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Haifa",
    "phone": "04-8552239",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=A038C3995812538F417E913835656972B8F444F26565F7E77C9983EB689B84AA",
    "address": "Sderot Moriah 44, Haifa",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-815",
    "name": "Dr. Or Tomer",
    "specialty": "Cardiología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Jerusalén",
    "phone": "02-5842111",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=764E7B526C77E5709DC62C3C1DFAFE7EBFAEA89C93F0C92D7CDD4758FAE100CD",
    "address": "Centro Médico Hadassah Ein Kerem, Jerusalén",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-816",
    "name": "Dr. Miguel Reutman",
    "specialty": "Reumatología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Raanana",
    "phone": "09-7470777 / 073-2284122",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=A14DD95402F48FCAA59B36853A20A307347A286554AA48991339AB5B052A4FEC",
    "address": "Ahuza 124, Ra'anana",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-817",
    "name": "Dr. Miguel Reutman",
    "specialty": "Reumatología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Bnei Brak",
    "phone": "03-5771313 / 073-2284983",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=82B0963A91F853C543EB9B5F4C4875B0D7D8C64F8202D62141AE2CFC53F85601",
    "address": "HaRav Kahaneman 64 V, Bnei Brak",
    "acceptsNewPatients": true
  },
  {
    "id": "doc-818",
    "name": "Dr. Milena Tokotz",
    "specialty": "Reumatología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Bat Yam",
    "phone": "03-5001212 / 073-2132667",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "reviews": [],
    "officialLink": "https://serguide.maccabi4u.co.il/heb/doctors/doctorssearchresults/doctorsinfopage/?ItemKeyIndex=E98EA6B1AD3ABCB0560F5FE5E504ECCD70B09196B6717CCB1B14C78B00C98A0C",
    "address": "Berl Katzenelson 37, Bat Yam",
    "acceptsNewPatients": true
  }
];

export const COMMUNITY_STORES: CommunityStore[] = [
  {
    id: 'store-1',
    logo: '/comunidad/amapola.png',
    filterCategory: 'Panaderías',
    zone: 'Tel Aviv',
    shortAddress: 'Tel Aviv · Ibn Gvirol 54',
    shortHours: 'Dom–Jue 7:30–18:30 · Vie 7:30–14:30',
    tags: ['Alfajores', 'Café', 'Kosher'],
    contacts: [
      { type: 'whatsapp', url: 'https://wa.me/message/JIY7CGHLNO4NI1', label: 'WhatsApp' },
      { type: 'instagram', url: 'https://instagram.com/amapolaalfajores', label: '@amapolaalfajores' },
    ],
    name: 'Amapola Alfajores',
    category: 'Panadería, Café y Facturas',
    city: 'Tel Aviv - Yafo',
    address: 'Ibn Gvirol 54',
    phone: '+972 52-680-1162',
    description: 'Panaderia y cafeteria de alfajores artesanales, hecha por una argentina. Kosher. Confirmado en Instagram (@amapolaalfajores) y Google Maps (4.9 estrellas, 161 resenas al momento de la carga).',
    specialties: ['Alfajores de dulce de leche', 'Alfajores de coco', 'Alfajores de fruta', 'Sandwiches', 'Cafe', 'Trufas'],
    hours: 'Dom-Jue 7:30-18:30, Vie 7:30-14:30, Sab cerrado (confirmado por Instagram, verificar vigencia)',
    isIconic: true,
  },
  {
    id: 'store-2',
    logo: '/comunidad/las-empanadot.png',
    filterCategory: 'Comida casera',
    zone: 'Merkaz',
    shortAddress: 'Delivery en zona Merkaz',
    shortHours: 'Pedidos por WhatsApp',
    tags: ['Empanadas', 'Congeladas o listas', 'Desde 10 ₪'],
    contacts: [
      { type: 'whatsapp', url: 'https://wa.me/972536095976', label: 'WhatsApp' },
      { type: 'instagram', url: 'https://instagram.com/las.empanadot', label: '@las.empanadot' },
      { type: 'facebook', url: 'https://facebook.com/las.empanadot', label: 'Facebook' },
    ],
    name: 'Las Empanadot',
    category: 'Empanadas y Comida Casera',
    city: 'Zona Merkaz (Israel)',
    address: 'Sin local fijo -- delivery en zona Merkaz (según su Instagram).',
    phone: '+972-53-609-5976',
    description: 'Empanadas argentinas caseras, servicio de comida a domicilio. Confirmado en Instagram (@las.empanadot, 1.395 seguidores) y Facebook (las.empanadot).',
    specialties: ['Empanadas argentinas'],
    hours: 'Pedidos por WhatsApp -- consultar dias y horarios de entrega vigentes',
    isIconic: false,
  },
  {
    id: 'store-3',
    logo: '/comunidad/vajula.png',
    filterCategory: 'Por encargo',
    zone: 'Todo Israel',
    shortAddress: 'Envíos a todo Israel',
    shortHours: 'Por encargo',
    tags: ['Alfajores', 'Kosher Mehadrin'],
    contacts: [
      { type: 'whatsapp', url: 'https://wa.me/972548667893', label: 'WhatsApp' },
      { type: 'web', url: 'https://vajula.com', label: 'vajula.com' },
      { type: 'instagram', url: 'https://instagram.com/vajulaalfajores', label: '@vajulaalfajores' },
    ],
    name: 'Vajula Alfajores',
    category: 'Emprendimiento de Olim (Sin Local / Por Encargo)',
    city: 'Israel (por encargo / envio)',
    address: 'Sin local fijo -- contacto por WhatsApp/Instagram',
    phone: '+972 54-866-7893',
    description: 'Alfajores argentinos elaborados en Israel, con certificacion Kosher Mehadrin. Confirmado en Instagram (@vajulaalfajores) y sitio propio vajula.com.',
    specialties: ['Alfajores de chocolate', 'Alfajores surtidos'],
    hours: 'Consultar por WhatsApp o Instagram',
    isIconic: false,
  },
  {
    id: 'store-4',
    filterCategory: 'Productos latinos',
    zone: 'Tel Aviv',
    shortAddress: 'Tel Aviv · Allenby 37',
    shortHours: 'Consultar horarios',
    tags: ['Productos de Argentina', 'Quesos', 'Bebidas'],
    contacts: [
      { type: 'phone', url: 'tel:+97235255880', label: '03-525-5880' },
      { type: 'phone', url: 'tel:+972542027989', label: '054-202-7989' },
      { type: 'email', url: 'mailto:laro.allenby@gmail.com', label: 'laro.allenby@gmail.com' },
    ],
    name: 'Maadaniá Laro (מעדניה לארו)',
    category: 'Almacén Rioplatense / Latino',
    city: 'Tel Aviv - Yafo',
    address: 'Allenby 37, Tel Aviv',
    phone: '+972 3-525-5880',
    description: 'Delicatessen con productos de Argentina y Sudamérica, quesos, bebidas, dulces y conservas. Datos de su tarjeta comercial (tel. 03-5255880, cel. 054-2027989, laro.allenby@gmail.com).',
    specialties: ['Productos de Argentina y Sudamérica', 'Quesos', 'Bebidas', 'Dulces', 'Conservas'],
    hours: 'Consultar',
    isIconic: true,
  },
  {
    id: 'store-5',
    logo: '/comunidad/la-tienda.png',
    filterCategory: 'Productos latinos',
    zone: 'Tel Aviv',
    shortAddress: 'Tel Aviv · Levanda 13',
    shortHours: 'Dom–Jue 10:00–22:00 · Vie 9:00–23:00',
    tags: ['Harina P.A.N.', 'Pulpas de fruta', 'Congelados'],
    contacts: [
      { type: 'whatsapp', url: 'https://wa.me/972509269777', label: 'WhatsApp' },
      { type: 'instagram', url: 'https://instagram.com/la_tienda_en_israel', label: '@la_tienda_en_israel' },
      { type: 'web', url: 'https://tap.bio/@la_tienda_en_israel', label: 'tap.bio' },
    ],
    name: 'La Tienda - Comida Latina',
    category: 'Almacén Rioplatense / Latino',
    city: 'Tel Aviv - Yafo',
    address: 'Levanda 13, Tel Aviv',
    phone: '+972 50-926-9777',
    description: 'Comida y productos latinos: Harina P.A.N., frijoles, tortillas de maíz, pulpas de fruta, panela y quesos.',
    specialties: ['Harina P.A.N.', 'Frijoles', 'Tortillas de maíz', 'Pulpas de fruta', 'Panela', 'Quesos'],
    hours: 'Dom–Jue 10:00–22:00, Vie 9:00–23:00 (confirmado en Instagram @la_tienda_en_israel)',
    isIconic: false,
  },
];

export const COMMUNITY_GROUPS: CommunityGroup[] = [];

export const NIGHTLIFE_VENUES: NightlifeVenue[] = [
  {
    id: 'venue-1',
    name: 'Cachengue TLV',
    category: 'Fiesta & Baile Latino',
    city: 'Tel Aviv - Yafo',
    address: 'Sin locacion fija -- productora de eventos (ej. After Beach Club, Cafe Cachengue). Una edicion se registro en Google Maps en Kikar Plumer (Litzman), Tel Aviv - Yafo.',
    musicStyles: ['Variado -- la propia cuenta aclara "ni mainstream, ni musica latina"'],
    schedule: 'Eventos puntuales sin fecha fija. Su propia cuenta aclara que no es música latina. Mira la próxima fecha en @cachengue.tlv.',
    atmosphere: 'Productora de fiestas / after beach club, segun resenas de Google Maps buena recepcion entre asistentes.',
    description: 'Productora de eventos confirmada por Instagram (@cachengue.tlv, ~4.800 seguidores) y Google Maps (5.0 estrellas, 4 resenas al momento de la carga). No es exclusivamente fiesta latina -- verificar el estilo del proximo evento antes de ir.',
    highlights: [],
    instagramOrWeb: '@cachengue.tlv',
    isPopularWithOlim: false,
  },
  {
    id: 'venue-2',
    name: 'Pasión Latina',
    category: 'Boliche & Club Latino',
    city: 'Tel Aviv - Yafo',
    address: 'Morfium Club, Ibn Gabirol 30 (Piso -1), Tel Aviv',
    musicStyles: ['Reggaeton', 'Old School'],
    schedule: 'Fiestas recurrentes (más de 11 años de trayectoria, según su propia cuenta). No hay un calendario fijo publicado: mira la próxima fecha en su cuenta.',
    atmosphere: 'Discoteca y club nocturno de reggaeton, con DJs y line-up rotativo.',
    description: 'Fiesta de reggaeton de larga trayectoria en Tel Aviv. Confirmado por Instagram -- IMPORTANTE: la cuenta encontrada (@pasionlatina_backup) se identifica como cuenta de respaldo, no la principal; confirmar cual esta activa antes de compartir el link a la comunidad.',
    highlights: ['DJs rotativos', 'Eventos tematicos (ej. Sukkot Party)'],
    instagramOrWeb: 'linktr.ee/PasionLatinatlv (cuenta backup: @pasionlatina_backup)',
    isPopularWithOlim: false,
  },
  {
    id: 'venue-3',
    name: 'Havana Music Club',
    category: 'Salsa & Bachata Social',
    city: 'Tel Aviv - Yafo',
    address: 'Yigal Alon St 126',
    musicStyles: ['Salsa', 'Bachata', 'Kizomba'],
    schedule: 'Lun 21:00–00:00 · Mar 21:00–02:00 · Mié 20:30–23:30 · Jue 21:00–04:00 · Vie 20:30–04:00 · Sáb 16:00–20:00 y 21:00–03:30 · Dom 21:00–02:00. Tel. +972 3-562-3456.',
    atmosphere: 'Club social de baile latino con clases de salsa, bachata y kizomba para distintos niveles.',
    description: 'Club de baile latino confirmado en Google Maps (4.2 estrellas, 437 resenas al momento de la carga). Ofrece clases y noches sociales.',
    highlights: ['Clases de Salsa', 'Clases de Bachata', 'Clases de Kizomba'],
    phoneOrTickets: '+972 3-562-3456',
    isPopularWithOlim: false,
  },
];
