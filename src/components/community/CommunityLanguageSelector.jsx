import React, { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const languages = {
  en: 'English',
  hi: 'हिंदी',
  gu: 'ગુજરાતી',
};

const CommunityLanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          border: '1px solid rgba(var(--ch-primary-rgb), 0.3)',
          borderRadius: '8px',
          background: 'rgba(var(--ch-primary-rgb), 0.05)',
          color: 'var(--ch-muted)',
          fontSize: '13px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
      >
        <Globe size={14} />
        {languages[language]}
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            right: 0,
            minWidth: '130px',
            background: 'var(--ch-card)',
            border: '1px solid var(--ch-border)',
            borderRadius: '10px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            zIndex: 200,
            overflow: 'hidden',
          }}
        >
          {Object.entries(languages).map(([code, label]) => (
            <button
              key={code}
              onClick={() => { setLanguage(code); setOpen(false); }}
              style={{
                display: 'block',
                width: '100%',
                padding: '10px 14px',
                textAlign: 'left',
                background: language === code ? 'rgba(var(--ch-primary-rgb), 0.08)' : 'transparent',
                color: language === code ? 'var(--ch-primary)' : 'var(--ch-text)',
                fontSize: '13px',
                fontWeight: language === code ? '600' : '400',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.15s',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityLanguageSelector;
