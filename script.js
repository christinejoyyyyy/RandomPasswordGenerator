function generatePass(){
    document.getElementById('errMsg').textContent = '';

    const passLength = parseInt(document.getElementById('passLength').value);
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeLowercase = document.getElementById('includeLowercase').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeSymbols = document.getElementById('includeSymbols').checked;

    if(passLength < 5 || passLength > 128){
        showError('Password length must be between 5 and 128 characters');
        return;
    }

    if(!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols){
        showError('Please select character type');
        return;
    }

    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let charLists = '';
    let charValues = [];

    if(includeUppercase){
        charLists = charLists + uppercase;
        charValues.push(getRandomChar(uppercase));
    }

    if(includeLowercase){
        charLists = charLists + lowercase;
        charValues.push(getRandomChar(lowercase));
    }

    if(includeNumbers){
        charLists = charLists + numbers;
        charValues.push(getRandomChar(numbers));
    }

    if(includeSymbols){
        charLists = charLists + symbols;
        charValues.push(getRandomChar(symbols));
    }
    
    let password = '';
    for(let char of charValues){
        password = password + char;
    }

    for (let i = charValues.length; i < passLength; i++) {
        password = password + getRandomChar(charLists);
    }

    password = shuffleString(password);

    const result = document.getElementById('passwordResult');
    result.value = password;
    document.getElementById('copyBtn').style.display = 'block';

    showPasswordStrength(password);
}

function getRandomChar(str){
    return str.charAt(Math.floor(Math.random() * str.length));
}

function shuffleString(str){
    return str.split('').sort(() => Math.random() - 0.5).join('');
}

function showPasswordStrength(password){
    const indicator = document.getElementById('strengthIndicator');
    let score = 0;
    let feedback = '';

    if(password.length >= 8){
        score = score + 1;
    }
    if(password.length >=12){
        score = score + 1;
    }

    if(/[a-z]/.test(password)){
        score = score + 1;
    }
    if(/[A-Z]/.test(password)){
        score = score + 1;
    }
    if(/[0-9]/.test(password)){
        score = score + 1;
    }
    if(/[^a-zA-Z0-9]/.test(password)){
        score = score + 1;
    }

    if(score < 3){
        indicator.className = 'strength-indicator strength-weak';
        feedback = 'Weak Password';
    } else if(score < 5){
        indicator.className = 'strength-indicator strength-medium';
        feedback = "Medium Password";
    } else{
        indicator.className = 'strength-indicator strength-strong';
        feedback = "Strong Password";
    }

    indicator.textContent = feedback;
    indicator.style.display = 'block';
}

function copyPassword(){
    const result = document.getElementById('passwordResult');
    result.select();
    result.setSelectionRange(0, 99999);

    try {
        navigator.clipboard.writeText(result.value).then(() => {
            const copyBtn = document.getElementById('copyBtn');
            const origTxt = copyBtn.textContent;
            copyBtn.textContent = 'Copied';
            
            setTimeout(() => {
                copyBtn.textContent = origTxt;
            })
        })
        
    } catch (error) {
        document.execCommand('copy');
        alert('Password copied to clipboard!');
    }
}

function showError(message){
        document.getElementById('errMsg').textContent = message;
    }

generatePass();