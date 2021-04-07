// A partir de un objeto cliente retorna un int
// con la cantidad total de productos en su carrito
export const getCustomerInCartTotalProductsQty = (customer) => {
    let customerCart = customer.inCart == null ? [] : JSON.parse(customer.inCart);
    let customerCartCounter = customerCart.reduce((accum, product) => {
        return product.qty + accum;
    }, 0);

    return customerCartCounter;
};

export const getCustomerInCartTotalProductPrice = async (customer) => {
    let customerCart = customer.inCart == null ? [] : JSON.parse(customer.inCart);

    let pr = [
        {
            pid: 8,
            qty: 1,
        },
    ];
    customerCart.forEach((item) => {
        // ya no se que estoy haciendo!
        // Lenny palmaditas inout
    });
    console.log(products);
};
