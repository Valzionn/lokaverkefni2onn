import { useEffect, useState } from "react"
import { fetchLatestOrder } from "./api"

const ReceiptPage: React.FC = () => {
    const [order, setOrder] = useState<any>(null)

    useEffect(() => {
        fetchOrder()
    }, [])

    const fetchOrder = async () => {
        try {
            const data = await fetchLatestOrder()
            setOrder(data)
        } catch (error) {
            console.error('Error fetching order:', error)
        }
    }

    if (!order) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>Kvittun</h1>
            <div>
                <h2>Matur: {order.meal}</h2>
                <h2>Drykkur: {order.drink}</h2>
                <h2>Samtals: {order.total}</h2>
            </div>
        </div>
    )
}

export default ReceiptPage;