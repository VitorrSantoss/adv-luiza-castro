import { motion } from 'framer-motion';
import { profile } from '../config/profile';
import { fadeUp } from '../lib/motion';
import LinkButton from './LinkButton';
import PrimaryCTA from './PrimaryCTA';

interface LinkListProps {
  onOpenEmail: () => void;
}

export default function LinkList({ onOpenEmail }: LinkListProps) {
  return (
    <nav aria-label={profile.linksNavLabel}>
      <ul className="links">
        <PrimaryCTA />
        {profile.links.map((item) => (
          <motion.li key={item.id} variants={fadeUp}>
            <LinkButton
              item={item}
              onClick={item.action === 'open-email' ? onOpenEmail : undefined}
            />
          </motion.li>
        ))}
      </ul>
    </nav>
  );
}
