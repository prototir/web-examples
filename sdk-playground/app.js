const visitsOutput = document.querySelector('#visits');
const dailyOutput = document.querySelector('#daily');
const generateButton = document.querySelector('#generate');
const result = document.querySelector('#result');

const previousVisits = Number.parseInt((await Prototir.storage.get('visits')) ?? '0', 10) || 0;
const visits = previousVisits + 1;
visitsOutput.textContent = String(visits);
await Prototir.storage.set('visits', String(visits));

const day = new Date().toISOString().slice(0, 10);
const random = Prototir.rng(day);
dailyOutput.textContent = String(Math.floor(random() * 9000) + 1000);

generateButton.addEventListener('click', async () => {
  generateButton.disabled = true;
  result.textContent = 'Generating…';
  try {
    result.textContent = await Prototir.ai.generate({
      prompt: 'Write one short, family-friendly quest hook for a tiny adventure game.',
      maxTokens: 60
    });
    Prototir.event('quest_generated');
  } catch (error) {
    result.textContent = `${error.code ?? 'error'}: ${error.message ?? 'The request failed.'}`;
  } finally {
    generateButton.disabled = false;
  }
});

Prototir.ready();
