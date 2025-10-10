function initHistoryTransactionPage() {
  const API_ADD_TRANSACTION = "/crud/save";
  const API_TRANSACTION = "/api/v2/node/transactions";
  const API_BASE_CATEGORIES =
    "/api/v2/taxonomy_term/category";
  const amountInput = document.getElementById("amount");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const transactionsContainer = document.getElementById(
    "transactions-container"
  );
  const summaryNetEl = document.getElementById("summary-net");
  const summaryPositive = document.getElementById("summary-positive");
  const summaryNegative = document.getElementById("summary-negative");
  const transactionCountEl = document.getElementById("transaction-count");
  const amountError = document.getElementById("amounterror");
  const notesError = document.getElementById("notesError");
  const sectorError = document.getElementById("sectorError");
  const updateTrStatusModal = document.getElementById("updateTrStatusModal");
  const cancelUpdate = document.getElementById("cancelUpdate");
  const confirmUpdate = document.getElementById("confirmUpdate");
  // qr
  const qrInput = document.getElementById("qr-input");
  const qrPreview = document.getElementById("qr-preview");
  const qrPlaceholder = document.getElementById("qr-placeholder");
  const qrImagePreview = document.getElementById("qr-image-preview");
  const qrImage = document.getElementById("qr-image");
  const removeQr = document.getElementById("remove-qr");
  const qrSelectBtn = document.getElementById("qr-select-btn");
  const qrUploadContainer = document.getElementById("qr-upload-container");
  const fakeFile = document.getElementById("fake-file");
  // modal
  const transactionModal = document.getElementById("transactionModal");
  const transactionForm = document.getElementById("transactionForm");
  const closeModalBtn = document.getElementById("closeModalBtn");
  // edit form modal
  const transactionModalEditForm = document.getElementById(
    "transactionModalEditForm"
  );
  const transactionFormEditForm = document.getElementById(
    "transactionFormEditForm"
  );
  const closeModalBtnEditForm = document.getElementById(
    "closeModalBtnEditForm"
  );

  // client variable
  const API_BASE_CLIENTS =
    "/api/v2/node/client?fields[]=nid&fields[]=field_name&sort[val]=field_name&sort[op]=asc&pager=0&offset=1000";
  let allClients = [];

  // filter dom
  const applyFilters = document.getElementById("applyFilters");
  const filterCategorySelect = document.getElementById("filterCategorySelect");
  const filterClientSelect = document.getElementById("filterClientSelect");
  const sortByDate = document.getElementById("sortByDate");
  let pageNumber = 0;
  let totalItems = 0;
  let offset = 10;

  // datetime-functionality
  const datetimeInput = document.querySelector('input[type="datetime-local"]');
  const now = new Date();
  const maxDate = now;

  const year = maxDate.getFullYear();
  const month = String(maxDate.getMonth() + 1).padStart(2, "0");
  const day = String(maxDate.getDate()).padStart(2, "0");
  const hours = String(maxDate.getHours()).padStart(2, "0");
  const minutes = String(maxDate.getMinutes()).padStart(2, "0");

  datetimeInput.max = `${year}-${month}-${day}T${hours}:${minutes}`;
  datetimeInput.value = `${year}-${month}-${day}T${hours}:${minutes}`;

  const API_BASE_EXCHANGE =
    "/api/v2/taxonomy_term/exchange?sort[val]=tid&sort[op]=desc";

  // Step configuration
  const nextBtn = document.getElementById("nextBtn");
  const originalBtnText = nextBtn.textContent;
  let currentStep = 1;
  const totalSteps = 4;
  // Step titles in French
  const stepTitles = {
    1: "Devise & Montant",
    2: "cours d'échange",
    3: "Données financières",
    4: "Photo de l’évidence",
  };

  // filter query

  let categorieFilterQuery = null;
  let clientFilterQuery = null;
  let PeriodQuery = null;
  let dateFilterQuery = null;
  let queryBuilder = [];

  // Rapport
  const showRapportForm = document.getElementById("showRapportForm");
  const reportModal = document.getElementById("reportModal");
  const reportForm = document.getElementById("reportForm");
  const closeReportModal = document.getElementById("closeReportModal");
  const rDescription = document.getElementById("rDescription");
  const dateRapprot = document.getElementById("dateRapprot");
  const rCategorie = document.getElementById("rCategorie");
  const rClientList = document.getElementById("rClientList");
  const rSoldeTotal = document.getElementById("rSoldeTotal");
  const saveReport = document.getElementById("saveReport");
  let totalReportRmb = 0;
  let totalReportAr = 0;
  let clientsReport = [];
  let categorieReport = filterCategorySelect.value;

  function showFormAndDetails() {
    reportModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    rDescription.value = "";
    dateRapprot.value = "";
    categorieReport = filterCategorySelect.value;
    rCategorie.textContent = filterCategorySelect.selectedOptions[0].text;

    // Vider le contenu avant d'ajouter
    rClientList.innerHTML = "";
    // Boucler et ajouter chaque <p>
    clientsReport.forEach((name) => {
      const p = document.createElement("p");
      p.className = "text-sm text-gray-900";
      p.textContent = name;
      rClientList.appendChild(p);
    });
  }

  showRapportForm.addEventListener("click", function () {
    showFormAndDetails();
  });

  saveReport.addEventListener("click", async function () {
    showLoader();
    try {
      const newReport = {
        title: "rapports",
        entity_type: "node",
        bundle: "rapports",
        body: "<h1>transaction</h1>",
        uid: 1,
        status: 1,
        field_category: parseInt(categorieReport),
        field_client: clientsReport.join(", "),
        field_date: dateRapprot.value,
        field_total_ariary: totalReportAr,
        field_total_rmb: totalReportRmb,
        field_description: rDescription.value,
      };
      const res = await fetch(`${API_ADD_TRANSACTION}`, {
        method: "POST",
        body: JSON.stringify(newReport),
      });

      if (!res.ok) throw new Error("Échec lors de l'ajout");
    } catch (error) {
      console.error("Des erreurs sont survenu :", error);
    } finally {
      reportModal.classList.add("hidden");
      showSuccessToast("Rapport ajouter avec succès");
      hideLoader();
    }
  });

  const fileError = document.getElementById("file-error");
  let base64File = null;

  qrSelectBtn.addEventListener("click", function () {
    qrInput.click();
  });

  qrInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    fileError.classList.add("hidden");
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        fileError.classList.remove("hidden");
        qrInput.value = "";
        return;
      }
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        fileError.textContent =
          "Format de fichier non valide. Utilisez .jpg, .png ou .gif.";
        fileError.classList.remove("hidden");
        qrInput.value = "";
        return;
      }
      const reader = new FileReader();
      reader.onload = function (e) {
        qrImage.src = e.target.result;
        qrPlaceholder.classList.add("hidden");
        qrImagePreview.classList.remove("hidden");
        qrPreview.classList.remove("hidden");
        base64File = e.target.result;
        fakeFile.value = "";
      };
      reader.readAsDataURL(file);
    }
  });

  removeQr.addEventListener("click", function () {
    qrInput.value = "";
    qrPlaceholder.classList.remove("hidden");
    qrImagePreview.classList.add("hidden");
    qrPreview.classList.add("hidden");
    fakeFile.value = "";
  });

  let transactions = [];

  function getSafeValue(input) {
    const raw = input.trim();
    amountError.classList.add("hidden");
    amountError.textContent = "";

    if (!raw) {
      amountError.textContent = "Le champ montant ne peut pas être vide !";
      amountError.classList.remove("hidden");
      return null;
    }

    if (!/^[0-9+\-*/().\s]+$/.test(raw)) {
      amountError.textContent = "Caractères non autorisés !";
      amountError.classList.remove("hidden");
      return null;
    }

    if (/[+\-*/]{2,}/.test(raw)) {
      amountError.textContent = "Syntaxe invalide !";
      amountError.classList.remove("hidden");
      return null;
    }

    try {
      const value = eval(raw);
      if (isNaN(value) || value === 0) {
        amountError.textContent = "Montant invalide !";
        amountError.classList.remove("hidden");
        return null;
      }
      return value;
    } catch {
      amountError.textContent = "Erreur dans l'évaluation !";
      amountError.classList.remove("hidden");
      return null;
    }
  }

  async function handleFilterClick(filterId, filterValue) {
    pageNumber = 0;
    getTransactionsRange(filterValue);
    if (queryBuilder.length == 1) {
      await fetchAllTransactions(queryBuilder[0].first);
      await fetchTransactions(queryBuilder[0].first);
    } else if (queryBuilder.length > 1) {
      await fetchAllTransactions(concatQueries(queryBuilder));
      await fetchTransactions(concatQueries(queryBuilder));
    }
    const buttons = document.querySelectorAll('[id^="filter-"]');
    document.getElementById("total-out").classList.remove("hidden");
    document.getElementById("total-in").classList.remove("hidden");
    document.getElementById("balance-available").classList.remove("hidden");

    // Reset tous les boutons
    buttons.forEach((btn) => {
      btn.classList.replace("bg-primary", "bg-gray-100");
      btn.classList.replace("text-white", "text-gray-600");
    });

    // Activer le bouton cliqué
    const current = document.getElementById(filterId);
    current.classList.replace("bg-gray-100", "bg-primary");
    current.classList.replace("text-gray-600", "text-white");
    scrollAtTheTopList();
    return totalItems;
  }

  // Déclaration des filtres (id bouton => valeur du filtre)
  const filters = {
    "filter-all": "All",
    "filter-in": "Entrée",
    "filter-out": "Sortie",
    "filter-today": "today",
    "filter-week": "week",
    "filter-month": "month",
  };

  // Attacher tous les events dynamiquement
  Object.entries(filters).forEach(([id, value]) => {
    document
      .getElementById(id)
      .addEventListener("click", () => handleFilterClick(id, value));
  });

  function searchClient(nid) {
    let clientName = "";
    allClients.forEach(function (client) {
      if (client.nid == nid) {
        clientName = client.field_name;
      }
    });
    return clientName;
  }

  function formatCurrency(amount, currency = "AR") {
    let options = {
      maximumFractionDigits: 0,
    };

    if (currency === "AR") {
      // Ariary
      return new Intl.NumberFormat("fr-MG", options).format(amount) + " Ar";
    } else if (currency === "RMB") {
      // Yuan chinois (RMB)
      return (
        new Intl.NumberFormat("zh-CN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(amount) + " RMB"
      );
    } else {
      // fallback générique
      return new Intl.NumberFormat(undefined, options).format(amount);
    }
  }

  function updatePreviewValues() {
    const amount = parseFloat(amountInput.value) || 0;
  }

  function updateSummary(data = null) {
    let pos;
    let neg;
    let total;
    let posRmb;
    let negRmb;
    let totalRmb;
    let ids;
    if (data) {
      pos = data
        .filter((t) => t.field_type == "Entrée")
        .reduce((sum, t) => sum + Number(t.field_amount), 0);
      neg = data
        .filter((t) => t.field_type == "Sortie")
        .reduce((sum, t) => sum + Number(t.field_amount), 0);
      posRmb = data
        .filter((t) => t.field_type == "Entrée")
        .reduce((sum, t) => sum + Number(t.field_montant_rmb), 0);
      negRmb = data
        .filter((t) => t.field_type == "Sortie")
        .reduce((sum, t) => sum + Number(t.field_montant_rmb), 0);
      ids = data.map((item) => item.field_client);
    } else {
      pos = transactions
        .filter((t) => t.field_type == "Entrée")
        .reduce((sum, t) => sum + Number(t.field_amount), 0);
      neg = transactions
        .filter((t) => t.field_type == "Sortie")
        .reduce((sum, t) => sum + Number(t.field_amount), 0);
      posRmb = transactions
        .filter((t) => t.field_type == "Entrée")
        .reduce((sum, t) => sum + Number(t.field_montant_rmb), 0);
      negRmb = transactions
        .filter((t) => t.field_type == "Sortie")
        .reduce((sum, t) => sum + Number(t.field_montant_rmb), 0);
      ids = transactions.map((item) => item.field_client);
    }
    total = pos - neg;
    totalRmb = posRmb - negRmb;
    totalReportRmb = totalRmb;
    totalReportAr = total;
    rSoldeTotal.textContent =
      formatCurrency(totalRmb, "RMB") + " / " + formatCurrency(total, "AR");
    summaryNetEl.textContent =
      formatCurrency(totalRmb, "RMB") + " / " + formatCurrency(total, "AR");
    summaryPositive.textContent =
      formatCurrency(posRmb, "RMB") + " / " + formatCurrency(pos, "AR");
    summaryNegative.textContent =
      formatCurrency(negRmb, "RMB") + " / " + formatCurrency(neg, "AR");

    // clients
    // Supprimer les doublons
    const uniqueIds = [...new Set(ids)];

    // Trouver les noms via searchClient
    clientsReport = uniqueIds.map((id) => searchClient(id));
  }

  function renderTransactions() {
    transactionsContainer.innerHTML = "";
    if (transactions.length === 0) {
      transactionsContainer.innerHTML = `
                            <div class="transaction-row px-4 py-3 cursor-pointer" data-date="2024-01-14"
                                data-type="income" data-amount="3200">
                                <div class="text-center py-8 text-gray-500">
                                    <i class="ri-inbox-line text-4xl mb-2 text-gray-300"></i>
                                    <p>Aucune transaction pour le moment</p>
                                </div>
                            </div>`;
      return;
    }

    let totalPages = 1;
    let firstPageSize = 10;
    let perPage = 10;
    // calcul du nombre de pages
    loadMoreBtn.classList.remove("hidden");
    if (totalItems > 10) {
      let restants = Math.max(totalItems - firstPageSize, 0);
      totalPages = Math.ceil(restants / perPage);
    }

    if (totalPages == pageNumber || totalItems < 10) {
      loadMoreBtn.classList.add("hidden");
    }

    transactions.forEach((t) => {
      let clientName = searchClient(t.field_client);
      const div = document.createElement("div");
      div.innerHTML = `

                            <div class="transaction-row px-4 py-3 cursor-pointer" data-id="${
                              t.nid
                            }" data-date="2024-01-15"
                                data-type="expense" data-amount="1250">
                                <div class="grid grid-cols-12 gap-2 items-center">
                                    <div class="col-span-2 fs-c-7">
                                        <div class="text-gray-900">${
                                          t.field_date
                                            ? formatDate(t.field_date)
                                            : "Pas de date"
                                        }</div>
                                        <div class="text-xs text-gray-500 hidden">2024</div>
                                    </div>
                                    <div class="col-span-4">
                                        <div class="flex items-center gap-2">
                                            <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center hidden justify-center">
                                                <i class="ri-shopping-cart-line text-red-600 text-sm"></i>
                                            </div>
                                            <div>
                                                <div class="text-sm text-gray-900">
                                                    <span class="inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-500 ring-1 ring-inset ring-yellow-400/20 text-center">
                                ${t.field_category.title}</span>
                                                </div>
                                                <div class="text-xs text-gray-500 ms-1 mt-2">${clientName}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-span-6 text-right fs-c-7">
                                        <div class="text-gray-500 w-min ms-auto" onclick="event.stopPropagation(); showEditStatusModal(${
                                          t.nid
                                        }, '${t.field_status}')">
                                            <span class="inline-flex items-center rounded-md bg-purple-400/10 px-2 py-1 text-xs font-medium text-purple-500 ring-1 ring-inset ring-purple-400/20 text-center">
                                                ${
                                                  t.field_status
                                                    ? t.field_status
                                                    : "Draft"
                                                }
                                            </span>
                                        </div>
                                        <div class="${
                                          t.field_type == "Entrée"
                                            ? "text-green-600"
                                            : "text-red-600"
                                        }">${formatCurrency(
        t.field_montant_rmb,
        "RMB"
      )} / ${t.field_cours}</div>
                                        <div class="${
                                          t.field_type == "Entrée"
                                            ? "text-green-600"
                                            : "text-red-600"
                                        }">${formatCurrency(
        t.field_amount,
        "AR"
      )}</div>
                                    </div>
                                </div>
                            </div>`;

      const row = div.querySelector(".transaction-row");

      row.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        const id = this.dataset.id;
        if (id) show(id);
      });
      transactionsContainer.appendChild(div);
    });
  }

  async function fetchTransactions(req) {
    showLoader();
    let urlQuery = null;
    if (req == "All" && queryBuilder.length == 1) {
      urlQuery =
        API_TRANSACTION +
        "?fields[]=title&fields[]=created&fields[]=field_evidence&fields[]=field_category&fields[]=field_amount&fields[]=nid&fields[]=field_type&fields[]=field_description&fields[]=field_date&sort[val]=nid&sort[op]=desc&pager=" +
        pageNumber +
        "&offset=10";
    } else {
      urlQuery =
        API_TRANSACTION +
        "?fields[]=title&fields[]=created&fields[]=field_evidence&fields[]=field_category&fields[]=field_amount&fields[]=nid&fields[]=field_type&fields[]=field_description&fields[]=field_date&sort[val]=nid&sort[op]=desc" +
        req +
        "&pager=" +
        pageNumber +
        "&offset=10";
    }
    try {
      const res = await fetch(`${urlQuery}`);
      const dataArray = await res.json();
      const data = dataArray.rows;

      if (pageNumber == 0) {
        transactions = data;
      } else {
        data.forEach((item) => {
          const index = transactions.findIndex((t) => t.nid === item.nid);
          if (index !== -1) {
            // Si l'élément existe déjà, on le remplace
            transactions[index] = item;
          } else {
            // Sinon, on l'ajoute
            transactions.push(item);
          }
        });
      }
      renderTransactions();
      return data;
    } catch (e) {
      console.error("Erreur de chargement :", e);
      throw e;
    } finally {
      localStorage.removeItem("items");
      hideLoader();
    }
  }

  async function fetchAllTransactions(req) {
    showLoader();
    urlQuery =
      API_TRANSACTION +
      "?fields[]=field_amount&fields[]=nid&fields[]=field_type&sort[val]=nid&sort[op]=desc&pager=0&offset=1000" +
      req;
    try {
      const res = await fetch(`${urlQuery}`);
      const dataArray = await res.json();
      const data = dataArray.rows;
      updateSummary(data);
      totalItems = data.length;
      return totalItems;
    } catch (e) {
      console.error("Erreur de chargement :", e);
    } finally {
      hideLoader();
    }
  }

  function getTransactionsRange(type = "today") {
    const now = new Date();
    let start, end;

    if (type == "All") {
      pushWithKey(queryBuilder, "first", "");
      return null;
    }

    // Calcul du début et de la fin de "aujourd'hui"
    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0
    );
    const todayEnd = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59
    );
    const todayStartTs = Math.floor(todayStart.getTime() / 1000);
    const todayEndTs = Math.floor(todayEnd.getTime() / 1000);

    // Cas spécial : Entrée / Sortie (uniquement aujourd'hui)
    if (type === "Entrée" || type === "Sortie") {
      let typeQuery =
        `&filters[field_type][val]=${encodeURIComponent(type)}` +
        `&filters[created][op]=BETWEEN&filters[created][val][]=${todayStartTs}&filters[created][val][]=${todayEndTs}`;
      // queryBuilder.push(typeQuery)
      pushWithKey(queryBuilder, "first", typeQuery);
      return typeQuery;
    }

    // Sinon, cas génériques
    if (type === "today") {
      start = todayStart;
      end = todayEnd;
    }

    if (type === "week") {
      const day = now.getDay();
      const diffToMonday = day === 0 ? -6 : 1 - day;
      start = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + diffToMonday,
        0,
        0,
        0
      );
      end = new Date(start);
      end.setDate(start.getDate() + 6);
      end.setHours(23, 59, 59);
    }

    if (type === "month") {
      start = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    }
    const startTs = Math.floor(start.getTime() / 1000);
    const endTs = Math.floor(end.getTime() / 1000);

    let rangeQuery = `&filters[created][op]=BETWEEN&filters[created][val][]=${startTs}&filters[created][val][]=${endTs}`;
    pushWithKey(queryBuilder, "first", rangeQuery);
    return rangeQuery;
  }

  async function deleteTransactionById(id) {
    showLoader();
    try {
      const res = await fetch(
        `/confirm/node/${id}/delete`,
        {
          method: "POST",
        }
      );

      if (!res.ok) throw new Error("Échec de suppression");

      transactions = transactions.filter((t) => t.nid != id);
      renderTransactions();
      await fetchAllTransactions(concatQueries(queryBuilder));
    } catch (err) {
      console.error("Erreur de suppression :", err);
    } finally {
      hideLoader();
      transactionModal.classList.add("hidden");
    }
  }

  async function editTransaction(id) {
    showLoader();
    transaction = await getTransactionDetails(id);
    fakeFile.value = "edit";
    if (transaction) {
      let description = document.getElementById("notes");
      let category = document.getElementById("sector");
      let client = document.getElementById("client");
      let amount = document.getElementById("amount");
      let id = document.getElementById("tr-id");
      let exchange = document.getElementById("exchange");
      if (transaction.field_description) {
        description.value = transaction.field_description;
      }
      if (transaction.field_type == "Sortie") {
        document.querySelector(
          'input[name="transaction_type"][value="Sortie"]'
        ).checked = true;
        amount.value = transaction.field_amount;
      } else {
        document.querySelector(
          'input[name="transaction_type"][value="Entrée"]'
        ).checked = true;
        amount.value = transaction.field_montant_rmb;
      }

      if (transaction.field_evidence) {
        qrImage.src = transaction.field_evidence.url;
        qrPlaceholder.classList.add("hidden");
        qrImagePreview.classList.remove("hidden");
        qrPreview.classList.remove("hidden");
      }
      datetimeInput.value = transaction.field_date;
      category.value = transaction.field_category.tid;
      client.value = transaction.field_client;
      exchange.value = transaction.field_cours;
      id.value = transaction.nid;
      hideLoader();
    } else {
      console.error("Acune transaction trouvé");
    }
  }

  async function updateTransaction(id, data) {
    try {
      showLoader();
      const res = await fetch(`${API_ADD_TRANSACTION}`, {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Échec de la mise à jour");

      const updatedTransaction = await res.json();
      show(updatedTransaction.item.nid);
      await fetchAllTransactions(concatQueries(queryBuilder));
      await fetchTransactions(concatQueries(queryBuilder));
      transactionModalEditForm.classList.add("hidden");
      return updatedTransaction;
    } catch (err) {
      console.error("Des erreurs sont survenu :", err);
    } finally {
      clearInputValue("update");
      hideLoader();
      nextBtn.disabled = false;
      nextBtn.textContent = originalBtnText;
      currentStep = 1;
      updateStepDisplay();
      showSuccessToast("Modifications enregistrées");
    }
  }

  function showEditStatusModal(id, status = "Draft") {
    let idTr = document.getElementById("idTr");
    idTr.value = id;
    // Cherche l'input radio qui a comme value la valeur du paramètre "status"
    const radio = document.querySelector(
      `input[name="transaction_state"][value="${status}"]`
    );

    if (radio) {
      radio.checked = true;
    }
    updateTrStatusModal.classList.remove("hidden");
  }

  cancelUpdate.addEventListener("click", function () {
    updateTrStatusModal.classList.add("hidden");
    document.body.style.overflow = "";
  });
  confirmUpdate.addEventListener("click", function () {
    let checkedValue = document.querySelector(
      'input[name="transaction_state"]:checked'
    )?.value;
    let idTr = document.getElementById("idTr").value;
    updateTransactionStatus(idTr, checkedValue);
  });

  async function updateTransactionStatus(id, data) {
    showLoader();
    try {
      const statusData = {
        nid: parseInt(id),
        entity_type: "node",
        bundle: "transactions",
        field_status: data,
      };
      const res = await fetch(`${API_ADD_TRANSACTION}`, {
        method: "POST",
        body: JSON.stringify(statusData),
      });

      if (!res.ok) throw new Error("Échec de la mise à jour");

      const updatedTransaction = await res.json();
      const transactionToUpdate = transactions.find(
        (t) => t.nid == parseInt(id)
      );
      if (transactionToUpdate) {
        transactionToUpdate.field_status = data;
      }
      show(updatedTransaction.item.nid);
      renderTransactions();
    } catch (err) {
      console.error("Des erreurs sont survenu :", err);
      showErrorToast("Erreur lors de la modification de la transaction");
    } finally {
      document.getElementById("idTr").value = "";
      updateTrStatusModal.classList.add("hidden");
      showSuccessToast("Modifications enregistrées");
      hideLoader();
    }
  }

  async function show(id) {
    transaction = await getTransactionDetails(id);
    let clientName = searchClient(transaction.field_client);
    transactionModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    let details = `<div>
                        <div class="flex flex-col items-center py-6">
                            <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-3  ${
                              transaction.field_type == "Entrée"
                                ? "bg-green-100"
                                : "bg-red-100"
                            }">
                                <i class="ri-money-dollar-circle-line text-xl ${
                                  transaction.field_type == "Entrée"
                                    ? "text-green-500"
                                    : "text-red-500"
                                }"></i>
                            </div>
                            <div class="text-2xl font-semibold mb-1 ${
                              transaction.field_type == "Entrée"
                                ? "text-green-500"
                                : "text-red-500"
                            }">${formatCurrency(
      transaction.field_amount,
      "AR"
    )}</div>
                            <div class="flex justify-start items-center gap-2">
                                <button class="edit-btn w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 hover:bg-blue-200 transition-colors" data-id="${
                                  transaction.nid
                                }">
                                    <i class="ri-edit-line text-blue-600 text-sm"></i>
                                </button>
                                <button class="remove-btn w-6 h-6 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 transition-colors" onclick="showDeleteModal(${
                                  transaction.nid
                                })" data-id="${transaction.nid}">
                                    <i class="ri-delete-bin-line text-red-600 text-sm"></i>
                                </button>
                            </div>
                        </div>
                        <div class="space-y-4">
                            <div class="flex justify-between py-2 border-b border-gray-100 items-center">
                                <span class="text-sm text-gray-600">Client</span>
                                <span class="text-sm text-gray-900">${clientName}</span>
                            </div>
                            <div class="flex justify-between py-2 border-b border-gray-100 items-center">
                                <span class="text-sm text-gray-600">Type</span>
                                <span class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inse
                                    ${
                                      transaction.field_type == "Entrée"
                                        ? "text-green-400 ring-green-400/20 bg-green-400/10"
                                        : "text-red-400 ring-red-400/20 bg-red-400/10"
                                    }"">${transaction.field_type}</span>
                            </div>
                            <div class="flex justify-between py-2 border-b border-gray-100 items-center">
                                <span class="text-sm text-gray-600">Status</span>
                                <span class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inse
                                    text-purple-400 ring-purple-400/20 bg-purple-400/10" onclick="showEditStatusModal(${
                                      transaction.nid
                                    }, '${transaction.field_status}')">
                                        ${
                                          transaction.field_status
                                            ? transaction.field_status
                                            : "Draft"
                                        }
                                    </span>
                            </div>
                            <div class="flex justify-between py-2 border-b border-gray-100 items-center">
                                <span class="text-sm text-gray-600">Date du transaction</span>
                                <span class="text-sm text-gray-900">${
                                  transaction.field_date
                                    ? formatDate(transaction.field_date)
                                    : "Pas de date"
                                }</span>
                            </div>
                            <div class="flex justify-between py-2 border-b border-gray-100 items-center">
                                <span class="text-sm text-gray-600">Date d'insertion</span>
                                <span class="text-sm text-gray-900">${formatTimestampDate(
                                  transaction.created
                                )}</span>
                            </div>
                            <div class="flex justify-between py-2 border-b border-gray-100 items-center">
                                <span class="text-sm text-gray-600">Catégorie</span>
                                <span class="inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-500 ring-1 ring-inset ring-yellow-400/20 text-center">
                                    ${transaction.field_category.title}
                                </span>
                            </div>
                            <!--<div class="flex justify-between py-2 border-b border-gray-100 items-center">
                                <span class="text-sm text-gray-600">Statut</span>
                                <span class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inse
                                    text-green-400 ring-green-500/20 bg-green-400/10">Payé</span>
                            </div>-->
                        </div>

                                ${
                                  transaction.field_description
                                    ? `<div class="space-y-2">
                                            <div class="text-sm text-gray-600 mt-4">Description</div>
                                            <div class="w-full p-3 pt-1 text-sm text-gray-900">${transaction.field_description}</div>
                                        </div>`
                                    : ``
                                }

                        <div class="flex flex-col mt-0 gap-3 pb-3 border-b border-gray-100">
                            <span class="text-sm text-gray-600 mt-4">Évidence associée</span>
                            <div class="flex flex-wrap justify-center items-center gap-2">
                                ${
                                  transaction.field_evidence?.url
                                    ? `<div class="w-full md:w-1/2 flex justify-center">
                                                        <img src="${transaction.field_evidence.url}" alt="Image" class="w-1/4 md:w-auto max-w-full rounded-2xl">
                                                </div>`
                                    : `<span class="text-gray-400 text-sm">Aucune image</span>`
                                }
                            </div>
                        </div>
                    </div>`;

    transactionForm.innerHTML = details;

    // edit transaction
    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        transactionModal.classList.add("hidden");
        transactionModalEditForm.classList.remove("hidden");
        document.body.style.overflow = "";
        const id = this.dataset.id;
        if (id) editTransaction(id);
      });
    });

    attachCloseHandler(closeModalBtn, transactionModal);
    attachCloseHandler(closeModalBtnEditForm, transactionModalEditForm);
  }

  async function getTransactionDetails(id) {
    showLoader();
    try {
      const url = `${API_TRANSACTION}?filters[nid][val]=${id}&fields[]=title&fields[]=field_evidence&fields[]=created&fields[]=field_category&fields[]=field_amount&fields[]=nid&fields[]=field_type&fields[]=field_description&fields[]=field_date`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Erreur API : " + response.status);

      const dataArray = await response.json();
      const data = dataArray.rows;

      // data est un tableau d'éléments, ici 0 ou 1
      return data.length > 0 ? data[0] : null;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de la transaction :",
        error
      );
      return null;
    } finally {
      hideLoader();
    }
  }

  function attachCloseHandler(button, modal) {
    button.addEventListener("click", function () {
      modal.classList.add("hidden");
      document.body.style.overflow = "";
    });
  }
  attachCloseHandler(closeReportModal, reportModal);

  function showLoader() {
    document.getElementById("page-loader").classList.remove("hidden");
  }

  function clearInputValue(type) {
    let description = document.getElementById("notes");
    let category = document.getElementById("sector");
    let amount = document.getElementById("amount");
    let id = document.getElementById("tr-id");
    description.value = "";
    amount.value = "";
    id.value = "";
    qrInput.value = "";
    qrImagePreview.classList.add("hidden");
    qrPlaceholder.classList.remove("hidden");
    qrUploadContainer.classList.add("border-grey-100");
    qrUploadContainer.classList.remove("border-red-500");
    if (type != "add") {
      document.querySelector(
        'input[name="transaction_type"][value="Entrée"]'
      ).checked = true;
      category.value = "";
    }
  }

  function hideLoader() {
    document.getElementById("page-loader").classList.add("hidden");
  }

  function scrollAtTheTopList() {
    const container = document.getElementById("transactions-container");
    if (container) {
      container.scrollTo({
        top: 0,
        behavior: "smooth", // Animation fluide
      });
    }
  }

  function formatDate(isoString) {
    const date = new Date(isoString);

    const months = [
      "janv",
      "févr",
      "mars",
      "avr",
      "mai",
      "juin",
      "juil",
      "août",
      "sept",
      "oct",
      "nov",
      "déc",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    // Vérifier si la chaîne ISO contient l'heure
    const hasTime = isoString.includes("T");

    let timePart = "";
    if (hasTime) {
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      timePart = ` ${hours}h${minutes}`;
    }

    return `${day} ${month}<br>${timePart}`;
  }

  function formatTimestampDate(timestamp) {
    const date = new Date(timestamp * 1000);

    const months = [
      "janv",
      "févr",
      "mars",
      "avr",
      "mai",
      "juin",
      "juil",
      "août",
      "sept",
      "oct",
      "nov",
      "déc",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }

  function pushWithKey(queryBuilder, key, value) {
    // On cherche s'il existe déjà un objet avec cette clé
    const index = queryBuilder.findIndex((item) => item[key] !== undefined);

    if (index > -1) {
      // On supprime complètement l’ancien objet
      queryBuilder.splice(index, 1);
    }

    // On ajoute toujours la nouvelle valeur à la fin
    queryBuilder.push({ [key]: value });

    return queryBuilder;
  }

  function concatQueries(queryObjects) {
    let finalQuery = "";

    queryObjects.forEach((obj) => {
      const query = Object.values(obj)[0]; // on récupère la string de l’objet
      if (!finalQuery) {
        // si finalQuery est vide → on garde tel quel
        finalQuery = query;
      } else {
        // sinon → on supprime le ? et on concatène avec &
        finalQuery += query.replace(/^\?/, "");
      }
    });

    return finalQuery;
  }

  applyFilters.addEventListener("click", async () => {
    pageNumber = 0;
    let filtersFinalQuery = "";
    loadMoreBtn.classList.add("hidden");
    if (filterCategorySelect.value || filterClientSelect.value) {
      if (filterCategorySelect.value) {
        categorieFilterQuery =
          "&filters[field_category][val]=" + filterCategorySelect.value;
        document.getElementById("active-category").textContent =
          filterCategorySelect.selectedOptions[0].text;
        document.getElementById("active-category").classList.remove("hidden");
        showRapportForm.classList.remove("hidden");
      }
      if (filterClientSelect.value) {
        clientFilterQuery =
          "&filters[field_client][val]=" + filterClientSelect.value;
        document.getElementById("active-client").textContent =
          filterClientSelect.selectedOptions[0].text;
        document.getElementById("active-client").classList.remove("hidden");
      }
      filtersFinalQuery = categorieFilterQuery + clientFilterQuery;
      pushWithKey(queryBuilder, "category", filtersFinalQuery);
    } else {
      pushWithKey(queryBuilder, "category", "");
      if (!filterCategorySelect.value) {
        document.getElementById("active-category").classList.add("hidden");
        showRapportForm.classList.add("hidden");
      }
      if (!filterClientSelect.value) {
        document.getElementById("active-client").classList.add("hidden");
      }
    }
    filterPanel.classList.remove("active");
    await fetchAllTransactions(concatQueries(queryBuilder));
    await fetchTransactions(concatQueries(queryBuilder));
  });

  sortByDate.addEventListener("click", async () => {
    pageNumber = 0;
    loadMoreBtn.classList.add("hidden");
    if (sortByDate.getAttribute("data-date") == "asc") {
      sortByDate.setAttribute("data-date", "desc");
      pushWithKey(
        queryBuilder,
        "dateSort",
        "&sort[val]=field_date&sort[op]=desc"
      );
    } else {
      sortByDate.setAttribute("data-date", "asc");
      pushWithKey(
        queryBuilder,
        "dateSort",
        "&sort[val]=field_date&sort[op]=asc"
      );
    }
    await fetchAllTransactions(concatQueries(queryBuilder));
    await fetchTransactions(concatQueries(queryBuilder));
  });

  loadMoreBtn.addEventListener("click", function () {
    pageNumber++;
    fetchTransactions(concatQueries(queryBuilder));
  });

  // Toast handling
  function showSuccessToast(msg) {
    const successToast = document.createElement("div");
    successToast.className =
      "fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium z-50";
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
      "fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium z-50";
    successToast.textContent = msg;
    document.body.appendChild(successToast);
    setTimeout(() => {
      successToast.remove();
      document.body.style.overflow = "";
    }, 5000);
  }

  // Delete Modal
  function showDeleteModal(id) {
    transaction = transactions.find((tr) => tr.nid == id);
    if (transaction) {
      deletingId = id;
      // document.getElementById('deleteCategoryName').textContent = category.name;
      document.getElementById("deleteModal").classList.remove("hidden");
    }
  }

  // Delete Modal handling
  const deleteModal = document.getElementById("deleteModal");
  const cancelDelete = document.getElementById("cancelDelete");
  const confirmDelete = document.getElementById("confirmDelete");

  cancelDelete.addEventListener("click", function () {
    deleteModal.classList.add("hidden");
    deletingId = null;
  });

  confirmDelete.addEventListener("click", async function () {
    if (deletingId) {
      await deleteTransactionById(deletingId);
      deleteModal.classList.add("hidden");
      deletingId = null;
    }
    showSuccessToast("Transaction supprimée avec succès");
  });

  deleteModal.addEventListener("click", function (e) {
    if (e.target === deleteModal) {
      deleteModal.classList.add("hidden");
      deletingId = null;
    }
  });

  // step form handler
  // Update display for current step
  function updateStepDisplay() {
    // Update step text and progress
    document.getElementById(
      "stepText"
    ).textContent = `Étape ${currentStep} sur ${totalSteps}`;
    document.getElementById("stepTitle").textContent = stepTitles[currentStep];
    document.getElementById("progressBar").style.width = `${
      (currentStep / totalSteps) * 100
    }%`;
    // Hide all steps and show current step
    document
      .querySelectorAll(".step-content")
      .forEach((step) => step.classList.add("hidden"));
    document.getElementById(`step${currentStep}`).classList.remove("hidden");
    // Get navigation buttons
    const prevBtn = document.getElementById("prevBtn");
    // Update button states based on current step
    if (currentStep === 1) {
      prevBtn.classList.add("hidden");
      nextBtn.textContent = "Suivant";
    } else if (currentStep === totalSteps) {
      prevBtn.classList.remove("hidden");
      nextBtn.textContent = "Enregistrez";
    } else {
      prevBtn.classList.remove("hidden");
      nextBtn.textContent = "Suivant";
    }
  }
  // Handle next button click
  document.getElementById("nextBtn").addEventListener("click", function () {
    // Check if we're not on the last step
    if (currentStep < totalSteps) {
      // Validate current step before proceeding
      if (validateCurrentStep()) {
        currentStep++;
        updateStepDisplay();
      }
    } else {
      // On last step, complete the transaction
      completeTransaction();
    }
  });
  // Handle previous button click
  document.getElementById("prevBtn").addEventListener("click", function () {
    if (currentStep > 1) {
      currentStep--;
      updateStepDisplay();
    }
  });
  // Validate current step before proceeding
  function validateCurrentStep() {
    // Réinitialiser les messages d'erreur
    notesError.classList.add("hidden");
    notesError.textContent = "";
    exchangeError.classList.add("hidden");
    exchangeError.textContent = "";

    const description = document.getElementById("notes");
    const type = document.querySelector(
      'input[name="transaction_type"]:checked'
    )?.value;
    const category = document.getElementById("sector");
    const exchange = document.getElementById("exchange");
    // For step 1, validate amount
    if (currentStep === 2) {
      if (!exchange.value) {
        exchangeError.textContent = "Entrez un montant";
        exchangeError.classList.remove("hidden");
        return false;
      }
    } else if (currentStep === 2) {
      if (!getSafeValue(amountInput.value)) return false;
      // Vérification description
      // if (!description.value.trim()) {
      //     notesError.textContent = "La description est obligatoire !";
      //     notesError.classList.remove("hidden");
      //     return false;
      // }
    }
    return true;
  }
  // Complete transaction and show success modal
  function completeTransaction() {
    // Show loading state
    nextBtn.disabled = true;
    const id = document.getElementById("tr-id").value;
    const value = getSafeValue(amountInput.value);
    const description = document.getElementById("notes");
    const type = document.querySelector(
      'input[name="transaction_type"]:checked'
    )?.value;
    const category = document.getElementById("sector");
    let client = document.getElementById("client");
    let exchange = document.getElementById("exchange").value;
    let field_amount, field_montant_rmb;

    if (type === "Entrée") {
      field_amount = parseFloat(value * exchange);
      field_montant_rmb = value;
    } else {
      field_amount = value;
      field_montant_rmb = parseFloat(value / exchange);
    }
    nextBtn.innerHTML = `
                            <div class="flex items-center justify-center">
                                <div class="animate-spin mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                            </div>
                        `;
    const formData = {
      nid: id,
      title: "transaction",
      entity_type: "node",
      bundle: "transactions",
      field_category: parseInt(category.value),
      body: "<h1>transaction</h1>",
      field_description: description.value.trim(),
      uid: 1,
      status: 1,
      field_amount: field_amount,
      field_type: type,
      field_date: datetimeInput.value,
      field_client: client.value,
      field_cours: parseFloat(exchange),
      field_montant_rmb: field_montant_rmb,
    };
    if (base64File) {
      formData.field_evidence = base64File;
    }
    updateTransaction(id, formData);

    amountInput.value = "";
    updatePreviewValues();
  }
  // Initialize step display
  updateStepDisplay();

  // fetch all exchanges value
  async function loadExchanges() {
    try {
      const res = await fetch(API_BASE_EXCHANGE);
      const dataArray = await res.json();
      const exchange = dataArray.rows[0];
      document.getElementById("exchange").value = exchange.name;
      document.getElementById("currentRate").textContent = exchange.name;
    } catch (error) {
      console.error("Erreur lors du chargement des données :", error);
    }
  }
  loadExchanges();

  // fetch all clients
  async function loadClients() {
    try {
      const res = await fetch(API_BASE_CLIENTS);
      const dataArray = await res.json();
      const clients = dataArray.rows;
      allClients = clients;
      const select = document.getElementById("client");
      const filterClientSelect = document.getElementById("filterClientSelect");
      // Vider les options existantes sauf la première
      filterClientSelect.innerHTML =
        '<option value="">Tous les clients</option>';

      // Ajouter les clients depuis l'API
      clients.forEach((client) => {
        const option1 = document.createElement("option");
        option1.value = client.nid; // option value formatée
        option1.textContent = client.field_name;
        const option2 = option1.cloneNode(true);
        select.appendChild(option1);
        filterClientSelect.appendChild(option2);
      });
    } catch (error) {
      console.error("Erreur lors du chargement des clients :", error);
    }
  }
  loadClients();

  window.showDeleteModal = showDeleteModal;
  window.showEditStatusModal = showEditStatusModal;

  amountInput.addEventListener("input", updatePreviewValues);

  getTransactionsRange("today");
  const ClientItemsRapport = JSON.parse(localStorage.getItem("items"));
  if (ClientItemsRapport) {
    const ClientNameRapport = ClientItemsRapport.name;
    const ClientIdRapport = ClientItemsRapport.id;
    (async function () {
      queryBuilder = [
        {
          category:
            "&filters[field_category][val]=27&filters[field_client][val]=" +
            ClientItemsRapport.id,
        },
        {
          first: "",
        },
      ];
      document.getElementById("active-category").textContent = "Suivi payment";
      document.getElementById("active-category").classList.remove("hidden");
      document.getElementById("active-client").textContent =
        ClientItemsRapport.name;
      document.getElementById("active-client").classList.remove("hidden");
      showRapportForm.classList.remove("hidden");
      handleFilterClick("filter-all", "All");
    })();
    setTimeout(() => {
      filterCategorySelect.value = 27;
      categorieReport = 27;
      clientsReport = [ClientNameRapport];
      filterClientSelect.value = parseInt(ClientIdRapport);
    }, 1500);
  } else {
    (async function () {
      await fetchAllTransactions(queryBuilder[0].first);
      await fetchTransactions(queryBuilder[0].first);
    })();
  }

  async function loadSectors() {
    try {
      const res = await fetch(API_BASE_CATEGORIES);
      const dataArray = await res.json();
      const categories = dataArray.rows;

      const select = document.getElementById("sector");
      const filterCategorySelect = document.getElementById(
        "filterCategorySelect"
      );

      // Vider les options existantes sauf la première
      filterCategorySelect.innerHTML =
        '<option value="">Tous les categories</option>';

      // Ajouter les catégories depuis l'API
      categories.forEach((cat) => {
        const option1 = document.createElement("option");
        option1.value = cat.tid; // option value formatée
        option1.textContent = cat.name;
        const option2 = option1.cloneNode(true);

        select.appendChild(option1);
        filterCategorySelect.appendChild(option2);
      });
    } catch (error) {
      console.error("Erreur lors du chargement des secteurs :", error);
    }
  }
  loadSectors();

  // FAB handler
  const fabButton = document.getElementById("fabButton");
  const fabMenu = document.getElementById("fabMenu");
  let isMenuOpen = false;
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
      fabMenu.classList.remove("scale-0");
      fabMenu.classList.add("scale-100");
      fabButton.style.transform = "rotate(45deg)";
    } else {
      fabMenu.classList.remove("scale-100");
      fabMenu.classList.add("scale-0");
      fabButton.style.transform = "rotate(0)";
    }
  }
  fabButton.addEventListener("click", toggleMenu);
  document.addEventListener("click", function (event) {
    const isClickInside =
      fabButton.contains(event.target) || fabMenu.contains(event.target);
    if (!isClickInside && isMenuOpen) {
      toggleMenu();
    }
  });

  // FILTER TOGGLE

  const filterBtn = document.getElementById("filterBtn");
  const filterPanel = document.getElementById("filterPanel");
  const closeFilterBtn = document.getElementById("closeFilterBtn");
  filterBtn.addEventListener("click", function () {
    filterPanel.classList.add("active");
  });
  closeFilterBtn.addEventListener("click", function () {
    filterPanel.classList.remove("active");
  });
}
