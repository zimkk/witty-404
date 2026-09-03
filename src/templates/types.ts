import { Joke } from '../jokes';

export type FormatArchetype =
  | 'news_chyron'
  | 'imessage'
  | 'corporate_memo'
  | 'storage_panic'
  | 'status_page'
  | 'tweet'
  | 'stackoverflow'
  | 'pr_review'
  | 'receipt_stamp'
  | 'glitch_terminal';

export interface RenderOptions {
  theme?: string;
  isRoasted?: boolean;
}

export interface FormatContext {
  joke: Joke;
  options: RenderOptions;
  formattedTitle: string;
  formattedSubtitle: string;
  formattedFootnote: string;
  sanitizedLogs: string[];
}
