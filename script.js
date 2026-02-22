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
let selectedIndex = null;

let orders = [];

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
}

function renderOrders() {
    const list = document.getElementById("orderList");
    list.innerHTML = "";

    orders.forEach((order, index) => {
        const li = document.createElement("li");
        li.textContent = `${order.name} - ${order.juice} | ${order.sugar} | ${order.milk} | ${order.ice}`;
        li.onclick = function () {
            document.querySelectorAll("li").forEach(item => item.classList.remove("selected"));
            li.classList.add("selected");
            selectedIndex = index;
        };
        list.appendChild(li);
    });
}

function deleteOrder() {
    if (selectedIndex === null) {
        alert("Pilih orderan yang ingin dihapus.");
        return;
    }

    if (confirm("Apakah kamu yakin ingin menghapus orderan ini?")) {
        orders.splice(selectedIndex, 1);
        selectedIndex = null;
        renderOrders();
    }
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