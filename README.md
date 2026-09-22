# Yash Kantheti — personal portfolio

A static, aviation-inspired portfolio focused on AI/ML projects, research, and achievements. The original charcoal, mocha, and cream palette is retained with small rose accents.

## Run locally

From this folder, run:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000. There is no build step or package installation. Opening `index.html` directly also works, except that clipboard access depends on browser security settings.

## Files

- `index.html`: portfolio content, projects, research, achievements, and technology lists.
- `style.css`: responsive layouts, both themes, and animations.
- `script.js`: project filters, mobile navigation, theme/motion preferences, flight interaction, and email copying.
- `assets/aircraft.svg`: original F-35-inspired vector illustration, not a technical aircraft schematic.
- `favicon.svg`: portfolio monogram.
- `CNAME`: existing GitHub Pages domain.
- `.openai/hosting.json`: the separate Sites project's identity and static hosting configuration.

## Content and accessibility

The five original projects and existing achievements are preserved. Project graphics are conceptual illustrations, not screenshots or measured model outputs. Technology names come from the existing portfolio and its project descriptions; there are no proficiency scores or meters.

The previous terminal, Matrix backdrop, and automated news feed are replaced with the aviation theme. The old resume link was removed because the repository does not contain `resume.pdf`; add the actual file before restoring a download link.

Controls support keyboard focus, the mobile menu closes with Escape, project details use native disclosure elements, and the page respects system reduced-motion settings. Motion can also be paused manually. Theme and motion preferences persist when storage is available. Fonts have local fallbacks if Google Fonts cannot load.

## Verification

JavaScript syntax and Git whitespace checks passed. Static validation covers HTML nesting, unique IDs, anchor and ARIA targets, asset paths, SVG parsing, and preservation of all projects and the custom-domain file. Browser visual and interaction verification still needs to be completed in a connected browser.
