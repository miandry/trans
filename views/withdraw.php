<?php
include __DIR__ . '/../includes/nav.php'; ?>


<!--Main content -->
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
            <h1 class="text-2xl font-bold text-gray-800">Générer un Code</h1>
            <p class="text-gray-600 text-sm mt-1">Créez une chaîne formatée basée sur vos entrées</p>
        </header>
        <form id="codeForm" class="space-y-6">
            <div class="space-y-2 hidden">
                <label for="mvolaType" class="block text-sm font-medium text-gray-700">Type de Mvola</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <div class="w-5 h-5 flex items-center justify-center text-gray-400">
                            <i class="ri-bank-line"></i>
                        </div>
                    </div>
                    <select id="mvolaType"
                        class="block w-full pl-10 pr-8 py-2 border border-gray-300 rounded-button text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary appearance-none bg-white">
                        <option value="entreprise">Mvola Entreprise</option>
                        <option value="personnes">Mvola Personnes</option>
                    </select>
                    <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <div class="w-5 h-5 flex items-center justify-center text-gray-400">
                            <i class="ri-arrow-down-s-line"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="space-y-2">
                <label for="phone" class="block text-sm font-medium text-gray-700">Numéro de téléphone</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <div class="w-5 h-5 flex items-center justify-center text-gray-400">
                            <i class="ri-smartphone-line"></i>
                        </div>
                    </div>
                    <input type="tel" id="phone" name="phone"
                        class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-button text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Enter phone number">
                </div>
                <p class="text-yellow-500 text-xs">Veuillez entrer un numéro marchand valide</p>
                <p id="phoneError" class="text-red-500 text-xs hidden">Please enter a valid phone number</p>
            </div>
            <div class="space-y-2">
                <label for="amount" class="block text-sm font-medium text-gray-700">Montant</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <div class="w-5 h-5 flex items-center justify-center text-gray-400">
                            <i class="ri-money-dollar-circle-line"></i>
                        </div>
                    </div>
                    <input type="text" id="amount" name="amount"
                        class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-button text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Enter amount">
                </div>
                <p id="amountError" class="text-red-500 text-xs hidden">Please enter a valid amount</p>
            </div>
            <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Code généré</label>
                <div class="relative">
                    <input type="text" id="result"
                        class="block w-full pr-20 py-2 px-3 bg-gray-50 border border-gray-300 rounded-button text-gray-700 focus:outline-none"
                        readonly placeholder="Code will appear here">
                    <div class="absolute inset-y-0 right-0 flex items-center">
                        <button type="button" id="callBtn"
                            class="px-2 flex items-center whitespace-nowrap !rounded-button">
                            <div class="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-primary">
                                <i class="ri-phone-line"></i>
                            </div>
                        </button>
                        <button type="button" id="copyBtn"
                            class="px-2 flex items-center whitespace-nowrap !rounded-button">
                            <div class="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-primary">
                                <i class="ri-file-copy-line"></i>
                            </div>
                        </button>
                    </div>
                </div>
                <p id="copyMessage" class="text-green-500 text-xs text-center hidden">Copied to clipboard!</p>
            </div>
            <div class="flex space-x-4">
                <button type="button" id="generateBtn"
                    class="flex-1 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-button shadow-sm transition duration-150 whitespace-nowrap !rounded-button">
                    Générer
                </button>
                <button type="button" id="clearBtn"
                    class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-button shadow-sm transition duration-150 whitespace-nowrap !rounded-button">
                    Effacer
                </button>
            </div>
        </form>
        <div class="mt-8 border-t pt-6">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-medium text-gray-800">Historique</h2>
                <div class="flex items-center gap-4">
                    <p class="text-xs text-gray-600">Total: <span id="totalAmount" class="font-medium">0 Ar</span>
                    </p>
                    <button type="button" id="clearHistoryBtn"
                        class="text-sm text-red-500 hover:text-red-700 whitespace-nowrap !rounded-button hidden">
                        Effacer l'historique
                    </button>
                </div>
            </div>
            <div id="historyContainer" class="max-h-60 overflow-y-auto rounded-md border border-gray-200">
                <ul id="historyList" class="divide-y divide-gray-200"></ul>
            </div>
            <p id="emptyHistory" class="text-gray-500 text-sm text-center py-4">Aucun historique</p>
        </div>
    </div>
</main>