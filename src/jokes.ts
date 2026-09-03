// Import all joke JSON files
import planeCrash from '../jokes/plane-crash.json';
import davesLaptop from '../jokes/daves-laptop.json';
import folderStructure from '../jokes/folder-structure.json';
import nodeModules from '../jokes/node-modules.json';
import perfectUptime from '../jokes/perfect-uptime.json';
import fridayDeploy from '../jokes/friday-deploy.json';
import legacyYaml from '../jokes/legacy-yaml.json';
import slackSilence from '../jokes/slack-silence.json';
import backlog2019 from '../jokes/backlog-2019.json';
import envProdOnly from '../jokes/env-prod-only.json';
import ancientTodo from '../jokes/ancient-todo.json';
import coinflipMerge from '../jokes/coinflip-merge.json';
import loneMaintainer from '../jokes/lone-maintainer.json';
import prMeeting from '../jokes/pr-meeting.json';
import aiUnreviewed from '../jokes/ai-unreviewed.json';
import cacheInvalidation from '../jokes/cache-invalidation.json';
import envExampleLies from '../jokes/env-example-lies.json';
import stagingIsProd from '../jokes/staging-is-prod.json';
import rollbackForward from '../jokes/rollback-forward.json';
import greenEmptyTests from '../jokes/green-empty-tests.json';
import dnsPropagation from '../jokes/dns-propagation.json';
import gitForcePush from '../jokes/git-force-push.json';
import cssZIndex from '../jokes/css-z-index.json';
import tabVsSpaces from '../jokes/tab-vs-spaces.json';
import dbMigrationProd from '../jokes/db-migration-prod.json';

export interface Joke {
  id: string;
  title: string;
  subtitle: string;
  logs: string[];
  footnote: string;
  emoji: string;
  tags: string[];
  pathTemplate?: string;
}

export const jokes: Joke[] = [
  planeCrash,
  davesLaptop,
  folderStructure,
  nodeModules,
  perfectUptime,
  fridayDeploy,
  legacyYaml,
  slackSilence,
  backlog2019,
  envProdOnly,
  ancientTodo,
  coinflipMerge,
  loneMaintainer,
  prMeeting,
  aiUnreviewed,
  cacheInvalidation,
  envExampleLies,
  stagingIsProd,
  rollbackForward,
  greenEmptyTests,
  dnsPropagation,
  gitForcePush,
  cssZIndex,
  tabVsSpaces,
  dbMigrationProd,
];

export default jokes;
