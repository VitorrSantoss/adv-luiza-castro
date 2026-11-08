import type { SVGProps } from 'react';
import type { IconName } from '../config/profile';

/* Ícones SVG do design original (legacy/index.html) */

type Props = SVGProps<SVGSVGElement>;

const line = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

export const WhatsappIcon = (p: Props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.63.72.22 1.37.19 1.88.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.56.94.95-3.47-.22-.36a9.4 9.4 0 0 1-1.44-5.01c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.45 9.43m8.03-17.46A11.27 11.27 0 0 0 12.05.72C5.79.72.7 5.8.7 12.06c0 2 .52 3.95 1.52 5.67L.6 23.6l6-1.57a11.33 11.33 0 0 0 5.44 1.39h.01c6.25 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.32-8.02" />
  </svg>
);

const CalendarIcon = (p: Props) => (
  <svg {...line} aria-hidden="true" {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
    <path d="M8 3v4M16 3v4M3.5 10h17M9 14.5l2 2 4-4" />
  </svg>
);

const QuestionIcon = (p: Props) => (
  <svg {...line} aria-hidden="true" {...p}>
    <path d="M20 12a8 8 0 0 1-11.6 7.14L4 20l.9-4.1A8 8 0 1 1 20 12Z" />
    <path d="M9.7 9.5a2.4 2.4 0 0 1 4.6.9c0 1.6-2.3 2-2.3 3.2M12 16.3h.01" />
  </svg>
);

const DocumentIcon = (p: Props) => (
  <svg {...line} aria-hidden="true" {...p}>
    <path d="M14 3.5H7.5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V8Z" />
    <path d="M14 3.5V8h4.5M9 12.5h6M9 16h4" />
  </svg>
);

const BriefcaseIcon = (p: Props) => (
  <svg {...line} aria-hidden="true" {...p}>
    <rect x="3.5" y="7.5" width="17" height="12.5" rx="2.5" />
    <path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M3.5 13h17M12 12v2" />
  </svg>
);

const ShieldIcon = (p: Props) => (
  <svg {...line} aria-hidden="true" {...p}>
    <path d="M12 3 4.5 6v5.5c0 4.5 3.2 8.3 7.5 9.5 4.3-1.2 7.5-5 7.5-9.5V6Z" />
    <path d="M12 8.5v4.5M12 16h.01" />
  </svg>
);

const InstagramIcon = (p: Props) => (
  <svg {...line} aria-hidden="true" {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17.2 6.8h.01" />
  </svg>
);

const MailIcon = (p: Props) => (
  <svg {...line} aria-hidden="true" {...p}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

export const ArrowIcon = (p: Props) => (
  <svg {...line} strokeWidth={1.8} aria-hidden="true" {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const PinIcon = (p: Props) => (
  <svg {...line} strokeWidth={1.7} aria-hidden="true" {...p}>
    <path d="M12 21s-6.5-5.7-6.5-11a6.5 6.5 0 0 1 13 0c0 5.3-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.3" />
  </svg>
);

export const DiamondIcon = (p: Props) => (
  <svg viewBox="0 0 10 10" aria-hidden="true" {...p}>
    <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="currentColor" />
  </svg>
);

export const ICONS: Record<IconName, (p: Props) => JSX.Element> = {
  whatsapp: WhatsappIcon,
  calendar: CalendarIcon,
  question: QuestionIcon,
  document: DocumentIcon,
  briefcase: BriefcaseIcon,
  shield: ShieldIcon,
  instagram: InstagramIcon,
  mail: MailIcon,
};
