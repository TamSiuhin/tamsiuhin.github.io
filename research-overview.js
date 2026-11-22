// Without JavaScript the diagram links to three expanded articles.
const directions = document.querySelector('.research-directions');
const tabs = Array.from(directions.querySelectorAll('a'));
const panels = tabs.map(tab => document.getElementById(tab.hash.slice(1)));

directions.setAttribute('role', 'tablist');
tabs.forEach(tab => tab.setAttribute('role', 'tab'));
panels.forEach((panel, i) => {
  panel.setAttribute('role', 'tabpanel');
  panel.tabIndex = 0;
  tabs[i].setAttribute('aria-controls', panel.id);
});

function selectDirection(index) {
  tabs.forEach((tab, i) => {
    const selected = i === index;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    panels[i].hidden = !selected;
  });
}

function selectLinkedDirection() {
  const index = tabs.findIndex(tab => tab.hash === location.hash);
  if (index >= 0) selectDirection(index);
}

selectDirection(0);
selectLinkedDirection();
window.addEventListener('hashchange', selectLinkedDirection);

tabs.forEach((tab, index) => {
  tab.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    selectDirection(index);
  });

  tab.addEventListener('keydown', event => {
    const targets = {
      ArrowRight: (index + 1) % tabs.length,
      ArrowLeft: (index + tabs.length - 1) % tabs.length,
      Home: 0,
      End: tabs.length - 1
    };
    if (!Object.hasOwn(targets, event.key)) return;
    event.preventDefault();
    selectDirection(targets[event.key]);
    tabs[targets[event.key]].focus();
  });
});
