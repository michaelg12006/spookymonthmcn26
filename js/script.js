const codeInput = document.getElementById('code-input');
const errorText = document.getElementById('error');
const submitBtn = document.getElementById('submit-button');

errorText.classList.add('hidden');

const encrypted = "NycpKycuISA=";
const key = "coldcase";

function decrypt(encoded, key) {
    const data = atob(encoded);
    let result = "";

    for (let i = 0; i < data.length; i++) {
        result += String.fromCharCode(
            data.charCodeAt(i) ^ key.charCodeAt(i % key.length)
        );
    }

    return result;
}

const answer = decrypt(encrypted, key);

submitBtn.addEventListener('click', () => {

    if (codeInput.value.toUpperCase() === answer) {

        errorText.classList.add('hidden');

        document.body.classList.add('unlocked');

        codeInput.disabled = true;
        submitBtn.disabled = true;

        setTimeout(() => {
            window.location.href = 'mnigsksiid.html';
        }, 1500);

    } else {

        errorText.textContent = "...NO CASE FOUND";
        errorText.classList.remove('hidden');

        document.body.classList.remove('wrong');
        void document.body.offsetWidth;

        document.body.classList.add('wrong');

        setTimeout(() => {
            document.body.classList.remove('wrong');
            errorText.classList.add('hidden');
        }, 1800);
    }
});