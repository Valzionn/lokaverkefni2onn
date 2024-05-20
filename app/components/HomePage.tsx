import { useNavigate } from "react-router-dom"

const HomePage: React.FC = () => {
    const navigate = useNavigate()

    const startOrder = () => {
        navigate('/menu')
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button onClick={startOrder}></button>
        </div>
    )
}

export default HomePage;