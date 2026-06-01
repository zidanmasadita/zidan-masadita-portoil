"use client";
import { ReactLenis } from 'lenis/react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    
    // Sync Lenis with GSAP's ticker to eliminate jitter on pinned ScrollTriggers
    gsap.ticker.add(update);
    // lagSmoothing(0) disables frame-skip protection — Chrome needs this to
    // avoid cascading jank when it misses a frame. Use the recommended default.
    gsap.ticker.lagSmoothing(250, 30);
    
    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis 
      root 
      ref={lenisRef} 
      autoRaf={false} 
      options={{ 
        lerp: 0.05, 
        wheelMultiplier: 1, 
        smoothWheel: true 
      }}
    >
      {children}
    </ReactLenis>
  );
}
