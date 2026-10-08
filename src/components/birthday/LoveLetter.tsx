import { useState } from 'react';
import { Heart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { letterParagraphs } from '@/lib/birthday-content';
import { Particles } from './StoryEffects';

export function LoveLetter() {
  const [open, setOpen] = useState(false);
  return <div className={`letter-experience ${open ? 'letter-is-open' : ''}`}>
    <Button variant="keepsake" className="envelope" aria-label="Open this letter, Alisha" aria-expanded={open} onClick={() => setOpen(!open)}>
      <span className="envelope-paper">For my Alisha</span><span className="envelope-flap" /><span className="envelope-front" /><span className="wax-seal"><Heart size={22} /></span><span className="envelope-caption">Open this letter, Alisha 💌</span>
    </Button>
    {open && <div className="letter-wrap"><Particles /><article className="love-letter"><Button className="letter-close" variant="ghost" size="icon" aria-label="Close love letter" onClick={() => setOpen(false)}><X /></Button><span className="letter-date">A LITTLE PIECE OF MY HEART</span><h3>Dear Alisha,</h3>{letterParagraphs.map(p => <p key={p}>{p}</p>)}<p>With all my heart,</p><div className="letter-signature">Jibran <Heart size={22} /></div></article></div>}
  </div>;
}
