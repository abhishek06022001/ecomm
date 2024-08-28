import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';
import shopify from '../assets/shopify-2.svg';
const pages = ['Products', 'Login', 'Register'];
const settings = ['Account', 'Dashboard', 'Logout'];
import { FaCartShopping } from "react-icons/fa6";
import { GlobalState } from '../GlobalState';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
function ResponsiveAppBar() {
  const navigate = useNavigate();
  const state = React.useContext(GlobalState);
  const [products, setProducts] = state.productAPI.products;


  const [isLogged, setIsLogged] = state.userApi.isLogged;
  const [isAdmin, setisAdmin] = state.userApi.isAdmin;
  const [category, setCategory] = state.categoryAPI.category;
  const [token] = state.token;
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  // for modal
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSingleProduct({ ...newProduct, image: file });

  };
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    const submitData = newProduct;
    const formData = new FormData();
    formData.append('file', newProduct.image);
    const imageDetails = await axios.post('/api/upload', formData, {
      headers: {
        Authorization: token,
      },
    });
    try {
      const newProduct = {
        product_id: submitData.product_id,
        name: submitData.product_name,
        categoryId: submitData.category,
        price: submitData.product_price,
        image: imageDetails.data
      }
      const prod = await axios.post('/api/product', newProduct, {
        headers: {
          Authorization: token,
        },
      });
      console.log("product new is ", prod);
      handleClose();
      setProducts([...products, prod.data.product]);
      setSingleProduct({
        product_name: '',
        product_id: '',
        product_price: '',
        category: 1, image: null
      });
      navigate('/');
    } catch (error) {
      console.log(error.message);

    }
  }
  const [newProduct, setSingleProduct] = React.useState({
    product_name: '',
    product_id: '',
    product_price: '',
    category: 1, image: null
  });
  const handleCategoryChange = (e) => {
    setSingleProduct({
      ...newProduct,
      category: e.target.value,
    });
  };
  const onChangeInput = (e) => {
    setSingleProduct({ ...newProduct, [e.target.name]: e.target.value })
  }
  const adminRouter = () => {
    return (
      <>
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography onClick={handleOpen} sx={{ textDecoration: 'none', color: 'inherit' }}>
            Create Product
          </Typography>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <form onSubmit={handleCreateProduct}>
                <div>
                  <h1>Enter Product Details</h1>
                </div>
                <div >
                  <TextField
                    onChange={onChangeInput}
                    id="product_id"
                    name="product_id"
                    style={{ width: "16rem", margin: "20px 0px" }}
                    label="Product Id"
                    variant="outlined"
                    InputProps={{
                      style: {
                        height: '2.5rem',
                      },
                    }}
                    value={newProduct.product_id}
                  />
                </div>
                <div >
                  <TextField
                    onChange={onChangeInput}
                    id="product_name"
                    name="product_name"
                    style={{ width: "16rem", margin: "20px 0px" }}
                    label="Product Name"
                    variant="outlined"
                    InputProps={{
                      style: {
                        height: '2.5rem',

                      },
                    }}
                    value={newProduct.product_name}
                  />
                </div>
                <div >
                  <TextField
                    onChange={onChangeInput}

                    id="product_price"
                    name="product_price"
                    style={{ width: "16rem", margin: "20px 0px" }}
                    label="$ Enter Price"
                    variant="outlined"
                    InputProps={{
                      style: {
                        height: '2.5rem',
                      },
                    }}
                    value={newProduct.product_price}
                  />
                </div>
                <div>
                  <select name="category" id="category" value={newProduct.category} onChange={onChangeInput}>
                    <option value="0">Select A Category</option>
                    {category.map((element) => {
                      return <option key={element._id} value={element._id}>{element.name}</option>
                    })}
                  </select>
                </div>
                <div>
                  <input type="file" id="image" name="image" onChange={handleFileChange} />
                </div>
                <div  >
                  <Button type="submit" variant="contained" id="submitLogin">Submit </Button>
                </div>
              </form>
            </Box>
          </Modal>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography component={Link} to="category" sx={{ textDecoration: 'none', color: 'inherit' }}>
            Categories
          </Typography>
        </MenuItem>
      </>
    )
  }
  const loggedRouter = () => {
    return (
      <>
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography component={Link} to="history" sx={{ textDecoration: 'none', color: 'inherit' }}>
            History
          </Typography>
        </MenuItem>
      </>
    )
  }
  const imgStyle = {
    width: 120,
    display: 'flex',
    '@media (max-width: 600px)': {
      display: 'none',
    },
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const logOutUser = async () => {
    await axios.get('/users/logout');
    localStorage.clear();
    //this is causing the rerender of the GlobalState dude
    setisAdmin(false);
    setIsLogged(false);
  }
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "grey.600", marginBottom: "1rem" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              width: 120,
              display: 'flex',
              '@media (max-width: 600px)': {
                display: 'none',
              },
            }}
          >
            <img src={shopify} alt="" />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography component={Link} to={`product`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                  Product
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography component={Link} to="login" sx={{ textDecoration: 'none', color: 'inherit' }}>
                  Login
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography component={Link} to="register" sx={{ textDecoration: 'none', color: 'inherit' }}>
                  Register
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >

          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography component={Link} to={`product`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                {isAdmin ? "Products" : "Shop"}
              </Typography>

            </MenuItem>
            {isAdmin && adminRouter()}
            {isLogged ? loggedRouter()
              : (
                <>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography component={Link} to="login" sx={{ textDecoration: 'none', color: 'inherit' }}>
                      Login
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography component={Link} to="register" sx={{ textDecoration: 'none', color: 'inherit' }}>
                      Register
                    </Typography>
                  </MenuItem>
                </>)
            }

          </Box>
          {isLogged ?
            <>
              <Box>
                <MenuItem>
                  <FaCartShopping />
                </MenuItem>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography component={Link} to={`Account`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                      Account
                    </Typography>
                  </MenuItem>

                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography component={Link} onClick={logOutUser} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </>
            : <></>}
        </Toolbar>
      </Container>
    </AppBar >

  );
}
export default ResponsiveAppBar;
