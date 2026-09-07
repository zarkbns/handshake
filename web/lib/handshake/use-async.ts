'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

export interface AsyncState<T> {
  data: T | null
  error: Error | null
  loading: boolean
  reload: () => void
}

/**
 * Runs an async loader and tracks loading/error state.
 *
 * Results from a superseded call are discarded so a fast filter change cannot
 * be overwritten by a slower in-flight request.
 */
export function useAsync<T>(loader: () => Promise<T>, deps: unknown[]): AsyncState<T> {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(true)
  const [nonce, setNonce] = useState(0)

  // The loader identity is intentionally keyed on the caller's deps rather than
  // the function itself, so inline closures do not cause refetch loops.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const run = useCallback(loader, deps)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)

    run()
      .then((result) => {
        if (!active) return
        setData(result)
        setLoading(false)
      })
      .catch((cause: unknown) => {
        if (!active) return
        setError(cause instanceof Error ? cause : new Error(String(cause)))
        setLoading(false)
      })

    return () => {
      active = false
    }
  }, [run, nonce])

  const reload = useCallback(() => setNonce((value) => value + 1), [])

  return useMemo(() => ({ data, error, loading, reload }), [data, error, loading, reload])
}
