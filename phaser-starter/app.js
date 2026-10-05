import * as Phaser from 'phaser';

// Orbs fall from the top; tapping one scores a point. A missed orb ends the round and reports the
// score, so the Prototir page shows a leaderboard-ready number for every real play.
class Orbs extends Phaser.Scene {
  constructor() {
    super('orbs');
    this.score = 0;
  }

  create() {
    this.scoreText = this.add.text(24, 20, 'Score 0', { fontFamily: 'system-ui', fontSize: '22px', color: '#f5f7fb' });
    this.time.addEvent({ delay: 700, loop: true, callback: () => this.spawn() });
    this.input.on('gameobjectdown', (_pointer, orb) => {
      orb.destroy();
      this.score += 1;
      this.scoreText.setText(`Score ${this.score}`);
      Prototir.event('orb_caught');
    });
  }

  spawn() {
    const { width } = this.scale;
    const orb = this.add.circle(Phaser.Math.Between(40, width - 40), -30, 26, 0x65a6ff).setInteractive();
    this.tweens.add({
      targets: orb,
      y: this.scale.height + 40,
      duration: Phaser.Math.Between(2200, 3400),
      onComplete: () => {
        if (!orb.active) return;
        orb.destroy();
        this.endRound();
      }
    });
  }

  endRound() {
    Prototir.score(this.score);
    Prototir.event('round_over', { score: this.score });
    this.score = 0;
    this.scoreText.setText('Score 0');
  }
}

new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#070910',
  scale: { mode: Phaser.Scale.RESIZE, width: '100%', height: '100%' },
  scene: Orbs,
  callbacks: { postBoot: () => Prototir.ready() }
});
