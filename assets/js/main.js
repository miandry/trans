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

  (function () {
    alert('jj22')
    /************ Bloquer zoom clavier et roulette ************/
    window.addEventListener(
      "keydown",
      function (e) {
        const isCtrl = e.ctrlKey || e.metaKey;
        if (isCtrl && ["+", "-", "=", "0"].includes(e.key)) {
          e.preventDefault();
        }
        if (["ArrowLeft", "ArrowRight"].includes(e.key)) {
          e.preventDefault();
        }
      },
      { passive: false }
    );

    window.addEventListener(
      "wheel",
      function (e) {
        if (e.ctrlKey || e.metaKey) e.preventDefault();
      },
      { passive: false }
    );

    /************ Bloquer pinch, double-tap et gestures ************/
    let lastTouch = 0;

    window.addEventListener(
      "touchstart",
      function (e) {
        if (e.touches.length > 1) {
          // Plus d’un doigt -> blocage pinch/rotation
          e.preventDefault();
        }
      },
      { passive: false }
    );

    window.addEventListener(
      "touchend",
      function (e) {
        const now = Date.now();
        if (now - lastTouch <= 300) {
          // double-tap détecté
          e.preventDefault();
        }
        lastTouch = now;
      },
      { passive: false }
    );

    window.addEventListener(
      "gesturestart",
      function (e) {
        // iOS Safari
        e.preventDefault();
      },
      { passive: false }
    );

    /************ Sécurité : corps ne dépasse pas viewport ************/
    function clampBodyWidth() {
      document.documentElement.style.overflowX = "hidden";
      document.body.style.overflowX = "hidden";
      document.body.style.maxWidth = "100vw";
    }

    clampBodyWidth();
    window.addEventListener("resize", clampBodyWidth);
  })();
}
