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

const accessUrl = 'https://teams.forger.cloud/#contact';

// Static and deliberately conservative until a public release is verified.
export const releases: readonly ReleaseMetadata[] = [
  {
    id: 'macos-arm64', state: 'gated', actionUrl: accessUrl,
    text: {
      en: { shortLabel: 'macOS (Apple silicon)', version: 'Coordinated access', requirements: 'macOS 13 or newer · Apple silicon' },
      es: { shortLabel: 'macOS (Apple silicon)', version: 'Acceso coordinado', requirements: 'macOS 13 o posterior · Apple silicon' },
    },
  },
  {
    id: 'macos-x64', state: 'unavailable', actionUrl: accessUrl,
    text: {
      en: { shortLabel: 'macOS (Intel)', version: 'No current build', requirements: 'Intel-based Mac' },
      es: { shortLabel: 'macOS (Intel)', version: 'Sin versión disponible', requirements: 'Mac con procesador Intel' },
    },
  },
  {
    id: 'windows-x64', state: 'gated', actionUrl: accessUrl,
    text: {
      en: { shortLabel: 'Windows', version: 'Coordinated access', requirements: 'Windows 10 or newer · 64-bit' },
      es: { shortLabel: 'Windows', version: 'Acceso coordinado', requirements: 'Windows 10 o posterior · 64 bits' },
    },
  },
  {
    id: 'linux', state: 'unsupported', actionUrl: accessUrl,
    text: {
      en: { shortLabel: 'Linux', version: 'Not offered', requirements: 'No supported build' },
      es: { shortLabel: 'Linux', version: 'No ofrecida', requirements: 'Sin versión compatible' },
    },
  },
];
