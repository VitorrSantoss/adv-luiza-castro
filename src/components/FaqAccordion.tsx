import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { profile } from '../config/profile';
import { ease, fadeUp } from '../lib/motion';

export default function FaqAccordion() {
  const { kicker, title, items, disclaimer } = profile.faq;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <section className="section" aria-labelledby="faq-title">
      <motion.div variants={fadeUp}>
        <p className="section-kicker">{kicker}</p>
        <h2 className="section-title" id="faq-title">
          {title}
        </h2>
      </motion.div>

      <motion.div variants={fadeUp} className="faq">
        {items.map((item, index) => {
          const open = openIndex === index;
          const buttonId = `${baseId}-q${index}`;
          const panelId = `${baseId}-a${index}`;

          return (
            <div key={item.question} className={`faq-item${open ? ' is-open' : ''}`}>
              <h3 className="faq-q">
                <button
                  type="button"
                  id={buttonId}
                  className="faq-btn"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? null : index)}
                >
                  {item.question}
                  <span className="faq-sign" aria-hidden="true" />
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="faq-panel"
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.35, ease }}
                  >
                    <p>{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </motion.div>

      <motion.p variants={fadeUp} className="notice">
        {disclaimer}
      </motion.p>
    </section>
  );
}
