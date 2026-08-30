'use client'

import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

/** Copy-to-clipboard button with a transient confirmation. */
export function CopyButton({ value, label = 'Copy' }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // Clipboard access can be denied (insecure context, permissions). Fail
      // silently rather than surfacing a browser-level error to an operator.
    }
  }

  return (
    <button type="button" className="ds-copy" onClick={copy} aria-live="polite">
      {copied ? <Check size={10} /> : <Copy size={10} />}
      {copied ? 'Copied' : label}
    </button>
  )
}

export function CodeBlock({
  code,
  language,
  filename,
}: {
  code: string
  language?: string
  filename?: string
}) {
  return (
    <div className="ds-code">
      <div className="ds-code-head">
        <span>{filename ?? language ?? 'shell'}</span>
        <CopyButton value={code} />
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  )
}
