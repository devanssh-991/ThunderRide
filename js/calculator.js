// EMI Calculator — real-time JS calculation

function calculateEMI(principal, rate, tenure) {
  const monthlyRate = rate / 12 / 100;
  const months = tenure;
  if (monthlyRate === 0) return principal / months;
  const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
  return Math.round(emi);
}

function initEMICalculator() {
  const priceInput = document.getElementById('emiPrice');
  const downInput = document.getElementById('emiDown');
  const rateInput = document.getElementById('emiRate');
  const tenureInput = document.getElementById('emiTenure');
  const resultEl = document.getElementById('emiResult');
  const totalEl = document.getElementById('emiTotal');
  const interestEl = document.getElementById('emiInterest');

  if (!priceInput || !resultEl) return;

  function updateEMI() {
    const price = parseFloat(priceInput.value) || 0;
    const down = parseFloat(downInput.value) || 0;
    const rate = parseFloat(rateInput.value) || 10;
    const tenure = parseInt(tenureInput.value, 10) || 36;
    const principal = price - down;

    if (principal <= 0) {
      resultEl.textContent = '₹0';
      return;
    }

    const emi = calculateEMI(principal, rate, tenure);
    const totalPayment = emi * tenure;
    const totalInterest = totalPayment - principal;

    resultEl.textContent = '₹' + emi.toLocaleString('en-IN');
    if (totalEl) totalEl.textContent = '₹' + totalPayment.toLocaleString('en-IN');
    if (interestEl) interestEl.textContent = '₹' + totalInterest.toLocaleString('en-IN');
  }

  [priceInput, downInput, rateInput, tenureInput].forEach(function(input) {
    if (input) {
      input.addEventListener('input', updateEMI);
      input.addEventListener('change', updateEMI);
    }
  });

  updateEMI();
}

document.addEventListener('DOMContentLoaded', initEMICalculator);
