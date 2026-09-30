import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

const dirsToLint = ['src', 'test']
let errorCount = 0

function logError(file, lineNum, message) {
  process.stderr.write(`${file}:${lineNum}: ${message}\n`)
  errorCount++
}

function getJsFiles(dirPath) {
  if (!fs.existsSync(dirPath)) return []
  const entries = fs.readdirSync(dirPath, { withFileTypes: true })
  let files = []
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name)
    if (entry.isDirectory()) {
      files = files.concat(getJsFiles(fullPath))
    } else if (entry.isFile() && /\.(js|mjs|cjs)$/.test(entry.name)) {
      files.push(fullPath)
    }
  }
  return files
}

function replaceKeepNewlines(str) {
  return str.replace(/[^\r\n]/g, ' ')
}

function stripCommentsAndStrings(code) {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, replaceKeepNewlines)
    .replace(/\/\/.*/g, replaceKeepNewlines)
    .replace(/(["'`])(?:\\[\s\S]|[^\\])*?\1/g, replaceKeepNewlines)
}

const files = dirsToLint.flatMap(getJsFiles)

for (const filePath of files) {
  try {
    execFileSync(process.execPath, ['--check', filePath], { stdio: 'pipe' })
  } catch (err) {
    process.stderr.write(`Syntax error in ${filePath}:\n${err.stderr.toString()}\n`)
    errorCount++
    continue
  }

  const content = fs.readFileSync(filePath, 'utf8')
  const lines = content.split(/\r?\n/)
  const strippedContent = stripCommentsAndStrings(content)
  const strippedLines = strippedContent.split(/\r?\n/)

  for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1
    const rawLine = lines[i]
    const strippedLine = strippedLines[i]

    if (/[ \t]+$/.test(rawLine)) {
      logError(filePath, lineNum, 'trailing whitespace')
    }

    if (/\t/.test(rawLine)) {
      logError(filePath, lineNum, 'tab character')
    }

    if (/\bconsole\.log\b/.test(strippedLine)) {
      logError(filePath, lineNum, 'console.log usage')
    }

    if (/\bdebugger\b/.test(strippedLine)) {
      logError(filePath, lineNum, 'debugger statement')
    }

    if (/\bvar\b/.test(strippedLine)) {
      logError(filePath, lineNum, 'var declaration')
    }
  }
}

if (errorCount > 0) {
  process.stderr.write(`Linting failed with ${errorCount} error(s).\n`)
  process.exit(1)
} else {
  process.stdout.write('Linting passed.\n')
  process.exit(0)
}
