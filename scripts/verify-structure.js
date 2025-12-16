#!/usr/bin/env node

/**
 * Verification script to check project structure and imports
 */

const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'app/layout.tsx',
  'app/page.tsx',
  'app/login/page.tsx',
  'app/register/page.tsx',
  'app/dashboard/page.tsx',
  'app/api/auth/login/route.ts',
  'app/api/auth/register/route.ts',
  'app/api/auth/logout/route.ts',
  'app/api/auth/me/route.ts',
  'app/api/tasks/route.ts',
  'app/api/tasks/[id]/route.ts',
  'app/api/ai/suggestions/route.ts',
  'app/api/ai/priority/route.ts',
  'lib/db.ts',
  'lib/auth.ts',
  'lib/utils.ts',
  'models/User.ts',
  'models/Task.ts',
  'middleware.ts',
  '.env.example',
  'README.md',
];

const requiredDirs = [
  'app',
  'components',
  'components/ui',
  'lib',
  'models',
  'store',
];

console.log('🔍 Verifying project structure...\n');

let errors = 0;
let warnings = 0;

// Check required directories
console.log('📁 Checking directories...');
requiredDirs.forEach(dir => {
  const dirPath = path.join(process.cwd(), dir);
  if (fs.existsSync(dirPath)) {
    console.log(`  ✅ ${dir}`);
  } else {
    console.log(`  ❌ ${dir} - MISSING`);
    errors++;
  }
});

// Check required files
console.log('\n📄 Checking files...');
requiredFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - MISSING`);
    errors++;
  }
});

// Check environment files
console.log('\n🔐 Checking environment files...');
const envExample = path.join(process.cwd(), '.env.example');
const envLocal = path.join(process.cwd(), '.env.local');

if (fs.existsSync(envExample)) {
  console.log('  ✅ .env.example');
} else {
  console.log('  ❌ .env.example - MISSING');
  errors++;
}

if (fs.existsSync(envLocal)) {
  console.log('  ✅ .env.local');
} else {
  console.log('  ⚠️  .env.local - Not found (create from .env.example)');
  warnings++;
}

// Check package.json scripts
console.log('\n📦 Checking package.json...');
const packageJson = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packageJson)) {
  const pkg = JSON.parse(fs.readFileSync(packageJson, 'utf8'));
  const requiredScripts = ['dev', 'build', 'start', 'lint'];
  requiredScripts.forEach(script => {
    if (pkg.scripts && pkg.scripts[script]) {
      console.log(`  ✅ npm run ${script}`);
    } else {
      console.log(`  ❌ npm run ${script} - MISSING`);
      errors++;
    }
  });
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 Verification Summary:');
console.log(`  ✅ All checks passed: ${errors === 0 && warnings === 0}`);
console.log(`  ❌ Errors: ${errors}`);
console.log(`  ⚠️  Warnings: ${warnings}`);
console.log('='.repeat(50));

if (errors > 0) {
  console.log('\n❌ Some required files or directories are missing.');
  process.exit(1);
} else if (warnings > 0) {
  console.log('\n⚠️  Some optional files are missing, but core structure is intact.');
  process.exit(0);
} else {
  console.log('\n✅ Project structure is complete!');
  process.exit(0);
}

