<!-- loader -->
<div id="page-loader" class="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm hidden"
    style="z-index: 999;">
    <div class="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
</div>
<aside
    class="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 overflow-y-auto -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out z-10">
    <div class="p-4 border-b flex justify-between items-center">
        <h1 class="font-['Pacifico'] text-xl text-primary">logo</h1>
        <button id="closeSidebar" class="lg:hidden text-gray-500 hover:text-gray-700">
            <div class="w-5 h-5 flex items-center justify-center">
                <i class="ri-close-line"></i>
            </div>
        </button>
    </div>
    <nav class="p-4">
        <ul class="space-y-2">
            <li>
                <a href="javascript:void(0)" @click="page='add-client'"
                    :class="[
                                'flex items-center space-x-3 p-2 rounded-button',
                                page === 'add-client' ? 'bg-primary/5 text-primary' : 'text-gray-700 hover:bg-primary/5 hover:text-primary'
                            ]">
                    <div class="w-5 h-5 flex items-center justify-center">
                        <i class="ri-user-line"></i>
                    </div>
                    <span>Client</span>
                </a>
            </li>
            <li>
                <a href="javascript:void(0)" @click="page='add-exchange'"
                    :class="[
                                'flex items-center space-x-3 p-2 rounded-button',
                                page === 'add-exchange' ? 'bg-primary/5 text-primary' : 'text-gray-700 hover:bg-primary/5 hover:text-primary'
                            ]">
                    <div class="w-5 h-5 flex items-center justify-center">
                        <i class="ri-exchange-line"></i>
                    </div>
                    <span>Cours d’échange</span>
                </a>
            </li>
            <li>
                <a href="javascript:void(0)" @click="page='add-category'"
                    :class="[
                                'flex items-center space-x-3 p-2 rounded-button',
                                page === 'add-category' ? 'bg-primary/5 text-primary' : 'text-gray-700 hover:bg-primary/5 hover:text-primary'
                            ]">
                    <div class="w-5 h-5 flex items-center justify-center">
                        <i class="ri-bookmark-line"></i>
                    </div>
                    <span>Catégories</span>
                </a>
            </li>

            <div class="menu-section">
                <button class="w-full flex items-center justify-between p-2 rounded-button cursor-pointer"
                    :class="{'active': page === 'add-transaction' || page === 'add-multi-transaction' || page === 'transaction-history'}">
                    <div class="flex items-center text-gray-700">
                        <div class="w-5 h-5 flex items-center justify-center">
                            <i class="ri-bank-card-line"></i>
                        </div>
                        <span class="ml-3">Transactions</span>
                    </div>
                    <i class="ri-arrow-down-s-line transition-transform"></i>
                </button>
                <div class="submenu pl-4" :class="{'active': page === 'add-transaction' || page === 'add-multi-transaction' || page === 'transaction-history'}">
                    <a href="javascript:void(0)" @click="page='add-transaction'"
                        :class="[
                                'flex items-center space-x-3 p-2 rounded-button',
                                page === 'add-transaction' ? 'bg-primary/5 text-primary' : 'text-gray-700 hover:bg-primary/5 hover:text-primary'
                            ]">
                        Ajout Nouv.</a>
                    <a href="javascript:void(0)" @click="page='add-multi-transaction'"
                        :class="[
                                'flex items-center space-x-3 p-2 rounded-button',
                                page === 'add-multi-transaction' ? 'bg-primary/5 text-primary' : 'text-gray-700 hover:bg-primary/5 hover:text-primary'
                            ]">
                        Ajout multi tran.</a>
                    <a href="javascript:void(0)" @click="page='transaction-history'"
                        :class="[
                                'flex items-center space-x-3 p-2 rounded-button',
                                page === 'transaction-history' ? 'bg-primary/5 text-primary' : 'text-gray-700 hover:bg-primary/5 hover:text-primary'
                            ]">
                        Historiques</a>
                </div>
            </div>
            <div class="menu-section">
                <button class="w-full flex items-center justify-between p-2 rounded-button cursor-pointer"
                    :class="{'active': page === 'add-transaction' || page === 'add-multi-transaction' || page === 'transaction-history'}">
                    <div class="flex items-center text-gray-700">
                        <div class="w-5 h-5 flex items-center justify-center">
                            <i class="ri-money-dollar-circle-line"></i>
                        </div>
                        <span class="ml-3">Mvola</span>
                    </div>
                    <i class="ri-arrow-down-s-line transition-transform"></i>
                </button>
                <div class="submenu pl-4"
                    :class="{'active': page === 'transfert' || page === 'transfert-history' || page === 'withdraw-history' || page === 'withdraw'}">
                    <a href="javascript:void(0)" @click="page='transfert'"
                        :class="[
                                'flex items-center space-x-3 p-2 rounded-button',
                                page === 'transfert' ? 'bg-primary/5 text-primary' : 'text-gray-700 hover:bg-primary/5 hover:text-primary'
                            ]">
                        Transfert</a>
                    <a href="javascript:void(0)" @click="page='transfert-history'"
                        :class="[
                                'flex items-center space-x-3 p-2 rounded-button',
                                page === 'transfert-history' ? 'bg-primary/5 text-primary' : 'text-gray-700 hover:bg-primary/5 hover:text-primary'
                            ]">
                        Histo des trans</a>
                    <a href="javascript:void(0)" @click="page='withdraw'"
                        :class="[
                                'flex items-center space-x-3 p-2 rounded-button',
                                page === 'withdraw' ? 'bg-primary/5 text-primary' : 'text-gray-700 hover:bg-primary/5 hover:text-primary'
                            ]">
                        Retrait</a>
                    <a href="javascript:void(0)" @click="page='withdraw-history'"
                        :class="[
                                'flex items-center space-x-3 p-2 rounded-button',
                                page === 'withdraw-history' ? 'bg-primary/5 text-primary' : 'text-gray-700 hover:bg-primary/5 hover:text-primary'
                            ]">
                        Histo des retraits</a>
                </div>
            </div>
            <li>
                <a href="javascript:void(0)" @click="page='compta'"
                    :class="[
                                'flex items-center space-x-3 p-2 rounded-button',
                                page === 'compta' ? 'bg-primary/5 text-primary' : 'text-gray-700 hover:bg-primary/5 hover:text-primary'
                            ]">
                    <div class="w-5 h-5 flex items-center justify-center">
                        <i class="ri-calculator-line"></i>
                    </div>
                    <span>Compta</span>
                </a>
            </li>
            <li>
                <a href="javascript:void(0)" @click="page='add-report'"
                    :class="[
                                'flex items-center space-x-3 p-2 rounded-button',
                                page === 'add-report' ? 'bg-primary/5 text-primary' : 'text-gray-700 hover:bg-primary/5 hover:text-primary'
                            ]">
                    <div class="w-5 h-5 flex items-center justify-center">
                        <i class="ri-file-list-2-line"></i>
                    </div>
                    <span>Rapports</span>
                </a>
            </li>
            <div class="border-t border-gray-200 mt-4 pt-4">
                <a href="javascript:void(0);"
                    class="flex items-center px-2 py-3 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                    id="logoutButton">
                    <div class="w-5 h-5 flex items-center justify-center mr-3">
                        <i class="ri-logout-box-line text-red-600"></i>
                    </div>
                    <span>Se déconnecter</span>
                </a>
            </div>
        </ul>
    </nav>
</aside>