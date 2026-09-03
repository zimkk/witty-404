export function getTemplateScripts(logs: string[]): string {
  const jsonLogs = JSON.stringify(logs);

  return `
    const jokeLogs = ${jsonLogs};

    // 1. Draggable Physics for Cards & Stickers
    document.querySelectorAll('[data-draggable="true"], [data-drag-sticker="true"]').forEach((elem) => {
      let isDragging = false;
      let startX = 0, startY = 0;
      let currentX = 0, currentY = 0;

      elem.addEventListener('pointerdown', (e) => {
        // Only drag if not clicking buttons or interactive links
        if (e.target.closest('button, a, input, select')) return;
        isDragging = true;
        startX = e.clientX - currentX;
        startY = e.clientY - currentY;
        elem.setPointerCapture(e.pointerId);
        elem.style.zIndex = '50';
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

    // 2. Click-to-Escalate Screen Shake
    function triggerEscalation() {
      document.body.classList.remove('escalating');
      void document.body.offsetWidth; // Force reflow
      document.body.classList.add('escalating');
    }

    // 3. Status Page Glitch Trigger
    function triggerStatusGlitch() {
      triggerEscalation();
      const overlay = document.querySelector('.banner-fire-overlay');
      if (overlay) {
        overlay.style.display = overlay.style.display === 'flex' ? 'none' : 'flex';
      }
    }

    // 4. Panic Alert Escalation
    function escalatePanic(btn) {
      triggerEscalation();
      if (btn) {
        btn.innerText = '⚠️ CANNOT ESCAPE 404';
        btn.style.background = '#000';
      }
    }

    // 5. Stamp Slamming Effect
    function slamStamp(stamp) {
      triggerEscalation();
      stamp.style.animation = 'none';
      void stamp.offsetWidth;
      stamp.style.animation = 'stampSlam 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    }

    // 6. Tweet Like Counter
    function likeTweet(btn) {
      triggerEscalation();
      const current = parseInt(btn.innerText.replace(/[^0-9]/g, '') || '0', 10);
      btn.innerText = \`❤️ \${current + 1}\`;
      btn.style.color = '#F43F5E';
    }

    // 7. Copy Logs to Clipboard
    function copyLogs() {
      const text = jokeLogs.join('\\n');
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
