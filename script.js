// 1. LIVE INTERNAL DIGITAL CLOCK COMPONENT
function updateWatchClock() {
  const timeContainer = document.getElementById('liveTime');
  const secondsContainer = document.getElementById('liveSeconds');
  const navTimeContainer = document.getElementById('liveTimeNav');
  const mobileTimeContainer = document.getElementById('mobileTimeDisplay');
  
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  
  if(timeContainer && secondsContainer) {
    timeContainer.textContent = `${hours}:${minutes}`;
    secondsContainer.textContent = `:${seconds}`;
  }
  
  if(navTimeContainer) {
    navTimeContainer.textContent = `${hours}:${minutes} GMT`;
  }
  
  if(mobileTimeContainer) {
    mobileTimeContainer.textContent = `${hours}:${minutes} GMT`;
  }
}
setInterval(updateWatchClock, 1000);
updateWatchClock();

// 1.5. HAMBURGER MENU TOGGLE FOR MOBILE
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

if(hamburgerBtn && mobileMenu) {
  hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });
  
  // Close menu when a link is clicked
  const mobileLinks = mobileMenu.querySelectorAll('.mobile-link, .mobile-link-cta');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburgerBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });
}

// 2. MOUSE MOVEMENT POSITION PARALLAX + LIVE CODE SNIPPET VALUES
const canvasFrame = document.getElementById('canvasFrame');
const watchShell = document.getElementById('watchShell');
const codeX = document.getElementById('codeX');
const codeY = document.getElementById('codeY');

canvasFrame.addEventListener('mousemove', (event) => {
  const rect = canvasFrame.getBoundingClientRect();
  
  const xOffset = event.clientX - rect.left - (rect.width / 2);
  const yOffset = event.clientY - rect.top - (rect.height / 2);
  
  document.documentElement.style.setProperty('--mx', `${xOffset}px`);
  document.documentElement.style.setProperty('--my', `${yOffset}px`);
  
  // Dynamic code values calculation for inside the watch display
  if(codeX && codeY) {
    codeX.textContent = `${Math.round(xOffset / 4)}px`;
    codeY.textContent = `${Math.round(yOffset / 4)}px`;
  }
  
  const tiltX = (yOffset / rect.height) * -20;
  const tiltY = (xOffset / rect.width) * 20;
  
  watchShell.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
});

canvasFrame.addEventListener('mouseleave', () => {
  document.documentElement.style.setProperty('--mx', '0px');
  document.documentElement.style.setProperty('--my', '0px');
  watchShell.style.transform = `rotateX(0deg) rotateY(0deg)`;
  if(codeX && codeY) {
    codeX.textContent = `0px`;
    codeY.textContent = `0px`;
  }
});

// 3. THEME INTERACTIVE CROWN: TOGGLE INTERACTIVE BLUEPRINT STATE
const themeCrown = document.getElementById('themeCrown');
const modeLabel = document.getElementById('modeLabel');
const statusLabel = document.getElementById('statusLabel');
const footerLeft = document.getElementById('footerLeft');
const footerRight = document.getElementById('footerRight');
const hintText = document.getElementById('hintText');

themeCrown.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  
  if (currentTheme === 'blueprint') {
    // Return back to elegant normal preview system
    document.documentElement.removeAttribute('data-theme');
    modeLabel.textContent = "UI / MODE";
    statusLabel.textContent = "RENDERED";
    footerLeft.textContent = "315° NW";
    footerRight.textContent = "v1.0.2";
    hintText.textContent = "Click the watch crown to inspect code";
  } else {
    // Engage system wireframe engine structural layout modifications
    document.documentElement.setAttribute('data-theme', 'blueprint');
    modeLabel.textContent = "INTERACTION";
    statusLabel.textContent = "DEBUG";
    footerLeft.textContent = "GRID: 20PX";
    footerRight.textContent = "COMPILATION";
    hintText.textContent = "Click crown to return to preview framework";
  }
});