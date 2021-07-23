import Web3 from 'web3';

const web3 = new Web3(window.ethereum);
const xyz = async() => {
  await window.ethereum.enable();
};
xyz();
export default web3;
