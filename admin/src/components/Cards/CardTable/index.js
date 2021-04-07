import './styles.scss';

const cardTable = (props) => {
    return (
        <div className="cardTable cardTable-productsInCart">
            <h2>
                Productos en carrito
            </h2>

            <table width="100%" cellSpacing="0" cellPadding="0" border="0">
                <tbody>
                    <tr>
                        {
                            props.heads.map((head, i) => {
                                return <th key={i}>{head}</th>
                            })
                        }
                    </tr>
                    {
                        props.data.map((rowData, i) => {

                            if(i < 7) {
                                return (
                                    <tr key={i}>
                                        {rowData.map((data, i) => {
                                            return (
                                                <td key={i}>{data}</td>
                                            )
                                        })}
                                    </tr>
                                )
                            } 
                        })
                    }
                </tbody>
            </table>

        </div>
    );
};

export default cardTable;
