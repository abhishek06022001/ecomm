import React, { useContext } from 'react'
import { GlobalState } from '../GlobalState';
import MediaCard from './MediaCard';
import { CircularProgress, Container, Grid, Pagination } from '@mui/material';
function Product() {
    const state = useContext(GlobalState);
    const [products, setProducts] = state.productAPI.products;
    const [isAdmin] = state.userApi.isAdmin;
    const token = state.token;

    return (
        <div >
            <Container>
                <Grid container spacing={10} wrap='wrap'>
                    {products.map((element, index) => (
                        <Grid item xs={12} md={4} sm={6} key={index}>
                            <MediaCard element={element} isAdmin={isAdmin} />
                        </Grid>
                    ))}
                </Grid>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '4rem' }}>
                    <Pagination count={3} />
                </div>
            </Container>
        </div >

    )
}
export default Product