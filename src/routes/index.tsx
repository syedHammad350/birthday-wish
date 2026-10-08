import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, Heart, Music2, VolumeX, Sparkles, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BirthdayCake } from '@/components/birthday/BirthdayCake';
import { LoveLetter } from '@/components/birthday/LoveLetter';
import { MemoryGallery } from '@/components/birthday/MemoryGallery';
import { Particles, Reveal, Fireworks } from '@/components/birthday/StoryEffects';
import { loveMessages, musicSource } from '@/lib/birthday-content';
import backdrop from '@/assets/romantic-backdrop.jpg';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'For Alisha, With Love — A Birthday Story by Jibran' },
    { name: 'description', content: 'A little world of wishes, memories, and love. A birthday surprise made just for Alisha, with all Jibran’s heart.' },
    { property: 'og:title', content: 'Happy Birthday, Alisha ❤️ — With Love, Jibran' },
    { property: 'og:description', content: 'A romantic birthday story, a little wish, and a letter from the heart. Made especially for Alisha.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: BirthdayStory,
});

function BirthdayStory() {
  const [opening, setOpening] = useState(0);
  const [started, setStarted] = useState(false);
  const [music, setMusic] = useState(false);
  const [musicError, setMusicError] = useState(false);
  const [love, setLove] = useState(0);
  const [burst, setBurst] = useState(0);
  const [replay, setReplay] = useState(0);
  const audio = useRef<HTMLAudioElement>(null);
  const wish = useRef<HTMLElement>(null);
  useEffect(() => {
    const timers = [setTimeout(() => setOpening(1), 1300), setTimeout(() => setOpening(2), 3400), setTimeout(() => setOpening(3), 4800)];
    return () => timers.forEach(clearTimeout);
  }, [replay]);
  async function toggleMusic() {
    if (!audio.current) return;
    if (music) {audio.current.pause(); setMusic(false); return;}
    try { audio.current.volume = .35; await audio.current.play(); setMusic(true); setMusicError(false); } catch {setMusicError(true); setMusic(false);}
  }
  function openSurprise() {setStarted(true); setBurst(previous => previous + 1); wish.current?.scrollIntoView({behavior: 'smooth', block: 'start'});}
  function replayStory() {setOpening(0); setStarted(false); setLove(0); setReplay(previous => previous + 1); window.scrollTo({top: 0, behavior: 'smooth'});}
  return <main className="birthday-story">
    <audio ref={audio} src={musicSource} loop preload="none" />
    <header className="story-header"><a href="#beginning" className="story-brand">A <Heart size={13} /> J <span>A LITTLE LOVE STORY</span></a><div className="header-right"><span className="made-for">MADE JUST FOR ALISHA</span><Button variant="outline" className="music-toggle" onClick={toggleMusic} aria-pressed={music}>{music ? <Music2 /> : <VolumeX />}<span>Music {music ? 'On' : 'Off'}</span></Button></div></header>
    {musicError && <p role="status" className="music-error">The melody couldn’t play. Tap Music to try again.</p>}
    <section id="beginning" className="opening-section">
      <img src={backdrop} alt="Pink and red roses framing a romantic starry birthday evening" className="opening-backdrop" width={1536} height={1024} fetchPriority="high" />
      <div className="opening-shade" /><Particles />
      <div className="opening-content"><div className="eyebrow opening-intro"><span /> A DAY AS BEAUTIFUL AS YOU <span /></div><p className="hey-alisha">Hey Alisha <Heart size={18} /></p>
        <p className={`opening-preface ${opening >= 1 ? 'shown' : ''}`}>Someone very special has a birthday today...</p>
        <h1 className={opening >= 2 ? 'shown' : ''}><span>Happy Birthday,</span><em>My Love, Alisha<span className="title-heart">♡</span></em></h1>
        <div className={`opening-final ${opening >= 3 ? 'shown' : ''}`}><p className="opening-dedication">With all my love <span>— Jibran</span> <Heart size={13} /></p><Button variant="romantic" size="lg" onClick={openSurprise}>Open Your Surprise <Heart size={17} /><ArrowDown size={16} /></Button><p className="tiny-note">A little magic. A lot of love. All for you.</p></div>
      </div><a href="#wish" className="opening-scroll" aria-label="Continue to your birthday wish"><span>OUR STORY BEGINS HERE</span><ArrowDown size={16} /></a><span className="opening-corner">with love, always ♡</span>
    </section>
    {burst > 0 && <div key={burst} className="transition-burst"><Particles burst /></div>}
    <div className="story-body" key={replay}>
      <section id="wish" ref={wish} className="story-section wish-section"><Reveal><Chapter number="01" text="A LITTLE BIRTHDAY MAGIC" /><h2>Make a Wish, <em>Alisha</em> <span className="heading-sparkle">✧</span></h2><p className="section-subtitle">Close your eyes. Dream a little. This moment is yours.</p></Reveal><BirthdayCake /><span className="section-footer-note">Five little flames. A thousand beautiful possibilities.</span></section>
      <section className="story-section love-section"><Reveal><Chapter number="02" text="THE LITTLE THINGS, THE BIG FEELINGS" /><h2>Why You’re So<br /><em>Special To Me</em> <span className="heading-heart">♡</span></h2></Reveal><div className="love-messages">{loveMessages.map((message, i) => <Reveal key={message}><div className="love-message"><span className="message-number">0{i + 1}</span><p>{message}</p><Heart size={16} /></div></Reveal>)}</div><Reveal><p className="handwritten sign-off">Forever yours, Jibran ♡</p></Reveal></section>
      <section className="story-section letter-section"><Reveal><Chapter number="03" text="WORDS I’VE BEEN SAVING FOR YOU" /><h2>From my heart,<br /><em>to yours.</em></h2><p className="section-subtitle">Some feelings deserve more than a message.</p></Reveal><LoveLetter /></section>
      <section className="story-section memories-section"><Reveal><Chapter number="04" text="MY FAVORITE PLACE IS WITH YOU" /><h2>Our Little <em>World</em> <span className="heading-heart">♡</span></h2><p className="section-subtitle">Little moments. Beautiful memories. A story that’s only ours.</p></Reveal><Reveal><MemoryGallery /></Reveal></section>
      <section className="story-section heart-section"><Reveal><Chapter number="05" text="THERE’S ALWAYS ROOM FOR MORE" /><h2>How Much Love Can<br /><em>One Heart Hold?</em></h2></Reveal><div className="heart-interaction"><Button variant="heart" aria-label="Fill Jibran’s heart with love" onClick={() => {setLove(previous => previous + 1); setBurst(previous => previous + 1);}}><Heart fill="currentColor" /></Button>{love > 0 && <div key={love} className="heart-local-burst"><Particles burst /></div>}<div className="heart-count">{love === 0 ? 'ALL MY LOVE, JUST FOR YOU' : `${love} LITTLE ${love === 1 ? 'MOMENT' : 'MOMENTS'} OF LOVE`}</div></div><div className="filled-message" aria-live="polite">{love >= 5 ? <p>You’ve filled this whole page with love...<br /><em>just like you’ve filled my heart. ❤️</em></p> : <p className="handwritten">A heart that beats a little brighter for you. ♡</p>}</div></section>
      <section className="story-section celebration-section"><Particles /><Fireworks /><Reveal><span className="celebration-crown">♛</span><Chapter number="06" text="YOUR DAY. YOUR MAGIC." /><h2>Today is all about<br /><em>YOU, Alisha!</em></h2><p className="section-subtitle">Here’s to your beautiful heart, your brightest smile,<br />and a year full of everything you’re wishing for.</p><Button variant="romantic" size="lg" onClick={() => setBurst(previous => previous + 1)}><Sparkles /> A little more celebration</Button></Reveal></section>
      <section className="ending-section"><img src={backdrop} alt="Romantic roses under golden stars" loading="lazy" width={1536} height={1024} /><div className="ending-shade" /><Particles /><Reveal className="ending-content"><div className="eyebrow">THE LAST PAGE. NEVER THE END.</div><p className="ending-name">Alisha...</p><div className="ending-lines"><p>Thank you for being you. ❤️</p><p>Thank you for being part of my life.</p><p>You are loved more than words can explain.</p></div><h2>Happy Birthday,<br /><em>My Love</em> <span>♡</span></h2><p className="handwritten">Forever & Always, Jibran ❤️</p><Button variant="outline" size="lg" onClick={replayStory}><RotateCcw /> Replay Our Story <Sparkles /></Button></Reveal><footer>MADE WITH ALL MY HEART <Heart size={12} /> JUST FOR YOU</footer></section>
    </div>
    {started && <Button variant="ghost" size="icon" className="back-to-top" title="Back to the beginning" aria-label="Back to the beginning" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}><ArrowUp /></Button>}
  </main>;
}
function Chapter({number, text}: {number: string; text: string}) {return <div className="chapter"><span>{number}</span><span className="chapter-line" />{text}</div>;}
