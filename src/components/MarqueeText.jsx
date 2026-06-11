export default function MarqueeText({ 
  text, 
  speed = '20s', 
  fontSize = 'clamp(80px,12vw,160px)', 
  color = '#0a0a0a',
  mixBlendMode = 'normal'
}) {
  return (
    <div className="marquee-wrapper pointer-events-none" style={{ mixBlendMode }}>
      <div 
        className="marquee-track"
        style={{ 
          '--speed': speed, 
          color, 
          fontSize, 
          fontFamily: "'Inter', sans-serif",
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: '-0.05em',
          mixBlendMode: mixBlendMode
        }}
      >
        {/* Render text exactly 6 times seamlessly */}
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
}
