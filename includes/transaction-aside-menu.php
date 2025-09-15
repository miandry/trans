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
                <a href="#"
                    class="flex items-center space-x-3 p-2 rounded-button text-gray-700 hover:bg-primary/5 hover:text-primary hidden">
                    <div class="w-5 h-5 flex items-center justify-center">
                        <i class="ri-home-line"></i>
                    </div>
                    <span>Dashboard</span>
                </a>
            </li>
            <li>
                <a href="/gestion/clients"
                       class="flex items-center space-x-3 p-2 rounded-button 
                      {{ current_url() == 'node/238' 
                          ? 'bg-primary/5 text-primary' 
                          : 'text-gray-700 hover:bg-primary/5 hover:text-primary' }}">
                    <div class="w-5 h-5 flex items-center justify-center">
                        <i class="ri-user-line"></i>
                    </div>
                    <span>Client</span>
                </a>
            </li>
            <li>
                <a href="/gestion/categories"
                       class="flex items-center space-x-3 p-2 rounded-button 
                      {{ current_url() == 'node/55' 
                          ? 'bg-primary/5 text-primary' 
                          : 'text-gray-700 hover:bg-primary/5 hover:text-primary' }}">
                    <div class="w-5 h-5 flex items-center justify-center">
                        <i class="ri-bookmark-line"></i>
                    </div>
                    <span>Catégories</span>
                </a>
            </li>
            <li>
                <a href="/gestion/transaction"
                       class="flex items-center space-x-3 p-2 rounded-button 
                        {{ current_url() == 'node/53' 
                      ? 'bg-primary/5 text-primary' 
                      : 'text-gray-700 hover:bg-primary/5 hover:text-primary' }}">
                    
                    <div class="w-5 h-5 flex items-center justify-center">
                        <i class="ri-bank-card-line"></i>
                    </div>
                    <span>Nouv Transaction</span>
                </a>
            </li>
            <li>
                <a href="/gestion/multiple-transactions"
                       class="flex items-center space-x-3 p-2 rounded-button 
                      {{ current_url() == 'node/275' 
                          ? 'bg-primary/5 text-primary' 
                          : 'text-gray-700 hover:bg-primary/5 hover:text-primary' }}">
                    <div class="w-5 h-5 flex items-center justify-center">
                        <i class="ri-bank-card-line"></i>
                    </div>
                    <span>Ajout multi tran.</span>
                </a>
            </li>
            <li>
                <a href="trans.php?page=transactions"
                       class="flex items-center space-x-3 p-2 rounded-button 
                      {{ current_url() == 'node/60' 
                          ? 'bg-primary/5 text-primary' 
                          : 'text-gray-700 hover:bg-primary/5 hover:text-primary' }}">
                    <div class="w-5 h-5 flex items-center justify-center">
                        <i class="ri-history-line"></i>
                    </div>
                    <span>Transactions</span>
                </a>
            </li>
        </ul>
    </nav>
</aside>