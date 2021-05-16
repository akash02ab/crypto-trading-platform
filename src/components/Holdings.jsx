import Holding from './Holding';
import '../styles/holding.css';

const Holdings = ({ holding }) => holding.length ? holding.map((invoice, index) => <Holding invoice={invoice} key={index} />) : <p>Go Buy Some ...</p>; 

export default Holdings;
