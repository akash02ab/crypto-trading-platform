import { createContext } from "react";

const Invoice = createContext({
    name: 'coin',
    amount: 0,
    price: 0,
    time: Date()
});

export default Invoice;