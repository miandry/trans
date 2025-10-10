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

                            <div class="mb-4">
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    Type du transaction
                                </label>
                                <div id="transaction-type" class="ms-2">
                                    <div>
                                        <label class="flex items-center gap-2">
                                            <input type="radio" name="transaction_type" value="Entrée" checked
                                                class="text-primary focus:ring-primary">
                                            <span>RMB payé</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label class="flex items-center gap-2">
                                            <input type="radio" name="transaction_type" value="Sortie"
                                                class="text-primary focus:ring-primary">
                                            <span>Ar reçue</span>
                                        </label>
                                    </div>
                                </div>
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
                                Montant & Description
                            </h2>
                            <div class="mb-4">
                                <label for="amount"
                                    class="block text-sm font-medium text-gray-700 mb-1">Montant</label>
                                <div class="relative">
                                    <input type="text" id="amount"
                                        class="w-full p-3 border border-gray-300 rounded-button focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-lg"
                                        placeholder="Entrez le montant" />
                                </div>
                                <p id="amounterror" class="text-red-500 text-xs mt-2 hidden"></p>
                            </div>
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
                    <div id="step4" class="step-content hidden">
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
</main>