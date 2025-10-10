<!-- Transaction modal for details -->
<div id="transactionModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden">
    <div class="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[90vh] overflow-y-auto">
        <div class="px-4 py-3 border-b border-gray-100 sticky top-0 bg-white">
            <div class="flex items-center justify-between">
                <h2 class="text-lg font-medium text-gray-900">Détails de la transaction</h2>
                <button id="closeModalBtn" class="w-8 h-8 flex items-center justify-center">
                    <i class="ri-close-line text-gray-600"></i>
                </button>
            </div>
        </div>
        <div class="p-4 space-y-6">
            <div id="transactionForm" class="space-y-6">

            </div>
        </div>
    </div>
</div>
<!--  -->

<!-- Delete Confirmation Modal -->
<div id="deleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50">
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
        <p class="text-gray-700 mb-6">Êtes-vous sûr de vouloir supprimer cette transaction?</p>
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

<!-- update status Modal -->
<div id="updateTrStatusModal"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50">
    <div class="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
        <div class="flex items-center mb-4">
            <div class="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full mr-4">
                <i class="ri-error-warning-line text-blue-600 ri-lg"></i>
            </div>
            <div>
                <h3 class="text-lg font-semibold text-gray-900">Changer le statut</h3>
            </div>
        </div>
        <div>
            <div class="mb-4">
                <div id="transaction-status" class="ms-8">
                    <input type="number" class="hidden" id="idTr">
                    <div>
                        <label class="flex items-center gap-2">
                            <input type="radio" name="transaction_state" value="Draft" checked
                                class="text-primary focus:ring-primary">
                            <span>Draft</span>
                        </label>
                    </div>
                    <div>
                        <label class="flex items-center gap-2">
                            <input type="radio" name="transaction_state" value="Process"
                                class="text-primary focus:ring-primary">
                            <span>Process</span>
                        </label>
                    </div>
                    <div>
                        <label class="flex items-center gap-2">
                            <input type="radio" name="transaction_state" value="Paid"
                                class="text-primary focus:ring-primary">
                            <span>Paid</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex space-x-3">
            <button type="button" id="cancelUpdate"
                class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors !rounded-button whitespace-nowrap">
                Annuler
            </button>
            <button type="button" id="confirmUpdate"
                class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors !rounded-button whitespace-nowrap">
                Modifier
            </button>
        </div>
    </div>
</div>

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
                            <span id="stepText" class="text-sm font-medium text-primary">Étape 1 sur 4</span>
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
    </div>
</div>

<!-- Transaction modal for Report form -->
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
        <div class="p-4 space-y-6">
            <div id="reportForm" class="space-y-6">
                <div>
                    <div class="space-y-4 mb-4">
                        <div class="flex justify-between py-2 border-b border-gray-100 items-center">
                            <span class="text-sm text-gray-600">Catégorie</span>
                            <span id="rCategorie"
                                class="inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-500 ring-1 ring-inset ring-yellow-400/20 text-center">

                            </span>
                        </div>
                        <div class="py-2 border-b border-gray-100">
                            <span class="text-sm text-gray-600">Client :</span>
                            <div class="ms-2 mt-2" id="rClientList">

                            </div>
                        </div>
                        <div class=" flex justify-between py-2 border-b border-gray-100 items-center">
                            <span class="text-sm text-gray-600">Solde</span>
                            <span class="text-sm text-primary" id="rSoldeTotal"></span>
                        </div>
                    </div>
                    <div class="space-y-2">
                        <div class="mb-4">
                            <label class="block mb-2 text-sm text-gray-600" for="dateRapprot">Date</label>
                            <input type="date" id="dateRapprot"
                                class="w-full p-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none">
                        </div>
                        <div class="mb-4">
                            <label for="rDescription" class="block text-sm text-gray-600 mb-1">Description</label>
                            <div class="relative">
                                <textarea rows="3" id="rDescription" placeholder="Description ..."
                                    class="w-full p-3 border border-gray-300 rounded-button focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-sm"></textarea>
                            </div>
                            <p id="rDescriptionError" class="text-red-500 text-xs mt-2 hidden"></p>
                        </div>
                    </div>
                    <div class="flex gap-3 mt-4">
                        <button id="saveReport"
                            class="flex-1 py-3 px-4 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition-colors cursor-pointer !rounded-button">Enregistrez</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>