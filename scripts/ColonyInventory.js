import { getState } from "./TransientState.js";

export const colonyInventory = async () => {
  const state = getState();
  //if no governor has been selected it returns an empty string, this prevents an attenpt to find data to display
  if (!state.selectedGovernor) {
    return "<h2>Colony Minerals</h2>";
  }

  const governorResponse = await fetch(
    `https://localhost:7080/api/governors/${state.selectedGovernor}`,
  );
  const governor = await governorResponse.json();

  const colonyMineralsResponse = await fetch(
    "https://localhost:7080/api/colonyInventories",
  );
  const allColonyMinerals = await colonyMineralsResponse.json();

  const matchingColonyMinerals = allColonyMinerals.filter(
    (colonyMineral) => colonyMineral.colonyId === governor.colonyId,
  );

  let html = `<h2>${governor.colonyName} Minerals</h2>
    <ul>`;
  for (const colonyMineral of matchingColonyMinerals) {
    html += `<li>${colonyMineral.quantity} tons of ${colonyMineral.mineralName}</li>`;
  }
  html += `</ul>`;

  return html;
};
