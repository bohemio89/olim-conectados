import { Doctor, CommunityStore, CommunityGroup, NightlifeVenue } from '../types';

// Fuente: Piedra Libre Digital (https://www.piedralibre.co.il/listado-de-medicos-y-profesionales)
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
    "address": "Naharía",
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
    "city": "Rosh Haayin",
    "address": "Rosh Haayin",
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
    "address": "Modi'in",
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
    "city": "Tel Aviv - Yafo",
    "address": "Tel Aviv - Yafo",
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
    "address": "Kfar Saba",
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
    "address": "Jerusalén",
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
    "address": "Be'er Sheva",
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
    "address": "Herzliya",
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
    "city": "Modiin - Maccabim Reut",
    "address": "Modiin - Maccabim Reut",
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
    "address": "Haifa",
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
    "address": "Netanya",
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
    "address": "Hertzlia",
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
    "address": "Kiriat Gat",
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
    "address": "Givatayim",
    "phone": "03-5739260",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": true,
    "reviews": []
  },
  {
    "id": "doc-18",
    "name": "Dra. Helena Honigman",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "address": "Tel Aviv-Yafo",
    "phone": "03-5602469",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": true,
    "reviews": []
  },
  {
    "id": "doc-19",
    "name": "Nice Moshe",
    "specialty": "Medicina Familiar (Rofé Mishpajá)",
    "kupot": [
      "Maccabi"
    ],
    "city": "Naharia",
    "address": "Naharia",
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
    "address": "Netanya",
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
    "address": "Yavne",
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
    "address": "Ierujam (20 min de Beer Sheva)",
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
    "address": "Givatayim",
    "phone": "03-5726262",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": true,
    "reviews": []
  },
  {
    "id": "doc-24",
    "name": "Dorin Uriel Matías",
    "specialty": "Medicina Familiar (Rofé Mishpajá)",
    "kupot": [
      "Maccabi"
    ],
    "city": "Netanya",
    "address": "Netanya",
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
    "address": "Even Yehuda",
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
    "address": "Tel Mond",
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
    "address": "Raanana",
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
    "address": "Hadera",
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
    "address": "Haifa",
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
    "address": "Gedera",
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
    "city": "Petaj Tikva",
    "address": "Petaj Tikva",
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
    "city": "Beer Sheva",
    "address": "Beer Sheva",
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
    "address": "Haifa",
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
    "name": "Moore Felix",
    "specialty": "Medicina Familiar (Rofé Mishpajá)",
    "kupot": [
      "Maccabi"
    ],
    "city": "Ramat Gan",
    "address": "Ramat Gan",
    "phone": "09-7670216",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "Fuente: Piedra Libre Digital (directorio comunitario). Verificar vigencia, especialidad exacta y cobertura directamente con el profesional antes de sacar turno.",
    "receptionHours": "Consultar directamente al profesional",
    "acceptsNewPatients": false,
    "reviews": []
  },
  {
    "id": "doc-36",
    "name": "Kertész Judith",
    "specialty": "Medicina Familiar (Rofé Mishpajá)",
    "kupot": [
      "Maccabi"
    ],
    "city": "Kfar Saba",
    "address": "Kfar Saba",
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
    "address": "Harish",
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
    "address": "Beit Shemesh",
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
    "address": "Beer Sheva / Tel Aviv",
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
    "address": "Ashdod",
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
    "address": "Kfar Saba",
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
    "address": "Kiriat Bialik",
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
    "city": "Ra'anana",
    "address": "Ra'anana",
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
    "address": "Rosh Hayin",
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
    "address": "Kfar Saba",
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
    "address": "Kohav Yaakov / Tel Tzion / Shaar Binyamin",
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
    "address": "Netanya",
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
    "address": "Kfar Saba",
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
    "address": "Naharia / Kiryat Yam",
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
    "city": "Beer Sheva",
    "address": "Beer Sheva",
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
    "address": "Shoham",
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
    "city": "Modiin - Maccabim - Reut",
    "address": "Modiin - Maccabim - Reut",
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
    "name": "Schneiderman Daniel",
    "specialty": "Pediatría (Rofé Yeladim)",
    "kupot": [
      "Maccabi"
    ],
    "city": "Holon",
    "address": "Holon",
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
    "id": "doc-56",
    "name": "Moore Naomi",
    "specialty": "Pediatría (Rofé Yeladim)",
    "kupot": [
      "Maccabi",
      "Meuhedet"
    ],
    "city": "Raanana",
    "address": "Raanana",
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
    "address": "Bnei Brak",
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
    "address": "Ashkelon",
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
    "address": "Yehud",
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
    "address": "Carmiel",
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
    "address": "Eilat",
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
    "address": "Jerusalem",
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
    "address": "Bnei Brak / Guivat Shmuel",
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
    "address": "Jerusalem",
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
    "address": "Raanana",
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
    "address": "Hod HaSharon",
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
    "address": "Rishon LeZion",
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
    "address": "Ashdod",
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
    "address": "Kfar Saba",
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
    "address": "Petaj Tikva / Tel Aviv / Raanana / Kfar Saba",
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
    "address": "Raanana",
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
    "address": "Or Yehuda",
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
    "address": "Kfar Saba",
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
    "address": "Kfar Saba",
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
    "address": "Kfar Saba",
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
    "address": "Ramat Gan",
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
    "address": "Moshav Hosen",
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
    "city": "Hod Hasharón",
    "address": "Hod Hasharón",
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
    "address": "Eilat",
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
    "address": "Gan Yavne",
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
    "address": "Mevatseret Tzion / Jerusalem",
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
    "address": "Kiriat Yam",
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
    "address": "Modi'in",
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
    "address": "Nahariya",
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
    "city": "Beer Sheva",
    "address": "Beer Sheva",
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
    "address": "Pardes Hana Karkur",
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
    "address": "Kfar Saba",
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
    "address": "Harish",
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
    "address": "Ramat Gan",
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
    "address": "Rehovot",
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
    "city": "Modiin - Macabim - Reut",
    "address": "Modiin - Macabim - Reut",
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
    "address": "Kfar Saba",
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
    "address": "Kfar Saba",
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
    "address": "Raanana",
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
    "address": "Netanya",
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
    "city": "Modiin - Macabim - Reut",
    "address": "Modiin - Macabim - Reut",
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
    "address": "Ramat Hasharon",
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
    "address": "Netanya",
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
    "address": "Haifa",
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
    "address": "Kiriat Haim",
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
    "address": "Haifa / Kiriat Yam",
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
    "city": "Modiin",
    "address": "Modiin",
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
    "address": "Hedera / Netanya",
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
    "address": "Netanya / Kfar Saba",
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
    "city": "Tel Aviv",
    "address": "Tel Aviv",
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
    "address": "Raanana",
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
    "address": "Raanana",
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
    "address": "Netanya",
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
    "city": "Hertzlía",
    "address": "Hertzlía",
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
    "address": "Kfar Saba",
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
    "address": "Kfar Yona",
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
    "address": "Acco",
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
    "address": "Hedera",
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
    "address": "Netanya",
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
    "address": "Kiriat Bialik",
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
    "address": "Ariel / Petaj Tikva / Ramat Gan",
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
    "address": "Petah Tikva",
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
    "address": "Raanana",
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
    "address": "Ramat Hasharon",
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
    "address": "Beit Shemesh / Jerusalem (Hospital Shaarey Zedek)",
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
    "city": "Tel Aviv - Yafo",
    "address": "Sha'ul HaMelech 8, Tel Aviv - Yafo (Edificio Amot HaMishpat / Migdal Psagot, piso -1)",
    "phone": "03-5562454 (turnos: *3555)",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il) el 27/09/2026. Habla hebreo, espanol e ingles. Sin costo de copago para socios de Maccabi.",
    "receptionHours": "Dom 9:00-13:15, Lun 15:30-20:00, Mar 15:30-20:00 (segun cartilla oficial de Maccabi, verificar vigencia)",
    "acceptsNewPatients": true,
    "reviews": []
  },
  {
    "id": "doc-123",
    "name": "Dr. Michael Ashkenazi",
    "specialty": "Ginecología y Obstetricia",
    "kupot": [
      "Clalit"
    ],
    "city": "Rishon LeZion",
    "address": "Rishon LeZion",
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
    "address": "Rishon LeZion",
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
    "address": "Tamra",
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
    "address": "Jerusalén",
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
    "address": "Jerusalén",
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
    "address": "Abu Ghosh",
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
    "address": "Elad",
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
    "address": "Arad",
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
    "address": "Nahariya",
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
    "address": "Binyamina - Giv'at Ada",
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
    "address": "Ashdod",
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
    "address": "Pardes Hanna - Karkur",
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
    "address": "Hod HaSharon",
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
    "address": "Holon",
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
    "address": "Ashdod",
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
    "address": "Jerusalén",
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
    "city": "Tel Aviv - Yafo",
    "address": "Tel Aviv - Yafo",
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
    "address": "Yehud-Monosson",
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
    "address": "Be'er Ya'akov",
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
    "address": "Haifa",
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
    "address": "Rosh HaAyin",
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
    "address": "Eilon",
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
    "address": "Kfar Netter",
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
    "address": "Nahariya",
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
    "address": "Sderot",
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
    "address": "Sderot",
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
    "address": "Sderot",
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
    "address": "Sderot",
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
    "address": "Kiryat Tiv'on",
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
    "address": "Binyamina - Giv'at Ada",
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
    "address": "Rishon LeZion",
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
    "address": "Nof HaGalil",
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
    "address": "Pardes Hanna - Karkur",
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
    "address": "Nof HaGalil",
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
    "address": "Haifa",
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
    "address": "Jerusalén",
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
    "address": "Beit Shemesh",
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
    "address": "Bat Yam",
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
    "address": "Jerusalén",
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
    "address": "Efrat",
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
    "address": "Jerusalén",
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
    "address": "Netanya",
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
    "address": "Nof HaGalil",
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
    "address": "Modi'in",
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
    "address": "Ma'ale Adumim",
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
    "address": "Efrat",
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
    "address": "Jerusalén",
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
    "address": "Jerusalén",
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
    "address": "Beit Shemesh",
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
    "address": "Nesher",
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
    "address": "Jerusalén",
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
    "address": "Jerusalén",
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
    "address": "Jerusalén",
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
    "address": "Jerusalén",
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
    "address": "Tzora",
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
    "address": "Jerusalén",
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
    "address": "Jerusalén",
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
    "address": "Beitar Illit",
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
    "address": "Ma'ale Adumim",
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
    "address": "Beit Shemesh",
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
    "address": "Beit Shemesh",
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
    "address": "Mevaseret Zion",
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
    "address": "Jerusalén",
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
    "address": "Beit Shemesh",
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
    "address": "Jerusalén",
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
    "address": "Jerusalén",
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
    "address": "Jerusalén",
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
    "address": "Jerusalén",
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
    "address": "Beit El",
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
    "city": "Tel Aviv - Yafo",
    "address": "Tel Aviv - Yafo",
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
    "address": "Jerusalén",
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
    "address": "Jerusalén",
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
    "address": "Proctología y Mastología",
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
    "city": "Tel Aviv - Yafo",
    "address": "Tel Aviv - Yafo",
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
    "city": "Tel Aviv - Yafo",
    "address": "Tel Aviv - Yafo",
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
    "city": "Tel Aviv - Yafo",
    "address": "Tel Aviv - Yafo",
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
    "city": "Tel Aviv - Yafo",
    "address": "Tel Aviv - Yafo",
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
    "address": "Holon",
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
    "address": "Holon",
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
    "city": "Tel Aviv - Yafo",
    "address": "Tel Aviv - Yafo",
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
    "city": "Tel Aviv - Yafo",
    "address": "Tel Aviv - Yafo",
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
    "address": "Bat Yam",
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
    "address": "Bat Yam",
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
    "city": "Tel Aviv - Yafo",
    "address": "Tel Aviv - Yafo",
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
    "city": "Tel Aviv - Yafo",
    "address": "Tel Aviv - Yafo",
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
    "city": "Tel Aviv - Yafo",
    "address": "Tel Aviv - Yafo",
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
    "city": "Tel Aviv - Yafo",
    "address": "Tel Aviv - Yafo",
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
    "city": "Tel Aviv - Yafo",
    "address": "Tel Aviv - Yafo",
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
    "address": "Kiryat Ono",
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
    "address": "Bnei Brak",
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
    "address": "Bnei Brak",
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
    "address": "Kiryat Ono",
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
    "address": "Petah Tikva",
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
    "address": "Hod HaSharon",
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
    "address": "Petah Tikva",
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
    "address": "Petah Tikva",
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
    "address": "Kiryat Bialik",
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
    "address": "Safed (Tzfat)",
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
    "address": "Petah Tikva",
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
    "address": "Petah Tikva",
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
    "address": "Rosh HaAyin",
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
    "address": "Elad",
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
    "city": "Giv'atayim",
    "address": "Giv'atayim",
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
    "address": "Jerusalén",
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
    "address": "Jerusalén",
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
    "address": "Hod HaSharon",
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
    "address": "Einat",
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
    "address": "Rehovot",
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
    "address": "Sderot",
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
    "address": "Be'er Sheva",
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
    "address": "Modi'in",
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
    "address": "Petah Tikva",
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
    "address": "Nahariya",
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
    "address": "Bnei Brak",
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
    "address": "Petah Tikva",
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
    "address": "Kiryat Ono",
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
    "address": "Karmiel",
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
    "address": "Haifa",
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
    "address": "Deir Hanna",
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
    "address": "Sakhnin",
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
    "address": "Kiryat Ata",
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
    "address": "Haifa",
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
    "address": "Kiryat Motzkin",
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
    "address": "Kiryat Ata",
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
    "address": "Haifa",
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
    "address": "Rechasim",
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
    "address": "Tirat Carmel",
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
    "address": "Haifa",
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
    "address": "Kiryat Bialik",
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
    "address": "Kiryat Bialik",
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
    "address": "Haifa",
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
    "address": "Haifa",
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
    "address": "Kiryat Bialik",
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
    "address": "Haifa",
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
    "address": "Sakhnin",
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
    "address": "Majd al-Krum",
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
    "address": "Kfar Menahem",
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
    "address": "Na'an",
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
    "address": "Rehovot",
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
    "address": "Mazkeret Batya",
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
    "address": "Ashdod",
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
    "address": "Rishon LeZion",
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
    "address": "Sderot",
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
    "address": "Ashdod",
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
    "address": "Modi'in Illit",
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
    "address": "Modi'in Illit",
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
    "address": "Kfar Chabad",
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
    "address": "Be'er Sheva",
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
    "address": "Modi'in",
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
    "address": "Shoham",
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
    "address": "Sderot",
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
    "address": "Sderot",
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
    "address": "Hura",
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
    "address": "Be'er Sheva",
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
    "address": "Be'er Sheva",
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
    "address": "Be'er Sheva",
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
    "address": "Be'er Sheva",
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
    "address": "Be'er Sheva",
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
    "address": "Tel Sheva",
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
    "address": "Be'er Sheva",
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
    "address": "Endoscopia y Colonoscopia",
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
    "address": "Be'er Sheva",
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
    "address": "Be'er Sheva",
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
    "address": "Kiryat Gat",
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
    "address": "Be'er Sheva",
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
    "address": "Be'er Sheva",
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
    "address": "Be'er Sheva",
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
    "address": "Herzliya",
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
    "address": "Tzur Yitzhak",
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
    "address": "Herzliya",
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
    "address": "Sderot",
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
    "city": "Ra'anana",
    "address": "Ra'anana",
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
    "address": "Herzliya",
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
    "address": "Kfar Saba",
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
    "address": "Herzliya",
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
    "address": "Netanya",
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
    "address": "Kfar Saba",
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
    "address": "Eyal",
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
    "address": "Kfar Saba",
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
    "address": "Herzliya",
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
    "address": "Immanuel",
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
    "address": "Kfar Saba",
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
    "address": "Netanya",
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
    "address": "Kfar Saba",
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
    "address": "Kfar Saba",
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
    "address": "Kfar Saba",
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
    "address": "Netanya",
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
    "address": "Kfar Saba",
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
    "address": "Kfar Yona",
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
    "address": "Pardes Hanna - Karkur",
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
    "address": "Hadera",
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
    "address": "Hadera",
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
    "address": "Mishmar HaSharon",
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
    "address": "Or Akiva",
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
    "address": "Or Akiva",
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
    "address": "Hadera",
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
    "address": "Hadera",
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
    "address": "Kafr Qara",
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
    "address": "Pardes Hanna - Karkur",
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
    "address": "Kafr Qara",
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
    "city": "Ramat HaSharon",
    "address": "Ramat HaSharon",
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
    "address": "Herzliya",
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
    "address": "Afula",
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
    "address": "Afula",
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
    "address": "Eilat",
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
    "address": "Eilat",
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
    "address": "Jerusalén",
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
    "address": "Eilat",
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
    "address": "Eilat",
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
    "address": "Eilat",
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
    "address": "Eilat",
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
    "address": "Ashdod",
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
    "address": "Ariel",
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
    "address": "Holon",
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
    "city": "Tel Aviv - Yafo",
    "address": "Tel Aviv - Yafo",
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
    "city": "Tel Aviv - Yafo",
    "address": "Tel Aviv - Yafo",
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
    "address": "Givatayim",
    "phone": "053-9859839",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": []
  },
  {
    "id": "doc-350",
    "name": "Dra. Judith Pross",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Givatayim",
    "address": "Givatayim",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": []
  },
  {
    "id": "doc-351",
    "name": "Dr. Gabriel Kenet",
    "specialty": "Gastroenterología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Givatayim",
    "address": "Givatayim",
    "phone": "053-9955965",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": []
  },
  {
    "id": "doc-352",
    "name": "Dr. Uriel Katz",
    "specialty": "Inmunología / Alergología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "address": "Tel Aviv-Yafo",
    "phone": "03-5476685",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": []
  },
  {
    "id": "doc-353",
    "name": "Dra. Lilian Maoz",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "address": "Tel Aviv-Yafo",
    "phone": "03-5287505",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": []
  },
  {
    "id": "doc-354",
    "name": "Dr. Tal Romah",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "address": "Tel Aviv-Yafo",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": []
  },
  {
    "id": "doc-355",
    "name": "Dr. Zvi Cohen",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "address": "Tel Aviv-Yafo",
    "phone": "03-5195090",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": []
  },
  {
    "id": "doc-356",
    "name": "Dr. Zeev Marmor",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "address": "Tel Aviv-Yafo",
    "phone": "053-9955472",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": []
  },
  {
    "id": "doc-357",
    "name": "Dr. Eyal Risher",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "address": "Tel Aviv-Yafo",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": []
  },
  {
    "id": "doc-358",
    "name": "Dr. Hagai Ben Sasson",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "address": "Tel Aviv-Yafo",
    "phone": "053-9956083",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": []
  },
  {
    "id": "doc-359",
    "name": "Dra. Eliani Weinfeld",
    "specialty": "Geriatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "address": "Tel Aviv-Yafo",
    "phone": "03-7463240",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": []
  },
  {
    "id": "doc-360",
    "name": "Dr. Eduardo Schechter",
    "specialty": "Ginecología / Cuello Uterino",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "address": "Tel Aviv-Yafo",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": []
  },
  {
    "id": "doc-361",
    "name": "Dr. Eliakim Weitzbard",
    "specialty": "Cirugía General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "address": "Tel Aviv-Yafo",
    "phone": "03-6495885",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": []
  },
  {
    "id": "doc-362",
    "name": "Dra. Miriam Herman",
    "specialty": "Pediatría",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "address": "Tel Aviv-Yafo",
    "phone": "03-5281888",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": []
  },
  {
    "id": "doc-363",
    "name": "Dr. Ami Hirsch",
    "specialty": "Oftalmología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "address": "Tel Aviv-Yafo",
    "phone": "053-9857459",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": []
  },
  {
    "id": "doc-364",
    "name": "Dr. Amos Bar",
    "specialty": "Ginecología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "address": "Tel Aviv-Yafo",
    "phone": "03-6994575",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": []
  },
  {
    "id": "doc-365",
    "name": "Dr. Daniel Kugler",
    "specialty": "Ginecología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "address": "Tel Aviv-Yafo",
    "phone": "03-5117787",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": []
  },
  {
    "id": "doc-366",
    "name": "Dr. Ricardo Tuber",
    "specialty": "Cardiología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "address": "Tel Aviv-Yafo",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": []
  },
  {
    "id": "doc-367",
    "name": "Dra. Nino Kikozashvili",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "address": "Tel Aviv-Yafo",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": []
  },
  {
    "id": "doc-368",
    "name": "Dra. Tamar Shafran",
    "specialty": "Oftalmología Infantil",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "address": "Tel Aviv-Yafo",
    "phone": "053-9956573",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": []
  },
  {
    "id": "doc-369",
    "name": "Dra. Sharon Gutman Robins",
    "specialty": "Oftalmología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "address": "Tel Aviv-Yafo",
    "phone": "053-9955373",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": []
  },
  {
    "id": "doc-370",
    "name": "Dra. Silvia Rotenberg",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "address": "Tel Aviv-Yafo",
    "phone": "053-8411208",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": []
  },
  {
    "id": "doc-371",
    "name": "Dr. Yoram Miron",
    "specialty": "Oftalmología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "address": "Tel Aviv-Yafo",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": []
  },
  {
    "id": "doc-372",
    "name": "Dra. Michal Dayan",
    "specialty": "Otorrinolaringología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "address": "Tel Aviv-Yafo",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": []
  },
  {
    "id": "doc-373",
    "name": "Dra. Galia Halevy",
    "specialty": "Medicina Familiar y General",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "address": "Tel Aviv-Yafo",
    "phone": "*3555",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": []
  },
  {
    "id": "doc-374",
    "name": "Dra. Sara Rotman",
    "specialty": "Otorrinolaringología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "address": "Tel Aviv-Yafo",
    "phone": "053-9957198",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": []
  },
  {
    "id": "doc-375",
    "name": "Dr. Moti Karpman",
    "specialty": "Ginecología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "address": "Tel Aviv-Yafo",
    "phone": "03-7178244",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": []
  },
  {
    "id": "doc-376",
    "name": "Dr. Ariel Margolis",
    "specialty": "Otorrinolaringología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "address": "Tel Aviv-Yafo",
    "phone": "053-9956836",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": []
  },
  {
    "id": "doc-377",
    "name": "Dr. Carlos Idsses",
    "specialty": "Dermatología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "address": "Tel Aviv-Yafo",
    "phone": "03-6964885",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": []
  },
  {
    "id": "doc-378",
    "name": "Dr. Simon Israeli-Koren",
    "specialty": "Neurología",
    "kupot": [
      "Maccabi"
    ],
    "city": "Tel Aviv-Yafo",
    "address": "Tel Aviv-Yafo",
    "phone": "053-9956105",
    "spanishLevel": "Fluido",
    "rating": 0,
    "reviewsCount": 0,
    "consultationFocus": "VERIFICADO en la cartilla oficial de Maccabi (maccabi4u.co.il).",
    "receptionHours": "Consultar turnos a través de la app de Maccabi o al *3555",
    "acceptsNewPatients": true,
    "reviews": []
  }
];

export const COMMUNITY_STORES: CommunityStore[] = [
  {
    id: 'store-1',
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
    name: 'Las Empanadot',
    category: 'Empanadas y Comida Casera',
    city: 'Zona Merkaz (Israel)',
    address: 'Sin local fijo -- delivery en zona Merkaz. Unidad central en Modiin (segun bio de Instagram).',
    phone: '+972-53-609-5976',
    description: 'Empanadas argentinas caseras, servicio de comida a domicilio. Confirmado en Instagram (@las.empanadot, 1.395 seguidores) y Facebook (las.empanadot).',
    specialties: ['Empanadas argentinas'],
    hours: 'Pedidos por WhatsApp -- consultar dias y horarios de entrega vigentes',
    isIconic: false,
  },
  {
    id: 'store-3',
    name: 'Vajula Alfajores',
    category: 'Emprendimiento de Olim (Sin Local / Por Encargo)',
    city: 'Israel (por encargo / envio)',
    address: 'Sin local fijo -- contacto por WhatsApp/Instagram',
    phone: '',
    description: 'Alfajores argentinos elaborados en Israel, con certificacion Kosher Mehadrin. Confirmado en Instagram (@vajulaalfajores) y sitio propio vajula.com.',
    specialties: ['Alfajores de chocolate', 'Alfajores surtidos'],
    hours: 'Consultar por WhatsApp o Instagram',
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
    schedule: 'Eventos puntuales sin fecha fija -- ver proxima fecha en Instagram @cachengue.tlv antes de planear',
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
    schedule: 'Fiestas recurrentes (mas de 11 anios de trayectoria segun su propia cuenta) -- ver proxima fecha en Instagram antes de ir',
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
    schedule: 'Lun 21:00-00:00, Mar 21:00-02:00, Mie 20:30-23:30, Jue 21:00-04:00, Vie 20:30-04:00, Sab 16:00-20:00 y 21:00-03:30, Dom 21:00-02:00 (verificar vigencia)',
    atmosphere: 'Club social de baile latino con clases de salsa, bachata y kizomba para distintos niveles.',
    description: 'Club de baile latino confirmado en Google Maps (4.2 estrellas, 437 resenas al momento de la carga). Ofrece clases y noches sociales.',
    highlights: ['Clases de Salsa', 'Clases de Bachata', 'Clases de Kizomba'],
    phoneOrTickets: '+972 3-562-3456',
    isPopularWithOlim: false,
  },
];
