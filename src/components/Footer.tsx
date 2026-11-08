import { motion } from 'framer-motion';
import { profile } from '../config/profile';
import { fadeUp } from '../lib/motion';
import { PinIcon } from './Icons';

export default function Footer() {
  const { brand, line, location } = profile.footer;

  return (
    <motion.footer variants={fadeUp} className="footer">
      <p className="brand">{brand}</p>
      <p>{line}</p>
      <p className="place">
        <PinIcon />
        {location}
      </p>
    </motion.footer>
  );
}
