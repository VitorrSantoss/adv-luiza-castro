import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import type { ViewId } from './config/profile';
import { ease, stagger } from './lib/motion';
import ProfileHeader from './components/ProfileHeader';
import LinkList from './components/LinkList';
import PracticeAreas from './components/PracticeAreas';
import FaqAccordion from './components/FaqAccordion';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

/** #email na URL abre direto o formulário (útil para linkar nos stories) */
const viewFromHash = (): ViewId => (window.location.hash === '#email' ? 'email' : 'links');

const scrollToTop = () => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
};

export default function App() {
  const [view, setView] = useState<ViewId>(viewFromHash);
  // true quando a troca de visão veio de um clique (para mover o foco)
  const navigatedRef = useRef(false);

  // Botão "voltar" do celular/navegador e mudanças manuais no hash
  useEffect(() => {
    const sync = () => setView(viewFromHash());
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, []);

  const openEmail = useCallback(() => {
    navigatedRef.current = true;
    window.history.pushState({ view: 'email' }, '', '#email');
    setView('email');
    scrollToTop();
  }, []);

  const backToLinks = useCallback(() => {
    navigatedRef.current = true;
    if (window.history.state?.view === 'email') {
      // Abrimos o formulário nesta sessão: volta no histórico (popstate atualiza a visão)
      window.history.back();
    } else {
      // Chegou direto por /#email: só limpa o hash
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
      setView('links');
    }
    scrollToTop();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <motion.div className="page" variants={stagger} initial="hidden" animate="show">
        <ProfileHeader />

        <main className="content">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={view}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease }}
            >
              <motion.div variants={stagger} initial="hidden" animate="show">
                {view === 'links' ? (
                  <>
                    <LinkList onOpenEmail={openEmail} />
                    <PracticeAreas />
                    <FaqAccordion />
                  </>
                ) : (
                  <ContactForm onBack={backToLinks} focusOnMount={navigatedRef.current} />
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer />
      </motion.div>
    </MotionConfig>
  );
}
