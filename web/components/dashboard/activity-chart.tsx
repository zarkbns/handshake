'use client'

import { useId, useMemo, useState } from 'react'

import { formatCount } from '@/lib/handshake/format'
import type { ActivityPoint } from '@/lib/handshake/types'

/**
 * Settlement activity chart.
 *
 * Hand-built SVG rather than a charting dependency: the repository has no chart
 * library, the shapes needed here are two stacked bar series plus one line, and
 * a viewBox-scaled SVG is responsive without a resize observer.
 */

const VIEW_WIDTH = 720
const VIEW_HEIGHT = 190
const PADDING = { top: 12, right: 8, bottom: 22, left: 30 }

const PLOT_WIDTH = VIEW_WIDTH - PADDING.left - PADDING.right
const PLOT_HEIGHT = VIEW_HEIGHT - PADDING.top - PADDING.bottom

function niceCeiling(value: number): number {
  if (value <= 4) return 4
  const magnitude = 10 ** Math.floor(Math.log10(value))
  return Math.ceil(value / magnitude) * magnitude
}

export function ActivityChart({ points }: { points: ActivityPoint[] }) {
  const titleId = useId()
  const [hovered, setHovered] = useState<number | null>(null)

  const { maxSettlements, maxProofs, ticks } = useMemo(() => {
    const settlementMax = Math.max(1, ...points.map((point) => point.settled + point.held))
    const proofMax = Math.max(1, ...points.map((point) => point.proofsVerified))
    const ceiling = niceCeiling(settlementMax)
    return {
      maxSettlements: ceiling,
      maxProofs: niceCeiling(proofMax),
      ticks: [0, ceiling / 2, ceiling],
    }
  }, [points])

  if (points.length === 0) return null

  const slot = PLOT_WIDTH / points.length
  const barWidth = Math.max(2, Math.min(18, slot * 0.56))

  const yFor = (value: number, max: number) => PADDING.top + PLOT_HEIGHT * (1 - value / max)
  const xFor = (index: number) => PADDING.left + slot * index + slot / 2

  const proofPath = points
    .map((point, index) => {
      const command = index === 0 ? 'M' : 'L'
      return `${command}${xFor(index).toFixed(1)},${yFor(point.proofsVerified, maxProofs).toFixed(1)}`
    })
    .join(' ')

  // Label every nth bucket so a 90-day window stays legible.
  const labelStride = Math.max(1, Math.ceil(points.length / 7))
  const active = hovered !== null ? points[hovered] : null

  return (
    <div>
      <svg
        className="ds-chart"
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        role="img"
        aria-labelledby={titleId}
        preserveAspectRatio="none"
        style={{ height: 190 }}
        onMouseLeave={() => setHovered(null)}
      >
        <title id={titleId}>
          Settlement activity: settled and held counts per day, with proofs verified.
        </title>

        <g className="ds-chart-grid">
          {ticks.map((tick) => (
            <line
              key={tick}
              x1={PADDING.left}
              x2={VIEW_WIDTH - PADDING.right}
              y1={yFor(tick, maxSettlements)}
              y2={yFor(tick, maxSettlements)}
            />
          ))}
        </g>

        <g className="ds-chart-axis">
          {ticks.map((tick) => (
            <text
              key={tick}
              x={PADDING.left - 6}
              y={yFor(tick, maxSettlements) + 2.5}
              textAnchor="end"
            >
              {tick}
            </text>
          ))}
          {points.map((point, index) =>
            index % labelStride === 0 ? (
              <text key={point.date} x={xFor(index)} y={VIEW_HEIGHT - 7} textAnchor="middle">
                {point.date.slice(5)}
              </text>
            ) : null,
          )}
        </g>

        {points.map((point, index) => {
          const settledHeight = (point.settled / maxSettlements) * PLOT_HEIGHT
          const heldHeight = (point.held / maxSettlements) * PLOT_HEIGHT
          const x = xFor(index) - barWidth / 2
          return (
            <g
              key={point.date}
              onMouseEnter={() => setHovered(index)}
              onFocus={() => setHovered(index)}
              tabIndex={-1}
            >
              {/* Full-height hit area so thin bars stay hoverable. */}
              <rect
                x={xFor(index) - slot / 2}
                y={PADDING.top}
                width={slot}
                height={PLOT_HEIGHT}
                fill="transparent"
              />
              <rect
                className="ds-chart-bar"
                data-series="held"
                x={x}
                y={PADDING.top + PLOT_HEIGHT - settledHeight - heldHeight}
                width={barWidth}
                height={heldHeight}
              />
              <rect
                className="ds-chart-bar"
                x={x}
                y={PADDING.top + PLOT_HEIGHT - settledHeight}
                width={barWidth}
                height={settledHeight}
              />
            </g>
          )
        })}

        <path className="ds-chart-line" d={proofPath} />
      </svg>

      <div className="ds-legend">
        <span>
          <span className="ds-swatch" aria-hidden="true" /> Settled
        </span>
        <span>
          <span className="ds-swatch" data-series="held" aria-hidden="true" /> Held
        </span>
        <span>
          <span className="ds-swatch" data-series="proofs" aria-hidden="true" /> Proofs verified
        </span>
        <span style={{ marginLeft: 'auto', color: 'var(--ds-text-secondary)' }}>
          {active
            ? `${active.date} · ${formatCount(active.settled)} settled · ${formatCount(active.held)} held · ${formatCount(active.proofsVerified)} proofs`
            : 'Hover a bucket for detail'}
        </span>
      </div>
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div aria-hidden="true">
      <span className="ds-skeleton" style={{ display: 'block', width: '100%', height: 190 }} />
      <div className="ds-legend">
        <span className="ds-skeleton" style={{ width: 68, height: 8 }} />
        <span className="ds-skeleton" style={{ width: 52, height: 8 }} />
        <span className="ds-skeleton" style={{ width: 96, height: 8 }} />
      </div>
    </div>
  )
}
