import './styles.scss';

import { useState, useEffect } from 'react';

// Helpers
import {
    getCustomerInCartTotalProductsQty,
    getCustomerInCartTotalProductPrice,
} from '../../helpers/customerHelper';

// Components
import CardMini from '../../components/Cards/CardMini';
import Chart from '../../components/Chart';
import CardTable from '../../components/Cards/CardTable';

const Homepage = (props) => {
    const [clientsCart, setClientsCart] = useState([]);
    const [clientsTotal, setClientsTotal] = useState(0);

    useEffect(() => {
        const zzz = async () => {
            let customers = await fetch('http://localhost:3001/api/v1/customers');
            customers = await customers.json();

            customers.customers.forEach(async (customer) => {
                let cartQty = getCustomerInCartTotalProductsQty(customer);
                let cartPrice = await getCustomerInCartTotalProductPrice(customer);
            });
        };

        zzz();

        /* fetch('http://localhost:3001/api/v1/customers')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);

                let customersCartTable = [];

                data.customers.forEach((customer) => {
                    let cartQty = getCustomerInCartTotalProductsQty(customer);
                    console.log(cartQty);
                });

                setClientsTotal(data.count);
                //setClientsCart(data);
            }); */
    }, [clientsCart, clientsTotal]);

    return (
        <>
            <section className="welcomeMessage">
                <h1>Dashboard</h1>
            </section>

            <section className="section-pills row">
                <CardMini title="Total de productos" value="33" />
                <CardMini title="Total de ventas" value="33" />
                <CardMini title="Cantidad de clientes" value={clientsTotal} />
                <CardMini title="Clientes conectados" value="33" />
            </section>

            <section className="section-revenue row">
                <Chart />

                <CardTable heads={['Cliente', 'Cantidad', 'Total']} data={clientsCart} />
            </section>
        </>
    );
};

export default Homepage;
