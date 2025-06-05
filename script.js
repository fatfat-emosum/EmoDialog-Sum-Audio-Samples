let samples = [];
let currentIndex = 0;

function renderSample(index) {
  const container = document.getElementById('sample-container');
  container.innerHTML = ''; // Clear previous content

  const sample = samples[index];
  if (!sample) return;

  const card = document.createElement('div');
  card.className = 'card';

  card.innerHTML = `
    <div class="card-content">
      <p class="title is-4">${sample.id}</p>

      <div class="content">
        <p class="label">Transcript:</p>
        <p>${sample.transcript.replaceAll("\n", "<br>")}</p>

        <p class="label">Audio:</p>
        <audio controls>
          <source src="${sample.audio_url}" type="audio/wav">
          Your browser does not support the audio element.
        </audio>

        <p class="label">Emotion Summary:</p>
        <p>${sample.emotion_summary}</p>

        <p class="label">Paralinguistic Info:</p>
        <p>${sample.paralinguistic_info}</p>

        <p class="label">Generated Summary:</p>
        <p>${sample.generated_summary}</p>
      </div>
    </div>
  `;
  container.appendChild(card);
}

function updateButtons() {
  document.getElementById('prev-btn').disabled = currentIndex === 0;
  document.getElementById('next-btn').disabled = currentIndex === samples.length - 1;
}

fetch('samples.json')
  .then(response => response.json())
  .then(data => {
    samples = data;
    renderSample(currentIndex);
    updateButtons();
  })
  .catch(err => {
    document.getElementById('sample-container').innerHTML =
      `<p class="has-text-danger">Failed to load data: ${err}</p>`;
  });

document.getElementById('prev-btn').addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    renderSample(currentIndex);
    updateButtons();
  }
});

document.getElementById('next-btn').addEventListener('click', () => {
  if (currentIndex < samples.length - 1) {
    currentIndex++;
    renderSample(currentIndex);
    updateButtons();
  }
});
