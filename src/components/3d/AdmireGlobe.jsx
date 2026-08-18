import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "./AdmireGlobe.css";

export default function AdmireGlobe() {
  const mountRef = useRef(null);
  const [hasWebGLError, setHasWebGLError] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer;
    let controls;
    let frame;
    let scene;
    let camera;

    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(38, (mount.clientWidth || 300) / (mount.clientHeight || 300), 0.1, 100);
      camera.position.set(0, 0, 3.2);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'default' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(mount.clientWidth || 300, mount.clientHeight || 300);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      mount.appendChild(renderer.domElement);

      const globe = new THREE.Group();
      globe.rotation.y = 2.85;
      globe.rotation.x = 0;
      scene.add(globe);

      const loader = new THREE.TextureLoader();
      loader.load(
        "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg",
        (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          const earth = new THREE.Mesh(
            new THREE.SphereGeometry(1, 96, 96),
            new THREE.MeshStandardMaterial({ map: texture, roughness: 0.75, metalness: 0.05 })
          );
          globe.add(earth);
        },
        undefined,
        (err) => {
          console.warn("Could not load earth texture, fallback mesh active", err);
          const earthFallback = new THREE.Mesh(
            new THREE.SphereGeometry(1, 48, 48),
            new THREE.MeshStandardMaterial({ color: 0x0f2b5c, roughness: 0.8, metalness: 0.2 })
          );
          globe.add(earthFallback);
        }
      );

      const glow = new THREE.Mesh(
        new THREE.SphereGeometry(1.055, 64, 64),
        new THREE.MeshBasicMaterial({
          color: 0x087cff, transparent: true, opacity: 0.12,
          side: THREE.BackSide, blending: THREE.AdditiveBlending
        })
      );
      globe.add(glow);

      const grid = new THREE.LineSegments(
        new THREE.WireframeGeometry(new THREE.SphereGeometry(1.012, 32, 20)),
        new THREE.LineBasicMaterial({ color: 0x1688ff, transparent: true, opacity: 0.11 })
      );
      globe.add(grid);

      scene.add(new THREE.AmbientLight(0x8bbcff, 1.1));
      const key = new THREE.DirectionalLight(0x72b9ff, 2.5);
      key.position.set(3, 2, 4);
      scene.add(key);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.enablePan = false;
      controls.enableZoom = false;
      controls.rotateSpeed = 0.65;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.45;

      const resize = () => {
        if (!mount || !renderer || !camera) return;
        const w = mount.clientWidth || 300, h = mount.clientHeight || 300;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", resize);

      const animate = () => {
        frame = requestAnimationFrame(animate);
        if (controls) controls.update();
        if (renderer && scene && camera) renderer.render(scene, camera);
      };
      animate();

      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("resize", resize);
        if (controls) controls.dispose();
        if (renderer) {
          renderer.dispose();
          renderer.forceContextLoss();
          if (renderer.domElement && mount.contains(renderer.domElement)) {
            mount.removeChild(renderer.domElement);
          }
        }
      };
    } catch (e) {
      console.warn("WebGL initialization error handled gracefully in AdmireGlobe:", e);
      setHasWebGLError(true);
    }
  }, []);

  if (hasWebGLError) {
    return (
      <div className="admire-globe flex items-center justify-center">
        <div className="w-48 h-48 rounded-full bg-blue-600/20 border border-cyan-500/30 animate-pulse flex items-center justify-center">
          <div className="w-36 h-36 rounded-full bg-cyan-500/10 blur-md" />
        </div>
      </div>
    );
  }

  return <div ref={mountRef} className="admire-globe" aria-label="Interactive 3D Earth" />;
}

