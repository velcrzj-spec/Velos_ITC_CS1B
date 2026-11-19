/*
  Philippine graduated income tax tables (annual taxable income).
  Tax = baseTax + (income − min) × rate
  "max: Infinity" means there is no upper limit.
*/
const TAX_TABLES = {
  // Table given in the assignment: TRAIN Law (RA 10963) rates for 2018–2022
  assignment: {
    label: "Assignment table (TRAIN Law, 2018–2022)",
    note: "Table given in the assignment: TRAIN Law rates for January 1, 2018 to December 31, 2022.",
    brackets: [
      { min: 0,       max: 250000,   baseTax: 0,       rate: 0.00 },
      { min: 250000,  max: 400000,   baseTax: 0,       rate: 0.20 },
      { min: 400000,  max: 800000,   baseTax: 30000,   rate: 0.25 },
      { min: 800000,  max: 2000000,  baseTax: 130000,  rate: 0.30 },
      { min: 2000000, max: 8000000,  baseTax: 490000,  rate: 0.32 },
      { min: 8000000, max: Infinity, baseTax: 2410000, rate: 0.35 }
    ]
  },
  // Current table: TRAIN Law rates from January 1, 2023 onward (still in use for 2026)
  current: {
    label: "Current table (TRAIN Law, 2023 onward)",
    note: "Current table: TRAIN Law rates from January 1, 2023 onward (in effect for 2026).",
    brackets: [
      { min: 0,       max: 250000,   baseTax: 0,       rate: 0.00 },
      { min: 250000,  max: 400000,   baseTax: 0,       rate: 0.15 },
      { min: 400000,  max: 800000,   baseTax: 22500,   rate: 0.20 },
      { min: 800000,  max: 2000000,  baseTax: 102500,  rate: 0.25 },
      { min: 2000000, max: 8000000,  baseTax: 402500,  rate: 0.30 },
      { min: 8000000, max: Infinity, baseTax: 2202500, rate: 0.35 }
    ]
  }
};

/*
  Payroll settings (detailed monthly payslip).
  NOTE: The contribution rates are SIMPLIFIED values for classroom use.
  Real SSS, PhilHealth, and Pag-IBIG contributions have salary limits and
  change over time. Update these numbers to match your instructor's rules.
*/
const PAYROLL_CONFIG = {
  workingDaysPerMonth: 22,     // used to get the daily rate
  hoursPerDay: 8,              // used to get the hourly rate
  overtimeMultiplier: 1.25,    // overtime pay = hourly rate x 1.25
  sssRate: 0.05,               // 5% of basic salary
  philHealthRate: 0.025,       // 2.5% of basic salary
  pagIbigRate: 0.02,           // 2% of basic salary
  includeWithholdingTax: true, // uses the current tax table
  withholdingTable: "current"  // which TAX_TABLES entry the payslip uses
};


/* =========================================================
   REUSABLE HELPER FUNCTIONS
   ========================================================= */

// Get an element from the page by its id
const getElement = (id) => document.getElementById(id);

// Show a normal result inside an element
const showResult = (id, html) => {
  const box = getElement(id);
  box.classList.remove("error");
  box.innerHTML = html;
};

// Show an error message inside an element
const showError = (id, message) => {
  const box = getElement(id);
  box.classList.add("error");
  box.textContent = message;
};

// Empty a result box
const clearMessage = (id) => {
  const box = getElement(id);
  box.textContent = "";
  box.classList.remove("error");
};

/*
  Read a number from an input box and check it.
  Returns { ok: true, value } or { ok: false, message }.
  options: { label, min, max, wholeNumber }
*/
const readNumber = (inputId, { label, min, max, wholeNumber = false }) => {
  const text = getElement(inputId).value.trim();

  if (text === "") {
    return { ok: false, message: `Please enter a value for ${label}.` };
  }

  const value = Number(text);

  if (!Number.isFinite(value)) {
    return { ok: false, message: `${label} must be a valid number.` };
  }
  if (wholeNumber && !Number.isInteger(value)) {
    return { ok: false, message: `${label} must be a whole number (no decimals).` };
  }
  if (min !== undefined && value < min) {
    return { ok: false, message: `${label} must be at least ${min}.` };
  }
  if (max !== undefined && value > max) {
    return { ok: false, message: `${label} must not be more than ${max}.` };
  }
  return { ok: true, value };
};

// Format a number with commas and 2 decimal places, e.g. 12,345.60
const formatNumber = (value) =>
  value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Format a number as Philippine pesos, e.g. ₱12,345.60
const formatPeso = (value) => `₱${formatNumber(value)}`;

// Make user-typed text safe to place inside HTML
const escapeHtml = (text) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");


/* =========================================================
   PAGE NAVIGATION
   Only one page (Home or a project) is shown at a time.
   The page to show comes from the link, e.g. #assignment2
   ========================================================= */

const PAGE_IDS = ["home", "about", "branding", "assignment1", "assignment2", "assignment3", "assignment4"];

// Open or close the Projects dropdown menu
const toggleAssignmentsMenu = () => {
  const isOpen = getElement("assignmentsMenu").classList.toggle("open");
  getElement("assignmentsMenuButton").setAttribute("aria-expanded", isOpen);
};

const closeAssignmentsMenu = () => {
  getElement("assignmentsMenu").classList.remove("open");
  getElement("assignmentsMenuButton").setAttribute("aria-expanded", "false");
};

// Underline the menu item for the page being shown
const highlightNavLink = (pageId) => {
  for (const link of document.querySelectorAll(".nav-link")) {
    const isProjects = link.id === "assignmentsMenuButton" && pageId.startsWith("assignment");
    link.classList.toggle("active", link.dataset.nav === pageId || isProjects);
  }
};

// Show one page and hide the others
const showPage = (pageId) => {
  const target = PAGE_IDS.includes(pageId) ? pageId : "home";   // unknown link: go to the front page
  for (const page of document.querySelectorAll(".page")) {
    page.hidden = page.dataset.page !== target;
  }
  closeAssignmentsMenu();
  highlightNavLink(target);
  window.scrollTo(0, 0);
};

// Scroll down to the project cards on the Home page
const scrollToProjects = () => getElement("projects").scrollIntoView();

// Read the page name from the address (the part after #)
const showPageFromAddress = () => {
  const hash = window.location.hash.replace("#", "");
  if (hash === "projects") {
    showPage("home");       // the project cards are on the Home page
    scrollToProjects();
    return;
  }
  showPage(hash);
};


/* =========================================================
   PROJECT #1 – CONVERSION
   ========================================================= */

// Each conversion has units, a formula, and a function that does the math
const CONVERSIONS = {
  cToF:  { fromUnit: "°C", toUnit: "°F", formula: "(°C × 9/5) + 32", convert: (x) => (x * 9 / 5) + 32 },
  fToC:  { fromUnit: "°F", toUnit: "°C", formula: "(°F − 32) × 5/9", convert: (x) => (x - 32) * 5 / 9 },
  mToFt: { fromUnit: "m",  toUnit: "ft", formula: "meters × 3.28084", convert: (x) => x * 3.28084 },
  ftToM: { fromUnit: "ft", toUnit: "m",  formula: "feet ÷ 3.28084",  convert: (x) => x / 3.28084 }
};

const LENGTH_CONVERSIONS = ["mToFt", "ftToM"];

const handleConversion = () => {
  const input = readNumber("convertValue", { label: "Value" });
  if (!input.ok) { showError("convertResult", input.message); return; }

  const type = getElement("convertType").value;
  const { fromUnit, toUnit, formula, convert } = CONVERSIONS[type];

  // Lengths cannot be negative
  if (LENGTH_CONVERSIONS.includes(type) && input.value < 0) {
    showError("convertResult", "Length cannot be negative.");
    return;
  }

  const answer = convert(input.value);

  showResult("convertResult", `
    <p>Formula: ${formula}</p>
    <p><strong>${input.value} ${fromUnit} = ${formatNumber(answer)} ${toUnit}</strong></p>
  `);
};


/* =========================================================
   PROJECT #2 – INCOME TAX
   ========================================================= */

// The tax table chosen in the "Tax table" list
const getActiveTaxTable = () => TAX_TABLES[getElement("taxTableSelect").value] ?? TAX_TABLES.assignment;

// Find which bracket an annual income belongs to
const findTaxBracket = (annualIncome, brackets = getActiveTaxTable().brackets) =>
  brackets.find(({ max }) => annualIncome <= max) ?? brackets[brackets.length - 1];

// Compute annual income tax from annual taxable income
const computeAnnualTax = (annualTaxableIncome, brackets = getActiveTaxTable().brackets) => {
  if (annualTaxableIncome <= 0) {
    return 0;
  }
  const { min, baseTax, rate } = findTaxBracket(annualTaxableIncome, brackets);
  return baseTax + (annualTaxableIncome - min) * rate;
};

// Describe a bracket in words, e.g. "Over ₱250,000.00 to ₱400,000.00"
const describeBracketRange = ({ min, max }) => {
  if (min === 0) return `${formatPeso(max)} and below`;
  if (max === Infinity) return `Over ${formatPeso(min)}`;
  return `Over ${formatPeso(min)} to ${formatPeso(max)}`;
};

// Describe the tax for a bracket, e.g. "₱30,000.00 + 25% of the excess over ₱400,000.00"
const describeBracketTax = ({ min, baseTax, rate }) => {
  const percent = Math.round(rate * 100);
  if (rate === 0) return "0% (exempt)";
  if (baseTax === 0) return `${percent}% of the excess over ${formatPeso(min)}`;
  return `${formatPeso(baseTax)} + ${percent}% of the excess over ${formatPeso(min)}`;
};

// Fill in the tax table shown on the page. The given bracket is highlighted.
const renderTaxTable = (highlightBracket = null) => {
  const { note, brackets } = getActiveTaxTable();
  const rows = brackets.map((bracket) => `
    <tr${bracket === highlightBracket ? ' class="current-bracket"' : ""}>
      <td>${describeBracketRange(bracket)}</td>
      <td>${describeBracketTax(bracket)}</td>
    </tr>`).join("");

  getElement("taxTableDisplay").innerHTML = `<tr><th>Annual taxable income</th><th>Income tax</th></tr>${rows}`;
  getElement("taxTableNote").textContent = `${note} Your bracket is highlighted after you compute.`;
};

// Switch between Monthly and Annual input
const setTaxPeriod = (period) => {
  getElement("taxPeriod").value = period;
  getElement("taxPeriodLabel").textContent = period === "monthly" ? "per month" : "per year";
  for (const button of document.querySelectorAll("[data-period]")) {
    button.classList.toggle("active", button.dataset.period === period);
  }
};

// Fill in the summary panel. Pass null to clear it.
const updateTaxSummary = (summary) => {
  if (summary === null) {
    getElement("sumAnnualTax").textContent = "₱0.00";
    ["sumTaxable", "sumMonthlyTax", "sumRate", "sumBracket", "sumAnnualAfter", "sumMonthlyAfter"]
      .forEach((id) => { getElement(id).textContent = "—"; });
    return;
  }
  const { annualTax, annualTaxable, effectiveRate, bracket, annualAfterTax } = summary;
  getElement("sumAnnualTax").textContent = formatPeso(annualTax);
  getElement("sumTaxable").textContent = formatPeso(annualTaxable);
  getElement("sumMonthlyTax").textContent = formatPeso(annualTax / 12);
  getElement("sumRate").textContent = `${formatNumber(effectiveRate)}%`;
  getElement("sumBracket").textContent = bracket.rate === 0 ? "0% (exempt)" : `${Math.round(bracket.rate * 100)}% bracket`;
  getElement("sumAnnualAfter").textContent = formatPeso(annualAfterTax);
  getElement("sumMonthlyAfter").textContent = formatPeso(annualAfterTax / 12);
};

// Show an income tax error and clear old results
const showTaxError = (message) => {
  showError("taxResult", message);
  updateTaxSummary(null);
  renderTaxTable(null);
};

const handleIncomeTax = () => {
  const income = readNumber("taxIncome", { label: "Taxable income", min: 0 });
  if (!income.ok) { showTaxError(income.message); return; }

  const deductions = readNumber("taxDeductions", { label: "Non-taxable deductions", min: 0 });
  if (!deductions.ok) { showTaxError(deductions.message); return; }

  if (deductions.value > income.value) {
    showTaxError("Deductions cannot be greater than the income.");
    return;
  }

  const period = getElement("taxPeriod").value;
  const isMonthly = period === "monthly";
  const periodsPerYear = isMonthly ? 12 : 1;

  // Step 1: taxable income for the period
  const taxableIncome = income.value - deductions.value;

  // Step 2: convert to annual taxable income
  const annualTaxable = taxableIncome * periodsPerYear;

  // Step 3: find the bracket and compute the tax
  const bracket = findTaxBracket(annualTaxable);
  const annualTax = computeAnnualTax(annualTaxable);
  const monthlyTax = annualTax / 12;
  const { label: tableLabel } = getActiveTaxTable();

  const steps = [
    `Taxable income = ${formatPeso(income.value)} − ${formatPeso(deductions.value)} = ${formatPeso(taxableIncome)} ${isMonthly ? "per month" : "per year"}`,
    isMonthly
      ? `Annual taxable income = ${formatPeso(taxableIncome)} × 12 = ${formatPeso(annualTaxable)}`
      : `Annual taxable income = ${formatPeso(annualTaxable)}`,
    `Bracket: ${describeBracketRange(bracket)} (${tableLabel})`,
    bracket.rate === 0
      ? "This income is within the exempt bracket, so the tax is ₱0.00."
      : `Tax = ${formatPeso(bracket.baseTax)} + (${formatPeso(annualTaxable)} − ${formatPeso(bracket.min)}) × ${Math.round(bracket.rate * 100)}% = ${formatPeso(annualTax)}`
  ];

  showResult("taxResult", `
    ${steps.map((step, index) => `<p>${index + 1}. ${step}</p>`).join("")}
    <p><strong>Annual income tax: ${formatPeso(annualTax)}</strong></p>
    <p><strong>Monthly income tax: ${formatPeso(monthlyTax)}</strong></p>
  `);

  // Effective rate = tax ÷ taxable income × 100
  const effectiveRate = annualTaxable > 0 ? (annualTax / annualTaxable) * 100 : 0;

  updateTaxSummary({
    annualTax,
    annualTaxable,
    effectiveRate,
    bracket,
    annualAfterTax: annualTaxable - annualTax
  });
  renderTaxTable(bracket);
};

// When the tax table changes: show it, and recompute if a result is on screen
const handleTaxTableChange = () => {
  const resultBox = getElement("taxResult");
  const hasResult = resultBox.textContent.trim() !== "" && !resultBox.classList.contains("error");
  if (hasResult) {
    handleIncomeTax();
  } else {
    renderTaxTable(null);
  }
};


/* =========================================================
   PROJECT #3 – LOOPS
   ========================================================= */

// Factorial using a WHILE loop.
// BigInt (numbers ending in "n") keeps very large results exact.
const computeFactorial = (n) => {
  let result = 1n;
  let i = 1;
  while (i <= n) {
    result *= BigInt(i);
    i++;
  }
  return result;
};

// Sum of 1 to N using a DO WHILE loop
const computeSum = (n) => {
  if (n === 0) {
    return 0;   // a do-while always runs once, so N = 0 is handled first
  }
  let sum = 0;
  let i = 1;
  do {
    sum += i;
    i++;
  } while (i <= n);
  return sum;
};

// Average of 1 to N using a FOR loop
const computeAverage = (n) => {
  if (n === 0) {
    return { total: 0, average: 0 };
  }
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return { total, average: total / n };
};

// Build text such as "1 × 2 × 3" or "1 + 2 + 3" (shortened when N is large)
const buildSteps = (n, symbol) => {
  if (n <= 10) {
    return Array.from({ length: n }, (_, index) => index + 1).join(` ${symbol} `);
  }
  return `1 ${symbol} 2 ${symbol} 3 ${symbol} … ${symbol} ${n}`;
};

// Put "—" back in the result cards
const clearLoopResults = () => {
  ["factorialValue", "sumValue", "averageValue"].forEach((id) => { getElement(id).textContent = "—"; });
  getElement("factorialSteps").textContent = "N! = 1 × 2 × … × N";
  getElement("sumSteps").textContent = "1 + 2 + … + N";
  getElement("averageSteps").textContent = "sum ÷ N";
};

const handleLoops = () => {
  const input = readNumber("loopN", { label: "N", min: 0, max: 1000, wholeNumber: true });
  if (!input.ok) {
    showError("loopError", input.message);
    clearLoopResults();
    return;
  }
  clearMessage("loopError");

  const { value: n } = input;

  // Factorial
  getElement("factorialValue").textContent = computeFactorial(n).toString();
  getElement("factorialSteps").textContent = n === 0 ? "0! = 1 (by definition)" : `${n}! = ${buildSteps(n, "×")}`;

  // Sum
  getElement("sumValue").textContent = computeSum(n).toLocaleString("en-US");
  getElement("sumSteps").textContent = n === 0 ? "No numbers to add" : buildSteps(n, "+");

  // Average
  const { total, average } = computeAverage(n);
  getElement("averageValue").textContent = Number.isInteger(average)
    ? average.toLocaleString("en-US")
    : formatNumber(average);
  getElement("averageSteps").textContent = n === 0 ? "No numbers to average" : `${total.toLocaleString("en-US")} ÷ ${n}`;
};


/* =========================================================
   PROJECT #4 – PAYROLL LIST (add and delete employees)
   Gross Pay = Days Worked × Daily Rate
   Net Pay   = Gross Pay − Deduction Amount
   ========================================================= */

// The payroll list. Each employee: { name, daysWorked, dailyRate, deduction }
let payrollList = [];

// Gross and net pay for one employee
const computeEmployeePay = ({ daysWorked, dailyRate, deduction }) => {
  const grossPay = daysWorked * dailyRate;
  return { grossPay, netPay: grossPay - deduction };
};

// Show the payroll list table. "No." is the line number (1, 2, 3, ...).
const renderPayrollList = (newLine = 0) => {
  const body = getElement("payrollListBody");

  if (payrollList.length === 0) {
    body.innerHTML = '<tr class="empty-row"><td colspan="7">No employees yet. Add one above.</td></tr>';
    return;
  }

  body.innerHTML = payrollList.map((employee, index) => {
    const { name, daysWorked, dailyRate, deduction } = employee;
    const { grossPay, netPay } = computeEmployeePay(employee);
    const lineNumber = index + 1;
    return `
      <tr${lineNumber === newLine ? ' class="row-new"' : ""}>
        <td>${lineNumber}</td>
        <td>${escapeHtml(name)}</td>
        <td class="num">${daysWorked.toLocaleString("en-US")}</td>
        <td class="num">${formatPeso(dailyRate)}</td>
        <td class="num">${formatPeso(grossPay)}</td>
        <td class="num">${formatPeso(deduction)}</td>
        <td class="num net">${formatPeso(netPay)}</td>
      </tr>`;
  }).join("");
};

// Add Employee button
const handleAddEmployee = () => {
  const name = getElement("plName").value.trim();
  if (name === "") {
    showError("plAddMessage", "Please enter the employee name.");
    return;
  }

  const days = readNumber("plDays", { label: "Days worked", min: 0, max: 366 });
  if (!days.ok) { showError("plAddMessage", days.message); return; }

  const rate = readNumber("plRate", { label: "Daily rate", min: 0 });
  if (!rate.ok) { showError("plAddMessage", rate.message); return; }

  const deduction = readNumber("plDeduction", { label: "Deduction amount", min: 0 });
  if (!deduction.ok) { showError("plAddMessage", deduction.message); return; }

  const employee = { name, daysWorked: days.value, dailyRate: rate.value, deduction: deduction.value };
  const { grossPay, netPay } = computeEmployeePay(employee);

  if (netPay < 0) {
    showError("plAddMessage", `The deduction (${formatPeso(employee.deduction)}) is more than the gross pay (${formatPeso(grossPay)}).`);
    return;
  }

  payrollList = [...payrollList, employee];
  renderPayrollList(payrollList.length);
  showResult("plAddMessage",
    `<p>Added line ${payrollList.length}: <strong>${escapeHtml(name)}</strong> · Net pay ${formatPeso(netPay)}</p>`);

  // Clear the form for the next employee
  ["plName", "plDays", "plRate"].forEach((id) => { getElement(id).value = ""; });
  getElement("plDeduction").value = "0";
  getElement("plName").focus();
};

// Delete button: removes the employee on the given line number, then renumbers the list
const handleDeleteEmployee = () => {
  if (payrollList.length === 0) {
    showError("plDeleteMessage", "The payroll list is empty. There is nothing to delete.");
    return;
  }

  const line = readNumber("plDeleteLine", { label: "Line number", min: 1, max: payrollList.length, wholeNumber: true });
  if (!line.ok) { showError("plDeleteMessage", line.message); return; }

  const { name } = payrollList[line.value - 1];
  payrollList = payrollList.filter((_, index) => index !== line.value - 1);
  renderPayrollList();
  showResult("plDeleteMessage",
    `<p>Deleted line ${line.value}: <strong>${escapeHtml(name)}</strong>. The list has been renumbered.</p>`);
  getElement("plDeleteLine").value = "";
};


/* =========================================================
   PROJECT #4 – DETAILED MONTHLY PAYSLIP
   ========================================================= */

// Compute all payroll values. Returns an object with every amount.
const computePayroll = (basicSalary, overtimeHours, allowance, otherDeductions) => {
  const {
    workingDaysPerMonth, hoursPerDay, overtimeMultiplier,
    sssRate, philHealthRate, pagIbigRate, includeWithholdingTax, withholdingTable
  } = PAYROLL_CONFIG;

  // Earnings
  const hourlyRate = basicSalary / workingDaysPerMonth / hoursPerDay;
  const overtimePay = overtimeHours * hourlyRate * overtimeMultiplier;
  const grossSalary = basicSalary + overtimePay + allowance;

  // Contributions (based on basic salary)
  const sss = basicSalary * sssRate;
  const philHealth = basicSalary * philHealthRate;
  const pagIbig = basicSalary * pagIbigRate;
  const contributions = sss + philHealth + pagIbig;

  // Withholding tax (monthly), using the current tax table
  const monthlyTaxable = Math.max(grossSalary - contributions, 0);
  const withholdingTax = includeWithholdingTax
    ? computeAnnualTax(monthlyTaxable * 12, TAX_TABLES[withholdingTable].brackets) / 12
    : 0;

  const totalDeductions = contributions + withholdingTax + otherDeductions;
  const netSalary = grossSalary - totalDeductions;

  return {
    hourlyRate, overtimePay, grossSalary, sss, philHealth, pagIbig,
    withholdingTax, otherDeductions, totalDeductions, netSalary
  };
};

// Read and check the payslip inputs.
// Returns { ok: true, data } or { ok: false, message }.
// When requireName is false (live preview), a blank name is allowed.
const readPayrollInputs = (requireName) => {
  const [name, empId, position] = ["empName", "empId", "empPosition"].map((id) => getElement(id).value.trim());

  if (requireName && name === "") {
    return { ok: false, message: "Please enter the employee name." };
  }

  const basic = readNumber("basicSalary", { label: "Basic monthly salary", min: 0 });
  if (!basic.ok) return basic;
  if (basic.value === 0) {
    return { ok: false, message: "Basic monthly salary must be greater than 0." };
  }

  const overtime = readNumber("overtimeHours", { label: "Overtime hours", min: 0, max: 300 });
  if (!overtime.ok) return overtime;

  const allowance = readNumber("allowance", { label: "Allowance", min: 0 });
  if (!allowance.ok) return allowance;

  const other = readNumber("otherDeductions", { label: "Other deductions", min: 0 });
  if (!other.ok) return other;

  const pay = computePayroll(basic.value, overtime.value, allowance.value, other.value);
  if (pay.netSalary < 0) {
    return { ok: false, message: "Total deductions are greater than the gross salary. Please check the amounts." };
  }

  return {
    ok: true,
    data: {
      name, empId, position, pay,
      basic: basic.value,
      overtimeHours: overtime.value,
      allowance: allowance.value
    }
  };
};

// Build one line of the payslip.
// type: "" (normal), "total" (bold), "deduct" (shown with a minus sign)
const payslipLine = (label, amount, type = "", note = "") => {
  const sign = type.includes("deduct") ? "− " : "";
  const noteHtml = note ? `<p class="payslip-note">${note}</p>` : "";
  return `<div class="payslip-line ${type}"><span>${label}</span><span class="amount">${sign}${formatPeso(amount)}</span></div>${noteHtml}`;
};

// Fill in the payslip panel
const renderPayslip = ({ name, empId, position, basic, overtimeHours, allowance, pay }) => {
  const { overtimeMultiplier, sssRate, philHealthRate, pagIbigRate, includeWithholdingTax } = PAYROLL_CONFIG;

  // Header
  getElement("payslipName").textContent = name !== "" ? name : "Employee name";
  const meta = [empId, position].filter((text) => text !== "");
  getElement("payslipMeta").textContent = meta.length > 0 ? meta.join(" · ") : "ID · Position";
  getElement("payslipRate").textContent = `${formatPeso(pay.hourlyRate)} / hour`;

  const lines = [
    // Earnings
    payslipLine("Basic salary", basic),
    payslipLine("Overtime pay", pay.overtimePay, "",
      `${overtimeHours} hrs × ${formatPeso(pay.hourlyRate)} (${overtimeMultiplier}×)`),
    payslipLine("Allowance", allowance),
    payslipLine("Gross pay", pay.grossSalary, "total"),
    // Deductions
    payslipLine(`SSS (${sssRate * 100}%)`, pay.sss, "deduct"),
    payslipLine(`PhilHealth (${philHealthRate * 100}%)`, pay.philHealth, "deduct"),
    payslipLine(`Pag-IBIG (${pagIbigRate * 100}%)`, pay.pagIbig, "deduct"),
    includeWithholdingTax ? payslipLine("Withholding tax", pay.withholdingTax, "deduct", "TRAIN Law table, 2023 onward") : "",
    payslipLine("Other deductions", pay.otherDeductions, "deduct"),
    payslipLine("Total deductions", pay.totalDeductions, "total deduct"),
    // Net pay
    `<div class="payslip-net"><span>Net pay</span><span class="payslip-net-amount">${formatPeso(pay.netSalary)}</span></div>`
  ];

  getElement("payslipBody").innerHTML = lines.join("");
};

// Put the payslip back to its empty state, with a short message
const clearPayslip = (message) => {
  getElement("payslipName").textContent = "Employee name";
  getElement("payslipMeta").textContent = "ID · Position";
  getElement("payslipRate").textContent = "₱0.00 / hour";
  getElement("payslipBody").innerHTML = `<p class="payslip-empty">${message}</p>`;
};

// Compute Payroll button: checks every field and shows any error
const handlePayroll = () => {
  const input = readPayrollInputs(true);
  if (!input.ok) {
    showError("payrollResult", input.message);
    return;
  }
  clearMessage("payrollResult");
  renderPayslip(input.data);
};

// While typing: update the payslip whenever the numbers are valid
const updatePayslipLive = () => {
  const input = readPayrollInputs(false);
  if (input.ok) {
    renderPayslip(input.data);
    clearMessage("payrollResult");
  } else if (getElement("basicSalary").value.trim() === "") {
    clearPayslip("Enter the basic monthly salary to see the payslip.");
  } else {
    clearPayslip(input.message);
  }
};

// List the payslip formulas on the page, using PAYROLL_CONFIG
const renderPayrollFormulas = () => {
  const c = PAYROLL_CONFIG;
  const items = [
    `Hourly rate = Basic salary ÷ ${c.workingDaysPerMonth} days ÷ ${c.hoursPerDay} hours`,
    `Overtime pay = Overtime hours × Hourly rate × ${c.overtimeMultiplier}`,
    "Gross salary = Basic salary + Overtime pay + Allowance",
    `SSS = ${c.sssRate * 100}%, PhilHealth = ${c.philHealthRate * 100}%, Pag-IBIG = ${c.pagIbigRate * 100}% of basic salary (simplified classroom rates)`,
    c.includeWithholdingTax
      ? "Withholding tax = Annual tax on ((Gross − Contributions) × 12) ÷ 12, using the current TRAIN Law table (2023 onward)"
      : "Withholding tax is turned off",
    "Total deductions = Contributions + Withholding tax + Other deductions",
    "Net salary = Gross salary − Total deductions"
  ];
  getElement("payrollFormulaList").innerHTML = items.map((item) => `<li>${item}</li>`).join("");
};


/* =========================================================
   CONNECT BUTTONS TO FUNCTIONS
   This runs once the page has finished loading.
   ========================================================= */
const setupPage = () => {
  // Navigation
  getElement("assignmentsMenuButton").addEventListener("click", toggleAssignmentsMenu);
  getElement("assignmentsMenu").addEventListener("click", closeAssignmentsMenu);
  window.addEventListener("hashchange", showPageFromAddress);

  // "View Projects" when the address is already #projects: scroll again
  document.querySelectorAll('a[href="#projects"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (window.location.hash === "#projects") scrollToProjects();
    });
  });

  // Close the dropdown when clicking anywhere outside it
  document.addEventListener("click", ({ target }) => {
    if (!target.closest(".dropdown")) closeAssignmentsMenu();
  });

  // Project buttons
  const clickHandlers = {
    convertButton: handleConversion,
    taxButton: handleIncomeTax,
    loopButton: handleLoops,
    plAddButton: handleAddEmployee,
    plDeleteButton: handleDeleteEmployee,
    payrollButton: handlePayroll
  };
  for (const [id, handler] of Object.entries(clickHandlers)) {
    getElement(id).addEventListener("click", handler);
  }

  // Income tax: Monthly/Annual switch and tax table list
  document.querySelectorAll("[data-period]").forEach((button) => {
    button.addEventListener("click", () => setTaxPeriod(button.dataset.period));
  });
  getElement("taxTableSelect").addEventListener("change", handleTaxTableChange);

  // Payslip updates while typing
  ["empName", "empId", "empPosition", "basicSalary", "overtimeHours", "allowance", "otherDeductions"]
    .forEach((id) => getElement(id).addEventListener("input", updatePayslipLive));

  // Pressing Enter inside an input clicks the nearest button in the same box
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      const container = event.target.closest(".sub-box, .tax-panel, .panel, .box");
      container?.querySelector("button:not(.toggle-button)")?.click();
    });
  });

  // Build tables and lists from the configuration
  renderTaxTable(null);
  renderPayrollList();
  renderPayrollFormulas();
  getElement("overtimeHint").textContent = `Paid at ${PAYROLL_CONFIG.overtimeMultiplier}× the hourly rate`;

  // Show the page named in the address, or Home
  showPageFromAddress();

  // Pages use data-page (not id) so the browser does not jump down
  // the page when it is opened from a link such as index.html#about.
  if (window.location.hash === "#projects") {
    window.addEventListener("load", scrollToProjects);
  }
};

document.addEventListener("DOMContentLoaded", setupPage);
