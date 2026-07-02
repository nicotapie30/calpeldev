export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const process: ProcessStep[] = [
  {
    number: '01',
    title: 'Conversamos',
    description:
      'Una reunión inicial (gratis, 30 minutos por video o WhatsApp) para entender tu proyecto, objetivos y plazos. Sin compromiso, sin venta forzada.',
  },
  {
    number: '02',
    title: 'Propuesta clara',
    description:
      'En 48hs te envío una propuesta detallada con alcance, cronograma e inversión. Sin sorpresas ni costos ocultos.',
  },
  {
    number: '03',
    title: 'Empezamos',
    description:
      'Con el 50% como anticipo arrancamos. Te envío avances semanales para que vayas validando el proyecto en cada paso.',
  },
  {
    number: '04',
    title: 'Entrega y soporte',
    description:
      'Entregamos el proyecto completo, te capacitamos en lo que necesites y te acompañamos 60 días sin cargo. Después, mantenimiento opcional según lo que necesites.',
  },
];
