import Transaction from './Transaction';
import '../styles/transaction.css';

const Transactions = ({ transaction }) => transaction.length ? transaction.map((currTrans, index) => <Transaction invoice={currTrans} key={index}/>) : <p>No Transaction Yet...</p>;

export default Transactions;