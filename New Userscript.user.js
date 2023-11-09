// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://cripto.tiiny.site/
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js#sha512-a+SUDuwNzXDvz4XrIcXHuCf089/iJAoN4lmrXJg18XnduKK6YlDHNRalv4yd1N40OKI80tFidF+rqTFKGPoWFQ==
// @icon         https://www.google.com/s2/favicons?sz=64&domain=instructure.com
// @grant        none
// ==/UserScript==

(function() {

    function extraerMayusculas(texto) {
        const mayusculas = texto.match(/[A-Z]/g);
        if (mayusculas) {
            return mayusculas.join('');
        }
        return '';
    }

    function descifrarMensajeCifrado(mensajeCifrado, clave) {
        const mensajeCifradoB64 = CryptoJS.enc.Base64.parse(mensajeCifrado);
        const decryptedData = CryptoJS.TripleDES.decrypt({ ciphertext: mensajeCifradoB64 }, CryptoJS.enc.Utf8.parse(clave), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return decryptedData.toString(CryptoJS.enc.Utf8);
    }

    const contenidoPagina = document.body.textContent;
    const clave = extraerMayusculas(contenidoPagina);


    const divs = document.querySelectorAll('div');


    divs.forEach(div => {
        const mensajeCifrado = div.id;
        const mensajeDescifrado = descifrarMensajeCifrado(mensajeCifrado, clave);


        const mensajeDescifradoElemento = document.createElement('div');
        mensajeDescifradoElemento.textContent = `${mensajeDescifrado}`;


        div.appendChild(mensajeDescifradoElemento);


        console.log(`Contenido descifrado y decodificado del div con ID '${div.id}': ${mensajeDescifrado}`);
    });
})();