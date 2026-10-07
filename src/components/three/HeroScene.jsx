import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../hooks/useTheme';

export default function HeroScene({ className = '', subtle = false }) {
  const mountRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = subtle ? 28 : 22;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Color definitions from Resumely palette
    const colors = {
      peach: new THREE.Color(0xffd3ac),
      pink: new THREE.Color(0xffb5ab),
      terracotta: new THREE.Color(0xe39a7b),
      gold: new THREE.Color(0xdbb06b),
    };

    // Ambient and Point Lights
    const ambientLight = new THREE.AmbientLight(
      isDark ? 0xffffff : 0xfff6ee,
      isDark ? 0.8 : 1.2
    );
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(colors.terracotta, 2.5, 40);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(colors.gold, 2.0, 40);
    pointLight2.position.set(-10, -8, 8);
    scene.add(pointLight2);

    // Group for objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Floating Documents / Card Planes (Representing modern resumes)
    const cardGroup = new THREE.Group();
    const cardGeo = new THREE.PlaneGeometry(3.5, 4.8);
    const cardCount = subtle ? 2 : 4;
    const cards = [];

    const cardMaterials = [
      new THREE.MeshStandardMaterial({
        color: isDark ? 0x221c18 : 0xffffff,
        roughness: 0.25,
        metalness: 0.1,
        transparent: true,
        opacity: isDark ? 0.45 : 0.65,
        side: THREE.DoubleSide,
      }),
      new THREE.MeshStandardMaterial({
        color: colors.peach,
        roughness: 0.3,
        metalness: 0.2,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide,
      }),
      new THREE.MeshStandardMaterial({
        color: colors.terracotta,
        roughness: 0.3,
        metalness: 0.3,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
      }),
    ];

    for (let i = 0; i < cardCount; i++) {
      const mat = cardMaterials[i % cardMaterials.length];
      const mesh = new THREE.Mesh(cardGeo, mat);
      const angle = (i / cardCount) * Math.PI * 2;
      const radius = 6.5 + (i % 2) * 2;

      mesh.position.set(
        Math.cos(angle) * radius + (Math.random() - 0.5) * 2,
        Math.sin(angle) * (radius * 0.6) + (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 6
      );
      mesh.rotation.set(
        (Math.random() - 0.5) * 0.8,
        (Math.random() - 0.5) * 0.8,
        (Math.random() - 0.5) * 0.5
      );

      mesh.userData = {
        baseY: mesh.position.y,
        baseX: mesh.position.x,
        speed: 0.4 + Math.random() * 0.4,
        rotSpeedX: (Math.random() - 0.5) * 0.005,
        rotSpeedY: (Math.random() - 0.5) * 0.005,
        phase: Math.random() * Math.PI * 2,
      };

      cardGroup.add(mesh);
      cards.push(mesh);
    }
    mainGroup.add(cardGroup);

    // 2. Floating AI Spheres / Rings (Gold & Terracotta accents)
    const geometricGroup = new THREE.Group();
    const torusGeo = new THREE.TorusGeometry(1.4, 0.12, 16, 64);
    const torusMat = new THREE.MeshStandardMaterial({
      color: colors.gold,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.7,
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.position.set(subtle ? 8 : 6, subtle ? -3 : 4, -2);
    geometricGroup.add(torusMesh);

    const sphereGeo = new THREE.IcosahedronGeometry(1.2, 2);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: colors.terracotta,
      roughness: 0.2,
      metalness: 0.5,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    sphereMesh.position.set(-7, -4, 1);
    geometricGroup.add(sphereMesh);

    mainGroup.add(geometricGroup);

    // 3. Glowing Particle Constellation
    const particleCount = subtle ? 80 : 160;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colorsArr = new Float32Array(particleCount * 3);

    const paletteList = [colors.peach, colors.pink, colors.terracotta, colors.gold];

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      positions[idx] = (Math.random() - 0.5) * 32;
      positions[idx + 1] = (Math.random() - 0.5) * 22;
      positions[idx + 2] = (Math.random() - 0.5) * 16;

      const c = paletteList[i % paletteList.length];
      colorsArr[idx] = c.r;
      colorsArr[idx + 1] = c.g;
      colorsArr[idx + 2] = c.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colorsArr, 3));

    // Particle Material with circular texture generated dynamically
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.4, 'rgba(255,255,255,0.7)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMat = new THREE.PointsMaterial({
      size: subtle ? 0.35 : 0.5,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: isDark ? 0.75 : 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      if (prefersReducedMotion) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX = (x / rect.width - 0.5) * 2;
      mouseY = -(y / rect.height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const motionScale = prefersReducedMotion ? 0.05 : 1.0;

      // Smooth camera lerping
      targetX += (mouseX * 1.5 - targetX) * 0.04 * motionScale;
      targetY += (mouseY * 1.2 - targetY) * 0.04 * motionScale;

      camera.position.x = targetX;
      camera.position.y = targetY;
      camera.lookAt(0, 0, 0);

      // Card hovering
      cards.forEach((card) => {
        card.position.y =
          card.userData.baseY + Math.sin(elapsedTime * card.userData.speed + card.userData.phase) * 0.4 * motionScale;
        card.rotation.x += card.userData.rotSpeedX * motionScale;
        card.rotation.y += card.userData.rotSpeedY * motionScale;
      });

      // Rotating accents
      torusMesh.rotation.x = elapsedTime * 0.25 * motionScale;
      torusMesh.rotation.y = elapsedTime * 0.35 * motionScale;
      sphereMesh.rotation.y = elapsedTime * 0.2 * motionScale;
      sphereMesh.rotation.z = elapsedTime * 0.15 * motionScale;

      // Particle rotation
      particles.rotation.y = elapsedTime * 0.04 * motionScale;
      particles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.05 * motionScale;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      particleGeo.dispose();
      particleMat.dispose();
      cardGeo.dispose();
      cardMaterials.forEach((m) => m.dispose());
      torusGeo.dispose();
      torusMat.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      renderer.dispose();
    };
  }, [isDark, subtle]);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
