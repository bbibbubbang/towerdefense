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

// Populate inventory with placeholder items
for (let i = 1; i <= 30; i++) {
  const item = document.createElement('div');
  item.className = 'item';
  item.textContent = i;
  inventory.appendChild(item);
}

document.querySelectorAll('#bottom-bar button').forEach(btn => {
  btn.addEventListener('click', () => {
    const screen = btn.getAttribute('data-screen');
    screens.forEach(sec => sec.classList.add('hidden'));
    if (screen === 'equipment') {
      document.getElementById('equipment-screen').classList.remove('hidden');
    } else {
      document.getElementById('main-screen').classList.remove('hidden');
    }
  });
});
