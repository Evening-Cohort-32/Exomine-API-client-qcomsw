import { getState, setGovernor } from "./TransientState.js"

export const governorOptions = async() =>{
    const state = getState()
    const allGovernors = await fetch("http://localhost:3000/governors").then(res => res.json())
    let html = `
    <label for="governors">Choose a governor</label>
    <select id="governors" name ="governors">
    <option value="">Select a Governor...</option>
    `
    const govStringArray = allGovernors.map((governor) => {
        const selected = governor.id === parseInt(state.selectedGovernor) ? "selected" : ""
        return `
        <option value="${governor.id}" ${selected}>${governor.name}</option>`
    })
    html += govStringArray.join("")
    html += `</select>`
    return html
}


const handleGovernorSelected = (event) =>{
 if(event.target.id === "governors"){
    setGovernor(event.target.value)
 }
}

document.addEventListener("change", handleGovernorSelected)