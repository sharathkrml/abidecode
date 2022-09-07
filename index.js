import { ethers } from "ethers";

let abiCoder = ethers.utils.defaultAbiCoder;

// struct Part {
//     address payable account;
//     uint96 value;
// }

// struct DataV1 {
//     Part[] payouts;
//     Part[] originFees;
// }
let encoded =
  "0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000001cf0df2a5a20cd61d68d4489eebbf85b8d39e18a00000000000000000000000000000000000000000000000000000000000000fa";

let decoded = abiCoder.decode(
  ["tuple(tuple(address,uint96)[],tuple(address,uint96)[])"],
  encoded
);
console.log(decoded);
console.log(decoded[0]); // struct DataV1 (probably toTuple 0th element)
console.log("----------struct Part[]--------");
console.log(decoded[0][1]); //Struct part (probably toTupleArray)
decoded[0][0].forEach((element) => {
  console.log(parseInt(element[1]));
});

// struct DataV2 {
//     Part[] payouts;
//     Part[] originFees;
//     bool isMakeFill;
// }

// let decoded = abiCoder.decode(["tuple(tuple(address,uint96)[],tuple(address,uint96)[],bool)"], encoded);
