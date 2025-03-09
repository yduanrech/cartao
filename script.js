document.addEventListener('DOMContentLoaded', (event) => {
    const valorFormatado = document.getElementById('valorFormatado');
    const numCartao = document.getElementById('numcartao');
    const cvcInput = document.getElementById('cvc');
    const dataValidadeInput = document.getElementById('datavalidade');
    const enviarBtn = document.getElementById('enviarBtn');
    const cpf = document.getElementById("cpf");
    const gerarBtn = document.getElementById("gerar-btn");

    // Seleciona os elementos dos modos e os inputs de cartão
    const modoAutomatico = document.getElementById('modoAutomatico');
    const modoManual = document.getElementById('modoManual');
    const numCartaoRange = document.getElementById('numcartao');
    const numCartaoManual = document.getElementById('numcartao_manual');

    // Quando o modo Automático for selecionado
    modoAutomatico.addEventListener('change', function () {
        if (this.checked) {
            numCartaoRange.style.display = 'block';
            numCartaoManual.style.display = 'none';
            numCartaoRange.setAttribute('required', '');
            numCartaoManual.removeAttribute('required');
            atualizarNumeroFormatado(numCartaoRange.value);
        }
    });

    // Quando o modo Manual for selecionado
    modoManual.addEventListener('change', function () {
        if (this.checked) {
            numCartaoRange.style.display = 'none';
            numCartaoManual.style.display = 'block';
            numCartaoManual.setAttribute('required', '');
            numCartaoRange.removeAttribute('required');
            // Atualiza a exibição para o que estiver no input manual (inicialmente vazio)
            valorFormatado.innerText = numCartaoManual.value;
        }
    });

    // Restringe o input manual para aceitar apenas letras
    numCartaoManual.addEventListener('input', function () {
        this.value = this.value.replace(/[^a-zA-Z]/g, '');
        valorFormatado.innerText = this.value;
        updateFormState();
    });

    function formatarNumero(numero) {
        const numeroStr = numero.toString().padStart(16, '0');
        return `${numeroStr.slice(0, 4)}.${numeroStr.slice(4, 8)}.${numeroStr.slice(8, 12)}.${numeroStr.slice(12, 16)}`;
    }

    function atualizarNumeroFormatado(valor) {
        valorFormatado.innerText = formatarNumero(valor);
    }

    // Inicializa com o valor padrão
    atualizarNumeroFormatado(numCartao.value);

    // Adiciona o event listener ao input range (modo automático)
    numCartao.addEventListener('input', (event) => {
        atualizarNumeroFormatado(event.target.value);
        updateFormState();
    });

    // Formata o CVC para três dígitos
    cvcInput.addEventListener('input', (event) => {
        let value = event.target.value.replace(/\D/g, '');
        if (value.length > 3) value = value.slice(0, 3);
        event.target.value = value.padStart(3, '0');
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
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        });

        // Verifica se pelo menos três grupos de rádio foram selecionados
        const radiosGroups = ['primeiraLetra', 'segundaLetra', 'terceiraLetra', 'quartaLetra', 'quintaLetra', 'sextaLetra'];
        let filledGroups = 0;
        radiosGroups.forEach(groupName => {
            if (document.querySelector(`input[name=${groupName}]:checked`)) {
                filledGroups++;
                document.querySelector(`input[name=${groupName}]`).parentNode.classList.remove('is-invalid');
            } else {
                document.querySelector(`input[name=${groupName}]`).parentNode.classList.add('is-invalid');
            }
        });

        if (filledGroups < 3) {
            isValid = false;
        }

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

    // Adiciona os event listeners para os radios das letras, ignorando os do modoCartao
    const letterRadios = document.querySelectorAll('input[type=radio]');
    const resultado = document.getElementById('nome');

    letterRadios.forEach(radio => {
        if (radio.name === "modoCartao") return; // Ignora os radios de modo

        radio.addEventListener('change', () => {
            let concatenatedString = '';
            document.querySelectorAll('input[type=radio]:checked').forEach(checkedRadio => {
                if (checkedRadio.name === "modoCartao") return; // Ignora os radios de modo
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

// Script para abrir o modal automaticamente ao carregar a página
window.onload = function () {
    var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
    myModal.show();
};
