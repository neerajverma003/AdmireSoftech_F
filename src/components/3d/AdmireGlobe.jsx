  import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "./AdmireGlobe.css";

export default function AdmireGlobe() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 3.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const globe = new THREE.Group();
    // Perfectly upright globe axis (X=0) with India centered on start (Y=2.85)
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

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.rotateSpeed = 0.65;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.45;

    const resize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", resize);

    let frame;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      controls.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="admire-globe" aria-label="Interactive 3D Earth" />;
}
