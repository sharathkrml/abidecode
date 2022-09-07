import { ethers } from "ethers";

let abiCoder = ethers.utils.defaultAbiCoder;

let encoded =
  "0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000009f0f97064ec82b21706c097fadbfe25151640da000000000000000000000000000000000000000000000000000000000000271000000000000000000000000000000000000000000000000000000000000000010000000000000000000000001cf0df2a5a20cd61d68d4489eebbf85b8d39e18a00000000000000000000000000000000000000000000000000000000000000fa";
console.log(encoded.length);
let converted = encoded.slice(2);
for (let i = 0; i < converted.length; i += 64) {
  console.log(i, i + 64, converted.slice(i, i + 64));
}
// V1
// 322 -> 246  =>192
// 450 -> 246 => 192
// 578 -> 24a => 192

// v2
// for length 514 ->268 =>  256
// for length 642 => 24a = 256 , 24c => 256
// for length 512 => index = 256
let payoutLengthStartingIndex = 256;
// if (converted.length > 576) {
//   payoutLengthStartingIndex = 256;
// }
let decoded = abiCoder.decode(
  ["uint256"],
  "0x" +
    converted.slice(payoutLengthStartingIndex, payoutLengthStartingIndex + 64)
);
let payoutLength = parseInt(decoded);
console.log("payoutLength = " + payoutLength);
let originFeeLengthStartIndex =
  payoutLength * 128 + (payoutLengthStartingIndex + 64);
// console.log(converted.slice(originFeeLengthStartIndex,originFeeLengthStartIndex+64))
// decoded = abiCoder.decode(["uint256"],"0x"+converted.slice(originFeeLengthStartIndex,originFeeLengthStartIndex+64))
// let originFeeLength = (parseInt(decoded))
// console.log("originFeeLength=",originFeeLength)

console.log("---------OriginFees -----");
for (let i = originFeeLengthStartIndex + 64; i < converted.length; i += 128) {
  let fee = "0x" + converted.slice(i + 64, i + 128);
  decoded = abiCoder.decode(["uint256"], fee);
  let amt = parseInt(decoded);
  console.log(amt);
}
