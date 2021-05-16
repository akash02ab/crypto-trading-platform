import { useContext, useState } from "react";
import Invoice from "../contexts/Invoice";
import "../styles/form.css";

let amount = 0;
let disable = '';
  
const Form = ({ balance, hide, setHide, formSubmitHandler, holding }) => {
    const [trail, setTrail] = useState('Buy');
    // const [disable, setDisable] = useState('');
    const [charged, setCharged] = useState(0);
    const { invoice, setInvoice } = useContext(Invoice);
    const { name, price } = invoice;
    
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
    
    const close = () => {
        setHide('hide');
    }

    const changeHandler = (event) => {
        let value = event.target.value;

        if(isNaN(value)) event.preventDefault();
        
        let charge = value * price;
        
        if(trail === 'Buy' && charge > balance) {
            disable = ('disable');
        }
        else if(trail === 'Sell' && value > limit) {
            disable = ('disable');
        }
        else {
            disable = ('');
        }
        amount = value;
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

    return (    
        <div className={`form-container ${hide}`}>
            <div className="label">
                <h2>Buy { name }</h2>
                <button onClick={close}>x</button>
            </div>
            <div className="content">
                <p>Current Price: ${price}</p>
                <div className="content-limit">
                    <input type="number" name="buy" id="coins" min="0" onChange={(e) => changeHandler(e)}/>
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