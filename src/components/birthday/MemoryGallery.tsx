import { useRef, useState, useEffect, type CSSProperties } from 'react';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { memories } from '@/lib/birthday-content';

export function MemoryGallery() {
  const [photos, setPhotos] = useState(memories);
  const [selected, setSelected] = useState<number | null>(null);
  const [replace, setReplace] = useState<number | null>(null);
  const upload = useRef<HTMLInputElement>(null);
  const urls = useRef<string[]>([]);
  useEffect(() => () => urls.current.forEach(url => URL.revokeObjectURL(url)), []);
  useEffect(() => {
    if (selected === null) return;
    const listener = (event: KeyboardEvent) => { if (event.key === 'Escape') setSelected(null); };
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [selected]);
  const photo = selected === null ? null : photos[selected];
  return <><div className="memory-gallery">{photos.map((photo, i) => <figure className={`memory-photo photo-${i}`} key={i}>
    <Button variant="keepsake" className="photo-open" aria-label={`View ${photo.caption}`} onClick={() => setSelected(i)}><img src={photo.src} alt={photo.caption} loading="lazy" width={1536} height={1024} style={{ '--photo-position': photo.position } as CSSProperties} /></Button>
    <figcaption>{photo.caption}</figcaption><Button variant="ghost" size="icon" className="photo-replace" title="Replace photo" aria-label={`Replace photo ${i + 1}`} onClick={() => {setReplace(i); upload.current?.click();}}><Camera /></Button>
  </figure>)}</div><input ref={upload} type="file" accept="image/*" className="sr-only" aria-label="Choose a memory photo" onChange={event => { const file = event.target.files?.[0]; if (!file || replace === null || !file.type.startsWith('image/')) return; const url = URL.createObjectURL(file); urls.current.push(url); setPhotos(previous => previous.map((photo, i) => i === replace ? {...photo, src: url, position: '50% 50%'} : photo)); event.target.value = ''; }} />
  {photo && <div className="photo-modal" role="dialog" aria-modal="true" aria-label={photo.caption} onClick={() => setSelected(null)}><Button variant="ghost" size="icon" className="modal-close" autoFocus aria-label="Close photo" onClick={() => setSelected(null)}><X /></Button><Button variant="ghost" size="icon" aria-label="Previous photo" onClick={event => {event.stopPropagation(); setSelected(previous => previous === null ? 0 : (previous + photos.length - 1) % photos.length);}}><ChevronLeft /></Button><figure onClick={event => event.stopPropagation()}><img src={photo.src} alt={photo.caption} width={1536} height={1024} /><figcaption>{photo.caption}</figcaption></figure><Button variant="ghost" size="icon" aria-label="Next photo" onClick={event => {event.stopPropagation(); setSelected(previous => previous === null ? 0 : (previous + 1) % photos.length);}}><ChevronRight /></Button></div>}
  </>;
}
