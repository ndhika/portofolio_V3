"use client";

import { useRef, useCallback, ReactNode } from "react";

interface MagBtnProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
}

export default function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  strength = 0.3,
}: MagBtnProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      ref.current.style.transition = "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)";
    },
    [strength]
  );

  const onLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
    ref.current.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
  }, []);

  const inner = (
    <div
      ref={ref}
      className={`mag-btn ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor-hover
    >
      {children}
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
      >
        {inner}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick}>
      {inner}
    </button>
  );
}
