import { NavLink } from "react-router-dom";
import React from "react";

const Header = () => {
    const links = [
        { to: "/", label: "Home", isDisabled: true },
        { to: "/menu", label: "Menu", isDisabled: true },
        { to: "/drink", label: "Drinks", isDisabled: true },
        { to: "/order", label: "Order", isDisabled: true },
        { to: "/receipt", label: "Receipt", isDisabled: true }
    ];

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, isDisabled: boolean) => {
        if (isDisabled) {
            e.preventDefault();
        }
    };

    return (
        <header>
            <nav>
                <ul>
                    {links.map((link) => (
                        <li key={link.to}>
                            <NavLink
                                to={link.to}
                                className={({ isActive, isPending }) =>
                                    `${isActive ? "active" : ""} ${isPending ? "pending" : ""} ${link.isDisabled ? "disabled" : ""}`
                                }
                                onClick={(e) => handleLinkClick(e, link.isDisabled)}
                            >
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;