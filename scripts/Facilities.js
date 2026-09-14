import { state, setFacility } from './TransientState.js'

export const Facilities = async () => {
    const response = await fetch("http://localhost:3000/facilities")
    const facilities = await response.json()

    const activeFacilities = facilities.filter((facility) => {
        return facility.active === true
    })

    let html = `<section class="facilities">
        <label>Choose a facility</label>
        <select id="facility-select" ${state.selectedGovernorId === 0 ? "disabled" : ""}>
            <option value="0">Choose a Facility...</option>
    `

    for (const facility of activeFacilities) {   
        const selected = facility.id === parseInt(state.selectedFacility) ? "selected" : ""
        html += `
        <option value="${facility.id}" ${selected}>${facility.name}</option>`
    }

    html += `</select></section>`

    return html
}

const handleFacilitySelected = (event) => {
    if (event.target.id === "facility-select") {
        setFacility(event.target.value)
    }
}

document.addEventListener("change", handleFacilitySelected)