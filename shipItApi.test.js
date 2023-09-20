"use strict";

const fetchMock = require("fetch-mock");
const { SHIPIT_SHIP_URL, shipProduct} = require("./shipItApi")

//shipItAPI.shipProduct = jest.fn();

test("shipProduct", async function () {
  fetchMock.get(`${SHIPIT_SHIP_URL}`, 4)

  const shipId = await shipProduct({
    productId: 1000,
    name: "Test Tester",
    addr: "100 Test St",
    zip: "12345-6789",
  });
  const res = await shipProduct(4)

  expect(shipId).toEqual(4);
});
