import React from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  charClassName?: string;
}

export function SplitText({ text, className = "", charClassName = "char" }: SplitTextProps) {
  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {text.split("").map((char, index) => (
        <span
          key={`${char}-${index}`}
          className={`inline-block whitespace-pre ${charClassName}`}
          aria-hidden="true"
        >
          {char}
        </span>
      ))}
    </span>
  );
}
