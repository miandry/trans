function initAddTransactionPage() {
  showLoader();
  // client variable
  const API_BASE_CLIENTS =
    "https://miandrilala.online/api/v2/node/client?fields[]=nid&fields[]=field_name&sort[val]=field_name&sort[op]=asc&pager=0&offset=1000";

  // exchanges variable
  const API_BASE_EXCHANGE =
    "https://miandrilala.online/api/v2/taxonomy_term/exchange?sort[val]=tid&sort[op]=desc";

  const API_ADD_TRANSACTION = "https://miandrilala.online/crud/save";

  const API_TRANSACTION = "https://miandrilala.online/api/v2/node/transactions";

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
  const exchangeError = document.getElementById("exchangeError");

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

  let allClients = [];

  function getSafeValue(input) {
    const raw = input.trim();
    amountError.classList.add("hidden");
    amountError.textContent = "";

    if (!raw) {
      amountError.textContent = "Le champ montant ne peut pas être vide !";
      amountError.classList.remove("hidden");
      return false;
    }

    if (!/^[0-9+\-*/().\s]+$/.test(raw)) {
      amountError.textContent = "Caractères non autorisés !";
      amountError.classList.remove("hidden");
      return false;
    }

    if (/[+\-*/]{2,}/.test(raw)) {
      amountError.textContent = "Syntaxe invalide !";
      amountError.classList.remove("hidden");
      return false;
    }

    try {
      const value = eval(raw);
      if (isNaN(value) || value === 0) {
        amountError.textContent = "Montant invalide !";
        amountError.classList.remove("hidden");
        return false;
      }
      return value;
    } catch {
      amountError.textContent = "Erreur dans l'évaluation !";
      amountError.classList.remove("hidden");
      return false;
    }
  }

  function updatePreviewValues() {
    const amount = parseFloat(amountInput.value) || 0;
  }

  async function addTransaction(amount) {
    showLoader();
    const description = document.getElementById("notes");
    const type = document.querySelector(
      'input[name="transaction_type"]:checked'
    )?.value;
    const category = document.getElementById("sector");
    const client = document.getElementById("client");
    const exchange = document.getElementById("exchange").value;
    let field_amount, field_montant_rmb;

    if (type === "Entrée") {
      field_amount = parseFloat(amount * exchange);
      field_montant_rmb = amount;
    } else {
      field_amount = amount;
      field_montant_rmb = parseFloat(amount / exchange);
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
      field_evidence: base64File,
      field_type: type,
      field_date: datetimeInput.value,
      field_client: client.value,
      field_cours: parseFloat(exchange),
      field_montant_rmb: field_montant_rmb,
      field_status: "Draft",
    };

    try {
      const res = await fetch(`${API_ADD_TRANSACTION}`, {
        method: "POST",
        body: JSON.stringify(newTransaction),
      });
      const saved = await res.json();
      return saved;
    } catch (err) {
      console.error("Erreur d'ajout :", err);
      showErrorToast("Erreur lors de l’ajout de la transaction");
      hideLoader();
    } finally {
      description.value = "";
      showSuccessToast("Transaction ajoutée avec succès");
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
    sectorError.classList.add("hidden");
    sectorError.textContent = "";
    clientError.classList.add("hidden");
    clientError.textContent = "";
    exchangeError.classList.add("hidden");
    exchangeError.textContent = "";

    const description = document.getElementById("notes");
    const type = document.querySelector(
      'input[name="transaction_type"]:checked'
    )?.value;
    const category = document.getElementById("sector");
    const client = document.getElementById("client");
    const exchange = document.getElementById("exchange");
    // For step 1, validate amount
    if (currentStep === 1) {
      if (!client.value) {
        clientError.textContent = "Veuillez sélectionner un client !";
        clientError.classList.remove("hidden");
        return false;
      }
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
    }
    return true;
  }

  // Complete transaction and show success modal
  function completeTransaction() {
    // Show loading state
    nextBtn.disabled = true;
    const value = getSafeValue(amountInput.value);
    const description = document.getElementById("notes");
    const type = document.querySelector(
      'input[name="transaction_type"]:checked'
    )?.value;
    const category = document.getElementById("sector");
    const client = document.getElementById("client");
    const exchange = document.getElementById("exchange").value;
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

    addTransaction(value);
    amountInput.value = "";
    updatePreviewValues();
  }
  // Initialize step display
  updateStepDisplay();

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

  // fetch all exchanges value
  async function loadExchanges() {
    try {
      const res = await fetch(API_BASE_EXCHANGE);
      const dataArray = await res.json();
      const exchange = dataArray.rows[0];
      document.getElementById("exchange").value = exchange.name;
      document.getElementById("currentRate").textContent = exchange.name;
      hideLoader();
    } catch (error) {
      console.error("Erreur lors du chargement des données :", error);
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
    }
  }
  loadSectors();
  loadExchanges();
  amountInput.addEventListener("input", updatePreviewValues);
}
