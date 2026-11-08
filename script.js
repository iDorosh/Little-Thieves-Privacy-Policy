const policyItems = [...document.querySelectorAll('.policy details')];
const expandButton = document.querySelector('#expand-policy');
function updateExpandButton() {
  const allOpen = policyItems.every(item => item.open);
  expandButton.setAttribute('aria-expanded', String(allOpen));
  expandButton.innerHTML = `${allOpen ? 'Collapse' : 'Expand'} all <span aria-hidden="true">${allOpen ? '−' : '+'}</span>`;
}
expandButton.addEventListener('click', () => {
  const shouldOpen = !policyItems.every(item => item.open);
  policyItems.forEach(item => { item.open = shouldOpen; });
  updateExpandButton();
});
policyItems.forEach(item => item.addEventListener('toggle', updateExpandButton));
document.querySelector('.copy-email').addEventListener('click', async () => {
  const status = document.querySelector('.copy-status');
  try {
    await navigator.clipboard.writeText('ian.dorosh@outlook.com');
    status.textContent = 'Email address copied.';
  } catch {
    status.textContent = 'Select the email address above to copy it, or click it to send a message.';
  }
});
let printState = [];
window.addEventListener('beforeprint', () => {
  printState = policyItems.map(item => item.open);
  policyItems.forEach(item => { item.open = true; });
});
window.addEventListener('afterprint', () => {
  policyItems.forEach((item, i) => { item.open = printState[i]; });
});
