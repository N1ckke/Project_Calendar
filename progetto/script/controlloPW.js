function validateForm() {
    var PSW = document.getElementById("psw");
    var caratteri = /[^a-zA-Z0-9!@#$%^&*(),.?":{}|<>]/g;
    if (caratteri.test(PSW.value) || PSW.value.length < 8 || PSW.value.length > 32) {
        alert("Inserisci una password valida: deve contenere solo lettere, numeri e caratteri speciali e deve essere lunga almeno 8 e non più di 32 caratteri.");
        PSW.focus();
        return false;
    } else {
        console.log("Input valido");
        return true;
    }
}