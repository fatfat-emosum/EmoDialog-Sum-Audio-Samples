let samples = [];
let currentIndex = 0;

function renderSample(index) {
  const container = document.getElementById('sample-container');
  container.innerHTML = '';

  const sample = samples[index];
  if (!sample) return;

  const card = document.createElement('div');
  card.className = 'sample-card';
  card.innerHTML = `
  <h4 class="title is-4">Sample ${index + 1}</h4>
  <div class="content-left">
    <p class="label">Transcript:</p>
    <p>${(sample.transcript || '').replaceAll("\n", "<br>")}</p>

    <p class="label">Audio:</p>
    <audio controls>
      <source src="${sample.audio_url || '#'}" type="audio/wav">
      Your browser does not support the audio element.
    </audio>

    <p class="label">Emotion Summary:</p>
    <p>${sample.emotion_summary || 'N/A'}</p>

    <p class="label">Generated Summary:</p>
    <p>${sample.generated_summary || 'N/A'}</p>
  </div>
`;
  container.appendChild(card);

  updateIndicators();
}

function updateIndicators() {
  const indicator = document.getElementById('indicator-dots');
  indicator.innerHTML = '';
  for (let i = 0; i < samples.length; i++) {
    const dot = document.createElement('span');
    if (i === currentIndex) dot.classList.add('active');
    indicator.appendChild(dot);
  }
}

document.getElementById('prev-btn').addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    renderSample(currentIndex);
  }
});

document.getElementById('next-btn').addEventListener('click', () => {
  if (currentIndex < samples.length - 1) {
    currentIndex++;
    renderSample(currentIndex);
  }
});

fetch('samples.json')
  .then(res => res.json())
  .then(data => {
    samples = data;
    renderSample(currentIndex);
  });