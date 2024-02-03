import { useContext, useEffect, useState } from "react";
import Invoice from "../contexts/Invoice";
import "../styles/form.css";

let disable = 'disable';
  
const Form = ({ balance, hide, setHide, formSubmitHandler, holding }) => {
    const [trail, setTrail] = useState('Buy');
    const [charged, setCharged] = useState(0);
    const [amount, setAmount] = useState(0);
    const { invoice, setInvoice } = useContext(Invoice);
    const { name, price, currentPrice } = invoice;
    
    let limit = balance / price;

    const setLimitForSell = () => {
        if(trail === 'Sell') {
            let found = false;
            for(let currentHolding of holding) {
                if(currentHolding.name === name) {
                    let holdingAmount = currentHolding.amount;
                    limit = parseFloat(holdingAmount);
                    found = true;
                }
            }
            if(!found) {
                limit = 0;
            }
        }
    }

    setLimitForSell();
    
    if(amount <= 0 || isNaN(amount)) {
        disable = ('disable');
    }
    else if(trail === 'Buy' && charged > balance) {
        disable = ('disable');
    }
    else if(trail === 'Sell' && amount > limit) {
        disable = ('disable');
    }
    else {
        disable = ('');
    }
    
    const close = () => {
        setHide('hide');
    }

    const changeHandler = (event) => {
        let value = event.target.value;
        let charge = 0;
        if (trail === 'Buy') {
            charge = value * price;
        } else {
            charge = value * currentPrice;
        }
        setAmount(value);
        setCharged(charge);
    }
    
    const clickHandler = (event) => {
        setTrail(event.target.value);
    }

    const submit = () => {
        if(disable === '') {
            setInvoice({...invoice, trade: trail, amount: amount, time: new Date()});
            close();
            formSubmitHandler({...invoice, trade: trail, amount: amount, time: new Date()});
        }
    }

    useEffect(() => {
        setAmount(0);
    }, [hide]);

    return (    
        <div className={`form-container`}>
            <div className="label">
                <h2>Buy { name }</h2>
                <button onClick={close}>x</button>
            </div>
            <div className="content">
                <p>Current Price: ${price}</p>
                <div className="content-limit">
                    <input type="number" name="buy" min="0" value={amount} onChange={(e) => changeHandler(e)} />
                    <p>Max: { limit.toFixed(4) }</p>
                </div>
                <p className="charged">You will be charged: ${ charged.toFixed(4) }</p>
                <ul>
                    <label htmlFor="Buy">
                        <input type="radio" name="trail" value="Buy" checked={trail==='Buy'} onClick={(e) => clickHandler(e)}/>
                        Buy
                    </label>
                    <label htmlFor="Sell">
                        <input type="radio" name="trail" value="Sell" checked={trail==='Sell'} onClick={(e) => clickHandler(e)}/>
                        Sell 
                    </label>
                </ul>
                <button className={`btn ${disable}`} onClick={submit}>{ trail }</button>
            </div>
        </div>
    );
}

export default Form;