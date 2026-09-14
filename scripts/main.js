import { governorOptions } from "./Governors.js"
import { Facilities } from "./Facilities.js"
import { colonyInventory } from "./ColonyInventory.js"
import { FacilityMinerals } from './FacilityMinerals.js'
import { setMineral } from './TransientState.js'
import { spaceCart } from './SpaceCart.js'

const render = async () => {
    const governorHTML = await governorOptions()
    const facilitiesHTML = await Facilities()
    const colonyHTML = await colonyInventory()
    const spaceCartHTML = await spaceCart()


    const facilityMineralsHTML = await FacilityMinerals()

const composedHTML = `
    <h1 class="title">Solar System Mining MarketPlace</h1>
    <h2 class="colonyTitle">Available Resources for Colony</h2>

    <div class="topSection">
        <div class="selectors">
            <div class="governor">
                ${governorHTML}
            </div>
            ${facilitiesHTML}
        </div>
        <div class="colonyMinerals">
            <section class= "inventory">
                ${colonyHTML}
            </section>
        </div>
    </div>


<h2 class="sectionTitle">Minerals at Facility</h2>

    <div class="bottomRow">
        <div class="facilityMinerals">${facilityMineralsHTML}</div>
        ${spaceCartHTML}
    </div>
    `


const container = document.querySelector("#container")
    container.innerHTML = composedHTML
}

document.addEventListener("stateChanged", render)

document.addEventListener("mineralSelected", async () => {
    const spaceCartHTML = await spaceCart()
    document.querySelector(".spaceCart").innerHTML = spaceCartHTML
})

document.addEventListener("change", (e) => {
    if (e.target.name === "selectedMineral") {
        setMineral(e.target.value)
    }
})

render()