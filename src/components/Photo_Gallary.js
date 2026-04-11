import React, { useState, useEffect, useCallback } from 'react';
import { getPublicGalleryImages } from '../services/api';

const CATEGORIES = ['All', 'Clinic', 'Ayurveda Treatment', 'Training Programs', 'Events', 'Other'];

/* ─── Lightbox ─────────────────────────────────────────── */
function Lightbox({ images, index, onClose }) {
  const [current, setCurrent] = useState(index);

  const prev = useCallback(() => setCurrent(c => (c - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent(c => (c + 1) % images.length), [images.length]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [prev, next, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl leading-none w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors z-10"
        style={{ fontSize: '28px' }}
      >
        ✕
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors z-10 text-2xl"
      >
        ‹
      </button>

      {/* Image */}
      <div
        className="max-w-5xl max-h-screen p-4 flex flex-col items-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={current}
          src={images[current]?.src}
          alt={images[current]?.alt || ''}
          className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl"
          style={{ animation: 'fadeIn .2s ease' }}
        />
        {images[current]?.title && (
          <p className="text-white/60 text-sm">{images[current].title}</p>
        )}
        <p className="text-white/40 text-xs">{current + 1} / {images.length}</p>
      </div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors z-10 text-2xl"
      >
        ›
      </button>

      {/* Thumbnails */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
            className={`flex-shrink-0 w-14 h-10 rounded overflow-hidden border-2 transition-all ${i === current ? 'border-white opacity-100' : 'border-transparent opacity-40 hover:opacity-70'}`}
          >
            <img src={img.src} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: scale(.97); } to { opacity: 1; transform: scale(1); } }`}</style>
    </div>
  );
}

/* ─── Masonry Grid ──────────────────────────────────────── */
function MasonryGrid({ images, onImageClick }) {
  // Split into 3 columns by distributing images sequentially
  const cols = [[], [], []];
  images.forEach((img, i) => cols[i % 3].push({ ...img, originalIndex: i }));

  return (
    <div className="flex gap-4">
      {cols.map((col, ci) => (
        <div key={ci} className="flex flex-col gap-4 flex-1">
          {col.map((img) => {
            const aspectRatio = img.height && img.width ? (img.height / img.width) : (2 / 3);
            return (
              <div
                key={img.originalIndex}
                className="relative group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
                style={{ paddingBottom: `${(aspectRatio * 100).toFixed(1)}%`, position: 'relative' }}
                onClick={() => onImageClick(img.originalIndex)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-500 flex items-end p-3">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs font-medium bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
                    {img.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* Mobile 1-col & tablet 2-col breakpoints via responsive wrapper */
function ResponsiveMasonry({ images, onImageClick }) {
  const [cols, setCols] = useState(3);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setCols(1);
      else if (window.innerWidth < 1024) setCols(2);
      else setCols(3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const columns = Array.from({ length: cols }, () => []);
  images.forEach((img, i) => columns[i % cols].push({ ...img, originalIndex: i }));

  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      {columns.map((col, ci) => (
        <div key={ci} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {col.map((img) => {
            const aspectRatio = img.height && img.width ? (img.height / img.width) : 0.75;
            return (
              <div
                key={img.originalIndex}
                onClick={() => onImageClick(img.originalIndex)}
                className="group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-500"
                style={{ position: 'relative', paddingBottom: `${(aspectRatio * 100).toFixed(1)}%` }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-3">
                  {img.title && (
                    <span className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
                      {img.title}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ─── Skeleton Loader ───────────────────────────────────── */
function Skeleton() {
  const heights = [260, 340, 210, 400, 280, 320, 180, 360, 300];
  const cols = [[], [], []];
  heights.forEach((h, i) => cols[i % 3].push(h));

  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      {cols.map((col, ci) => (
        <div key={ci} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {col.map((h, i) => (
            <div
              key={i}
              className="rounded-xl bg-gradient-to-r from-[#e8e0d4] via-[#f0e8dc] to-[#e8e0d4] animate-pulse"
              style={{ height: `${h}px` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────── */
function Photo_Gallery() {
  const L = (obj) => typeof obj === 'string' ? obj : (obj?.en || '');
  const TXT = {
    gallery: { en: 'Photo Gallery', hi: 'फोटो गैलरी', mr: 'फोटो गॅलरी' },
    subtitle: {
      en: 'Authentic moments from our clinic, holistic therapies, and transformative wellness journeys.',
      hi: 'हमारे क्लिनिक, समग्र थैरेपी और वेलनेस यात्राओं के प्रामाणिक क्षण।',
      mr: 'आमच्या क्लिनिकमधील, समग्र थेरपी आणि वेलनेस प्रवासातील खरे क्षण.',
    },
    empty: { en: 'No images in this category yet.', hi: 'इस श्रेणी में अभी कोई छवि नहीं है।', mr: 'या श्रेणीत अजून प्रतिमा नाहीत.' },
  };
  const [allImages, setAllImages] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPublicGalleryImages('');
        const mapped = data.map(img => ({
          src: img.url,
          width: img.width || 800,
          height: img.height || 600,
          title: img.title || '',
          alt: img.title || 'Gallery image',
          category: img.category,
        }));
        setAllImages(mapped);
        setPhotos(mapped);
      } catch (err) {
        setError('Unable to load the gallery. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    if (activeCategory === 'All') {
      setPhotos(allImages);
    } else {
      setPhotos(allImages.filter(img => img.category === activeCategory));
    }
  }, [activeCategory, allImages]);

  return (
    <div className="bg-[#f8f5f2] min-h-screen">
      {/* ── Hero Header ── */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#f0ebe3] to-[#f8f5f2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28 text-center">
          <span className="inline-block text-[#8a6e4b] font-medium tracking-[0.2em] uppercase text-sm mb-4">
            Bhagirathi Ayurveda
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-[#2a2118] leading-tight mb-6">
            {L(TXT.gallery)}
          </h1>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#8a6e4b] to-transparent mx-auto mb-6"></div>
          <p className="text-lg text-[#5a5248] font-light max-w-2xl mx-auto leading-relaxed">
            {L(TXT.subtitle)}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* ── Category Pills ── */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#3a5c40] text-white shadow-md scale-105'
                  : 'bg-white text-[#5a4a3a] border border-[#d6c7b0] hover:bg-[#f0e8d8] hover:text-[#3a5c40]'
              }`}
            >
              {cat}
              {activeCategory === cat && allImages.length > 0 && (
                <span className="ml-2 bg-white/20 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {photos.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Content ── */}
        {error ? (
          <div className="text-center py-16 bg-red-50 rounded-2xl border border-red-100 max-w-xl mx-auto">
            <div className="text-red-400 text-5xl mb-4">⚠️</div>
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        ) : loading ? (
          <Skeleton />
        ) : photos.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-[#d6c7b0]">
            <div className="text-5xl mb-4">🌿</div>
            <p className="text-xl text-[#5a4a3a] font-serif">{L(TXT.empty)}</p>
          </div>
        ) : (
          <ResponsiveMasonry images={photos} onImageClick={setLightboxIndex} />
        )}
      </div>

      {/* ── Lightbox ── */}
      {lightboxIndex >= 0 && (
        <Lightbox
          images={photos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(-1)}
        />
      )}
    </div>
  );
}

export default Photo_Gallery;