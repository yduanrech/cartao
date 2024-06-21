document.addEventListener('DOMContentLoaded', (event) => {
    const valorFormatado = document.getElementById('valorFormatado');
    const numCartao = document.getElementById('numcartao');
    const cvcInput = document.getElementById('cvc');
    const dataValidadeInput = document.getElementById('datavalidade');

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

    // Impede a inserção de caracteres especiais no input do tipo text
    dataValidadeInput.addEventListener('input', (event) => {
        dataValidadeInput.value = dataValidadeInput.value.replace(/[^a-zA-Z]/g, '');
    });


    
});

function Random() {
    var rnd = Math.floor(Math.random() * 999999999);
    document.getElementById('random').value = rnd;
}


// Obtém os elementos apenas uma vez no início
const cpf = document.getElementById("cpf");
const gerarBtn = document.getElementById("gerar-btn");

function gerarCpf() {
  const num1 = aleatorio(); // aleatorio já devolve string, logo não precisa de toString
  const num2 = aleatorio();
  const num3 = aleatorio();

  const dig1 = dig(num1, num2, num3); // agora só uma função dig
  const dig2 = dig(num1, num2, num3, dig1); // mesma função dig aqui

  // Aqui com interpolação de strings fica bem mais legível
  return `${num1}.${num2}.${num3}-${dig1}${dig2}`;
}

// O quarto parâmetro (n4) só será recebido para o segundo dígito
function dig(n1, n2, n3, n4) { 
  // As concatenações todas juntas uma vez que são curtas e legíveis
  const nums = n1.split("").concat(n2.split(""), n3.split(""));
  
  if (n4 !== undefined){ // Se for o segundo dígito, coloca o n4 no lugar certo
    nums[9] = n4;
  }
  
  let x = 0;
  // O j é também iniciado e incrementado no for para aproveitar a própria sintaxe dele
  // O i tem inícios diferentes conforme é 1º ou 2º dígito verificador
  for (let i = (n4 !== undefined ? 11 : 10), j = 0; i >= 2; i--, j++) {
    x += parseInt(nums[j]) * i;
  }
  
  const y = x % 11;
  // Ternário aqui pois ambos os retornos são simples e continua legível
  return y < 2 ? 0 : 11 - y; 
}

function aleatorio() {
  const aleat = Math.floor(Math.random() * 999);
  // O preenchimento dos zeros à esquerda é mais fácil com a função padStart da string
  return ("" + aleat).padStart(3, '0'); 
}

// Atualiza o campo de CPF com um valor gerado inicialmente
//cpf.value = gerarCpf();

// Adiciona o evento de clique ao botão para gerar um novo CPF
gerarBtn.addEventListener("click", () => {
  cpf.value = gerarCpf();
});


document.addEventListener('DOMContentLoaded', (event) => {
    const radios = document.querySelectorAll('input[type=radio]');
    const resultado = document.getElementById('resultado');

    radios.forEach(radio => {
        radio.addEventListener('change', () => {
            let concatenatedString = '';

            document.querySelectorAll('input[type=radio]:checked').forEach(checkedRadio => {
                concatenatedString += checkedRadio.value;
            });

            resultado.textContent = concatenatedString;
        });
    });
});

