# UI consistency: make new screens look like the product

Use when adding or changing a screen, component or styles. Goal: the result sits next to the existing screens without anyone noticing which parts were AI-written.

- **Match the product first.** Before writing markup or styles, open two or three existing screens and the shared styles. Reuse existing components, the spacing scale, color and typography tokens, icons and the UI library's patterns. If a token or component exists, use it; do not hard-code a new hex value, pixel size or font.
- **Say what you reused.** In the summary list the existing components and tokens you used, and what you had to add and why.
- **Avoid generic AI-looking patterns unless the repo already uses them:** a thick colored left-border accent on cards, alerts or list items; purple-to-blue or any gradient backgrounds and gradient text; glass or blur cards; large corner radius plus heavy shadow on every container; emoji as icons or bullets; a centered hero followed by three identical feature cards; a grid of identical cards for everything; decorative animation (pulsing dots, shimmer); fake statistics or lorem placeholder copy; a default indigo or purple palette when the product has its own; uppercase wide-tracked labels everywhere; badge pills on everything.
- **Prefer plain structure:** semantic HTML, the repo's layout components, one accent color from the existing palette, restrained borders and shadows.
- **Check before presenting:** put the new screen next to an existing one and ask whether it looks like the same product. Check that meaning does not depend on color alone, focus is visible, contrast is adequate, and loading, empty and error states are styled like the rest of the app.
- Styling stays last in the delivery rhythm, and the CSS diff stays small.
