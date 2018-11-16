import * as React from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

const initialState = { isOpen: false };
type State = Readonly<typeof initialState>;

const navLinkStyle: React.CSSProperties = {
  fontFamily: "'Roboto', sans-serif",
  fontWeight: 300,
  marginLeft: '10px',
  marginRight: '10px'
};

const activeLinkStyle: React.CSSProperties = {
  color: '#4b4c4f',
  fontWeight: 600
};

const CustomNavLink = props => (
  <NavLink {...props} style={navLinkStyle} activeStyle={activeLinkStyle} />
);

export default class NavBar extends React.Component<object, State> {
  public readonly state: State = initialState;

  constructor(props: any) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  public render() {
    return (
      <div>
        <Navbar color="light" light={true} expand="md">
          <NavbarBrand href="/">React Examples</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar={true}>
            <Nav className="ml-auto" navbar={true}>
              <NavItem>
                <CustomNavLink exact={true} to="/">
                  Home
                </CustomNavLink>
              </NavItem>
              <NavItem>
                <CustomNavLink to="/todo">ToDo</CustomNavLink>
              </NavItem>
              <NavItem>
                <CustomNavLink to="/search">Reddit Search</CustomNavLink>
              </NavItem>
              <NavItem>
                <CustomNavLink to="/map">Map</CustomNavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }

  private toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
}
