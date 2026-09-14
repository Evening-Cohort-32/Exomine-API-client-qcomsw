import { makePurchase } from "./Purchase.js";
import { state } from "./TransientState.js";

export const spaceCart = async () => {
  if (!state.selectedMineral) {
    return `
        <div class="spaceCart">
        <h2>Cart</h2>
        <div class="cartItems">
            <p>No mineral selected</p>
            </div>
            <button class="purchase-btn" disabled>Puchase Mineral</button>
        </div>
        `;
  }
  const facilityResponse = await fetch(
    `http://localhost:3000/facilities/${state.selectedFacility}`,
  );
  const facility = await facilityResponse.json();

  const mineralResponse = await fetch(
    `http://localhost:3000/minerals/${state.selectedMineral}`,
  );
  const mineral = await mineralResponse.json();
  return `
    <div class="spaceCart">
        <h2>Cart</h2>
        <div class="cartItems">
            <div class= "cart-item">
                <p>1 ton of ${mineral.name} from ${facility.name}</p>
            </div>
        </div>
        <button class="purchase-btn" id="purchase-btn">Purchase Mineral</button>
    </div>
    `;
};

const handlePurchase = (event) => {
  if (event.target.className === "purchase-btn") {
    makePurchase();
  }
};

document.addEventListener("click", handlePurchase);
