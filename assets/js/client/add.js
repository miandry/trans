function initAddClientPage() {
  const API_CLIENT = "https://miandrilala.online/api/v2/node/client";
  const API_ADD_CLIENT = "https://miandrilala.online/crud/save";
  const editModal = document.getElementById("editModal");
  const deleteModal = document.getElementById("deleteModal");
  const cancelEdit = document.getElementById("cancelEdit");
  const cancelDelete = document.getElementById("cancelDelete");
  const confirmDelete = document.getElementById("confirmDelete");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  let clients = [];
  let editingId = null;
  let deletingId = null;
  let pageNumber = 0;
  let totalClient = 0;
  let totalPages = 0;
  let perPage = 10;

  async function fetchClients() {
    showLoader();
    try {
      const res = await fetch(
        API_CLIENT +
          "?sort[val]=nid&sort[op]=desc&pager=" +
          pageNumber +
          "&offset=" +
          perPage
      );
      const dataArray = await res.json();

      data = dataArray.rows;
      if (pageNumber == 0) {
        clients = data;
      } else {
        data.forEach((item) => {
          const index = clients.findIndex((cl) => cl.nid === item.nid);
          if (index !== -1) {
            // Si l'élément existe déjà, on le remplace
            clients[index] = item;
          } else {
            // Sinon, on l'ajoute
            clients.push(item);
          }
        });
      }
      totalClient = dataArray.total;
      totalPages = Math.ceil(totalClient / perPage);
      if (pageNumber >= totalPages - 1) {
        loadMoreBtn.classList.add("hidden");
      } else {
        loadMoreBtn.classList.remove("hidden");
      }
      renderClients();
      attachClientEvents();
      return true;
    } catch (error) {
      console.error("Erreur lors du chargement des clients :", error);
    } finally {
      hideLoader();
    }
  }

  loadMoreBtn.addEventListener("click", function () {
    pageNumber++;
    fetchClients();
  });

  function renderClients() {
    const container = document.getElementById("clientList");
    const emptyState = document.getElementById("emptyState");

    if (clients.length === 0) {
      container.innerHTML = "";
      emptyState.classList.remove("hidden");
      return;
    }
    emptyState.classList.add("hidden");

    container.innerHTML = clients
      .map(
        (client) => `
            <div class="flex items-center justify-between p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors  hover:bg-primary/20"
                        data-history-id="${client.nid}" data-history-name="${client.field_name}">
                <div class="flex items-center">
                    <div class="w-7 h-7 flex items-center justify-center bg-primary/10 rounded-lg mr-3">
                        <i class="ri-user-line text-primary"></i>
                    </div>
                    <span class="font-medium text-gray-900 text-sm">${client.nid} - ${client.field_name}</span>
                </div>
                <div class="flex items-center space-x-2">
                    <button 
                        data-edit-id="${client.nid}"
                        class="w-8 h-8 flex items-center justify-center text-white hover:text-primary hover:bg-primary/10 rounded-full bg-primary transition-colors"
                        title="Modifier le client"
                    >
                        <i class="ri-edit-line ri-sm"></i>
                    </button>
                    <button 
                        data-delete-id="${client.nid}"
                        class="w-8 h-8 flex items-center justify-center text-white hover:text-red-600 hover:bg-red-50 rounded-full bg-red-500 transition-colors"
                        title="Supprimer le client"
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

  async function addClient(name) {
    showLoader();
    let newClient = {
      title: name,
      entity_type: "node",
      bundle: "client",
      field_name: name,
      uid: 1,
    };
    try {
      const res = await fetch(API_ADD_CLIENT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newClient),
      });
      newClient = await res.json();
      clients.push(newClient);
      fetchClients();
      showSuccessToast("Client ajoutée avec succès");
    } catch (error) {
      console.error("Erreur lors de l'ajout du client :", error);
      showErrorToast("Erreur lors de l'ajout du client");
    }
  }

  function editClient(id) {
    const client = clients.find((c) => c.nid == id);
    if (client) {
      editingId = id;
      document.getElementById("editClientName").value = client.field_name;
      document.getElementById("editModal").classList.remove("hidden");
    }
  }

  function getHistory(id, name) {
    showLoader();
    try {
      let item = {
        id: id,
        name: name,
      };
      localStorage.setItem("items", JSON.stringify(item));
      window.app.page = "transaction-history";
    } catch (error) {
      showErrorToast("Une erreur c'est produite");
    } finally {
      hideLoader();
    }
  }

  async function updateClient(id, name) {
    showLoader();
    let updatedClient = {
      nid: id,
      entity_type: "node",
      bundle: "client",
      field_name: name,
      uid: 1,
    };
    try {
      const res = await fetch(`${API_ADD_CLIENT}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedClient),
      });
      updatedClient = await res.json();
      fetchClients();
      showSuccessToast("Modifications enregistrées");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du client :", error);
      showErrorToast("Erreur lors de la mise à jour du client");
    }
  }

  function showDeleteModal(id) {
    const client = clients.find((c) => c.nid == id);
    if (client) {
      deletingId = id;
      document.getElementById("deleteClientName").textContent =
        client.field_name;
      document.getElementById("deleteModal").classList.remove("hidden");
    }
  }

  async function deleteClient(id) {
    showLoader();
    try {
      await fetch(`https://miandrilala.online/confirm/node/${id}/delete`, {
        method: "POST",
      });
      clients = clients.filter((c) => c.nid != id);
      renderClients();
      showSuccessToast("Client supprimée avec succès");
    } catch (error) {
      console.error("Erreur lors de la suppression du client :", error);
    } finally {
      hideLoader();
    }
  }

  function attachClientEvents() {
    document.querySelectorAll("[data-edit-id]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        editClient(btn.dataset.editId);
      });
    });

    document.querySelectorAll("[data-delete-id]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        showDeleteModal(btn.dataset.deleteId);
      });
    });

    document.querySelectorAll("[data-history-id]").forEach((div) => {
      div.addEventListener("click", (e) => {
        const id = div.dataset.historyId;
        const name = div.dataset.historyName;
        getHistory(id, name);
      });
    });
  }

  window.editClient = editClient;
  window.showDeleteModal = showDeleteModal;
  window.getHistory = getHistory;

  // Charger les clients
  fetchClients();

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
      deleteClient(deletingId);
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

  const clientForm = document.getElementById("clientForm");
  const editForm = document.getElementById("editForm");

  clientForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("clientName").value.trim();
    if (name) {
      addClient(name);
      clientForm.reset();
    }
  });

  editForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("editClientName").value.trim();
    if (name && editingId) {
      updateClient(editingId, name);
      document.getElementById("editModal").classList.add("hidden");
      editingId = null;
    }
  });
}
