// @ts-nocheck
'use client';
import React, { useEffect, useRef } from 'react';
import { Renderer, Transform, Vec3, Color, Polyline } from 'ogl';
import './Ribbons.css';

const Ribbons = ({
  colors = ['#00f3ff', '#bd00ff', '#ffffff'],
  baseSpring = 0.05,
  baseFriction = 0.9,
  baseThickness = 30,
  offsetFactor = 0.09,
  maxAge = 500,
  pointCount = 50,
  speedMultiplier = 0.6,
  enableFade = false,
  enableShaderEffect = true,
  effectAmplitude = 2,
  backgroundColor = [0, 0, 0, 0]
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ 
      dpr: Math.min(window.devicePixelRatio, 2), 
      alpha: true,
      depth: false 
    });
    
    const gl = renderer.gl;
    
    if (Array.isArray(backgroundColor) && backgroundColor.length === 4) {
      gl.clearColor(backgroundColor[0], backgroundColor[1], backgroundColor[2], backgroundColor[3]);
    } else {
      gl.clearColor(0, 0, 0, 0);
    }

    gl.canvas.style.display = 'block';
    gl.canvas.style.width = '100%';
    gl.canvas.style.height = '100%';
    container.appendChild(gl.canvas);

    const scene = new Transform();
    const lines = [];

    const vertex = `
      precision highp float;
      attribute vec3 position;
      attribute vec3 next;
      attribute vec3 prev;
      attribute vec2 uv;
      attribute float side;
      uniform vec2 uResolution;
      uniform float uDPR;
      uniform float uThickness;
      uniform float uTime;
      uniform float uEnableShaderEffect;
      uniform float uEffectAmplitude;
      varying vec2 vUV;
      
      vec4 getPosition() {
          vec4 current = vec4(position, 1.0);
          vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
          vec2 nextScreen = next.xy * aspect;
          vec2 prevScreen = prev.xy * aspect;
          vec2 tangent = normalize(nextScreen - prevScreen);
          vec2 normal = vec2(-tangent.y, tangent.x);
          normal /= aspect;
          normal *= mix(1.0, 0.1, pow(abs(uv.y - 0.5) * 2.0, 2.0));
          float dist = length(nextScreen - prevScreen);
          normal *= smoothstep(0.0, 0.02, dist);
          float pixelWidthRatio = 1.0 / (uResolution.y / uDPR);
          float pixelWidth = current.w * pixelWidthRatio;
          normal *= pixelWidth * uThickness;
          current.xy -= normal * side;
          if(uEnableShaderEffect > 0.5) {
            current.xy += normal * sin(uTime * 2.0 + current.x * 10.0) * uEffectAmplitude;
          }
          return current;
      }
      
      void main() {
          vUV = uv;
          gl_Position = getPosition();
      }
    `;

    const fragment = `
      precision highp float;
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uEnableFade;
      varying vec2 vUV;
      void main() {
          float fadeFactor = 1.0;
          if(uEnableFade > 0.5) {
              fadeFactor = 1.0 - smoothstep(0.0, 1.0, vUV.y);
          }
          gl_FragColor = vec4(uColor, uOpacity * fadeFactor);
      }
    `;

    const mouse = new Vec3(0, 0, 0); 
    
    function resize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      lines.forEach(line => {
        if(line.polyline) line.polyline.resize();
      });
    }
    window.addEventListener('resize', resize);

    function initLines() {
      const center = (colors.length - 1) / 2;
      colors.forEach((color, index) => {
        const spring = baseSpring + (Math.random() - 0.5) * 0.05;
        const friction = baseFriction + (Math.random() - 0.5) * 0.05;
        const thickness = baseThickness + (Math.random() - 0.5) * 3;
        const mouseOffset = new Vec3(
          (index - center) * offsetFactor + (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.1,
          0
        );

        const line = {
          spring,
          friction,
          mouseVelocity: new Vec3(),
          mouseOffset,
          points: [],
          polyline: null
        };

        for (let i = 0; i < pointCount; i++) {
          line.points.push(new Vec3(0, 0, 0));
        }

        line.polyline = new Polyline(gl, {
          points: line.points,
          vertex,
          fragment,
          uniforms: {
            uColor: { value: new Color(color) },
            uThickness: { value: thickness },
            uOpacity: { value: 1.0 },
            uTime: { value: 0.0 },
            uEnableShaderEffect: { value: enableShaderEffect ? 1.0 : 0.0 },
            uEffectAmplitude: { value: effectAmplitude },
            uEnableFade: { value: enableFade ? 1.0 : 0.0 }
          }
        });
        
        line.polyline.mesh.setParent(scene);
        lines.push(line);
      });
    }

    initLines();
    resize();

    function updateMouse(e) {
      let x, y;
      if (e.changedTouches && e.changedTouches.length) {
        x = e.changedTouches[0].clientX;
        y = e.changedTouches[0].clientY;
      } else {
        x = e.clientX;
        y = e.clientY;
      }
      
      const nx = (x / window.innerWidth) * 2 - 1;
      const ny = (y / window.innerHeight) * -2 + 1;
      mouse.set(nx, ny, 0);
    }
    
    window.addEventListener('mousemove', updateMouse);
    window.addEventListener('touchstart', updateMouse);
    window.addEventListener('touchmove', updateMouse);

    let frameId;
    let lastTime = performance.now();
    
    function update() {
      frameId = requestAnimationFrame(update);
      const currentTime = performance.now();
      const dt = Math.min(currentTime - lastTime, 50); 
      lastTime = currentTime;
      const timeSec = currentTime * 0.001;

      lines.forEach(line => {
        const target = new Vec3().copy(mouse).add(line.mouseOffset);
        const force = target.sub(line.points[0]).multiply(line.spring);
        line.mouseVelocity.add(force).multiply(line.friction);
        line.points[0].add(line.mouseVelocity);

        for (let i = 1; i < line.points.length; i++) {
            if (isFinite(maxAge) && maxAge > 0) {
                const segmentDelay = maxAge / (line.points.length - 1);
                const alpha = Math.min(1, (dt * speedMultiplier) / segmentDelay);
                line.points[i].lerp(line.points[i - 1], alpha);
            } else {
                line.points[i].lerp(line.points[i - 1], 0.9);
            }
        }
        
        if (line.polyline.mesh.program.uniforms.uTime) {
          line.polyline.mesh.program.uniforms.uTime.value = timeSec;
        }
        line.polyline.updateGeometry();
      });

      renderer.render({ scene });
    }
    update();

    // --- CORRECCIÓN CRÍTICA AQUÍ ---
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', updateMouse);
      window.removeEventListener('touchstart', updateMouse);
      window.removeEventListener('touchmove', updateMouse);
      cancelAnimationFrame(frameId);
      
      // Verificamos si el canvas sigue siendo hijo del container antes de borrarlo
      if (gl.canvas && container && container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
      
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [colors]);

  return <div ref={containerRef} className="ribbons-container" />;
};

export default Ribbons;