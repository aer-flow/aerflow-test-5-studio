import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { FluidDistortionMaterial } from './FluidDistortionMaterial';
import { shouldUseLiteEffects } from '@/utils/device';

// Ensure side effect is loaded
void FluidDistortionMaterial;

function FluidPlane() {
  const materialRef = useRef<(THREE.ShaderMaterial & { uTime: number; uPointer: THREE.Vector2 }) | null>(null);
  const { viewport, pointer } = useThree();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      // Normalizare pointer la 0-1 (UV space)
      materialRef.current.uPointer.set(
        (pointer.x + 1) / 2,
        (pointer.y + 1) / 2
      );
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 16, 16]} />
      {/* @ts-expect-error - extended in FluidDistortionMaterial.tsx */}
      <fluidDistortionMaterial
        ref={materialRef}
        uColorBase={new THREE.Color('#050505')}
        uColorHighlight={new THREE.Color('#18200b')}
      />
    </mesh>
  );
}

function MobileHeroFallback() {
  return (
    <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_18%,rgba(215,255,107,0.12),transparent_26%),radial-gradient(circle_at_80%_10%,rgba(120,132,255,0.12),transparent_24%),linear-gradient(135deg,#070707,#0d0d0d_52%,#050505)]" />
  );
}

export default function HeroCanvas() {
  const isMobile = shouldUseLiteEffects();

  // On mobile, skip WebGL entirely — use a CSS gradient fallback
  if (isMobile) {
    return (
      <div className="absolute inset-0 z-0">
        <MobileHeroFallback />
        <div className="absolute inset-0 bg-aerflow-dark/20" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0">
      <Canvas 
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.5]}
        frameloop="always"
        gl={{ 
          powerPreference: "high-performance",
          antialias: false,
          stencil: false,
          depth: false,
          alpha: false,
        }}
        performance={{ min: 0.5 }}
      >
        <FluidPlane />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(0,0,0,0.35)_72%),linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.38))]" />
    </div>
  );
}
