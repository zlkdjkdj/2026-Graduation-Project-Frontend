const fs = require('fs');
const path = require('path');

function splitFile(filePath, outDir) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract imports
  const importRegex = /^import[\s\S]*?from\s+['"][^'"]+['"];?/gm;
  const imports = [];
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    imports.push(match[0]);
  }
  
  // Extract components
  const components = [];
  const componentRegex = /export\s+function\s+([A-Za-z0-9_]+)\s*\([^)]*\)\s*\{[\s\S]*?\n\}/gm;
  // It's hard to parse with regex perfectly due to nested brackets.
  // Instead, let's split by "export function"
  const parts = content.split(/^export function /m);
  const head = parts[0]; // imports etc
  
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    const nameMatch = part.match(/^([A-Za-z0-9_]+)/);
    if (!nameMatch) continue;
    const name = nameMatch[1];
    
    // Some components have helper functions. If there's a non-exported function after it, it belongs to the previous component or we should just keep it.
    // Actually, simple regex split is dangerous.
  }
}
