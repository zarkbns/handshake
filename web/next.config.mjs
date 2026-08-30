import { fileURLToPath } from 'node:url'

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Next 16 auto-generates AGENTS.md / CLAUDE.md into this directory. The repo
   * already has an authoritative AGENTS.md at the root, and a second one nested
   * under web/ would shadow it for anything working in this subtree.
   */
  agentRules: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    /**
     * Pin the workspace root to this directory.
     *
     * The repository root carries its own package-lock.json for the contract and
     * relay tooling. Without this, Turbopack infers that as the root and warns.
     * Scoping it here keeps the backend's lockfile untouched.
     */
    root: fileURLToPath(new URL('.', import.meta.url)),
  },
}

export default nextConfig
