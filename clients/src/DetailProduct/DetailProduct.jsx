import React, { useContext } from 'react'
import { GlobalState } from '../GlobalState'
import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import ProductDetail from '../components/ProductDetails';
function DetailProduct() {
    const state = useContext(GlobalState);
    const { id } = useParams();
    const [products, setProducts] = state.productAPI.products;
    return (
        <>
            <Container
                sx={{

                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',

                }}
            >
                {
                    products.map((element) => {
                        if (element._id === id) {
                            return <ProductDetail key={element._id} element={element}></ProductDetail>

                        }
                    })
                }
            </Container>
        </>
    )
}
export default DetailProduct