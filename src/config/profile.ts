// =============================================================================
//  DADOS DA PÁGINA — edite apenas este arquivo.
//  Nenhum componente tem texto ou link fixo: tudo vem daqui.
//
//  Regras da OAB (Provimento 205/2021): tom informativo, nunca mercantilista.
//  Não use "garantia de resultado", "ganhe sua causa", "melhor advogada",
//  preços, promoções, "consulta grátis", depoimentos ou valores de processos.
// =============================================================================

// -----------------------------------------------------------------------------
//  Tipos
// -----------------------------------------------------------------------------

export type IconName =
  | 'whatsapp'
  | 'calendar'
  | 'question'
  | 'document'
  | 'briefcase'
  | 'shield'
  | 'instagram'
  | 'mail';

/** Visões da página: lista de links ou formulário de e-mail (#email na URL) */
export type ViewId = 'links' | 'email';

export interface LinkItem {
  id: string;
  label: string;
  /** Linha de apoio, opcional, exibida abaixo do label */
  description?: string;
  icon: IconName;
  /** URL externa. Links http(s) abrem em nova aba. */
  href?: string;
  /** Ação interna (sem sair da página) */
  action?: 'open-email';
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FieldText {
  label: string;
  placeholder?: string;
  /** Ex.: "(opcional)" */
  hint?: string;
}

export interface ContactConfig {
  /** E-mail exibido no link "mailto" abaixo do formulário */
  email: string;
  /** ID do formulário no Formspree (ex.: "xyzabcd") */
  formspreeId: string;
  /** Montado automaticamente a partir do formspreeId */
  endpoint: string;
  title: string;
  subtitle: string;
  fields: {
    name: FieldText;
    email: FieldText;
    phone: FieldText;
    subject: FieldText;
    message: FieldText;
    consent: FieldText;
    honeypot: FieldText;
  };
  subjects: string[];
  messageMinLength: number;
  /** Assunto do e-mail que chega na sua caixa (o assunto escolhido é adicionado ao final) */
  emailSubjectPrefix: string;
  submitLabel: string;
  sendingLabel: string;
  successMessage: string;
  errorMessage: string;
  errorWhatsappLabel: string;
  directContactText: string;
  validation: {
    nameRequired: string;
    emailRequired: string;
    emailInvalid: string;
    phoneInvalid: string;
    subjectRequired: string;
    messageRequired: string;
    messageMin: string;
    consentRequired: string;
  };
}

export interface Profile {
  name: string;
  /** Única palavra da página em Pinyon Script (precisa fazer parte do nome) */
  accentWord: string;
  initials: string;
  title: string;
  education: string;
  bio: string;
  photo: { src: string; alt: string };
  whatsapp: { number: string; defaultMessage: string; url: string };
  instagram: { url: string; handle: string };
  primaryCta: LinkItem;
  /** Link "voltar" exibido acima do formulário de e-mail */
  backLabel: string;
  linksNavLabel: string;
  links: LinkItem[];
  practiceAreas: { kicker: string; title: string; items: string[] };
  faq: { kicker: string; title: string; items: FaqItem[]; disclaimer: string };
  contact: ContactConfig;
  footer: { brand: string; line: string; location: string };
  a11y: {
    /** Anexado ao aria-label de links que abrem em nova aba */
    newTab: string;
  };
}

// -----------------------------------------------------------------------------
//  Dados básicos
// -----------------------------------------------------------------------------

const NAME = 'Luiza de Castro';
const WHATSAPP_NUMBER = '5581985080807';
const INSTAGRAM_URL = 'https://www.instagram.com/luizadecastroadv/';
const INSTAGRAM_HANDLE = '@luizadecastroadv';

// TODO: e-mail profissional definitivo
const CONTACT_EMAIL = 'contato@exemplo.com';

// TODO: cole aqui o ID do formulário criado em https://formspree.io (ver README)
const FORMSPREE_ID = 'SEU_ID_AQUI';

// TODO: número de inscrição na OAB/PE
const OAB_NUMBER = 'XXXXX';

/** Monta o link do WhatsApp com mensagem pré-preenchida */
const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const DEFAULT_WHATSAPP_MESSAGE =
  'Olá, Luiza! Vim pelo Instagram e gostaria de tirar uma dúvida.';

// -----------------------------------------------------------------------------
//  Perfil
// -----------------------------------------------------------------------------

export const profile: Profile = {
  name: NAME,
  accentWord: 'Castro',
  initials: 'LC',
  title: 'Advogada Trabalhista · OAB/PE',
  education: 'Pós-graduanda em Direito e Processo do Trabalho (PUC-RS)',
  bio: 'Te ajudo com a sua demanda jurídica 🤍',
  photo: {
    src: '/foto.jpg',
    alt: 'Foto de Luiza de Castro, advogada trabalhista',
  },

  whatsapp: {
    number: WHATSAPP_NUMBER,
    defaultMessage: DEFAULT_WHATSAPP_MESSAGE,
    url: whatsappLink(DEFAULT_WHATSAPP_MESSAGE),
  },

  instagram: {
    url: INSTAGRAM_URL,
    handle: INSTAGRAM_HANDLE,
  },

  primaryCta: {
    id: 'whatsapp',
    label: 'Fale comigo no WhatsApp',
    description: 'Atendimento e orientação inicial',
    icon: 'whatsapp',
    href: whatsappLink(DEFAULT_WHATSAPP_MESSAGE),
  },

  backLabel: 'Voltar aos links',

  linksNavLabel: 'Links principais',

  links: [
    {
      id: 'agendamento',
      label: 'Agendar uma consulta',
      icon: 'calendar',
      href: whatsappLink(
        'Olá, Luiza! Vim pelo Instagram e gostaria de agendar uma consulta.',
      ),
    },
    {
      id: 'duvidas',
      label: 'Tire suas dúvidas trabalhistas',
      icon: 'question',
      href: whatsappLink(
        'Olá, Luiza! Vim pelo Instagram e gostaria de esclarecer uma dúvida trabalhista.',
      ),
    },
    {
      id: 'rescisao',
      label: 'Fui demitido(a): e agora?',
      description: 'Guia de rescisão',
      icon: 'document',
      href: INSTAGRAM_URL, // TODO: link do post/destaque específico
    },
    {
      id: 'pejotizacao',
      label: 'Sou PJ, mas trabalho como CLT?',
      icon: 'briefcase',
      href: INSTAGRAM_URL, // TODO: link do post/destaque específico
    },
    {
      id: 'golpes',
      label: 'Alerta de golpes: como se proteger',
      icon: 'shield',
      href: INSTAGRAM_URL, // TODO: link do post/destaque específico
    },
    {
      id: 'instagram',
      label: 'Instagram',
      description: INSTAGRAM_HANDLE,
      icon: 'instagram',
      href: INSTAGRAM_URL,
    },
    {
      id: 'email',
      label: 'Enviar um e-mail',
      icon: 'mail',
      action: 'open-email',
    },
  ],

  practiceAreas: {
    kicker: 'Como posso orientar você',
    title: 'Áreas de atuação',
    items: [
      'Rescisão',
      'Horas extras',
      'Vínculo empregatício (PJ)',
      'Assédio no trabalho',
      'Verbas trabalhistas',
    ],
  },

  faq: {
    kicker: 'Informação que esclarece',
    title: 'Dúvidas frequentes',
    items: [
      {
        question: 'Qual o prazo para entrar com ação trabalhista?',
        answer:
          'Até 2 anos após o fim do contrato, cobrando os direitos referentes aos últimos 5 anos trabalhados.',
      },
      {
        question: 'Sou PJ, mas cumpro horário e recebo ordens. Tenho direitos?',
        answer:
          'Pode ser. Quando há subordinação, habitualidade, pessoalidade e salário, é possível discutir o reconhecimento do vínculo de emprego. Cada situação precisa ser analisada individualmente.',
      },
      {
        question: 'Em quanto tempo a empresa deve pagar a rescisão?',
        answer:
          'Em até 10 dias corridos após o término do contrato. O atraso pode gerar multa em favor do trabalhador, no valor de um salário.',
      },
    ],
    disclaimer:
      'Conteúdo de caráter informativo. Cada caso deve ser avaliado individualmente.',
  },

  contact: {
    email: CONTACT_EMAIL,
    formspreeId: FORMSPREE_ID,
    endpoint: `https://formspree.io/f/${FORMSPREE_ID}`,
    title: 'Envie sua mensagem',
    subtitle: 'Conte brevemente sua situação que eu retorno o contato.',
    fields: {
      name: { label: 'Nome', placeholder: 'Seu nome completo' },
      email: { label: 'E-mail', placeholder: 'voce@email.com' },
      phone: {
        label: 'Telefone/WhatsApp',
        placeholder: '(81) 99999-9999',
        hint: '(opcional)',
      },
      subject: { label: 'Assunto', placeholder: 'Selecione um assunto' },
      message: {
        label: 'Mensagem',
        placeholder: 'Descreva brevemente a sua situação',
      },
      consent: {
        label: 'Autorizo o uso dos meus dados apenas para retorno deste contato.',
      },
      honeypot: { label: 'Não preencha este campo' },
    },
    subjects: [
      'Rescisão',
      'Horas extras',
      'Vínculo PJ/CLT',
      'Assédio no trabalho',
      'Outro',
    ],
    messageMinLength: 20,
    emailSubjectPrefix: 'Contato pelo site:',
    submitLabel: 'Enviar mensagem',
    sendingLabel: 'Enviando…',
    successMessage: 'Mensagem enviada! Retorno em breve.',
    errorMessage:
      'Não foi possível enviar sua mensagem agora. Tente novamente em instantes ou fale comigo pelo WhatsApp.',
    errorWhatsappLabel: 'Chamar no WhatsApp',
    directContactText: 'Prefere falar direto? Envie para',
    validation: {
      nameRequired: 'Informe seu nome.',
      emailRequired: 'Informe seu e-mail.',
      emailInvalid: 'Informe um e-mail válido.',
      phoneInvalid: 'Informe um telefone com DDD, ex.: (81) 99999-9999.',
      subjectRequired: 'Selecione um assunto.',
      messageRequired: 'Escreva sua mensagem.',
      messageMin: 'Escreva pelo menos 20 caracteres.',
      consentRequired: 'É preciso autorizar o uso dos dados para que eu possa retornar.',
    },
  },

  footer: {
    brand: NAME,
    line: `Advocacia Trabalhista · OAB/PE nº ${OAB_NUMBER}`,
    location: 'Atendimento online e presencial em Recife/PE',
  },

  a11y: {
    newTab: '(abre em nova aba)',
  },
};
