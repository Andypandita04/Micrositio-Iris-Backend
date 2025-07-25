-- Script para insertar todos los datos del playbook en testing_card_playbook
-- Ejecutar después de crear la tabla

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  15,
  'Entrevistas a socios y proveedores',
  'Descubrimiento',
  'Exploración',
  'Las entrevistas de socios y proveedores son similares a las entrevistas de clientes, pero se pueden enfocar en si es factible administrar el negocio. Ayuda a complementar las actividades y recursos clave que no se pueden o no se quieren hacer internamente.',
  3,
  3,
  3,
  2,
  NULL,
  True,
  True,
  True,
  True,
  '1 a 3 MIEMBROS',
  'INVESTIGACIÓN',
  '{"herramienta1": "SPARK HIRE https://www.sparkhire.com/ Es una plataforma de entrevistas por video, fácil de usar. Cuenta con más de 6,000 clientes que realizan entrevistas por video en más de 100 países. Utilizar SparkHire ayuda a realizar contrataciones más rápido que nunca.", "herramienta2": "Skype https://www.skype.com/es/ Millones de personas y empresas ya usan Skype para las entrevistas. Se puede conectar con compañeros de trabajo o socios comerciales. Se pueden iniciar conversaciones mediante mensajería instantánea, llamadas de voz y videollamadas."}',
  '["Citas de partes interesadas expertas y comentarios de las entrevistas.", "Cuando las partes interesadas declaran lo que desean ver estratégicamente de la iniciativa, es una evidencia moderadamente fuerte."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  16,
  'Un día en la vida',
  'Descubrimiento',
  'Exploración',
  'El experimento "un día en la vida" es una herramienta cualitativa, fundamentada en la observación para poder comprender mejor las tareas a realizar, los dolores y las ganancias de los clientes. Los pasos a seguir para realizar este experimento son: preparación, permiso, observación y análisis.',
  2,
  2,
  2,
  2,
  NULL,
  True,
  True,
  True,
  False,
  '1 a 3 MIEMBROS',
  'INVESTIGACIÓN',
  '{"herramienta1": "Airtable https://www.airtable.com Puede almacenar, organizar y colaborar con información sobre cualquier tema.", "herramienta2": "Miro https://miro.com/es/ Es una plataforma de pizarra colaborativa online para reunir a los equipos, en cualquier momento y lugar."}',
  '["Notas y actividades sobre las tareas a realizar, los dolores y los beneficios de los clientes observados.", "Dolores del cliente.", "Ganancias del cliente.", "Comentarios de los clientes."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  17,
  'Encuesta de descubrimiento',
  'Descubrimiento',
  'Exploración',
  'La encuesta de descubrimiento es ideal para descubrir la propuesta de valor, las tareas a realizar, los dolores y las ganancias de los clientes.',
  3,
  3,
  3,
  3,
  NULL,
  True,
  True,
  False,
  False,
  '1 a 3 MIEMBROS',
  'INVESTIGACIÓN, PRODUCTO, MARKETING',
  '{"herramienta1": "Qwary https://www.qwary.com/ Es una herramienta que ayuda a las empresas a crear encuestas personalizadas.", "herramienta2": "SurveyMonkey https://es.surveymonkey.com/ Obtén respuestas a través de encuestas."}',
  '["# de respuestas de texto libre: Busque patrones repetitivos en las respuestas a la encuesta.", "# personas dispuestas a ser contactadas después de la encuesta."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  18,
  'Entrevistas a partes interesadas expertas',
  'Descubrimiento',
  'Exploración',
  'Entrevistar, citar a las partes interesadas expertas y comentarios de las entrevistas. Cuando las partes interesadas declaran lo que desean ver estratégicamente de la iniciativa, es una evidencia moderadamente fuerte, se necesita llevar a la acción lo que desean ver.',
  3,
  3,
  3,
  3,
  NULL,
  True,
  True,
  True,
  False,
  '1 a 3 MIEMBROS',
  'INVESTIGACIÓN',
  '{"herramienta1": "Dovetail https://noota.io/ Transcribe en más de 70 idiomas y acentos. Graba y anota reuniones en vivo. Detecta sujetos con el analizador Noota.", "herramienta2": "Dovetail https://dovetailapp.com/ Analiza, sintetiza, almacena y comparte, investigación de clientes en una plataforma colaborativa y de búsqueda."}',
  '["Calidad de entrevista (consistencia y el rigor de la entrevista), número de patrones y patrones clave.", "Dolores del cliente.", "Ganancias del cliente.", "Comentarios de los clientes."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  19,
  'The Mom Test',
  'Descubrimiento',
  'Exploración',
  'Preguntar a amigos y familiares si les gusta un producto o idea de negocio. Así podrás determinar si es viable o no.',
  3,
  3,
  3,
  3,
  NULL,
  True,
  False,
  False,
  False,
  '1 a 3 MIEMBROS',
  'INVESTIGACIÓN',
  '{"herramienta1": "Notion https://www.notion.so/ Notion es un software de gestión de proyectos y para tomar notas.", "herramienta2": "SurveyMonkey https://es.surveymonkey.com/ Da respuestas a través de encuestas."}',
  '["Número de respuestas positivas: Busca patrones repetitivos en las respuestas de las encuestas."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  20,
  'Análisis de tendencias de búsqueda',
  'Descubrimiento',
  'Análisis de Datos',
  'Con el análisis de tendencias de búsqueda, se pueden usar los datos de búsqueda para investigar interacciones particulares entre buscadores en línea, el motor de búsqueda o el contenido durante episodios de búsqueda.',
  3,
  3,
  3,
  3,
  NULL,
  True,
  True,
  True,
  False,
  '1 a 3 MIEMBROS',
  'INVESTIGACIÓN, DATOS, MARKETING',
  '{"herramienta1": "Google Trends https://trends.google.es/ Esta plataforma sirve para organizar la información del mundo, para que todos puedan acceder a ella y usarla.", "herramienta2": "Ubersuggest https://neilpatel.com/es/ubersuggest/ Ubersuggest ayuda a generar ideas de palabras clave para la estrategia de marketing de contenidos."}',
  '["Volumen de búsqueda: Número de búsquedas de palabra clave dentro de un cierto período de tiempo.", "Consultas relacionadas: Consultas que los usuarios también buscaron, además de la que ingresaron."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  21,
  'Análisis de Tráfico Web',
  'Descubrimiento',
  'Análisis de Datos',
  'Utiliza la recopilación, generación de informes y análisis de datos del sitio web, para buscar patrones de comportamiento de los clientes.',
  3,
  3,
  3,
  3,
  NULL,
  True,
  False,
  True,
  False,
  '1 a 3 MIEMBROS',
  'DATOS, TECNOLÓGICO',
  '{"herramienta1": "Google Analytics https://analytics.google.com Google Analytics proporciona de forma gratuita, las herramientas necesarias para conocer el recorrido que siguen los clientes y mejorar el retorno de la inversión.", "herramienta2": "HubSpot https://www.hubspot.es/ En HubSpot se pueden gestionar el análisis del tráfico web y medir las conversiones de los usuarios."}',
  '["Número de sesiones.", "Tasa de rebote.", "Cantidad de atención.", "Tasas de conversión o engagement."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  22,
  'Foros de discusión',
  'Descubrimiento',
  'Análisis de Datos',
  'Los foros de discusión son ideales para encontrar necesidades insatisfechas en productos existentes o en el producto de un competidor. Sirve para descubrir trabajos no satisfechos, dolores y ganancias en un producto o servicio.',
  3,
  3,
  3,
  3,
  NULL,
  False,
  False,
  False,
  False,
  '1 a 3 MIEMBROS',
  'INVESTIGACIÓN, DATOS',
  '{"herramienta1": "StackExchange https://stackexchange.com/ La plataforma permite a los participantes valorar las preguntas y respuestas publicadas, y con ello consigue crear foros auto moderados.", "herramienta2": "Reddit https://www.reddit.com/ Es un sitio web de marcadores sociales y agregador de noticias, donde los usuarios pueden dejar enlaces a contenidos web."}',
  '["Tipos de solicitudes de características similares: Busque un patrón en las tres funciones principales solicitadas en los foros de discusión.", "Tipos de soluciones alternativas: Busque un patrón de soluciones alternativas o formas de modificar el producto para que haga lo que la gente necesita."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  23,
  'Comentarios de la fuerza de ventas',
  'Descubrimiento',
  'Análisis de Datos',
  'El uso de la retroalimentación de la fuerza de ventas, sirve para descubrir trabajos no satisfechos, dolores y ganancias en un producto o servicio.',
  3,
  3,
  3,
  3,
  NULL,
  False,
  True,
  False,
  False,
  '1 a 3 MIEMBROS',
  'INVESTIGACIÓN, DATOS, VENTAS',
  '{"herramienta1": "Sales Diary https://salesdiary.in/ Una plataforma completa de automatización de ventas de primera línea, para administrar el marketing y las ventas.", "herramienta2": "Salesforce https://www.salesforce.com/mx/ Reúne a los equipos de ventas, atención al cliente, marketing, comercio electrónico, TI y análisis con una única fuente de información, para guiar las conversaciones y las decisiones en el lugar de trabajo."}',
  '["Número de casi accidentes.", "Retroalimentación de casi accidente: registrar cuántas ventas casi se pierden y qué dijeron los clientes sobre lo que \"casi les impidió comprar\".", "Tipos de solicitudes de características."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  24,
  'Análisis de soporte al cliente',
  'Descubrimiento',
  'Análisis de Datos',
  'El uso de datos de atención al cliente es ideal para descubrir trabajos no satisfechos, dolores y ganancias en su producto o servicio.',
  3,
  3,
  3,
  3,
  NULL,
  True,
  False,
  True,
  False,
  '1 a 3 MIEMBROS',
  'INVESTIGACIÓN, VENTAS, MARKETING, DATOS',
  '{"herramienta1": "Zendesk https://www.zendesk.com.mx/ Zendesk mejora el servicio de atención al cliente. Diseña software para satisfacer las necesidades de los clientes.", "herramienta2": "Freshdesk https://freshdesk.com/latam/ Satisface a sus clientes con un servicio omnicanal sencillo."}',
  '["Comentarios de los clientes.", "Llamadas grabadas del equipo de soporte a correos electrónicos o solicitudes de errores / funciones enviadas. Los datos que se analizan deben consistir en conversaciones anecdóticas únicas con un grupo de clientes.", "Solicitudes de ciertas características."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  25,
  'Web Scraping',
  'Descubrimiento',
  'Análisis de Datos',
  'Analiza los contenidos, sitios web de los competidores o subcompetidores y da evidencia relevante para la toma de decisiones en marketing, tecnología y clientes.',
  3,
  3,
  3,
  3,
  NULL,
  True,
  True,
  True,
  False,
  '1 a 3 MIEMBROS',
  'INVESTIGACIÓN, PRODUCTO, TECNOLÓGICO',
  '{"herramienta1": "SimilarWeb https://www.similarweb.com/es/ Analiza sin esfuerzo el panorama competitivo.", "herramienta2": "SE Ranking https://seranking.com/ Rastreo de posiciones de palabras clave 100% preciso."}',
  '["Investigación de palabras clave y Extrae correos electrónicos de directorios comerciales en línea, por ejemplo, Yelp.", "CPC (costos por click).", "Estructura SEO y palabras clave de cola larga.", "Recopila información de las empresas.", "Extrae información de los sitios web de los minoristas para obtener los mejores precios y descuentos.", "Volumen de búsqueda y consultas relacionadas."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  26,
  'Encuesta social',
  'Descubrimiento',
  'Análisis de Datos',
  'Envía un cuestionario de "uno a muchos" a un grupo objetivo potencial, para obtener comentarios sobre el problema, la solución o el valor percibido de un producto.',
  3,
  3,
  3,
  3,
  NULL,
  True,
  False,
  False,
  False,
  '1 a 3 MIEMBROS',
  'INVESTIGACIÓN, MARKETING',
  '{"herramienta1": "Qwary https://www.qwary.com/ Plataforma de gestión de experiencias que permite tomar el control de los comentarios de clientes y empleados.", "herramienta2": "SurveyMonkey https://es.surveymonkey.com/ Permite enviar todos los cuestionarios de diez preguntas que se necesitan, para medir la satisfacción de los clientes."}',
  '["Número de respuestas de texto libre.", "Número de personas dispuestas a ser contactadas después de la encuesta."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  27,
  'Análisis de comentarios y revisiones de terceros',
  'Descubrimiento',
  'Análisis de Datos',
  'La capacidad de obtener reseñas de forma constante mejora la visibilidad de la marca, aumenta la credibilidad del negocio e influye en las decisiones de compra. Pedir verbalmente las opiniones es una forma de conseguir que los clientes reseñen su negocio y den información valiosa.',
  3,
  3,
  3,
  3,
  NULL,
  True,
  True,
  True,
  True,
  '1 a 3 MIEMBROS',
  'INVESTIGACIÓN',
  '{"herramienta1": "Brand Mentions https://brandmentions.com/ Ofrece la posibilidad de monitorizar marcas usando un campo de búsqueda, ordenando los resultados según la importancia de la web que haya realizado la mención.", "herramienta2": "TweetDeck https://tweetdeck.twitter.com/ Se ve en el mismo encuadre la actividad de los clientes, competidores y empleados en todas tus cuentas."}',
  '["Tipos de soluciones alternativas: busca un patrón de soluciones alternativas o formas de piratear el producto para que haga lo que la gente necesita. Esto puede proporcionar información sobre mejoras.", "Tipos de solicitudes de características: busca un patrón en las tres características principales solicitadas, qué dolores y qué necesidades subyacentes podrían resolver."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  28,
  'Sugerencias en tiempo real',
  'Descubrimiento',
  'Análisis de Datos',
  'Recibe comentarios en vivo sobre un sitio. Comprende lo que los usuarios realmente piensan acerca de un sitio con comentarios.',
  3,
  3,
  3,
  3,
  NULL,
  False,
  False,
  False,
  False,
  '1 a 3 MIEMBROS',
  'INVESTIGACIÓN, TECNOLÓGICO, PRODUCTO',
  '{"herramienta1": "Hotjar https://www.hotjar.com/home/ Herramienta digital de análisis de datos que permite conocer, entender y evaluar el comportamiento de los usuarios dentro de un sitio web.", "herramienta2": "Sleekplan https://sleekplan.com/ Es un software basado en la nube que ayuda a las empresas a cubrir todo el ciclo de comentarios, desde recopilar comentarios y discutir ideas hasta priorizar nuevas funciones, y notificar a los clientes sobre actualizaciones y anuncios recientes."}',
  '["Número de casi accidentes.", "Retroalimentación de casi accidente.", "Tipos de solicitudes de características."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  29,
  'Anuncio en línea',
  'Descubrimiento',
  'Descubrimiento de interés',
  'Un anuncio en línea articula claramente una propuesta de valor para un segmento de clientes objetivo con un simple llamado a la acción.',
  3,
  3,
  3,
  3,
  NULL,
  False,
  False,
  False,
  False,
  '2 a 4 MIEMBROS',
  'MARKETING, DISEÑO, PRODUCTO',
  '{"herramienta1": "Google Ads https://ads.google.com Crea campañas y decide el presupuesto diario.", "herramienta2": "Facebook https://es-la.facebook.com/business/adsAds Utiliza la segmentación de Facebook para que los anuncios lleguen a un público objetivo de la manera más eficaz."}',
  '["Tasa de clics = Clics que recibe un anuncio, dividido por la cantidad de veces que se muestra el anuncio (CTR).", "Conversiones = Interacciones de valor dentro de una web, dividido por la cantidad de veces que se muestra el anuncio o el tráfico que llegó a la web.", "Leads = Clientes potenciales que se pusieron en contacto.", "Lead conversion rate = Tasa de conversión de generación de leads."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  30,
  'Seguimiento de enlaces',
  'Descubrimiento',
  'Descubrimiento de interés',
  'Un hipervínculo único y rastreable, que sirve para obtener información más detallada sobre la propuesta de valor.',
  3,
  3,
  3,
  3,
  NULL,
  False,
  True,
  False,
  False,
  '1 a 3 MIEMBROS',
  'TECNOLÓGICO, DATOS',
  '{"herramienta1": "UTM Tag Builder https://www.utmtagbuilder.com Utiliza el código UTM \"fuente\" como referencia. Dice de dónde viene el tráfico. Por ejemplo, Google, Facebook, etc.", "herramienta2": "CampTag https://camptag.ai/ Controla la taxonomía de marketing a escala, sin necesidad de utilizar hojas de cálculo complejas."}',
  '["Tasa de clics = Porcentaje de personas que vieron el enlace, dividido por la cantidad de personas que hicieron clic en el enlace.", "Número de vistas únicas."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  31,
  'Feature Stub',
  'Descubrimiento',
  'Descubrimiento de interés',
  'Es la pequeña prueba de una función próxima, que incluye el comienzo de la experiencia. Generalmente se realiza en forma de botón.',
  4,
  4,
  4,
  4,
  NULL,
  True,
  True,
  True,
  False,
  '1 a 3 MIEMBROS',
  'DISEÑO, PRODUCTO, TECNOLÓGICO',
  '{"herramienta1": "Optimizely https://www.optimizely.com/ Realiza distintos experimentos en el sitio web tanto de diseño y de contenido cómo de navegación, con el fin de obtener un mayor rendimiento para el negocio.", "herramienta2": "VWO https://vwo.com/ Prueba diferentes variantes de la página de inicio en una pequeña muestra de visitantes."}',
  '["Tasa de conversión: Calcula la tasa de conversión dividiendo el número de vistas únicas por los clics de botón.", "Número de vistas únicas.", "Número de clics de botón.", "Número de clics en \"aprender más\".", "Número de encuestas completadas.", "Comentarios de la encuesta."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  32,
  'Test 404',
  'Descubrimiento',
  'Descubrimiento de interés',
  'Esta prueba es muy similar a un Feature Stub, excepto que no se pone nada detrás del botón o enlace. La prueba genera errores 404 cada vez que se hace clic en ella. Para saber si una característica es deseable, simplemente se deben contar la cantidad de errores 404 generados.',
  3,
  3,
  3,
  3,
  NULL,
  False,
  True,
  True,
  False,
  '1 a 3 MIEMBROS',
  'TECNOLÓGICO, DISEÑO',
  '{"herramienta1": "WordPress https://wordpress.com/es/ Al utilizar la página 404 por defecto y personalizarla, se aumenta la posibilidad de llamar la atención del usuario y aprovechar para llevarlo hacia donde se desea.", "herramienta2": "CodeIgniter https://www.codeigniter.com/ Se puede personalizar la pantalla de error con CodeIgniter de forma muy sencilla, primero es necesario crear un controlador en application."}',
  '["Número de clics que se dan en el botón.", "Número de visitas a la página 404.", "% de tasa de conversión de usuarios que van a la microencuesta."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  33,
  'Campaña de correo electrónico',
  'Descubrimiento',
  'Descubrimiento de interés',
  'Las campañas de correo electrónico son ideales para probar rápidamente una propuesta de valor con un segmento de clientes. No son ideales como reemplazo de la interacción cara a cara con el cliente.',
  3,
  3,
  3,
  3,
  NULL,
  True,
  True,
  False,
  False,
  '1 a 3 MIEMBROS',
  'DISEÑO, PRODUCTO, MARKETING',
  '{"herramienta1": "GMass https://www.gmass.co/ Personaliza los emails enviados a varias personas para que los campos se rellenen con el nombre y apellido de cada contacto.", "herramienta2": "Mailchimp https://mailchimp.com/es/ En Mailchimp se tiene acceso a informes detallados sobre el comportamiento de los suscriptores ante los e-mails enviados."}',
  '["Aperturas.", "Clics.", "Rebotes.", "Darse de baja.", "Tasa de apertura = Clics únicos divididos por el número de aperturas únicas.", "Tasa de clics = Porcentaje de personas que hicieron clic en al menos un enlace, en el mensaje de correo electrónico.", "Conversión = Porcentaje de usuarios que desarrollaron clics sobre una acción de valor."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  34,
  'Campaña de redes sociales',
  'Descubrimiento',
  'Descubrimiento de interés',
  'Realiza mensajes de redes sociales que se implementan durante un período de tiempo específico para los clientes.',
  3,
  3,
  3,
  3,
  NULL,
  False,
  False,
  False,
  False,
  '1 a 3 MIEMBROS',
  'DISEÑO, MARKETING',
  '{"herramienta1": "Writesonic https://writesonic.com/ Utiliza Writesonic para crear copies y mejorar los anuncios de la marca y así atraer a más usuarios.", "herramienta2": "Grammarly https://www.grammarly.com/ Ayuda a verificar que todo lo que se escriba sea claro, efectivo y no posea errores ortográficos y gramaticales."}',
  '["Tasa de clics: Cantidad de visitas que recibe una publicación en las redes sociales, dividida por la cantidad de personas que hicieron clic.", "Tasa de conversión: Número de personas que hicieron clic en el enlace de la red social, dividido por el número que lo usó para registrarse o realizar una compra.", "Engagement = Es cómo los clientes ven, comparten y comentan sus publicaciones en las redes sociales.", "Conversion rate = Calcula la tasa de conversión dividiendo el número de vistas por las acciones."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  35,
  'Programa de referencia',
  'Descubrimiento',
  'Descubrimiento de interés',
  'Es un método para promocionar productos o servicios a nuevos clientes a través de referencias de boca en boca o mediante códigos digitales.',
  3,
  3,
  3,
  3,
  NULL,
  True,
  False,
  True,
  False,
  '2 a 4 MIEMBROS',
  'DISEÑO, MARKETING, PRODUCTO',
  '{"herramienta1": "Viral Loops https://viral-loops.com/ Esta herramienta ayuda a impulsar a los clientes existentes a recomendar su marca a otros y, a su vez, lograr que esos nuevos clientes le hablen a más personas sobre usted.", "herramienta2": "Ambassador https://www.getambassador.com/ Crea un sistema de afiliados para así crear referencias de boca a boca."}',
  '["El coeficiente viral (también conocido como el factor K).", "Tasa de conversión de los participantes.", "Tasa de compartición de los participantes.", "Porcentaje de clics de las invitaciones."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  36,
  'Impresión 3D',
  'Descubrimiento',
  'Prototipos de interacción',
  'Es la creación rápida de prototipos de un objeto físico, a partir de un modelo digital tridimensional mediante el uso de una impresora 3D.',
  3,
  3,
  3,
  3,
  NULL,
  True,
  True,
  True,
  False,
  '2 a 4 MIEMBROS',
  'DISEÑO, TECNOLÓGICO',
  '{"herramienta1": "Fusion 360 https://www.autodesk.mx/products/fusion-360/overview Permite conectar todo el proceso de desarrollo de productos desde el diseño, hasta la fabricación para ofrecer productos de alta calidad al mercado.", "herramienta2": "SOLIDWORKS https://www.solidworks.com/es Ofrece herramientas conectadas y fáciles de usar que ayudan a innovar, y acelerar todos los aspectos del proceso de desarrollo de productos."}',
  '["Necesidades del cliente.", "Dolores del cliente.", "Ganancias del cliente.", "Comentarios de los clientes."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  37,
  'Prototipo de papel',
  'Descubrimiento',
  'Prototipos de interacción',
  'Interfaz esbozada en papel, manipulada por otra persona para representar las reacciones del software a la interacción con el cliente.',
  4,
  4,
  4,
  4,
  NULL,
  True,
  True,
  True,
  False,
  '1 a 3 MIEMBROS',
  'INVESTIGACIÓN, DISEÑO',
  '{"herramienta1": "UXPin https://www.uxpin.com Es la herramienta de diseño ideal para la creación de prototipos interactivos, sistemas de diseño y documentación.", "herramienta2": "Figma https://www.figma.com Figma es una herramienta para diseñar prototipos, wireframes, interfaces, ya sean páginas web, pantallas de móvil o smartwatch."}',
  '["Comentarios de los clientes: Frases de clientes sobre la propuesta de valor y la utilidad de la solución imaginada.", "La terminación de la tarea.", "Porcentaje de finalización de tareas.", "Tiempo para completar las tareas."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  38,
  'Storyboard',
  'Descubrimiento',
  'Prototipos de interacción',
  'Ilustraciones mostradas en secuencia con el fin de visualizar una experiencia interactiva.',
  3,
  3,
  3,
  3,
  NULL,
  True,
  True,
  True,
  False,
  '1 a 3 MIEMBROS',
  'INVESTIGACIÓN, DISEÑO',
  '{"herramienta1": "Storyboard That https://www.storyboardthat.com En esta aplicación para web se puede utilizar una extensa librería como personajes, escenarios e imágenes en general.", "herramienta2": "Canva https://www.canva.com/create/storyboards Con diseños profesionales que comunican la visión con storyboards gratuitos de Canva."}',
  '["Ilustraciones de escenarios de clientes sobre cómo experimentarían diferentes propuestas de valor.", "Trabajos de clientes.", "Dolores del cliente.", "Ganancias del cliente.", "Comentarios de los clientes.", "Frases de clientes."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  39,
  'Hoja de datos',
  'Descubrimiento',
  'Prototipos de interacción',
  'Ficha física o digital de una página con las especificaciones de la propuesta de valor.',
  3,
  3,
  3,
  3,
  NULL,
  True,
  True,
  True,
  False,
  '1 a 3 MIEMBROS',
  'DISEÑO, TECNOLÓGICO, MARKETING',
  '{"herramienta1": "Catalog Machine https://www.catalogmachine.com Crea plantillas de catálogo totalmente personalizables y de aspecto profesional gratuitas.", "herramienta2": "StockLayouts https://www.stocklayouts.com Crea una hoja de datos en minutos con diseños profesionales y fáciles de personalizar, que incluyen fotos e ilustraciones."}',
  '["Comentarios de los clientes.", "Comentarios de socios."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  40,
  'Folleto',
  'Descubrimiento',
  'Prototipos de interacción',
  'Es un folleto físico simulado de la propuesta de valor imaginada.',
  4,
  4,
  4,
  4,
  NULL,
  True,
  True,
  True,
  False,
  '1 a 3 MIEMBROS',
  'MARKETING, INVESTIGACIÓN',
  '{"herramienta1": "Adobe InDesign https://www.adobe.com/mx/products/indesign.html Es el software de diseño de páginas líder del sector para medios escritos y digitales.", "herramienta2": "Canva https://www.canva.com/ Canva es una herramienta gratuita de diseño gráfico en línea. Se puede usar para crear publicaciones para redes sociales, presentaciones, carteles, videos, etc."}',
  '["Tasa de conversión: Dividiendo el número de personas que recibieron un folleto por el número de personas que tomaron medidas."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  41,
  'Video explicativo',
  'Descubrimiento',
  'Prototipos de interacción',
  'Un video corto que se enfoca en explicar una idea de negocios de una manera simple, atractiva y convincente.',
  3,
  3,
  3,
  3,
  NULL,
  True,
  True,
  True,
  False,
  '2 a 4 MIEMBROS',
  'DISEÑO, PRODUCTO, TECNOLÓGICO',
  '{"herramienta1": "Movavi https://www.movavi.com Con Movavi es sencillo editar un video totalmente profesional en tan solo media hora, gracias a su interfaz sencilla de usar.", "herramienta2": "Doodly https://click.doodly.com Doodly es un software que hace que la creación de animaciones de pizarra sea muy fácil. Con animaciones y narración se puede crear un video explicativo, es un software de pago."}',
  '["Número de acciones: Cuántos compartidos del video hay, y a través de qué plataforma.", "Tasa de clics = Clics que recibe un video dividido por la cantidad de vistas."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  42,
  'Boomerang',
  'Descubrimiento',
  'Prototipos de interacción',
  'Realizar una prueba de cliente en el producto de un competidor existente, para recopilar información sobre la propuesta de valor.',
  3,
  3,
  3,
  3,
  NULL,
  False,
  True,
  False,
  False,
  '1 a 3 MIEMBROS',
  'PRODUCTO, MARKETING, INVESTIGACIÓN',
  '{"herramienta1": "Video Peel https://www.videopeel.com Permite recopilar videos de los clientes, responder a los videos, analizar y compartir esos análisis con un equipo de trabajo.", "herramienta2": "Boast https://boast.io/ Boast facilita el aprovechamiento de testimonios auténticos en video, para aumentar la credibilidad e impulsar las ventas."}',
  '["Tasa de finalización de tareas = Tareas completadas divididas por tareas iniciadas.", "Comentarios de los clientes.", "La terminación de la tarea.", "Tiempo para completar la tarea."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  43,
  'Pretender poseer',
  'Descubrimiento',
  'Prototipos de interacción',
  'Se debe crear un prototipo de la solución que no funcione y sea de baja fidelidad, para determinar si encaja en la vida cotidiana del cliente.',
  3,
  3,
  3,
  3,
  NULL,
  True,
  False,
  True,
  False,
  '1 a 3 MIEMBROS',
  'INVESTIGACIÓN, DISEÑO',
  '{"herramienta1": "WordPress https://es-mx.wordpress.org Con una inmensa cantidad de plugins y plantillas en el mercado, puede ayudar a generar un prototipo ideal.", "herramienta2": "InVision https://www.invisionapp.com La plataforma facilita un panel de herramientas y formatos, para la creación de productos digitales como apps, páginas web, funcionalidades digitales o servicios online."}',
  '["La cantidad de tiempo que estuvo disponible y la cantidad de casos en los que pensó que sería útil."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  45,
  'Lancha rápida',
  'Descubrimiento',
  'Preferencia y priorización',
  'Es una técnica de juego visual que se utiliza con los clientes, para identificar qué impide el progreso.',
  3,
  4,
  4,
  4,
  NULL,
  False,
  False,
  False,
  False,
  '1 a 3 MIEMBROS',
  'DISEÑO, PRODUCTO, TECNOLÓGICO',
  '{"herramienta1": "Miro https://miro.com MIRO es una aplicación para desarrollar flujos de trabajo en equipo de forma remota, a través de una pizarra virtual infinita.", "herramienta2": "Audiense https://es.audiense.com/ Identifica audiencias relevantes, descubre valiosos insights accionables e informa las estrategias para hacer crecer un negocio."}',
  '["Número de anclas."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  46,
  'Clasificación de tarjetas',
  'Descubrimiento',
  'Preferencia y priorización',
  'La clasificación de tarjetas es ideal para obtener información sobre la propuesta de valor, las tareas a realizar, los dolores y las ganancias de los clientes.',
  4,
  4,
  4,
  4,
  NULL,
  True,
  False,
  False,
  False,
  '1 a 3 MIEMBROS',
  'INVESTIGACIÓN, MARKETING',
  '{"herramienta1": "Miro https://miro.com/es/plantillas/clasificacion-de-tarjetas/ La herramienta de pizarra Miro, es el canvas perfecto para crear y compartir tableros con clasificación de tarjetas.", "herramienta2": "Userlytics https://www.userlytics.com Esta herramienta permite personalizar y cargar diferentes tarjetas (información, productos, soluciones) según la evaluación que se quiera realizar."}',
  '["Las tareas a realizar, los dolores y las ganancias con mejor clasificación."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  47,
  'Comprar una característica',
  'Descubrimiento',
  'Preferencia y priorización',
  'Comprar una característica es ideal para priorizar funciones y refinar los trabajos, dolores y ganancias de los clientes.',
  3,
  3,
  3,
  3,
  NULL,
  True,
  True,
  False,
  False,
  '1 a 3 MIEMBROS',
  'INVESTIGACIÓN, PRODUCTO, FINANZAS',
  '{"herramienta1": "MURAL https://www.mural.co/templates/buy-a-feature Un juego en el que las personas usan dinero artificial para expresar decisiones de compensación.", "herramienta2": "Lucidspark https://lucidspark.com/templates/buy-a-feature Este juego en particular ayuda a un grupo a priorizar qué características incluir al desarrollar un producto."}',
  '["Las tres funciones principales que más compraron los clientes."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  48,
  'Uso de contenido de terceros',
  'Descubrimiento',
  'Llamado a la acción',
  'Usa contenidos de la competencia o terceros para medir interés en problemáticas o soluciones con contenidos ya desarrollados, en un periodo de tiempo.',
  3,
  3,
  3,
  3,
  NULL,
  True,
  True,
  True,
  False,
  '1 a 3 MIEMBROS',
  'MARKETING, VENTAS, TECNOLÓGICO',
  '{"herramienta1": "Zubbit https://zubbit.io Esta herramienta permite agregar anuncios llamativos CTA, personalizar la URL y agregar píxeles de retargeting.", "herramienta2": "Replug https://replug.io Replug es una herramienta de administración de enlaces todo en uno, para acortar la URL de marca, agregar píxeles de retargeting, incrustar CTA y crear bioenlaces en redes sociales."}',
  '["Conversiones: Usuarios que realizaron una acción de valor, por ejemplo llenar un formulario.", "Tasa de conversión en leads: Vistas o tráfico / conversión formulario.", "Tasa de conversión en call to action: Vistas o tráfico / conversión interacción.", "Número de vistas únicas.", "Tasa de clics."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  49,
  'Publicación de blog impulsada',
  'Descubrimiento',
  'Llamado a la acción',
  'Es un artículo de opinión en un blog que describe un problema/solución, se promueve con una pequeña cantidad de dinero para ver si la gente lo lee y lo comenta.',
  4,
  4,
  4,
  4,
  NULL,
  True,
  True,
  False,
  False,
  '2 a 4 MIEMBROS',
  'INVESTIGACIÓN, MARKETING',
  '{"herramienta1": "WordPress https://wordpress.com En Wordpress se puede comenzar un blog de manera gratuita, además impulsa las publicaciones con campañas de Google ADS.", "herramienta2": "Google Search Console https://search.google.com Con las herramientas de Google Search Console, se puede posicionar una publicación de blog y pagar campañas para llegar a más personas con Google ADS."}',
  '["Número de vistas.", "Número de acciones.", "Número de comentarios.", "Número de clics.", "Número de conversiones."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  50,
  'Webinar interactivo',
  'Descubrimiento',
  'Prototipos de discusión',
  'La utilidad del webinar es la misma que la de un seminario: recibir [recieve information about a topic, ask questions, and then discuss what''s been presented.',
  3,
  3,
  3,
  3,
  NULL,
  True,
  True,
  False,
  False,
  '2 a 4 MIEMBROS',
  'MARKETING, VENTAS',
  '{"herramienta1": "ClickMeeting https://clickmeeting.com/ Es una herramienta excelente que permite organizar eventos periódicos y dirigirse a una audiencia multitudinaria por un coste reducido.", "herramienta2": "GoTo Webinar https://www.goto.com/es/webinar Esta plataforma permite alojar seminarios web de hasta 3000 personas. Sus casos  de uso típicos incluyen marketing, formación y comunicaciones corporativas."}',
  '["Número de vistas.", "Número de acciones.", "Número de comentarios.", "Número de clics.", "Número de conversiones.", "Número de preguntas realizadas.", "Número de asistentes.", "Tiempo de pertenencia."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  51,
  'Prototipo en el que se puede hacer clic',
  'Validación',
  'Prototipos de interacción',
  'Es ideal para probar rápidamente el concepto de un producto con los clientes y cuenta con una fidelidad más alta que el papel.',
  3,
  3,
  3,
  3,
  NULL,
  True,
  True,
  True,
  False,
  '1 a 3 MIEMBROS',
  'DISEÑO, TECNOLÓGICO, PRODUCTO, INVESTIGACIÓN',
  '{"herramienta1": "Marvel https://marvelapp.com/ Crea prototipos funcionales de manera rápida y sencilla a través de wireframes o bocetos.", "herramienta2": "Justinmind https://www.justinmind.com/ Justinmind es una herramienta de prototipado de sitios web, aplicaciones de software y aplicaciones móviles."}',
  '["Porcentaje de finalización de la tarea.", "Tiempo para completar las tareas."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  52,
  'MVP de función única',
  'Validación',
  'Prototipos de interacción',
  'MVP de función única es ideal para saber si la promesa central de una solución resuena con los clientes.',
  4,
  4,
  4,
  4,
  NULL,
  True,
  True,
  True,
  False,
  '2 a 4 MIEMBROS',
  'PRODUCTO, DISEÑO, LEGAL, TECNOLÓGICO, MKT, FINANZAS',
  '{"herramienta1": "Proto.io https://proto.io/ Proto.io es una potente aplicación web para crear prototipos de aplicaciones móviles totalmente interactivos y de alta fidelidad.", "herramienta2": "Bubble https://bubble.io/ Bubble permite crear aplicaciones interactivas para múltiples usuarios, navegadores web móviles y de escritorio."}',
  '["Cotizaciones de clientes y comentarios sobre qué tan satisfechos están, después de recibir el resultado del MVP.", "Número de compras: Compras de clientes utilizando el MVP de función única."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  53,
  'Mash up',
  'Validación',
  'Prototipos de interacción',
  'Crea un producto viable mínimo funcional, que consiste en combinar múltiples servicios existentes para entregar valor.',
  4,
  4,
  4,
  4,
  NULL,
  True,
  True,
  True,
  False,
  '2 a 4 MIEMBROS',
  'PRODUCTO, DISEÑO, FINANZAS, LEGAL, TECNOLÓGICO, MKT',
  '{"herramienta1": "Dynaboard https://dynaboard.com/ Se crean aplicaciones web rápidamente con Dynaboard, el creador de aplicaciones web pro-code diseñado para desarrolladores.", "herramienta2": "Bubble https://bubble.io/ Bubble permite crear aplicaciones interactivas, para múltiples usuarios, navegadores web móviles y de escritorio."}',
  '["Número de compras."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  54,
  'Concierge',
  'Validación',
  'Prototipos de interacción',
  'Crear una experiencia de cliente y entregar valor manualmente con personas, en lugar de usar tecnología.',
  3,
  3,
  3,
  3,
  NULL,
  True,
  True,
  True,
  False,
  '1 a 3 MIEMBROS',
  'PRODUCTO, DISEÑO, LEGAL, TECNOLÓGICO, MKT',
  '{"herramienta1": "Zoho One https://www.zoho.com/es-xl/one/ Zoho One ofrece un sistema integrado para transformar las distintas actividades de una empresa, y así generar más conexión y agilidad.", "herramienta2": "Intercom https://www.intercom.com/ Intercom es la plataforma ideal de interacción con clientes: un canal de comunicación abierto, para sacar partido de cada interacción con ellos a lo largo de su recorrido."}',
  '["Número de compras."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  55,
  'Prototipo de tamaño real',
  'Validación',
  'Prototipos de interacción',
  'Los prototipos de tamaño real son ideales para probar soluciones de mayor fidelidad con clientes, por medio de un tamaño de muestra pequeño.',
  4,
  4,
  4,
  4,
  NULL,
  True,
  True,
  True,
  False,
  '3 a 5 MIEMBROS',
  'PRODUCTO, DISEÑO',
  '{"herramienta1": "ProtoPie https://www.protopie.io/ Crea prototipos de interacciones entre dispositivos fácilmente, cualquiera los puede probar de inmediato.", "herramienta2": "Proto.io https://proto.io/ Proto.io es una potente aplicación web para crear prototipos de aplicaciones móviles totalmente interactivos y de alta fidelidad."}',
  '["Número de compras.", "Número de registros de correo electrónico."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  56,
  'Vuelo de prueba',
  'Validación',
  'Prototipos de interacción',
  'Realiza una prueba beta de una aplicación "solo por invitación" o como una "beta pública" utilizando la aplicación Apple TestFlight.',
  3,
  3,
  3,
  3,
  NULL,
  True,
  True,
  True,
  False,
  '2 a 4 MIEMBROS',
  'PRODUCTO, DISEÑO, TECNOLÓGICO',
  '{"herramienta1": "TestFlight https://developer.apple.com/testflight/ Herramienta para invitar a los usuarios a probar aplicaciones, para recopilar comentarios valiosos antes de lanzarlas al mercado.", "herramienta2": "TestFairy https://www.testfairy.com/ TestFairy proporciona videos que muestran qué sucedió exactamente en una aplicación antes de que algo saliera mal. Es la alternativa a TestFlight."}',
  '["Vistas de la tienda de aplicaciones.", "Descargas.", "Tasa de conversión."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  57,
  'MVP sin código',
  'Validación',
  'Prototipos de interacción',
  'Crea un MVP completamente funcional utilizando herramientas sin código. Para ser claros, el MVP sí se ejecuta en el código, pero no tiene que hacer nada de codificación.',
  4,
  4,
  4,
  4,
  NULL,
  True,
  True,
  True,
  False,
  '2 a 4 MIEMBROS',
  'PRODUCTO, DISEÑO, TECNOLÓGICO',
  '{"herramienta1": "Marvel https://marvelapp.com/ Crea prototipos funcionales de manera rápida y sencilla, a través de wireframes o bocetos.", "herramienta2": "Bubble https://bubble.io/ Bubble permite crear aplicaciones interactivas para múltiples usuarios, navegadores web móviles y de escritorio."}',
  '["La satisfacción del cliente.", "Número de compras.", "Costo."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  58,
  'Imitador',
  'Validación',
  'Prototipos de interacción',
  'Sirve un producto de la competencia a tus clientes como si fuera tuyo.',
  4,
  4,
  4,
  4,
  NULL,
  True,
  True,
  True,
  False,
  '2 a 4 MIEMBROS',
  'INVESTIGACIÓN, PRODUCTO',
  '{"herramienta1": "SimilarWeb https://www.similarweb.com/es/ SimilarWeb es una herramienta de análisis de sitios web que ayuda a conocer el mercado y monitorear a los competidores.", "herramienta2": "Replug https://replug.io Replug es una herramienta de administración de enlaces todo en uno, para acortar la URL de marca, agregar píxeles de retargeting, incrustar llamadas a la acción y crear bioenlaces en redes sociales."}',
  '["Número de compras."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  59,
  'Página de aterrizaje sencilla',
  'Validación',
  'Llamado a la acción',
  'Realiza una página web digital simple, que ilustre claramente la propuesta de valor con un CTA.',
  4,
  4,
  4,
  4,
  NULL,
  True,
  True,
  True,
  False,
  '1 a 3 MIEMBROS',
  'PRODUCTO, DISEÑO, TECNOLÓGICO',
  '{"herramienta1": "Swipe Pages https://swipepages.com/ Crea rápidamente páginas de destino de AMP increíblemente rápidas y optimizadas, para dispositivos móviles sin necesidad de codificar nada.", "herramienta2": "ClickFunnels https://www.clickfunnels.com/ ClickFunnels es una herramienta en línea para crear sitios web de manera rápida y sencilla, plasma la idea y añade llamadas a la acción que entregan métricas de conversión reales."}',
  '["Vistas únicas.", "Tiempo pasado en la página.", "Suscripciones de correo electrónico.", "Tasa de conversión: dividiendo el número de vistas por las acciones."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  60,
  'Crowdfunding',
  'Validación',
  'Llamado a la acción',
  'El Crowdfunding o recaudación de fondos es ideal para financiar una nueva empresa comercial, con clientes que creen en la propuesta de valor. La recaudación de fondos no es ideal para determinar si tu nueva empresa comercial es factible.',
  3,
  3,
  3,
  3,
  NULL,
  True,
  True,
  True,
  False,
  '3 a 5 MIEMBROS',
  'DISEÑO, PRODUCTO, MARKETING, FINANZAS',
  '{"herramienta1": "Kickstarter https://www.kickstarter.com/ El creador de cada proyecto fija una meta y un plazo de financiamiento. Si a la gente le gusta el proyecto, puede contribuir con dinero para hacerlo realidad. Si el proyecto alcanza su meta de financiamiento, se realizará el cargo a las tarjetas de crédito de los patrocinadores cuando finalice el plazo.", "herramienta2": null}',
  '["Número de vistas únicas.", "Número de comentarios.", "Número de acciones en redes sociales."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  61,
  'Prueba dividida',
  'Validación',
  'Llamado a la acción',
  'El Split Test o prueba dividida es ideal para probar diferentes versiones de propuestas de valor, precios y características para ver qué resuena mejor con los clientes.',
  1,
  1,
  1,
  1,
  NULL,
  True,
  True,
  True,
  False,
  '1 a 3 MIEMBROS',
  'DISEÑO, PRODUCTO, TECNOLÓGICO, DATOS',
  '{"herramienta1": "Google Optimize https://marketingplatform.google.com/about/optimize-360/ Controla de manera sencilla los experimentos de pruebas A/B con sus variantes desde Google Optimize, finaliza los experimentos y conoce cuál propuesta tuvo mayor interacción.", "herramienta2": "ABSmartly https://www.absmartly.com/ A/B Smartly es una plataforma de experimentación A/B con informes en tiempo real que notifica si algo salió mal, además conoce cuál versión resuena mejor con los clientes."}',
  '["Número de tráfico.", "Control de la tasa de conversión."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  62,
  'Preventa',
  'Validación',
  'Llamado a la acción',
  'El experimento de preventa es ideal para medir la demanda del mercado, a una escala más pequeña antes de su lanzamiento al público.',
  2,
  2,
  2,
  2,
  NULL,
  True,
  True,
  True,
  False,
  '2 a 4 MIEMBROS',
  'DISEÑO, VENTAS, FINANZAS',
  '{"herramienta1": "SwipePages https://swipepages.com/ Publica un producto con una landing page rápida y atractiva para los usuarios, crea la preventa para conocer la demanda del mercado. Esta plataforma integra sistemas de analíticas y puede integrar de manera fácil la preventa de un producto.", "herramienta2": null}',
  '["Tasa de conversión de compra: dividiendo el número de personas que ven el precio por el número de compras.", "Número de abandonos: si las personas comienzan el proceso de compra y luego abandonan la venta."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  63,
  'Encuesta de validación',
  'Validación',
  'Llamado a la acción',
  'Una encuesta de validación es ideal para obtener información, sobre si los clientes se sentirán decepcionados con la desaparición de un producto o si lo recomendarían a otros clientes.',
  3,
  3,
  3,
  3,
  NULL,
  True,
  True,
  False,
  False,
  '1 a 3 MIEMBROS',
  'INVESTIGACIÓN, MARKETING',
  '{"herramienta1": "Qwary https://www.qwary.com/ Plataforma para crear encuestas personalizadas y obtener retroalimentación de clientes.", "herramienta2": "SurveyMonkey https://es.surveymonkey.com/ Herramienta para diseñar y distribuir encuestas, recopilando respuestas de manera eficiente."}',
  '["Porcentaje de clientes que se sentirían decepcionados si el producto desapareciera.", "Porcentaje de clientes que recomendarían el producto a otros.", "Número de respuestas completadas."]'
);

INSERT INTO public.testing_card_playbook (
  pagina, titulo, campo, tipo, descripcion, costo, tiempo_preparacion, 
  tiempo_ejecucion, fuerza_evidencia, tipo_riesgo, deseabilidad, 
  factibilidad, viabilidad, adaptabilidad, equipo, habilidades, 
  herramientas, metricas
) VALUES (
  64,
  'Carta de intención',
  'Validación',
  'Llamado a la acción',
  'Es un documento que delinea un acuerdo preliminar entre dos o más partes antes de que el acuerdo sea finalizado. Sirve para validar el interés de socios o clientes en un producto o servicio.',
  2,
  2,
  2,
  2,
  NULL,
  True,
  True,
  True,
  False,
  '1 a 3 MIEMBROS',
  'LEGAL, VENTAS, FINANZAS',
  '{"herramienta1": "DocuSign https://www.docusign.com/ Plataforma para crear, enviar y firmar cartas de intención de manera digital.", "herramienta2": "PandaDoc https://www.pandadoc.com/ Herramienta para gestionar documentos y obtener firmas electrónicas rápidamente."}',
  '["Número de cartas de intención firmadas.", "Porcentaje de partes interesadas que avanzan a acuerdos formales."]'
);

-- Fin de inserción de datos del playbook
-- Total de registros insertados: 49