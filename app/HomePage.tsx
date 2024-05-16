import { useContext, useEffect, useState } from "react";
import { createOrder } from "./api";

function OrderForm() {
    const [email, setEmail] = useState('');
    const [order, setOrder] = useState({

    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const createdOrder = await createOrder(email, order)
            console.log('Order Created:', createOrder)
    
        } catch (error) {
            console.error('Error creating order:', error.message)
        }
    }

    return (
        
    )
}