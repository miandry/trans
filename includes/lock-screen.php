<script id="mobileSidebarScript">
    document.addEventListener("DOMContentLoaded", function () {
        const sidebar = document.querySelector("aside");
        const openSidebarBtn = document.getElementById("openSidebar");
        const closeSidebarBtn = document.getElementById("closeSidebar");
        const overlay = document.getElementById("overlay");
        function openSidebar() {
            sidebar.classList.remove("-translate-x-full");
            overlay.classList.remove("hidden");
            document.body.style.overflow = "hidden";
        }
        function closeSidebar() {
            sidebar.classList.add("-translate-x-full");
            overlay.classList.add("hidden");
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
    });
</script>
  
  <script>
    /****************************************************************
     * 1) Bloquer ctrl/cmd + plus/minus/0 et roulette avec ctrl
     ****************************************************************/
    window.addEventListener('keydown', function(e) {
      // e.key: "=", "-", "0", "+"; on checke aussi e.code
      const isCtrl = e.ctrlKey || e.metaKey; // ctrl (Windows) ou cmd (Mac)
      if (isCtrl) {
        // Bloquer +, -, =, 0 (différentes claviers peuvent envoyer "=" pour +)
        if (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0') {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
        // Bloquer Ctrl + Mousewheel is handled in wheel listener below
      }
    }, { passive: false });

    // Bloquer la roulette quand ctrl/cmd est pressé
    window.addEventListener('wheel', function(e) {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }, { passive: false });

    /****************************************************************
     * 2) Empêcher le pinch-zoom sur mobile / iOS / Android
     *    - "gesturestart" est iOS Safari specific
     *    - On empêche le double-tap zoom et le pinch en interceptant touch events
     ****************************************************************/
    // iOS Safari: gesturestart
    window.addEventListener('gesturestart', function(e) {
      e.preventDefault();
    }, { passive: false });

    // Empêcher le double tap zoom (trick: bloquer double tap rapid)
    (function() {
      let lastTouch = 0;
      window.addEventListener('touchend', function(e) {
        const now = Date.now();
        if (now - lastTouch <= 300) {
          // double-tap détecté -> empêcher
          e.preventDefault();
        }
        lastTouch = now;
      }, { passive: false });
    })();

    // Empêcher pinch (deux doigts) — on peut repérer touchmove avec 2 touches
    window.addEventListener('touchmove', function(e) {
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
    }, { passive: false });

    /****************************************************************
     * 3) Optionnel : Empêcher scroll horizontal par clavier (flèche gauche/droite, space)
     ****************************************************************/
    window.addEventListener('keydown', function(e) {
      // Flèches gauche/droite, Home, End, PageUp/PageDown, espace (parfois) provoquent déplacement
      const blockedKeys = ['ArrowLeft', 'ArrowRight'];
      if (blockedKeys.includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }, { passive: false });

    /****************************************************************
     * 4) Sécurité : s'assurer que body ne dépasse pas largeur viewport
     ****************************************************************/
    function clampBodyWidth() {
      document.documentElement.style.overflowX = 'hidden';
      document.body.style.overflowX = 'hidden';
      document.body.style.maxWidth = '100vw';
    }
    // initial + on resize
    clampBodyWidth();
    window.addEventListener('resize', clampBodyWidth);
  </script>