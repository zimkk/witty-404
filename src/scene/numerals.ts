import { Joke } from '../jokes';

export function getSceneNumeralsHtml(joke: Joke): string {
  return `
    <div class="hero-404-container">
      <div class="big-404-title">404</div>
    </div>
  `;
}
