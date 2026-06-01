/*
  Seaside Sci-Fi — terminal.js
  Random teaser pool, typewriter effect, theatrical close sequence
  Version 1.0 - June 2026
  No framework dependencies
*/

(function() {

  /* ============================================================
     TEASER POOL
     Placeholder text - replace with Houdini Window manuscript
     quotes once episode outline session complete
     ============================================================ */

  const teasers = [
    "The Kingsley-Lovelace archive was never officially decommissioned. The objects were simply moved. No record exists of where.",
    "BINLEY BAY - GRID REF 427/119 - INCIDENT LOG 7TH NOV 1962 - Subject reported unscheduled signal on restricted frequency. Duration: 4 minutes, 38 seconds. Origin: unresolved.",
    "Laurie Lovelace performed at the Pavilion Theatre from 1958 to 1971. His final performance on the 14th August 1971 ended eleven minutes early. No official explanation was given.",
    "The second timeline begins with a door that should not have been open. It ends with one that cannot be closed.",
    "OPERATION HOUDINI WINDOW - STATUS: DORMANT - REACTIVATION REQUIRES LEVEL 4 CLEARANCE OR ABOVE - NOTE: level 4 clearance has not been issued since 1978.",
    "David Lovelace was not supposed to be in the room when the experiment ran. The logs show his entry at 03:47. The experiment was scheduled for 04:00. Fourteen minutes is longer than it sounds."
  ];

  let revealed = false;

  function getTeaser() {
    return teasers[Math.floor(Math.random() * teasers.length)];
  }

  function typeText(targetEl, text, onComplete) {
    targetEl.innerHTML = '';
    let i = 0;
    function typeChar() {
      if (i < text.length) {
        const span = document.createElement('span');
        span.className = 'typed-char';
        span.style.animationDelay = '0s';
        span.textContent = text[i];
        targetEl.appendChild(span);
        i++;
        setTimeout(typeChar, 28);
      } else {
        if (onComplete) onComplete();
      }
    }
    typeChar();
  }

  function reveal() {
    if (revealed) return;
    revealed = true;

    const promptEl      = document.getElementById('ssf-prompt');
    const teaserPanel   = document.getElementById('ssf-teaser-panel');
    const teaserText    = document.getElementById('ssf-teaser-text');
    const terminated    = document.getElementById('ssf-terminated');
    const fragmentBlock = document.getElementById('ssf-fragment-block');

    if (!teaserPanel || !teaserText || !terminated) return;

    if (promptEl)      promptEl.style.display = 'none';
    if (fragmentBlock) fragmentBlock.style.opacity = '0.4';

    teaserPanel.classList.add('active');

    setTimeout(function() {
      typeText(teaserText, getTeaser(), function() {
        setTimeout(function() {
          terminated.classList.add('active');
        }, 1200);
      });
    }, 400);
  }

  document.addEventListener('DOMContentLoaded', function() {
    const trigger = document.getElementById('ssf-prompt-trigger');
    if (trigger) trigger.addEventListener('click', reveal);

    document.addEventListener('keydown', function(e) {
      if (!revealed && e.key !== 'F5' && e.key !== 'Tab') reveal();
    });

    document.addEventListener('click', function(e) {
      if (!revealed && e.target.id !== 'ssf-prompt-trigger') reveal();
    });
  });

})();
