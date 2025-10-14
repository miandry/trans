function initMain() {
  // Mobile sidebar script
  const sidebar = document.querySelector("aside");
  const openSidebarBtn = document.getElementById("openSidebar");
  const asideMenu = document.getElementById("asideMenu");
  const closeSidebarBtn = document.getElementById("closeSidebar");
  function openSidebar() {
    sidebar.classList.remove("-translate-x-full");
    document.body.style.overflow = "hidden";
  }
  function closeSidebar() {
    sidebar.classList.add("-translate-x-full");
    document.body.style.overflow = "";
  }
  openSidebarBtn.addEventListener("click", openSidebar);
  closeSidebarBtn.addEventListener("click", closeSidebar);
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 1024) {
        closeSidebar();
      }
    });
  });
  // Handle window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) {
      closeSidebar();
    }
  });

  // LOGOUT BTN
  const logoutButton = document.getElementById("logoutButton");

  if (!sessionStorage.getItem("user")) {
    logoutButton.classList.add("hidden");
    openSidebarBtn.classList.add("hidden");
    asideMenu.classList.add("hidden");
  } else {
    logoutButton.classList.remove("hidden");
    openSidebarBtn.classList.remove("hidden");
    asideMenu.classList.remove("hidden");
  }

  if (logoutButton && !logoutButton.dataset.bound) {
    logoutButton.addEventListener("click", handleLogout);
    logoutButton.dataset.bound = "true";
  }

  function handleLogout() {
    // empêcher plusieurs popups
    if (document.getElementById("logoutConfirmDialog")) return;

    const confirmDialog = document.createElement("div");
    confirmDialog.id = "logoutConfirmDialog";
    confirmDialog.className =
      "fixed inset-0 z-50 flex items-center justify-center";
    confirmDialog.innerHTML = `
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      <div class="relative bg-white rounded-xl p-6 w-80 space-y-4">
        <h3 class="text-lg font-medium text-gray-900">Confirmer la déconnexion</h3>
        <p class="text-gray-600">Êtes-vous sûr de vouloir vous déconnecter ?</p>
        <div class="flex space-x-3 fs-c-7">
          <button id="cancelLogout" class="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium">Anuller</button>
          <button id="confirmLogout" class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium">Se déconnecter</button>
        </div>
      </div>
    `;
    document.body.appendChild(confirmDialog);

    document.getElementById("cancelLogout").addEventListener("click", () => {
      confirmDialog.remove();
    });
    document.getElementById("confirmLogout").addEventListener("click", () => {
      confirmDialog.remove();
      sessionStorage.removeItem("user");
      window.app.isLoggedIn = false;
      window.app.page = "sign-in";
    });
    confirmDialog.querySelector(".bg-black").addEventListener("click", () => {
      confirmDialog.remove();
    });
  }

  // ACCORDION MENU

  const menuSections = document.querySelectorAll(".menu-section");
  menuSections.forEach((section) => {
    const button = section.querySelector("button");
    const submenu = section.querySelector(".submenu");
    const arrow = button.querySelector(".ri-arrow-down-s-line");

    // vérifier si déjà attaché
    if (button.dataset.accordionBound) return;

    button.addEventListener("click", () => {
      const isActive = button.classList.contains("active");

      menuSections.forEach((otherSection) => {
        if (otherSection !== section) {
          otherSection.querySelector("button").classList.remove("active");
          otherSection.querySelector(".submenu").classList.remove("active");
          otherSection.querySelector(".ri-arrow-down-s-line").style.transform =
            "rotate(0deg)";
        }
      });

      button.classList.toggle("active");
      submenu.classList.toggle("active");
      arrow.style.transform = button.classList.contains("active")
        ? "rotate(180deg)"
        : "rotate(0deg)";
    });

    button.dataset.accordionBound = "true";
  });

  /****************************************************************
   * 1) Bloquer ctrl/cmd + plus/minus/0 et roulette avec ctrl
   ****************************************************************/
  window.addEventListener(
    "keydown",
    function (e) {
      // e.key: "=", "-", "0", "+"; on checke aussi e.code
      const isCtrl = e.ctrlKey || e.metaKey; // ctrl (Windows) ou cmd (Mac)
      if (isCtrl) {
        // Bloquer +, -, =, 0 (différentes claviers peuvent envoyer "=" pour +)
        if (e.key === "+" || e.key === "-" || e.key === "=" || e.key === "0") {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
        // Bloquer Ctrl + Mousewheel is handled in wheel listener below
      }
    },
    { passive: false }
  );

  // Bloquer la roulette quand ctrl/cmd est pressé
  window.addEventListener(
    "wheel",
    function (e) {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    },
    { passive: false }
  );

  /****************************************************************
   * 2) Empêcher le pinch-zoom sur mobile / iOS / Android
   *    - "gesturestart" est iOS Safari specific
   *    - On empêche le double-tap zoom et le pinch en interceptant touch events
   ****************************************************************/
  // iOS Safari: gesturestart
  window.addEventListener(
    "gesturestart",
    function (e) {
      e.preventDefault();
    },
    { passive: false }
  );

  // Empêcher le double tap zoom (trick: bloquer double tap rapid)
  (function () {
    let lastTouch = 0;
    window.addEventListener(
      "touchend",
      function (e) {
        const now = Date.now();
        if (now - lastTouch <= 300) {
          // double-tap détecté -> empêcher
          e.preventDefault();
        }
        lastTouch = now;
      },
      { passive: false }
    );
  })();

  // Empêcher pinch (deux doigts) — on peut repérer touchmove avec 2 touches
  window.addEventListener(
    "touchmove",
    function (e) {
      if (e.touches && e.touches.length > 1) {
        // si plus d'un doigt, c'est probablement un pinch ou rotation -> bloquer
        e.preventDefault();
      } else {
        // possibilité de bloquer le défilement horizontal: regarder le déplacement X vs Y
        // si vous voulez empêcher tout mouvement horizontal sur un touch simple, décommentez ci-dessous.
        //
        // const touch = e.touches[0];
        // // besoin de logique additionnelle pour déterminer dx/dy — laissé simple ici
      }
    },
    { passive: false }
  );

  /****************************************************************
   * 3) Optionnel : Empêcher scroll horizontal par clavier (flèche gauche/droite, space)
   ****************************************************************/
  window.addEventListener(
    "keydown",
    function (e) {
      // Flèches gauche/droite, Home, End, PageUp/PageDown, espace (parfois) provoquent déplacement
      const blockedKeys = ["ArrowLeft", "ArrowRight"];
      if (blockedKeys.includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    },
    { passive: false }
  );

  /****************************************************************
   * 4) Sécurité : s'assurer que body ne dépasse pas largeur viewport
   ****************************************************************/
  function clampBodyWidth() {
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
    document.body.style.maxWidth = "100vw";
  }
  // initial + on resize
  clampBodyWidth();
  window.addEventListener("resize", clampBodyWidth);
}
