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
        <div class="w-5"></div>
    </div>
    <!-- Input Section -->
    <div class="bg-white rounded-lg shadow-md mt-4">
        <div class="p-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Nouvelle Transaction</h3>

            <div class="space-y-6">
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
                            <div class="mb-4 hidden">
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
                                        class="w-full p-3 border border-gray-300 rounded-button focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-lg appearance-none">
                                        <option value="">Sélectionnez un secteur</option>
                                    </select>
                                    <div
                                        class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
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
                    </div>
                    <div id="step2" class="step-content hidden">
                        <div class="bg-white mb-6">
                            <h2 class="text-xl font-semibold text-gray-900 mb-6">
                                Taux de change
                            </h2>
                        </div>
                        <div class="mb-4">
                            <label for="exchange" class="block text-sm font-medium text-gray-700 mb-1">
                                valeur (<span>taux de change actuel : </span><span id="currentRate"></span>)
                            </label>
                            <div class="relative">
                                <input type="number" id="exchange" min="0"
                                    class="w-full p-3 border border-gray-300 rounded-button focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-lg"
                                    placeholder="Entrez le montant" />
                            </div>
                            <p id="exchangeError" class="text-red-500 text-xs mt-2 hidden"></p>
                        </div>
                    </div>
                    <div id="step3" class="step-content hidden">
                        <div class="bg-white mb-6">
                            <h2 class="text-xl font-semibold text-gray-900 mb-6">
                                Montant
                            </h2>
                            <div class="mb-4">
                                <label for="amount" class="block text-sm font-medium text-gray-700 mb-1">Montant
                                    (Ar)</label>
                                <div class="relative">
                                    <textarea rows="3" id="amount" placeholder="Saisis un montant par ligne"
                                        class="w-full p-3 border border-gray-300 rounded-button focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-lg"></textarea>
                                </div>
                                <p id="amounterror" class="text-red-500 text-xs mt-2 hidden"></p>
                            </div>
                        </div>
                    </div>
                    <div id="step4" class="step-content hidden">
                        <div class="bg-white mb-6">
                            <h2 class="text-xl font-semibold text-gray-900 mb-6">
                                Info supplémentaire
                            </h2>
                            <div class="mb-4">
                                <label class="block text-sm font-medium text-gray-700 mb-2">Date et heure</label>
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
</main>