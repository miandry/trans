<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>Gestion Ariary</title>
    <script src="https://cdn.tailwindcss.com/3.4.16"></script>
    <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: "#4F46E5",
                        secondary: "#8B5CF6"
                    },
                    borderRadius: {
                        none: "0px",
                        sm: "4px",
                        DEFAULT: "8px",
                        md: "12px",
                        lg: "16px",
                        xl: "20px",
                        "2xl": "24px",
                        "3xl": "32px",
                        full: "9999px",
                        button: "8px",
                    },
                    fontFamily: {
                        sans: [
                            'ui-sans-serif',
                            'system-ui',
                            '-apple-system',
                            'BlinkMacSystemFont',
                            'Segoe UI',
                            'Roboto',
                            'Helvetica Neue',
                            'Arial',
                            'Noto Sans',
                            'sans-serif',
                            'Apple Color Emoji',
                            'Segoe UI Emoji',
                            'Segoe UI Symbol',
                            'Noto Color Emoji',
                        ],
                    },
                    fontSize: {
                        xs: ['11px', {
                            lineHeight: '1.25'
                        }], // Super compact
                        sm: ['13px', {
                            lineHeight: '1.35'
                        }], // Default small
                        base: ['14px', {
                            lineHeight: '1.4'
                        }], // Compact normal
                        lg: ['16px', {
                            lineHeight: '1.45'
                        }], // For section titles
                        xl: ['18px', {
                            lineHeight: '1.5'
                        }], // Headings
                        '2xl': ['20px', {
                            lineHeight: '1.5'
                        }],
                        '3xl': ['24px', {
                            lineHeight: '1.4'
                        }],
                    },
                    letterSpacing: {
                        tightest: '-0.02em',
                        tighter: '-0.015em',
                    },
                },
            },
        };
    </script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.min.css" />

    <style>
        :where([class^="ri-"])::before {
            content: "\f3c2";
        }

        body {
            font-family: 'Poppins', sans-serif;
            background-color: #f9fafb;
            /* font-size: 0.875rem; */
        }

        html,
        body {
            touch-action: pan-x pan-y;
            /* scroll normal mais pas pinch/zoom */
            overscroll-behavior: contain;
            /* empêche le bounce sur mobile si besoin */
            max-width: 100vw;
            overflow-x: hidden;
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        input[type=number] {
            -moz-appearance: textfield;
        }

        .transaction-item {
            animation: slideIn 0.3s ease-out;
        }

        .scrollBar-container {
            scrollbar-width: none;
            -ms-overflow-style: none;
        }

        .filter-panel {
            transform: translateY(-100%);
            transition: transform 0.3s ease-in-out;
        }

        .filter-panel.active {
            transform: translateY(0);
        }

        .transaction-row {
            transition: all 0.2s ease;
        }

        .transaction-row:hover {
            background-color: #f8fafc;
        }

        .sort-indicator {
            transition: transform 0.2s ease;
        }

        .sort-asc {
            transform: rotate(0deg);
        }

        .sort-desc {
            transform: rotate(180deg);
        }

        .fs-c-7 {
            font-size: 0.7rem;
        }

        .z-c-99 {
            z-index: 99999 !important;
        }

        .menu-section button.active i.ri-arrow-down-s-line {
            transform: rotate(180deg);
        }

        .submenu {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease-in-out;
        }

        .submenu.active {
            max-height: 200px;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .pulse {
            animation: pulse 0.5s ease-out;
        }

        @keyframes pulse {
            0% {
                transform: scale(1);
            }

            50% {
                transform: scale(1.05);
            }

            100% {
                transform: scale(1);
            }
        }
    </style>
    <!-- include api url script -->
</head>

<body class="bg-gray-50 min-h-screen relative">
    <div id="app">
        <template v-if="isReady">
            <div v-if="!isLoggedIn">
                <div v-if="page === 'sign-in'">
                    <?php
                    include 'trans/views/sign_in.php'; ?>
                </div>
                <div v-if="page === 'sign-up'">
                    <?php
                    include 'trans/views/sign_up.php'; ?>
                </div>
            </div>
            <div v-else>
                <div v-if="page === 'add-transaction'">
                    <?php
                    include 'trans/views/add_transaction.php'; ?>
                </div>
                <div v-if="page === 'add-multi-transaction'">
                    <?php
                    include 'trans/views/add_multiple_transaction.php'; ?>
                </div>
                <div v-if="page === 'transaction-history'">
                    <?php
                    include 'trans/views/transaction_history.php'; ?>
                </div>
                <div v-if="page === 'add-client'">
                    <?php
                    include 'trans/views/add_client.php'; ?>
                </div>
                <div v-if="page === 'add-exchange'">
                    <?php
                    include 'trans/views/add_exchange.php'; ?>
                </div>
                <div v-if="page === 'add-category'">
                    <?php
                    include 'trans/views/add_category.php'; ?>
                </div>
                <div v-if="page === 'add-report'">
                    <?php
                    include 'trans/views/add_report.php'; ?>
                </div>
                <div v-if="page === 'compta'">
                    <?php
                    include 'trans/views/compta.php'; ?>
                </div>
                <div v-if="page === 'transfert'">
                    <?php
                    include 'trans/views/transfert.php'; ?>
                </div>
                <div v-if="page === 'transfert-history'">
                    <?php
                    include 'trans/views/transfert_history.php'; ?>
                </div>
                <div v-if="page === 'withdraw'">
                    <?php
                    include 'trans/views/withdraw.php'; ?>
                </div>
                <div v-if="page === 'withdraw-history'">
                    <?php
                    include 'trans/views/withdraw_history.php'; ?>
                </div>
            </div>
        </template>
    </div>
    <script src="/trans/assets/js/main.js"></script>

    <script>
        const {
            createApp
        } = Vue;

        window.app = createApp({
            data() {
                return {
                    page: 'sign-in',
                    history: [],
                    isLoggedIn: false,
                    isReady: false,
                };
            },
            created() {
                // Vérifier si l'utilisateur est connecté
                const userStr = sessionStorage.getItem("user");
                if (userStr) {
                    this.isLoggedIn = true;
                }

                // Récupérer la dernière page visitée
                const savedPage = sessionStorage.getItem("currentPage");
                if (savedPage) {
                    this.page = savedPage;
                } else {
                    this.page = this.isLoggedIn ? "add-transaction" : "sign-in";
                }

                this.isReady = true;
            },
            mounted() {
                const pagesToLoad = [
                    'add-report',
                    'compta',
                    'withdraw'
                ];

                if (!pagesToLoad.includes(this.page)) {
                    this.loadFor(this.page);
                }
                if (typeof initMain === "function") {
                    initMain();
                }
            },
            watch: {
                page(newPage, oldPage) {
                    if (oldPage && oldPage !== newPage) {
                        this.history.push(oldPage);
                    }
                    // Sauvegarder la page actuelle pour persistance
                    sessionStorage.setItem("currentPage", newPage);

                    this.$nextTick(() => {
                        this.loadFor(newPage);
                        if (typeof initMain === "function") {
                            initMain();
                        }
                    });
                }
            },
            methods: {
                goBack() {
                    if (this.history.length > 0) {
                        this.page = this.history.pop();
                        sessionStorage.setItem("currentPage", this.page); // mettre à jour la page courante
                    }
                },
                loadFor(page) {
                    const map = {
                        'sign-in': {
                            src: '/trans/assets/js/auth/sign-in.js',
                            init: 'initSignInPage'
                        },
                        'sign-up': {
                            src: '/trans/assets/js/auth/sign-up.js',
                            init: 'initSignUpPage'
                        },
                        'add-transaction': {
                            src: '/trans/assets/js/transaction/add.js',
                            init: 'initAddTransactionPage'
                        },
                        'add-multi-transaction': {
                            src: '/trans/assets/js/transaction/add-multi.js',
                            init: 'initAddMultiTransactionPage'
                        },
                        'transaction-history': {
                            src: '/trans/assets/js/transaction/transaction-history.js',
                            init: 'initHistoryTransactionPage'
                        },
                        'add-client': {
                            src: '/trans/assets/js/client/add.js',
                            init: 'initAddClientPage'
                        },
                        'add-exchange': {
                            src: '/trans/assets/js/exchange/add.js',
                            init: 'initAddExchangePage'
                        },
                        'add-category': {
                            src: '/trans/assets/js/category/add.js',
                            init: 'initAddCategoryPage'
                        },
                        'add-report': {
                            src: '/trans/assets/js/report/add.js',
                            init: 'initAddReportPage'
                        },
                        'compta': {
                            src: '/trans/assets/js/compta/add.js',
                            init: 'initComptaPage'
                        },
                        'transfert': {
                            src: '/trans/assets/js/transfert/add.js',
                            init: 'initTransfertPage'
                        },
                        'transfert-history': {
                            src: '/trans/assets/js/transfert/list.js',
                            init: 'initTransfertListPage'
                        },
                        'withdraw': {
                            src: '/trans/assets/js/withdraw/add.js',
                            init: 'initWithdrawPage'
                        },
                        'withdraw-history': {
                            src: '/trans/assets/js/withdraw/list.js',
                            init: 'initWithdrawListPage'
                        },
                    };

                    const config = map[page];
                    if (!config) return;

                    // Supprimer les anciens scripts dynamiques
                    document.querySelectorAll('script[data-page-script]').forEach(s => s.remove());

                    const script = document.createElement('script');
                    script.src = config.src;
                    script.defer = true;
                    script.setAttribute('data-page-script', page);

                    script.onload = () => {
                        if (typeof window[config.init] === "function") {
                            window[config.init]();
                        }
                        app.$nextTick(() => {
                            if (typeof initMain === "function") {
                                initMain();
                            }
                        });
                    };

                    document.body.appendChild(script);
                }
            }
        }).mount('#app');
    </script>
</body>

</html>