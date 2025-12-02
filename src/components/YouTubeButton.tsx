'use client';

interface YouTubeButtonProps {
  videoUrl: string;
}

export default function YouTubeButton({ videoUrl }: YouTubeButtonProps) {
  return (
    <a
      href={videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="youtube-button"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: 'rgba(255, 255, 255, 0.1)',
        color: '#fff',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '10px 20px 10px 14px',
        borderRadius: '30px',
        fontSize: '13px',
        fontWeight: 600,
        textDecoration: 'none',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
      }}
    >
      <div style={{
        width: '32px',
        height: '32px',
        background: '#FF0000',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff">
          <polygon points="5,3 19,12 5,21"/>
        </svg>
      </div>
      Voir la vidéo
    </a>
  );
}
