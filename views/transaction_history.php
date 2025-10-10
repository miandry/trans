<?php
include __DIR__ . '/../includes/gestion_transaction_modal.php'; ?>
<?php
include __DIR__ . '/../includes/nav.php'; ?>

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

    <!-- Transactions List -->
    <div class="bg-white rounded-lg shadow-md mt-4 mb-24">
        <div class="p-5">
            <div class="flex justify-between flex-wrap items-center mb-3">
                <h2 class="text-lg font-semibold text-gray-800 mb-1">
                    Historique
                </h2>
                <div class="flex items-center gap-2 mb-1">
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
    <div class="bottom-0 w-full bg-white border-t border-gray-200 shadow-lg fixed bottom-0 left-0 fs-c-7">
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
                <div>
                    <span class="text-sm font-medium text-gray-700">Solde disponible </span>
                    <span class="bg-primary p-1 rounded-full hidden" id="showRapportForm"><i
                            class="ri-add-line text-white text-sm"></i></span>
                </div>
                <span id="summary-net" class="font-semibold text-primary">0 Ar</span>
            </div>
        </div>
    </div>

    <div class="fixed bottom-24 right-6 z-30">
        <div id="fabMenu"
            class="absolute bottom-10 right-0 mb-2 bg-white rounded-lg shadow-xl scale-0 origin-bottom-right transition-transform duration-200 ease-in-out">
            <div class="py-2 w-64">
                <a href="/gestion/transaction" class="w-full px-4 py-2 flex items-center space-x-3 hover:bg-gray-100 transition-colors">
                    <div class="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                        <i class="ri-add-line text-white"></i>
                    </div>
                    <span class="text-sm font-medium text-gray-900">Nouv Transaction</span>
                </a>
                <a href="/gestion/multiple-transactions" data-readdy="true"
                    class="w-full px-4 py-2 flex items-center space-x-3 hover:bg-gray-100 transition-colors">
                    <div class="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                        <i class="ri-add-line text-white"></i>
                    </div>
                    <span class="text-sm font-medium text-gray-900">Ajout Multi tran.</span>
                </a>
            </div>
        </div>
        <button id="fabButton"
            class="w-10 h-10 bg-primary hover:bg-primary-dark shadow-lg rounded-full flex items-center justify-center cursor-pointer transition-transform duration-200">
            <i class="ri-add-fill text-white text-2xl"></i>
        </button>
    </div>

</main>