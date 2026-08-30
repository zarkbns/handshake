import { redirect } from 'next/navigation'

/** Developers has no landing view of its own; API Keys is the default tab. */
export default function DevelopersIndexPage() {
  redirect('/dashboard/developers/api-keys')
}
