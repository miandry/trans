<?php
include __DIR__ . '/../includes/nav.php'; ?>

<!-- Main content -->
<main class="pb-4 px-4 flex-1 lg:ml-64">
    <div class="flex items-center justify-between p-4 lg:hidden bg-white shadow-sm">
        <button id="openSidebar" class="text-gray-500 hover:text-gray-700">
            <div class="w-5 h-5 flex items-center justify-center">
                <i class="ri-menu-line"></i>
            </div>
        </button>
        <h1 class="font-['Pacifico'] text-xl text-primary">logo</h1>
        <div class="w-5"></div>
    </div>
    <div class="max-w-md mx-auto p-4 lg:p-6 bg-white shadow-lg rounded-lg my-4 lg:my-8">
        <header class="mb-6 text-center">
            <h1 class="text-2xl font-bold text-gray-800">Historique des retraits</h1>
            <p class="text-gray-600 text-sm mt-1">Chaîne formatée basée sur vos entrées</p>
        </header>
        <div class="mt-8 border-t pt-6">
            <div class="flex justify-between items-center mb-4">
                <div class="flex justify-between w-full items-center gap-4">
                    <p class="text-sm text-gray-600">Total: <span id="totalAmount" class="font-medium">0 Ar</span>
                    </p>
                    <button type="button" id="clearHistoryBtn"
                        class="text-sm text-red-500 hover:text-red-700 whitespace-nowrap !rounded-button hidden">
                        Effacer l'historique
                    </button>
                </div>
            </div>
            <div class="flex flex-col gap-4 mb-4">
                <div class="flex rounded-button overflow-hidden border">
                    <input id="searchInput" type="text" placeholder="Rechercher un code..."
                        class="flex-grow p-2 outline-none w-2/3" />
                    <button id="searchBtn" class="p-2 text-gray-500 hover:text-primary">
                        <i class="ri-search-line text-lg"></i>
                    </button>
                </div>

                <select id="sortSelect" class="w-full p-2 border rounded-button">
                    <option value="desc">Plus récent</option>
                    <option value="asc">Plus ancien</option>
                </select>
            </div>
            <div id="historyContainer" class="max-h-60 overflow-y-auto rounded-md border border-gray-200">
                <ul id="historyList" class="divide-y divide-gray-200"></ul>
            </div>
            <p id="emptyHistory" class="text-gray-500 text-sm text-center py-4">Aucun historique</p>
        </div>
    </div>
</main>