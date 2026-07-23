export type ReleaseState = 'available' | 'gated' | 'unavailable' | 'unsupported';
export type PlatformId = 'macos-arm64' | 'macos-x64' | 'windows-x64' | 'linux';

type BaseRelease = {
  id: PlatformId;
  text: {
    en: { shortLabel: string; version: string; requirements: string };
    es: { shortLabel: string; version: string; requirements: string };
  };
  releaseNotesUrl?: string;
};

export type ReleaseMetadata =
  | (BaseRelease & { state: 'available'; downloadUrl: string })
  | (BaseRelease & { state: 'gated'; actionUrl: string })
  | (BaseRelease & { state: 'unavailable'; actionUrl: string })
  | (BaseRelease & { state: 'unsupported'; actionUrl?: string });

const releaseBaseUrl = 'https://github.com/forger-ai/forger-desktop-teams/releases/download/forger-desktop-teams/v0.5.12';
const releaseNotesUrl = 'https://github.com/forger-ai/forger-desktop-teams/releases/tag/forger-desktop-teams/v0.5.12';

// Static public metadata updated only after the owning release workflow succeeds.
export const releases: readonly ReleaseMetadata[] = [
  {
    id: 'macos-arm64', state: 'available',
    downloadUrl: `${releaseBaseUrl}/forger-desktop-teams-macos-arm64.dmg`,
    releaseNotesUrl,
    text: {
      en: { shortLabel: 'macOS (Apple silicon)', version: '0.5.12', requirements: 'macOS 13 or newer · Apple silicon' },
      es: { shortLabel: 'macOS (Apple silicon)', version: '0.5.12', requirements: 'macOS 13 o posterior · Apple silicon' },
    },
  },
  {
    id: 'macos-x64', state: 'available',
    downloadUrl: `${releaseBaseUrl}/forger-desktop-teams-macos-x64.dmg`,
    releaseNotesUrl,
    text: {
      en: { shortLabel: 'macOS (Intel)', version: '0.5.12', requirements: 'macOS 13 or newer · Intel-based Mac' },
      es: { shortLabel: 'macOS (Intel)', version: '0.5.12', requirements: 'macOS 13 o posterior · Mac con procesador Intel' },
    },
  },
  {
    id: 'windows-x64', state: 'available',
    downloadUrl: `${releaseBaseUrl}/forger-desktop-teams-windows-x64.exe`,
    releaseNotesUrl,
    text: {
      en: { shortLabel: 'Windows', version: '0.5.12', requirements: 'Windows 10 or newer · 64-bit' },
      es: { shortLabel: 'Windows', version: '0.5.12', requirements: 'Windows 10 o posterior · 64 bits' },
    },
  },
  {
    id: 'linux', state: 'available',
    downloadUrl: `${releaseBaseUrl}/forger-desktop-teams-linux-x64.deb`,
    releaseNotesUrl,
    text: {
      en: { shortLabel: 'Linux', version: '0.5.12', requirements: 'Debian-compatible Linux · 64-bit' },
      es: { shortLabel: 'Linux', version: '0.5.12', requirements: 'Linux compatible con Debian · 64 bits' },
    },
  },
];
