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

let orders = JSON.parse(localStorage.getItem("juiceOrders")) || [];

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
    renderOrders();
    resetSelections();
    saveOrders();
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
    const indexesToDelete = [];

    checkboxes.forEach(cb => {
        if (cb.checked) {
            indexesToDelete.push(parseInt(cb.dataset.index));
        }
    });

    if (indexesToDelete.length === 0) {
        alert("Select at least one order to delete.");
        return;
    }

    if (!confirm("Delete selected orders?")) {
        return;
    }

    // Delete from highest index to lowest
    indexesToDelete.sort((a, b) => b - a);

    indexesToDelete.forEach(index => {
        orders.splice(index, 1);
    });

    renderOrders();
}

function resetSelections() {
    document.getElementById("customerName").value = "";
    document.querySelectorAll("button").forEach(btn => btn.classList.remove("active"));
    selectedJuice = "";
    selectedSugar = "";
    selectedMilk = "";
    selectedIce = "";
}

createJuiceButtons();
renderOrders();