import { withBase } from "@/lib/base-path";

const startsAt = "2027-01-23T21:30:00-03:00";

const place = "Centro de Jubilados Mi Refugio";
const address = "Blandengues N° 189";
const city = "Lezama";

const mapsQuery = `${place}, ${address}, ${city}, Buenos Aires, Argentina`;

const whatsappText =
  "Hola, quiero confirmar mi asistencia a los XV de Lucía el sábado 23 de enero.";

export const event = {
  name: "Lucía",
  startsAt,
  dateLabel: "Sábado 23/01/27",
  timeLabel: "21:30 hs",
  place,
  address,
  city,
  rsvpBy: "15/12/26",
  phoneDisplay: "2241-547900",
  phoneTel: "tel:+542241547900",
  quote: [
    "Se acerca una noche mágica y muy especial para mí y me gustaría compartirla contigo porque eres una parte importante de mi vida.",
    "Te espero para que disfrutemos juntos mis XV años!!!",
  ],
  signature: "Lucía",
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`,
  whatsappUrl: `https://wa.me/542241547900?text=${encodeURIComponent(whatsappText)}`,
  calendarUrl: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("XV de Lucía")}&dates=20270124T003000Z/20270124T043000Z&details=${encodeURIComponent("Fiesta de XV de Lucía. Confirmar asistencia hasta el 15/12/26 al 2241-547900.")}&location=${encodeURIComponent(`${place}, ${address}, ${city}`)}`,
  musicSrc: withBase("/audio/xv.mp3"),
};
