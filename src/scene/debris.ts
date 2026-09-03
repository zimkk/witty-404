import { Joke } from '../jokes';
import { getJokeFormatConfig } from '../templates/registry';
import {
  renderNewsChyron,
  renderIMessage,
  renderCorporateMemo,
  renderStoragePanic,
  renderStatusPage,
  renderTweet,
  renderStackOverflow,
  renderPrReview,
  renderReceiptStamp,
  renderGlitchTerminal,
} from '../templates/formats';
import { FormatContext } from '../templates/types';

export interface SceneContext {
  joke: Joke;
  formattedTitle: string;
  formattedSubtitle: string;
  formattedFootnote: string;
  sanitizedLogs: string[];
}

export function getSceneDebrisHtml(ctx: SceneContext): string {
  const cfg = getJokeFormatConfig(ctx.joke.id);
  const fCtx: FormatContext = {
    joke: ctx.joke,
    options: {},
    formattedTitle: ctx.formattedTitle,
    formattedSubtitle: ctx.formattedSubtitle,
    formattedFootnote: ctx.formattedFootnote,
    sanitizedLogs: ctx.sanitizedLogs,
  };

  switch (cfg.archetype) {
    case 'news_chyron':    return renderNewsChyron(fCtx);
    case 'imessage':       return renderIMessage(fCtx);
    case 'corporate_memo': return renderCorporateMemo(fCtx);
    case 'storage_panic':  return renderStoragePanic(fCtx);
    case 'status_page':    return renderStatusPage(fCtx);
    case 'tweet':          return renderTweet(fCtx);
    case 'stackoverflow':  return renderStackOverflow(fCtx);
    case 'pr_review':      return renderPrReview(fCtx);
    case 'receipt_stamp':  return renderReceiptStamp(fCtx);
    case 'glitch_terminal': return renderGlitchTerminal(fCtx);
    default:               return renderTweet(fCtx);
  }
}
