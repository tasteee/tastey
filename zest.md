# zest

zest is a design language for digital products built by the musical artist and software engineer known as tasteink.

---

## Foundation

- **Theme**: Dark-only.
- **Typeface**: DM Sans
- **Monospace**: DM Mono
- **Icons**: Phosphor Icons (`@phosphor-icons/react`). No other icon library is permitted.
- **Color model**: OKLCH for all color definitions.
- **Border radius base**: `0.5rem` (`--radius`)

---

## Color System

### Identity Colors

| Name   | Hex       | OKLCH                  | CSS Variable | Role                                |
| ------ | --------- | ---------------------- | ------------ | ----------------------------------- |
| Pink   | `#FF1493` | `oklch(0.75 0.25 350)` | `---pink`    | Primary accents, badges, emphasis   |
| Purple | `#BF40BF` | `oklch(0.7 0.25 300)`  | `---purple`  | Secondary accents, tags, categories |
| Orange | `#FF6B35` | `oklch(0.8 0.22 55)`   | `---orange`  | Warnings, attention, call-outs      |

---

### Grayscale

| Name       | Hex       | OKLCH                   | CSS Variable         | Role                     |
| ---------- | --------- | ----------------------- | -------------------- | ------------------------ |
| Pure White | `#FAFAFA` | `oklch(0.98 0 0)`       | `--primary`          | Headlines, primary text  |
| Light Gray | `#A0A0A0` | `oklch(0.65 0 0)`       | `--foreground`       | Body text, descriptions  |
| Muted Gray | `#707070` | `oklch(0.55 0 0)`       | `--muted-foreground` | Secondary text, captions |
| Border     | `#2A2F2A` | `oklch(0.28 0.015 145)` | `--border`           | Dividers, outlines       |
| Surface    | `#141814` | `oklch(0.14 0.018 145)` | `--card`             | Cards, elevated surfaces |
| Background | `#0A0F0A` | `oklch(0.12 0.02 145)`  | `--background`       | Page background          |

---

### Semantic Color Mapping

| Token                    | OKLCH                   | Purpose               |
| ------------------------ | ----------------------- | --------------------- |
| `--background`           | `oklch(0.12 0.02 145)`  | Page background       |
| `--background-light`     | `oklch(0.16 0.025 145)` | Elevated background   |
| `--foreground`           | `oklch(0.65 0 0)`       | Default body text     |
| `--primary`              | `oklch(0.98 0 0)`       | Headlines, CTAs       |
| `--primary-foreground`   | `oklch(0.12 0.02 145)`  | Text on primary fills |
| `--secondary`            | `oklch(0.22 0.015 145)` | Subdued surfaces      |
| `--secondary-foreground` | `oklch(0.65 0 0)`       | Text on secondary     |
| `--muted`                | `oklch(0.2 0.012 145)`  | Disabled backgrounds  |
| `--muted-foreground`     | `oklch(0.55 0 0)`       | Captions, hints       |
| `--accent`               | `oklch(0.75 0.25 350)`  | Primary accent (pink) |
| `--accent-foreground`    | `oklch(0.12 0.02 145)`  | Text on accent fills  |
| `--destructive`          | `oklch(0.65 0.25 25)`   | Error / destructive   |
| `--border`               | `oklch(0.28 0.015 145)` | Borders, dividers     |
| `--input`                | `oklch(0.22 0.015 145)` | Input backgrounds     |
| `--ring`                 | `oklch(0.75 0.25 350)`  | Focus rings           |

---

### Chart Colors

| Token       | Value                 |
| ----------- | --------------------- |
| `--chart-1` | `var(---pink)`        |
| `--chart-2` | `var(---purple)`      |
| `--chart-3` | `var(---orange)`      |
| `--chart-4` | `oklch(0.7 0.2 20)`   |
| `--chart-5` | `oklch(0.75 0.2 120)` |

---

### Color Rules

- Use identity colors for interactive elements, badges, and highlights
- Maintain high contrast between text and backgrounds
- Use white selectively for hierarchy
- Distribute accent colors across UI elements

**Never:**

- Use blue
- Use pure black (`#000000`)
- Stack similar background tones
- Use accent colors for long-form text

---

## Typography

### Typeface

- `'DM Sans', 'DM Sans Fallback', system-ui, sans-serif`
- Monospace: `'DM Mono', 'Geist Mono', monospace`

---

### Type Scale

| Level   | Size            | Weight | Line Height | Use Case          |
| ------- | --------------- | ------ | ----------- | ----------------- |
| Display | 72px / 4.5rem   | 700    | 0.9         | Hero headlines    |
| H1      | 48px / 3rem     | 700    | 1.0         | Page titles       |
| H2      | 36px / 2.25rem  | 600    | 1.1         | Section headers   |
| H3      | 24px / 1.5rem   | 600    | 1.2         | Subsections       |
| H4      | 20px / 1.25rem  | 500    | 1.3         | Card titles       |
| Body    | 16px / 1rem     | 400    | 1.6         | Paragraph text    |
| Small   | 14px / 0.875rem | 400    | 1.5         | Secondary text    |
| Caption | 12px / 0.75rem  | 500    | 1.4         | Metadata / labels |

---

### Text Color Hierarchy

| Level     | Token                |
| --------- | -------------------- |
| Primary   | `--primary`          |
| Body      | `--foreground`       |
| Secondary | `--muted-foreground` |
| Accent    | `---*`               |

---

## Spacing

Base unit: **4px**

| Token | Value |
| ----- | ----- |
| xs    | 4px   |
| sm    | 8px   |
| md    | 12px  |
| base  | 16px  |
| lg    | 24px  |
| xl    | 32px  |
| 2xl   | 48px  |
| 3xl   | 64px  |

---

## Border Radius

| Token         | Value                       |
| ------------- | --------------------------- |
| `--radius`    | `0.5rem`                    |
| `--radius-sm` | `calc(var(--radius) - 4px)` |
| `--radius-md` | `calc(var(--radius) - 2px)` |
| `--radius-lg` | `var(--radius)`             |
| `--radius-xl` | `calc(var(--radius) + 4px)` |

---

## Icons

- Library: `@phosphor-icons/react`
- Default size: `24px`
- Default weight: `regular`

### Colors

| Context | Class                   |
| ------- | ----------------------- |
| Default | `text-foreground`       |
| Accent  | `text-neon-pink`        |
| Info    | `text-neon-purple`      |
| Warning | `text-neon-orange`      |
| Muted   | `text-muted-foreground` |

---

## Components

### Buttons

- Primary: solid accent or white fill, `rounded-md`, `px-6 py-3`
- Secondary: bordered
- Ghost: text only

---

### Badges

- 4px radius
- tinted background + matching text
- uppercase small labels
- color="gray" has no bg, font-medium
- color="white" bg-foreground/50 text-white
- color='!gray !white' font-semibold, bg-<color>/15, text-<color>
- onClick prop makes it interactive so it responds to hover subtly

props extend GlobalComponentPropsT
type ZBadgePropsT = GlobalComponentPropsT & {...}
props.color=gray white purple pink orange red
has only one size.
common classes = px-2 py-1 rounded text-xs
colored classes = font-semibold bg-<color>/15 text-<color>
gray classes = font-medium text-muted-foreground border border-border
white classes = bg-foreground/50 text-white

example color:purple <span class="bg-purple/15 text-purple text-xs font-semibold px-2 py-1 rounded">Active</span>

example color:orange <span class="bg-orange/15 text-orange text-xs font-semibold px-2 py-1 rounded">Draft</span>

example color:gray <span class="text-muted-foreground text-xs font-medium border border-border px-2 py-1 rounded">Archived</span>

```tsx
<ZBadge color="white" label="foo" />
<ZBadge color="purple">foo</ZBadge>
<ZBadge color="orange">foo</ZBadge>
<ZBadge color="pink">foo</ZBadge>
<ZBadge color="gray">foo</ZBadge>
<ZBadge color="red">foo</ZBadge>

<ZBadge color="pink" onClick={func}>future-bass +</ZBadge>
```

---

### Cards

- `border border-border rounded-lg p-6`
- no shadows
- hover = subtle border shift

example <div class="border border-border rounded-lg p-6 hover:border-foreground/30 transition-colors"><div class="TopRow flex items-center justify-between mb-4"><ZBadge color="purple">Active</ZBadge><span class="text-muted-foreground text-xs">2 min ago</span></div><h4 class="text-primary font-semibold text-lg mb-2">Project Alpha</h4><p class="text-foreground text-sm mb-4">Breaking conventions since day one. No rules, just results.</p><div class="flex items-center gap-2"><ZAvatar size="small" color="pink" url="img.png" /><span class="text-muted-foreground text-sm">@creator</span></div></div>

---

### Inputs

- `border border-border rounded-md`
- focus uses accent color
- error uses pink

---

### Tabs

- underline indicator
- no pill backgrounds

---

### Alerts

- tinted background + colored border
- icon + title + description

---

### Tables

- uppercase headers
- row hover background
- subtle borders

---

### Avatar

props size=small medium large
props color=white gray purple pink orange
example small pink classes: "w-6 h-6 rounded-full bg-pink"

## Scrollbar

- Size: `6px`
- Thumb: `oklch(0.3 0.015 145)`
- Hover: `oklch(0.4 0.015 145)`

---

## Background

```
from-[#050908] via-[#0a0f0a] to-[#0d120d]
```

Subtle green-tinted dark gradient.

---

## Sidebar

| Token                          | OKLCH                   |
| ------------------------------ | ----------------------- |
| `--sidebar`                    | `oklch(0.1 0.015 145)`  |
| `--sidebar-foreground`         | `oklch(0.65 0 0)`       |
| `--sidebar-primary`            | `oklch(0.98 0 0)`       |
| `--sidebar-primary-foreground` | `oklch(0.12 0.02 145)`  |
| `--sidebar-accent`             | `oklch(0.75 0.25 350)`  |
| `--sidebar-accent-foreground`  | `oklch(0.12 0.02 145)`  |
| `--sidebar-border`             | `oklch(0.25 0.015 145)` |
| `--sidebar-ring`               | `oklch(0.75 0.25 350)`  |

---

## Constraints & Hard Rules

1. Dark only
2. No pure black
3. No shadows
4. Accent colors only for highlights
5. White is hierarchical / indicative
6. Phosphor Icons only
7. DM Sans only
8. OKLCH everywhere
9. Borders define structure
