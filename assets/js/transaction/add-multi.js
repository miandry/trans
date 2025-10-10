function initAddMultiTransactionPage() {
  showLoader();
  const API_ADD_TRANSACTION = "https://miandrilala.online/crud/save";
  const API_TRANSACTION = "https://miandrilala.online/api/v2/node/transactions";
  const API_BASE_CLIENTS =
    "https://miandrilala.online/api/v2/node/client?fields[]=nid&fields[]=field_name&sort[val]=field_name&sort[op]=asc&pager=0&offset=1000";
  const API_BASE_EXCHANGE =
    "https://miandrilala.online/api/v2/taxonomy_term/exchange?sort[val]=tid&sort[op]=desc";
  const API_BASE_CATEGORIES =
    "https://miandrilala.online/api/v2/taxonomy_term/category?fields[]=tid&fields[]=name&sort[val]=name&sort[op]=asc";

  const amountInput = document.getElementById("amount");
  const transactionsContainer = document.getElementById(
    "transactions-container"
  );
  const amountError = document.getElementById("amounterror");
  const notesError = document.getElementById("notesError");
  const sectorError = document.getElementById("sectorError");
  const clientError = document.getElementById("clientError");

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

  // client variable

  let allClients = [];

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

  function getSafeValue(input) {
    const trimmedInput = input.trim();
    if (!trimmedInput) {
      amountError.textContent = "Veuillez entrer un montant !";
      amountError.classList.remove("hidden");
      return false;
    }

    const lines = input.split("\n");
    const results = [];

    amountError.classList.add("hidden");
    amountError.textContent = "";

    for (let line of lines) {
      const raw = line.trim();
      if (!raw) continue; // ignorer lignes vides

      // séparer montant et id (plusieurs espaces tolérés)
      const parts = raw.split(/\s+/);

      let expr, clientId;

      if (parts.length === 1) {
        // aucun id fourni → on prend la valeur par défaut
        expr = parts[0];
        clientId = 280;
      } else {
        expr = parts.slice(0, -1).join(" "); // tout sauf le dernier = montant
        clientId = parts[parts.length - 1];
        if (!/^\d+$/.test(clientId)) {
          // si le dernier token n’est pas un id numérique → expr = tout, id par défaut
          expr = raw;
          clientId = 280;
        }
      }

      // validation de l’expression mathématique
      if (!/^[0-9+\-*/().\s]+$/.test(expr)) {
        amountError.textContent = "Caractères non autorisés dans le montant !";
        amountError.classList.remove("hidden");
        return false;
      }

      if (/[+\-*/]{2,}/.test(expr)) {
        amountError.textContent = "Syntaxe invalide !";
        amountError.classList.remove("hidden");
        return false;
      }

      try {
        const value = eval(expr);
        if (isNaN(value) || value === 0) {
          amountError.textContent = "Montant invalide !";
          amountError.classList.remove("hidden");
          return false;
        }
        results.push({
          amount: value,
          clientId: clientId,
        });
      } catch {
        amountError.textContent = "Erreur dans l'évaluation !";
        amountError.classList.remove("hidden");
        return false;
      }
    }

    return results;
  }

  function updatePreviewValues() {
    const amount = parseFloat(amountInput.value) || 0;
  }

  async function addTransaction(amount) {
    showLoader();
    const description = document.getElementById("notes");
    let type = "Entrée";
    const category = document.getElementById("sector");
    const exchange = document.getElementById("exchange").value;
    let field_amount, field_montant_rmb;

    try {
      const results = []; // pour stocker les réponses API

      // On insère les transactions une par une
      for (const a of amount) {
        type = a.amount < 0 ? "Sortie" : "Entrée";

        if (type === "Entrée") {
          field_amount = parseFloat(Math.abs(a.amount) * exchange);
          field_montant_rmb = Math.abs(a.amount);
        } else {
          field_amount = Math.abs(a.amount);
          field_montant_rmb = parseFloat(Math.abs(a.amount) / exchange);
        }

        const newTransaction = {
          title: "transaction",
          entity_type: "node",
          bundle: "transactions",
          field_category: parseInt(category.value),
          body: "<h1>transaction</h1>",
          field_description: description.value,
          uid: 1,
          status: 1,
          field_amount: field_amount,
          field_type: type,
          field_date: datetimeInput.value,
          field_client: a.clientId,
          field_cours: parseFloat(exchange),
          field_montant_rmb: field_montant_rmb,
          field_status: "Draft",
        };

        const res = await fetch(`${API_ADD_TRANSACTION}`, {
          method: "POST",
          body: JSON.stringify(newTransaction),
        });

        const data = await res.json();
        results.push(data);
      }
      showSuccessToast("Transactions ajoutées avec succès");
    } catch (err) {
      console.error("Erreur d'ajout :", err);
      showErrorToast("Erreur lors de l’ajout des transactions");
    } finally {
      description.value = "";
      showSuccessToast("Transactions ajoutée avec succès");
      window.app.page = "transaction-history";
    }
  }

  function showLoader() {
    document.getElementById("page-loader").classList.remove("hidden");
  }

  function hideLoader() {
    document.getElementById("page-loader").classList.add("hidden");
  }

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
      if (validateCurrentStep()) {
        // On last step, complete the transaction
        completeTransaction();
      }
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
    sectorError.classList.add("hidden");
    sectorError.textContent = "";
    clientError.classList.add("hidden");
    clientError.textContent = "";
    exchangeError.classList.add("hidden");
    exchangeError.textContent = "";

    const exchange = document.getElementById("exchange");
    const description = document.getElementById("notes");
    const type = document.querySelector(
      'input[name="transaction_type"]:checked'
    )?.value;
    const category = document.getElementById("sector");
    // For step 1, validate amount
    if (currentStep === 1) {
      if (!category.value) {
        sectorError.textContent = "Veuillez sélectionner une catégorie !";
        sectorError.classList.remove("hidden");
        return false;
      }
    } else if (currentStep === 2) {
      if (!exchange.value) {
        exchangeError.textContent = "Entrez un montant";
        exchangeError.classList.remove("hidden");
        return false;
      }
    } else if (currentStep === 3) {
      if (!getSafeValue(amountInput.value)) return false;
    } else if (currentStep === 4) {
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
    const value = getSafeValue(amountInput.value);
    const description = document.getElementById("notes");
    const category = document.getElementById("sector");
    const exchange = document.getElementById("exchange").value;
    nextBtn.innerHTML = `
                            <div class="flex items-center justify-center">
                                <div class="animate-spin mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                            </div>
                        `;

    amountInput.value = "";
    updatePreviewValues();
    addTransaction(value);
  }
  // Initialize step display
  updateStepDisplay();

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
    } finally {
      hideLoader();
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
      hideLoader();
    } catch (error) {
      console.error("Erreur lors du chargement des secteurs :", error);
    } finally {
      hideLoader();
    }
  }
  loadSectors();
  loadClients();

  amountInput.addEventListener("input", updatePreviewValues);
}
