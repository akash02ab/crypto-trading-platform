const Coin = ({ info, clickHandler }) => {
    const { 
        image, 
        ath,
        name,
        market_cap_change_percentage_24h : change
    } = info;

    return (
        <div className="coin" onClick={() => clickHandler(info)}>
            <div className="logo">
                <img src={ image } alt="coin-logo" />
            </div>
            <div className="info">
                <h2>${ ath }</h2>
                <h3>{ name }</h3>
                <p>Last 24h: <span className={change < 0 ? 'loss' : 'profit'}>{ change }</span>%</p>
            </div>
        </div>
    );
}

export default Coin;