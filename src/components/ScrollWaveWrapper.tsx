"use client";

import React from "react";

interface ScrollWaveWrapperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * ScrollWaveWrapper:
 * Keeps all main content perfectly straight and aligned without any skew,
 * rotation, or geometric distortion during scrolling.
 */
export function ScrollWaveWrapper({ children, className = "" }: ScrollWaveWrapperProps) {
  return (
    <div className={`relative w-full ${className}`}>
      {children}
    </div>
  );
}
