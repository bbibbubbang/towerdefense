// Enter full screen on any click if not already full screen
function requestFullScreen() {
  if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen().catch(() => {});
  }
}

document.addEventListener('click', requestFullScreen);

// Screen switching
const screens = document.querySelectorAll('.screen');
const inventory = document.getElementById('inventory');

// Populate inventory with actual items (no empty slots or numbering)
const items = ['🗡️', '🛡️', '🎯'];
items.forEach(icon => {
  const item = document.createElement('div');
  item.className = 'item';
  item.textContent = icon;
  inventory.appendChild(item);
});

// Stage selection data and helpers
const stages = [
  { number: 1, hp: null },
  { number: 2, hp: 40 },
  { number: 3, hp: 80 },
  { number: 4, hp: 96 }
];
let currentStage = 0;
const stageNumberEl = document.getElementById('stage-number');
const stageStarsEl = document.getElementById('stage-stars');

function stageStars(hp) {
  if (hp == null) return '☆☆☆';
  if (hp < 50) return '★☆☆';
  if (hp < 95) return '★★☆';
  return '★★★';
}

function updateStage() {
  const stage = stages[currentStage];
  stageNumberEl.textContent = `스테이지 ${stage.number}`;
  stageStarsEl.textContent = stageStars(stage.hp);
}

document.getElementById('prev-stage').addEventListener('click', () => {
  if (currentStage > 0) {
    currentStage--;
    updateStage();
  }
});

document.getElementById('next-stage').addEventListener('click', () => {
  if (currentStage < stages.length - 1) {
    currentStage++;
    updateStage();
  }
});

updateStage();

document.querySelectorAll('#bottom-bar button').forEach(btn => {
  btn.addEventListener('click', () => {
    const screen = btn.getAttribute('data-screen');
    screens.forEach(sec => sec.classList.add('hidden'));
    if (screen === 'equipment') {
      document.getElementById('equipment-screen').classList.remove('hidden');
    } else if (screen === 'stage') {
      document.getElementById('stage-screen').classList.remove('hidden');
    } else {
      document.getElementById('main-screen').classList.remove('hidden');
    }
  });
});
