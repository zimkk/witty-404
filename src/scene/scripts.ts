import { getTemplateScripts } from '../templates/scripts';

export function getFullPageSceneScripts(logs: string[]): string {
  return getTemplateScripts(logs) + `
    function loadAnotherJoke() {
      const url = new URL(window.location.href);
      url.searchParams.delete('id');
      url.searchParams.set('_r', Math.random().toString(36).substring(2, 8));
      window.location.href = url.pathname + (url.searchParams.toString() ? '?' + url.searchParams.toString() : '');
    }
  `;
}
