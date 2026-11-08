import { motion } from 'framer-motion';
import { profile } from '../config/profile';
import { fadeUp } from '../lib/motion';

export default function PracticeAreas() {
  const { kicker, title, items } = profile.practiceAreas;

  return (
    <section className="section" aria-labelledby="areas-title">
      <motion.div variants={fadeUp}>
        <p className="section-kicker">{kicker}</p>
        <h2 className="section-title" id="areas-title">
          {title}
        </h2>
      </motion.div>
      <motion.ul variants={fadeUp} className="chips">
        {items.map((area) => (
          <li key={area} className="chip">
            {area}
          </li>
        ))}
      </motion.ul>
    </section>
  );
}
