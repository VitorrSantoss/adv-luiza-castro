import { useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../config/profile';
import { fadeUp } from '../lib/motion';
import { DiamondIcon } from './Icons';

/** Renderiza o nome com a palavra de destaque em Pinyon Script */
function AccentName({ name, accent }: { name: string; accent: string }) {
  const index = name.lastIndexOf(accent);
  if (!accent || index === -1) return <>{name}</>;
  return (
    <>
      {name.slice(0, index)}
      <span className="script">{accent}</span>
      {name.slice(index + accent.length)}
    </>
  );
}

export default function ProfileHeader() {
  const [photoFailed, setPhotoFailed] = useState(false);
  const { name, accentWord, initials, title, education, bio, photo } = profile;

  return (
    <header className="header">
      <motion.div variants={fadeUp} className="avatar">
        {photoFailed ? (
          <span className="monogram" role="img" aria-label={photo.alt}>
            {initials}
          </span>
        ) : (
          <span className="frame">
            <img
              src={photo.src}
              alt={photo.alt}
              width={116}
              height={116}
              onError={() => setPhotoFailed(true)}
            />
          </span>
        )}
      </motion.div>

      <motion.h1 variants={fadeUp} className="name">
        <AccentName name={name} accent={accentWord} />
      </motion.h1>

      <motion.p variants={fadeUp} className="role">
        {title}
      </motion.p>

      <motion.div variants={fadeUp}>
        <div className="divider" aria-hidden="true">
          <DiamondIcon />
        </div>
        <p className="tagline">{bio}</p>
      </motion.div>

      <motion.p variants={fadeUp} className="credential">
        {education}
      </motion.p>
    </header>
  );
}
