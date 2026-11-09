import { useEffect, useId, useRef } from 'react';
import { profile, type PopupContent } from '../config/profile';
import { WhatsappIcon } from './Icons';

interface InfoPopupProps {
  /** Conteúdo exibido; null mantém o pop-up fechado */
  content: PopupContent | null;
  onClose: () => void;
}

/**
 * Pop-up informativo baseado no <dialog> nativo: o navegador cuida do foco
 * preso dentro do pop-up, da tecla Esc e de devolver o foco ao botão que o abriu.
 */
export default function InfoPopup({ content, onClose }: InfoPopupProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (content && !dialog.open) {
      dialog.showModal();
      document.body.classList.add('no-scroll');
    } else if (!content && dialog.open) {
      dialog.close();
    }
  }, [content]);

  const handleClose = () => {
    document.body.classList.remove('no-scroll');
    onClose();
  };

  return (
    <dialog
      ref={ref}
      className="popup"
      aria-labelledby={titleId}
      onClose={handleClose}
      // Clique no fundo escurecido (fora do cartão) fecha o pop-up
      onClick={(e) => {
        if (e.target === e.currentTarget) ref.current?.close();
      }}
    >
      {content && (
        <div className="popup-card">
          <button
            type="button"
            className="popup-close"
            aria-label={profile.popupCloseLabel}
            onClick={() => ref.current?.close()}
          >
            <span aria-hidden="true" />
          </button>

          <h2 className="popup-title" id={titleId}>
            {content.title}
          </h2>

          <div className="popup-body">
            {content.paragraphs.map((text, index) => (
              <div key={text}>
                <p>{text}</p>
                {index === 0 && content.points && (
                  <ul className="popup-points">
                    {content.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <a
            href={content.cta.url}
            target="_blank"
            rel="noopener noreferrer"
            className="pill-link popup-cta"
          >
            <WhatsappIcon />
            {content.cta.label}
          </a>
        </div>
      )}
    </dialog>
  );
}
