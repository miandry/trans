function initAddExchangePage() {
  const API_FETCH = "https://miandrilala.online/api/v2/taxonomy_term/exchange";
  const API_ADD_EXCHANGE = "https://miandrilala.online/crud/save";
  const editModal = document.getElementById("editModal");
  const deleteModal = document.getElementById("deleteModal");
  const cancelEdit = document.getElementById("cancelEdit");
  const cancelDelete = document.getElementById("cancelDelete");
  const confirmDelete = document.getElementById("confirmDelete");
  let exchanges = [];
  let editingId = null;
  let deletingId = null;

  async function fetchExchanges() {
    showLoader();
    try {
      const res = await fetch(API_FETCH + "?sort[val]=tid&sort[op]=desc");
      const dataArray = await res.json();
      exchanges = dataArray.rows;
      renderExchanges();
      attachExchangeEvents();
    } catch (error) {
      console.error("Erreur lors du chargement des données :", error);
    } finally {
      hideLoader();
    }
  }

  function renderExchanges() {
    const container = document.getElementById("exchangesList");
    const emptyState = document.getElementById("emptyState");

    if (exchanges.length === 0) {
      container.innerHTML = "";
      emptyState.classList.remove("hidden");
      return;
    }
    emptyState.classList.add("hidden");

    container.innerHTML = exchanges
      .map(
        (exchange) => `
            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors hover:bg-primary/20">
                <div class="flex items-center">
                    <div class="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-lg mr-3">
                        <i class="ri-bookmark-line text-primary"></i>
                    </div>
                    <span class="font-medium text-gray-900">${exchange.name}</span>
                </div>
                <div class="flex items-center space-x-2">
                    <button 
                        data-edit-id="${exchange.tid}" 
                        class="w-8 h-8 flex items-center justify-center text-white hover:text-primary hover:bg-primary/10 rounded-full bg-primary transition-colors"
                        title="Modifier la catégorie"
                    >
                        <i class="ri-edit-line ri-sm"></i>
                    </button>
                    <button 
                        data-delete-id="${exchange.tid}" 
                        class="w-8 h-8 flex items-center justify-center text-white hover:text-red-600 hover:bg-red-50 rounded-full bg-red-500 transition-colors"
                        title="Supprimer"
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

  function attachExchangeEvents() {
    // Modifier
    document.querySelectorAll("[data-edit-id]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.dataset.editId;
        editExchange(id);
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

  async function addExchange(value) {
    showLoader();
    let newExchange = {
      entity_type: "taxonomy_term",
      bundle: "exchange",
      name: value,
      uid: 1,
    };
    try {
      const res = await fetch(API_ADD_EXCHANGE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExchange),
      });
      newExchange = await res.json();
      exchanges.push(newExchange);
      fetchExchanges();
      showSuccessToast("Montant ajoutée avec succès");
    } catch (error) {
      console.error("Erreur lors de l'ajout de la montant :", error);
      showErrorToast("Erreur lors de l'ajout de la montant");
    }
  }

  function editExchange(id) {
    const exchange = exchanges.find((e) => e.tid == id);
    if (exchange) {
      editingId = id;
      document.getElementById("editExchange").value = exchange.name;
      document.getElementById("editModal").classList.remove("hidden");
    }
  }

  async function updateExchange(id, amount) {
    showLoader();
    let updatedExchange = {
      tid: id,
      entity_type: "taxonomy_term",
      bundle: "exchange",
      name: amount,
      uid: 1,
    };
    try {
      const res = await fetch(`${API_ADD_EXCHANGE}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedExchange),
      });
      updatedExchange = await res.json();
      fetchExchanges();
      showSuccessToast("Modifications enregistrées");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      showErrorToast("Erreur lors de la mise à jour");
    }
  }

  function showDeleteModal(id) {
    const exchange = exchanges.find((ex) => ex.tid == id);
    if (exchange) {
      deletingId = id;
      document.getElementById("deleteMontantValue").textContent = exchange.name;
      document.getElementById("deleteModal").classList.remove("hidden");
    }
  }

  async function deleteExchange(id) {
    showLoader();
    try {
      await fetch(
        `https://miandrilala.online/confirm/taxonomy_term/${id}/delete`,
        { method: "POST" }
      );
      exchanges = exchanges.filter((e) => e.tid != id);
      renderExchanges();
      showSuccessToast("Montant supprimée avec succès");
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  }

  window.editExchange = editExchange;
  window.showDeleteModal = showDeleteModal;

  // Charger les catégories depuis MockAPI au démarrage
  fetchExchanges();

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
      deleteExchange(deletingId);
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

  const exchangeForm = document.getElementById("exchangeForm");
  const editForm = document.getElementById("editForm");

  exchangeForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const amount = document.getElementById("exchangeInput").value.trim();
    if (amount) {
      addExchange(amount);
      exchangeForm.reset();
    }
  });

  editForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const amount = document.getElementById("editExchange").value.trim();
    if (amount && editingId) {
      updateExchange(editingId, amount);
      document.getElementById("editModal").classList.add("hidden");
      editingId = null;
    }
  });
}
