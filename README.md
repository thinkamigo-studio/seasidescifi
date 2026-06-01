# seasidescifi.com

Seaside Sci-Fi — at the intersection of the British seaside and cosmic horror.

A Thinkamigo production. Part of the Houdini Window transmedia universe.

---

## Setup checklist

- [ ] Create GitHub repository: `dreamtargets-studio/seasidescifi`
- [ ] Clone to Mac: `git clone [repo URL]`
- [ ] Create FTP account on 123-reg: `github@seasidescifi.com`
- [ ] Add four GitHub secrets to repo:
  - `FTP_SERVER`
  - `FTP_USERNAME` — `github@seasidescifi.com`
  - `FTP_PASSWORD`
  - `FTP_SERVER_DIR` — `/public_html/`
- [ ] Upload video files directly to 123-reg via FTP (not through GitHub):
  - `/assets/video/roker-waves.webm`
  - `/assets/video/roker-waves.mp4`
- [ ] Add OG image: `/assets/img/seasidescifi-og.jpg` (1200x630px)
- [ ] Push to main — GitHub Actions deploys automatically
- [ ] Verify live at seasidescifi.com

---

## Video preparation

Export from Adobe Premiere or convert via HandBrake:

- Clip: Roker waves slow motion footage
- Duration: 20-30 seconds, loops cleanly
- Resolution: 1280x720 (no need for 4K — background use only)
- WebM: VP9 codec — primary format, smallest file size
- MP4: H.264 codec — Safari fallback
- Target file size: under 5MB for WebM

Upload both files to `/assets/video/` on 123-reg via FTP.
Do not commit video files to GitHub — repo size limit.

---

## Teaser pool

Teasers live in `/assets/js/terminal.js` — the `teasers` array.

Current content: placeholder text in Cold War operational register.

Replace with real Houdini Window manuscript quotes once episode outline session complete.

Each teaser should be:
- 1-3 sentences maximum
- A fragment — not a summary, not an explanation
- Something that raises a question it does not answer
- Names, dates, grid references, incident logs work well

---

## CSS architecture

- `seaside.css` — Seaside Sci-Fi identity layer
- Shares Poppins, sentence case, hex-only colour values with Thinkamigo framework
- Does not load chassis.css — standalone landing page, no nav or footer required at this stage

---

## Colour tokens

| Token | Hex | Usage |
|---|---|---|
| `--ssf-void` | `#0d0f0e` | Page background |
| `--ssf-surface` | `#161a17` | Terminal panel |
| `--ssf-signal` | `#5aad72` | Primary accent, active elements |
| `--ssf-signal-dim` | `#2a6640` | Borders, underlines |
| `--ssf-transmission` | `#e8ede9` | Body text |
| `--ssf-static` | `#6b7f6e` | Muted text, labels |
| `--ssf-perimeter` | `#2a3d2e` | Borders, dividers |
| `--ssf-alert` | `#c0392b` | Terminated, warnings |
| `--ssf-classified` | `#d4a843` | Classified stamp |

---

*Thinkamigo Ltd — Paul Fillingham — thinkamigo.com*
