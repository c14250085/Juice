let orders = JSON.parse(localStorage.getItem("juiceOrders")) || [];

const juiceVariants = [
    "Es Jeruk", "Tomat", "Nanas", "Sirsak",
    "Apel", "Semangka", "Stroberi",
    "Jambu", "Melon", "Mangga",
    "Buah Naga", "Alpukat", "Mix"
];

let selectedJuice = "";
let selectedSugar = "";
let selectedMilk = "";
let selectedIce = "";

function saveOrders() {
    localStorage.setItem("juiceOrders", JSON.stringify(orders));
}

function createJuiceButtons() {
    const container = document.getElementById("juiceOptions");
    juiceVariants.forEach(juice => {
        const btn = document.createElement("button");
        btn.textContent = juice;
        btn.dataset.value = juice;
        btn.onclick = function () {
            selectOption("juiceOptions", btn);
            selectedJuice = juice;
        };
        container.appendChild(btn);
    });
}

function selectOption(groupId, button) {
    const group = document.getElementById(groupId);
    const buttons = group.getElementsByTagName("button");
    for (let b of buttons) {
        b.classList.remove("active");
    }
    button.classList.add("active");

    if (groupId === "sugarOptions") selectedSugar = button.dataset.value;
    if (groupId === "milkOptions") selectedMilk = button.dataset.value;
    if (groupId === "iceOptions") selectedIce = button.dataset.value;
}

document.querySelectorAll("#sugarOptions button").forEach(btn => {
    btn.onclick = function () {
        selectOption("sugarOptions", btn);
    };
});

document.querySelectorAll("#milkOptions button").forEach(btn => {
    btn.onclick = function () {
        selectOption("milkOptions", btn);
    };
});

document.querySelectorAll("#iceOptions button").forEach(btn => {
    btn.onclick = function () {
        selectOption("iceOptions", btn);
    };
});

function addOrder() {
    const name = document.getElementById("customerName").value;

    if (!name || !selectedJuice || !selectedSugar || !selectedMilk || !selectedIce) {
        alert("Di isi semua dulu yaa!");
        return;
    }

    const order = {
        name,
        juice: selectedJuice,
        sugar: selectedSugar,
        milk: selectedMilk,
        ice: selectedIce
    };

    orders.push(order);
    saveOrders();
    renderOrders();
    resetSelections();
}

function renderOrders() {
    const list = document.getElementById("orderList");
    list.innerHTML = "";

    orders.forEach((order, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <label style="display:flex; align-items:center; gap:10px;">
                <input type="checkbox" class="orderCheckbox" data-index="${index}">
                <span>
                    ${order.name} - ${order.juice} | ${order.sugar} | ${order.milk} | ${order.ice}
                </span>
            </label>
        `;

        list.appendChild(li);
    });
}

function deleteOrder() {
    const checkboxes = document.querySelectorAll(".orderCheckbox");
    let newOrders = [];

    checkboxes.forEach((cb, index) => {
        if (!cb.checked) {
            newOrders.push(orders[index]);
        }
    });

    if (newOrders.length === orders.length) {
        alert("Select at least one order to delete.");
        return;
    }

    if (!confirm("Delete selected orders?")) {
        return;
    }

    orders = newOrders;

    saveOrders();   // VERY IMPORTANT
    renderOrders();
}

function resetSelections() {
    // Clear input
    document.getElementById("customerName").value = "";

    // Clear all active buttons only inside option groups
    const groups = ["juiceOptions", "sugarOptions", "milkOptions", "iceOptions"];

    groups.forEach(groupId => {
        const group = document.getElementById(groupId);
        const buttons = group.querySelectorAll("button");
        buttons.forEach(btn => btn.classList.remove("active"));
    });

    // Reset stored selections
    selectedJuice = "";
    selectedSugar = "";
    selectedMilk = "";
    selectedIce = "";
}

createJuiceButtons();
renderOrders();