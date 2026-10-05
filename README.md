# Prototir Web examples

Small, upload-ready examples for browser-native prototypes on
[Prototir](https://prototir.com). Each folder is an independent static bundle with `index.html` and
`prototir.json` at its root.

| Example | What it demonstrates |
| --- | --- |
| [`starter`](starter) | Lifecycle, events, scores, responsive layout, and touch-safe controls. |
| [`sdk-playground`](sdk-playground) | Persistent storage, deterministic randomness, and managed AI error handling. |
| [`three-starter`](three-starter) | A responsive Three.js scene using a declared Prototir module. |
| [`phaser-starter`](phaser-starter) | A small Phaser 4 game (tap the orbs) with events and a score, using a Prototir module. |
| [`pixi-starter`](pixi-starter) | Draggable shapes with PixiJS 8, using a Prototir module. |
| [`babylon-vite-starter`](babylon-vite-starter) | A Babylon.js scene built with Vite, with the SDK installed from npm. Build it, then upload `dist/`. |

## PlayCanvas

Projects made in the PlayCanvas editor are exported as a ZIP (Download in the editor's publish
panel) and uploaded like any other web build. Add the SDK to the exported `index.html`, before the
engine's scripts:

```html
<script src="/prototir.js"></script>
```

then call `Prototir.ready()` from a script once your scene has started, and `Prototir.event(...)`
or `Prototir.score(...)` where they mean something. Add a `prototir.json` beside `index.html` (copy
one from these examples) to describe the build. Projects that use the PlayCanvas engine from npm
follow the Babylon.js starter instead.

## Test on Prototir

1. Open one example folder.
2. ZIP the files inside that folder, not the folder itself.
3. Upload the ZIP as a new prototype.
4. Test desktop/mobile input, resize, fullscreen, Escape, and any SDK feature used by the example.

The examples load the current Web SDK through the sandbox's `/prototir.js` route. The Three.js example declares
`three@0.170.0` in `prototir.json`; Prototir injects its import map during upload, so opening that
example directly from disk is not equivalent to playing the uploaded bundle.

Run the repository checks with Node.js 20 or newer:

```bash
npm run check
```

See the [Web creator guide](https://prototir.com/docs/creators?runtime=web#setup) and
[Web SDK](https://github.com/prototir/web-sdk) for the complete contract.
