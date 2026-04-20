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

type AssetTypeT = "sample" | "midi";

type FileTypeT = "wav" | "mp3" | "mid" | "midi";

type AssetSortFieldT =
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

type SortDirectionT = "asc" | "desc";

type ListTypeT = "custom" | "favorites" | "disliked";

type MidiPlaybackModeT = "soundfont" | "midi-output";

type ToastTypeT = "info" | "success" | "warning" | "error";

type IndexStatusT = "idle" | "indexing" | "complete" | "failed";

type SamplePlaybackKindT = "loop" | "one-shot";

type NumberRangeT = {
  min?: number;
  max?: number;
};

type DateRangeT = {
  min?: string;
  max?: string;
};

type BaseEntityT = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

type IndexedFolderT = BaseEntityT & {
  path: string;
  name: string;
  isEnabled: boolean;
  status: IndexStatusT;
  lastIndexedAt?: string;
  assetCount: number;
  errorMessage?: string;
};

type FileMetadataT = {
  fileName: string;
  filePath: string;
  fileType: FileTypeT;
  fileSize: number;
  extension: string;
  hash?: string;
  timeAdded: string;
  lastModifiedAt?: string;
};

type AssetFlagsT = {
  isFavorited: boolean;
  isDisliked: boolean;
  isHidden: boolean;
  isDuplicate: boolean;
};

type AssetUsageT = {
  playCount: number;
  lastPlayedAt?: string;
  copiedAt?: string;
  favoritedAt?: string;
  dislikedAt?: string;
};

type SampleAnalysisT = {
  durationMs?: number;
  bpm?: number;
  key?: string;
  playbackKind?: SamplePlaybackKindT;
};

type MidiAnalysisT = {
  durationMs?: number;
  keys: string[];
  scales: string[];
};

type AssetBaseT = BaseEntityT & {
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

type SampleAssetT = AssetBaseT & {
  type: "sample";
  analysis: SampleAnalysisT;
};

type MidiAssetT = AssetBaseT & {
  type: "midi";
  analysis: MidiAnalysisT;
};

type AssetT = SampleAssetT | MidiAssetT;

type AssetListT = BaseEntityT & {
  type: ListTypeT;
  name: string;
  assetIds: string[];
};

type AssetFilterT = {
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

type AssetSortT = {
  field: AssetSortFieldT;
  direction: SortDirectionT;
};

type LibrarySelectionT = {
  activeAssetId?: string;
  selectedAssetIds: string[];
  activeListId?: string;
};

type LibraryViewT = {
  selection: LibrarySelectionT;
  filter: AssetFilterT;
  sort: AssetSortT;
};

type PlaybackStateT = {
  activeAssetId?: string;
  queueAssetIds: string[];
  isPlaying: boolean;
  currentTimeMs: number;
  volume: number;
  autoPlayOnSelection: boolean;
};

type MidiSettingsT = {
  playbackMode: MidiPlaybackModeT;
  soundFontPath?: string;
  midiOutputId?: string;
};

type AppPreferencesT = {
  outputVolume: number;
  autoPlayOnArrowNavigation: boolean;
  midi: MidiSettingsT;
};

type ToastActionT = {
  label: string;
  actionId: string;
};

type ToastT = {
  id: string;
  type: ToastTypeT;
  title?: string;
  message: string;
  durationMs: number;
  createdAt: string;
  expiresAt?: string;
  actions?: ToastActionT[];
};

type IndexJobT = BaseEntityT & {
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

type AppStateT = {
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
