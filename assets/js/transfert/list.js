function initTransfertListPage() {
  // <script id="historyManagementScript">
  const historyList = document.getElementById("historyList");
  const emptyHistory = document.getElementById("emptyHistory");
  const clearHistoryBtn = document.getElementById("clearHistoryBtn");
  const historyContainer = document.getElementById("historyContainer");

  const searchBtn = document.getElementById("searchBtn");
  const sortSelect = document.getElementById("sortSelect");
  const searchInput = document.getElementById("searchInput");

  // Load history au démarrage
  loadHistory();

  // Fonction pour charger l’historique
  function loadHistory() {
    let history = JSON.parse(localStorage.getItem("codeHistory") || "[]");

    // --- Filtrage recherche ---
    const searchValue = searchInput.value.trim().toLowerCase();
    if (searchValue) {
      history = history.filter((item) =>
        item.code.toLowerCase().includes(searchValue)
      );
    }

    // --- Tri par date ---
    const sortValue = sortSelect.value;
    if (sortValue === "desc") {
      history.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } else if (sortValue === "asc") {
      history.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    }

    // Nettoyer la liste
    historyList.innerHTML = "";
    let totalAmount = 0;

    // Calcul du montant total
    history.forEach((item) => {
      const match = item.code.match(/\*(\d+)\*1#$/);
      if (match) {
        totalAmount += parseInt(match[1]);
      }
    });

    document.getElementById("totalAmount").textContent =
      totalAmount.toLocaleString("fr-FR") + " Ar";

    if (history.length === 0) {
      emptyHistory.classList.remove("hidden");
      historyContainer.classList.add("hidden");
    } else {
      emptyHistory.classList.add("hidden");
      historyContainer.classList.remove("hidden");

      history.forEach((item, index) => {
        const amount = item.code.match(/\*(\d+)\*1#$/)[1];
        const li = document.createElement("li");
        li.className = index % 2 === 0 ? "bg-white" : "bg-gray-50";

        const date = new Date(item.timestamp);
        const formattedDate = date.toLocaleString("fr-FR", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        li.innerHTML = `
                            <div class="flex justify-between items-center p-3">
                                <div class="fs-c-7 w-2/3">
                                    <p class="history-code font-medium text-gray-800 break-all">
                                        ${item.code}
                                        ${
                                          item.paid
                                            ? '<span class="payment-status text-xs font-medium text-green-500 ml-2">Payé</span>'
                                            : ""
                                        }
                                    </p>
                                    <p class="text-gray-600 mt-1">Montant: ${parseInt(
                                      amount
                                    ).toLocaleString("fr-FR")} Ar</p>
                                    <p class="text-xs text-gray-500">${formattedDate}</p>
                                    <p class="history-copy-msg text-xs text-green-500 hidden">Copied!</p>
                                </div>
                                <div class="flex fs-c-7 w-1/3 justify-around">
                                    <button class="history-call-btn text-gray-500 hover:text-primary whitespace-nowrap !rounded-button">
                                        <div class="w-5 h-5 flex items-center justify-center">
                                            <i class="ri-phone-line"></i>
                                        </div>
                                    </button>
                                    <button class="history-copy-btn text-gray-500 hover:text-primary whitespace-nowrap !rounded-button">
                                        <div class="w-5 h-5 flex items-center justify-center">
                                            <i class="ri-file-copy-line"></i>
                                        </div>
                                    </button>
                                    <button class="remove-btn text-gray-500 hover:text-red-500 whitespace-nowrap !rounded-button"
                                        data-id="${index}">
                                        <div class="w-5 h-5 flex items-center justify-center">
                                            <i class="ri-delete-bin-line"></i>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        `;
        historyList.appendChild(li);
      });

      // Suppression d'un élément
      historyList.querySelectorAll(".remove-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const id = parseInt(this.getAttribute("data-id"));
          let history = JSON.parse(localStorage.getItem("codeHistory") || "[]");
          history.splice(id, 1);
          localStorage.setItem("codeHistory", JSON.stringify(history));
          loadHistory();
        });
      });
    }
  }

  // Clear history
  clearHistoryBtn.addEventListener("click", function () {
    localStorage.removeItem("codeHistory");
    loadHistory();
  });

  // Recherche + Tri
  searchBtn.addEventListener("click", () => loadHistory());
  sortSelect.addEventListener("change", () => loadHistory());
  // <script id="serviceWorkerScript">
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").catch((err) => {
        console.log("ServiceWorker registration failed");
      });
    });
  }
  const swContent = `
                            const CACHE_NAME = 'mvola-code-generator-v1';
                            const urlsToCache = [
                              '/',
                              '/index.html',
                              'https://cdn.tailwindcss.com/3.4.16',
                              'https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.min.css',
                              'https://fonts.googleapis.com/css2?family=Pacifico&display=swap'
                            ];
                            self.addEventListener('install', event => {
                              event.waitUntil(
                                caches.open(CACHE_NAME)
                                  .then(cache => cache.addAll(urlsToCache))
                              );
                            });
                            self.addEventListener('fetch', event => {
                              event.respondWith(
                                caches.match(event.request)
                                  .then(response => response || fetch(event.request))
                              );
                            });
                            `;
  const blob = new Blob([swContent], { type: "application/javascript" });
  const swUrl = URL.createObjectURL(blob);
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register(swUrl).catch(console.error);
  }
}
