/**
 * Loader hook for running the `.mts` tests under bare `node`.
 *
 * Two gaps to fill versus the Next bundler:
 *
 *  1. Node does not resolve extensionless or `@/`-aliased specifiers.
 *  2. Node's native type-stripping handles `.ts` but not JSX in `.tsx`.
 *
 * Both are covered here using the TypeScript compiler that is already a
 * devDependency, so the tests need no additional packages or test runner.
 */
import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve as resolvePath } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import ts from 'typescript'

const WEB_ROOT = resolvePath(dirname(fileURLToPath(import.meta.url)), '..')
const EXTENSIONS = ['.ts', '.tsx', '/index.ts', '/index.tsx']

export async function resolve(specifier, context, next) {
  if (specifier.startsWith('.') && !/\.(ts|tsx|mts|js|mjs|json)$/.test(specifier)) {
    const base = dirname(fileURLToPath(context.parentURL))
    for (const extension of EXTENSIONS) {
      const candidate = resolvePath(base, specifier + extension)
      if (existsSync(candidate)) return next(pathToFileURL(candidate).href, context)
    }
  }

  if (specifier.startsWith('@/')) {
    for (const extension of ['', ...EXTENSIONS]) {
      const candidate = resolvePath(WEB_ROOT, specifier.slice(2) + extension)
      if (existsSync(candidate)) return next(pathToFileURL(candidate).href, context)
    }
  }

  return next(specifier, context)
}

export async function load(url, context, next) {
  if (url.endsWith('.tsx')) {
    const source = readFileSync(fileURLToPath(url), 'utf8')
    const { outputText } = ts.transpileModule(source, {
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.ESNext,
        jsx: ts.JsxEmit.ReactJSX,
        // The 'use client' directive is a bundler concern; harmless here.
        verbatimModuleSyntax: false,
      },
      fileName: url,
    })
    return { format: 'module', source: outputText, shortCircuit: true }
  }
  return next(url, context)
}
