function ready(fn) {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(fn, 1);
    document.removeEventListener('DOMContentLoaded', fn);
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function() {

  // Global Constants

  const tabs      = document.querySelector('.tabs')
      , tabItems  = tabs.querySelectorAll('[role="tab"]')
      , tabPanels = tabs.querySelectorAll('[role="tabpanel"]');

  // Tabbing

  /*****************************************************************************
   * Resets the state of all tabs and tab panels.
   */

  function deactivateTabs() {
    // Reset state of all tab items
    tabItems.forEach(tab => {
      tab.setAttribute('aria-selected', 'false');
      tab.setAttribute('tabindex', '-1');
    });

    // Reset state of all panels
    tabPanels.forEach(panel => panel.setAttribute('hidden', ''));
  }

  /*****************************************************************************
   * Expects a Node.
   *
   * Shows the desired tab and its associated tab panel.
   */

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

  /*****************************************************************************
   * Expects an event from a click listener.
   */

  function clickTab(e) {
    activateTab(e.target);
  }

  /*****************************************************************************
   * Expects an event from a keydown listener.
   */

  function arrowTab(e) {
    const { keyCode, target } = e;

    /**
     * If the current tab has a next/previous sibling, activate it. Otherwise,
     * activate the tab at the beginning/end of the list.
     */

    const targetPrev  = target.previousElementSibling
        , targetNext  = target.nextElementSibling
        , targetFirst = target.parentElement.firstElementChild
        , targetLast  = target.parentElement.lastElementChild;

    switch (keyCode) {
      case 37: // Left arrow
        if (tabs.contains(targetPrev)) {
          activateTab(targetPrev);
        } else {
          activateTab(targetLast);
        } break;
      case 39: // Right arrow
        if (tabs.contains(targetNext)) {
          activateTab(targetNext);
        } else {
          activateTab(targetFirst);
        } break;
    }
  }

  /*****************************************************************************
   * Set up various event listeners for each tab
   */

  function eventListener(tab) {
    tab.addEventListener('click', clickTab);
    tab.addEventListener('keydown', arrowTab);
  }

  tabItems.forEach(tab => eventListener(tab));

});