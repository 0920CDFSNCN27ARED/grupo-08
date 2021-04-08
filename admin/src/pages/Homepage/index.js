import './styles.scss';

import { useState, useEffect } from 'react';

// Components
import CardMini from '../../components/Cards/CardMini';
import Chart from '../../components/Chart';
import CardTable from '../../components/Cards/CardTable';

const Homepage = (props) => {
    const [clientsCart, setClientsCart] = useState([]);
    const [clientsTotal, setClientsTotal] = useState(0);
    const [productsTotal, setProductsTotal] = useState(0);

    // Clients total
    useEffect(() => {
        // Perdon lenny del futuro
        const zzz = async () => {
            let customers = await fetch('http://localhost:3001/api/v1/customers');
            customers = await customers.json();

            setClientsTotal(customers.count);
        };

        zzz();
    }, []);

    // clientsCart
    useEffect(() => {
        // Perdon lenny del futuro
        const zzz = async () => {
            let customers = await fetch('http://localhost:3001/api/v1/customers');
            customers = await customers.json();

            setClientsTotal(customers.count);

            let qqqqq = [];
            customers.customers.forEach(async (customer, i) => {
                let customerCart = await fetch(
                    `http://localhost:3001/api/v1/customers/${customer.id}/cart`
                );
                customerCart = await customerCart.json();

                let algo = [
                    `${customer.firstName} ${customer.lastName}`,
                    customerCart.data.cartQty,
                    customerCart.data.cartTotal,
                ];

                qqqqq.push(algo);

                if (customers.customers.length - 1 == i) {
                    setClientsCart(qqqqq);
                }
            });
        };

        zzz();
    }, []);

    // productsTotal
    useEffect(() => {
        // tRae datos
        fetch('http://localhost:3001/api/v1/products')
            .then((res) => res.json())
            .then((data) => {
                setProductsTotal(data.count);
            });
    }, []);

    return (
        <>
            <section className="welcomeMessage">
                <h1>Dashboard</h1>
            </section>

            <section className="section-pills row">
                <CardMini title="Total de productos" value={productsTotal} />
                <CardMini title="Total de ventas" value="4" />
                <CardMini title="Cantidad de clientes" value={clientsTotal} />
                <CardMini title="Clientes conectados" value="0" />
            </section>

            <section className="section-revenue row">
                <Chart />

                <CardTable heads={['Cliente', 'Cantidad', 'Total']} data={clientsCart} />
            </section>
        </>
    );
};

export default Homepage;
