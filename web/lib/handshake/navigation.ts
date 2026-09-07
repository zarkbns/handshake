import type { ActivityWindow } from '@/lib/handshake/types'

export interface NavChild {
  label: string
  href: string
}

export interface NavItem {
  label: string
  href: string
  children?: NavChild[]
}

/**
 * Global navigation.
 *
 * Kept to five top-level entries. Anything deeper hangs off a dropdown rather
 * than widening the header, and contextual sub-navigation (Developers, the
 * settlement detail tabs) uses in-page tabs instead.
 */
export const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', href: '/dashboard' },
  {
    label: 'Settlements',
    href: '/dashboard/settlements',
    children: [
      { label: 'All', href: '/dashboard/settlements' },
      { label: 'Pending', href: '/dashboard/settlements?status=pending' },
      { label: 'Settled', href: '/dashboard/settlements?status=settled' },
      { label: 'Held', href: '/dashboard/settlements?status=held' },
    ],
  },
  { label: 'Analytics', href: '/dashboard/analytics' },
  {
    label: 'Developers',
    href: '/dashboard/developers/api-keys',
    children: [
      { label: 'API Keys', href: '/dashboard/developers/api-keys' },
      { label: 'SDK', href: '/dashboard/developers/sdk' },
      { label: 'Webhooks', href: '/dashboard/developers/webhooks' },
    ],
  },
  { label: 'Docs', href: '/dashboard/docs' },
]

export const DEVELOPER_TABS: NavChild[] = [
  { label: 'API Keys', href: '/dashboard/developers/api-keys' },
  { label: 'SDK', href: '/dashboard/developers/sdk' },
  { label: 'Webhooks', href: '/dashboard/developers/webhooks' },
]

export const ACTIVITY_WINDOWS: ActivityWindow[] = ['7D', '30D', '90D']
