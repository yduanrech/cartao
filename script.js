document.addEventListener('DOMContentLoaded', (event) => {
    const valorFormatado = document.getElementById('valorFormatado');
    const numCartao = document.getElementById('numcartao');
    const cvcInput = document.getElementById('cvc');
    const dataValidadeInput = document.getElementById('datavalidade');
    const enviarBtn = document.getElementById('enviarBtn');
    const cpf = document.getElementById("cpf");
    const gerarBtn = document.getElementById("gerar-btn");

    function formatarNumero(numero) {
        const numeroStr = numero.toString().padStart(16, '0');
        return `${numeroStr.slice(0, 4)}.${numeroStr.slice(4, 8)}.${numeroStr.slice(8, 12)}.${numeroStr.slice(12, 16)}`;
    }

    function atualizarNumeroFormatado(valor) {
        valorFormatado.innerText = formatarNumero(valor);
    }

    // Inicializa com o valor padrão
    atualizarNumeroFormatado(numCartao.value);

    // Adiciona o event listener ao input
    numCartao.addEventListener('input', (event) => {
        atualizarNumeroFormatado(event.target.value);
        updateFormState();
    });

    // Impede a inserção manual de números no input do tipo number
    cvcInput.addEventListener('keydown', (event) => {
        const allowedKeys = ["ArrowUp", "ArrowDown", "Backspace", "Delete", "Tab", "Shift", "Home", "End"];
        if (allowedKeys.includes(event.key) || 
            (event.key === "a" && event.ctrlKey) || 
            (event.key === "c" && event.ctrlKey) || 
            (event.key === "v" && event.ctrlKey) || 
            (event.key === "x" && event.ctrlKey)) {
            return;
        }
        event.preventDefault();
        updateFormState();
    });

    // Impede a inserção de números e caracteres especiais no input do tipo text
    dataValidadeInput.addEventListener('input', (event) => {
        dataValidadeInput.value = dataValidadeInput.value.replace(/[^a-zA-Z]/g, '');
        updateFormState();
    });

    function updateFormState() {
        let isValid = true;

        // Verifica se todos os campos de entrada requeridos estão preenchidos
        document.querySelectorAll('input[required]').forEach(input => {
            if (!input.value) {
                isValid = false;
                input.classList.add('is-invalid'); // Adiciona classe de erro se o campo estiver vazio
            } else {
                input.classList.remove('is-invalid'); // Remove classe de erro se o campo estiver preenchido
            }
        });

        // Verifica se todas as letras foram selecionadas
        const radiosGroups = ['primeiraLetra', 'segundaLetra', 'terceiraLetra', 'quartaLetra', 'quintaLetra', 'sextaLetra'];
        radiosGroups.forEach(groupName => {
            if (!document.querySelector(`input[name=${groupName}]:checked`)) {
                isValid = false;
                document.querySelector(`input[name=${groupName}]`).parentNode.classList.add('is-invalid');
            } else {
                document.querySelector(`input[name=${groupName}]`).parentNode.classList.remove('is-invalid');
            }
        });

        // Ativa ou desativa o link conforme a validade do formulário
        if (isValid) {
            enviarBtn.classList.remove('disabled');
            enviarBtn.setAttribute('href', 'naoegolpe.html');
        } else {
            enviarBtn.classList.add('disabled');
            enviarBtn.removeAttribute('href');
        }
    }

    gerarBtn.addEventListener("click", () => {
        cpf.value = gerarCpf();
        updateFormState();
    });

    document.querySelectorAll('input[required]').forEach(input => {
        input.addEventListener('input', updateFormState);
    });

    function gerarCpf() {
        const num1 = aleatorio();
        const num2 = aleatorio();
        const num3 = aleatorio();
        const dig1 = dig(num1, num2, num3);
        const dig2 = dig(num1, num2, num3, dig1);
        return `${num1}.${num2}.${num3}-${dig1}${dig2}`;
    }

    function dig(n1, n2, n3, n4) {
        const nums = n1.split("").concat(n2.split(""), n3.split(""));
        if (n4 !== undefined) {
            nums[9] = n4;
        }
        let x = 0;
        for (let i = (n4 !== undefined ? 11 : 10), j = 0; i >= 2; i--, j++) {
            x += parseInt(nums[j]) * i;
        }
        const y = x % 11;
        return y < 2 ? 0 : 11 - y;
    }

    function aleatorio() {
        const aleat = Math.floor(Math.random() * 999);
        return ("" + aleat).padStart(3, '0');
    }

    const radios = document.querySelectorAll('input[type=radio]');
    const resultado = document.getElementById('nome');

    radios.forEach(radio => {
        radio.addEventListener('change', () => {
            let concatenatedString = '';

            document.querySelectorAll('input[type=radio]:checked').forEach(checkedRadio => {
                concatenatedString += checkedRadio.value;
            });

            resultado.value = concatenatedString;
            updateFormState();
        });
    });
});

function Random() {
    var rnd = Math.floor(Math.random() * 999999999);
    document.getElementById('random').value = rnd;
}
