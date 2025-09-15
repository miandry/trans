<!-- loader -->
<div id="page-loader" class="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm hidden"
    style="z-index: 999999;">
    <div class="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
</div>
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