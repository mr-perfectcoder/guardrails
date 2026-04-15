#!/usr/bin/env node

'use strict';

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

// ─── Constants ────────────────────────────────────────────────────────────────

const TEMPLATES = {
  nextjs: {
    label: 'Next.js App Router (v15 & v16)',
    key: 'nextjs',
    features: [
      'Server Actions with Auth + Rate Limit guards',
      'React Server Components (RSC-first pages)',
      'Metadata & SEO (generateMetadata per page)',
      'Data Access Layer (lib/dal.ts + React.cache)',
      'next/image + next/font (mandatory)',
      'Caching Strategy (use cache, revalidateTag)',
      'Middleware (v15) / Proxy (v16) gateway',
      'TDD: Jest + SWC + Playwright',
    ],
  },
  react: {
    label: 'React + Vite (React 19, SPA)',
    key: 'react',
    features: [
      'Secure Axios instance with interceptors',
      'TanStack Query for all server state',
      'Protected Route pattern (<PrivateRoute>)',
      'HttpOnly cookie session (no localStorage)',
      'Accessibility (a11y) — WCAG 2.1 AA enforced',
      'Asset indexing (src/assets/ with cache-busting)',
      'TDD: Vitest + React Testing Library + Playwright',
    ],
  },
};

const AGENTS = [
  { name: 'Gemini / Antigravity (GEMINI.md)', value: 'GEMINI.md' },
  { name: 'Cursor (.cursor.md)',               value: '.cursor.md' },
  { name: 'Claude Code (claude.md)',           value: 'claude.md' },
  { name: 'Other (.agent.md)',                 value: '.agent.md' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseArgs() {
  const raw = process.argv.slice(2);
  const framework = raw.find(a => ['nextjs', 'next', 'react', 'vite'].includes(a.replace(/^--/, '').toLowerCase())) ?? null;
  const agent     = raw.find(a => ['cursor', 'claude', 'gemini', 'antigravity', 'other'].includes(a.replace(/^--/, '').toLowerCase())) ?? null;
  const addSkill  = raw.find((a, i) => (a === '--add-skill' || a === '-s') && raw[i+1]) ? raw[raw.indexOf('--add-skill') !== -1 ? raw.indexOf('--add-skill')+1 : raw.indexOf('-s')+1] : null;
  return { framework: framework?.replace(/^--/, '').toLowerCase(), agent: agent?.replace(/^--/, '').toLowerCase(), addSkill };
}

async function createSkill(skillName) {
  const targetDir = process.cwd();
  const agentDir  = path.join(targetDir, '.agent');
  const skillsDir = path.join(agentDir, 'skills');

  if (!fs.existsSync(agentDir)) {
    console.error(chalk.red('\n❌ Error: .agent/ directory not found.'));
    console.error(chalk.gray('   Please run `npm create guardrails` first to initialize the suite.\n'));
    process.exit(1);
  }

  const skillPath = path.join(skillsDir, skillName);
  const skillFile = path.join(skillPath, 'SKILL.md');

  if (fs.existsSync(skillPath)) {
    console.error(chalk.red(`\n❌ Error: Skill "${skillName}" already exists at .agent/skills/${skillName}`));
    process.exit(1);
  }

  const content = `---
name: ${skillName.toLowerCase()}
description: Guidelines and rules for ${skillName}.
---

# ${skillName}

## 🎯 Purpose
Describe the main objective of this skill.

## ✅ DO
- Preach best practices
- Use code examples

## ❌ DON'T
- List anti-patterns

## 🤖 Interaction Protocol
Instructions for the AI agent on how to apply this skill.
`;

  await fs.ensureDir(skillPath);
  await fs.writeFile(skillFile, content);

  console.log(chalk.green(`\n✅ Skill "${chalk.bold(skillName)}" created successfully!`));
  console.log(chalk.gray(`   Path: .agent/skills/${skillName}/SKILL.md\n`));
  console.log(chalk.white('   Next steps:'));
  console.log(chalk.cyan(`   1. Edit the content in .agent/skills/${skillName}/SKILL.md`));
  console.log(chalk.cyan(`   2. Add a reference in .agent/Overview.md if needed.\n`));
}

function resolveFramework(arg) {
  if (arg === 'nextjs' || arg === 'next') return 'nextjs';
  if (arg === 'react'  || arg === 'vite') return 'react';
  return null;
}

function resolveAgent(arg) {
  if (!arg) return null;
  if (arg === 'cursor')                          return '.cursor.md';
  if (arg === 'claude')                          return 'claude.md';
  if (arg === 'gemini' || arg === 'antigravity') return 'GEMINI.md';
  if (arg === 'other')                           return '.agent.md';
  return null;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function init() {
  const targetDir = process.cwd();
  const args      = parseArgs();
  
  // Handle --add-skill flag
  if (args.addSkill) {
    await createSkill(args.addSkill);
    return;
  }

  console.log(chalk.blue.bold('\n🛡️  Guardrails — AI-Agent Architecture & Security Suite\n'));
  console.log(chalk.gray('  Enforces production-grade standards on every file your AI agent touches.\n'));

  let frameworkKey = resolveFramework(args.framework);
  let agentFile    = resolveAgent(args.agent);

  try {
    // ── Step 1: Select Framework ───────────────────────────────────────────

    if (!frameworkKey) {
      const answer = await inquirer.prompt([
        {
          type: 'list',
          name: 'framework',
          message: 'Which framework are you using?',
          choices: [
            { name: `🟦  ${TEMPLATES.nextjs.label}`, value: 'nextjs' },
            { name: `⚡  ${TEMPLATES.react.label}`,  value: 'react'  },
          ],
        },
      ]);
      frameworkKey = answer.framework;
    } else {
      console.log(chalk.gray(`  › Framework: ${chalk.white(TEMPLATES[frameworkKey].label)}`));
    }

    const template = TEMPLATES[frameworkKey];

    // ── Step 2: Select AI Agent ────────────────────────────────────────────

    if (!agentFile) {
      const answer = await inquirer.prompt([
        {
          type: 'list',
          name: 'agent',
          message: 'Which AI coding agent are you using?',
          choices: AGENTS,
        },
      ]);
      agentFile = answer.agent;
    } else {
      console.log(chalk.gray(`  › Agent file: ${chalk.white(agentFile)}`));
    }

    console.log('');

    // ── Step 3: Copy .agent/ template ─────────────────────────────────────

    const sourceAgentDir = path.join(__dirname, `../templates/${frameworkKey}/.agent`);
    const destAgentDir   = path.join(targetDir, '.agent');

    if (fs.existsSync(destAgentDir)) {
      console.log(chalk.yellow('  ⚠  .agent/ directory already exists — skipping copy to avoid overwrite.'));
      console.log(chalk.gray('     Delete the existing .agent/ folder to reinstall.\n'));
    } else {
      process.stdout.write(chalk.gray('  › Copying documentation suite...'));
      await fs.copy(sourceAgentDir, destAgentDir);
      console.log(chalk.green(' done'));
    }

    // ── Step 4: Create agent activation file ──────────────────────────────

    const agentFilePath      = path.join(targetDir, agentFile);
    const activationContent  = `@[.agent/Overview.md]\n`;

    if (fs.existsSync(agentFilePath)) {
      console.log(chalk.yellow(`  ⚠  ${agentFile} already exists — skipping.`));
    } else {
      process.stdout.write(chalk.gray(`  › Creating ${agentFile} activation file...`));
      await fs.writeFile(agentFilePath, activationContent);
      console.log(chalk.green(' done'));
    }

    // ── Step 5: Success Summary ────────────────────────────────────────────

    console.log(chalk.green.bold('\n✅ Guardrails installed successfully!\n'));
    console.log(chalk.white(`  Suite:  ${chalk.cyan.bold(template.label)}`));
    console.log(chalk.white(`  Agent:  ${chalk.cyan.bold(agentFile)}\n`));
    console.log(chalk.white('  Enforced patterns:'));
    template.features.forEach(f => console.log(chalk.cyan(`    • ${f}`)));

    console.log(chalk.gray('\n  ─────────────────────────────────────────────────'));
    console.log(chalk.white('\n  Next step: Tell your AI agent to read the docs:'));
    console.log(chalk.cyan(`\n    "Read @.agent/Overview.md before starting any task."\n`));

  } catch (err) {
    if (err.isTtyError) {
      console.error(chalk.red('\n❌ Could not render interactive prompt.'));
      console.error(chalk.gray('   Use direct flags instead:'));
      console.error(chalk.cyan('   npm create guardrails nextjs --gemini'));
      console.error(chalk.cyan('   npm create guardrails react --cursor\n'));
    } else {
      console.error(chalk.red('\n❌ Installation failed:'), err.message);
    }
    process.exit(1);
  }
}

init();
