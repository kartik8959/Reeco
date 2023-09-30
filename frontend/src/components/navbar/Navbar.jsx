import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { LinkContainer } from 'react-router-bootstrap';
import { useStyles } from './Navbar.styles.js';
import { useSelector } from 'react-redux';


const Header = () => {
  const style = useStyles()
  const {orders} = useSelector((state) => state.orders);
  console.log(orders,"from hedaer")
  return (

    <Navbar className={style.navbarBg} expand='lg' collapseOnSelect>
      <Container>
        <LinkContainer to="/" style={{ color: "#fff" }}>
        <Navbar.Brand >Reeco</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/store" style={{ color: "#fff" }}>
              <Nav.Link >Store</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/order" style={{ color: "#fff" }}>
              <Nav.Link >Order</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/analytics" style={{ color: "#fff" }}>
              <Nav.Link >Analytics</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            <LinkContainer to="/cart" style={{ color: "#fff" }}>
              <Nav.Link>
                <div style={{ position: 'relative' }}>
                  <FontAwesomeIcon icon={faShoppingCart} className='me-2' />
                  <Badge
                    pill
                    bg="success" // Choose a color that suits your design
                    style={{
                      position: 'absolute',
                      top: '-11px', // Adjust this value to position the badge as needed
                      left: '-17px', // Adjust this value to position the badge as needed
                    }}
                  >
                   {orders.length}
                  </Badge>
                </div>
              </Nav.Link>
            </LinkContainer>
            <NavDropdown title={"Kartik Jodhani"} id="basic-nav-dropdown" className={style.dropdoen}>
              <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;