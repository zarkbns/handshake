'use client'

import { usePathname } from 'next/navigation'

import { LinkTabs } from '@/components/dashboard/tabs'
import { DEVELOPER_TABS } from '@/lib/handshake/navigation'

export function DeveloperTabs() {
  const pathname = usePathname() ?? DEVELOPER_TABS[0].href
  return <LinkTabs tabs={DEVELOPER_TABS} activeHref={pathname} />
}
