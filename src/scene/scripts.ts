export function getFullPageSceneScripts(logs: string[]): string {
  const jsonLogs = JSON.stringify(logs);

  return `
    const sceneLogs = ${jsonLogs};

    // 1. Mouse & Pointer Parallax Tilt on Monumental 404 Stage
    const stage = document.querySelector('.monumental-404-stage');
    const graffiti = document.querySelector('.scene-graffiti-block');

    window.addEventListener('pointermove', (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const deltaX = (e.clientX - centerX) / centerX;
      const deltaY = (e.clientY - centerY) / centerY;

      if (stage) {
        stage.style.transform = \`translate(-50%, -50%) rotateY(\${deltaX * 8}deg) rotateX(\${-deltaY * 8}deg)\`;
      }
      if (graffiti) {
        graffiti.style.transform = \`translate3d(\${deltaX * 6}px, \${deltaY * 6}px, 0) rotate(\${-0.5 + deltaX * 1.5}deg)\`;
      }
    });

    // 2. Draggable Interaction for Props, Stickers & Wreckage
    document.querySelectorAll('[data-draggable="true"], [data-drag-sticker="true"], [data-drag-wreckage="true"]').forEach((elem) => {
      let isDragging = false;
      let startX = 0, startY = 0;
      let currentX = 0, currentY = 0;

      elem.addEventListener('pointerdown', (e) => {
        if (e.target.closest('button, a, input, select')) return;
        isDragging = true;
        startX = e.clientX - currentX;
        startY = e.clientY - currentY;
        elem.setPointerCapture(e.pointerId);
        elem.style.zIndex = '100';
      });

      elem.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        currentX = e.clientX - startX;
        currentY = e.clientY - startY;
        elem.style.transform = \`translate3d(\${currentX}px, \${currentY}px, 0)\`;
      });

      const endDrag = (e) => {
        if (!isDragging) return;
        isDragging = false;
        try { elem.releasePointerCapture(e.pointerId); } catch (_) {}
      };

      elem.addEventListener('pointerup', endDrag);
      elem.addEventListener('pointercancel', endDrag);
    });

    // 3. Click-to-Escalate Screen Shake
    function triggerEscalation() {
      document.body.classList.remove('scene-escalating');
      void document.body.offsetWidth; // Force reflow
      document.body.classList.add('scene-escalating');
    }

    // 4. Status Lamp Fire Flare Trigger
    function triggerStatusGlitch() {
      triggerEscalation();
      const fire = document.querySelector('.lamp-fire-overlay');
      const smoke = document.querySelector('.lamp-smoke-puff');
      const caption = document.querySelector('.lamp-caption');
      if (fire) {
        const isShown = fire.style.display === 'block';
        fire.style.display = isShown ? 'none' : 'block';
        if (smoke) smoke.style.display = isShown ? 'none' : 'block';
        if (caption) caption.innerText = isShown ? '99.999% SLA' : '🔥 CRITICAL SLA BREACH';
      }
    }

    // 5. Panic Button Escalation
    function escalatePanic(elem) {
      triggerEscalation();
      if (elem) {
        elem.style.background = '#EF4444';
        elem.style.color = '#FFF';
        elem.innerHTML = '<strong>⚠️ CANNOT ESCAPE 404</strong>';
      }
    }

    // 6. Stamp Slam Animation Trigger
    function slamStamp(stamp) {
      triggerEscalation();
      stamp.style.animation = 'none';
      void stamp.offsetWidth;
      stamp.style.animation = 'stampSlam 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    }

    // 7. Copy Logs to Clipboard
    function copyLogs() {
      const text = sceneLogs.join('\\n');
      navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById('btn-copy-logs');
        if (btn) {
          const original = btn.innerHTML;
          btn.innerHTML = '✅ Copied!';
          setTimeout(() => { btn.innerHTML = original; }, 2000);
        }
      });
    }
  `;
}
