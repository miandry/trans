<?php
// Get the page parameter, default to 'home' if not set
$page = isset($_GET['page']) ? $_GET['page'] : 'home';
switch ($page) {
    case '/':
        include 'trans/pages/nouv-transaction.php';
        break;

    case '/home':
        include 'trans/pages/nouv-transaction.php';
        break;

    case 'transactions':
        include 'trans/pages/transactions.php';
        break;

    default:
        include 'trans/pages/nouv-transaction.php';
        break;
}
?>
