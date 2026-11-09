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

export interface LinkItem {
  id: string;
  label: string;
  /** Linha de apoio, opcional, exibida abaixo do label */
  description?: string;
  icon: IconName;
  /** URL externa (http(s) abre em nova aba; mailto: abre o app de e-mail) */
  href?: string;
  /** Ação interna (sem sair da página) */
  action?: 'open-popup';
  /** Conteúdo do pop-up (usado com action: 'open-popup') */
  popup?: PopupContent;
}

export interface PopupContent {
  title: string;
  /** Parágrafos exibidos em ordem */
  paragraphs: string[];
  /** Tópicos em destaque, exibidos após o primeiro parágrafo (opcional) */
  points?: string[];
  /** Botão de WhatsApp no rodapé do pop-up */
  cta: { label: string; message: string; url: string };
}

export interface FaqItem {
  question: string;
  answer: string;
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
  linksNavLabel: string;
  links: LinkItem[];
  /** Rótulo acessível do botão de fechar os pop-ups */
  popupCloseLabel: string;
  practiceAreas: { kicker: string; title: string; items: string[] };
  faq: { kicker: string; title: string; items: FaqItem[]; disclaimer: string };
  /** E-mail aberto pelo botão "Enviar um e-mail" */
  email: string;
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

const CONTACT_EMAIL = 'luizadecastro.adv@gmail.com';

// TODO: número de inscrição na OAB/PE
const OAB_NUMBER = 'XXXXX';

/** Monta o link do WhatsApp com mensagem pré-preenchida */
const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

/** Botão de WhatsApp exibido no rodapé dos pop-ups */
const popupCta = (message: string) => ({
  label: 'Falar sobre o meu caso',
  message,
  url: whatsappLink(message),
});

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

  linksNavLabel: 'Links principais',

  popupCloseLabel: 'Fechar',

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
      action: 'open-popup',
      popup: {
        title: 'Fui demitido(a): e agora?',
        paragraphs: [
          'A demissão costuma trazer muitas dúvidas sobre seus direitos e os valores que você deve receber. Alguns pontos merecem atenção:',
          'Antes de assinar documentos ou aceitar valores, confira se tudo está sendo pago corretamente. Uma análise jurídica ajuda você a entender seus direitos e a identificar possíveis irregularidades.',
        ],
        points: [
          'Verbas rescisórias',
          'Aviso-prévio',
          'Férias',
          '13º salário',
          'FGTS',
          'Seguro-desemprego',
        ],
        cta: popupCta(
          'Olá, Luiza! Vim pelo Instagram e gostaria de conferir os valores da minha rescisão.',
        ),
      },
    },
    {
      id: 'pejotizacao',
      label: 'Sou PJ, mas trabalho como CLT?',
      icon: 'briefcase',
      action: 'open-popup',
      popup: {
        title: 'Sou PJ, mas trabalho como CLT?',
        paragraphs: [
          'Ter um CNPJ não significa, necessariamente, que você é um trabalhador autônomo. Se, na prática, você cumpre horários, recebe ordens, presta o serviço pessoalmente e está subordinado à empresa, pode existir uma relação de emprego disfarçada de contratação PJ.',
          'O que importa não é apenas o contrato assinado, mas a forma como o trabalho é exercido, por isso cada situação precisa ser analisada individualmente. Conhecer seus direitos é o primeiro passo para identificar uma possível pejotização irregular.',
        ],
        cta: popupCta(
          'Olá, Luiza! Vim pelo Instagram. Sou PJ, mas trabalho como CLT e gostaria de entender meus direitos.',
        ),
      },
    },
    {
      id: 'golpes',
      label: 'Alerta de golpes: como se proteger?',
      icon: 'shield',
      action: 'open-popup',
      popup: {
        title: 'Alerta de golpes: como se proteger?',
        paragraphs: [
          'Golpes financeiros e digitais estão cada vez mais comuns, e qualquer pessoa pode ser vítima. Desconfie de:',
          'Antes de qualquer pagamento, confirme a identidade de quem está pedindo e use canais oficiais. Se você já foi vítima, reúna comprovantes, conversas e demais registros, avise seu banco e procure orientação jurídica para avaliar as medidas cabíveis.',
        ],
        points: [
          'Contatos inesperados',
          'Links suspeitos',
          'Pedidos de transferência urgente',
          'Solicitações de dados pessoais ou bancários',
        ],
        cta: popupCta(
          'Olá, Luiza! Vim pelo Instagram e gostaria de orientação sobre um golpe.',
        ),
      },
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
      description: CONTACT_EMAIL,
      icon: 'mail',
      href: `mailto:${CONTACT_EMAIL}`,
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

  email: CONTACT_EMAIL,

  footer: {
    brand: NAME,
    line: `Advocacia Trabalhista · OAB/PE nº ${OAB_NUMBER}`,
    location: 'Atendimento online e presencial em Recife/PE',
  },

  a11y: {
    newTab: '(abre em nova aba)',
  },
};
