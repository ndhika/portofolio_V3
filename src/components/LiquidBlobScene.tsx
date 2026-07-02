"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MathUtils, Color, Vector2, Mesh, ShaderMaterial } from "three";
import { Environment, Float, Sparkles } from "@react-three/drei";

const snoise = `
// Simplex 3D Noise 
// by Ian McEwan, Ashima Arts
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float snoise(vec3 v){ 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod(i, 289.0 ); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
}
`;

const vertexShader = `
  uniform float uTime;
  uniform float uSpeed;
  uniform float uNoiseDensity;
  uniform float uNoiseStrength;
  uniform vec2 uMouse;

  varying vec3 vNormal;
  varying vec2 vUv;
  varying vec3 vViewPosition;

  ${snoise}

  void main() {
    vUv = uv;
    
    vec3 pos = position;
    
    // Distort based on noise
    float noise = snoise(vec3(pos * uNoiseDensity + uTime * uSpeed));
    pos += normal * (noise * uNoiseStrength);
    
    // Subtle mouse follow/magnetic effect
    // Project mouse to world rough approx
    float dist = length(pos.xy - uMouse * 5.0);
    float mouseEffect = smoothstep(3.0, 0.0, dist) * 0.3;
    pos += normal * mouseEffect;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vViewPosition = -mvPosition.xyz;
    
    // Normal matrix to handle rotations
    vNormal = normalize(normalMatrix * normal);
    
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1; // Teal
  uniform vec3 uColor2; // Purple
  uniform vec3 uColor3; // Transparent white/glass

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  ${snoise}

  void main() {
    // Liquid dynamic gradient
    float n = snoise(vec3(vUv * 3.0, uTime * 0.2));
    
    vec3 colorMix = mix(uColor1, uColor2, vUv.x + n * 0.5);
    colorMix = mix(colorMix, uColor3, vUv.y + n * 0.5);

    // Fresnel effect
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    float fresnel = dot(viewDir, normal);
    fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
    fresnel = pow(fresnel, 2.5); // Sharpness of the edge glow
    
    // Add glass/glow effect at the edges
    vec3 finalColor = mix(colorMix, vec3(1.0, 1.0, 1.0), fresnel * 0.8);

    // Alpha channel for transparency
    float alpha = 0.7 + fresnel * 0.3;

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

function Blob() {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const { viewport, mouse } = useThree();

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") return window.innerWidth < 768;
    return false;
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSpeed: { value: 0.3 },
      uNoiseDensity: { value: 1.5 },
      uNoiseStrength: { value: 0.3 },
      uMouse: { value: new Vector2(0, 0) },
      uScroll: { value: 0 },
      uColor1: { value: new Color("#00f0ff") }, // Teal
      uColor2: { value: new Color("#8a2be2") }, // Purple
      uColor3: { value: new Color("#ffffff") }, // Glassy white
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // Smooth mouse follow for the blob center
      materialRef.current.uniforms.uMouse.value.lerp(
        new Vector2(mouse.x, mouse.y),
        0.05
      );
      
      // Update morphing based on scroll
      const scrollY = window.scrollY || 0;
      const maxScroll = document.body.scrollHeight - window.innerHeight || 1;
      const scrollProgress = scrollY / maxScroll;
      
      // Smoothly interpolate scroll progress for uniform
      materialRef.current.uniforms.uScroll.value = MathUtils.lerp(
        materialRef.current.uniforms.uScroll.value,
        scrollProgress,
        0.1
      );
      
      // Morph shape dynamically by varying density and strength based on scroll
      materialRef.current.uniforms.uNoiseDensity.value = 1.5 + scrollProgress * 1.5; // becomes denser
      materialRef.current.uniforms.uNoiseStrength.value = 0.3 + Math.sin(scrollProgress * Math.PI) * 0.2; // breathes
    }
    if (meshRef.current) {
      // Gentle floating rotation
      meshRef.current.rotation.x = MathUtils.lerp(meshRef.current.rotation.x, mouse.y * 0.3, 0.05);
      meshRef.current.rotation.y = MathUtils.lerp(meshRef.current.rotation.y, mouse.x * 0.3, 0.05);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[2, isMobile ? 32 : 64]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent={true}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

export default function LiquidBlobScene() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") return window.innerWidth < 768;
    return false;
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, isMobile ? 1 : 2]}>
        <ambientLight intensity={0.5} />
        <Blob />
        <Sparkles count={isMobile ? 30 : 80} scale={8} size={2} speed={0.4} opacity={0.5} color="#00f0ff" />
        <Sparkles count={isMobile ? 15 : 50} scale={6} size={3} speed={0.2} opacity={0.3} color="#8a2be2" />
      </Canvas>
    </div>
  );
}
