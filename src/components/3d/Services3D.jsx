import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  Cloud,
  Code,
  Brain,
  Smartphone,
  Database,
  Shield,
} from 'lucide-react';
import './Services3D.css';

/**
 * Creates a high-DPI canvas texture with glowing service icon & text for cube faces
 */
function createServiceIconTexture(iconType, bgColor = '#00F0FF', label = '') {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Background subtle dark neon glass
  ctx.fillStyle = 'rgba(7, 18, 42, 0.9)';
  ctx.fillRect(0, 0, 256, 256);

  // Border glow
  ctx.strokeStyle = bgColor;
  ctx.lineWidth = 10;
  ctx.strokeRect(10, 10, 236, 236);

  // Center glowing radial highlight
  const gradient = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
  gradient.addColorStop(0, bgColor);
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = gradient;
  ctx.globalAlpha = 0.25;
  ctx.fillRect(0, 0, 256, 256);
  ctx.globalAlpha = 1.0;

  // Draw Icon Graphics
  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 12;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.shadowColor = bgColor;
  ctx.shadowBlur = 20;

  if (iconType === 'cloud') {
    // Cloud Shape
    ctx.beginPath();
    ctx.arc(100, 140, 35, Math.PI * 0.5, Math.PI * 1.5);
    ctx.arc(140, 100, 45, Math.PI * 1, Math.PI * 2);
    ctx.arc(175, 140, 30, Math.PI * 1.5, Math.PI * 0.5);
    ctx.closePath();
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
  } else if (iconType === 'code') {
    // </> Code Shape
    ctx.font = 'bold 90px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('</>', 128, 128);
  } else if (iconType === 'ai') {
    // AI Text in futuristic badge
    ctx.font = '900 100px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('AI', 128, 128);
  } else if (iconType === 'globe') {
    // Globe Shape
    ctx.beginPath();
    ctx.arc(128, 128, 60, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(128, 128, 30, 60, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(68, 128);
    ctx.lineTo(188, 128);
    ctx.stroke();
  } else if (iconType === 'db') {
    // Database Cylinder
    ctx.beginPath();
    ctx.ellipse(128, 85, 50, 18, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(78, 85);
    ctx.lineTo(78, 170);
    ctx.ellipse(128, 170, 50, 18, 0, 0, Math.PI);
    ctx.lineTo(178, 85);
    ctx.stroke();
  } else if (iconType === 'shield') {
    // Shield Lock
    ctx.beginPath();
    ctx.moveTo(128, 65);
    ctx.lineTo(175, 85);
    ctx.lineTo(175, 135);
    ctx.quadraticCurveTo(175, 185, 128, 205);
    ctx.quadraticCurveTo(81, 185, 81, 135);
    ctx.lineTo(81, 85);
    ctx.closePath();
    ctx.stroke();
  }

  if (label) {
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = bgColor;
    ctx.fillText(label, 128, 220);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Interactive 3D Service Hub with Three.js Rotational Cyber Cube
 * surrounded by Floating Service Cards & Bottom Glowing Stage
 */
const Services3D = ({ onSelectCategory }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 450;
    let height = container.clientHeight || 450;

    // ───── SCENE, CAMERA & RENDERER ─────
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0, 11.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // ───── ROOT GROUP ─────
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // ───── LIGHTING ─────
    const ambientLight = new THREE.AmbientLight(0x061129, 3);
    scene.add(ambientLight);

    const cyanPointLight = new THREE.PointLight(0x00f0ff, 15, 30);
    cyanPointLight.position.set(-6, 4, 6);
    scene.add(cyanPointLight);

    const magentaPointLight = new THREE.PointLight(0xff00cc, 16, 30);
    magentaPointLight.position.set(6, -4, 5);
    scene.add(magentaPointLight);

    const blueLight = new THREE.PointLight(0x3b82f6, 10, 25);
    blueLight.position.set(0, 6, -5);
    scene.add(blueLight);

    // ───── ICON TEXTURES FOR CUBE FACES ─────
    const textures = {
      cloud: createServiceIconTexture('cloud', '#00F0FF'),
      code: createServiceIconTexture('code', '#00E5FF'),
      ai: createServiceIconTexture('ai', '#FF00C8'),
      globe: createServiceIconTexture('globe', '#00F0FF'),
      db: createServiceIconTexture('db', '#00D4FF'),
      shield: createServiceIconTexture('shield', '#FF00B7'),
    };

    // ───── 3x3x3 CYBER CUBE MATRIX ─────
    const cubeGroup = new THREE.Group();
    rootGroup.add(cubeGroup);

    const subCubeSize = 0.84;
    const spacing = 0.96;
    const boxGeometry = new THREE.BoxGeometry(subCubeSize, subCubeSize, subCubeSize);
    const edgeGeometry = new THREE.EdgesGeometry(boxGeometry);

    const subCubes = [];

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const factor = (x + y + z + 3) / 6; // range [0, 1]

          // Gradient Color
          const color = new THREE.Color();
          if (factor < 0.5) {
            color.lerpColors(new THREE.Color(0x00f0ff), new THREE.Color(0x2563eb), factor * 2);
          } else {
            color.lerpColors(new THREE.Color(0x2563eb), new THREE.Color(0xff00bb), (factor - 0.5) * 2);
          }

          // Base Material
          const baseMaterial = new THREE.MeshPhysicalMaterial({
            color: color,
            emissive: color,
            emissiveIntensity: 0.45,
            roughness: 0.12,
            metalness: 0.5,
            transparent: true,
            opacity: 0.75,
            transmission: 0.4,
            reflectivity: 0.9,
          });

          // If on outer face, assign service icon texture to that face
          let materials = baseMaterial;

          const isFrontCenter = x === 0 && y === 0 && z === 1;
          const isFrontLeft = x === -1 && y === 0 && z === 1;
          const isFrontRight = x === 1 && y === 0 && z === 1;
          const isTopCenter = x === 0 && y === 1 && z === 0;
          const isLeftCenter = x === -1 && y === 0 && z === 0;
          const isRightCenter = x === 1 && y === 0 && z === 0;

          if (isFrontCenter || isFrontLeft || isFrontRight || isTopCenter || isLeftCenter || isRightCenter) {
            // Multi-material cube [right, left, top, bottom, front, back]
            const createMatWithTex = (tex) =>
              new THREE.MeshStandardMaterial({
                map: tex,
                emissive: color,
                emissiveIntensity: 0.35,
                roughness: 0.15,
                metalness: 0.6,
                transparent: true,
                opacity: 0.92,
              });

            materials = [
              isRightCenter ? createMatWithTex(textures.ai) : baseMaterial,
              isLeftCenter ? createMatWithTex(textures.cloud) : baseMaterial,
              isTopCenter ? createMatWithTex(textures.globe) : baseMaterial,
              baseMaterial,
              isFrontCenter ? createMatWithTex(textures.code) : isFrontLeft ? createMatWithTex(textures.cloud) : createMatWithTex(textures.ai),
              baseMaterial,
            ];
          }

          const mesh = new THREE.Mesh(boxGeometry, materials);
          mesh.position.set(x * spacing, y * spacing, z * spacing);

          // Glowing Neon Edges
          const edgeMaterial = new THREE.LineBasicMaterial({
            color: color.clone().offsetHSL(0, 0, 0.25),
            linewidth: 2,
            transparent: true,
            opacity: 0.95,
          });
          const wireframe = new THREE.LineSegments(edgeGeometry, edgeMaterial);
          mesh.add(wireframe);

          cubeGroup.add(mesh);
          subCubes.push({
            mesh,
            basePos: new THREE.Vector3(x * spacing, y * spacing, z * spacing),
          });
        }
      }
    }

    // ───── GLOWING DUAL ORBITAL RINGS ─────
    const ringGroup = new THREE.Group();
    ringGroup.rotation.x = Math.PI / 3.4;
    ringGroup.rotation.y = -Math.PI / 6;
    rootGroup.add(ringGroup);

    // Cyan Inner Ring (Blue) - Tilted 3D plane so rotation is 100% visible to the eye
    const ring1Geo = new THREE.TorusGeometry(3.2, 0.058, 16, 120);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 2.5,
      roughness: 0.1,
      metalness: 0.8,
      transparent: true,
      opacity: 0.98,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = -Math.PI / 4.2;
    ring1.rotation.y = Math.PI / 5;
    ringGroup.add(ring1);

    // Magenta Outer Ring (Pink) - Tilted 3D plane
    const ring2Geo = new THREE.TorusGeometry(3.9, 0.052, 16, 120);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xff00d4,
      emissive: 0xff00d4,
      emissiveIntensity: 2.5,
      roughness: 0.1,
      metalness: 0.8,
      transparent: true,
      opacity: 0.98,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3.5;
    ring2.rotation.y = -Math.PI / 6;
    ringGroup.add(ring2);

    // ───── DETACHED SATELLITE MINI-CUBES ─────
    const satelliteGroup = new THREE.Group();
    rootGroup.add(satelliteGroup);

    const satelliteCubes = [];
    const numSatellites = 16;

    for (let i = 0; i < numSatellites; i++) {
      const size = 0.22 + Math.random() * 0.24;
      const satGeo = new THREE.BoxGeometry(size, size, size);
      const isCyan = i % 2 === 0;
      const satColor = isCyan ? new THREE.Color(0x00f0ff) : new THREE.Color(0xff00b7);

      const satMat = new THREE.MeshStandardMaterial({
        color: satColor,
        emissive: satColor,
        emissiveIntensity: 0.85,
        roughness: 0.2,
        metalness: 0.8,
        transparent: true,
        opacity: 0.85,
      });

      const satMesh = new THREE.Mesh(satGeo, satMat);
      const edge = new THREE.LineSegments(
        new THREE.EdgesGeometry(satGeo),
        new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.95 })
      );
      satMesh.add(edge);

      const radius = 2.5 + Math.random() * 1.9;
      const angle = (i / numSatellites) * Math.PI * 2;
      const yOffset = (Math.random() - 0.5) * 3.4;

      satMesh.position.set(Math.cos(angle) * radius, yOffset, Math.sin(angle) * radius);
      satelliteGroup.add(satMesh);

      satelliteCubes.push({
        mesh: satMesh,
        radius,
        speed: 0.5 + Math.random() * 0.6,
        angle,
        yOffset,
        rotSpeedX: (Math.random() - 0.5) * 0.04,
        rotSpeedY: (Math.random() - 0.5) * 0.04,
      });
    }

    // ───── STARFIELD / PARTICLES ─────
    const particlesCount = 180;
    const particlePositions = new Float32Array(particlesCount * 3);
    const particleColors = new Float32Array(particlesCount * 3);

    const c1 = new THREE.Color(0x00f0ff);
    const c2 = new THREE.Color(0xff00c8);

    for (let i = 0; i < particlesCount; i++) {
      const r = 2.6 + Math.random() * 3.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);

      const mixed = Math.random() > 0.5 ? c1 : c2;
      particleColors[i * 3] = mixed.r;
      particleColors[i * 3 + 1] = mixed.g;
      particleColors[i * 3 + 2] = mixed.b;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    rootGroup.add(particleSystem);

    // Initial Isometric Orientation
    rootGroup.rotation.x = 0.45;
    rootGroup.rotation.y = -0.65;

    // ───── CLICK-AND-DRAG INTERACTION ─────
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationX = 0.45;
    let targetRotationY = -0.65;

    const onPointerDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      targetRotationY += deltaX * 0.008;
      targetRotationX -= deltaY * 0.008;
      // Clamp vertical rotation
      targetRotationX = Math.max(-1.2, Math.min(1.2, targetRotationX));
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // ───── ANIMATION LOOP ─────
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse parallax lerp
      rootGroup.rotation.x += (targetRotationX - rootGroup.rotation.x) * 0.04;
      rootGroup.rotation.y += (targetRotationY - rootGroup.rotation.y) * 0.04;

      // Continuous 3D auto-rotation
      cubeGroup.rotation.y += 0.004;
      cubeGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.08;

      // Breathing sub-cube pulse
      const pulse = 1 + Math.sin(elapsedTime * 1.8) * 0.03;
      subCubes.forEach(({ mesh, basePos }) => {
        mesh.position.set(basePos.x * pulse, basePos.y * pulse, basePos.z * pulse);
      });

      // Rings spin (Both blue & pink rings tumble & spin dynamically across X, Y, Z axes at higher speed)
      ring1.rotation.z += 0.038;
      ring1.rotation.x += 0.018;
      ring1.rotation.y += 0.015;

      ring2.rotation.z -= 0.032;
      ring2.rotation.x -= 0.016;
      ring2.rotation.y -= 0.012;

      ringGroup.rotation.z += 0.022;
      ringGroup.rotation.y = -Math.PI / 6 + Math.sin(elapsedTime * 1.4) * 0.25;

      // Satellite orbit
      satelliteCubes.forEach((sat) => {
        sat.angle += 0.008 * sat.speed;
        sat.mesh.position.x = Math.cos(sat.angle) * sat.radius;
        sat.mesh.position.z = Math.sin(sat.angle) * sat.radius;
        sat.mesh.position.y = sat.yOffset + Math.sin(elapsedTime * 2 + sat.radius) * 0.25;
        sat.mesh.rotation.x += sat.rotSpeedX;
        sat.mesh.rotation.y += sat.rotSpeedY;
      });

      // Sparks spin
      particleSystem.rotation.y += 0.002;

      renderer.render(scene, camera);
    };

    animate();

    // ───── RESIZE ─────
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // ───── CLEANUP ─────
    return () => {
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      boxGeometry.dispose();
      edgeGeometry.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      Object.values(textures).forEach((t) => t.dispose());
      renderer.dispose();
    };
  }, []);

  const serviceBadges = [
    { id: 'cloud', title: 'Cloud Solutions', subtitle: 'Scalable & Secure', icon: Cloud, category: 'Cloud',
      pos: 'top-[8%] left-[2%] sm:left-[5%]' },
    { id: 'web', title: 'Web Development', subtitle: 'Modern & Fast', icon: Code, category: 'Development',
      pos: 'top-[42%] -left-[2%] sm:left-[0%]' },
    { id: 'it', title: 'IT Infrastructure', subtitle: 'Reliable & Scalable', icon: Database, category: 'Data',
      pos: 'bottom-[12%] left-[4%] sm:left-[8%]' },
    { id: 'ai', title: 'AI & Automation', subtitle: 'Smarter Solutions', icon: Brain, category: 'AI',
      pos: 'top-[8%] right-[2%] sm:right-[5%]' },
    { id: 'app', title: 'App Development', subtitle: 'iOS & Android', icon: Smartphone, category: 'Development',
      pos: 'top-[42%] -right-[2%] sm:right-[0%]' },
    { id: 'security', title: 'Cyber Security', subtitle: 'Protect What Matters', icon: Shield, category: 'Security',
      pos: 'bottom-[12%] right-[4%] sm:right-[8%]' },
  ];

  return (
    <div className="relative w-full flex flex-col items-center select-none">
      
      {/* ───── 3D STAGE CONTAINER ───── */}
      <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[520px] flex items-center justify-center">
        
        {/* Background Ambient Glows */}
        <div className="pointer-events-none absolute h-60 w-60 rounded-full bg-cyan-500/20 blur-[100px]" />
        <div className="pointer-events-none absolute h-56 w-56 translate-x-16 translate-y-8 rounded-full bg-purple-600/25 blur-[110px]" />

        {/* ───── CENTER 3D THREE.JS WEBGL CANVAS ───── */}
        <div ref={mountRef} className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing" />

        {/* ───── FLOATING ORBITAL SERVICE BADGES ───── */}
        {serviceBadges.map((badge) => {
          const Icon = badge.icon;
          const isRight = badge.pos.includes('right');
          return (
            <button
              key={badge.id}
              type="button"
              onClick={() => onSelectCategory && onSelectCategory(badge.category)}
              className={`hidden sm:flex group absolute z-20 items-center gap-2 rounded-xl border bg-slate-900/90 px-2.5 py-1.5 backdrop-blur-xl transition-all duration-300 cursor-pointer text-left hover:scale-110 ${badge.pos} ${
                isRight
                  ? 'border-pink-500/40 shadow-[0_0_14px_rgba(236,72,153,0.2)] hover:border-pink-400 hover:shadow-[0_0_22px_rgba(236,72,153,0.5)]'
                  : 'border-cyan-400/40 shadow-[0_0_14px_rgba(6,182,212,0.2)] hover:border-cyan-400 hover:shadow-[0_0_22px_rgba(6,182,212,0.5)]'
              }`}
            >
              <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border group-hover:scale-110 transition-transform ${
                isRight
                  ? 'bg-pink-500/20 text-pink-400 border-pink-500/50'
                  : 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50'
              }`}>
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0">
                <div className={`text-[11px] font-bold transition-colors ${
                  isRight ? 'text-white group-hover:text-pink-400' : 'text-white group-hover:text-cyan-400'
                }`}>
                  {badge.title}
                </div>
                <div className="text-[9px] text-slate-400 leading-tight">
                  {badge.subtitle}
                </div>
              </div>
            </button>
          );
        })}

      </div>

      {/* ───── BOTTOM GLOWING STAGE / PODIUM BASE ───── */}
      <div className="relative -mt-8 sm:-mt-10 z-20 flex flex-col items-center">
        <div className="relative flex items-center justify-center">
          {/* Glowing Neon Ellipse */}
          <div className="h-8 sm:h-10 w-64 sm:w-80 rounded-[100%] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 blur-md opacity-75 animate-pulse" />
          <div className="absolute h-6 sm:h-8 w-56 sm:w-72 rounded-[100%] border-2 border-cyan-400/70 shadow-[0_0_20px_#06B6D4]" />
          
          {/* Admire Softech Badge */}
          <div className="absolute -top-3 flex items-center gap-2.5 rounded-xl border border-slate-700/80 bg-gradient-to-b from-slate-800 to-slate-950 px-4 py-1.5 shadow-2xl backdrop-blur-xl">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-tr from-blue-600 to-cyan-400 shadow-[0_0_8px_#06B6D4]">
              <span className="text-[9px] font-black text-white">AS</span>
            </div>
            <div className="space-y-0">
              <div className="text-[11px] sm:text-xs font-extrabold tracking-wider text-white">
                Admire Softech
              </div>
              <div className="text-[7px] sm:text-[8px] font-bold uppercase tracking-[0.22em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">
                Innovate • Build • Transform
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Services3D;
