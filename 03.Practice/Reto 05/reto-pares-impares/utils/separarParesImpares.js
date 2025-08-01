
function separarParesImpares(original) {
    let pares = [];
    let impares = [];

    for(const num of original) {
        if (num % 2 === 0) {
            pares.push(num);
        } else {
            impares.push(num);
        }
    }

    return { original, pares, impares };
}; 


export default separarParesImpares; 



