import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const DrinkPage: React.FC = () => {
    const [drinks, setDrinks] = useState<any[]>([])
    const [selectedDrink, setSelectedDrink] = useState<any>(null)
    const navigate = useNavigate()

    useEffect(() => {
        fetchDrinks()
    }, [])

    const fetchDrinks = async () => {
        try {
            const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
            const data = await response.json()
            setDrinks(data.drinks)
        } catch (error) {
            console.error('Error fetching drinks:', error)
        }
    }

    const handleSelectDrink = (drink: any) => {
        setSelectedDrink(drink)
    }

    const handleContinue = () => {
        if (selectedDrink) {
            navigate('/order')
        }
    }

    return (
        <div>
            <h1>Select a Drink</h1>
            <div>
                {drinks.map((drink) => (
                    <div key={drink.idDrink} onClick={() => handleSelectDrink(drink)}>
                        <h2>{drink.strDrink}</h2>
                        <img src={drink.strDrinkThumb} alt={drink.strDrink} />
                    </div>
                ))}
            </div>
            <button onClick={handleContinue} disabled={!selectedDrink}>Continue</button>
        </div>
    )
}

export default DrinkPage;