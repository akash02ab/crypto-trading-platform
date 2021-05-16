const Holding = ({ invoice }) => {
    const {
        name, 
        amount, 
        price,
        currentPrice
    } = invoice;

    const totalpaid = amount * price;
    const currentvalue = amount * currentPrice;
    const profitLoss =  currentvalue - totalpaid;
    
    return (
        amount > 0 ?
        <div className="holding">
            <p>{name} : {amount}</p>
            <p>Total Paid : ${totalpaid.toFixed(4)}, Current Value : ${currentvalue.toFixed(4)}</p>
            <p className={profitLoss > 0 ? 'profit' : 'loss'}>P/L : ${profitLoss.toFixed(4)}</p>
        </div>
        :
        null
    )
}

export default Holding;