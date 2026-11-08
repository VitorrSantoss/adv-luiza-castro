import { motion } from 'framer-motion';
import { profile } from '../config/profile';
import { fadeUp } from '../lib/motion';
import LinkButton from './LinkButton';

export default function PrimaryCTA() {
  return (
    <motion.li variants={fadeUp}>
      <LinkButton item={profile.primaryCta} variant="primary" />
    </motion.li>
  );
}
