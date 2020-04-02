import React from "react";
import { navigate, usePath } from "hookrouter";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import BannerImage from "../img/banner.png";
import { ReactComponent as BankIcon } from "../img/bank.svg";
import { ReactComponent as FundsIcon } from "../img/funds.svg";
import { ReactComponent as ListIcon } from "../img/list.svg";
import { ReactComponent as SettingsIcon } from "../img/settings.svg";

interface INavigationProps {
  inGame: boolean;
  isBanker: boolean;
}

interface INavbarLink {
  active: boolean;
  title: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  path: string;
}

const Navigation: React.FC<INavigationProps> = ({ inGame, isBanker }) => {
  const currentPath = usePath();

  const navbarLinks: INavbarLink[] = [
    {
      path: "/funds",
      active: inGame,
      title: "Funds",
      icon: FundsIcon
    },
    {
      path: "/history",
      active: inGame,
      title: "History",
      icon: ListIcon
    },
    {
      path: "/bank",
      active: inGame && isBanker,
      title: "Bank",
      icon: BankIcon
    },
    {
      path: "/settings",
      active: inGame && isBanker,
      title: "Settings",
      icon: SettingsIcon
    }
  ];

  const goTo = (location: string) => () => navigate(location);

  return (
    <Navbar bg="light" variant="light" sticky="top">
      <Container>
        <Navbar.Brand onClick={goTo("/")} className="mr-1">
          <img
            src={BannerImage}
            height="30"
            className="d-inline-block align-top"
            alt="Monopoly Money Banner Logo"
            style={{ cursor: "pointer" }}
          />
        </Navbar.Brand>
        <Nav className="mr-auto">
          {navbarLinks
            .filter(link => link.active)
            .map(link => {
              const Icon = link.icon;
              return (
                <Nav.Link
                  key={link.path}
                  href="#"
                  onClick={goTo(link.path)}
                  active={currentPath === link.path}
                  className="p-0"
                >
                  <Button variant="light" title={link.title} className="d-flex ml-1">
                    <Icon style={{ height: 25, width: 25 }} />
                    <span className="ml-1 d-none d-sm-inline">{link.title}</span>
                  </Button>
                </Nav.Link>
              );
            })}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
