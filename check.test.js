const index = require("./index");
const axios = require("axios");

jest.mock("axios");

test("Dado un arreglo de bloques desordenados, debería devolver el arreglo ordenado", async () => {
  let disorderedArray = ["b1", "b4", "b3", "b5", "b2"];
  let orderedArray = ["b1", "b2", "b3", "b4", "b5"];
  let token = "bcalsijepo";
  axios.post.mockImplementation((url, body) => {
    let block1 = body.blocks[0];
    let block2 = body.blocks[1];
    if (
      (block1 == "b1" && block2 == "b2") ||
      (block1 == "b2" && block2 == "b3") ||
      (block1 == "b3" && block2 == "b4") ||
      (block1 == "b4" && block2 == "b5")
    ) {
      return { data: { message: true } };
    } else {
      return { data: { message: false } };
    }
  });

  let result = await index.check(disorderedArray, token);
  expect(result).toStrictEqual(orderedArray);
});
