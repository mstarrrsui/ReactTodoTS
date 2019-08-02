import * as React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';

const initialState = { isOpen: false };
type State = Readonly<typeof initialState>;

export default class NavBar extends React.Component<{}, State> {
  readonly state: State = initialState;

  constructor(props: {}) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  private toggle(): void {
    this.setState((prevState: State) => ({
      isOpen: !prevState.isOpen
    }));
  }

  render(): React.ReactNode {
    const { isOpen } = this.state;
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">React Examples</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={RRNavLink} exact to="/">
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} exact to="/todo">
                  ToDo
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} exact to="/search">
                  Reddit Search
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} exact to="/hnsearch">
                  HN Search
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} exact to="/map">
                  Map
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
