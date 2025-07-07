let currentStep = 1;
const totalSteps = 4;
let selectedPlan = 'advanced';
let selectedAddons = ['online-service', 'custom-profile'];
let isYearlyBilling = false;
let completedSteps = [1];

// Initialize form
document.addEventListener('DOMContentLoaded', function() {
    updateStepIndicator();
    setupBillingToggle();
});

function setupBillingToggle() {
    const toggle = document.getElementById('billing-toggle');
    toggle.addEventListener('change', function() {
        isYearlyBilling = this.checked;
        updateBillingDisplay();
    });
}

function updateBillingDisplay() {
    const monthlyOptions = document.querySelectorAll('.billing-option');
    monthlyOptions[0].classList.toggle('active', !isYearlyBilling);
    monthlyOptions[1].classList.toggle('active', isYearlyBilling);
    
    // Update pricing display based on billing cycle
    // This would be expanded to show yearly prices when toggled
}

function goToStep(step) {
    // Only allow navigation to completed steps or next in sequence
    if (step <= currentStep || completedSteps.includes(step)) {
        currentStep = step;
        if (!completedSteps.includes(step)) {
            completedSteps.push(step);
        }
        showStep(currentStep);
        updateStepIndicator();
    }
}

function updateStepIndicator() {
    document.querySelectorAll('.step-number').forEach((el, index) => {
        const step = index + 1;
        el.classList.toggle('active', step === currentStep);
    });
}

function showStep(step) {
    document.querySelectorAll('.form-step').forEach(el => {
        el.classList.remove('active');
    });
    document.getElementById(`step${step}`).classList.add('active');
}

function nextStep() {
    if (validateCurrentStep()) {
        if (currentStep < totalSteps) {
            currentStep++;
            if (!completedSteps.includes(currentStep)) {
                completedSteps.push(currentStep);
            }
            showStep(currentStep);
            updateStepIndicator();
        } else {
            confirmForm();
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
        updateStepIndicator();
    }
}

function validateCurrentStep() {
    // Add validation logic for each step
    // Return true if step is valid
    return true;
}

function selectPlan(plan) {
    selectedPlan = plan;
    document.querySelectorAll('.plan-option').forEach(el => {
        el.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
    updateSummary();
}

function toggleAddon(addon) {
    const index = selectedAddons.indexOf(addon);
    if (index === -1) {
        selectedAddons.push(addon);
        event.currentTarget.classList.add('selected');
    } else {
        selectedAddons.splice(index, 1);
        event.currentTarget.classList.remove('selected');
    }
    updateSummary();
}

function updateSummary() {
    // Update summary section with selected options
    // This would calculate and display the total price
}

function confirmForm() {
    // Hide all form steps
    document.querySelectorAll('.form-step').forEach(el => {
        el.classList.remove('active');
    });
    
    // Show thank you message
    document.getElementById('thank-you').classList.add('active');
    
    // Hide sidebar
    document.querySelector('.sidebar').style.display = 'none';
    
    // Here you would typically submit the form data to a server
}