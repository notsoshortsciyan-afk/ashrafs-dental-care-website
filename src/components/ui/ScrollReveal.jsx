import { useEffect, useRef, useState } from "react";

const offsets = {
  up: "translate3d(0, 3rem, 0)",
  down: "translate3d(0, -3rem, 0)",
  left: "translate3d(3rem, 0, 0)",
  right: "translate3d(-3rem, 0, 0)",
  none: "translate3d(0, 0, 0)",
};

/**
 * Lightweight scroll-triggered entrance animation wrapper.
 * Replays animations both when scrolling down AND up. The horizontal
 * translate offsets of hidden elements are kept from widening the page
 * by `overflow-x: clip` on html/body in globals.css.
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 700,
  as: Tag = "div",
  style: userStyle,
  ...props
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Skip animation when the user prefers reduced motion */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update visibility based on intersection state to allow replaying!
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const animStyle = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translate3d(0,0,0)" : offsets[direction],
    transition: [
      `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1) ${visible ? delay : 0}ms`,
      `transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${visible ? delay : 0}ms`,
    ].join(", "),
    ...userStyle,
  };

  return (
    <Tag ref={ref} className={className} style={animStyle} {...props}>
      {children}
    </Tag>
  );
}
