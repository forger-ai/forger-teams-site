export type ReleaseState = 'available' | 'gated' | 'unavailable' | 'unsupported';
export type PlatformId = 'macos-arm64' | 'macos-x64' | 'windows-x64' | 'linux';

type BaseRelease = {
  id: PlatformId;
  label: string;
  shortLabel: string;
  version: string;
  requirements: string;
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
  { id: 'macos-arm64', label: 'macOS · Apple silicon', shortLabel: 'macOS (Apple silicon)', state: 'gated', version: 'Coordinated access', requirements: 'macOS 13 or newer · Apple silicon', actionUrl: accessUrl },
  { id: 'macos-x64', label: 'macOS · Intel', shortLabel: 'macOS (Intel)', state: 'unavailable', version: 'No current build', requirements: 'Intel-based Mac', actionUrl: accessUrl },
  { id: 'windows-x64', label: 'Windows · x64', shortLabel: 'Windows', state: 'gated', version: 'Coordinated access', requirements: 'Windows 10 or newer · 64-bit', actionUrl: accessUrl },
  { id: 'linux', label: 'Linux', shortLabel: 'Linux', state: 'unsupported', version: 'Not offered', requirements: 'No supported build', actionUrl: accessUrl },
];
