export default function Marquee({ text, speed = 30, size = '7xl' }) {
  // Using custom size class or text size passed in
  const sizeClass = size === 'large' ? 'text-[clamp(80px,10vw,140px)]' : 
                    size === 'medium' ? 'text-[48px]' : 
                    `text-${size}`;

  return (
    <div className="marquee-wrapper w-full overflow-hidden" style={{ '--marquee-speed': `${speed}s` }}>
      <div className="marquee-track flex w-max">
        {/* Render text repeated 8x */}
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            className={`font-display font-extrabold text-text whitespace-nowrap ${sizeClass}`}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
