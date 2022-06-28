//Librerías
const axios = require("axios");
//Constantes y variables
const baseUrl = "https://rooftop-career-switch.herokuapp.com";

//Obtiene Token
async function getToken(email) {
  try {
    const response = await axios.get(baseUrl + "/token?email=" + email);
    const token = response.data.token;
    return token;
  } catch (error) {
    console.log(error);
  }
}

//Obtiene los bloques desordenados
async function getBlocks(token) {
  try {
    const response = await axios.get(baseUrl + "/blocks?token=" + token);
    const blocksArray = response.data.data;
    return blocksArray;
  } catch (error) {
    console.log(error);
  }
}

//Devuelve un array con los bloques ordenados
async function check(blocksArray, token) {
  let orderedBlock = [];
  try {
    orderedBlock.push(blocksArray[0]); //La 1ra posición siempre es correcta, agrego elemento al arreglo ordenado
    blocksArray.shift(); //Elimino 1er elemento ordenado del arreglo desordenado

    while (blocksArray.length != 0) {
      let block1 = orderedBlock[orderedBlock.length - 1]; //Obtengo último elemento ordenado

      for (let i = 0; i < blocksArray.length; i++) {
        const element = blocksArray[i];
        let body = { blocks: [block1, element] }; //2do parámetro para llamada POST
        //Verifica si dos bloque son consecutivos
        const response = await axios.post(
          baseUrl + "/check?token=" + token,
          body
        );
        let message = response.data.message;
        if (message) {
          //Si dos bloques son consecutivos, agrego elemento al arreglo ordenado y lo elimino del desorenado
          orderedBlock.push(element);
          blocksArray = blocksArray.filter((block) => block != element);
          break;
        }
      }
    }
    return orderedBlock;
  } catch (error) {
    console.log(error);
  }
}

//Verifica si el mensaje está ordenado correctamente
async function checkOrder(token, orderedArray) {
  try {
    let result = "";
    for (let i = 0; i < orderedArray.length; i++) {
      result += orderedArray[i];
    }
    let body = { encoded: result }; //2do parámetro para llamada POST
    const response = await axios.post(baseUrl + "/check?token=" + token, body);
    let message = response.data.message;
    if (message) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}

async function main(userEmail) {
  let userToken = await getToken(userEmail);
  //console.log(userToken);

  let userArray = await getBlocks(userToken);
  console.log(userArray);

  let userOrderedArray = await check(userArray, userToken);
  console.log(userOrderedArray);

  let userOrderOk = checkOrder(userToken, userOrderedArray);
  if (userOrderOk) {
    console.log("Ordenado");
  } else {
    console.log("Desordenado");
  }
}

function sum(a, b) {
  return a + b;
}

module.exports = {
  main,
  check,
  sum
}
