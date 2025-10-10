function initAddCategoryPage() {
  const API_TRANSACTION =
    "/api/v2/taxonomy_term/category";
  const API_ADD_CATEGORY = "/crud/save";
  const editModal = document.getElementById("editModal");
  const deleteModal = document.getElementById("deleteModal");
  const cancelEdit = document.getElementById("cancelEdit");
  const cancelDelete = document.getElementById("cancelDelete");
  const confirmDelete = document.getElementById("confirmDelete");
  let categories = [];
  let editingId = null;
  let deletingId = null;

  async function fetchCategories() {
    showLoader();
    try {
      const res = await fetch(API_TRANSACTION + "?sort[val]=tid&sort[op]=desc");
      const dataArray = await res.json();
      categories = dataArray.rows;
      renderCategories();
      attachCategoryEvents();
    } catch (error) {
      console.error("Erreur lors du chargement des catégories :", error);
    } finally {
      hideLoader();
    }
  }

  function renderCategories() {
    const container = document.getElementById("categoriesList");
    const emptyState = document.getElementById("emptyState");

    if (categories.length === 0) {
      container.innerHTML = "";
      emptyState.classList.remove("hidden");
      return;
    }
    emptyState.classList.add("hidden");

    container.innerHTML = categories
      .map(
        (category) => `
            <div class="flex items-center justify-between p-2 border border-gray-200 rounded-lg hover:bg-gray-50 hover:bg-primary/20 transition-colors">
                <div class="flex items-center">
                    <div class="w-7 h-7 flex items-center justify-center bg-primary/10 rounded-lg mr-3">
                        <i class="ri-bookmark-line text-primary"></i>
                    </div>
                    <span class="font-medium text-gray-900 text-sm">${category.name}</span>
                </div>
                <div class="flex items-center space-x-2">
                    <button 
                        data-edit-id="${category.tid}" 
                        class="w-8 h-8 flex items-center justify-center text-white hover:text-primary hover:bg-primary/10 rounded-full bg-primary transition-colors"
                        title="Modifier la catégorie"
                    >
                        <i class="ri-edit-line ri-sm"></i>
                    </button>
                    <button 
                        data-delete-id="${category.tid}" 
                        class="w-8 h-8 flex items-center justify-center text-white hover:text-red-600 hover:bg-red-50 rounded-full bg-red-500 transition-colors"
                        title="Supprimer la catégorie"
                    >
                        <i class="ri-delete-bin-line ri-sm"></i>
                    </button>
                </div>
            </div>
        `
      )
      .join("");
    hideLoader();
  }

  function attachCategoryEvents() {
    // Modifier
    document.querySelectorAll("[data-edit-id]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.dataset.editId;
        editCategory(id);
      });
    });

    // Supprimer
    document.querySelectorAll("[data-delete-id]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.dataset.deleteId;
        showDeleteModal(id);
      });
    });
  }

  async function addCategory(name) {
    showLoader();
    let newCategory = {
      entity_type: "taxonomy_term",
      bundle: "category",
      name: name,
      uid: 1,
    };
    try {
      const res = await fetch(API_ADD_CATEGORY, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCategory),
      });
      newCategory = await res.json();
      categories.push(newCategory);
      fetchCategories();
      showSuccessToast("Categorie ajoutée avec succès");
    } catch (error) {
      console.error("Erreur lors de l'ajout de la catégorie :", error);
      showErrorToast("Erreur lors de l'ajout de la catégorie");
    }
  }

  function editCategory(id) {
    const category = categories.find((c) => c.tid == id);
    if (category) {
      editingId = id;
      document.getElementById("editCategoryName").value = category.name;
      document.getElementById("editModal").classList.remove("hidden");
    }
  }

  async function updateCategory(id, name) {
    showLoader();
    let updatedCategory = {
      tid: id,
      entity_type: "taxonomy_term",
      bundle: "category",
      name: name,
      uid: 1,
    };
    try {
      const res = await fetch(`${API_ADD_CATEGORY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCategory),
      });
      updatedCategory = await res.json();
      fetchCategories();
      showSuccessToast("Modifications enregistrées");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la catégorie :", error);
      showErrorToast("Erreur lors de la mise à jour de la catégorie");
    }
  }

  function showDeleteModal(id) {
    const category = categories.find((c) => c.tid == id);
    if (category) {
      deletingId = id;
      document.getElementById("deleteCategoryName").textContent = category.name;
      document.getElementById("deleteModal").classList.remove("hidden");
    }
  }

  async function deleteCategory(id) {
    showLoader();
    try {
      await fetch(
        `/confirm/taxonomy_term/${id}/delete`,
        { method: "POST" }
      );
      categories = categories.filter((c) => c.tid != id);
      renderCategories();
      showSuccessToast("Categorie supprimée avec succès");
    } catch (error) {
      console.error("Erreur lors de la suppression de la catégorie :", error);
    }
  }

  window.editCategory = editCategory;
  window.showDeleteModal = showDeleteModal;

  // Charger les catégories depuis MockAPI au démarrage
  fetchCategories();

  function showLoader() {
    document.getElementById("page-loader").classList.remove("hidden");
  }

  function hideLoader() {
    document.getElementById("page-loader").classList.add("hidden");
  }

  // Toast handling
  function showSuccessToast(msg) {
    const successToast = document.createElement("div");
    successToast.className =
      "fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium z-50";
    successToast.textContent = msg;
    document.body.appendChild(successToast);
    setTimeout(() => {
      successToast.remove();
      document.body.style.overflow = "";
    }, 5000);
  }

  function showErrorToast(msg) {
    const successToast = document.createElement("div");
    successToast.className =
      "fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium z-50";
    successToast.textContent = msg;
    document.body.appendChild(successToast);
    setTimeout(() => {
      successToast.remove();
      document.body.style.overflow = "";
    }, 5000);
  }

  cancelEdit.addEventListener("click", function () {
    editModal.classList.add("hidden");
    editingId = null;
  });

  cancelDelete.addEventListener("click", function () {
    deleteModal.classList.add("hidden");
    deletingId = null;
  });

  confirmDelete.addEventListener("click", function () {
    if (deletingId) {
      deleteCategory(deletingId);
      deleteModal.classList.add("hidden");
      deletingId = null;
    }
  });

  editModal.addEventListener("click", function (e) {
    if (e.target === editModal) {
      editModal.classList.add("hidden");
      editingId = null;
    }
  });

  deleteModal.addEventListener("click", function (e) {
    if (e.target === deleteModal) {
      deleteModal.classList.add("hidden");
      deletingId = null;
    }
  });

  const categoryForm = document.getElementById("categoryForm");
  const editForm = document.getElementById("editForm");

  categoryForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("categoryName").value.trim();
    if (name) {
      addCategory(name);
      categoryForm.reset();
    }
  });

  editForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("editCategoryName").value.trim();
    if (name && editingId) {
      updateCategory(editingId, name);
      document.getElementById("editModal").classList.add("hidden");
      editingId = null;
    }
  });
}
