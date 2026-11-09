import { useState } from 'react';
import { motion } from 'framer-motion';
import { profile, type LinkItem, type PopupContent } from '../config/profile';
import { fadeUp } from '../lib/motion';
import InfoPopup from './InfoPopup';
import LinkButton from './LinkButton';
import PrimaryCTA from './PrimaryCTA';

export default function LinkList() {
  const [popup, setPopup] = useState<PopupContent | null>(null);

  const clickHandler = (item: LinkItem) => {
    if (item.action === 'open-popup' && item.popup) {
      const content = item.popup;
      return () => setPopup(content);
    }
    return undefined;
  };

  return (
    <nav aria-label={profile.linksNavLabel}>
      <ul className="links">
        <PrimaryCTA />
        {profile.links.map((item) => (
          <motion.li key={item.id} variants={fadeUp}>
            <LinkButton item={item} onClick={clickHandler(item)} />
          </motion.li>
        ))}
      </ul>
      <InfoPopup content={popup} onClose={() => setPopup(null)} />
    </nav>
  );
}
