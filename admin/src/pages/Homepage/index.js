import './styles.scss';

import CardMini from '../../components/Cards/CardMini';

const Homepage = (props) => {
    return (
        <>
            <section className="welcomeMessage">
                <h1>Dashboard</h1>
            </section>

            <section className="section-pills row">
                <CardMini
                    title="Total de productos"
                    value="33"
                />
                <CardMini
                    title="Total de ventas"
                    value="33"
                />
                <CardMini
                    title="Cantidad de clientes"
                    value="33"
                />
                <CardMini
                    title="Clientes conectados"
                    value="33"
                />
            </section>

            <section className="section-revenue row">
                <div className="chart">
                    
                </div>

            </section>

            

            
            
            
        </>
    );
};

export default Homepage;
