import { MotionConfig, motion } from 'framer-motion';
import { stagger } from './lib/motion';
import ProfileHeader from './components/ProfileHeader';
import LinkList from './components/LinkList';
import PracticeAreas from './components/PracticeAreas';
import FaqAccordion from './components/FaqAccordion';
import Footer from './components/Footer';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div className="page" variants={stagger} initial="hidden" animate="show">
        <ProfileHeader />

        <main className="content">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <LinkList />
            <PracticeAreas />
            <FaqAccordion />
          </motion.div>
        </main>

        <Footer />
      </motion.div>
    </MotionConfig>
  );
}
