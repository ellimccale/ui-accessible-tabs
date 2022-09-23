const tabs      = document.querySelector('.tabs')
    , tabItems  = tabs.querySelectorAll('[role="tab"]')
    , tabPanels = tabs.querySelectorAll('[role="tabpanel"]');

function deactivateTabs() {
  // Reset state of all tab items
  tabItems.forEach(tab => {
    tab.setAttribute('aria-selected', 'false');
    tab.setAttribute('tabindex', '-1');
  });

  // Reset state of all panels
  tabPanels.forEach(panel => panel.setAttribute('hidden', ''));
}

function activateTab(tab) {
  // Get the associated tab panel
  const tabPanelID = tab.getAttribute('aria-controls')
      , tabPanel   = document.querySelector(`#${tabPanelID}`);

  // Close all other tabs
  deactivateTabs();

  // Focus the activated tab
  tab.focus();

  // Set the interacted tab to active
  tab.setAttribute('aria-selected', 'true');

  // Remove negative tabindex from interacted tab
  tab.removeAttribute('tabindex');

  // Display the associated tab panel
  tabPanel.removeAttribute('hidden');
}

function clickTab(e) {
  activateTab(e.target);
}

function arrowTab(e) {
  // Get the key and target associated with this event
  const { keyCode, target } = e;

  // Check which key has been pressed
  switch (keyCode) {
    case 37: // Left arrow
      // If the current tab item has a previous sibling, activate it
      // Otherwise, activate the tab item at the end of the list
      if (target.previousElementSibling !== null) {
        activateTab(target.previousElementSibling);
      } else {
        activateTab(target.parentElement.lastElementChild);
      } break;
    case 39: // Right arrow
      if (target.nextElementSibling !== null) {
        activateTab(target.nextElementSibling);
      } else {
        activateTab(target.parentElement.firstElementChild);
      } break;
  }
}

// Set up various event listeners for each tab
function eventListener(tab) {
  tab.addEventListener('click', clickTab);
  tab.addEventListener('keydown', arrowTab);
}

tabItems.forEach(tab => eventListener(tab));