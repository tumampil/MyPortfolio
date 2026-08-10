"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// ─── Laptop Screen Code Lines ─────────────────────────────────────────────────

const CODE_LINES = [
  { t: "# Prometheon — Enterprise VoIP @ Kaizo", c: "#2a6a2a" },
  { t: "from fastapi import FastAPI, Depends", c: "#7dd3fc" },
  { t: "from asterisk.ami import AMIClient", c: "#7dd3fc" },
  { t: "from celery import Celery", c: "#7dd3fc" },
  { t: "", c: "" },
  { t: 'app = FastAPI(title="Prometheon")', c: "#e0ffe0" },
  { t: 'celery = Celery("tasks", broker=REDIS_URL)', c: "#e0ffe0" },
  { t: "", c: "" },
  { t: '@app.post("/calls/outbound")', c: "#00cc33" },
  { t: "async def initiate_call(", c: "#e0ffe0" },
  { t: "    payload: CallPayload,", c: "#fde68a" },
  { t: "    db: Session = Depends(get_db)", c: "#fde68a" },
  { t: ") -> CallResponse:", c: "#e0ffe0" },
  { t: "    ami = AMIClient(host=AMI_HOST)", c: "#e0ffe0" },
  { t: "    await ami.login(user, secret)", c: "#e0ffe0" },
  { t: "    result = await ami.originate(", c: "#e0ffe0" },
  { t: "        channel=payload.channel,", c: "#fde68a" },
  { t: '        context="from-internal",', c: "#fde68a" },
  { t: "        callerid=payload.caller_id", c: "#fde68a" },
  { t: "    )", c: "#e0ffe0" },
  { t: "    return CallResponse(**result)", c: "#00ff41" },
  { t: "", c: "" },
  { t: "# JsSIP WebRTC Softphone", c: "#2a6a2a" },
  { t: "const ua = new JsSIP.UA({", c: "#e0ffe0" },
  { t: "  uri: 'sip:ext@kaizo.tech',", c: "#fde68a" },
  { t: "  ws_servers: ['wss://pbx.io'],", c: "#fde68a" },
  { t: "  register: true,", c: "#c4b5fd" },
  { t: "})", c: "#e0ffe0" },
  { t: "ua.start()", c: "#00ff41" },
  { t: "", c: "" },
  { t: "// Blog Forum — Flutter & Supabase", c: "#2a6a2a" },
  { t: "class PostProvider extends ChangeNotifier {", c: "#7dd3fc" },
  { t: "  Future<void> fetchPosts() async {", c: "#e0ffe0" },
  { t: "    final res = await supabase", c: "#e0ffe0" },
  { t: "      .from('posts')", c: "#fde68a" },
  { t: "      .select('*, profile(full_name)');", c: "#fde68a" },
  { t: "    notifyListeners();", c: "#00ff41" },
  { t: "  }", c: "#e0ffe0" },
  { t: "}", c: "#e0ffe0" },
];

function drawScreen(ctx: CanvasRenderingContext2D, scroll: number) {
  const W = 900, H = 560, LH = 20;
  ctx.fillStyle = "#0d1117";
  ctx.fillRect(0, 0, W, H);

  // Top bar
  ctx.fillStyle = "#161b22";
  ctx.fillRect(0, 0, W, 26);
  ctx.fillStyle = "#3fb950";
  ctx.font = "bold 12px 'Courier New',monospace";
  ctx.fillText("  INSERT  ", 4, 17);
  ctx.fillStyle = "#30363d";
  ctx.fillRect(88, 0, 1, 26);
  ctx.fillStyle = "#8b949e";
  ctx.font = "12px 'Courier New',monospace";
  ctx.fillText("  prometheon/api/calls.py", 94, 17);
  ctx.fillStyle = "#6e7681";
  ctx.fillText("  git:main ● Python 3.11", 530, 17);

  // Gutter
  ctx.fillStyle = "#0d1117";
  ctx.fillRect(0, 26, 48, H - 48);
  ctx.fillStyle = "#21262d";
  ctx.fillRect(48, 26, 1, H - 48);

  const total = CODE_LINES.length * LH;
  const off = ((scroll % total) + total) % total;

  for (let rep = -1; rep <= 2; rep++) {
    CODE_LINES.forEach((line, i) => {
      const y = 26 + 15 + i * LH - off + rep * total;
      if (y < 26 || y > H - 24) return;
      ctx.fillStyle = "#484f58";
      ctx.font = "10px 'Courier New',monospace";
      ctx.fillText(String(i + 1).padStart(4), 4, y);
      if (!line.t) return;
      ctx.fillStyle = line.c;
      ctx.font = "13px 'Courier New',monospace";
      ctx.fillText(line.t, 56, y);
    });
  }

  // Cursor blink
  const cur = Math.floor(scroll / LH) % CODE_LINES.length;
  const cy = 26 + 15 + cur * LH - off;
  if (cy >= 26 && cy <= H - 24 && Math.floor(Date.now() / 500) % 2 === 0) {
    const tw = ctx.measureText(CODE_LINES[cur]?.t || "").width;
    ctx.fillStyle = "#00ff41";
    ctx.fillRect(56 + tw + 2, cy - 13, 8, 16);
  }

  // Bottom bar
  ctx.fillStyle = "#161b22";
  ctx.fillRect(0, H - 24, W, 24);
  ctx.fillStyle = "#3fb950";
  ctx.font = "11px 'Courier New',monospace";
  ctx.fillText("  dev@portfolio  ●  Python 3.11  ●  Ln 18 Col 35", 4, H - 7);

  // Green screen glow on edges
  const grd = ctx.createLinearGradient(0, 0, 0, H);
  grd.addColorStop(0, "rgba(0,255,65,0.06)");
  grd.addColorStop(0.5, "transparent");
  grd.addColorStop(1, "rgba(0,255,65,0.06)");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, W, H);
}

// ─── 3D Laptop Viewer ─────────────────────────────────────────────────────────

export function LaptopViewer() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth || 700;
    const H = mount.clientHeight || 520;

    // ── Renderer (alpha: true for transparent/PNG-like background) ─────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // fully transparent
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;
    mount.appendChild(renderer.domElement);

    // ── Scene & Camera ────────────────────────────────────────
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 100);
    const initZ = W < 480 ? 8.5 : W < 768 ? 7.8 : 7.0;
    camera.position.set(0, 1.8, initZ);
    camera.lookAt(0, 0.6, 0);

    // ── Lights ────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x334433, 4));

    const keyLight = new THREE.DirectionalLight(0xffffff, 5);
    keyLight.position.set(4, 6, 8);
    scene.add(keyLight);

    const rimGreen = new THREE.PointLight(0x00ff41, 8, 12);
    rimGreen.position.set(0, 2, 3);
    scene.add(rimGreen);

    const blueFill = new THREE.PointLight(0x0066ff, 3, 10);
    blueFill.position.set(-4, 2, 3);
    scene.add(blueFill);

    const underGlow = new THREE.PointLight(0x003311, 2, 6);
    underGlow.position.set(0, -2, 2);
    scene.add(underGlow);

    // ── Materials ────────────────────────────────────────────
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      roughness: 0.15,
      metalness: 0.95,
      envMapIntensity: 1,
    });
    const darkMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.8,
      metalness: 0.1,
    });
    const keyMat = new THREE.MeshStandardMaterial({
      color: 0x1c1c1c,
      roughness: 0.6,
      metalness: 0.3,
    });

    // ── Laptop Group ──────────────────────────────────────────
    const laptop = new THREE.Group();
    laptop.rotation.y = -0.25;

    // BASE BODY
    const base = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.13, 2.2), bodyMat);
    laptop.add(base);

    // base bottom
    const baseBot = new THREE.Mesh(
      new THREE.BoxGeometry(3.48, 0.01, 2.18),
      new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.5, metalness: 0.7 })
    );
    baseBot.position.y = -0.07;
    laptop.add(baseBot);

    // rubber feet
    const feetMat = new THREE.MeshStandardMaterial({ color: 0x080808, roughness: 0.95 });
    (
      [[-1.5, -0.071, -0.9], [1.5, -0.071, -0.9], [-1.5, -0.071, 0.9], [1.5, -0.071, 0.9]] as [number, number, number][]
    ).forEach(([x, y, z]) => {
      const f = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 0.012, 8), feetMat);
      f.position.set(x, y, z);
      laptop.add(f);
    });

    // KEYBOARD DECK
    const deck = new THREE.Mesh(new THREE.BoxGeometry(3.1, 0.007, 1.68), darkMat);
    deck.position.set(0, 0.07, 0.04);
    laptop.add(deck);

    // TRACKPAD
    const tp = new THREE.Mesh(
      new THREE.BoxGeometry(0.92, 0.005, 0.6),
      new THREE.MeshStandardMaterial({ color: 0x1e1e1e, roughness: 0.18, metalness: 0.9 })
    );
    tp.position.set(0, 0.07, 0.78);
    laptop.add(tp);

    // KEYS
    const kw = 0.18, kh = 0.012, kd = 0.16, kg = 0.03;
    const rows: [number, number][] = [[13, -0.64], [12, -0.43], [12, -0.22], [11, 0.0]];
    rows.forEach(([cols, rz]) => {
      const rowW = cols * (kw + kg) - kg;
      for (let c = 0; c < cols; c++) {
        const key = new THREE.Mesh(new THREE.BoxGeometry(kw, kh, kd), keyMat);
        key.position.set(-rowW / 2 + c * (kw + kg) + kw / 2, 0.075, rz);
        laptop.add(key);
      }
    });
    const space = new THREE.Mesh(new THREE.BoxGeometry(1.3, kh, kd), keyMat);
    space.position.set(0, 0.075, 0.2);
    laptop.add(space);

    // PORTS
    const portMat = new THREE.MeshStandardMaterial({ color: 0x080808, roughness: 0.9 });
    (
      [[-0.6, 0, -1.11], [-0.1, 0, -1.11], [0.45, 0, -1.11]] as [number, number, number][]
    ).forEach(([x, y, z]) => {
      const p = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.052, 0.03), portMat);
      p.position.set(x, y, z);
      laptop.add(p);
    });
    (
      [[-1.76, 0.01, -0.35], [-1.76, 0.01, 0.15]] as [number, number, number][]
    ).forEach(([x, y, z]) => {
      const p = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.032, 0.12), portMat);
      p.position.set(x, y, z);
      laptop.add(p);
    });

    // HINGE
    const hinge = new THREE.Mesh(
      new THREE.CylinderGeometry(0.065, 0.065, 3.3, 10),
      new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.35, metalness: 0.85 })
    );
    hinge.rotation.z = Math.PI / 2;
    hinge.position.set(0, 0.065, -1.1);
    laptop.add(hinge);

    // SCREEN GROUP (pivot at hinge)
    const sg = new THREE.Group();
    sg.position.set(0, 0.065, -1.1);
    sg.rotation.x = 0.04;

    // Screen lid
    const lid = new THREE.Mesh(new THREE.BoxGeometry(3.5, 2.25, 0.09), bodyMat);
    lid.position.set(0, 1.125, 0);
    sg.add(lid);

    // Bezel
    const bezel = new THREE.Mesh(new THREE.BoxGeometry(3.28, 2.05, 0.016), darkMat);
    bezel.position.set(0, 1.125, 0.052);
    sg.add(bezel);

    // Webcam
    const cam = new THREE.Mesh(
      new THREE.CylinderGeometry(0.022, 0.022, 0.01, 8),
      new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.3 })
    );
    cam.rotation.x = Math.PI / 2;
    cam.position.set(0, 2.17, 0.052);
    sg.add(cam);

    // Neon hex logo on lid back
    const hexShape = new THREE.Shape();
    const R = 0.19;
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i;
      if (i === 0) hexShape.moveTo(R * Math.cos(a), R * Math.sin(a));
      else hexShape.lineTo(R * Math.cos(a), R * Math.sin(a));
    }
    hexShape.closePath();
    const hexMesh = new THREE.Mesh(
      new THREE.ShapeGeometry(hexShape),
      new THREE.MeshStandardMaterial({
        color: 0x00ff41, emissive: new THREE.Color(0x00ff41), emissiveIntensity: 2,
        side: THREE.DoubleSide,
      })
    );
    hexMesh.position.set(0, 1.125, -0.052);
    hexMesh.rotation.y = Math.PI;
    sg.add(hexMesh);

    // Inner hex fill
    const innerHex = new THREE.Mesh(
      new THREE.CircleGeometry(0.1, 6),
      new THREE.MeshStandardMaterial({
        color: 0x001500, emissive: new THREE.Color(0x002200), emissiveIntensity: 1,
        side: THREE.DoubleSide,
      })
    );
    innerHex.position.set(0, 1.125, -0.051);
    innerHex.rotation.y = Math.PI;
    sg.add(innerHex);

    // ── SCREEN DISPLAY ────────────────────────────────────────
    const sCanvas = document.createElement("canvas");
    sCanvas.width = 900;
    sCanvas.height = 560;
    const sCtx = sCanvas.getContext("2d")!;
    let scroll = 0;
    drawScreen(sCtx, scroll);
    const sTex = new THREE.CanvasTexture(sCanvas);
    sTex.colorSpace = THREE.SRGBColorSpace;

    const screenDisplay = new THREE.Mesh(
      new THREE.PlaneGeometry(3.1, 1.88),
      new THREE.MeshBasicMaterial({ map: sTex })
    );
    screenDisplay.position.set(0, 1.125, 0.07);
    sg.add(screenDisplay);

    // Screen edge neon glow strip
    const glowStrip = new THREE.Mesh(
      new THREE.PlaneGeometry(3.14, 1.92),
      new THREE.MeshBasicMaterial({ color: 0x00ff41, transparent: true, opacity: 0.06 })
    );
    glowStrip.position.set(0, 1.125, 0.069);
    sg.add(glowStrip);

    laptop.add(sg);
    scene.add(laptop);

    // ── FLOATING PARTICLES ────────────────────────────────────
    const pCount = 80;
    const pArr = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pArr[i * 3]     = (Math.random() - 0.5) * 14;
      pArr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pArr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pArr, 3));
    const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({
      color: 0x00ff41, size: 0.04, transparent: true, opacity: 0.4, sizeAttenuation: true,
    }));
    scene.add(particles);

    // Blue particles
    const bArr = new Float32Array(40 * 3);
    for (let i = 0; i < 40; i++) {
      bArr[i * 3]     = (Math.random() - 0.5) * 12;
      bArr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      bArr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 3;
    }
    const bGeo = new THREE.BufferGeometry();
    bGeo.setAttribute("position", new THREE.BufferAttribute(bArr, 3));
    const blueParticles = new THREE.Points(bGeo, new THREE.PointsMaterial({
      color: 0x00aaff, size: 0.03, transparent: true, opacity: 0.3,
    }));
    scene.add(blueParticles);

    // ── INTERACTION ───────────────────────────────────────────
    let dragging = false;
    let px = 0, py = 0;
    let tRotY = laptop.rotation.y;
    let tRotX = 0;

    const onDown = (e: MouseEvent) => {
      dragging = true; px = e.clientX; py = e.clientY;
      mount.style.cursor = "grabbing";
    };
    const onMove = (e: MouseEvent) => {
      if (!dragging) return;
      tRotY += (e.clientX - px) * 0.007;
      tRotX += (e.clientY - py) * 0.004;
      tRotX = Math.max(-0.5, Math.min(0.5, tRotX));
      px = e.clientX; py = e.clientY;
    };
    const onUp = () => { dragging = false; mount.style.cursor = "grab"; };

    const onTDown = (e: TouchEvent) => { dragging = true; px = e.touches[0].clientX; py = e.touches[0].clientY; };
    const onTMove = (e: TouchEvent) => {
      if (!dragging) return;
      tRotY += (e.touches[0].clientX - px) * 0.007;
      tRotX += (e.touches[0].clientY - py) * 0.004;
      tRotX = Math.max(-0.5, Math.min(0.5, tRotX));
      px = e.touches[0].clientX; py = e.touches[0].clientY;
    };

    mount.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    mount.addEventListener("touchstart", onTDown, { passive: true });
    window.addEventListener("touchmove", onTMove, { passive: true });
    window.addEventListener("touchend", onUp);

    const onResize = () => {
      const nW = mount.clientWidth, nH = mount.clientHeight;
      if (!nW || !nH) return;
      camera.aspect = nW / nH;
      camera.position.z = nW < 480 ? 8.5 : nW < 768 ? 7.8 : 7.0;
      camera.updateProjectionMatrix();
      renderer.setSize(nW, nH);
    };
    window.addEventListener("resize", onResize);

    // ── ANIMATION LOOP ────────────────────────────────────────
    let raf: number;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (!dragging) tRotY += 0.003;
      laptop.rotation.y += (tRotY - laptop.rotation.y) * 0.06;
      laptop.rotation.x += (tRotX - laptop.rotation.x) * 0.06;
      laptop.position.y = Math.sin(t * 0.6) * 0.1;

      // Pulse screen glow light
      rimGreen.intensity = 7 + Math.sin(t * 2) * 1.5;
      rimGreen.position.set(
        Math.sin(laptop.rotation.y) * 1.5,
        2,
        3 + Math.cos(t * 0.5) * 0.3
      );

      // Logo glow pulse
      (hexMesh.material as THREE.MeshStandardMaterial).emissiveIntensity =
        1.5 + Math.sin(t * 2.5) * 0.8;

      // Screen glow strip pulse
      (glowStrip.material as THREE.MeshBasicMaterial).opacity =
        0.04 + Math.sin(t * 1.5) * 0.03;

      // Scroll code
      scroll += 0.4;
      drawScreen(sCtx, scroll);
      sTex.needsUpdate = true;

      // Drift particles
      particles.rotation.y = t * 0.035;
      blueParticles.rotation.y = -t * 0.025;
      particles.rotation.x = Math.sin(t * 0.15) * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      mount.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      mount.removeEventListener("touchstart", onTDown);
      window.removeEventListener("touchmove", onTMove);
      window.removeEventListener("touchend", onUp);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      style={{ cursor: "grab" }}
    />
  );
}
