"use client";

import {
  useRef,
  useEffect,
  useState,
  useMemo,
  useId,
  FC,
  PointerEvent,
  ReactNode,
} from "react";
import { twMerge } from "tailwind-merge";

interface CurvedLoopProps {
  marqueeText?: string;
  speed?: number;
  className?: string;
  curveAmount?: number;
  direction?: "left" | "right";
  interactive?: boolean;
  /**
   * Character to colorize inside the marquee. Defaults to ✦.
   */
  accentChar?: string;
  /**
   * Colors to cycle through for each occurrence of accentChar.
   * If omitted, the accent character renders with the same fill as the rest of the text.
   */
  accentColors?: string[];
}

type Segment = { text: string; color?: string };

const CurvedLoop: FC<CurvedLoopProps> = ({
  marqueeText = "",
  speed = 2,
  className,
  curveAmount = 400,
  direction = "left",
  interactive = true,
  accentChar = "✦",
  accentColors,
}) => {
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (
      (hasTrailing ? marqueeText.replace(/\s+$/, "") : marqueeText) + "\u00A0"
    );
  }, [marqueeText]);

  // Break the text into colored segments, cycling through accentColors for each accentChar.
  const segments = useMemo<Segment[]>(() => {
    if (!accentColors || accentColors.length === 0) {
      return [{ text }];
    }
    const parts: Segment[] = [];
    let buffer = "";
    let accentIndex = 0;
    for (const ch of text) {
      if (ch === accentChar) {
        if (buffer) {
          parts.push({ text: buffer });
          buffer = "";
        }
        parts.push({
          text: accentChar,
          color: accentColors[accentIndex % accentColors.length],
        });
        accentIndex += 1;
      } else {
        buffer += ch;
      }
    }
    if (buffer) parts.push({ text: buffer });
    return parts;
  }, [text, accentChar, accentColors]);

  const measureRef = useRef<SVGTextElement | null>(null);
  const textPathRef = useRef<SVGTextPathElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const [spacing, setSpacing] = useState(0);
  const [offset, setOffset] = useState(0);
  const uid = useId();
  const pathId = `curve-${uid}`;
  const pathD = `M-100,75 Q500,${75 + curveAmount} 1540,75`;

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef<"left" | "right">(direction);
  const velRef = useRef(0);

  const textLength = spacing;
  const repCount = textLength ? Math.ceil(1800 / textLength) + 2 : 1;
  const ready = spacing > 0;

  // Build the repeated marquee content. If accentColors are provided, the
  // content is a list of <tspan> elements so each accent char can be styled
  // individually. Otherwise we fall back to a single concatenated string.
  const repeatedContent = useMemo<ReactNode>(() => {
    if (!textLength) return text;
    if (!accentColors || accentColors.length === 0) {
      return Array(repCount).fill(text).join("");
    }
    const nodes: ReactNode[] = [];
    for (let r = 0; r < repCount; r += 1) {
      segments.forEach((seg, i) => {
        if (seg.color) {
          nodes.push(
            <tspan key={`${r}-${i}`} fill={seg.color}>
              {seg.text}
            </tspan>
          );
        } else {
          nodes.push(
            <tspan key={`${r}-${i}`}>{seg.text}</tspan>
          );
        }
      });
    }
    return nodes;
  }, [segments, repCount, textLength, text, accentColors]);

  useEffect(() => {
    if (measureRef.current)
      setSpacing(measureRef.current.getComputedTextLength());
  }, [text, className]);

  useEffect(() => {
    if (!spacing) return;
    if (textPathRef.current) {
      const initial = -spacing;
      textPathRef.current.setAttribute("startOffset", initial + "px");
      setOffset(initial);
    }
  }, [spacing]);

  useEffect(() => {
    if (!spacing || !ready) return;
    let frame = 0;
    const step = () => {
      if (!dragRef.current && textPathRef.current) {
        const delta = dirRef.current === "right" ? speed : -speed;
        const currentOffset = parseFloat(
          textPathRef.current.getAttribute("startOffset") || "0"
        );
        let newOffset = currentOffset + delta;
        const wrapPoint = spacing;
        if (newOffset <= -wrapPoint) newOffset += wrapPoint;
        if (newOffset > 0) newOffset -= wrapPoint;
        textPathRef.current.setAttribute("startOffset", newOffset + "px");
        setOffset(newOffset);
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [spacing, speed, ready]);

  const onPointerDown = (e: PointerEvent) => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!interactive || !dragRef.current || !textPathRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;
    const currentOffset = parseFloat(
      textPathRef.current.getAttribute("startOffset") || "0"
    );
    let newOffset = currentOffset + dx;
    const wrapPoint = spacing;
    if (newOffset <= -wrapPoint) newOffset += wrapPoint;
    if (newOffset > 0) newOffset -= wrapPoint;
    textPathRef.current.setAttribute("startOffset", newOffset + "px");
    setOffset(newOffset);
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    dirRef.current = velRef.current > 0 ? "right" : "left";
  };

  const cursorStyle = interactive
    ? dragRef.current
      ? "grabbing"
      : "grab"
    : "auto";

  return (
    <div
      className="flex w-full items-center justify-center"
      style={{ visibility: ready ? "visible" : "hidden", cursor: cursorStyle }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <svg
        className="block aspect-100/12 w-full select-none overflow-visible text-[3rem] font-bold uppercase leading-none"
        viewBox="0 0 1440 120"
      >
        <text
          ref={measureRef}
          xmlSpace="preserve"
          style={{
            visibility: "hidden",
            opacity: 0,
            pointerEvents: "none",
          }}
        >
          {text}
        </text>
        <defs>
          <path
            ref={pathRef}
            id={pathId}
            d={pathD}
            fill="none"
            stroke="transparent"
          />
        </defs>
        {ready && (
          <text
            xmlSpace="preserve"
            className={twMerge("fill-white", className)}
          >
            <textPath
              ref={textPathRef}
              href={`#${pathId}`}
              startOffset={offset + "px"}
              xmlSpace="preserve"
            >
              {repeatedContent}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default CurvedLoop;
