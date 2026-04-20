// I am building a sample manager destktop app using Tauri and React/TS.
// The user can select folders on their computer to be indexed by the app.
// The app will find all sample / midi files in those folders recursively.
// The app will then allow the user to search / filter / sort the assets.
// The user can create lists of assets for different projects / genres / vibes.
// The user can favorite assets to easily find them later.
// The user can playback assets.
// The user can use up / down arrows to navigate assets that auto play.
// The user can adjust the output volume of the app.
// When browsing midi files, the user can select to use a build in sound font
// or they can choose midi output to route the midi to an external DAW or source.
// The user can press ctrl+c to copy the active asset to clipboard.
// The user can press delete or backspace to "dislike" an asset which will
// hide it from ever being shown in the app other than if the user looks in
// their "Disliked" list which shows all the assets they've disliked and
// allows them to "undislike" them.
// When user dislikes an asset, a toast is shown with a 5 second timer to allow
// them to undo the action.
// The user can create a list and give it a name.
// The user can add assets to a list.
// The user can remove assets from a list.
// The user can delete a list.
// The user can rename a list.
// When browsing assets, the user can filter by duration, kind, bpm, key, time added,
// name, file type, and more.
// The user can remove folder paths from being indexed by the app which will remove
// all assets from those folders from the app's library.
// When indexing, the app will try to make sure there are no duplicates added to the library.

export type AssetTypeT = "sample" | "midi";

export type FileTypeT = "wav" | "mp3" | "mid" | "midi";

export type AssetSortFieldT =
  | "name"
  | "fileName"
  | "fileSize"
  | "durationMs"
  | "bpm"
  | "key"
  | "fileType"
  | "type"
  | "timeAdded"
  | "lastPlayedAt"
  | "playCount";

export type SortDirectionT = "asc" | "desc";

export type ListTypeT = "custom" | "favorites" | "disliked";

export type MidiPlaybackModeT = "soundfont" | "midi-output";

export type ToastTypeT = "info" | "success" | "warning" | "error";

export type IndexStatusT = "idle" | "indexing" | "complete" | "failed";

export type SamplePlaybackKindT = "loop" | "one-shot";

export type NumberRangeT = {
  min?: number;
  max?: number;
};

export type DateRangeT = {
  min?: string;
  max?: string;
};

export type BaseEntityT = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type IndexedFolderT = BaseEntityT & {
  path: string;
  name: string;
  isEnabled: boolean;
  status: IndexStatusT;
  lastIndexedAt?: string;
  assetCount: number;
  errorMessage?: string;
};

export type FileMetadataT = {
  fileName: string;
  filePath: string;
  fileType: FileTypeT;
  fileSize: number;
  extension: string;
  hash?: string;
  timeAdded: string;
  lastModifiedAt?: string;
};

export type AssetFlagsT = {
  isFavorited: boolean;
  isDisliked: boolean;
  isHidden: boolean;
  isDuplicate: boolean;
};

export type AssetUsageT = {
  playCount: number;
  lastPlayedAt?: string;
  copiedAt?: string;
  favoritedAt?: string;
  dislikedAt?: string;
};

export type SampleAnalysisT = {
  durationMs?: number;
  bpm?: number;
  key?: string;
  playbackKind?: SamplePlaybackKindT;
};

export type MidiAnalysisT = {
  durationMs?: number;
  keys: string[];
  scales: string[];
};

export type AssetBaseT = BaseEntityT & {
  type: AssetTypeT;
  name: string;
  normalizedName: string;
  folderId?: string;
  tags: string[];
  notes?: string;
  file: FileMetadataT;
  flags: AssetFlagsT;
  usage: AssetUsageT;
  indexedAt: string;
};

export type SampleAssetT = AssetBaseT & {
  type: "sample";
  analysis: SampleAnalysisT;
};

export type MidiAssetT = AssetBaseT & {
  type: "midi";
  analysis: MidiAnalysisT;
};

export type AssetT = SampleAssetT | MidiAssetT;

export type AssetListT = BaseEntityT & {
  type: ListTypeT;
  name: string;
  assetIds: string[];
};

export type AssetFilterT = {
  query?: string;
  types?: AssetTypeT[];
  fileTypes?: FileTypeT[];
  tags?: string[];
  keys?: string[];
  scales?: string[];
  bpm?: NumberRangeT;
  durationMs?: NumberRangeT;
  fileSize?: NumberRangeT;
  timeAdded?: DateRangeT;
  onlyFavorited?: boolean;
  onlyDisliked?: boolean;
  excludeDisliked?: boolean;
  playbackKinds?: SamplePlaybackKindT[];
  folderIds?: string[];
};

export type AssetSortT = {
  field: AssetSortFieldT;
  direction: SortDirectionT;
};

export type LibrarySelectionT = {
  activeAssetId?: string;
  selectedAssetIds: string[];
  activeListId?: string;
};

export type LibraryViewT = {
  selection: LibrarySelectionT;
  filter: AssetFilterT;
  sort: AssetSortT;
};

export type PlaybackStateT = {
  activeAssetId?: string;
  queueAssetIds: string[];
  isPlaying: boolean;
  currentTimeMs: number;
  volume: number;
  autoPlayOnSelection: boolean;
};

export type MidiSettingsT = {
  playbackMode: MidiPlaybackModeT;
  soundFontPath?: string;
  midiOutputId?: string;
};

export type AppPreferencesT = {
  outputVolume: number;
  autoPlayOnArrowNavigation: boolean;
  midi: MidiSettingsT;
};

export type ToastActionT = {
  label: string;
  actionId: string;
};

export type ToastT = {
  id: string;
  type: ToastTypeT;
  title?: string;
  message: string;
  durationMs: number;
  createdAt: string;
  expiresAt?: string;
  actions?: ToastActionT[];
};

export type IndexJobT = BaseEntityT & {
  folderId: string;
  status: IndexStatusT;
  scannedFileCount: number;
  indexedFileCount: number;
  duplicateFileCount: number;
  skippedFileCount: number;
  errorCount: number;
  startedAt?: string;
  finishedAt?: string;
};

export type AppStateT = {
  assetsById: Record<string, AssetT>;
  assetIds: string[];

  listsById: Record<string, AssetListT>;
  listIds: string[];

  foldersById: Record<string, IndexedFolderT>;
  folderIds: string[];

  jobsById: Record<string, IndexJobT>;
  jobIds: string[];

  toastsById: Record<string, ToastT>;
  toastIds: string[];

  view: LibraryViewT;
  playback: PlaybackStateT;
  preferences: AppPreferencesT;
};
