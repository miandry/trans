<!DOCTYPE html>
<html lang="fr">

<head>
<?php include("includes/gestion-transaction-header.php") ?>
    <script>
        const API_ADD_TRANSACTION = "https://miandrilala.online/crud/save";
        const API_TRANSACTION = "https://miandrilala.online/api/v2/node/transactions"
    </script>
</head>

<body class="bg-gray-50 min-h-screen relative">
    <!-- <div id="overlay" class="fixed inset-0 bg-black opacity-50 z-30 hidden lg:hidden"></div> -->
    <?php include("includes/gestion-transaction-modal.php")?>

    <!-- Transaction modal for edit form -->
    <div id="transactionModalEditForm" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden">
        <div class="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[90vh] h-[90vh] overflow-y-auto">
            <div class="px-4 py-3 border-b border-gray-100 sticky top-0 bg-white z-50 mb-4">
                <div class="flex items-center justify-between">
                    <h2 class="text-lg font-medium text-gray-900">Modifier votre transaction</h2>
                    <button id="closeModalBtnEditForm" class="w-8 h-8 flex items-center justify-center">
                        <i class="ri-close-line text-gray-600"></i>
                    </button>
                </div>
            </div>
            <div class="p-4 space-y-6">
                <div id="transactionFormEditForm" class="space-y-6">
                    <div id="content-nouvelle" class="space-y-6">
                        <!-- Select Secteur d'activité -->
                        <div class="pb-3">
                            <div class="flex items-center justify-between mb-2">
                                <span id="stepText" class="text-sm font-medium text-primary">Étape 1 sur 3</span>
                                <span id="stepTitle" class="text-sm text-gray-600">Categorie & Type</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div id="progressBar" class="bg-primary h-2 rounded-full transition-all duration-300"
                                    style="width: 33.33%"></div>
                            </div>
                        </div>
                        <div class="">
                            <div id="step1" class="step-content">
                                <div class="bg-white mb-6">
                                    <h2 class="text-xl font-semibold text-gray-900 mb-6">
                                        Détails de la Transaction
                                    </h2>
                                    <input type="text" id="tr-id" class="hidden">

                                    <div class="mb-4">
                                        <label for="client" class="block text-sm font-medium text-gray-700 mb-1">
                                            Client
                                        </label>
                                        <div class="relative">
                                            <select id="client"
                                                class="w-full p-3 border border-gray-300 rounded-button focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-lg appearance-none">
                                                <option value="">Sélectionnez un client</option>
                                            </select>
                                            <div
                                                class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                        <p id="clientError" class="text-red-500 text-xs mt-2 hidden"></p>
                                    </div>

                                    <div class="mb-4">
                                        <label for="sector" class="block text-sm font-medium text-gray-700 mb-1">
                                            Catégorie
                                        </label>
                                        <div class="relative">
                                            <select id="sector"
                                                class="w-full p-3 border border-gray-300 rounded-button focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-lg appearance-none">
                                                <option value="">Sélectionnez un secteur</option>
                                            </select>
                                            <div
                                                class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                        <p id="sectorError" class="text-red-500 text-xs mt-2 hidden"></p>
                                    </div>

                                    <div class="mb-4">
                                        <label class="block text-sm font-medium text-gray-700 mb-2">
                                            Type du transaction
                                        </label>
                                        <div id="transaction-type" class="ms-2">
                                            <div>
                                                <label class="flex items-center gap-2">
                                                    <input type="radio" name="transaction_type" value="Entrée" checked
                                                        class="text-primary focus:ring-primary">
                                                    <span>Entrée</span>
                                                </label>
                                            </div>
                                            <div>
                                                <label class="flex items-center gap-2">
                                                    <input type="radio" name="transaction_type" value="Sortie"
                                                        class="text-primary focus:ring-primary">
                                                    <span>Sortie</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="step2" class="step-content hidden">
                                <div class="bg-white mb-6">
                                    <h2 class="text-xl font-semibold text-gray-900 mb-6">
                                        Montant & Description
                                    </h2>
                                    <div class="mb-4">
                                        <label for="amount"
                                            class="block text-sm font-medium text-gray-700 mb-1">Montant</label>
                                        <div class="relative">
                                            <input type="text" id="amount"
                                                class="w-full p-3 border border-gray-300 rounded-button focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-lg"
                                                placeholder="Entrez le montant" />
                                            <div
                                                class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <span class="text-gray-500">Ar</span>
                                            </div>
                                        </div>
                                        <p id="amounterror" class="text-red-500 text-xs mt-2 hidden"></p>
                                    </div>
                                    <div class="mb-4">
                                        <label class="block text-sm font-medium text-gray-700 mb-2">Date et
                                            heure</label>
                                        <input type="datetime-local"
                                            class="w-full p-3 border border-gray-200 rounded-lg text-sm">
                                    </div>
                                    <div class="mb-4">
                                        <div>
                                            <label for="notes" class="block text-sm font-medium text-gray-700 mb-1">
                                                Description
                                            </label>
                                            <input type="text" id="notes"
                                                class="w-full p-3 border border-gray-300 rounded-button focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-lg"
                                                placeholder="Ajoutez une description" />
                                        </div>
                                        <p id="notesError" class="text-red-500 text-xs mt-2 hidden"></p>
                                    </div>
                                </div>
                            </div>
                            <div id="step3" class="step-content hidden">
                                <div class="bg-white mb-6">
                                    <h2 class="text-xl font-semibold text-gray-900 mb-6">
                                        Ajouter une preuve
                                    </h2>
                                    <div class="bg-white rounded-lg pb-4">
                                        <div class="flex justify-between items-center mb-3">
                                            <label class="block text-sm font-medium text-gray-700 mb-1">QR Code de
                                                paiement</label>
                                            <div id="qr-preview" class="hidden">
                                                <button type="button" id="remove-qr"
                                                    class="text-red-500 text-sm flex items-center">
                                                    <i class="ri-delete-bin-line mr-1"></i>Supprimer
                                                </button>
                                            </div>
                                        </div>
                                        <!-- upload-qr -->
                                        <div id="qr-upload-container"
                                            class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                            <div id="qr-placeholder" class="space-y-2">
                                                <div
                                                    class="w-12 h-12 mx-auto flex items-center justify-center bg-gray-100 rounded-full">
                                                    <i class="ri-qr-code-line text-gray-400 ri-2x"></i>
                                                </div>
                                                <div class="text-sm text-gray-500">
                                                    Ajouter votre QR code de paiement
                                                </div>
                                                <label class="block">
                                                    <input type="file" id="qr-input" name="qr_code"
                                                        accept=".jpg,.jpeg,.png,.gif" class="hidden">
                                                    <input type="text" class="hidden" id="fake-file">
                                                    <button type="button" id="qr-select-btn"
                                                        class="mt-2 px-4 py-2 text-sm text-primary border border-primary rounded-button !rounded-button">
                                                        Choisir une image
                                                    </button>
                                                </label>
                                                <div id="file-error" class="text-red-500 text-xs mt-2 hidden">
                                                    Le fichier est trop volumineux. La taille maximale est de 5 MB.
                                                </div>
                                            </div>
                                            <div id="qr-image-preview" class="hidden">
                                                <img id="qr-image" class="max-w-[200px] max-h-[200px] mx-auto rounded"
                                                    src="" alt="QR Code preview">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
                            <div class="flex gap-3">
                                <button id="prevBtn"
                                    class="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors cursor-pointer hidden !rounded-button">
                                    Précédent
                                </button>
                                <button id="nextBtn"
                                    class="flex-1 py-3 px-4 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition-colors cursor-pointer !rounded-button">
                                    Suivant
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Navbar -->
    <?php include("includes/transaction-aside-menu.php")?>
    <!-- Main Content -->
    <main class="pb-4 px-4 flex-1 lg:ml-64">
        <div class="flex items-center justify-between p-4 lg:hidden bg-white shadow-sm">
            <button id="openSidebar" class="text-gray-500 hover:text-gray-700">
                <div class="w-5 h-5 flex items-center justify-center">
                    <i class="ri-menu-line"></i>
                </div>
            </button>
            <h1 class="font-['Pacifico'] text-xl text-primary">logo</h1>
            <div class="w-5">
                <button id="filterBtn" class="text-gray-500 hover:text-gray-700 cursor-pointer">
                    <i class="ri-filter-3-line text-gray-600"></i>
                </button>
            </div>
        </div>

        <!--     filtre     -->
        <div id="filterPanel" class="fixed top-0 left-0 right-0 bg-white shadow-lg z-50 filter-panel">
            <div class="px-4 py-3 border-b border-gray-200">
                <div class="flex items-center justify-between">
                    <h2 class="text-lg font-semibold text-gray-900">Filtres avancés</h2>
                    <button id="closeFilterBtn" class="w-8 h-8 flex items-center justify-center cursor-pointer">
                        <i class="ri-close-line text-gray-600"></i>
                    </button>
                </div>
            </div>
            <div class="px-4 py-4 max-h-96 overflow-y-auto">
                <div class="space-y-6 mb-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Client</label>
                        <div class="relative">
                            <select id="filterClientSelect"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-white">
                                <option value="">Tous les clients</option>
                            </select>
                            <div
                                class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 flex items-center justify-center">
                                <i class="ri-arrow-down-s-line text-gray-500"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="space-y-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                        <div class="relative">
                            <select id="filterCategorySelect"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-white">
                                <option value="">Tous les categories</option>
                            </select>
                            <div
                                class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 flex items-center justify-center">
                                <i class="ri-arrow-down-s-line text-gray-500"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="px-4 py-4 border-t border-gray-200 flex gap-3">
                <button id="applyFilters"
                    class="flex-1 py-2.5 bg-primary text-white rounded-lg text-sm font-medium cursor-pointer !rounded-button">Appliquer</button>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow-md mt-4 mb-24">
            <div class="p-5">
                <div class="flex justify-between flex-wrap items-center mb-3">
                    <h2 class="text-lg font-semibold text-gray-800 mb-1">
                        Historique
                    </h2>
                    <div class="flex items-center gap-2 mb-1">
                        <button id="active-category"
                            class="text-xs px-3 py-1.5 rounded-full bg-primary text-white font-medium whitespace-nowrap hidden">
                            categorie
                        </button>
                    </div>
                </div>

                <div class="flex gap-2 flex-nowrap overflow-x-auto scrollBar-container px-2">
                    <button id="filter-all"
                        class="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 font-medium whitespace-nowrap">
                        Tout
                    </button>
                    <button id="filter-today"
                        class="text-xs px-3 py-1.5 rounded-full bg-primary text-white font-medium whitespace-nowrap">
                        Aujourd'hui
                    </button>
                    <button id="filter-week"
                        class="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 font-medium whitespace-nowrap">
                        cette semaine
                    </button>
                    <button id="filter-month"
                        class="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 font-medium whitespace-nowrap">
                        ce mois-ci
                    </button>
                    <button id="filter-in"
                        class="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 font-medium whitespace-nowrap">
                        Entrée
                    </button>
                    <button id="filter-out"
                        class="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 font-medium whitespace-nowrap">
                        Sortie
                    </button>
                </div>
            </div>
            <div class="">
                <div class="">
                    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div class="px-4 py-3 border-b border-gray-100">
                            <div class="grid grid-cols-12 gap-2 text-xs font-medium text-gray-500">
                                <div class="col-span-3 flex items-center gap-1 cursor-pointer" id="sortByDate"
                                    data-date="desc">
                                    <span>Date</span>
                                    <i class="ri-arrow-up-down-line sort-indicator"></i>
                                </div>
                                <div class="col-span-5 flex items-center gap-1 cursor-pointer">
                                    <span>Description</span>
                                </div>
                                <div class="col-span-4 flex items-center gap-1 justify-end cursor-pointer">
                                    <span>Montant</span>
                                </div>
                            </div>
                        </div>
                        <div id="transactions-container" class="divide-y divide-gray-50">
                            <div class="transaction-row px-4 py-3 cursor-pointer" data-date="2024-01-14"
                                data-type="income" data-amount="3200">
                                <div class="text-center py-8 text-gray-500">
                                    <i class="ri-inbox-line text-4xl mb-2 text-gray-300"></i>
                                    <p>Aucune transaction pour le moment</p>
                                </div>
                            </div>
                        </div>
                        <div class="px-4 py-4 text-center">
                            <button id="loadMoreBtn" class="text-primary text-sm font-medium cursor-pointer hidden">Voir
                                plus</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Bottom Summary -->
        <div class="bottom-0 w-full bg-white border-t border-gray-200 shadow-lg fixed bottom-0 left-0">
            <div class="px-4 py-3">
                <div class="flex justify-between items-center mb-1" id="total-in">
                    <span class="text-sm text-gray-600">Total entrée</span>
                    <span id="summary-positive" class="font-medium text-green-600">0 Ar</span>
                </div>
                <div class="flex justify-between items-center mb-1" id="total-out">
                    <span class="text-sm text-gray-600">Total sortie</span>
                    <span id="summary-negative" class="font-medium text-secondary">0 Ar</span>
                </div>
                <div class="flex justify-between items-center" id="balance-available">
                    <span class="text-sm font-medium text-gray-700">Solde disponible</span>
                    <span id="summary-net" class="font-semibold text-primary">0 Ar</span>
                </div>
            </div>
        </div>
    </main>

    <script id="transaction-logic">
        document.addEventListener("DOMContentLoaded", function () {
            const amountInput = document.getElementById("amount");
            const loadMoreBtn = document.getElementById('loadMoreBtn');
            const transactionsContainer = document.getElementById("transactions-container");
            const summaryNetEl = document.getElementById("summary-net");
            const summaryPositive = document.getElementById("summary-positive");
            const summaryNegative = document.getElementById("summary-negative");
            const transactionCountEl = document.getElementById("transaction-count");
            const amountError = document.getElementById("amounterror");
            const notesError = document.getElementById("notesError");
            const sectorError = document.getElementById("sectorError");
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
            const transactionModal = document.getElementById('transactionModal');
            const transactionForm = document.getElementById('transactionForm');
            const closeModalBtn = document.getElementById('closeModalBtn');
            // edit form modal
            const transactionModalEditForm = document.getElementById('transactionModalEditForm');
            const transactionFormEditForm = document.getElementById('transactionFormEditForm');
            const closeModalBtnEditForm = document.getElementById('closeModalBtnEditForm');

            // client variable
            const API_BASE_CLIENTS =
                "https://miandrilala.online/api/v2/node/client?fields[]=nid&fields[]=field_name&sort[val]=field_name&sort[op]=asc";
            let allClients = [];

            // filter dom
            const applyFilters = document.getElementById('applyFilters');
            const filterCategorySelect = document.getElementById('filterCategorySelect');
            const filterClientSelect = document.getElementById('filterClientSelect');
            const sortByDate = document.getElementById('sortByDate');
            let pageNumber = 0;
            let totalItems = 0;
            let offset = 10;

            // datetime-functionality
            const datetimeInput = document.querySelector('input[type="datetime-local"]');
            const now = new Date();
            const maxDate = now;

            const year = maxDate.getFullYear();
            const month = String(maxDate.getMonth() + 1).padStart(2, '0');
            const day = String(maxDate.getDate()).padStart(2, '0');
            const hours = String(maxDate.getHours()).padStart(2, '0');
            const minutes = String(maxDate.getMinutes()).padStart(2, '0');

            datetimeInput.max = `${year}-${month}-${day}T${hours}:${minutes}`;
            datetimeInput.value = `${year}-${month}-${day}T${hours}:${minutes}`;

            // Step configuration
            const nextBtn = document.getElementById("nextBtn");
            const originalBtnText = nextBtn.textContent;
            let currentStep = 1;
            const totalSteps = 3;
            // Step titles in French
            const stepTitles = {
                1: "Devise & Montant",
                2: "Données financières",
                3: "Photo de l’évidence",
            };

            // filter query

            let categorieFilterQuery = null;
            let clientFilterQuery = null;
            let PeriodQuery = null;
            let dateFilterQuery = null;
            let queryBuilder = [];



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
                    await fetchTransactions(queryBuilder[0].first)
                } else if (queryBuilder.length > 1) {
                    await fetchAllTransactions(concatQueries(queryBuilder));
                    await fetchTransactions(concatQueries(queryBuilder));
                }
                const buttons = document.querySelectorAll('[id^="filter-"]');
                document.getElementById('total-out').classList.remove('hidden')
                document.getElementById('total-in').classList.remove('hidden')
                document.getElementById('balance-available').classList.remove('hidden')

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
                document.getElementById(id).addEventListener("click", () => handleFilterClick(id, value));
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
                let pos;
                let neg;
                let total;
                if (data) {
                    pos = data.filter(t => t.field_type == "Entrée").reduce((sum, t) => sum + Number(t.field_amount), 0);
                    neg = data.filter(t => t.field_type == "Sortie").reduce((sum, t) => sum + Number(t.field_amount), 0);
                } else {
                    pos = transactions.filter(t => t.field_type == "Entrée").reduce((sum, t) => sum + Number(t.field_amount), 0);
                    neg = transactions.filter(t => t.field_type == "Sortie").reduce((sum, t) => sum + Number(t.field_amount), 0);
                }
                total = pos - neg;
                summaryNetEl.textContent = formatCurrency(total);
                summaryPositive.textContent = formatCurrency(pos);
                summaryNegative.textContent = formatCurrency(neg);
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
                loadMoreBtn.classList.remove('hidden');
                if (totalItems > 10) {
                    let restants = Math.max(totalItems - firstPageSize, 0);
                    totalPages = Math.ceil(restants / perPage);
                }

                if (totalPages == pageNumber || totalItems < 10) {
                    loadMoreBtn.classList.add('hidden');
                }

                transactions.forEach(t => {
                    let clientName = searchClient(t.field_client);
                    const description = t.field_description;
                    const maxLength = 15;

                    const shortDesc = description.length > maxLength
                        ? description.substring(0, maxLength) + "..."
                        : description;

                    const div = document.createElement("div");
                    div.innerHTML = `

                            <div class="transaction-row px-4 py-3 cursor-pointer" data-id="${t.nid}" data-date="2024-01-15"
                                data-type="expense" data-amount="1250">
                                <div class="grid grid-cols-12 gap-2 items-center">
                                    <div class="col-span-3">
                                        <div class="text-sm text-gray-900">${t.field_date ? formatDate(t.field_date) : "Pas de date"}</div>
                                        <div class="text-xs text-gray-500 hidden">2024</div>
                                    </div>
                                    <div class="col-span-5">
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
                                    <div class="col-span-4 text-right">
                                        <span
                                class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inse
                                ${t.field_type == "Entrée" ? "text-green-400 ring-green-500/20 bg-green-400/10" : "text-red-400 ring-red-400/20 bg-red-400/10"}">
                                ${t.field_type}</span> 
                                        <div class="text-sm font-medium mt-2 ${t.field_type == "Entrée" ? "text-green-600" : "text-red-600"}">${formatCurrency(t.field_amount)}</div>
                                        <div class="text-xs hidden ${t.field_type == "Entrée" ? "text-green-600" : "text-red-600"}">${t.field_type}</div>
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
                    urlQuery = API_TRANSACTION + "?fields[]=title&fields[]=created&fields[]=field_evidence&fields[]=field_category&fields[]=field_amount&fields[]=nid&fields[]=field_type&fields[]=field_description&fields[]=field_date&sort[val]=nid&sort[op]=desc&pager=" + pageNumber + "&offset=10";
                } else {
                    urlQuery = API_TRANSACTION + "?fields[]=title&fields[]=created&fields[]=field_evidence&fields[]=field_category&fields[]=field_amount&fields[]=nid&fields[]=field_type&fields[]=field_description&fields[]=field_date&sort[val]=nid&sort[op]=desc" + req + "&pager=" + pageNumber + "&offset=10";
                }

                try {
                    const res = await fetch(`${urlQuery}`);
                    const dataArray = await res.json();
                    const data = dataArray.rows;

                    if (pageNumber == 0) {
                        transactions = data;
                    } else {
                        data.forEach(item => {
                            const index = transactions.findIndex(t => t.nid === item.nid);
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
                    hideLoader();
                }
            }

            async function fetchAllTransactions(req) {
                showLoader();
                urlQuery = API_TRANSACTION + "?fields[]=field_amount&fields[]=nid&fields[]=field_type&sort[val]=nid&sort[op]=desc&pager=0&offset=1000" + req;
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
                    // if (queryBuilder.length > 1) {
                    //     fetchTransactions(concatQueries(queryBuilder));
                    // } else {
                    //     fetchTransactions('All');
                    // }
                    pushWithKey(queryBuilder, "first", "")
                    return null;
                }

                // Calcul du début et de la fin de "aujourd'hui"
                const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
                const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
                const todayStartTs = Math.floor(todayStart.getTime() / 1000);
                const todayEndTs = Math.floor(todayEnd.getTime() / 1000);

                // Cas spécial : Entrée / Sortie (uniquement aujourd'hui)
                if (type === "Entrée" || type === "Sortie") {
                    let typeQuery = `&filters[field_type][val]=${encodeURIComponent(type)}` +
                        `&filters[created][op]=BETWEEN&filters[created][val][]=${todayStartTs}&filters[created][val][]=${todayEndTs}`;
                    // queryBuilder.push(typeQuery)
                    pushWithKey(queryBuilder, "first", typeQuery)
                    return typeQuery;
                }

                // Sinon, cas génériques 
                if (type === "today") {
                    start = todayStart;
                    end = todayEnd;
                }

                if (type === "week") {
                    const day = now.getDay();
                    const diffToMonday = (day === 0 ? -6 : 1 - day);
                    start = new Date(now.getFullYear(), now.getMonth(), now.getDate() + diffToMonday, 0, 0, 0);
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
                pushWithKey(queryBuilder, "first", rangeQuery)
                return rangeQuery;
            }

            async function deleteTransactionById(id) {
                showLoader();
                try {
                    const res = await fetch(`https://miandrilala.online/confirm/node/${id}/delete`, {
                        method: "POST",
                    });

                    if (!res.ok) throw new Error("Échec de suppression");

                    transactions = transactions.filter(t => t.nid != id);
                    renderTransactions();
                    await fetchAllTransactions(concatQueries(queryBuilder));
                } catch (err) {
                    console.error("Erreur de suppression :", err);
                } finally {
                    hideLoader();
                    transactionModal.classList.add('hidden');
                }
            }

            async function editTransaction(id) {
                showLoader()
                transaction = await getTransactionDetails(id);
                fakeFile.value = "edit";
                if (transaction) {
                    let description = document.getElementById('notes');
                    let category = document.getElementById('sector');
                    let client = document.getElementById('client');
                    let amount = document.getElementById('amount');
                    let id = document.getElementById('tr-id');
                    description.value = transaction.field_description;
                    if (transaction.field_type == "Sortie") {
                        document.querySelector('input[name="transaction_type"][value="Sortie"]').checked = true;
                    } else {
                        document.querySelector('input[name="transaction_type"][value="Entrée"]').checked = true;
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
                    amount.value = transaction.field_amount;
                    id.value = transaction.nid;
                    hideLoader();
                } else {
                    console.error('Acune transaction trouvé')
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
                    show(updatedTransaction.item.nid)
                    await fetchAllTransactions(concatQueries(queryBuilder));
                    await fetchTransactions(concatQueries(queryBuilder));
                    transactionModalEditForm.classList.add('hidden')
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
                    showSuccessToast('Modifications enregistrées');
                }
            }

            async function show(id) {
                transaction = await getTransactionDetails(id);
                let clientName = searchClient(transaction.field_client);
                transactionModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';

                let details = `<div>
                        <div class="flex flex-col items-center py-6">
                            <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-3  ${transaction.field_type == "Entrée" ? "bg-green-100" : "bg-red-100"}">
                                <i class="ri-money-dollar-circle-line text-xl ${transaction.field_type == "Entrée" ? "text-green-500" : "text-red-500"}"></i>
                            </div>
                            <div class="text-2xl font-semibold mb-1 ${transaction.field_type == "Entrée" ? "text-green-500" : "text-red-500"}">${formatCurrency(transaction.field_amount)}</div>
                            <div class="flex justify-start items-center gap-2">
                                <button class="edit-btn w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 hover:bg-blue-200 transition-colors" data-id="${transaction.nid}">
                                    <i class="ri-edit-line text-blue-600 text-sm"></i>
                                </button>
                                <button class="remove-btn w-6 h-6 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 transition-colors" onclick="showDeleteModal(${transaction.nid})" data-id="${transaction.nid}">
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
                                    ${transaction.field_type == "Entrée" ? "text-green-400 ring-green-400/20 bg-green-400/10" : "text-red-400 ring-red-400/20 bg-red-400/10"}"">${transaction.field_type}</span>
                            </div>
                            <div class="flex justify-between py-2 border-b border-gray-100 items-center">
                                <span class="text-sm text-gray-600">Date du transaction</span>
                                <span class="text-sm text-gray-900">${transaction.field_date ? formatDate(transaction.field_date) : "Pas de date"}</span>
                            </div>
                            <div class="flex justify-between py-2 border-b border-gray-100 items-center">
                                <span class="text-sm text-gray-600">Date d'insertion</span>
                                <span class="text-sm text-gray-900">${formatTimestampDate(transaction.created)}</span>
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
                        <div class="space-y-2">
                            <div class="text-sm text-gray-600 mt-4">Description</div>
                            <div class="w-full p-3 pt-1 text-sm text-gray-900">${transaction.field_description}</div>
                        </div>
                        <div class="flex flex-col mt-0 gap-3 pb-3 border-b border-gray-100">
                            <span class="text-sm text-gray-600">Évidence associée</span>
                            <div class="flex flex-wrap justify-center items-center gap-2">
                                ${transaction.field_evidence?.url
                        ? `<div class="w-full md:w-1/2 flex justify-center">
                                            <img src="${transaction.field_evidence.url}" alt="Image" class="w-1/4 md:w-auto max-w-full rounded-2xl">
                                    </div>`
                        : `<span class="text-gray-400 text-sm">Aucune image</span>`
                    }
                            </div>
                        </div>
                    </div>`

                transactionForm.innerHTML = details;

                // edit transaction
                document.querySelectorAll(".edit-btn").forEach(btn => {
                    btn.addEventListener("click", function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        transactionModal.classList.add('hidden');
                        transactionModalEditForm.classList.remove('hidden')
                        document.body.style.overflow = '';
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
                    console.error("Erreur lors de la récupération de la transaction :", error);
                    return null;
                } finally {
                    hideLoader();
                }
            }

            function attachCloseHandler(button, modal) {
                button.addEventListener('click', function () {
                    modal.classList.add('hidden');
                    document.body.style.overflow = '';
                });
            }

            function showLoader() {
                document.getElementById("page-loader").classList.remove("hidden");
            }

            function clearInputValue(type) {
                let description = document.getElementById('notes');
                let category = document.getElementById('sector');
                let amount = document.getElementById('amount');
                let id = document.getElementById('tr-id');
                description.value = "";
                amount.value = "";
                id.value = "";
                qrInput.value = "";
                qrImagePreview.classList.add("hidden");
                qrPlaceholder.classList.remove("hidden");
                qrUploadContainer.classList.add("border-grey-100")
                qrUploadContainer.classList.remove("border-red-500")
                if (type != "add") {
                    document.querySelector('input[name="transaction_type"][value="Entrée"]').checked = true;
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
                        behavior: "smooth" // Animation fluide
                    });
                }
            }

            function formatDate(isoString) {
                const date = new Date(isoString);

                const months = [
                    "janv", "févr", "mars", "avr", "mai", "juin",
                    "juil", "août", "sept", "oct", "nov", "déc"
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
                    "janv", "févr", "mars", "avr", "mai", "juin",
                    "juil", "août", "sept", "oct", "nov", "déc"
                ];

                const day = date.getDate();
                const month = months[date.getMonth()];
                const year = date.getFullYear();

                return `${day} ${month} ${year}`;
            }

            function pushWithKey(queryBuilder, key, value) {
                // On cherche s'il existe déjà un objet avec cette clé
                const index = queryBuilder.findIndex(item => item[key] !== undefined);

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

                queryObjects.forEach(obj => {
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

            applyFilters.addEventListener('click', async () => {
                pageNumber = 0;
                let filtersFinalQuery = "";
                loadMoreBtn.classList.add('hidden')
                if (filterCategorySelect.value || filterClientSelect.value) {
                    if (filterCategorySelect.value) {
                        categorieFilterQuery = "&filters[field_category][val]=" + filterCategorySelect.value
                        document.getElementById('active-category').textContent = filterCategorySelect.selectedOptions[0].text;
                        document.getElementById('active-category').classList.remove('hidden');
                    }
                    if (filterClientSelect.value) {
                        clientFilterQuery = "&filters[field_client][val]=" + filterClientSelect.value
                        // document.getElementById('active-category').textContent = filterClientSelect.selectedOptions[0].text;
                        // document.getElementById('active-category').classList.remove('hidden');
                    }
                    filtersFinalQuery = categorieFilterQuery + clientFilterQuery;
                    pushWithKey(queryBuilder, "category", filtersFinalQuery);
                } else {
                    pushWithKey(queryBuilder, "category", "");
                    document.getElementById('active-category').classList.add('hidden');
                }
                filterPanel.classList.remove('active');
                await fetchAllTransactions(concatQueries(queryBuilder));
                await fetchTransactions(concatQueries(queryBuilder));
            })

            sortByDate.addEventListener('click', async () => {
                pageNumber = 0;
                loadMoreBtn.classList.add('hidden')
                if (sortByDate.getAttribute("data-date") == "asc") {
                    sortByDate.setAttribute("data-date", "desc");
                    pushWithKey(queryBuilder, "dateSort", '&sort[val]=field_date&sort[op]=desc');
                } else {
                    sortByDate.setAttribute("data-date", "asc");
                    pushWithKey(queryBuilder, "dateSort", '&sort[val]=field_date&sort[op]=asc');
                }
                await fetchAllTransactions(concatQueries(queryBuilder));
                await fetchTransactions(concatQueries(queryBuilder));
            })

            loadMoreBtn.addEventListener('click', function () {
                pageNumber++;
                fetchTransactions(concatQueries(queryBuilder));
            });

            // Toast handling
            function showSuccessToast(msg) {
                const successToast = document.createElement('div');
                successToast.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium z-50';
                successToast.textContent = msg;
                document.body.appendChild(successToast);
                setTimeout(() => {
                    successToast.remove();
                    document.body.style.overflow = '';
                }, 5000);
            }

            function showErrorToast(msg) {
                const successToast = document.createElement('div');
                successToast.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium z-50';
                successToast.textContent = msg;
                document.body.appendChild(successToast);
                setTimeout(() => {
                    successToast.remove();
                    document.body.style.overflow = '';
                }, 5000);
            }

            // Delete Modal
            function showDeleteModal(id) {
                transaction = transactions.find(tr => tr.nid == id);
                if (transaction) {
                    deletingId = id;
                    // document.getElementById('deleteCategoryName').textContent = category.name;
                    document.getElementById('deleteModal').classList.remove('hidden');
                }
            }

            // Delete Modal handling
            const deleteModal = document.getElementById('deleteModal');
            const cancelDelete = document.getElementById('cancelDelete');
            const confirmDelete = document.getElementById('confirmDelete');

            cancelDelete.addEventListener('click', function () {
                deleteModal.classList.add('hidden');
                deletingId = null;
            });

            confirmDelete.addEventListener('click', async function () {
                if (deletingId) {
                    await deleteTransactionById(deletingId)
                    deleteModal.classList.add('hidden');
                    deletingId = null;
                }
                showSuccessToast("Transaction supprimée avec succès");
            });

            deleteModal.addEventListener('click', function (e) {
                if (e.target === deleteModal) {
                    deleteModal.classList.add('hidden');
                    deletingId = null;
                }
            });

            // step form handler
            // Update display for current step
            function updateStepDisplay() {
                // Update step text and progress
                document.getElementById("stepText").textContent =
                    `Étape ${currentStep} sur ${totalSteps}`;
                document.getElementById("stepTitle").textContent = stepTitles[currentStep];
                document.getElementById("progressBar").style.width =
                    `${(currentStep / totalSteps) * 100}%`;
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

                const description = document.getElementById('notes');
                const type = document.querySelector('input[name="transaction_type"]:checked')?.value;
                const category = document.getElementById('sector');
                // For step 1, validate amount
                if (currentStep === 1) {
                    if (!category.value) {
                        sectorError.textContent = "Veuillez sélectionner une catégorie !";
                        sectorError.classList.remove("hidden");
                        return false;
                    }
                } else if (currentStep === 2) {
                    if (!getSafeValue(amountInput.value)) return false;
                    // Vérification description
                    if (!description.value.trim()) {
                        notesError.textContent = "La description est obligatoire !";
                        notesError.classList.remove("hidden");
                        return false;
                    }
                }
                return true;
            }
            // Complete transaction and show success modal
            function completeTransaction() {
                // Show loading state
                nextBtn.disabled = true;
                const id = document.getElementById('tr-id').value;
                const value = getSafeValue(amountInput.value);
                const description = document.getElementById('notes');
                const type = document.querySelector('input[name="transaction_type"]:checked')?.value;
                const category = document.getElementById('sector');
                let client = document.getElementById('client');
                nextBtn.innerHTML = `
                            <div class="flex items-center justify-center">
                                <div class="animate-spin mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                            </div>
                        `;
                const formData = {
                    "nid": id,
                    "title": "transaction",
                    "entity_type": "node",
                    "bundle": "transactions",
                    "field_category": parseInt(category.value),
                    "body": "<h1>transaction</h1>",
                    "field_description": description.value.trim(),
                    "uid": 1,
                    "status": 1,
                    "field_amount": value,
                    "field_type": type,
                    "field_date": datetimeInput.value,
                    "field_client": client.value
                }
                if (base64File) {
                    formData.field_evidence = base64File
                }
                updateTransaction(id, formData);

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
                    const filterClientSelect = document.getElementById("filterClientSelect");
                    // Vider les options existantes sauf la première
                    select.innerHTML = '<option value="">Sélectionnez un client</option>';
                    filterClientSelect.innerHTML = '<option value="">Tous les clients</option>';

                    // Ajouter les clients depuis l'API
                    clients.forEach((client) => {
                        const option1 = document.createElement("option");
                        option1.value = client.nid// option value formatée
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

            amountInput.addEventListener("input", updatePreviewValues);

            getTransactionsRange("today");

            (async function () {
                await fetchAllTransactions(queryBuilder[0].first);
                await fetchTransactions(queryBuilder[0].first);
            })();
        });
    </script>

    <script id="categories">
        document.addEventListener("DOMContentLoaded", function () {
            const API_BASE_CATEGORIES =
                "https://miandrilala.online/api/v2/taxonomy_term/category";

            async function loadSectors() {
                try {
                    const res = await fetch(API_BASE_CATEGORIES);
                    const dataArray = await res.json();
                    const categories = dataArray.rows;

                    const select = document.getElementById("sector");
                    const filterCategorySelect = document.getElementById("filterCategorySelect");

                    // Vider les options existantes sauf la première
                    select.innerHTML = '<option value="">Sélectionnez un secteur</option>';
                    filterCategorySelect.innerHTML = '<option value="">Tous les categories</option>';

                    // Ajouter les catégories depuis l'API
                    categories.forEach((cat) => {
                        const option1 = document.createElement("option");
                        option1.value = cat.tid// option value formatée
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
        });

    </script>

    <script id="filterToggle">
        document.addEventListener('DOMContentLoaded', function () {
            const filterBtn = document.getElementById('filterBtn');
            const filterPanel = document.getElementById('filterPanel');
            const closeFilterBtn = document.getElementById('closeFilterBtn');
            filterBtn.addEventListener('click', function () {
                filterPanel.classList.add('active');
            });
            closeFilterBtn.addEventListener('click', function () {
                filterPanel.classList.remove('active');
            });
        });
    </script>

<?php include("includes/lock-screen.php") ?>
</body>

</html>