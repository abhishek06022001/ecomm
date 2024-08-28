import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left', // Ensures text alignment
    minHeight: '10rem',
    color: theme.palette.text.secondary,
    [theme.breakpoints.up('md')]: {
        minHeight: '20rem',
    },
}));

function ProductDetail({ element }) {
    return (
        <>
            <Box sx={{ flexGrow: 1, marginTop: '4rem' }}>
                <Grid container spacing={2} columns={16}>
                    <Grid item xs={16} md={8}>
                        <Item sx={{ display: 'flex', alignItems: 'center' }}>
                            <img src={element.image.url} alt="" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                        </Item>
                    </Grid>
                    <Grid item xs={16} md={8}>
                        <Item sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-center' }}>
                            <h1>Item Name : {element.name}</h1>
                            <h1>Price  : ${element.price}</h1>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus voluptas consequatur rem quasi, reprehenderit numquam blanditiis animi suscipit. Perferendis assumenda accusantium quia odit fuga culpa dolor possimus ipsam voluptatum consequuntur.</p>
                            <p>Category name is </p>
                            <Link to={`/product/buy/${element._id}`} style={{ textDecoration: 'none' }}>
                                <button
                                    style={{
                                        width: '6rem',
                                        height: '2rem',
                                        backgroundColor: '#6200ea',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '4px',
                                        fontSize: '1rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                        outline: 'none',
                                        position: 'relative',
                                        marginTop: '2rem'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#3700b3';
                                        e.currentTarget.style.transform = 'scale(1.05)';
                                        e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#6200ea';
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                                    }}
                                >
                                    Buy Now
                                </button>
                            </Link>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default ProductDetail;
