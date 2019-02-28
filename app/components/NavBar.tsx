import * as React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';

const initialState = { isOpen: false };
type State = Readonly<typeof initialState>;

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
                <NavLink tag={RRNavLink} exact={true} to="/">
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} exact={true} to="/todo">
                  ToDo
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} exact={true} to="/search">
                  Reddit Search
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} exact={true} to="/map">
                  Map
                </NavLink>
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
