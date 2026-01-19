const form = document.getElementById('form');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const rolSelect = document.getElementById('rol');
const hoursInput = document.getElementById('hours');


document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const rulesSelect = document.querySelector('input[name="rules"]:checked');

    const user = {
        name: nameInput.value.trim(),
        age: Number(ageInput.value),
        rol: rolSelect.value,
        hours: Number(hoursInput.value),
        rules: rulesSelect ? rulesSelect.value : null
    }

    const riskScore = calculateRisk(user);
    const decisionMessage = decision(user, riskScore);
    console.log(user);
    console.log('Risk Score:', riskScore);

    const result = document.getElementById('result');

    result.classList.remove('allow', 'deny', 'review');

    result.textContent = decisionMessage;

    if (decisionMessage === "Access Granted") {
        result.classList.add('allow');
    } else if (decisionMessage === "Under review: high risk") {
        result.classList.add('review');
    } else {
        result.classList.add('deny');
    }

    const card = document.getElementById("decisionCard");
    const text = document.getElementById("resultText");

    card.classList.remove('hidden');


;
});

function calculateRisk(user) {

    let risk = 0;

    if (user.hours < 2) {
        risk ++;
    }

    if (user.rol === 'visitor') {
        risk ++;
    }

    if (user.age >= 18 && user.age <= 20) {
        risk ++;
    }

    if (user.rol === 'coder' && user.hours >= 4) {
        risk --;
    }

    if (risk < 0) {
        risk = 0;
    }

    return risk;
    }

    function decision(user,risk) {

    if (
        !nameInput.value.trim() ||
        !ageInput.value ||
        !rolSelect.value ||
        !hoursInput.value
    ) {
        alert("❌ Please complete all fields");
        return;
    }

    if (!user.rules) {
        alert("❌ You must accept the rules");
        return;
    }
        
        // deny //
        if (user.age < 18){
            return "❌ Access Denied: Underage";
        }

        if (user.rules === "no"){
            return "❌ Access Denied: Rules not accepted";
        }

        const validRoles = ["coder", "tutor", "visitor"];
        if (!validRoles.includes(user.rol)) {
            return "❌ Access Denied: Invalid role";
        }

        if (risk >= 3){
            return "⚠️ Under review: high risk";
        }   

        return "✅ Access Granted";
    }