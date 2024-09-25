const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function getbalance(address){
    const url = `https://blockchain.info/balance?active=${address}`;
    
    const res = await axios.get(url);
    const data = res.data;
    
    if(data[address])
    {
        const balance = data[address].final_balance;
        console.log(`Balance for address ${address}: ${balance / 1e8} BTC`);
    }  else {
        console.log('Invalid address or no balance found.');
    }
}

rl.question('Enter address:',(address) => {
    getbalance(address).then(()=>{
        rl.close();
    });
});
