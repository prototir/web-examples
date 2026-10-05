# Babylon.js starter (Vite and npm)

A Babylon.js scene built with Vite, using the Prototir Web SDK from npm. Tap the spheres: each tap
sends an event, and `Prototir.ready()` runs once the first frame is on screen.

```bash
npm install
npm run dev      # local development
npm run build    # writes dist/
```

Upload the contents of `dist/` (ZIP the files inside it, not the folder). `public/prototir.json`
is copied to the root of `dist/` by the build.

## How the SDK is loaded

`main.js` imports the SDK from npm (`import { Prototir } from '@prototir/web-sdk'`), and
`index.html` also loads `/prototir.js`:

- **On Prototir**, `/prototir.js` is the current SDK, served by Prototir. The imported SDK finds it
  already running and uses it, so testers get new Feedback & tools without you rebuilding.
- **Anywhere else**, `/prototir.js` is not there, and the copy bundled from npm runs instead.

Import Babylon classes from their own files (`@babylonjs/core/Engines/engine`, ...) rather than
from `@babylonjs/core`: the package root pulls in the whole engine, about 6 MB, while this scene
builds to about 1 MB.
