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
    <div class="bg-white rounded-lg shadow-md p-5 mt-4">
        <!-- Add Category Form -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 class="text-xl font-semibold text-gray-900 mb-6">Ajouter une catégorie</h2>

            <form id="categoryForm" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Nom de la catégorie</label>
                    <input type="text" id="categoryName"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                        placeholder="Entrez le nom de la catégorie" required>
                </div>

                <button type="submit"
                    class="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 !rounded-button transition-colors whitespace-nowrap">
                    <div class="w-5 h-5 flex items-center justify-center mr-2 inline-flex">
                        <i class="ri-add-line"></i>
                    </div>
                    Ajouter la catégorie
                </button>
            </form>
        </div>

        <!-- Categories List -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
            <div class="flex items-center justify-between mb-6 ms-2 mt-1">
                <h2 class="text-xl font-semibold text-gray-900">Tout les categories</h2>
                <div class="flex items-center space-x-3 hidden">
                    <button
                        class="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors !rounded-button whitespace-nowrap">
                        <div class="w-4 h-4 flex items-center justify-center mr-1 inline-flex">
                            <i class="ri-delete-bin-line ri-sm"></i>
                        </div>
                        Clear All
                    </button>
                    <span class="text-sm text-gray-500">5</span>
                </div>
            </div>

            <div class="space-y-3" id="categoriesList">
                <!-- Categories will be populated here -->
            </div>

            <div id="emptyState" class="text-center py-12 hidden">
                <div class="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-gray-100 rounded-full">
                    <i class="ri-bookmark-line text-gray-400 ri-2x"></i>
                </div>
                <p class="text-gray-500">No categories found</p>
                <p class="text-sm text-gray-400 mt-1">Add your first category using the form above</p>
            </div>
        </div>
    </div>
</main>

<!-- Edit Modal -->
<div id="editModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50">
    <div class="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Modifier la catégorie</h3>
        <form id="editForm">
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Nom de la catégorie</label>
                <input type="text" id="editCategoryName"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                    required>
            </div>
            <div class="flex space-x-3">
                <button type="button" id="cancelEdit"
                    class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors !rounded-button whitespace-nowrap">
                    Annuler
                </button>
                <button type="submit"
                    class="flex-1 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors !rounded-button whitespace-nowrap">
                    Mettre à jour
                </button>
            </div>
        </form>
    </div>
</div>

<!-- Delete Confirmation Modal -->
<div id="deleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50">
    <div class="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
        <div class="flex items-center mb-4">
            <div class="w-12 h-12 flex items-center justify-center bg-red-100 rounded-full mr-4">
                <i class="ri-error-warning-line text-red-600 ri-lg"></i>
            </div>
            <div>
                <h3 class="text-lg font-semibold text-gray-900">Supprimer la catégorie</h3>
                <p class="text-sm text-gray-600">Cette action ne peut pas être annulée</p>
            </div>
        </div>
        <p class="text-gray-700 mb-6">Êtes-vous sûr de vouloir supprimer "<span id="deleteCategoryName"
                class="font-medium"></span>"?</p>
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