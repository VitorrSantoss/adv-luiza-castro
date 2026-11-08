import { profile, type LinkItem } from '../config/profile';
import { ArrowIcon, ICONS } from './Icons';

interface LinkButtonProps {
  item: LinkItem;
  variant?: 'default' | 'primary';
  onClick?: () => void;
}

export default function LinkButton({ item, variant = 'default', onClick }: LinkButtonProps) {
  const Icon = ICONS[item.icon];
  const isExternal = !!item.href && /^https?:\/\//.test(item.href);
  const className = variant === 'primary' ? 'btn btn--primary' : 'btn';

  // Avisa o leitor de tela quando o link abre em nova aba
  const ariaLabel = isExternal
    ? [item.label, item.description, profile.a11y.newTab].filter(Boolean).join(' ')
    : undefined;

  const content = (
    <>
      <span className="icon" aria-hidden="true">
        <Icon />
      </span>
      <span className="label">
        {item.label}
        {item.description && <span className="sub">{item.description}</span>}
      </span>
      <ArrowIcon className="arrow" />
    </>
  );

  if (item.action || onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {content}
      </button>
    );
  }

  return (
    <a
      href={item.href}
      aria-label={ariaLabel}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={className}
    >
      {content}
    </a>
  );
}
