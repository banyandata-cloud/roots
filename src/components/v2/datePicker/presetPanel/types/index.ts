import type { PresetDefinition } from '../../types';

export interface RecentRange {
	id: string;
	label: string;
	from: Date;
	to: Date;
}

export interface PresetPanelProps {
	presets: PresetDefinition[];
	selectedPresetId: string | null;
	onSelectPreset: (preset: PresetDefinition) => void;
	recents?: RecentRange[] | undefined;
	onSelectRecent?: ((recent: RecentRange) => void) | undefined;
}
