<?php
include __DIR__ . '/../includes/nav.php'; ?>

<!-- modal for add Report form -->
<div id="reportModalAdd" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden">
    <div class="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[90vh] overflow-y-auto">
        <div class="px-4 py-3 border-b border-gray-100 sticky top-0 bg-white z-50">
            <div class="flex items-center justify-between">
                <h2 class="text-lg font-medium text-gray-900">Ajouter un rapport</h2>
                <button id="closeReportModalAdd" class="w-8 h-8 flex items-center justify-center">
                    <i class="ri-close-line text-gray-600"></i>
                </button>
            </div>
        </div>
        <div class="p-4 space-y-6">
            <div id="addReportForm" class="space-y-6">
                <div>
                    <div class="space-y-4 mb-4">
                        <div class="mb-4">
                            <label for="client" class="block text-sm font-medium text-gray-700 mb-1">
                                Client
                            </label>
                            <div class="relative">
                                <select id="client"
                                    class="w-full p-2 border border-gray-300 rounded-button focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-sm appearance-none">
                                    <option value="">Sélectionnez un client</option>
                                </select>
                                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7" />
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
                                    class="w-full p-2 border border-gray-300 rounded-button focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-sm appearance-none">
                                    <option value="">Sélectionnez un catégorie</option>
                                </select>
                                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            <p id="sectorError" class="text-red-500 text-xs mt-2 hidden"></p>
                        </div>
                    </div>
                    <div class="mb-4 hidden">
                        <label for="amountRmb" class="block text-sm font-medium text-gray-700 mb-1">Solde
                            (RMB)</label>
                        <div class="relative">
                            <input type="text" id="amountRmb"
                                class="w-full p-2 border border-gray-300 rounded-button focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-sm"
                                placeholder="Entrez le montant en RMB" />
                        </div>
                        <p id="amountRmbError" class="text-red-500 text-xs mt-2 hidden"></p>
                    </div>

                    <div class="mb-4">
                        <label for="amountAr" class="block text-sm font-medium text-gray-700 mb-1">Solde
                            (Ariary)</label>
                        <div class="relative">
                            <input type="number" id="amountAr"
                                class="w-full p-2 border border-gray-300 rounded-button focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-sm"
                                placeholder="Entrez le montant en Ariary" />
                        </div>
                        <p id="amountArError" class="text-red-500 text-xs mt-2 hidden"></p>
                    </div>
                    <div class="space-y-2">
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1"
                                for="dateRapprotAdd">Date</label>
                            <input type="date" id="dateRapprotAdd"
                                class="w-full p-2 border border-gray-300 rounded-button focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-sm">
                            <p id="dateErr" class="text-red-500 text-xs mt-2 hidden"></p>
                        </div>
                        <div class="mb-4">
                            <label for="rDescriptionAdd"
                                class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <div class="relative">
                                <textarea rows="2" id="rDescriptionAdd" placeholder="Description ..."
                                    class="w-full p-2 border border-gray-300 rounded-button focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-sm"></textarea>
                            </div>
                            <p id="rDescriptionErrorAdd" class="text-red-500 text-xs mt-2 hidden"></p>
                        </div>
                    </div>
                    <div class="flex gap-3 mt-4">
                        <button id="addReport"
                            class="flex-1 py-3 px-4 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition-colors cursor-pointer !rounded-button">
                            Enregistrez
                        </button>
                    </div>
                </div>
            </div>
        </div>
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
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2" for="dateDebut">Date début</label>
                    <input type="date" id="dateDebut"
                        class="w-full p-2 border border-gray-300 rounded-button focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-sm">
                </div>
            </div>
        </div>
        <div class="space-y-6">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2" for="dateFin">Date fin</label>
                <input type="date" id="dateFin"
                    class="w-full p-2 border border-gray-300 rounded-button focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-sm">

                <p id="dateErrMsg" class="text-red-500 text-xs mt-2 hidden"></p>
            </div>
        </div>
    </div>
    <div class="px-4 py-4 border-t border-gray-200 flex gap-3">
        <button id="applyFilters"
            class="flex-1 py-2.5 bg-primary text-white rounded-lg text-sm font-medium cursor-pointer !rounded-button">Appliquer</button>
    </div>
</div>

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
    <!-- Input Section -->
    <div class="bg-white rounded-lg shadow-md p-5 mt-4">
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
            <div class="relative">
                <select id="categorySelect"
                    class="w-full px-3 py-2 border border-gray-300 rounded-button text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-white">
                </select>
                <div
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 flex items-center justify-center">
                    <i class="ri-arrow-down-s-line text-gray-500"></i>
                </div>
            </div>
        </div>
        <div class="mb-4">
            <label for="amount" class="block text-sm font-medium text-gray-700 mb-1">Montant à insérer</label>
            <div class="relative">
                <textarea rows="3" id="amount" placeholder="Saisis un montant par ligne"
                    class="w-full p-2 border border-gray-300 rounded-button focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-sm"></textarea>

                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span class="text-gray-500">Ar</span>
                </div>
                <div id="errorMessages" class="hidden">
                    <p class="text-red-500 text-xs mt-2">Caractères invalide</p>
                </div>
            </div>
        </div>
        <button id="add-btn"
            class="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-3 rounded-button flex items-center justify-center cursor-pointer transition-all duration-200 text-sm">
            <i class="ri-add-line mr-2 text-lg"></i>
            Ajouter la transaction
        </button>
        <p class="text-xs text-gray-500 mt-2 text-center">
            Chaque insertion est soumise à des frais selon le taux défini
        </p>
    </div>
    <!-- Transactions List -->
    <div class="bg-white rounded-lg shadow-md p-5 mt-4 mb-24">
        <div class="mb-4">
            <div class="flex justify-between items-center mb-3">
                <h2 class="text-lg font-semibold text-gray-800">
                    Historique
                </h2>
                <div class="flex items-center gap-2">
                    <button id="save-history"
                        class="text-xs px-3 py-1.5 rounded-full bg-green-100 text-green-600 font-medium hover:bg-green-200 transition-colors hidden">
                        <i class="ri-save-line mr-1"></i>Sauvegarder
                    </button>
                    <button id="clear-all"
                        class="text-xs px-3 py-1.5 rounded-full bg-red-100 text-red-600 font-medium hover:bg-red-200 transition-colors">
                        <i class="ri-delete-bin-line mr-1"></i>Tout effacer
                    </button>
                    <span id="transaction-count"
                        class="bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full">0</span>
                </div>
            </div>
            <div class="flex gap-2">
                <button id="filter-all" class="text-xs px-3 py-1.5 rounded-full bg-primary text-white font-medium">
                    Tout
                </button>
                <button id="filter-positive"
                    class="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 font-medium">
                    Positif
                </button>
                <button id="filter-negative"
                    class="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 font-medium">
                    Négatif
                </button>
            </div>
        </div>
        <div id="transactions-container" class="divide-y divide-gray-200 max-h-[300px] overflow-y-auto">
            <div class="text-center py-8 text-gray-500">
                <i class="ri-inbox-line text-4xl mb-2 text-gray-300"></i>
                <p>Aucune transaction pour le moment</p>
            </div>
        </div>
    </div>
</main>
<!-- Bottom Summary -->
<div class="fixed bottom-0 w-full bg-white border-t border-gray-200 shadow-lg">
    <div class="px-4 py-3">
        <div class="flex justify-between items-center mb-1 fs-c-7">
            <span class="text-gray-600">Total positif</span>
            <span id="summary-positive" class="font-medium text-green-600">0 Ar</span>
        </div>
        <div class="flex justify-between items-center mb-1 fs-c-7">
            <span class="text-gray-600">Total négatif</span>
            <span id="summary-negative" class="font-medium text-secondary">0 Ar</span>
        </div>
        <div class="flex justify-between items-center fs-c-7">
            <span class="font-medium text-gray-700">Solde disponible</span>
            <span id="summary-net" class="font-semibold text-primary">0 Ar</span>
        </div>
    </div>
</div>
<div class="fixed bottom-40 right-6 z-30">
    <button id="exportExcel"
        class="w-10 h-10 bg-purple-500 hover:bg-primary-dark shadow-lg rounded-full flex items-center justify-center cursor-pointer transition-transform duration-200 hidden">
        <i class="ri-upload-2-line text-white text-2xl"></i>
    </button>
</div>
<div class="fixed bottom-28 right-6 z-30">
    <button id="fabButton"
        class="w-10 h-10 bg-primary hover:bg-primary-dark shadow-lg rounded-full flex items-center justify-center cursor-pointer transition-transform duration-200">
        <i class="ri-add-fill text-white text-2xl"></i>
    </button>
</div>