const output = document.querySelector('#score');
const button = document.querySelector('#add');
let score = 0;

button.addEventListener('click', () => {
  score += 10;
  output.textContent = String(score);
  Prototir.event('points_added', { amount: 10 });
  Prototir.score(score);
});

Prototir.ready();
