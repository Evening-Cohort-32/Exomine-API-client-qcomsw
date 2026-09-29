export const state = {}; //Empty Object

// Updates the chosen governor. Also clears the facility and mineral
// because changing the governor invalidates those downstream choices.
export const setGovernor = (governorId) => {
  state.selectedGovernor = governorId; // save the new governor
  state.selectedFacility = null; // clear the old facility
  state.selectedMineral = null; // clear the old mineral
  document.dispatchEvent(new CustomEvent("stateChanged"));
  // tell the app to re-render
};

// Updates the chosen facility. Also clears the mineral
// because the user needs to re-pick after switching facilities.
export const setFacility = (facilityId) => {
  state.selectedFacility = parseInt(facilityId); // save the new facility
  state.selectedMineral = null; // clear the old mineral
  document.dispatchEvent(new CustomEvent("stateChanged")); // tell the app to re-render
};

// Updates the chosen mineral. Nothing downstream to clear.
export const setMineral = (mineralId) => {
  state.selectedMineral = parseFloat(mineralId);
  document.dispatchEvent(new CustomEvent("mineralSelected"));
  // save the new mineral
};

// Returns a copy of state so other modules can read it
// without being able to change it directly.
export const getState = () => {
  return { ...state }; // spread creates a new object, not a reference
};




//When Purchase button is clicked a put or post fetch is sent to the API.
export const purchaseMaterial = async (selectedColonyMineral,selectedColonyId,isNewInventory
) => {
  //Checks weather to perform a put fetch for existing colony inventories or a post fetch for a new inventory.
  if(isNewInventory === false){
    //Put option
    let colonyPutOptions = {
      method: "put",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
       id: selectedColonyMineral.id,
       colonyId: selectedColonyMineral.colonyId,
        mineralId: selectedColonyMineral.mineralId,
        quantity: selectedColonyMineral.quantity + 1,
      }),
   };
    fetch(
      `https://localhost:7080/api/colonyInventories/${selectedColonyMineral.id}`,
      colonyPutOptions,
    );
  }

  //Post option
  else if (isNewInventory === true){
      let colonyPostOptions = {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
       colonyId: selectedColonyId,
        mineralId: state.selectedMineral,
        quantity: 1,
      }),
   };
   fetch(`https://localhost:7080/api/colonyInventories`,colonyPostOptions)
  }

  //Remove 1 ton from facility mineral quantity
  let selectedFacilityMineral = await findSelectedFacilityMineral()

  let facilityPutOption = {
    method: "put",
    headers:{
      "content-type":"application/json",
    },
    body:JSON.stringify({
      id: selectedFacilityMineral.id,
      miningFacilityId: selectedFacilityMineral.miningFacilityId,
      mineralId: state.selectedMineral,
      quantity: selectedFacilityMineral.quantity - 1,
    })
  }
  fetch(`https://localhost:7080/api/facilityInventory/${selectedFacilityMineral.id}`,facilityPutOption)
  document.dispatchEvent(new CustomEvent("stateChanged"));

}


//funstion for finding selected facilityMineral
const findSelectedFacilityMineral = async () =>{
  let allFacilityMinerals = await fetch(`https://localhost:7080/api/facilityInventory`).then(res => res.json())
  for (const facilityMineral of allFacilityMinerals) {
    if(facilityMineral.mineralId === state.selectedMineral &&
      facilityMineral.miningFacilityId === state.selectedFacility
    )
    return facilityMineral
  }
}