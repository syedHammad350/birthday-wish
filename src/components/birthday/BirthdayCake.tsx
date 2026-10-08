import { useState } from 'react';
import { Heart, RotateCcw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Particles } from './StoryEffects';

export function BirthdayCake() {
  const [candles, setCandles] = useState([true, true, true, true, true]);
  const complete = candles.every(candle => !candle);
  return <div className={`cake-experience ${complete ? 'wishes-made' : ''}`}>
    {complete && <Particles burst />}
    <div className="cake-stage">
      <span className="cake-sparkle sparkle-one">✧</span><span className="cake-sparkle sparkle-two">✦</span><span className="cake-sparkle sparkle-three">✧</span>
      <div className="cake">
        <div className="candles">{candles.map((lit, i) => <Button key={i} variant="candle" className={lit ? 'lit' : 'unlit'} aria-label={`Blow out candle ${i + 1}`} aria-pressed={!lit} disabled={!lit} onClick={() => setCandles(previous => previous.map((c, j) => i === j ? false : c))}>
          <span className="flame" /><span className="wick" /><span className="candle-stick" /><span className="smoke" />
        </Button>)}</div>
        <div className="cake-tier tier-top"><div className="icing" /><div className="cake-hearts">♥ <span>♥</span> ♥</div></div>
        <div className="cake-tier tier-bottom"><div className="icing" /><div className="cake-pearls">• • • • • • • • • • •</div><div className="cake-ribbon"><Heart size={17} fill="currentColor" /></div></div>
        <div className="cake-plate" />
      </div>
    </div>
    <div className="cake-status" aria-live="polite">{complete ? <><h3>Happy Birthday Alisha! 🎂❤️</h3><p>May every wish in your heart come true. ✨</p><Button variant="ghost" size="sm" onClick={() => setCandles([true, true, true, true, true])}><RotateCcw /> One more wish</Button></> : <><p className="candle-hint"><Sparkles size={14} /> A little wish, just for you</p><div className="candle-dots" aria-label={`${candles.filter(Boolean).length} candles remaining`}>{candles.map((lit, i) => <span key={i} className={lit ? 'dot-lit' : ''} />)}</div></>}</div>
  </div>;
}
