const Web3 = require('web3');

const insert_data = async (vacccount, vaccname, manuname, location, temperature) => {
  const provider = new Web3.providers.HttpProvider('https://eth-sepolia.g.alchemy.com/v2/d69A7GzFDy43ReuNG7xuzSIC9Kp8gPGw');
  const web3 = new Web3(provider);

  const contractAddress = "0x77839908D001d92008A6745a3fb6E9192FE0b040";
  const contractABI = [
    {
      inputs: [
        {
          internalType: "string",
          name: "vacccount",
          type: "string",
        },
        {
          internalType: "string",
          name: "vaccname",
          type: "string",
        },
        {
          internalType: "string",
          name: "location",
          type: "string",
        },
        {
          internalType: "string",
          name: "temperature",
          type: "string",
        },
      ],
      name: "addBox",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "boxCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "MAX_BOXES",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  const contract = new web3.eth.Contract(contractABI, contractAddress);
  const senderAddress = "0x25ea9db2213537951b351B486AfB3C0ECf313449";
  const privateKey ="8af3ef1c956f7237d737ddf3712bef5001af8a9739f3a9ce6f879b9f1ec9ba30";
  const vacc = `${vacccount}`;
  const vaccn = `${vaccname}`;
  const manu = `${manuname}`;
  const loc = `${location}`;
  const temp = `${temperature}`;

  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  web3.eth.defaultAccount = account.address;

  try {
    const transactionObject = {
      from: senderAddress,
      to: contractAddress,
      gas: 300000,
      data: contract.methods.addBox(vacc, vaccn, manu, loc, temp).encodeABI(),
    };

    const signedTransaction = await web3.eth.accounts.signTransaction(transactionObject, privateKey);
    const result = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
    console.log("Transaction successful");
    console.log('Transaction receipt:', result);
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

module.exports = insert_data;
