"use strict";

const express = require("express");
const { BadRequestError } = require("../expressError");
const router = new express.Router();

const jsonschema = require("jsonschema");
const orderSchema = require("../orderSchema.json")

const { shipProduct } = require("../shipItApi");

/** POST /ship
 *
 * VShips an order coming from json body:
 *   { productId, name, addr, zip }
 *
 * Returns { shipped: shipId }
 */

router.post("/", async function (req, res, next) {
  const validateBody = jsonschema.validate(
    req.body, orderSchema, {required: true});

    // if (req.body === undefined) {
    //   throw new BadRequestError();
    // }
    //console.log("ENTERING VALIDATION");
  if(!validateBody.valid){
    const errors = validateBody.errors.map(error => error.stack);
    //console.log("We Have Errors");
    //console.log(errors);
    throw new BadRequestError(errors);
  }

  const { productId, name, addr, zip } = req.body;
  const shipId = await shipProduct({ productId, name, addr, zip });
  return res.json({ shipped: shipId });
});


module.exports = router;