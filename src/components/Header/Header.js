import React from "react";

import "./Header.css";

import HeaderLogo from "../../assets/crown.png";

import Searchbar from "./Searchbar/Searchbar";
import Account from "./Account/Account";
import { useNavigate, Link } from "react-router-dom";
import CartButton from "./Cart/CartButton";
import Orders from "./Orders/Orders";
import WishList from "./Wishlist/WishList";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header__logo__Wrapper">
        <img
          className="header__logo"
          onClick={() => navigate("/home", { replace: true })}
          src={HeaderLogo}
          alt="headerLogo"
        />
      </div>
      <div className="header__search">
        <Searchbar />
      </div>
      <div className="header__right">
        <div>
          <Account />
        </div>
        <div>
          <Orders />
        </div>
        <div>
          <Link className="wishlist__link" to="/wishlist">
            Wishlist
          </Link>
        </div>
        <div className="header__cart">
          <CartButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
