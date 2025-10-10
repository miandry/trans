<?php
include __DIR__ . '/../includes/nav.php'; ?>


<main class="pb-4 px-4 flex-1 lg:ml-64">
    <div class="flex items-center justify-between p-4 lg:hidden bg-white shadow-sm hidden">
        <button id="openSidebar" class="text-gray-500 hover:text-gray-700">
            <div class="w-5 h-5 flex items-center justify-center">
                <i class="ri-menu-line"></i>
            </div>
        </button>
        <h1 class="font-['Pacifico'] text-xl text-primary">logo</h1>
        <div class="w-5"></div>
    </div>

    <div class="pt-8 px-4">
        <div class="bg-white rounded-xl shadow-sm p-6 pt-4 mt-2">
            <h2 class="text-xl font-bold text-gray-900 mb-6 text-center">Créer votre compte</h2>
            <form class="space-y-4" id="signupForm">
                <div class="mb-2 hidden" id="signUpErrorMsg">
                    <div class="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded relative text-sm" role="alert">
                        <span class="block sm:inline">Le nom d'utilisateur est déjà utilisé.</span>
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Nom d'utilisateur <span
                            class="text-red-500">*</span></label>
                    <div class="relative">
                        <input type="text" id="username"
                            class="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                            placeholder="Entrez votre nom d'utilisateur" required>
                        <div
                            class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                            <i class="ri-at-line text-gray-400 text-lg"></i>
                        </div>
                    </div>
                    <div class="text-red-500 text-xs mt-1 hidden" id="usernameError">Le nom d'utilisateur doit comporter au moins 3 caractères.</div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">E-mail <span
                            class="text-red-500">*</span></label>
                    <div class="relative">
                        <input type="email" id="email"
                            class="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                            placeholder="Entrez votre e-mail" required>
                        <div
                            class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                            <i class="ri-mail-line text-gray-400 text-lg"></i>
                        </div>
                    </div>
                    <div class="text-red-500 text-xs mt-1 hidden" id="emailError">Veuillez saisir une e-mail valide.
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Mot de passe <span
                            class="text-red-500">*</span></label>
                    <div class="relative">
                        <input type="password" id="password"
                            class="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                            placeholder="Entrez votre mots de passe" required>
                        <button type="button" id="togglePassword"
                            class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center cursor-pointer">
                            <i class="ri-eye-off-line text-gray-400 text-lg"></i>
                        </button>
                    </div>
                    <div class="text-red-500 text-xs mt-1 hidden" id="passwordError">Le mot de passe doit comporter au moins 8 caractères.</div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Confirmer le mot de passe <span
                            class="text-red-500">*</span></label>
                    <div class="relative">
                        <input type="password" id="confirmPassword"
                            class="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                            placeholder="Confirmez votre mot de passe" required>
                        <button type="button" id="toggleConfirmPassword"
                            class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center cursor-pointer">
                            <i class="ri-eye-off-line text-gray-400 text-lg"></i>
                        </button>
                    </div>
                    <div class="text-red-500 text-xs mt-1 hidden" id="confirmPasswordError">Les mots de passe ne correspondent pas.</div>
                </div>

                <div class="flex items-start space-x-3 pt-2">
                    <input type="checkbox" id="terms" class="mt-1 opacity-0 absolute">
                    <div class="relative">
                        <div class="w-5 h-5 border-2 border-gray-300 rounded cursor-pointer flex items-center justify-center"
                            id="termsCheckbox">
                            <i class="ri-check-line text-white text-sm hidden" id="termsCheck"></i>
                        </div>
                    </div>
                    <label for="terms" class="text-sm text-gray-600 cursor-pointer">
                        J'accepte les <a href="#" class="text-primary font-medium">conditions d'utilisation</a> et <a href="#"
                            class="text-primary font-medium">la politique de confidentialité.</a>
                    </label>
                </div>
                <div class="text-red-500 text-xs mt-1 hidden" id="termsError">Veuillez accepter les conditions générales.
                </div>

                <!-- <a href="javascript:void(0)"> -->
                <button type="submit"
                    class="w-full bg-primary text-white py-3 rounded-lg font-medium !rounded-button cursor-pointer hover:bg-indigo-600 transition-colors mt-6">
                    S'inscrire
                </button>
                <!-- </a> -->

                <div class="text-center">
                    <span class="text-gray-600 text-sm">Vous avez déjà un compte ? </span>
                    <a href="javascript:void(0)" @click="page='sign-in'" class="text-primary font-medium text-sm cursor-pointer">Se connecter</a>
                </div>
            </form>
        </div>
    </div>
</main>