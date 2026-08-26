# Prototir Web examples

Small, upload-ready examples for browser-native prototypes on
[Prototir](https://prototir.com). Each folder is an independent static bundle with `index.html` and
`prototir.json` at its root.

| Example | What it demonstrates |
| --- | --- |
| [`starter`](starter) | Lifecycle, events, scores, responsive layout, and touch-safe controls. |
| [`sdk-playground`](sdk-playground) | Persistent storage, deterministic randomness, and managed AI error handling. |
| [`three-starter`](three-starter) | A responsive Three.js scene using a declared Prototir module. |

## Test on Prototir

1. Open one example folder.
2. ZIP the files inside that folder, not the folder itself.
3. Upload the ZIP as a new prototype.
4. Test desktop/mobile input, resize, fullscreen, Escape, and any SDK feature used by the example.

The examples load Web SDK `v0.1.0` from the immutable Prototir CDN. The Three.js example declares
`three@0.170.0` in `prototir.json`; Prototir injects its import map during upload, so opening that
example directly from disk is not equivalent to playing the uploaded bundle.

Run the repository checks with Node.js 20 or newer:

```bash
npm run check
```

See the [Web creator guide](https://prototir.com/docs/creators?runtime=web#setup) and
[Web SDK](https://github.com/prototir/web-sdk) for the complete contract.
