# Prompt: Add Supplementary Sections to Existing CS04 & CS05 Product Pages

## Context

The GMIC.AI website already has product pages for the CS series card-style AI voice recorders:
- `products/cs04/index.html` — SlimCard (HA-CS04)
- `products/cs05/index.html` — ProCard (HA-CS05)

Both pages share the same section structure:
1. HERO
2. BUILT FOR (3 cards: who it's for)
3. BUYING OPTIONS (3 cards: finished device / case / white-label)
4. HARDWARE (specs snapshot with lifestyle image)
5. AI OUTPUT (4 image cards: transcription, playback, summary, mind map)
6. DATA PATHS (4 paths: BLE sync, streaming, Wi-Fi transfer, cloud upload)
7. WORKFLOWS / Use cases (4 image cards)
8. SAMPLES & VOLUME (checklist)
9. FAQ (accordion)
10. SPECS (key-value table)
11. CTA (final call-to-action)

These pages are missing three important sections that Trigg requested. **Your task is to ADD these three new sections into BOTH existing product pages WITHOUT replacing or rewriting any existing section.** Insert them into the page flow as described below.

---

## ⚠️ Unverified Feature Disclaimer Requirement

**Trigg's instruction:** "未验证的部分先标为场景示意或待确认，不作已实现承诺。"

Any feature or capability that has NOT been verified on actual hardware must include a visual disclaimer. Specifically:

### Features that MUST be marked as "To be confirmed":
- **Noise performance in crowded/noisy environments** (e.g., trade show floors) — recording quality in high-noise scenarios is not yet validated
- **Real-time translation on display** (CS05 only) — this feature is listed in specs but not yet verified in production
- **Bone-conduction mic performance** — described in specs but real-world effectiveness is unverified
- **Specific recording range or pickup claims** (e.g., "captures every speaker around the table") — not yet measured

### Features that are CONFIRMED (no disclaimer needed):
- Physical dimensions, weight, battery capacity
- Number of microphones (hardware count)
- Bluetooth 5.3 + Wi-Fi 2.4 GHz connectivity
- Storage options (16/32/64 GB)
- MagSafe compatibility (CS04 via leather case + ring; CS05 built-in magnets)
- USB-C charging (CS05) / Pogo-pin charging (CS04)
- AI transcription, summary, mind map (these are app-side features, confirmed)

### How to mark unverified features in HTML:
Add a small inline tag after unverified claims using the existing `.st` badge pattern:

```html
<span class="st st-warn" title="This scenario is illustrative — feature to be confirmed">Scenario illustration</span>
```

**CSS for the warning badge** — add this ONE rule inside the existing `<style>` block (do NOT create a new stylesheet):

```css
.st-warn{background:rgba(255,180,0,.15);color:#b8860b;}
@media(prefers-color-scheme:dark){.st-warn{background:rgba(255,180,0,.12);color:#f0c040;}}
```

Place the `<span class="st st-warn">` tag:
- After any description text that mentions noise handling or crowded-environment performance
- After "Real-time translation on display" mentions (CS05)
- After claims about bone-conduction mic performance in specific scenarios
- After any "360° pickup" or specific range claims

---

## Task: Add Three New Sections

### Insertion Points

Insert these sections in this order, **between the existing "HARDWARE" section and the "AI OUTPUT" section**:

1. **TRADE SHOW SCENARIOS** — immediately after HARDWARE
2. **HOW TO CARRY** — after TRADE SHOW SCENARIOS
3. **HOW IT WORKS** (usage flow) — after HOW TO CARRY, immediately before AI OUTPUT

This placement makes sense because: the user has just seen the hardware → now they see WHERE to use it (scenarios) → HOW to carry it there → HOW it works step-by-step → then the existing AI OUTPUT section shows what happens after recording.

---

## Section 1: TRADE SHOW SCENARIOS

**Purpose:** Show B2B buyers that this card recorder is ideal for trade shows, exhibitions, and professional events — a key selling scenario for GMIC's target customers.

**Layout:** Use the existing page's alternating section pattern (`.m5-sec .m5-light` / `.m5-soft`). Since HARDWARE is `.m5-light`, this section should be `.m5-soft`. Use a 4-card grid layout similar to the existing "WORKFLOWS" section's `.imgcards` pattern.

**Content for BOTH CS04 and CS05:**

```
Section eyebrow: "Trade show scenarios"
Section heading: "Capture every conversation on the show floor."
Section lead: "Trade shows move fast — dozens of meetings, hundreds of contacts, critical details exchanged at every booth. SlimCard/ProCard captures it all so nothing gets lost."

Scene 1: Booth Conversations
- Image: img/use-1.jpg (reuse existing)
- Title: "Booth conversations"
- Description: "Record product demos, pricing discussions and partnership talks at your booth without taking notes."

Scene 2: Walking the Floor
- Image: img/use-2.jpg (reuse existing)
- Title: "Walking the floor"
- Description: "Slip it in your pocket or snap it to your phone — capture supplier meetings and competitor insights as you move between halls."
- ⚠️ Add disclaimer tag after description: recording quality in noisy hall environments is unverified.

Scene 3: After-Hours Networking
- Image: img/use-3.jpg (reuse existing)
- Title: "After-hours networking"
- Description: "Dinners, hotel lobby meetings, evening events — record informal conversations where the real deals happen."

Scene 4: Post-Show Follow-Up
- Image: img/use-4.jpg (reuse existing)
- Title: "Post-show follow-up"
- Description: "AI turns two days of recordings into transcripts, summaries and action items — send follow-ups the next morning."
```

**HTML pattern** (follow the existing `.imgcards` grid used in the WORKFLOWS section):

```html
<!-- TRADE SHOW SCENARIOS -->
<section class="m5-sec m5-soft fade-section">
  <div class="container">
    <div class="m5-head reveal">
      <div class="eyebrow">Trade show scenarios</div>
      <h2 class="section">Capture every conversation on the show floor.</h2>
      <p class="m5-lead">Trade shows move fast — dozens of meetings, hundreds of contacts, critical details exchanged at every booth. [SlimCard/ProCard] captures it all so nothing gets lost.</p>
    </div>
    <div class="imgcards reveal">
      <div class="imgcard">
        <img src="img/use-1.jpg" alt="Booth conversations at a trade show" loading="lazy">
        <div>
          <h3>Booth conversations</h3>
          <p>Record product demos, pricing discussions and partnership talks at your booth without taking notes.</p>
        </div>
      </div>
      <div class="imgcard">
        <img src="img/use-2.jpg" alt="Walking the trade show floor" loading="lazy">
        <div>
          <h3>Walking the floor</h3>
          <p>Slip it in your pocket or snap it to your phone — capture supplier meetings and competitor insights as you move between halls. <span class="st st-warn" title="Recording quality in noisy environments is to be confirmed">Scenario illustration</span></p>
        </div>
      </div>
      <div class="imgcard">
        <img src="img/use-3.jpg" alt="After-hours networking event" loading="lazy">
        <div>
          <h3>After-hours networking</h3>
          <p>Dinners, hotel lobby meetings, evening events — record informal conversations where the real deals happen.</p>
        </div>
      </div>
      <div class="imgcard">
        <img src="img/use-4.jpg" alt="Post-show follow-up with AI summaries" loading="lazy">
        <div>
          <h3>Post-show follow-up</h3>
          <p>AI turns two days of recordings into transcripts, summaries and action items — send follow-ups the next morning.</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

## Section 2: HOW TO CARRY

**Purpose:** Show the three practical carrying methods. This is NOT a badge worn on a lanyard — it's a card that goes in a pocket, snaps onto a phone, or rides in a leather case.

**Layout:** `.m5-sec .m5-light` (alternates from previous soft section). Use a 3-column card grid (`.m5-grid-3` with `.m5-card` pattern from the existing page).

**Content — CS04 (SlimCard):**

```
Section eyebrow: "How to carry"
Section heading: "Three ways to keep it with you."
Section lead: "SlimCard is 3.0 mm thin and 30 g light — thinner than two credit cards. No lanyard, no clip, no fuss."

Card 1: MagSafe Phone Mount
- Icon: lucide "smartphone" 
- Title: "Snap to your phone"
- Description: "Attach SlimCard to the back of any MagSafe-compatible phone using the included leather case and magnetic ring. It rides with the device you already carry."
- Bullet points:
  • Included MagSafe leather case
  • Magnetic ring for non-MagSafe phones
  • Instant attach / detach

Card 2: Pocket Carry
- Icon: lucide "shirt"
- Title: "Slip into a pocket"
- Description: "At 85 × 55 × 3.0 mm, SlimCard is the size of a hotel key card. Drop it in a shirt pocket, jacket pocket or badge holder."
- Bullet points:
  • 30 g — lighter than most keycards
  • No clip or holster needed
  • Works through fabric

Card 3: Leather Case
- Icon: lucide "wallet"
- Title: "Leather case"
- Description: "The included MagSafe leather case protects the device and doubles as a magnetic mount. Carry it like a card wallet."
- Bullet points:
  • Included in the box
  • Protects the aluminum body
  • MagSafe-compatible mounting
```

**Content — CS05 (ProCard):**

```
Section eyebrow: "How to carry"
Section heading: "Three ways to keep it with you."
Section lead: "ProCard is 4.6 mm thin and 53 g — still thinner than most phones. Built-in magnets mean no case is required."

Card 1: MagSafe Phone Mount
- Icon: lucide "smartphone"
- Title: "Snap to your phone"
- Description: "ProCard has built-in magnets — attach it directly to any MagSafe-compatible phone. No case or ring needed."
- Bullet points:
  • Built-in magnets (no extra accessories)
  • Works with MagSafe cases
  • Instant attach / detach

Card 2: Pocket Carry
- Icon: lucide "shirt"
- Title: "Slip into a pocket"
- Description: "At 91 × 57 × 4.6 mm, ProCard fits in any shirt or jacket pocket. The 0.96″ display faces up so you can glance at status."
- Bullet points:
  • 53 g — lighter than most phones
  • No clip or holster needed
  • Glanceable LCD display

Card 3: Desk / Table
- Icon: lucide "monitor"
- Title: "Lay it on the table"
- Description: "In a meeting room or at a booth, place ProCard flat on the table. The five microphones pick up voices from around the table."
- ⚠️ Add disclaimer tag after "pick up voices from around the table": 360° pickup range is unverified.
- Bullet points:
  • 5 mics for multi-direction pickup <span class="st st-warn">To be confirmed</span>
  • Real-time translation on display <span class="st st-warn">To be confirmed</span>
  • Vibration reminder when recording
```

**HTML pattern** (follow the existing `.m5-grid-3` / `.m5-card` pattern):

```html
<!-- HOW TO CARRY -->
<section class="m5-sec m5-light fade-section">
  <div class="container">
    <div class="m5-head reveal">
      <div class="eyebrow">How to carry</div>
      <h2 class="section">Three ways to keep it with you.</h2>
      <p class="m5-lead">[CS04: SlimCard is 3.0 mm thin and 30 g light — thinner than two credit cards. No lanyard, no clip, no fuss.]
      [CS05: ProCard is 4.6 mm thin and 53 g — still thinner than most phones. Built-in magnets mean no case is required.]</p>
    </div>
    <div class="m5-grid-3 reveal">
      <div class="m5-card">
        <div class="m5-card-ico"><i data-lucide="smartphone"></i></div>
        <h3>Snap to your phone</h3>
        <p>[description per product]</p>
        <ul class="m5-bullets">
          <li><i data-lucide="check"></i>[bullet 1]</li>
          <li><i data-lucide="check"></i>[bullet 2]</li>
          <li><i data-lucide="check"></i>[bullet 3]</li>
        </ul>
      </div>
      <div class="m5-card">
        <div class="m5-card-ico"><i data-lucide="shirt"></i></div>
        <h3>Slip into a pocket</h3>
        <p>[description per product]</p>
        <ul class="m5-bullets">
          <li><i data-lucide="check"></i>[bullet 1]</li>
          <li><i data-lucide="check"></i>[bullet 2]</li>
          <li><i data-lucide="check"></i>[bullet 3]</li>
        </ul>
      </div>
      <div class="m5-card">
        <div class="m5-card-ico"><i data-lucide="wallet"></i></div>
        <!-- CS04: "Leather case" / CS05: "Lay it on the table" with lucide "monitor" -->
        <h3>[title per product]</h3>
        <p>[description per product]</p>
        <ul class="m5-bullets">
          <li><i data-lucide="check"></i>[bullet 1]</li>
          <li><i data-lucide="check"></i>[bullet 2] <!-- CS05: add st-warn tag for unverified features --></li>
          <li><i data-lucide="check"></i>[bullet 3]</li>
        </ul>
      </div>
    </div>
  </div>
</section>
```

---

## Section 3: HOW IT WORKS (Usage Flow)

**Purpose:** A simple numbered step-by-step showing the user journey from pressing the button to getting AI output. Bridges the gap between "here's the hardware" and "here's what AI does with it."

**Layout:** `.m5-sec .m5-soft` (alternates). Use the existing `.paths` layout pattern from the DATA PATHS section (numbered vertical list), but with a cleaner "step" feel.

**Content for BOTH CS04 and CS05** (minor differences noted):

```
Section eyebrow: "How it works"
Section heading: "From press to transcript in four steps."

Step 1:
- Icon: lucide "power"
- Title: "Press to record"
- CS04: "Press the button to start recording. A vibration confirms it's on. Use the side switch to change recording mode."
- CS05: "Press the button to start recording. The LCD shows recording time, mode and battery. Use the side switch to change recording mode."

Step 2:
- Icon: lucide "wifi"
- Title: "Sync to your phone or cloud"
- Both: "Connect via Bluetooth or Wi-Fi to transfer recordings to your phone app, or upload directly to your cloud server."

Step 3:
- Icon: lucide "brain"
- Title: "AI processes the audio"
- Both: "The paired AI app transcribes, summarizes and organizes your recordings — with speaker identification and key-point extraction."

Step 4:
- Icon: lucide "share-2"
- Title: "Search, share, act"
- Both: "Search across all your recordings. Share transcripts and summaries with your team. Export action items to your CRM or project tool."
```

**HTML pattern** (follow the existing `.paths` pattern from DATA PATHS):

```html
<!-- HOW IT WORKS -->
<section class="m5-sec m5-soft fade-section">
  <div class="container">
    <div class="m5-head reveal">
      <div class="eyebrow">How it works</div>
      <h2 class="section">From press to transcript in four steps.</h2>
    </div>
    <div class="paths reveal">
      <div class="path">
        <div class="n"><i data-lucide="power"></i></div>
        <div>
          <h3>Press to record</h3>
          <p>[CS04: Press the button to start recording. A vibration confirms it's on. Use the side switch to change recording mode.]
          [CS05: Press the button to start recording. The LCD shows recording time, mode and battery. Use the side switch to change recording mode.]</p>
        </div>
        <span class="st st-ok">Step 1</span>
      </div>
      <div class="path">
        <div class="n"><i data-lucide="wifi"></i></div>
        <div>
          <h3>Sync to your phone or cloud</h3>
          <p>Connect via Bluetooth or Wi-Fi to transfer recordings to your phone app, or upload directly to your cloud server.</p>
        </div>
        <span class="st st-ok">Step 2</span>
      </div>
      <div class="path">
        <div class="n"><i data-lucide="brain"></i></div>
        <div>
          <h3>AI processes the audio</h3>
          <p>The paired AI app transcribes, summarizes and organizes your recordings — with speaker identification and key-point extraction.</p>
        </div>
        <span class="st st-ok">Step 3</span>
      </div>
      <div class="path">
        <div class="n"><i data-lucide="share-2"></i></div>
        <div>
          <h3>Search, share, act</h3>
          <p>Search across all your recordings. Share transcripts and summaries with your team. Export action items to your CRM or project tool.</p>
        </div>
        <span class="st st-ok">Step 4</span>
      </div>
    </div>
  </div>
</section>
```

---

## Key Product Specs Reference (use these, NOT guesses)

### HA-CS04 "SlimCard"
- No display (LED indicator only)
- 3 microphones: 2 omnidirectional + 1 bone-conduction
- Dimensions: 85 × 55 × 3.0 mm
- Weight: 30 g
- Battery: ~25 hours, 400 mAh, magnetic pogo-pin charging
- Connectivity: Bluetooth 5.3 + Wi-Fi 2.4 GHz
- Storage: 16 / 32 / 64 GB
- Body: aluminum alloy
- MagSafe via included leather case + magnetic ring
- Controls: power/record button + recording-mode switch
- Vibration reminder

### HA-CS05 "ProCard"
- 0.96″ LCD display (80 × 160 pixels)
- 5 microphones: 4 omnidirectional + 1 bone-conduction
- Dimensions: 91 × 57 × 4.6 mm
- Weight: 53 g
- Battery: ~30 hours, 600 mAh, USB-C charging
- Connectivity: Bluetooth 5.3 + Wi-Fi 2.4 GHz
- Storage: 16 / 32 / 64 GB
- Body: aluminum alloy
- Built-in magnets (no case needed for MagSafe)
- Controls: power/record button + recording-mode switch
- Vibration reminder
- Real-time translation on display (**unverified — mark as TBC**)

---

## Implementation Instructions

1. **Open `products/cs04/index.html`**. Find the comment `<!-- AI OUTPUT -->`. Insert the three new sections BEFORE that comment (i.e., after the `<!-- HARDWARE -->` section's closing `</section>` tag).

2. **Open `products/cs05/index.html`**. Do the same insertion at the same point, using CS05-specific content where noted above.

3. **Do NOT** change any existing section — no edits to HERO, BUILT FOR, BUYING OPTIONS, HARDWARE, AI OUTPUT, DATA PATHS, WORKFLOWS, SAMPLES/VOLUME, FAQ, SPECS, or CTA.

4. **Do NOT** add any new CSS file. Reuse the existing CSS classes already defined in the page: `.m5-sec`, `.m5-light`, `.m5-soft`, `.m5-head`, `.m5-lead`, `.m5-grid-3`, `.m5-card`, `.m5-card-ico`, `.m5-bullets`, `.imgcards`, `.imgcard`, `.paths`, `.path`, `.eyebrow`, `.reveal`, `.fade-section`, `.container`, etc. These are all already styled. **Exception:** Add the ONE `.st-warn` CSS rule documented in the disclaimer section above — insert it inside the existing `<style>` block in the page.

5. **Do NOT** add any new JavaScript. The existing `lucide.createIcons()` and scroll-reveal scripts will automatically pick up new sections.

6. **Alternate section backgrounds** correctly: HARDWARE is `.m5-light`, so the new sections should go: `.m5-soft` (Trade Show) → `.m5-light` (How to Carry) → `.m5-soft` (How it Works) → then the existing AI OUTPUT is `.m5-soft`, so adjust AI OUTPUT to `.m5-light` to maintain the alternation, OR keep it `.m5-soft` and make "How it Works" `.m5-dark` for visual variety.

7. **Image paths** are relative: `img/use-1.jpg` etc. These images already exist in both `products/cs04/img/` and `products/cs05/img/`.

8. All text must be in **English**.

9. The brand on the website is **GMIC.AI** (not hearit.ai).

10. **Unverified features:** Apply `<span class="st st-warn" title="...">Scenario illustration</span>` or `<span class="st st-warn">To be confirmed</span>` tags as documented in the disclaimer section above. Do NOT present unverified capabilities as confirmed features.
