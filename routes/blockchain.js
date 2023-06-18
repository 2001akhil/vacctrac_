
const Web3 = require('web3');

const insert_data=async(vacccount,vaccname,manuname,location,temperature)=>{



// app.post('/web3', async (req, res) => {
//   res.sendFile(path.join(__dirname,'./public','index.html'));
   //const provider = new Web3.providers.HttpProvider('http://localhost:8080'); // Local Ethereum node URL
  const provider = new Web3.providers.HttpProvider('https://eth-sepolia.g.alchemy.com/v2/d69A7GzFDy43ReuNG7xuzSIC9Kp8gPGw');
  
//   const provider=new Web3(window.ethereum);
  const web3 = new Web3(provider);

  // Specify the contract address and ABI
  const contractAddress = '0x3a3d2d51B94badf765b639351B90316fc658b88e';
  const contractABI = 
  [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "vacccount",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "vaccname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "manuname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "temperature",
				"type": "string"
			}
		],
		"name": "addBox",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "boxCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MAX_BOXES",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

  // Create a contract instance
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  // Specify the account address of the sender
  const senderAddress = '0x6d6d1634a3f84D33dd91D4951C58e0Ba3328F701';

  // Specify the private key of the sender (from Metamask)
  const privateKey = '43f2c880a7841ba2f82b236f6740fe9af1c1feda39d357a393421cfa31c0ada5';

  // Prepare the data to be inserted into the contract
//   const vacccount = 'Account1';
//   const vaccname = 'Vaccine1';
//   const manuname = 'Manufacturer1';
//   const location = 'Location1';
//   const temperature = 'Temperature1';

  // Get the account object from the private key
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);

  // Set the account as the default account
  web3.eth.defaultAccount = account.address;

  try {
    // Prepare the transaction object
    const transactionObject = {
      from: senderAddress,
      to: contractAddress,
      gas: 300000, // Adjust the gas limit according to your contract's requirements
      data: contract.methods.addBox(vacccount, vaccname, manuname, location, temperature).encodeABI(),
    };
    
    // Sign the transaction with Metamask
    const signedTransaction = await web3.eth.accounts.signTransaction(transactionObject, privateKey);
    const result = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
	console.log("Transaction successful")
    console.log('Transaction receipt:', result);
    // res.send('Transaction successful');
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).send(error);
  }
}
// });

// app.listen(port, () => {
//   console.log(`port is listening ${port}`);
// });
