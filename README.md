## tastey - Sample Manager Desktop App

### 1. Objective

A fast, keyboard-driven desktop application for managing, browsing, and auditioning local audio samples and MIDI files. The system prioritizes:

- low-latency navigation + playback
- minimal friction for organizing assets
- strong search/filter ergonomics
- zero dependency on DAWs for discovery

---

### 2. Core User Problems

- Samples are scattered across filesystem folders with poor discoverability
- DAWs are too heavy for browsing large libraries
- No unified way to:
  - search by metadata (bpm, key, duration)
  - quickly audition assets
  - curate collections per project or vibe

- MIDI previewing is cumbersome without setup

---

### 3. Target User

- Music producers (Ableton / FL / Logic users)
- Sample pack heavy workflows
- Users with large local libraries (10k–100k+ assets)
- Keyboard-first users

---

### 4. Core Features

#### 4.1 Library Indexing

- User selects folders from local filesystem
- Recursive scan for supported file types:
  - `.wav`, `.mp3`, `.mid`, `.midi`

- Extract + store metadata:
  - duration
  - bpm (if detectable)
  - key (if detectable)

- Deduplication via file hash (optional but recommended)
- Incremental re-indexing when folders change

---

#### 4.2 Asset Model

Each asset includes:

- filesystem metadata (path, size, type)
- derived metadata (bpm, key, duration)
- user metadata:
  - tags
  - notes
  - favorited / disliked

- usage metadata:
  - play count
  - last played
  - copied timestamp

---

#### 4.3 Browsing + Navigation

- Virtualized list/grid of assets
- Arrow key navigation:
  - up/down moves selection
  - selection triggers autoplay (optional)

- Instant playback on selection
- Active asset context (highlighted)

---

#### 4.4 Playback

- Audio playback:
  - low-latency streaming

- MIDI playback:
  - internal soundfont mode
  - external MIDI output routing

- Volume control (global)
- Seek + restart behavior (basic for MVP)

---

#### 4.5 Search + Filtering

Filter by:

- text query (name / filename)
- type (sample / midi)
- file type
- bpm range
- duration range
- key
- tags
- favorited / disliked state

Sort by:

- name
- time added
- duration
- bpm
- file size
- play count

---

#### 4.6 Lists (Collections)

Three list types:

1. **Custom Lists**
   - user-created
   - manually curated (add/remove assets)

2. **Favorites**
   - derived from `isFavorited`

3. **Disliked**
   - derived from `isDisliked`

Operations:

- create list
- rename list
- delete list
- add/remove assets

---

#### 4.7 Favoriting + Disliking

- `favorite` → quick access
- `dislike`:
  - hides asset from default views
  - moves to "Disliked" list
  - triggers undo toast (5s)

---

#### 4.8 Keyboard Shortcuts

- ↑ / ↓ → navigate assets
- enter / space → play
- ctrl + c → copy file to clipboard
- delete / backspace → dislike asset
- (optional future: tagging shortcuts)

---

#### 4.9 Clipboard Integration

- Copy active asset path or file
- Intended for quick drag/drop into DAW

---

#### 4.10 Toast System

- Used for:
  - undo actions (dislike)
  - system feedback

- Timed expiration
- optional actions

---

### 5. Non-Goals (for MVP)

- Cloud sync
- Collaboration
- AI tagging / classification
- Smart lists / rule engines
- Waveform visualization (nice-to-have, not required)
- Advanced audio processing

---

### 6. System Architecture (High-Level)

#### Frontend

- React + TypeScript
- State: custom store (framework-agnostic possible)
- Virtualized list rendering (performance critical)

#### Backend (Tauri)

- File system access
- Indexing + hashing
- Audio playback bridge
- MIDI routing

#### Storage

- Local database (likely SQLite or similar via Tauri plugin)
- In-memory normalized state:
  - `assetsById`
  - `listsById`
  - etc.

---

### 7. MVP Scope (Strict)

The MVP should only include:

- folder indexing
- asset listing
- basic playback
- search (text + simple filters)
- favorite / dislike
- custom lists (manual only)
- keyboard navigation
- undo toast

No advanced analysis or automation required.

---

## 8. MVP Implementation Plan (Step-by-Step)

### Phase 1 — Foundation

**Goal:** App boots, renders, and manages basic state

- Setup Tauri + React + TS project
- Implement global app state structure
- Implement basic layout:
  - sidebar (lists)
  - main panel (asset list)
  - top controls (search)

---

### Phase 2 — File Indexing

**Goal:** Populate assets from filesystem

- Folder picker (Tauri dialog)
- Recursive scan
- Filter supported file types
- Build `AssetT` objects
- Store in:
  - `assetsById`
  - `assetIds`

Optional but valuable:

- hash files for deduplication

---

### Phase 3 — Asset Rendering

**Goal:** Display and navigate assets

- Virtualized list (critical for performance)
- Active selection state
- Keyboard navigation (↑ ↓)
- Highlight active asset

---

### Phase 4 — Playback

**Goal:** Hear assets instantly

- Audio playback via Tauri bridge
- Auto-play on selection
- Volume control
- Basic stop/restart behavior

MIDI:

- simple internal playback (can stub if needed)

---

### Phase 5 — Search + Filtering (Minimal)

**Goal:** Reduce dataset quickly

Implement:

- text search (name + filename)
- filter:
  - type
  - fileType

Sorting:

- name
- timeAdded

---

### Phase 6 — Favorites + Disliked

**Goal:** Core user workflow

- Toggle favorite
- Dislike action:
  - mark `isDisliked = true`
  - hide from default view

- Undo toast (5 seconds)

Derived views:

- favorites list
- disliked list

---

### Phase 7 — Custom Lists

**Goal:** User curation

- Create list
- Rename list
- Delete list
- Add/remove asset (via action)

UI:

- sidebar list selector

---

### Phase 8 — Clipboard + Shortcuts

**Goal:** Integrate with production workflow

- ctrl + c → copy file path / file
- delete → dislike
- ensure keyboard-first flow is smooth

---

### Phase 9 — Persistence

**Goal:** State survives restart

- Persist:
  - assets
  - lists
  - flags (favorite/dislike)
  - usage data

- Load on app start

---

### Phase 10 — Polish (MVP-ready)

- Prevent UI jank on large libraries
- Ensure playback latency is low
- Edge cases:
  - missing files
  - deleted folders

- Basic error handling + toasts

---

## 9. MVP Exit Criteria

You are done when:

- User can index a folder and see assets
- Arrow keys + autoplay feel instant
- Search reduces results quickly
- Favoriting + disliking works with undo
- Lists can be created and used
- Copying to clipboard works reliably
- App performs well with large libraries (10k+ files)

---

## 10. Likely Next Steps After MVP

- waveform preview
- better metadata detection (bpm/key accuracy)
- drag + drop into DAW
- batch tagging
- AI-assisted tagging
- cloud sync / backup
