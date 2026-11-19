'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useRef, useMemo, useState, useEffect } from 'react'
import * as THREE from 'three'
import { cn } from '@/lib/utils'

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

const NEURAL_NODE_VERTEX = `
  attribute float aSize;
  attribute float aPhase;
  varying float vAlpha;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uHover;

  void main() {
    float t = uTime * 0.3 + aPhase;
    vec3 pos = position;
    pos.x += sin(t * 1.1) * 0.05;
    pos.y += cos(t * 1.3) * 0.05;
    pos.z += sin(t * 0.9) * 0.05;
    vAlpha = sin(t * 1.5) * 0.5 + 0.5;
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * uPixelRatio * (400.0 / -mvPosition.z) * (1.0 + uHover * 0.5);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const NEURAL_NODE_FRAGMENT = `
  varying float vAlpha;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    float alpha = smoothstep(0.5, 0.0, dist) * vAlpha * 0.8;
    gl_FragColor = vec4(1.0, 0.7, 0.3, alpha);
  }
`

const GLOW_VERTEX = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const GLOW_FRAGMENT = `
  varying vec3 vNormal;
  uniform float uTime;
  uniform float uIntensity;
  void main() {
    float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.0);
    float pulse = sin(uTime * 0.8) * 0.5 + 0.5;
    vec3 color = mix(vec3(1.0, 0.45, 0.09), vec3(1.0, 0.7, 0.24), pulse);
    float alpha = fresnel * 0.12 * uIntensity;
    gl_FragColor = vec4(color, alpha);
  }
`

let particleSeed = 1
const nextRandom = () => {
  particleSeed = (particleSeed * 1664525 + 1013904223) % 4294967296
  return particleSeed / 4294967296
}

interface OrbitalRingsProps {
  intensity: number
  mousePosition: { x: number; y: number }
}

function OrbitalRings({ intensity, mousePosition }: OrbitalRingsProps) {
  const refs = useRef<THREE.Mesh[]>([])
  const time = useRef(0)

  useFrame((state, delta) => {
    time.current += delta
    refs.current.forEach((ring, i) => {
      if (ring) {
        const speed = 0.08 * (i % 2 === 0 ? 1 : -1)
        ring.rotation.x += speed * delta * 0.5
        ring.rotation.y += speed * delta
        ring.rotation.z += speed * delta * 0.3

        const parallaxX = mousePosition.x * 0.15 * (i + 1) * 0.3
        const parallaxY = mousePosition.y * 0.15 * (i + 1) * 0.3
        ring.position.x += (parallaxX - ring.position.x) * delta * 2
        ring.position.y += (-parallaxY - ring.position.y) * delta * 2

        const material = ring.material as THREE.ShaderMaterial
        material.uniforms.uTime.value = time.current
        material.uniforms.uOpacity.value = intensity * (0.25 + i * 0.08)
      }
    })
  })

  const ringGeometry = useMemo(
    () => new THREE.RingGeometry(1.8, 2.6, 64, 8, 0, Math.PI * 2),
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
  mousePosition: { x: number; y: number }
}

function ParticleField({ count = 500, mousePosition }: ParticleFieldProps) {
  const ref = useRef<THREE.Points>(null)
  const time = useRef(0)

  useFrame((state, delta) => {
    time.current += delta
    if (ref.current) {
      ref.current.rotation.y += 0.01 * delta

      const parallaxX = mousePosition.x * 0.3
      const parallaxY = mousePosition.y * 0.3
      ref.current.position.x += (parallaxX - ref.current.position.x) * delta * 1.5
      ref.current.position.y += (-parallaxY - ref.current.position.y) * delta * 1.5

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
      const radius = 1.8 + nextRandom() * 2.2
      const theta = nextRandom() * Math.PI * 2
      const phi = Math.acos(2 * nextRandom() - 1)

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      sizes[i] = 0.8 + nextRandom() * 2.5

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

interface NeuralNodesProps {
  count?: number
  mousePosition: { x: number; y: number }
}

function NeuralNodes({ count = 120, mousePosition }: NeuralNodesProps) {
  const ref = useRef<THREE.Points>(null)
  const time = useRef(0)

  useFrame((state, delta) => {
    time.current += delta
    if (ref.current) {
      const parallaxX = mousePosition.x * 0.4
      const parallaxY = mousePosition.y * 0.4
      ref.current.position.x += (parallaxX - ref.current.position.x) * delta * 2
      ref.current.position.y += (-parallaxY - ref.current.position.y) * delta * 2

      const material = ref.current.material as THREE.ShaderMaterial
      material.uniforms.uTime.value = time.current
      material.uniforms.uHover.value = time.current
    }
  })

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const phases = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const radius = 1.0 + nextRandom() * 2.0
      const theta = nextRandom() * Math.PI * 2
      const phi = Math.acos(2 * nextRandom() - 1)

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      sizes[i] = 1.5 + nextRandom() * 3.5
      phases[i] = nextRandom() * Math.PI * 2
    }

    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    g.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))

    return g
  }, [count])

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: NEURAL_NODE_VERTEX,
        fragmentShader: NEURAL_NODE_FRAGMENT,
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: typeof window !== 'undefined' ? window.devicePixelRatio : 1 },
          uHover: { value: 0 },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
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
      ref.current.scale.setScalar(1 + Math.sin(time.current * 0.5) * 0.08 * intensity)
    }
  })

  return (
    <mesh
      ref={ref}
      geometry={new THREE.SphereGeometry(3.5, 32, 32)}
      material={new THREE.ShaderMaterial({
        vertexShader: GLOW_VERTEX,
        fragmentShader: GLOW_FRAGMENT,
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

interface PortraitCanvasProps {
  className?: string
  fallback?: React.ReactNode
  prefersReducedMotion: boolean
}

export function PortraitCanvas({ className, fallback, prefersReducedMotion }: PortraitCanvasProps) {
  const [intensity, setIntensity] = useState(1)
  const [loaded, setLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePosition({ x, y })
      setIntensity(1 + Math.abs(x) * 0.4 + Math.abs(y) * 0.3)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [prefersReducedMotion])

  if (!loaded) {
    return (
      <div className={cn('w-full h-full', className)}>
        {fallback}
      </div>
    )
  }

  return (
    <Canvas
      className={cn('w-full h-full', className)}
      camera={{ position: [0, 0, 5.5], fov: 40 }}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
      onCreated={() => setLoaded(true)}
    >
      <color attach="background" args={['#090909']} />
      <fog attach="fog" args={['#090909', 2, 20]} />

      <AmbientGlow intensity={intensity} />
      <ParticleField count={prefersReducedMotion ? 150 : 500} mousePosition={mousePosition} />
      <NeuralNodes count={prefersReducedMotion ? 40 : 120} mousePosition={mousePosition} />
      <OrbitalRings intensity={intensity} mousePosition={mousePosition} />
    </Canvas>
  )
}

interface PortraitBackgroundProps {
  className?: string
}

export function PortraitBackground({ className }: PortraitBackgroundProps) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <div className={cn('relative h-full w-full', className)}>
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
          </div>
        }
      >
        <PortraitCanvas
          prefersReducedMotion={prefersReducedMotion}
          fallback={
            <div className="w-full h-full flex items-center justify-center bg-surface/50 rounded-3xl">
              <div className="text-center p-8">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-text-secondary">Loading...</p>
              </div>
            </div>
          }
        />
      </Suspense>
    </div>
  )
}