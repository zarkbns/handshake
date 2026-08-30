'use client'

import { AlertTriangle, Check, Circle, Lock } from 'lucide-react'

import { formatDateTime } from '@/lib/handshake/format'
import { buildLifecycleStages, type StageStatus } from '@/lib/handshake/lifecycle'
import type { Settlement } from '@/lib/handshake/types'

/**
 * Settlement lifecycle visualization.
 *
 * Stage derivation lives in `lib/handshake/lifecycle.ts` so the HELD invariant
 * (never render COMMIT or SETTLED as reached) is directly testable.
 */

function stageIcon(status: StageStatus) {
  if (status === 'done') return <Check size={11} />
  if (status === 'failed') return <AlertTriangle size={11} />
  if (status === 'current') return <Circle size={9} />
  return <Circle size={7} />
}

export function SettlementTimeline({ settlement }: { settlement: Settlement }) {
  const stages = buildLifecycleStages(settlement)

  return (
    <div className="ds-timeline">
      {stages.map((stage, index) => {
        const isLast = index === stages.length - 1
        const connectorStatus =
          stage.status === 'done' ? 'done' : stage.status === 'failed' ? 'failed' : undefined

        return (
          <div className="ds-stage" key={stage.key} data-status={stage.status}>
            <div className="ds-stage-rail">
              <span className="ds-stage-node" data-status={stage.status}>
                {stage.key === 'commit' && stage.status === 'done' ? (
                  <Lock size={10} />
                ) : (
                  stageIcon(stage.status)
                )}
              </span>
              {isLast ? null : <span className="ds-stage-connector" data-status={connectorStatus} />}
            </div>
            <div className="ds-stage-body">
              <div className="ds-stage-name">
                {stage.name}
                {stage.timestamp ? (
                  <span className="ds-stage-time">{formatDateTime(stage.timestamp)}</span>
                ) : null}
              </div>
              <p className="ds-stage-note">{stage.note}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
