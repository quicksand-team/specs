import { generateConfigs } from './generate-configs.js';
import { generateRules } from './generate-rules.js';

await generateRules();

await generateConfigs();
