import { Application, Graphics } from 'pixi';

// A field of shapes you can drag around. Each drop is reported as an event, so the Prototir page
// shows how people actually play with it.
const app = new Application();
await app.init({ resizeTo: window, background: '#070910', antialias: true });
app.canvas.setAttribute('aria-label', 'Draggable blue shapes');
document.body.prepend(app.canvas);

const colors = [0x65a6ff, 0x9cc3ff, 0x3d7bd9];
for (let i = 0; i < 12; i++) {
  const shape = new Graphics();
  if (i % 2) shape.circle(0, 0, 28 + (i % 3) * 8);
  else shape.roundRect(-30, -30, 60, 60, 12);
  shape.fill(colors[i % colors.length]);
  shape.position.set(Math.random() * app.screen.width, Math.random() * app.screen.height);
  shape.eventMode = 'static';
  shape.cursor = 'grab';
  shape.on('pointerdown', (event) => {
    app.stage.addChild(shape);
    const offset = event.getLocalPosition(shape);
    const move = (moveEvent) => {
      const point = moveEvent.getLocalPosition(app.stage);
      shape.position.set(point.x - offset.x, point.y - offset.y);
    };
    // One handler ends the drag however it ends, so nothing is left listening afterwards.
    const end = () => {
      app.stage.off('globalpointermove', move);
      app.stage.off('pointerup', end);
      app.stage.off('pointerupoutside', end);
      Prototir.event('shape_dropped');
    };
    app.stage.on('globalpointermove', move);
    app.stage.on('pointerup', end);
    app.stage.on('pointerupoutside', end);
  });
  app.stage.addChild(shape);
}
app.stage.eventMode = 'static';
app.stage.hitArea = app.screen;

Prototir.ready();
