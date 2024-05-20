import { useState } from "react"
import { createOrder } from "../api"
import { useNavigate } from "react-router-dom"

const OrderPage: React.FC = () => {
    const [time, setTime] = useState('')
    const [place, setPlace] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
  
    const handleOrder = async () => {
      try {
        await createOrder({ time, place, email })
        navigate('/receipt')
      } catch (error) {
        console.error('Error placing order:', error)
      }
    }
  
    return (
      <div>
        <h1>Order Details</h1>
        <label>
          Time:
          <input type="datetime-local" value={time} onChange={(e) => setTime(e.target.value)} />
        </label>
        <label>
          Place:
          <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button onClick={handleOrder}>Place Order</button>
      </div>
    )
  }
  
  export default OrderPage