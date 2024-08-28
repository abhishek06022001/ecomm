import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
export default function MediaCard({ element, isAdmin }) {   
    return (
        <Card sx={{ maxWidth: 345, backgroundColor: '#e0e0e0' }}>
            <CardMedia
                sx={{ height: 240 }}
                image={element.image.url}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="p" component="div">
                    {element.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Price is : ${element.price}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-evenly', }}>
                <Link to={`/product/detail/${element._id}`} style={{ textDecoration: 'none' }}>
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
                        View
                    </button>
                </Link>
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
                        Buy
                    </button>
                </Link>

            </CardActions>
        </Card >
    );
}
