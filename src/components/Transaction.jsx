const Transaction = ({ invoice }) => {
    const {
        name,
        amount,
        price,
        currentPrice,
        time,
        trade
    } = invoice;

    return (
        trade === 'Buy' ?
        <div className="transaction buy">
            <p>{`${name} - ${amount} @ ${price}`}</p>
            <p>{`Paid : $${(amount * price).toFixed(4)}`}</p>
            <p>{`Brought on : ${time.toLocaleString()}`}</p>
        </div> 
        :
        <div className="transaction sell">
                <p>{`${name} - ${amount} @ ${currentPrice}`}</p>
                <p>{`Recieved : $${(amount * currentPrice).toFixed(4)}`}</p>
            <p>{`Sold on : ${time.toLocaleString()}`}</p>
        </div>
    );
};

export default Transaction;