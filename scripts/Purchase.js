import { getState, purchaseMaterial } from "./TransientState.js";

export const makePurchase = async () => {
  let currentState = getState();
  let isNewInventory = false

  let selectedGovernor = await fetch(
    `https://localhost:7080/api/governors/${currentState.selectedGovernor}`,
  ).then((res) => res.json());

  const allColonyMinerals = await fetch(
    "https://localhost:7080/api/colonyInventories/",
  ).then((res) => res.json());

  let selectedColonyMinerals = {};

  for (const colonyMineral of allColonyMinerals) {
    if (
      colonyMineral.colonyId === selectedGovernor.colonyId &&
      parseInt(colonyMineral.mineralId) ===
        currentState.selectedMineral
    ) 
      {
        selectedColonyMinerals = colonyMineral;
        isNewInventory = false
        break
      }


    else isNewInventory = true 
  }

  purchaseMaterial(selectedColonyMinerals,selectedGovernor.colonyId,isNewInventory);
};
