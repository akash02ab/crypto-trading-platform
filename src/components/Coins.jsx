import Coin from './Coin';
import '../styles/coin.css';

const Coins = ({ market, clickHandler }) => market.map((coin, index) => <Coin info={coin} key={index} clickHandler={clickHandler} />);

export default Coins;