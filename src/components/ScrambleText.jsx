import { useState, useEffect } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#_';

export default function ScrambleText({ text, className = "" }) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let interval = null;
    
    if (isHovering) {
      let iteration = 0;
      interval = setInterval(() => {
        setDisplayText((current) => 
          text
            .split("")
            .map((letter, index) => {
              if (letter === " ") return " ";
              if (index < iteration) {
                return text[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }
        // Speed of the reveal
        iteration += 1 / 2;
      }, 30);
    } else {
      setDisplayText(text);
    }

    return () => clearInterval(interval);
  }, [isHovering, text]);

  return (
    <span
      className={className}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {displayText}
    </span>
  );
}
