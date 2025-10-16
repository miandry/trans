function initComptaPage() {
  const amountInput = document.getElementById("amount");
  const addBtn = document.getElementById("add-btn");
  const transactionsContainer = document.getElementById(
    "transactions-container"
  );
  const summaryNetEl = document.getElementById("summary-net");
  const summaryPositive = document.getElementById("summary-positive");
  const summaryNegative = document.getElementById("summary-negative");
  const transactionCountEl = document.getElementById("transaction-count");
  const deleteAllTransactions = document.getElementById("clear-all");
  const categorySelect = document.getElementById("categorySelect");
  const applyFilters = document.getElementById("applyFilters");
  const startInput = document.getElementById("dateDebut");
  const endInput = document.getElementById("dateFin");
  const dateErrMsg = document.getElementById("dateErrMsg");
  const filterPanel = document.getElementById("filterPanel");
  const exportExcel = document.getElementById("exportExcel");

  let filteredDate = false;
  let filterQuery = "all";
  let toExport;

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
    showLoader();
    try {
      const res = await fetch(API_BASE_CATEGORIES);
      const dataArray = await res.json();
      const categories = dataArray.rows;

      const sectorSelect = document.getElementById("sector");
      const categorySelect = document.getElementById("categorySelect");

      // Vider les options existantes sauf la première
      sectorSelect.innerHTML =
        '<option value="">Sélectionnez un secteur</option>';
      // categorySelect.innerHTML = '<option value="">Sélectionnez une catégorie</option>';

      // Ajouter les catégories depuis l'API
      categories.forEach((cat) => {
        // Pour #sector → value = id
        const optionSector = document.createElement("option");
        optionSector.value = cat.tid;
        optionSector.textContent = cat.name;
        sectorSelect.appendChild(optionSector);

        // Pour #categorySelect → value = nom
        const optionCategory = document.createElement("option");
        optionCategory.value = cat.name;
        optionCategory.textContent = cat.name;
        categorySelect.appendChild(optionCategory);
      });
    } catch (error) {
      console.error("Erreur lors du chargement des secteurs :", error);
      hideLoader();
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
    // if (amountRmb.value.trim() === "" || isNaN(amountRmb.value)) {
    //     amountRmbError.textContent = "Montant RMB invalide";
    //     amountRmbError.classList.remove('hidden');
    //     isValid = false;
    // }

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
        field_total_rmb: 0, // amountRmb.value.trim()
        field_description: rDescriptionAdd.value.trim(),
      };
      const res = await fetch(`${API_BASE}`, {
        method: "POST",
        body: JSON.stringify(newReport),
      });

      if (!res.ok) throw new Error("Échec lors de l'ajout");
      window.app.page = "add-report";
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
    filterQuery = "all";
    updateTransactionsList(filterQuery);
  });
  document
    .getElementById("filter-positive")
    .addEventListener("click", function () {
      setActiveFilter(this);
      filterQuery = "positive";
      updateTransactionsList(filterQuery);
    });
  document
    .getElementById("filter-negative")
    .addEventListener("click", function () {
      setActiveFilter(this);
      filterQuery = "negative";
      updateTransactionsList(filterQuery);
    });

  function setActiveFilter(activeBtn) {
    document.querySelectorAll('[id^="filter-"]').forEach((btn) => {
      btn.classList.replace("bg-primary", "bg-gray-100");
      btn.classList.replace("text-white", "text-gray-600");
    });
    activeBtn.classList.replace("bg-gray-100", "bg-primary");
    activeBtn.classList.replace("text-gray-600", "text-white");
  }

  function sameDayFilter(data, start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (!start && !end) {
      return data;
    }

    return data.filter((item) => {
      const d = new Date(item.date);
      return d >= startDate && d <= endDate;
    });
  }

  // === AFFICHAGE ===
  function updateTransactionsList(filter = "all") {
    transactionsContainer.innerHTML = "";
    let filteredTransactions = transactions;
    if (filteredDate) {
      const start = startInput.value ? new Date(startInput.value) : null;
      const end = endInput.value ? new Date(endInput.value) : null;
      filteredTransactions = sameDayFilter(filteredTransactions, start, end);
    }
    if (filter === "positive") {
      filteredTransactions = filteredTransactions.filter((t) => t.amount >= 0);
    } else if (filter === "negative") {
      filteredTransactions = filteredTransactions.filter((t) => t.amount < 0);
    }
    toExport = filteredTransactions;
    if (toExport.length > 0) {
      exportExcel.classList.remove("hidden");
    } else {
      exportExcel.classList.add("hidden");
    }
    updateSummary(filteredTransactions);
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
                        <span class="text-red-500">Catégorie: ${
                          transaction.categorie
                        }</span>
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

  function updatePreviewValues() {
    const amount = parseFloat(amountInput.value) || 0;
  }

  function updateSummary(data = null) {
    let total;
    let net;
    let pos;
    let neg;
    if (data) {
      total = data.reduce((sum, t) => sum + t.amount, 0);
      net = total;
      pos = data
        .filter((t) => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0);
      neg = data
        .filter((t) => t.amount < 0)
        .reduce((sum, t) => sum + t.amount, 0);
      transactionCountEl.textContent = data.length;
    } else {
      total = transactions.reduce((sum, t) => sum + t.amount, 0);
      net = total;
      pos = transactions
        .filter((t) => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0);
      neg = transactions
        .filter((t) => t.amount < 0)
        .reduce((sum, t) => sum + t.amount, 0);
      transactionCountEl.textContent = transactions.length;
    }

    summaryNetEl.textContent = formatCurrency(net);
    summaryPositive.textContent = formatCurrency(pos);
    summaryNegative.textContent = formatCurrency(neg);
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
    const newTransaction = {
      id: Date.now().toString(),
      amount,
      categorie: categorySelect.value,
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

  // --- Validation des montants ---
  function validateAmounts(inputText) {
    let isValid = true;
    const lines = inputText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");

    const validAmounts = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const amount = parseFloat(line.replace(",", "."));
      // autorise montants négatifs
      if (!isNaN(amount)) {
        validAmounts.push(amount);
      } else {
        isValid = false;
        break;
      }
    }

    return { validAmounts, isValid };
  }

  // === ÉVÉNEMENTS ===
  addBtn.addEventListener("click", () => {
    const value = amountInput.value;
    if (!value.trim()) return;
    const errorDiv = document.getElementById("errorMessages");
    const { validAmounts, isValid } = validateAmounts(amountInput.value);

    if (!isValid) {
      errorDiv.classList.remove("hidden");
      return;
    } else {
      // Tout est valide → ajouter chaque transaction
      validAmounts.forEach((amount) => addTransaction(amount));
      amountInput.value = "";
      updatePreviewValues();
    }
  });

  function validateDates() {
    const start = startInput.value ? new Date(startInput.value) : null;
    const end = endInput.value ? new Date(endInput.value) : null;

    // On cache toujours le message d'erreur au départ
    dateErrMsg.classList.add("hidden");
    dateErrMsg.textContent = "";

    // Si les deux dates sont vides → on laisse passer
    if (!start && !end) {
      return true;
    }

    // Si une seule des deux est saisie → erreur
    if ((!start && end) || (start && !end)) {
      dateErrMsg.textContent = "Les deux dates doivent être renseignées.";
      dateErrMsg.classList.remove("hidden");
      return false;
    }

    // Vérifie si la date de début est avant ou égale à la date de fin
    if (start > end) {
      dateErrMsg.textContent =
        "La date de début doit être antérieure ou égale à la date de fin.";
      dateErrMsg.classList.remove("hidden");
      return false;
    }

    return true;
  }

  applyFilters.addEventListener("click", async () => {
    let validDate = validateDates();
    if (!validDate) {
      return;
    }
    filteredDate = true;
    updateTransactionsList(filterQuery);
    filterPanel.classList.remove("active");
  });

  document.getElementById("exportExcel").addEventListener("click", () => {
    // 🔹 En-têtes
    const data = [["Date", "Catégorie", "Montant"]];

    // 🔹 Données
    let total = 0;
    toExport.forEach((item) => {
      const formattedDate = new Date(item.date).toLocaleDateString("fr-FR");
      data.push([formattedDate, item.categorie, item.amount]);
      total += item.amount;
    });

    // 🔹 Ligne du total
    data.push([]);
    data.push(["", "TOTAL", total]);

    // 🔹 Créer la feuille Excel
    const ws = XLSX.utils.aoa_to_sheet(data);

    // 🔹 Ajuster la largeur des colonnes
    ws["!cols"] = [
      { wch: 15 }, // Date
      { wch: 25 }, // Catégorie
      { wch: 18 }, // Montant
    ];

    // 🔹 Créer et exporter le fichier Excel
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Compta");

    // 🔹 Nom du fichier : compta-AAAA-MM-JJ.xlsx
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const filename = `compta-${yyyy}-${mm}-${dd}.xlsx`;

    XLSX.writeFile(wb, filename);
  });

  amountInput.addEventListener("input", updatePreviewValues);

  // === INITIALISATION ===
  updateTransactionsList();
  updateSummary();
  updatePreviewValues();

  const filterBtn = document.getElementById("filterBtn");
  const closeFilterBtn = document.getElementById("closeFilterBtn");
  filterBtn.addEventListener("click", function () {
    filterPanel.classList.add("active");
  });
  closeFilterBtn.addEventListener("click", function () {
    filterPanel.classList.remove("active");
  });
}
