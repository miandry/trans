<!-- include header -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Gestion Ariary</title>
<script src="https://cdn.tailwindcss.com/3.4.16"></script>
<script>
    tailwind.config = {
        theme: {
            extend: {
                colors: { primary: "#4F46E5", secondary: "#8B5CF6" },
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