import { state } from "./TransientState.js"

export const FacilityMinerals = async () => {
  const facilityMineralsResponse = await fetch(
    "https://localhost:7080/api/facilityInventory",
  )
  const facilityMinerals = await facilityMineralsResponse.json()

  const mineralsResponse = await fetch("https://localhost:7080/api/minerals")
  const minerals = await mineralsResponse.json()

  const availableMinerals = facilityMinerals.filter((facilityMineral) => {
    return (
      facilityMineral.miningFacilityId === parseInt(state.selectedFacility) &&
      facilityMineral.quantity > 0
    )
  })

  // if no facility selected yet show empty message
  if (availableMinerals.length === 0) {
    return `<div class="facilityMinerals">
            <p>Select a facility to see available minerals</p>
            </div>`
  }

  //maps each facilityMineral to an HTML string
  const mineralItems = await availableMinerals.map((facilityMineral) => {
    const mineral = minerals.find((m) => m.id === facilityMineral.mineralId)
    return `
    
        <div class="mineral-item">
        <input type="radio"
        name="selectedMineral"
        id="mineral-${mineral.id}"
        value="${mineral.id}"
        />
        <label for="mineral-${facilityMineral.id}">
        ${facilityMineral.mineralName} - Quantity: ${facilityMineral.quantity}
        </label>
        </div>
        `
  })

  return `
    <div class="facilityMinerals">
    ${mineralItems.join("")}
    </div>
    `
}
