export type Lang = 'en' | 'es';

const en = {
  meta: {
    title: 'Forger Teams — Automate internal operations with AI agents',
    description: 'Centralize internal processes and help employees create AI agents and graphical workflows using the ChatGPT, Claude, or Gemini accounts they already have.',
    imageAlt: 'Forger Teams for internal operations',
  },
  nav: {
    cases: 'Use cases', approach: 'How we start', trust: 'Trust', download: 'Download', contact: 'Tell us your use case', language: 'Español',
  },
  hero: {
    eyebrow: 'Forger Teams for internal operations',
    title: 'Automate internal operations. Keep your team in control.',
    body: 'Centralize work scattered across spreadsheets, email, and chat. Give employees a simple graphical way to create their own agents and workflows on one shared company foundation.',
    primary: 'Tell us your AI use case',
    secondary: 'See real use cases',
    note: 'Free discovery session and first workflow blueprint · One-month trial · Hands-on guidance from the first process.',
    pillars: [
      { number: '01', title: 'Automate', body: 'Recurring work and handoffs' },
      { number: '02', title: 'Centralize', body: 'Owners, context, and status' },
      { number: '03', title: 'Create', body: 'Agents and graphical workflows' },
    ],
  },
  examples: {
    eyebrow: 'Real operations, not generic demos',
    title: 'Start where work gets stuck today',
    body: 'Forger turns a process your team already knows into an operation people can run, review, and improve together.',
    labels: { pain: 'What hurts today', forger: 'With Forger', outcome: 'What changes' },
    items: [
      {
        id: 'monthly-close', tag: 'Monthly close and reporting',
        pain: 'Finance chases figures across spreadsheets, email, and chat, then rebuilds the same report under deadline every month.',
        forger: 'An agent gathers the approved inputs, flags missing or unusual figures, and prepares a draft for human review.',
        outcome: 'The team spends its time resolving exceptions and making decisions, not copying data.',
      },
      {
        id: 'onboarding-access', tag: 'Employee onboarding and access',
        pain: 'HR, IT, and managers repeat the same access requests, document checks, reminders, and approvals for every new hire.',
        forger: 'One workflow assigns each step, collects what is missing, and keeps the new employee and owners aligned.',
        outcome: 'Every onboarding follows a visible path without losing the decisions that still require a person.',
      },
      {
        id: 'internal-requests', tag: 'Internal requests',
        pain: 'Procurement, finance, and IT requests arrive through different inboxes and chats, with no clear owner or shared status.',
        forger: 'An agent asks for missing context, routes the request, and keeps the process and next action in one place.',
        outcome: 'Requesters know what is happening, and operators work from one prioritized flow.',
      },
    ],
  },
  approach: {
    eyebrow: 'A practical first step',
    title: 'We build the first workflow with you',
    body: 'Start with one real process—not a company-wide transformation. We help define the problem, shape the first graphical workflow, and support the people who will use it.',
    capabilities: [
      { title: 'Automate the repeatable', body: 'Agents gather information, prepare drafts, follow up, and surface exceptions for review.' },
      { title: 'Centralize the operation', body: 'Shared apps, context, owners, status, and handoffs stay on one company foundation.' },
      { title: 'Make creation approachable', body: 'Employees can shape and run their own agents and graphical workflows without exposing operational complexity.' },
    ],
    offer: {
      label: 'Your first month', title: 'From one conversation to a working evaluation',
      steps: [
        { number: '01', title: 'Free discovery session', body: 'Tell us where the work slows down and who is involved.' },
        { number: '02', title: 'First workflow blueprint, free', body: 'We translate the use case into a concrete first workflow and evaluation plan.' },
        { number: '03', title: 'One-month trial', body: 'Test the workflow with hands-on guidance and decide from real use.' },
      ],
      action: 'Tell us your use case',
    },
  },
  providers: {
    eyebrow: 'Bring the AI your team already uses',
    title: 'No new AI subscription to learn or centralize',
    body: 'Each employee can connect a supported ChatGPT, Claude, or Gemini account they already manage. Forger gives the company a common place for apps, agents, workflows, and operational context.',
    providers: [
      { name: 'ChatGPT', logo: '/provider-logos/chatgpt.svg' },
      { name: 'Claude', logo: '/provider-logos/claude.svg' },
      { name: 'Gemini', logo: '/provider-logos/gemini.svg' },
    ],
    note: 'Availability, charges, plan requirements, and limits still depend on the selected provider and the employee’s account. Task content may be sent to the selected provider when needed to complete the task.',
  },
  trust: {
    eyebrow: 'Clear boundaries',
    title: 'Individual agents, one company foundation',
    items: [
      { label: 'Local', title: 'A private working space', body: 'Employees work from their own computer and decide what becomes shared company work.' },
      { label: 'Team', title: 'Shared operational continuity', body: 'The organization provides common apps, context, access, and the history of important team actions.' },
      { label: 'AI', title: 'The provider stays visible', body: 'Employees choose a supported provider account; that provider’s terms and data controls continue to apply.' },
    ],
  },
  contact: {
    eyebrow: 'Start with one real process',
    title: 'Tell us your AI use case',
    body: 'Tell us what takes too long, gets lost between tools, or depends on one person. We will arrange a free discovery session and prepare the first workflow blueprint at no cost.',
    points: ['Hands-on advice and onboarding', 'A concrete one-month trial', 'No need to replace your existing systems to evaluate one use case'],
    fields: { name: 'Name', email: 'Work email', phone: 'Phone', company: 'Company', message: 'What would you like to automate or centralize?' },
    placeholders: { name: 'Your name', email: 'you@company.com', phone: '+1 555 0100', company: 'Company name', message: 'Describe the process, who is involved, where it gets stuck, and what a useful result would look like.' },
    consent: 'We use this information only to respond to your Forger Teams inquiry.',
    submit: 'Request the free first session', sending: 'Sending…',
    success: 'Thanks. We received your use case and will follow up using your work email.',
    error: 'We could not send your inquiry. Your entries are still here—please wait a moment and try again.',
    rateLimited: 'We received several requests. Your entries are still here—please wait a moment before trying again.',
  },
  download: {
    eyebrow: 'Explore the desktop app',
    title: 'Download Forger Teams',
    body: 'Prefer to explore first? Choose the current build for your platform. We recommend starting with the free session so we can shape a useful first workflow with you.',
    detected: 'Suggested for this device', manual: 'Choose a platform', version: 'Release', requirements: 'Requirements', releaseNotes: 'Release notes',
    states: { available: 'Available', gated: 'Access required', unavailable: 'Temporarily unavailable', unsupported: 'Not supported' },
    actions: { available: 'Download now', gated: 'Request access', unavailable: 'Talk to us', unsupported: 'See other platforms' },
    messages: { available: 'This build is ready to download.', gated: 'We will confirm access and onboarding with your organization before sharing the build.', unavailable: 'This build is not available right now. Contact us for current options.', unsupported: 'Forger Teams does not currently provide a build for this platform.' },
  },
  footer: { line: 'Automate internal operations without losing the people who understand them.', privacy: 'Privacy', personal: 'Personal Forger', rights: 'All rights reserved.' },
};

const es: typeof en = {
  meta: {
    title: 'Forger Teams — Automatiza operaciones internas con agentes de IA',
    description: 'Centraliza procesos internos y permite que cada persona cree agentes de IA y flujos gráficos con las cuentas de ChatGPT, Claude o Gemini que ya utiliza.',
    imageAlt: 'Forger Teams para operaciones internas',
  },
  nav: {
    cases: 'Casos', approach: 'Cómo partimos', trust: 'Confianza', download: 'Descargar', contact: 'Cuéntanos tu caso', language: 'English',
  },
  hero: {
    eyebrow: 'Forger Teams para operaciones internas',
    title: 'Automatiza la operación interna. Mantén a tu equipo en control.',
    body: 'Centraliza el trabajo disperso entre planillas, correos y chat. Entrega a cada persona una forma gráfica y simple de crear sus propios agentes y flujos sobre una base común de la empresa.',
    primary: 'Cuéntanos tu caso de uso para la IA',
    secondary: 'Ver casos reales',
    note: 'Reunión de diagnóstico y primera bajada del flujo, sin costo · Un mes de prueba · Acompañamiento desde el primer proceso.',
    pillars: [
      { number: '01', title: 'Automatiza', body: 'Trabajo recurrente y traspasos' },
      { number: '02', title: 'Centraliza', body: 'Responsables, contexto y estado' },
      { number: '03', title: 'Crea', body: 'Agentes y flujos gráficos' },
    ],
  },
  examples: {
    eyebrow: 'Operaciones reales, no demos genéricas',
    title: 'Parte donde hoy se traba el trabajo',
    body: 'Forger convierte un proceso que tu equipo ya conoce en una operación que las personas pueden ejecutar, revisar y mejorar juntas.',
    labels: { pain: 'Lo que duele hoy', forger: 'Con Forger', outcome: 'Qué cambia' },
    items: [
      {
        id: 'monthly-close', tag: 'Cierre y reporte mensual',
        pain: 'Finanzas persigue cifras entre planillas, correos y chat, y vuelve a construir el mismo reporte contra el tiempo todos los meses.',
        forger: 'Un agente reúne las fuentes aprobadas, marca cifras faltantes o inusuales y prepara un borrador para revisión humana.',
        outcome: 'El equipo dedica su tiempo a resolver excepciones y tomar decisiones, no a copiar datos.',
      },
      {
        id: 'onboarding-access', tag: 'Incorporación y accesos',
        pain: 'Personas, TI y jefaturas repiten las mismas solicitudes de acceso, revisiones de documentos, recordatorios y aprobaciones en cada ingreso.',
        forger: 'Un flujo asigna cada paso, solicita lo que falta y mantiene alineados a la nueva persona y a los responsables.',
        outcome: 'Cada incorporación sigue un camino visible sin perder las decisiones que todavía requieren a una persona.',
      },
      {
        id: 'internal-requests', tag: 'Solicitudes internas',
        pain: 'Las solicitudes de compras, finanzas y TI llegan por distintas casillas y chats, sin responsable claro ni estado compartido.',
        forger: 'Un agente pide el contexto que falta, deriva la solicitud y mantiene el proceso y la próxima acción en un solo lugar.',
        outcome: 'Quien solicita sabe qué está pasando y quienes operan trabajan desde un flujo priorizado.',
      },
    ],
  },
  approach: {
    eyebrow: 'Un primer paso práctico',
    title: 'Construimos el primer flujo contigo',
    body: 'Parte con un proceso real, no con una transformación gigante. Te ayudamos a definir el problema, dar forma al primer flujo gráfico y acompañar a las personas que lo usarán.',
    capabilities: [
      { title: 'Automatiza lo repetible', body: 'Los agentes reúnen información, preparan borradores, hacen seguimiento y muestran excepciones para revisión.' },
      { title: 'Centraliza la operación', body: 'Apps, contexto, responsables, estados y traspasos comparten una base común de la empresa.' },
      { title: 'Facilita la creación', body: 'Cada persona puede dar forma y ejecutar sus propios agentes y flujos gráficos sin exponerse a la complejidad operacional.' },
    ],
    offer: {
      label: 'Tu primer mes', title: 'De una conversación a una evaluación funcionando',
      steps: [
        { number: '01', title: 'Reunión de diagnóstico, sin costo', body: 'Cuéntanos dónde se traba el trabajo y quiénes participan.' },
        { number: '02', title: 'Primera bajada del flujo, sin costo', body: 'Traducimos el caso en un primer flujo concreto y un plan de evaluación.' },
        { number: '03', title: 'Un mes de prueba', body: 'Prueba el flujo con acompañamiento y decide a partir del uso real.' },
      ],
      action: 'Cuéntanos tu caso de uso para la IA',
    },
  },
  providers: {
    eyebrow: 'Usa la IA que tu equipo ya tiene',
    title: 'Sin sumar otra suscripción de IA que aprender o centralizar',
    body: 'Cada persona puede conectar una cuenta compatible de ChatGPT, Claude o Gemini que ya administra. Forger entrega a la empresa un lugar común para apps, agentes, flujos y contexto operacional.',
    providers: [
      { name: 'ChatGPT', logo: '/provider-logos/chatgpt.svg' },
      { name: 'Claude', logo: '/provider-logos/claude.svg' },
      { name: 'Gemini', logo: '/provider-logos/gemini.svg' },
    ],
    note: 'La disponibilidad, los cobros, los requisitos del plan y los límites siguen dependiendo del proveedor elegido y de la cuenta de cada persona. El contenido de una tarea puede enviarse al proveedor elegido cuando sea necesario para completarla.',
  },
  trust: {
    eyebrow: 'Límites claros',
    title: 'Agentes individuales, una base común de la empresa',
    items: [
      { label: 'Local', title: 'Un espacio de trabajo privado', body: 'Cada persona trabaja desde su computador y decide qué pasa a ser trabajo compartido de la empresa.' },
      { label: 'Equipo', title: 'Continuidad operacional compartida', body: 'La organización entrega apps, contexto, accesos y el historial común de acciones importantes del equipo.' },
      { label: 'IA', title: 'El proveedor siempre está visible', body: 'Cada persona elige una cuenta compatible; siguen aplicando los términos y controles de datos de ese proveedor.' },
    ],
  },
  contact: {
    eyebrow: 'Parte con un proceso real',
    title: 'Cuéntanos tu caso de uso para la IA',
    body: 'Cuéntanos qué demora demasiado, se pierde entre herramientas o depende de una sola persona. Coordinaremos una reunión de diagnóstico y prepararemos la primera bajada del flujo sin costo.',
    points: ['Asesoramiento y acompañamiento inicial', 'Un mes de prueba concreto', 'Sin reemplazar tus sistemas para evaluar un caso'],
    fields: { name: 'Nombre', email: 'Email de trabajo', phone: 'Teléfono', company: 'Empresa', message: '¿Qué te gustaría automatizar o centralizar?' },
    placeholders: { name: 'Tu nombre', email: 'tu@empresa.com', phone: '+56 9 1234 5678', company: 'Nombre de la empresa', message: 'Describe el proceso, quiénes participan, dónde se traba y cómo se vería un resultado útil.' },
    consent: 'Usamos esta información únicamente para responder tu consulta sobre Forger Teams.',
    submit: 'Solicitar la primera reunión gratis', sending: 'Enviando…',
    success: 'Gracias. Recibimos tu caso y responderemos a tu email de trabajo.',
    error: 'No pudimos enviar tu consulta. Tus datos siguen aquí; espera un momento e inténtalo nuevamente.',
    rateLimited: 'Recibimos varias solicitudes. Tus datos siguen aquí; espera un momento antes de intentarlo nuevamente.',
  },
  download: {
    eyebrow: 'Explora la aplicación de escritorio',
    title: 'Descarga Forger Teams',
    body: '¿Prefieres explorar primero? Elige la versión actual para tu plataforma. Recomendamos partir con la reunión gratuita para dar forma a un primer flujo útil contigo.',
    detected: 'Sugerida para este dispositivo', manual: 'Elige una plataforma', version: 'Versión', requirements: 'Requisitos', releaseNotes: 'Notas de versión',
    states: { available: 'Disponible', gated: 'Requiere acceso', unavailable: 'No disponible temporalmente', unsupported: 'No compatible' },
    actions: { available: 'Descargar ahora', gated: 'Solicitar acceso', unavailable: 'Hablar con nosotros', unsupported: 'Ver otras plataformas' },
    messages: { available: 'Esta versión está lista para descargar.', gated: 'Confirmaremos el acceso y la incorporación con tu organización antes de compartir la aplicación.', unavailable: 'Esta versión no está disponible ahora. Contáctanos para conocer las opciones actuales.', unsupported: 'Forger Teams actualmente no ofrece una versión para esta plataforma.' },
  },
  footer: { line: 'Automatiza la operación interna sin perder a las personas que la entienden.', privacy: 'Privacidad', personal: 'Forger personal', rights: 'Todos los derechos reservados.' },
};

export const content = { en, es } as const;
