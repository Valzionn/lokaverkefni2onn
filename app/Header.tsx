import { NavLink } from "react-router-dom";
import React from "react";


const Header = () => {
    const links = [
        {
            to: "/", label: "Home", isActive
                : true
        },
        {
            to: "/menu", label: "Menu", isActive
                : true
        },
        {
            to: "/drink", label: "Drinks", isActive
                : true
        },
        {
            to: "/order", label: "Order", isActive
                : true
        },
        {
            to: "/receipt", label: "Receipt", isActive
                : true
        }
    ];

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, isActive
        : boolean) => {
        if (isActive

        ) {
            e.preventDefault();
        }
    };

    return (
        <header>
            <img src="./lb-logo.png" alt="logo" />
            <nav>
                <ul>
                    {links.map((link) => (
                        <li key={link.to}>
                            <NavLink
                                to={link.to}
                                className={({ isActive, isPending }) =>
                                    `${isActive ? "active" : ""} ${isPending ? "pending" : ""} ${link.isActive
                                        ? "disabled" : ""}`
                                }
                                onClick={(e) => handleLinkClick(e, link.isActive

                                )}
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