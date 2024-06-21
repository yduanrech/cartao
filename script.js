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
