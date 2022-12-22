//primero importo crypto
const crypto = require('crypto');
const password="elPasswordQu3Qu1eroHashear"
//funcion que va a encriptar el string que le pase por parametro
function hashearPasword(palabra) {
    return(
        //primero le paso el algoritmo a usar sha256 es de los mas comunes
        crypto.createHash('sha256')
        //le paso el string con update
        .update(palabra)
        //le paso el tipo de encoding hex es de los mas comunes retorna en hexadecimal
        .digest("hex"))
}
//si lo ejecutan ven el resultado del password
console.log(hashearPasword(password))

