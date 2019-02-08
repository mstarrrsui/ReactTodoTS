import * as React from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap';
import { Link } from '@reach/router';

const initialState = { isOpen: false };
type State = Readonly<typeof initialState>;

// tslint:disable-next-line:variable-name
const navLinkStyle = props => {
  const {isCurrent} = props;
  return {
    style: {
      color: '#4b4c4f',
      fontFamily: "'Roboto', sans-serif",
      fontWeight: isCurrent ? 600 : 300,
      marginLeft: '10px',
      marginRight: '10px'
    }
  };
};

const NavLink = props => <Link {...props} getProps={navLinkStyle} />;

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
                <NavLink to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/todo">ToDo</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/search">Reddit Search</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/map">Map</NavLink>
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
