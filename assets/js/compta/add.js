function initComptaPage() {
  const amountInput = document.getElementById("amount");
  const feeRateInput = document.getElementById("fee-rate");
  const addBtn = document.getElementById("add-btn");
  const transactionsContainer = document.getElementById(
    "transactions-container"
  );
  const summaryNetEl = document.getElementById("summary-net");
  const summaryFeesEl = document.getElementById("summary-fees");
  const summaryPositive = document.getElementById("summary-positive");
  const summaryNegative = document.getElementById("summary-negative");
  const transactionCountEl = document.getElementById("transaction-count");
  const feeAmountEl = document.getElementById("fee-amount");
  const netAmountEl = document.getElementById("net-amount");
  const deleteAllTransactions = document.getElementById("clear-all");

  // rapport add
  const API_BASE = "/crud/save";
  const API_BASE_CLIENTS =
    "/api/v2/node/client?fields[]=nid&fields[]=field_name&sort[val]=field_name&sort[op]=asc&pager=0&offset=1000";
  const API_BASE_CATEGORIES =
    "/api/v2/taxonomy_term/category?fields[]=tid&fields[]=name&sort[val]=name&sort[op]=asc";
  const fabButton = document.getElementById("fabButton");
  const reportModalAdd = document.getElementById("reportModalAdd");
  const addReportForm = document.getElementById("addReportForm");
  const closeReportModalAdd = document.getElementById("closeReportModalAdd");

  const addReport = document.getElementById("addReport");
  const rDescriptionAdd = document.getElementById("rDescriptionAdd");
  const dateRapprotAdd = document.getElementById("dateRapprotAdd");
  const dateErr = document.getElementById("dateErr");
  const amountAr = document.getElementById("amountAr");
  const amountArError = document.getElementById("amountArError");
  const amountRmbError = document.getElementById("amountRmbError");
  const amountRmb = document.getElementById("amountRmb");
  const sectorError = document.getElementById("sectorError");
  const sector = document.getElementById("sector");
  const clientError = document.getElementById("clientError");
  const client = document.getElementById("client");

  // datetime-functionality
  const now = new Date();
  const maxDate = now;

  const year = maxDate.getFullYear();
  const month = String(maxDate.getMonth() + 1).padStart(2, "0");
  const day = String(maxDate.getDate()).padStart(2, "0");

  dateRapprotAdd.value = `${year}-${month}-${day}`;

  // fetch all clients
  async function loadClients() {
    try {
      const res = await fetch(API_BASE_CLIENTS);
      const dataArray = await res.json();
      const clients = dataArray.rows;
      allClients = clients;
      const select = document.getElementById("client");
      // Vider les options existantes sauf la première
      select.innerHTML = '<option value="">Sélectionnez un client</option>';

      // Ajouter les clients depuis l'API
      clients.forEach((client) => {
        const option = document.createElement("option");
        option.value = client.nid; // option value formatée
        option.textContent = client.field_name;
        select.appendChild(option);
      });
    } catch (error) {
      console.error("Erreur lors du chargement des clients :", error);
    }
  }

  async function loadSectors() {
    try {
      const res = await fetch(API_BASE_CATEGORIES);
      const dataArray = await res.json();
      const categories = dataArray.rows;

      const select = document.getElementById("sector");
      // Vider les options existantes sauf la première
      select.innerHTML = '<option value="">Sélectionnez un secteur</option>';

      // Ajouter les catégories depuis l'API
      categories.forEach((cat) => {
        const option = document.createElement("option");
        option.value = cat.tid; // option value formatée
        option.textContent = cat.name;
        select.appendChild(option);
      });
    } catch (error) {
      console.error("Erreur lors du chargement des secteurs :", error);
    }
  }
  loadSectors();
  loadClients();

  // --- Fonction de validation ---
  function validateReportForm() {
    let isValid = true;

    // reset erreurs
    dateErr.classList.add("hidden");
    amountArError.classList.add("hidden");
    amountRmbError.classList.add("hidden");
    sectorError.classList.add("hidden");
    clientError.classList.add("hidden");

    // date
    if (dateRapprotAdd.value === "") {
      dateErr.textContent = "Veuillez entrer une date !";
      dateErr.classList.remove("hidden");
      isValid = false;
    }

    // montant Ariary
    if (amountAr.value.trim() === "" || isNaN(amountAr.value)) {
      amountArError.textContent = "Montant Ar invalide";
      amountArError.classList.remove("hidden");
      isValid = false;
    }

    // montant RMB
    if (amountRmb.value.trim() === "" || isNaN(amountRmb.value)) {
      amountRmbError.textContent = "Montant RMB invalide";
      amountRmbError.classList.remove("hidden");
      isValid = false;
    }

    // secteur
    if (sector.value === "" || sector.value === "0") {
      sectorError.textContent = "Veuillez sélectionner un secteur";
      sectorError.classList.remove("hidden");
      isValid = false;
    }

    // client
    if (client.value === "" || client.value === "0") {
      clientError.textContent = "Veuillez sélectionner un client";
      clientError.classList.remove("hidden");
      isValid = false;
    }

    return isValid;
  }

  // --- Listener bouton ---
  addReport.addEventListener("click", function (e) {
    e.preventDefault();
    if (validateReportForm()) {
      sendRepport();
    }
  });

  async function sendRepport(params) {
    showLoader();
    try {
      const clientNameRepport = client.options[client.selectedIndex].text;
      const newReport = {
        title: "rapports",
        entity_type: "node",
        bundle: "rapports",
        body: "<h1>transaction</h1>",
        uid: 1,
        status: 1,
        field_category: parseInt(sector.value),
        field_client: clientNameRepport,
        field_date: dateRapprotAdd.value,
        field_total_ariary: amountAr.value.trim(),
        field_total_rmb: amountRmb.value.trim(),
        field_description: rDescriptionAdd.value.trim(),
      };
      const res = await fetch(`${API_BASE}`, {
        method: "POST",
        body: JSON.stringify(newReport),
      });

      if (!res.ok) throw new Error("Échec lors de l'ajout");
    } catch (error) {
      console.error("Des erreurs sont survenu :", error);
    } finally {
      client.value = "";
      sector.value = "";
      dateRapprotAdd.value = "";
      amountAr.value = "";
      amountRmb.value = "";
      rDescriptionAdd.value = "";
      reportModalAdd.classList.add("hidden");
      showSuccessToast("Rapport ajouter avec succès");
      window.app.page = "add-report";
    }
  }
  hideLoader();
  // Toast handling
  function showSuccessToast(msg) {
    const successToast = document.createElement("div");
    successToast.className =
      "fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium z-c-99";
    successToast.textContent = msg;
    document.body.appendChild(successToast);
    setTimeout(() => {
      successToast.remove();
      document.body.style.overflow = "";
    }, 5000);
  }

  function showErrorToast(msg) {
    const successToast = document.createElement("div");
    successToast.className =
      "fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium z-c-99";
    successToast.textContent = msg;
    document.body.appendChild(successToast);
    setTimeout(() => {
      successToast.remove();
      document.body.style.overflow = "";
    }, 5000);
  }

  fabButton.addEventListener("click", function () {
    reportModalAdd.classList.remove("hidden");
  });
  closeReportModalAdd.addEventListener("click", function () {
    reportModalAdd.classList.add("hidden");
  });

  function showLoader() {
    document.getElementById("page-loader").classList.remove("hidden");
  }

  function hideLoader() {
    document.getElementById("page-loader").classList.add("hidden");
  }

  const STORAGE_KEY = "transactions_data";

  let transactions = loadTransactions();

  // === FILTRES ===
  document.getElementById("filter-all").addEventListener("click", function () {
    setActiveFilter(this);
    updateTransactionsList("all");
  });
  document
    .getElementById("filter-positive")
    .addEventListener("click", function () {
      setActiveFilter(this);
      updateTransactionsList("positive");
    });
  document
    .getElementById("filter-negative")
    .addEventListener("click", function () {
      setActiveFilter(this);
      updateTransactionsList("negative");
    });

  function setActiveFilter(activeBtn) {
    document.querySelectorAll('[id^="filter-"]').forEach((btn) => {
      btn.classList.replace("bg-primary", "bg-gray-100");
      btn.classList.replace("text-white", "text-gray-600");
    });
    activeBtn.classList.replace("bg-gray-100", "bg-primary");
    activeBtn.classList.replace("text-gray-600", "text-white");
  }

  // === AFFICHAGE ===
  function updateTransactionsList(filter = "all") {
    transactionsContainer.innerHTML = "";
    let filteredTransactions = transactions;
    if (filter === "positive") {
      filteredTransactions = transactions.filter((t) => t.amount >= 0);
    } else if (filter === "negative") {
      filteredTransactions = transactions.filter((t) => t.amount < 0);
    }
    if (filteredTransactions.length === 0) {
      transactionsContainer.innerHTML = `
                    <div class="text-center py-8 text-gray-500">
                        <i class="ri-inbox-line text-4xl mb-2 text-gray-300"></i>
                        <p>Aucune transaction pour le moment</p>
                    </div>`;
      return;
    }
    filteredTransactions.forEach((transaction) => {
      const transactionEl = document.createElement("div");
      transactionEl.className = "py-4 transaction-item fs-c-7";
      transactionEl.innerHTML = `
                    <div class="flex justify-between items-center mb-1">
                        <div class="flex items-center gap-2">
                            <button class="remove-btn w-6 h-6 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 transition-colors" data-id="${
                              transaction.id
                            }">
                                <i class="ri-delete-bin-line text-red-600 text-sm"></i>
                            </button>
                            <span class="font-medium ${
                              transaction.amount >= 0
                                ? "text-green-600"
                                : "text-secondary"
                            }">${formatCurrency(transaction.amount)}</span>
                        </div>
                        <span class="text-xs text-gray-500">${new Date(
                          transaction.date
                        ).toLocaleString("fr-FR")}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-red-500">Frais: ${formatCurrency(
                          transaction.fee
                        )}</span>
                        <span class="text-green-600">Montant: ${formatCurrency(
                          transaction.net
                        )}</span>
                    </div>`;
      transactionsContainer.appendChild(transactionEl);

      transactionEl
        .querySelector(".remove-btn")
        .addEventListener("click", function () {
          const id = this.dataset.id;
          if (id) deleteTransactionById(id);
        });
    });
  }

  // === UTILITAIRES ===
  function formatCurrency(amount) {
    return (
      new Intl.NumberFormat("fr-MG", {
        maximumFractionDigits: 0,
      }).format(amount) + " Ar"
    );
  }

  function calculateFee(amount) {
    const feeRate = parseFloat(feeRateInput.value) / 100 || 0;
    const fee = amount * feeRate;
    return { fee, net: amount };
  }

  function updatePreviewValues() {
    const amount = parseFloat(amountInput.value) || 0;
    const { fee, net } = calculateFee(amount);
    feeAmountEl.textContent = formatCurrency(fee);
    netAmountEl.textContent = formatCurrency(net);
  }

  function updateSummary() {
    const total = transactions.reduce((sum, t) => sum + t.amount, 0);
    const fees = transactions.reduce((sum, t) => sum + t.fee, 0);
    const net = total - fees;
    const pos = transactions
      .filter((t) => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
    const neg = transactions
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + t.amount, 0);

    summaryNetEl.textContent = formatCurrency(net);
    summaryFeesEl.textContent = formatCurrency(fees);
    summaryPositive.textContent = formatCurrency(pos);
    summaryNegative.textContent = formatCurrency(neg);
    transactionCountEl.textContent = transactions.length;
  }

  // === LOCAL STORAGE ===
  function saveTransactions() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }

  function loadTransactions() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  // === AJOUT ===
  function addTransaction(amount) {
    const { fee, net } = calculateFee(amount);
    const newTransaction = {
      id: Date.now().toString(),
      amount,
      fee,
      net,
      date: new Date().toISOString(),
    };
    transactions.unshift(newTransaction);
    saveTransactions();
    updateTransactionsList();
    updateSummary();
  }

  // === SUPPRESSION SIMPLE ===
  function deleteTransactionById(id) {
    transactions = transactions.filter((t) => t.id !== id);
    saveTransactions();
    updateTransactionsList();
    updateSummary();
  }

  // === SUPPRESSION TOTALE ===
  deleteAllTransactions.addEventListener("click", () => {
    if (!confirm("Confirmer la suppression de toutes les transactions ?"))
      return;
    transactions = [];
    saveTransactions();
    updateTransactionsList();
    updateSummary();
  });

  // === ÉVÉNEMENTS ===
  addBtn.addEventListener("click", () => {
    const value = parseFloat(amountInput.value);
    if (isNaN(value) || value === 0) return;
    addTransaction(value);
    amountInput.value = "";
    updatePreviewValues();
  });

  amountInput.addEventListener("input", updatePreviewValues);
  feeRateInput.addEventListener("input", updatePreviewValues);

  // === INITIALISATION ===
  updateTransactionsList();
  updateSummary();
  updatePreviewValues();
}
