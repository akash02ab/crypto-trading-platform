import { useEffect, useState } from 'react';
import Coins from './Coins';
import Holdings from './Holdings';
import Transactions from './Transactions';
import Form from './Form';
import Invoice from '../contexts/Invoice';


const API = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false";

const App = () => {
    const [market, setMarket] = useState([]);
    const [wallet, setWallet] = useState(100);
    const [portfolio, setPortfolio] = useState(0);
    const [transaction, setTransaction] = useState([]);
    const [holding, setHolding] = useState([]);
    const [hide, setHide] = useState('hide');
    const [invoice, setInvoice] = useState({
        name: null,
        amount: null,
        price: null,
        currentPrice: null,
        trade: null,
        time: null
    });

    const getData = async () => {
        let response = await fetch(API);
        let data = await response.json();
        setMarket(data);
    }

    const clickHandler = (current) => {
        setInvoice({...invoice, name: current.name, price: current.ath, currentPrice: current.current_price});
        setHide('');
    }

    const formSubmitHandler = (currentInvoice) => {
        if(currentInvoice.amount <= 0) return;

        if(currentInvoice.trade === 'Buy') {
            setWallet(wallet - currentInvoice.amount * currentInvoice.price);
            setPortfolio(portfolio + currentInvoice.amount * currentInvoice.currentPrice);
        }
        else {
            setWallet(wallet + currentInvoice.amount * currentInvoice.currentPrice);
            setPortfolio(portfolio - currentInvoice.amount * currentInvoice.currentPrice);
        }
        
        
        setTransaction([...transaction, {...currentInvoice}]);

        let found = false;
        let holdingCopy = [...holding];
        for(let currentHolding of holdingCopy) {
            if(currentHolding.name === currentInvoice.name) {
                if(currentInvoice.trade === 'Buy') {
                    currentHolding.amount = parseFloat(currentHolding.amount) + parseFloat(currentInvoice.amount);
                }
                else if(currentInvoice.trade === 'Sell') {
                    currentHolding.amount = parseFloat(currentHolding.amount) - parseFloat(currentInvoice.amount);
                }
                currentHolding.time = currentInvoice.time;
                setHolding(holdingCopy);
                found = true;
                break;
            }
        }

        if(!found) {
            setHolding([...holding, currentInvoice]);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="container">
            <h1>Earn some virtual money 💰</h1>
            <p>To buy virtual food 🍕</p>
            <h3>🏦 Wallet: ${wallet.toFixed(2)}</h3>
            <h2>Portfolio Value: ${portfolio.toFixed(2)}</h2>
            <Invoice.Provider value={{ invoice, setInvoice }}> 
                <div className="coins">
                    <Coins market={market} clickHandler={clickHandler} />
                </div>
                
                <div className={`form ${hide}`}>
                    <Form 
                        balance={wallet} 
                        hide={hide} 
                        setHide={setHide} 
                        formSubmitHandler={formSubmitHandler}
                        holding={holding}
                    />
                </div>
            </Invoice.Provider>

            <div className="h-n-t">
                <div className="holdings">
                    <h1>Current Holdings</h1>
                    <Holdings holding={holding} />
                </div>
                <div className="transactions">
                    <h1>Transactions</h1>
                    <Transactions transaction={transaction} />
                </div>
            </div>
        </div>
    );
}

export default App;