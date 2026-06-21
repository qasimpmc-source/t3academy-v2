"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * A procedural owl built from ~7000 glowing dots.
 * Particles scatter-assemble on mount, breathe, track the cursor,
 * and the gold eyes "blink" by pulsing.
 */

type OwlPoint = { x: number; y: number; z: number; r: number; g: number; b: number; size: number; isEye: boolean };

const MINT = new THREE.Color("#047857");
const DEEP = new THREE.Color("#9cc4b2");
const GOLD = new THREE.Color("#c9941a");

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

// sample point on an ellipsoid shell (slightly fuzzy)
function ellipsoid(cx: number, cy: number, cz: number, rx: number, ry: number, rz: number): [number, number, number] {
  const u = Math.random() * Math.PI * 2;
  const v = Math.acos(2 * Math.random() - 1);
  const fuzz = rand(0.92, 1.05);
  return [
    cx + rx * fuzz * Math.sin(v) * Math.cos(u),
    cy + ry * fuzz * Math.cos(v),
    cz + rz * fuzz * Math.sin(v) * Math.sin(u),
  ];
}

function cone(cx: number, cy: number, cz: number, radius: number, height: number, tiltX: number): [number, number, number] {
  const t = Math.random(); // 0 base -> 1 tip
  const a = Math.random() * Math.PI * 2;
  const r = radius * (1 - t) * rand(0.85, 1);
  return [
    cx + Math.cos(a) * r + tiltX * t,
    cy + t * height,
    cz + Math.sin(a) * r,
  ];
}

function disc(cx: number, cy: number, cz: number, radius: number): [number, number, number] {
  const a = Math.random() * Math.PI * 2;
  const r = radius * Math.sqrt(Math.random());
  return [cx + Math.cos(a) * r, cy + Math.sin(a) * r, cz + rand(-0.03, 0.03)];
}

function buildOwl(): OwlPoint[] {
  const pts: OwlPoint[] = [];
  const push = (p: [number, number, number], color: THREE.Color, depth: number, size: number, isEye = false) => {
    // mix colour by depth so the front of the owl glows brighter
    const c = DEEP.clone().lerp(color, Math.min(1, depth + 0.25));
    pts.push({ x: p[0], y: p[1], z: p[2], r: c.r, g: c.g, b: c.b, size, isEye });
  };

  // body
  for (let i = 0; i < 2600; i++) {
    const p = ellipsoid(0, -0.55, 0, 1.12, 1.42, 0.95);
    push(p, MINT, THREE.MathUtils.clamp((p[2] + 1) / 2, 0.15, 1), rand(0.02, 0.045));
  }
  // belly speckle (gold flecks, front only)
  for (let i = 0; i < 260; i++) {
    const p = ellipsoid(0, -0.62, 0.04, 0.78, 1.0, 0.94);
    if (p[2] > 0.55) push(p, GOLD, 0.95, rand(0.02, 0.04));
  }
  // head
  for (let i = 0; i < 2100; i++) {
    const p = ellipsoid(0, 1.08, 0, 0.98, 0.88, 0.9);
    push(p, MINT, THREE.MathUtils.clamp((p[2] + 1) / 2, 0.15, 1), rand(0.02, 0.045));
  }
  // ear tufts
  for (let i = 0; i < 220; i++) push(cone(-0.62, 1.62, 0, 0.3, 0.65, -0.18), MINT, 0.8, rand(0.02, 0.04));
  for (let i = 0; i < 220; i++) push(cone(0.62, 1.62, 0, 0.3, 0.65, 0.18), MINT, 0.8, rand(0.02, 0.04));
  // eye discs (gold) + dark pupils omitted — glow rings
  for (let i = 0; i < 340; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = rand(0.2, 0.27);
    push([-0.38 + Math.cos(a) * r, 1.14 + Math.sin(a) * r, 0.82], GOLD, 1, rand(0.035, 0.06), true);
    push([0.38 + Math.cos(a) * r, 1.14 + Math.sin(a) * r, 0.82], GOLD, 1, rand(0.035, 0.06), true);
  }
  for (let i = 0; i < 90; i++) {
    push(disc(-0.38, 1.14, 0.86, 0.07), GOLD, 1, rand(0.045, 0.07), true);
    push(disc(0.38, 1.14, 0.86, 0.07), GOLD, 1, rand(0.045, 0.07), true);
  }
  // beak
  for (let i = 0; i < 140; i++) {
    const p = cone(0, 0.78, 0.86, 0.14, 0.28, 0);
    push([p[0], 1.06 - (p[1] - 0.78), p[2]], GOLD, 1, rand(0.025, 0.045));
  }
  // wings
  for (let i = 0; i < 560; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const p = ellipsoid(side * 1.02, -0.55, 0, 0.32, 1.05, 0.55);
    push(p, MINT, 0.45, rand(0.02, 0.04));
  }
  // feet
  for (let i = 0; i < 120; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    push(ellipsoid(side * 0.4, -2.0, 0.25, 0.22, 0.12, 0.3), GOLD, 0.85, rand(0.02, 0.04));
  }
  // ambient drifting dust around the owl
  for (let i = 0; i < 420; i++) {
    const p = ellipsoid(0, 0.2, 0, rand(1.8, 3.4), rand(1.8, 3.2), rand(1.4, 2.6));
    push(p, Math.random() > 0.8 ? GOLD : MINT, rand(0.1, 0.4), rand(0.012, 0.03));
  }
  return pts;
}

export default function OwlParticles({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.2, 7.2);

    // Lighten the load on phones: fewer particles + lower pixel ratio.
    const isMobile = window.innerWidth <= 600;
    const dpr = Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(dpr);
    mount.appendChild(renderer.domElement);

    let owl = buildOwl();
    if (isMobile) owl = owl.filter((_, i) => i % 2 === 0);
    const n = owl.length;

    const targets = new Float32Array(n * 3);
    const positions = new Float32Array(n * 3);
    const colors = new Float32Array(n * 3);
    const sizes = new Float32Array(n);
    const seeds = new Float32Array(n);
    const eyeFlags = new Float32Array(n);

    for (let i = 0; i < n; i++) {
      const p = owl[i];
      targets[i * 3] = p.x;
      targets[i * 3 + 1] = p.y;
      targets[i * 3 + 2] = p.z;
      // scatter start: a wide random shell
      const sc = ellipsoid(0, 0, 0, 7, 7, 7);
      positions[i * 3] = sc[0];
      positions[i * 3 + 1] = sc[1];
      positions[i * 3 + 2] = sc[2];
      colors[i * 3] = p.r;
      colors[i * 3 + 1] = p.g;
      colors[i * 3 + 2] = p.b;
      sizes[i] = p.size;
      seeds[i] = Math.random() * Math.PI * 2;
      eyeFlags[i] = p.isEye ? 1 : 0;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    geo.setAttribute("aEye", new THREE.BufferAttribute(eyeFlags, 1));

    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      uniforms: {
        uTime: { value: 0 },
        uBlink: { value: 1 },
        uPixelRatio: { value: dpr },
      },
      vertexShader: /* glsl */ `
        attribute float aSize;
        attribute float aSeed;
        attribute float aEye;
        uniform float uTime;
        uniform float uBlink;
        uniform float uPixelRatio;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vColor = color;
          vec3 p = position;
          // gentle per-particle shimmer
          p += 0.018 * vec3(
            sin(uTime * 1.4 + aSeed * 3.0),
            cos(uTime * 1.1 + aSeed * 2.0),
            sin(uTime * 1.7 + aSeed)
          );
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          float twinkle = 0.75 + 0.25 * sin(uTime * 2.0 + aSeed * 7.0);
          float eyeScale = mix(1.0, uBlink, aEye);
          gl_PointSize = aSize * 480.0 * uPixelRatio * twinkle * eyeScale / -mv.z;
          vAlpha = (0.45 + 0.55 * twinkle) * mix(1.0, uBlink, aEye);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;
          float glow = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(vColor, glow * vAlpha);
        }
      `,
      vertexColors: true,
    });

    const points = new THREE.Points(geo, mat);
    const group = new THREE.Group();
    group.add(points);
    group.scale.setScalar(1.18);
    scene.add(group);

    // assemble animation state
    let assemble = prefersReduced ? 1 : 0;
    const mouse = { x: 0, y: 0 };
    let nextBlink = 2.5;
    let blinkT = -1;

    const onMouse = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const clock = new THREE.Clock();
    const pos = geo.getAttribute("position") as THREE.BufferAttribute;
    let raf = 0;

    const tick = () => {
      const t = clock.getElapsedTime();
      const dt = Math.min(clock.getDelta() + 0.016, 0.05);
      mat.uniforms.uTime.value = t;

      // scatter -> assemble ease
      if (assemble < 1) {
        assemble = Math.min(1, assemble + dt * 0.45);
        const e = 1 - Math.pow(1 - assemble, 3); // easeOutCubic
        for (let i = 0; i < n; i++) {
          const i3 = i * 3;
          pos.array[i3] += (targets[i3] - pos.array[i3]) * e * 0.12;
          pos.array[i3 + 1] += (targets[i3 + 1] - pos.array[i3 + 1]) * e * 0.12;
          pos.array[i3 + 2] += (targets[i3 + 2] - pos.array[i3 + 2]) * e * 0.12;
        }
        pos.needsUpdate = true;
      }

      // blink scheduling
      if (!prefersReduced) {
        if (blinkT < 0 && t > nextBlink) blinkT = 0;
        if (blinkT >= 0) {
          blinkT += dt * 6;
          mat.uniforms.uBlink.value = Math.abs(Math.cos(Math.min(blinkT, Math.PI) ));
          if (blinkT >= Math.PI) {
            blinkT = -1;
            mat.uniforms.uBlink.value = 1;
            nextBlink = t + 2.5 + Math.random() * 3.5;
          }
        }
      }

      // idle float + cursor tracking
      group.position.y = Math.sin(t * 0.8) * 0.08;
      const targetRY = mouse.x * 0.45;
      const targetRX = mouse.y * 0.22;
      group.rotation.y += (targetRY - group.rotation.y) * 0.04;
      group.rotation.x += (targetRX - group.rotation.x) * 0.04;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouse);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className={className} style={{ width: "100%", height: "100%" }} aria-hidden />;
}
