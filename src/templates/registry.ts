import { FormatArchetype } from './types';

export interface JokeFormatConfig {
  archetype: FormatArchetype;
  badge?: string;
  authorName?: string;
  handle?: string;
  avatarEmoji?: string;
  tickerText?: string;
  statusHeadline?: string;
  stampText?: string;
}

const jokeFormatRegistry: Record<string, JokeFormatConfig> = {
  // Breaking News TV Broadcast
  'plane-crash': {
    archetype: 'news_chyron',
    badge: 'BREAKING NEWS',
    tickerText: 'LIVE: HTTP 404 CRASH SITE CONFIRMED • NO SURVIVORS FOUND IN RE-ENTRY • ON-CALL ENGINEER SEEN PACKING BAGS • ROUTING TABLE REPORTED MISSING',
    statusHeadline: 'DISASTER STRIKES PRODUCTION: FLIGHT 404 DOWN',
  },
  'dns-propagation': {
    archetype: 'news_chyron',
    badge: 'WEATHER / INFRA ALERT',
    tickerText: 'BREAKING: DNS PROPAGATION DELAYED BY ANOTHER 72 HOURS • TTL SET TO 86400 IN 2014 • FLUSHING CACHE ONLY MAKES IT ANGRY',
    statusHeadline: 'CATEGORY 5 DNS OUTAGE DECLARED NATIONWIDE',
  },
  'rollback-forward': {
    archetype: 'news_chyron',
    badge: 'EMERGENCY BROADCAST',
    tickerText: 'URGENT: TEAM TRIES TO ROLL BACK • REALIZES DATABASE WAS ALREADY MIGRATED • ONLY WAY OUT IS TO ROLL FORWARD INTO CHAOS',
    statusHeadline: 'BACKUPS DELETED TO SAVE S3 COSTS: ROLLBACK IMPOSSIBLE',
  },

  // Fake iMessage / Chat Thread
  'daves-laptop': {
    archetype: 'imessage',
    authorName: 'Dave (Former Senior Staff Dev)',
    handle: '+1 (555) 404-DAVE',
    avatarEmoji: '💻',
    stampText: 'SEEN 6 MONTHS AGO',
  },
  'slack-silence': {
    archetype: 'imessage',
    authorName: '#incident-war-room (482 members)',
    handle: '@channel',
    avatarEmoji: '🦗',
    stampText: 'SEEN BY EVERYONE • REPLIED BY NO ONE',
  },

  // Corporate Restructuring Memo / JIRA
  'folder-structure': {
    archetype: 'corporate_memo',
    authorName: 'VP of Architecture Synergy',
    badge: 'INTERNAL REORG NOTICE',
    stampText: 'APPROVED BY COMMITTEE',
  },
  'backlog-2019': {
    archetype: 'corporate_memo',
    authorName: 'Sprint Planning Committee',
    badge: 'JIRA TICKET #DEB-404',
    stampText: 'DEFERRED TO Q4 2028',
  },

  // Storage / OS Panic Dialogs
  'node-modules': {
    archetype: 'storage_panic',
    badge: 'CRITICAL DISK WARNING',
    authorName: 'npm-resolver-daemon',
    stampText: '4.8 GB CONSUMED',
  },
  'db-migration-prod': {
    archetype: 'storage_panic',
    badge: 'UNRECOVERABLE SQL COMMAND',
    authorName: 'prod-database-primary',
    stampText: 'DROP TABLE CASCADE',
  },

  // SaaS Status Page Facade
  'perfect-uptime': {
    archetype: 'status_page',
    badge: 'ALL SYSTEMS OPERATIONAL',
    statusHeadline: '99.999% SLA Guarantee Active',
    stampText: 'COMPLETELY NORMAL',
  },

  // Viral Tweet / Quote-Dunk
  'friday-deploy': {
    archetype: 'tweet',
    authorName: 'Friday Deployer ✈️',
    handle: '@merged_at_458pm',
    avatarEmoji: '🍺',
    stampText: 'RATIO\'D ON PRODUCTION',
  },
  'git-force-push': {
    archetype: 'tweet',
    authorName: 'Rebase Enjoyer',
    handle: '@force_with_lease_liar',
    avatarEmoji: '🧨',
    stampText: 'DISASTER THREAD',
  },
  'coinflip-merge': {
    archetype: 'tweet',
    authorName: 'Lead Tech Gambler',
    handle: '@yolo_merge_bot',
    avatarEmoji: '🪙',
    stampText: '50/50 DECISION',
  },
  'tab-vs-spaces': {
    archetype: 'tweet',
    authorName: 'Code Formatter Purist',
    handle: '@4_spaces_or_die',
    avatarEmoji: '⚔️',
    stampText: 'UNRESOLVED WAR',
  },

  // Abandoned StackOverflow
  'ancient-todo': {
    archetype: 'stackoverflow',
    authorName: 'hackerman_2016',
    badge: '[CLOSED - DUPLICATE]',
    stampText: '404 UPVOTES • UNANSWERED',
  },
  'cache-invalidation': {
    archetype: 'stackoverflow',
    authorName: 'cache_headache',
    badge: '[RESOLVED BY HARD REFRESH]',
    stampText: 'STALE CACHE DETECTED',
  },
  'lone-maintainer': {
    archetype: 'stackoverflow',
    authorName: 'nebraska_maintainer_09',
    badge: '[LAST ACTIVE 2014]',
    stampText: 'SUPPORTS 80% OF INTERNET',
  },

  // GitHub PR Review Chaos
  'pr-meeting': {
    archetype: 'pr_review',
    authorName: 'reviewer_bot',
    badge: 'CHANGES REQUESTED (47 CONFLICTS)',
    stampText: 'LGTM SHIP IT 🚀',
  },
  'green-empty-tests': {
    archetype: 'pr_review',
    authorName: 'coverage_maximizer',
    badge: '100% COVERAGE GUARANTEED',
    stampText: 'EXPECT(TRUE).TOBE(TRUE)',
  },
  'ai-unreviewed': {
    archetype: 'pr_review',
    authorName: 'copilot_generated',
    badge: '+4,892 LINES / -2 LINES',
    stampText: 'REVIEWED IN 2 SECONDS',
  },

  // Receipt / Bruh Moment Stamp
  'staging-is-prod': {
    archetype: 'receipt_stamp',
    badge: 'OFFICIAL INCIDENT RECEIPT',
    authorName: 'DevOps Billing & Regrets',
    stampText: 'CERTIFIED BRUH MOMENT',
  },
  'env-example-lies': {
    archetype: 'receipt_stamp',
    badge: 'CONFIG DISCREPANCY AUDIT',
    authorName: 'Localhost Investigations Dept',
    stampText: 'FICTIONAL VALUES ONLY',
  },
  'env-prod-only': {
    archetype: 'receipt_stamp',
    badge: 'CERTIFICATE OF REGRET',
    authorName: 'Global Deployment Authority',
    stampText: 'WORKS ON DAVE\'S MACHINE',
  },

  // Maximalist Glitch Terminal
  'legacy-yaml': {
    archetype: 'glitch_terminal',
    badge: 'YAML INDENTATION HELL',
    authorName: 'yaml_parser_panicked',
    stampText: 'TAB CHARACTER ENCOUNTERED',
  },
  'css-z-index': {
    archetype: 'glitch_terminal',
    badge: 'Z-INDEX OVERFLOW',
    authorName: 'css_layer_manager',
    stampText: 'Z-INDEX: 999999999',
  },
};

export function getJokeFormatConfig(jokeId: string): JokeFormatConfig {
  return (
    jokeFormatRegistry[jokeId] || {
      archetype: 'tweet',
      authorName: 'DevOps Incident Bot',
      handle: '@witty_404',
      avatarEmoji: '💥',
      badge: 'HTTP 404 NOT FOUND',
      stampText: 'CERTIFIED SKILL ISSUE',
    }
  );
}
