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
const prevStageBtn = document.getElementById('prev-stage');
const nextStageBtn = document.getElementById('next-stage');

function stageStars(hp) {
  if (hp == null) return '';
  if (hp < 50) return '★';
  if (hp < 95) return '★★';
  return '★★★';
}

function updateStage() {
  const stage = stages[currentStage];
  stageNumberEl.textContent = `스테이지 ${stage.number}`;
  stageStarsEl.textContent = stageStars(stage.hp);
  prevStageBtn.disabled = currentStage === 0;
  nextStageBtn.disabled = currentStage === stages.length - 1 || stage.hp === null;
}

prevStageBtn.addEventListener('click', () => {
  if (currentStage > 0) {
    currentStage--;
    updateStage();
  }
});

nextStageBtn.addEventListener('click', () => {
  if (currentStage < stages.length - 1 && stages[currentStage].hp !== null) {
    currentStage++;
    updateStage();
  }
});

updateStage();

// Stage action buttons
const huntButton = document.getElementById('hunt-button');
const challengeButton = document.getElementById('challenge-button');
const rewardButton = document.getElementById('reward-button');

function handleStageAction(action) {
  // Placeholder for stage progression logic such as energy deduction or screen change
  alert(`${action} 기능은 준비 중입니다.`);
}

huntButton.addEventListener('click', () => handleStageAction('토벌'));
challengeButton.addEventListener('click', () => handleStageAction('도전'));
rewardButton.addEventListener('click', () => handleStageAction('보상'));

const bottomBarButtons = document.querySelectorAll('#bottom-bar button');
bottomBarButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const screen = btn.getAttribute('data-screen');
    screens.forEach(sec => sec.classList.add('hidden'));
    if (screen === 'equipment') {
      document.getElementById('equipment-screen').classList.remove('hidden');
    } else if (screen === 'stage') {
      document.getElementById('stage-screen').classList.remove('hidden');
      updateStage();
    } else {
      document.getElementById('main-screen').classList.remove('hidden');
    }
  });
});
