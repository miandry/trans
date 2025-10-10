function initWithdrawPage() {
  // <script id="phoneValidationScript">
  const phoneInput = document.getElementById("phone");
  const phoneError = document.getElementById("phoneError");
  phoneInput.addEventListener("input", function (e) {
    // Remove non-numeric characters
    let value = e.target.value.replace(/\D/g, "");
    // Limit to 15 digits (international standard)
    if (value.length > 15) {
      value = value.substring(0, 15);
    }
    e.target.value = value;
    // Validate phone number (simple validation - just checking if it's not empty)
    if (value.length < 8) {
      phoneError.classList.remove("hidden");
    } else {
      phoneError.classList.add("hidden");
    }
  });

  // <script id="amountFormattingScript">
  const amountInput = document.getElementById("amount");
  const amountError = document.getElementById("amountError");
  amountInput.addEventListener("input", function (e) {
    // Remove all non-numeric characters
    let value = e.target.value.replace(/[^\d]/g, "");
    if (value) {
      // Format with thousand separators
      const formattedValue = Number(value)
        .toLocaleString("en-US")
        .replace(/,/g, " ");
      e.target.value = formattedValue + " Ar";
    } else {
      e.target.value = "";
    }
    // Validate amount (simple validation - just checking if it's not empty)
    if (!value) {
      amountError.classList.remove("hidden");
    } else {
      amountError.classList.add("hidden");
    }
  });
  // Handle focus to position cursor correctly
  amountInput.addEventListener("focus", function (e) {
    if (e.target.value) {
      // Move cursor to the beginning of the input
      setTimeout(() => {
        e.target.selectionStart = 0;
        e.target.selectionEnd = 0;
      }, 0);
    }
  });

  // <script id="codeGenerationScript">
  const resultInput = document.getElementById("result");
  const generateBtn = document.getElementById("generateBtn");
  const clearBtn = document.getElementById("clearBtn");
  const callBtn = document.getElementById("callBtn");
  const mvolaTypeSelect = document.getElementById("mvolaType");
  mvolaTypeSelect.addEventListener("change", function () {
    phoneInput.value = "";
    amountInput.value = "";
    resultInput.value = "";
    phoneError.classList.add("hidden");
    amountError.classList.add("hidden");
    document.getElementById("copyMessage").classList.add("hidden");
  });
  callBtn.addEventListener("click", function () {
    const phone = phoneInput.value.trim();
    if (phone) {
      window.location.href = `tel:${phone}`;
    }
  });
  generateBtn.addEventListener("click", function () {
    // Get values
    const phone = phoneInput.value.trim();
    const amountWithCurrency = amountInput.value.trim();
    const mvolaType = document.getElementById("mvolaType").value;
    // Extract numeric amount
    const amount = amountWithCurrency.replace(/\D/g, "");
    // Validate inputs
    let isValid = true;
    if (phone.length < 8) {
      phoneError.classList.remove("hidden");
      isValid = false;
    } else {
      phoneError.classList.add("hidden");
    }
    if (!amount) {
      amountError.classList.remove("hidden");
      isValid = false;
    } else {
      amountError.classList.add("hidden");
    }
    if (isValid) {
      // Generate code based on Mvola type
      let generatedCode;
      generatedCode = `#111*1*4*1*${phone}*${amount}#`;
      // Check for duplicates in history
      const history = JSON.parse(localStorage.getItem("codeRetrait") || "[]");
      const isDuplicate = history.some((item) => {
        return item.code === generatedCode;
      });
      const duplicatePhone = history.some((item) => {
        const itemCode = item.code;
        const [itemPhone] = itemCode.match(/\*(\d{7,15})\*(\d+)#$/)[1];
        return itemPhone === phone;
      });
      if (isDuplicate || duplicatePhone) {
        const warningDialog = document.createElement("div");
        warningDialog.className =
          "fixed inset-0 flex items-center justify-center z-50";
        warningDialog.innerHTML = `
    <div class="fixed inset-0 bg-black/50"></div>
    <div class="bg-white rounded-lg p-6 max-w-sm mx-4 relative z-10">
    <h3 class="text-lg font-medium text-gray-900 mb-4">Warning</h3>
    <p class="text-gray-600 mb-6">${
      isDuplicate
        ? "This phone number and amount combination has already been used."
        : "This phone number has been used before. Are you sure you want to continue?"
    }</p>
    <div class="flex gap-3">
    ${
      duplicatePhone && !isDuplicate
        ? `
    <button class="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-button" onclick="this.closest('.fixed').remove()">Cancel</button>
    <button class="flex-1 bg-primary text-white px-4 py-2 rounded-button" onclick="generateCodeForDuplicatePhone(this)">Continue</button>
    `
        : `
    <button class="w-full bg-primary text-white px-4 py-2 rounded-button" onclick="this.closest('.fixed').remove()">OK</button>
    `
    }
    </div>
    </div>
    `;
        document.body.appendChild(warningDialog);
        if (!isDuplicate) {
          window.generateCodeForDuplicatePhone = function (btn) {
            resultInput.value = generatedCode;
            addToHistory(generatedCode);
            document.getElementById("copyBtn").classList.remove("hidden");
            btn.closest(".fixed").remove();
          };
        }
      } else {
        resultInput.value = generatedCode;
        // Add to history
        addToHistory(generatedCode);
        // Show copy button
        document.getElementById("copyBtn").classList.remove("hidden");
      }
    }
  });
  const clearPhoneBtn = document.createElement("button");
  clearPhoneBtn.type = "button";
  clearPhoneBtn.className =
    "absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600";
  clearPhoneBtn.innerHTML =
    '<div class="w-5 h-5 flex items-center justify-center"><i class="ri-close-line"></i></div>';
  phoneInput.parentElement.appendChild(clearPhoneBtn);
  const clearAmountBtn = document.createElement("button");
  clearAmountBtn.type = "button";
  clearAmountBtn.className =
    "absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600";
  clearAmountBtn.innerHTML =
    '<div class="w-5 h-5 flex items-center justify-center"><i class="ri-close-line"></i></div>';
  amountInput.parentElement.appendChild(clearAmountBtn);
  clearPhoneBtn.addEventListener("click", function () {
    phoneInput.value = "";
    phoneError.classList.add("hidden");
    resultInput.value = "";
    document.getElementById("copyMessage").classList.add("hidden");
  });
  clearAmountBtn.addEventListener("click", function () {
    amountInput.value = "";
    amountError.classList.add("hidden");
    resultInput.value = "";
    document.getElementById("copyMessage").classList.add("hidden");
  });
  clearBtn.addEventListener("click", function () {
    phoneInput.value = "";
    amountInput.value = "";
    resultInput.value = "";
    phoneError.classList.add("hidden");
    amountError.classList.add("hidden");
    document.getElementById("copyMessage").classList.add("hidden");
  });

  // <script id="clipboardScript">
  const copyBtn = document.getElementById("copyBtn");
  const copyMessage = document.getElementById("copyMessage");
  copyBtn.addEventListener("click", function () {
    if (resultInput.value) {
      // Copy to clipboard
      resultInput.select();
      document.execCommand("copy");
      // Show copy message
      copyMessage.classList.remove("hidden");
      // Hide message after 2 seconds
      setTimeout(() => {
        copyMessage.classList.add("hidden");
      }, 2000);
    }
  });
  // Add event listener for history copy and call buttons
  document.addEventListener("click", function (e) {
    if (e.target.closest(".history-copy-btn")) {
      const codeElement = e.target.closest("li").querySelector(".history-code");
      const code = codeElement.textContent;
      // Create temporary textarea to copy text
      const textarea = document.createElement("textarea");
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      // Show temporary copy message
      const copyMsg = e.target.closest("li").querySelector(".history-copy-msg");
      copyMsg.classList.remove("hidden");
      setTimeout(() => {
        copyMsg.classList.add("hidden");
      }, 2000);
    }
    if (e.target.closest(".history-call-btn")) {
      const codeElement = e.target.closest("li").querySelector(".history-code");
      const code = codeElement.textContent;
      const historyItem = e.target.closest("li");
      const statusElement = historyItem.querySelector(".payment-status");
      if (!statusElement) {
        const status = document.createElement("span");
        status.className =
          "payment-status text-xs font-medium text-green-500 ml-2";
        status.textContent = "Paid";
        historyItem.querySelector(".history-code").appendChild(status);
        const history = JSON.parse(localStorage.getItem("codeRetrait") || "[]");
        const itemIndex = Array.from(historyList.children).indexOf(historyItem);
        if (history[itemIndex]) {
          history[itemIndex].paid = true;
          localStorage.setItem("codeRetrait", JSON.stringify(history));
        }
      }
      let calling = code.trim();
      let encodedCalling = encodeURIComponent(calling);
      window.location.href = `tel:${encodedCalling}`;
    }
  });

  const historyList = document.getElementById("historyList");
  const emptyHistory = document.getElementById("emptyHistory");
  const clearHistoryBtn = document.getElementById("clearHistoryBtn");
  const historyContainer = document.getElementById("historyContainer");
  // Load history from localStorage
  loadHistory();
  // Add to history function
  window.addToHistory = function (code) {
    const history = JSON.parse(localStorage.getItem("codeRetrait") || "[]");
    // Add new entry with timestamp
    const newEntry = {
      code: code,
      timestamp: new Date().toISOString(),
    };
    // Add to beginning of array
    history.unshift(newEntry);
    // Limit to 10 entries
    if (history.length > 10) {
      history.pop();
    }
    // Save to localStorage
    localStorage.setItem("codeRetrait", JSON.stringify(history));
    // Update UI
    loadHistory();
  };
  // Load history function
  function loadHistory() {
    const history = JSON.parse(localStorage.getItem("codeRetrait") || "[]");
    // Clear current list
    historyList.innerHTML = "";
    let totalAmount = 0;
    // Calculate total amount from all history items
    history.forEach((item) => {
      const amount = parseInt(item.code.match(/\*(\d+)#$/)[1]);
      totalAmount += amount;
    });
    // Update total amount display
    document.getElementById("totalAmount").textContent =
      totalAmount.toLocaleString("fr-FR") + " Ar";
    if (history.length === 0) {
      emptyHistory.classList.remove("hidden");
      historyContainer.classList.add("hidden");
    } else {
      emptyHistory.classList.add("hidden");
      historyContainer.classList.remove("hidden");
      // Add each history item
      history.forEach((item, index) => {
        // Extract amount from code
        const amount = item.code.match(/\*(\d+)#$/)[1];
        totalAmount += parseInt(amount);
        const li = document.createElement("li");
        li.className = index % 2 === 0 ? "bg-white" : "bg-gray-50";
        const date = new Date(item.timestamp);
        const formattedDate = date.toLocaleString("en-US", {
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

      // 🔥 Ajout du listener pour suppression
      historyList.querySelectorAll(".remove-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const id = parseInt(this.getAttribute("data-id"));
          let history = JSON.parse(localStorage.getItem("codeRetrait") || "[]");
          history.splice(id, 1); // supprime l’élément à l’index
          localStorage.setItem("codeRetrait", JSON.stringify(history));
          loadHistory(); // recharge la liste après suppression
        });
      });
    }
  }
  // Clear history button
  clearHistoryBtn.addEventListener("click", function () {
    localStorage.removeItem("codeRetrait");
    loadHistory();
  });
}
