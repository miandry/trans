<?php
include __DIR__ . '/../includes/nav.php'; ?>

<!-- Delete Confirmation Modal -->
<div id="deleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden"
    style="z-index: 99;">
    <div class="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
        <div class="flex items-center mb-4">
            <div class="w-12 h-12 flex items-center justify-center bg-red-100 rounded-full mr-4">
                <i class="ri-error-warning-line text-red-600 ri-lg"></i>
            </div>
            <div>
                <h3 class="text-lg font-semibold text-gray-900">Supprimer la transaction</h3>
                <p class="text-sm text-gray-600">Cette action ne peut pas être annulée</p>
            </div>
        </div>
        <p class="text-gray-700 mb-6">Êtes-vous sûr de vouloir supprimer cette rapport?</p>
        <div class="flex space-x-3">
            <button type="button" id="cancelDelete"
                class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors !rounded-button whitespace-nowrap">
                Annuler
            </button>
            <button type="button" id="confirmDelete"
                class="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors !rounded-button whitespace-nowrap">
                Supprimer
            </button>
        </div>
    </div>
</div>

<!-- modal for show Report form -->
<div id="reportModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden">
    <div class="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[90vh] overflow-y-auto">
        <div class="px-4 py-3 border-b border-gray-100 sticky top-0 bg-white">
            <div class="flex items-center justify-between">
                <h2 class="text-lg font-medium text-gray-900">Rapport</h2>
                <button id="closeReportModal" class="w-8 h-8 flex items-center justify-center">
                    <i class="ri-close-line text-gray-600"></i>
                </button>
            </div>
        </div>
        <div class="px-4 pt-2 space-y-6">
            <div id="reportForm" class="space-y-6">
                <div>
                    <div class="space-y-4 mb-4">
                        <div class="flex justify-between py-2 border-b border-gray-100 items-center">
                            <span class="text-sm font-medium text-gray-700">Catégorie</span>
                            <span id="rCategorie"
                                class="inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-500 ring-1 ring-inset ring-yellow-400/20 text-center">

                            </span>
                        </div>
                        <div class="flex justify-between py-2 border-b border-gray-100">
                            <span class="text-sm font-medium text-gray-700">Client :</span>
                            <div id="rClientList">

                            </div>
                        </div>
                        <div class=" flex justify-between py-2 border-b border-gray-100 items-center">
                            <span class="text-sm font-medium text-gray-700">Solde</span>
                            <span class="text-sm text-primary" id="rSoldeTotal"></span>
                        </div>
                    </div>
                    <div class="mb-4">
                        <label for="amountRmbEdit" class="block text-sm font-medium text-gray-700 mb-1">Solde
                            (RMB)</label>
                        <div class="relative">
                            <input type="text" id="amountRmbEdit"
                                class="w-full p-2 border border-gray-300 rounded-button focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-sm"
                                placeholder="Entrez le montant en RMB" />
                        </div>
                        <p id="amountRmbEditError" class="text-red-500 text-xs mt-2 hidden"></p>
                    </div>

                    <div class="mb-4">
                        <label for="amountArEdit" class="block text-sm font-medium text-gray-700 mb-1">Solde
                            (Ariary)</label>
                        <div class="relative">
                            <input type="number" id="amountArEdit"
                                class="w-full p-2 border border-gray-300 rounded-button focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-sm"
                                placeholder="Entrez le montant en Ariary" />
                        </div>
                        <p id="amountArEditError" class="text-red-500 text-xs mt-2 hidden"></p>
                    </div>
                    <div class="space-y-2">
                        <div class="mb-4">
                            <label class="block mb-2 text-sm font-medium text-gray-700"
                                for="dateRapprot">Date</label>
                            <input type="date" id="dateRapprot"
                                class="w-full p-2 border border-gray-300 rounded-button focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-sm">
                        </div>
                        <div class="mb-4">
                            <label for="rDescription"
                                class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <div class="relative">
                                <textarea rows="2" id="rDescription" placeholder="Description ..."
                                    class="w-full p-2 border border-gray-300 rounded-button focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-sm"></textarea>
                            </div>
                            <p id="rDescriptionError" class="text-red-500 text-xs mt-2 hidden"></p>
                        </div>
                    </div>
                    <div class="flex gap-3 mt-4">
                        <button id="saveReport"
                            class="flex-1 py-3 px-4 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition-colors cursor-pointer !rounded-button">Enregistrez
                            les modifications</button>
                        <button id="deleteReportBtn"
                            class="w-min py-3 px-4 bg-red-400 text-white rounded-lg font-medium hover:bg-red-600 transition-colors cursor-pointer !rounded-button">
                            <i class="ri-delete-bin-line text-white text-lg"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

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
                    <div class="mb-4">
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

<!-- Main Content -->
<main class="pb-4 px-4 flex-1 lg:ml-64">
    <div class="flex items-center justify-between p-4 lg:hidden bg-white shadow-sm">
        <button id="openSidebar" class="text-gray-500 hover:text-gray-700">
            <div class="w-5 h-5 flex items-center justify-center">
                <i class="ri-menu-line"></i>
            </div>
        </button>
        <h1 class="font-['Pacifico'] text-xl text-primary">logo</h1>
    </div>

    <!-- Rapport List -->
    <div class="bg-white rounded-lg shadow-md mt-4 mb-24">
        <div class="p-5">
            <div class="flex justify-between flex-wrap items-center mb-3">
                <h2 class="text-lg font-semibold text-gray-800 mb-1">
                    Rapports
                </h2>
                <div class="flex items-center gap-2 mb-1 hidden">
                    <button id="active-client"
                        class="text-xs px-3 py-1.5 rounded-full bg-yellow-400 text-white font-medium whitespace-nowrap hidden">
                        Client
                    </button>
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
                                <span>Solde</span>
                            </div>
                        </div>
                    </div>
                    <div id="rapports-container" class="divide-y divide-gray-50">
                        <div class="rapport-row px-4 py-3 cursor-pointer" id="emptyReport">
                            <div class="text-center py-8 text-gray-500">
                                <i class="ri-inbox-line text-4xl mb-2 text-gray-300"></i>
                                <p>Aucun rapport disponible</p>
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
    <div class="bottom-0 w-full bg-white border-t border-gray-200 shadow-lg fixed bottom-0 left-0 fs-c-7"
        id="bottomSumary">
        <div class="px-4 py-3">
            <div class="flex justify-between items-center mb-1" id="total-in">
                <span class="text-gray-600">Solde total</span>
                <span id="summary-rmb" class="text-green-600">0 Ar</span>
            </div>
            <div class="flex justify-end items-center mb-1 text" id="total-out">
                <span id="summary-ar" class="text-secondary">0 Ar</span>
            </div>
        </div>
    </div>
    <div class="fixed bottom-36 right-6 z-30">
        <button id="exportExcel"
            class="w-10 h-10 bg-purple-500 hover:bg-primary-dark shadow-lg rounded-full flex items-center justify-center cursor-pointer transition-transform duration-200 hidden">
            <i class="ri-upload-2-line text-white text-2xl"></i>
        </button>
    </div>
    <div class="fixed bottom-24 right-6 z-30">
        <button id="fabButton"
            class="w-10 h-10 bg-primary hover:bg-primary-dark shadow-lg rounded-full flex items-center justify-center cursor-pointer transition-transform duration-200">
            <i class="ri-add-fill text-white text-2xl"></i>
        </button>
    </div>
</main>