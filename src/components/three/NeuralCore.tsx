'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import {
  OrbitControls,
  ContactShadows,
} from '@react-three/drei'
import { Suspense, useRef, useMemo, useState, useEffect } from 'react'
import * as THREE from 'three'
import { cn } from '@/lib/utils'

const NEURAL_VERTEX = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uIntensity;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    vUv = uv;

    vec3 pos = position;
    float noise = sin(pos.x * 3.0 + uTime) * cos(pos.y * 3.0 + uTime * 0.7) * sin(pos.z * 3.0 + uTime * 0.5);
    pos += normal * noise * 0.02 * uIntensity;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const NEURAL_FRAGMENT = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColorPrimary;
  uniform vec3 uColorSecondary;
  uniform vec3 uColorHighlight;
  uniform float uIntensity;

  void main() {
    float fresnel = pow(1.0 - abs(dot(vNormal, normalize(vec3(0.0, 0.0, 1.0)))), 2.0);
    float pulse = sin(uTime * 1.5) * 0.5 + 0.5;

    vec3 color = mix(uColorPrimary, uColorSecondary, vUv.x);
    color = mix(color, uColorHighlight, fresnel * 0.8);
    color = mix(color, uColorHighlight, pulse * 0.3 * uIntensity);

    float alpha = 0.4 + fresnel * 0.6 + pulse * 0.2 * uIntensity;

    gl_FragColor = vec4(color, alpha * 0.7);
  }
`

const RING_VERTEX = `
  varying vec2 vUv;
  uniform float uTime;

  void main() {
    vUv = uv;
    vec3 pos = position;
    float wave = sin(vUv.y * 10.0 + uTime * 2.0) * 0.01;
    pos *= 1.0 + wave;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const RING_FRAGMENT = `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uOpacity;

  void main() {
    float ring = sin(vUv.y * 10.0 + uTime * 2.0) * 0.5 + 0.5;
    float alpha = uOpacity * ring * (1.0 - vUv.x) * 0.8;
    gl_FragColor = vec4(uColor, alpha);
  }
`

const PARTICLE_VERTEX = `
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aPhase;
  varying float vAlpha;
  varying vec3 vColor;
  uniform float uTime;
  uniform float uPixelRatio;

  void main() {
    vColor = aColor;
    float t = uTime * 0.5 + aPhase;
    vec3 pos = position;
    pos.x += sin(t * 1.3) * 0.1;
    pos.y += cos(t * 1.7) * 0.1;
    pos.z += sin(t * 1.1) * 0.1;
    vAlpha = sin(t * 2.0) * 0.5 + 0.5;
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * uPixelRatio * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const PARTICLE_FRAGMENT = `
  varying float vAlpha;
  varying vec3 vColor;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    float alpha = smoothstep(0.5, 0.0, dist) * vAlpha;
    gl_FragColor = vec4(vColor, alpha);
  }
`

interface NeuralCoreMeshProps {
  intensity: number
  rotationSpeed?: number
}

function NeuralCoreMesh({ intensity, rotationSpeed = 0.1 }: NeuralCoreMeshProps) {
  const ref = useRef<THREE.Mesh>(null)
  const time = useRef(0)

  useFrame((state, delta) => {
    time.current += delta
    if (ref.current) {
      ref.current.rotation.y += rotationSpeed * delta
      ref.current.rotation.x = Math.sin(time.current * 0.3) * 0.1
      const uniforms = (ref.current.material as THREE.ShaderMaterial).uniforms
      uniforms.uTime.value = time.current
      uniforms.uIntensity.value = intensity
    }
  })

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.2, 8), [])
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: NEURAL_VERTEX,
        fragmentShader: NEURAL_FRAGMENT,
        uniforms: {
          uTime: { value: 0 },
          uIntensity: { value: intensity },
          uColorPrimary: { value: new THREE.Color('#F97316') },
          uColorSecondary: { value: new THREE.Color('#FB923C') },
          uColorHighlight: { value: new THREE.Color('#FDBA74') },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      }),
    [intensity]
  )

  return <mesh ref={ref} geometry={geometry} material={material} />
}

interface OrbitalRingsProps {
  intensity: number
}

function OrbitalRings({ intensity }: OrbitalRingsProps) {
  const refs = useRef<THREE.Mesh[]>([])
  const time = useRef(0)

  useFrame((state, delta) => {
    time.current += delta
    refs.current.forEach((ring, i) => {
      if (ring) {
        const speed = 0.15 * (i % 2 === 0 ? 1 : -1)
        ring.rotation.x += speed * delta * 0.5
        ring.rotation.y += speed * delta
        ring.rotation.z += speed * delta * 0.3
        const material = ring.material as THREE.ShaderMaterial
        material.uniforms.uTime.value = time.current
        material.uniforms.uOpacity.value = intensity * (0.3 + i * 0.1)
      }
    })
  })

  const ringGeometry = useMemo(
    () => new THREE.RingGeometry(1.5, 2.2, 64, 8, 0, Math.PI * 2),
    []
  )

  return (
    <group>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          ref={(el) => (refs.current[i] = el!)}
          geometry={ringGeometry}
          material={new THREE.ShaderMaterial({
            vertexShader: RING_VERTEX,
            fragmentShader: RING_FRAGMENT,
            uniforms: {
              uTime: { value: 0 },
              uColor: { value: new THREE.Color('#F97316') },
              uOpacity: { value: 0 },
            },
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide,
          })}
        />
      ))}
    </group>
  )
}

interface ParticleFieldProps {
  count?: number
  intensity: number
}

// Deterministic pseudo-random generator (module-level to avoid ref issues during render)
let particleSeed = 1
const nextRandom = () => {
  particleSeed = (particleSeed * 1664525 + 1013904223) % 4294967296
  return particleSeed / 4294967296
}

function ParticleField({ count = 800 }: ParticleFieldProps) {
  const ref = useRef<THREE.Points>(null)
  const time = useRef(0)

  useFrame((state, delta) => {
    time.current += delta
    if (ref.current) {
      ref.current.rotation.y += 0.02 * delta
      const material = ref.current.material as THREE.ShaderMaterial
      material.uniforms.uTime.value = time.current
    }
  })

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const colors = new Float32Array(count * 3)
    const phases = new Float32Array(count)

    const colorPrimary = new THREE.Color('#F97316')
    const colorSecondary = new THREE.Color('#FB923C')
    const colorHighlight = new THREE.Color('#FDBA74')

    for (let i = 0; i < count; i++) {
      const radius = 1.5 + nextRandom() * 2.5
      const theta = nextRandom() * Math.PI * 2
      const phi = Math.acos(2 * nextRandom() - 1)

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      sizes[i] = 1 + nextRandom() * 3

      const colorChoice = nextRandom()
      if (colorChoice < 0.4) {
        colors[i * 3] = colorPrimary.r
        colors[i * 3 + 1] = colorPrimary.g
        colors[i * 3 + 2] = colorPrimary.b
      } else if (colorChoice < 0.7) {
        colors[i * 3] = colorSecondary.r
        colors[i * 3 + 1] = colorSecondary.g
        colors[i * 3 + 2] = colorSecondary.b
      } else {
        colors[i * 3] = colorHighlight.r
        colors[i * 3 + 1] = colorHighlight.g
        colors[i * 3 + 2] = colorHighlight.b
      }

      phases[i] = nextRandom() * Math.PI * 2
    }

    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    g.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
    g.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))

    return g
  }, [count])

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: PARTICLE_VERTEX,
        fragmentShader: PARTICLE_FRAGMENT,
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: typeof window !== 'undefined' ? window.devicePixelRatio : 1 },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
      }),
    []
  )

  return <points ref={ref} geometry={geometry} material={material} />
}

interface AmbientGlowProps {
  intensity: number
}

function AmbientGlow({ intensity }: AmbientGlowProps) {
  const ref = useRef<THREE.Mesh>(null)
  const time = useRef(0)

  useFrame((state, delta) => {
    time.current += delta
    if (ref.current) {
      const material = ref.current.material as THREE.ShaderMaterial
      material.uniforms.uTime.value = time.current
      material.uniforms.uIntensity.value = intensity
      ref.current.scale.setScalar(1 + Math.sin(time.current * 0.5) * 0.1 * intensity)
    }
  })

  return (
    <mesh
      ref={ref}
      geometry={new THREE.SphereGeometry(3, 32, 32)}
      material={new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          uniform float uTime;
          uniform float uIntensity;
          void main() {
            float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.0);
            float pulse = sin(uTime * 0.8) * 0.5 + 0.5;
            vec3 color = mix(vec3(1.0, 0.45, 0.09), vec3(1.0, 0.7, 0.24), pulse);
            float alpha = fresnel * 0.15 * uIntensity;
            gl_FragColor = vec4(color, alpha);
          }
        `,
        uniforms: {
          uTime: { value: 0 },
          uIntensity: { value: intensity },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
      })}
    />
  )
}

interface NeuralCoreCanvasProps {
  className?: string
  fallback?: React.ReactNode
}

export function NeuralCoreCanvas({ className, fallback }: NeuralCoreCanvasProps) {
  const [intensity, setIntensity] = useState(1)
  const [loaded, setLoaded] = useState(false)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setIntensity(1 + Math.abs(x) * 0.5 + Math.abs(y) * 0.3)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [prefersReducedMotion])

  if (!loaded) {
    return (
      <div className={cn('w-full h-full', className)} style={{ minHeight: '600px' }}>
        {fallback}
      </div>
    )
  }

  return (
    <Canvas
      className={cn('w-full h-full', className)}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
      onCreated={() => setLoaded(true)}
    >
      <color attach="background" args={['#090909']} />
      <fog attach="fog" args={['#090909', 1, 15]} />

      <AmbientGlow intensity={intensity} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={!prefersReducedMotion}
        autoRotate={!prefersReducedMotion}
        autoRotateSpeed={0.3}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI * 2 / 3}
      />

      <ParticleField count={prefersReducedMotion ? 200 : 600} intensity={intensity} />
      <NeuralCoreMesh intensity={intensity} rotationSpeed={prefersReducedMotion ? 0 : 0.15} />
      <OrbitalRings intensity={intensity} />

      <ContactShadows
        opacity={0.15}
        scale={4}
        blur={2}
        color="#F97316"
      />
    </Canvas>
  )
}

interface NeuralCoreWrapperProps {
  className?: string
}

export function NeuralCoreWrapper({ className }: NeuralCoreWrapperProps) {
  return (
    <div className={cn('relative w-full aspect-[4/3] max-w-5xl mx-auto', className)}>
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
          </div>
        }
      >
        <NeuralCoreCanvas
          fallback={
            <div className="w-full h-full flex items-center justify-center bg-surface/50 rounded-3xl">
              <div className="text-center p-8">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-text-secondary">3D Neural Core</p>
                <p className="text-sm text-text-secondary mt-1">WebGL context initializing...</p>
              </div>
            </div>
          }
        />
      </Suspense>
    </div>
  )
}