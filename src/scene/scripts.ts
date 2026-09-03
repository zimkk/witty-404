export function getFullPageSceneScripts(logs: string[]): string {
  const jsonLogs = JSON.stringify(logs);

  return `
    const sceneLogs = ${jsonLogs};

    // Copy Logs to Clipboard
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

    // Load Another Random Joke (Forces Cache-Busting & ID Clearing)
    function loadAnotherJoke() {
      const url = new URL(window.location.href);
      url.searchParams.delete('id');
      url.searchParams.set('_r', Math.random().toString(36).substring(2, 8));
      window.location.href = url.pathname + (url.searchParams.toString() ? '?' + url.searchParams.toString() : '');
    }
  `;
}
