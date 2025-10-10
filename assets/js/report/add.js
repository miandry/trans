function initAddReportPage() {
  const API_BASE = "/crud/save";
  const API_RAPPORT = "/api/v2/node/rapports";
  const API_BASE_CATEGORIES =
    "/api/v2/taxonomy_term/category?fields[]=tid&fields[]=name&sort[val]=name&sort[op]=asc";

  let rapports = [];
  let toExport = [];
  let rapport = null;
  let deletingId = null;
  const rapportsContainer = document.getElementById("rapports-container");
  const emptyReport = document.getElementById("emptyReport");
  const deleteReportBtn = document.getElementById("deleteReportBtn");
  const bottomSumary = document.getElementById("bottomSumary");
  const rmbSumary = document.getElementById("summary-rmb");
  const arSumary = document.getElementById("summary-ar");
  const fabButton = document.getElementById("fabButton");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const exportExcel = document.getElementById("exportExcel");

  // client variable
  const API_BASE_CLIENTS =
    "/api/v2/node/client?fields[]=nid&fields[]=field_name&sort[val]=field_name&sort[op]=asc&pager=0&offset=1000";
  let allClients = [];

  // filter dom
  const sortByDate = document.getElementById("sortByDate");

  const API_BASE_EXCHANGE =
    "/api/v2/taxonomy_term/exchange?sort[val]=tid&sort[op]=desc";

  // Rapport
  const reportModal = document.getElementById("reportModal");
  const reportForm = document.getElementById("reportForm");
  const closeReportModal = document.getElementById("closeReportModal");
  const reportModalAdd = document.getElementById("reportModalAdd");
  const addReportForm = document.getElementById("addReportForm");
  const closeReportModalAdd = document.getElementById("closeReportModalAdd");
  const rDescription = document.getElementById("rDescription");
  const amountRmbEdit = document.getElementById("amountRmbEdit");
  const amountArEdit = document.getElementById("amountArEdit");
  const dateRapprot = document.getElementById("dateRapprot");
  const rCategorie = document.getElementById("rCategorie");
  const rClientList = document.getElementById("rClientList");
  const rSoldeTotal = document.getElementById("rSoldeTotal");

  let rId = null;
  const saveReport = document.getElementById("saveReport");
  let totalReportRmb = 0;
  let totalReportAr = 0;
  let clientsReport = [];
  let pageNumber = 0;
  let totalRapports = 0;
  let totalPages = 0;
  let perPage = 10;
  let activeDateSort = "desc";
  let activeDateRange = getTransactionsRange("today");

  // add rapport
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

  // --- Fonction de validation ---
  function validateReportFormEdit() {
    let isValid = true;

    // reset erreurs
    amountRmbEditError.classList.add("hidden");
    amountArEditError.classList.add("hidden");

    // montant Ariary
    if (amountArEdit.value.trim() === "" || isNaN(amountArEdit.value)) {
      amountArEditError.textContent = "Montant Ar invalide";
      amountArEditError.classList.remove("hidden");
      isValid = false;
    }

    // montant RMB
    if (amountRmbEdit.value.trim() === "" || isNaN(amountRmbEdit.value)) {
      amountRmbEditError.textContent = "Montant RMB invalide";
      amountRmbEditError.classList.remove("hidden");
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
      handleFilterClick("filter-today", "today");
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
      hideLoader();
    }
  }

  function showFormAndDetails(rapport) {
    reportModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    if (rapport.field_description) {
      rDescription.value = rapport.field_description;
    }
    amountRmbEdit.value = rapport.field_total_rmb;
    amountArEdit.value = rapport.field_total_ariary;
    const rawDate = rapport.field_date;
    const onlyDate = rawDate.split("T")[0];
    dateRapprot.value = onlyDate;
    rCategorie.textContent = rapport.field_category.title;
    rSoldeTotal.textContent =
      formatCurrency(rapport.field_total_rmb, "RMB") +
      " / " +
      formatCurrency(rapport.field_total_ariary, "AR");
    rId = rapport.nid;
    let str = rapport.field_client;
    let clientsReport = str.split(",").map((item) => item.trim());
    // Vider le contenu avant d'ajouter
    rClientList.innerHTML = "";
    // Boucler et ajouter chaque <p>
    clientsReport.forEach((name) => {
      const p = document.createElement("p");
      p.className = "text-sm text-gray-900 capitalize";
      p.textContent = name;
      rClientList.appendChild(p);
    });
  }

  saveReport.addEventListener("click", async function () {
    if (validateReportFormEdit) {
      showLoader();
      try {
        const newReport = {
          nid: parseInt(rId),
          title: "rapport",
          entity_type: "node",
          bundle: "rapports",
          body: "<h1>Rapport</h1>",
          uid: 1,
          status: 1,
          field_date: dateRapprot.value,
          field_description: rDescription.value,
          field_total_rmb: amountRmbEdit.value,
          field_total_ariary: amountArEdit.value,
        };
        const res = await fetch(`${API_BASE}`, {
          method: "POST",
          body: JSON.stringify(newReport),
        });

        if (!res.ok) throw new Error("Échec lors de la modification");
        // rapports
        const reportToUpdate = rapports.find((r) => r.nid == parseInt(rId));
        if (reportToUpdate) {
          reportToUpdate.field_total_rmb = amountRmbEdit.value;
          reportToUpdate.field_total_ariary = amountArEdit.value;
        }
        document.querySelectorAll("[data-select]").forEach((el) => {
          const key = el.getAttribute("data-select");
          if (key === `rmb-${parseInt(rId)}`) {
            el.textContent = formatCurrency(amountRmbEdit.value, "RMB");
          } else if (key === `ar-${parseInt(rId)}`) {
            el.textContent = formatCurrency(amountArEdit.value, "AR");
          }
        });

        updateSummary(rapports);
      } catch (error) {
        console.error("Des erreurs sont survenu :", error);
      } finally {
        reportModal.classList.add("hidden");
        showSuccessToast("Rapport modifier avec succès");
        hideLoader();
      }
    }
  });

  function handleFilterClick(filterId, filterValue) {
    pageNumber = 0;
    const buttons = document.querySelectorAll('[id^="filter-"]');
    let req = "";
    if (filterValue == "All") {
      req = getTransactionsRange(filterValue);
      activeDateRange = req;
    } else if (filterValue == "week") {
      req = getTransactionsRange(filterValue);
      activeDateRange = req;
    } else if (filterValue == "month") {
      req = getTransactionsRange(filterValue);
      activeDateRange = req;
    } else {
      req = getTransactionsRange("today");
      activeDateRange = req;
    }

    fetchAllRapports(req);
    fetchRapports(req, activeDateSort);

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
  }

  // Déclaration des filtres (id bouton => valeur du filtre)
  const filters = {
    "filter-all": "All",
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

  async function fetchRapports(req = null, date = "desc") {
    showLoader();
    if (!req) {
      req = "";
    }
    try {
      const res = await fetch(
        API_RAPPORT +
          "?sort[val]=field_date&sort[op]=" +
          date +
          req +
          "&pager=" +
          pageNumber +
          "&offset=" +
          perPage
      );
      const dataArray = await res.json();
      data = dataArray.rows;

      if (pageNumber == 0) {
        rapports = data;
      } else {
        data.forEach((item) => {
          const index = rapports.findIndex((rp) => rp.nid == item.nid);
          if (index !== -1) {
            // Si l'élément existe déjà, on le remplace
            rapports[index] = item;
          } else {
            // Sinon, on l'ajoute
            rapports.push(item);
          }
        });
      }
      totalRapports = dataArray.total;
      totalPages = Math.ceil(totalRapports / perPage);
      if (pageNumber >= totalPages - 1) {
        loadMoreBtn.classList.add("hidden");
      } else {
        loadMoreBtn.classList.remove("hidden");
      }
      renderRapports();
    } catch (error) {
      console.error("Erreur lors du chargement des données: ", error);
      showErrorToast("Erreur lors du chargement des données");
    } finally {
      hideLoader();
    }
  }
  fetchRapports(activeDateRange, activeDateSort);

  async function fetchAllRapports(req = null) {
    showLoader();
    if (!req) {
      req = "";
    }
    try {
      const res = await fetch(API_RAPPORT + "?pager=0&offset=1000" + req);
      const dataArray = await res.json();
      let data = dataArray.rows;
      toExport = data;
      updateSummary(data);
    } catch (e) {
      console.error("Erreur de chargement :", e);
    } finally {
      hideLoader();
    }
  }
  fetchAllRapports(activeDateRange);

  function renderRapports() {
    rapportsContainer.innerHTML = "";
    emptyReport.classList.remove("hidden");
    if (rapports.length === 0) {
      rapportsContainer.innerHTML = `
                            <div class="rapport-row px-4 py-3 cursor-pointer" id="emptyReport">
                                <div class="text-center py-8 text-gray-500">
                                    <i class="ri-inbox-line text-4xl mb-2 text-gray-300"></i>
                                    <p>Aucun rapport disponible</p>
                                </div>
                            </div>`;
      return;
    }
    exportExcel.classList.remove("hidden");
    emptyReport.classList.add("hidden");
    rapports.forEach((r) => {
      const div = document.createElement("div");
      div.innerHTML = `
                            <div class="rapport-row px-4 py-3 cursor-pointer" data-id="${
                              r.nid
                            }">
                                <div class="grid grid-cols-12 gap-2 items-center">
                                    <div class="col-span-2 fs-c-7">
                                        <div class="text-gray-900">${
                                          r.field_date
                                            ? formatDate(r.field_date)
                                            : "Pas de date"
                                        }</div>
                                    </div>
                                    <div class="col-span-5">
                                        <div class="flex items-center gap-2">
                                            <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center hidden justify-center">
                                                <i class="ri-shopping-cart-line text-red-600 text-sm"></i>
                                            </div>
                                            <div>
                                                <div class="text-sm text-gray-900">
                                                    <span class="inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-500 ring-1 ring-inset ring-yellow-400/20 text-center">
                                                        ${
                                                          r.field_category.title
                                                        }
                                                    </span>
                                                </div>
                                                <div class="text-xs text-gray-500 ms-1 mt-1 whitespace-nowrap overflow-hidden text-ellipsis w-32">
                                                    ${r.field_client}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-span-5 text-right fs-c-7">
                                        <div class="text-gray-500">
                                        </div>
                                        <div class="text-green-600" data-select="rmb-${
                                          r.nid
                                        }">${formatCurrency(
        r.field_total_rmb,
        "RMB"
      )}</div>
                                        <div class="text-purple-600 mt-1" data-select="ar-${
                                          r.nid
                                        }">${formatCurrency(
        r.field_total_ariary,
        "AR"
      )}</div>
                                    </div>
                                </div>
                            </div>`;

      const row = div.querySelector(".rapport-row");

      row.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        const id = this.dataset.id;
        if (id) showRapport(id);
      });
      rapportsContainer.appendChild(div);
    });
  }

  async function showRapport(id) {
    rapport = await getRapportById(id);
    deletingId = parseInt(id);
    showFormAndDetails(rapport);
  }

  deleteReportBtn.addEventListener("click", function () {
    showDeleteModal(deletingId);
  });

  async function getRapportById(id) {
    showLoader();
    try {
      const response = await fetch(API_RAPPORT + `?filters[nid][val]=${id}`);
      if (!response.ok) throw new Error("Erreur API : " + response.status);

      const dataArray = await response.json();
      const data = dataArray.rows;

      // data est un tableau d'éléments, ici 0 ou 1
      return data.length > 0 ? data[0] : null;
    } catch (error) {
      console.error("Erreur lors de la récupération du rapport :", error);
      return null;
    } finally {
      hideLoader();
    }
  }

  function updateSummary(data = null) {
    let totalAr;
    let totalRmb;
    if (data) {
      totalRmb = data.reduce((sum, r) => sum + Number(r.field_total_rmb), 0);
      totalAr = data.reduce((sum, r) => sum + Number(r.field_total_ariary), 0);
    } else {
      totalRmb = rapports.reduce(
        (sum, r) => sum + Number(r.field_total_rmb),
        0
      );
      totalAr = rapports.reduce(
        (sum, r) => sum + Number(r.field_total_ariary),
        0
      );
    }
    rmbSumary.textContent = formatCurrency(totalRmb, "RMB");
    arSumary.textContent = formatCurrency(totalAr, "AR");
  }

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

  function attachCloseHandler(button, modal) {
    button.addEventListener("click", function () {
      modal.classList.add("hidden");
      document.body.style.overflow = "";
    });
  }

  attachCloseHandler(closeReportModal, reportModal);
  attachCloseHandler(closeReportModalAdd, reportModalAdd);

  fabButton.addEventListener("click", function () {
    reportModalAdd.classList.remove("hidden");
  });

  function showLoader() {
    document.getElementById("page-loader").classList.remove("hidden");
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

    return `${day} ${month}<br>${year}`;
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

  function getTransactionsRange(type = "today") {
    const now = new Date();
    let start, end;

    if (type == "All") {
      return "";
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
    return rangeQuery;
  }

  sortByDate.addEventListener("click", async () => {
    pageNumber = 0;
    loadMoreBtn.classList.add("hidden");
    let date = "desc";
    if (sortByDate.getAttribute("data-date") == "asc") {
      sortByDate.setAttribute("data-date", "desc");
      date = "desc";
    } else {
      sortByDate.setAttribute("data-date", "asc");
      date = "asc";
    }
    activeDateSort = date;
    await fetchRapports(activeDateRange, date);
    await fetchAllRapports(activeDateRange, date);
  });

  loadMoreBtn.addEventListener("click", function () {
    pageNumber++;
    fetchRapports(activeDateRange, activeDateSort);
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
    rapport = rapports.find((r) => r.nid == id);
    if (rapport) {
      deletingId = id;
      document.getElementById("deleteModal").classList.remove("hidden");
    }
  }

  // Delete Modal handling
  const deleteModal = document.getElementById("deleteModal");
  const cancelDelete = document.getElementById("cancelDelete");
  const confirmDelete = document.getElementById("confirmDelete");

  cancelDelete.addEventListener("click", function () {
    deleteModal.classList.add("hidden");
  });

  confirmDelete.addEventListener("click", async function () {
    if (deletingId) {
      await deleteReportById(deletingId);
      deleteModal.classList.add("hidden");
      deletingId = null;
    }
  });

  async function deleteReportById(id) {
    showLoader();
    try {
      const res = await fetch(
        `/confirm/node/${id}/delete`,
        {
          method: "POST",
        }
      );

      if (!res.ok) throw new Error("Échec lors de la suppression");

      rapports = rapports.filter((r) => r.nid != id);
      await fetchAllRapports(activeDateRange);
      renderRapports();
    } catch (err) {
      console.error("Erreur de suppression :", err);
    } finally {
      hideLoader();
      reportModal.classList.add("hidden");
      showSuccessToast("Rapport supprimée avec succès");
    }
  }

  deleteModal.addEventListener("click", function (e) {
    if (e.target === deleteModal) {
      deleteModal.classList.add("hidden");
      deletingId = null;
    }
  });

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
  loadClients();

  document.getElementById("exportExcel").addEventListener("click", function () {
    // 🔹 Construire les données principales
    const headers = ["Date", "Type", "Client", "Montant RMB", "Montant Ar"];
    const data = toExport.map((r) => [
      r.field_date,
      r.title,
      r.field_client || "",
      parseFloat(r.field_total_rmb || 0),
      parseFloat(r.field_total_ariary || 0),
    ]);

    // 🔹 Calculer les totaux
    const totalRmb = data.reduce((sum, item) => sum + (item[3] || 0), 0);
    const totalAr = data.reduce((sum, item) => sum + (item[4] || 0), 0);

    // 🔹 Ajouter la ligne de total
    data.push(["", "", "TOTAL", totalRmb, totalAr]);

    // 🔹 Fusionner les en-têtes et les données
    const worksheetData = [headers, ...data];

    // 🔹 Créer la feuille Excel
    const ws = XLSX.utils.aoa_to_sheet(worksheetData);

    // 🔹 Ajuster automatiquement la largeur des colonnes
    const colWidths = headers.map((header, i) => {
      const maxLength = worksheetData.reduce((acc, row) => {
        const val = row[i] ? row[i].toString() : "";
        return Math.max(acc, val.length);
      }, header.length);
      return { wch: maxLength + 2 };
    });
    ws["!cols"] = colWidths;

    // 🔹 Ajouter un peu de mise en forme texte simple (gras uniquement)
    // => Compatible toutes versions
    ws["A1"].v = "Date";
    ws["B1"].v = "Type";
    ws["C1"].v = "Client";
    ws["D1"].v = "Montant RMB (¥)";
    ws["E1"].v = "Montant Ar (Ar)";

    // 🔹 Créer le classeur et ajouter la feuille
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rapports");

    // 🔹 Nom dynamique du fichier
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const filename = `rapports-${yyyy}-${mm}-${dd}.xlsx`;

    // 🔹 Exporter le fichier
    XLSX.writeFile(wb, filename);
  });

  window.showDeleteModal = showDeleteModal;

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
}
