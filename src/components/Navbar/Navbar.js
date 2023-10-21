// Thẻ dùng trong file Hero
import React, {useState} from 'react';
import { IconContext } from "react-icons";
import { BiMenu, BiX } from "react-icons/bi";
import 
{
    Nav,
    NavbarContainer,
    NavLogo,
    NavIcon,
    MenuIcon,
} from './Navbar.styles';
const Navbar = () => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    
    return (
        <div>
            <IconContext.Provider value={{ color: '#fff'}}>
                <Nav>
                    <NavbarContainer>
                        <NavLogo to="/">
                            <NavIcon/>
                            Home
                        </NavLogo>
                        <MenuIcon onClick={handleClick}>
                            {click ? <BiX/> : <BiMenu/>}
                        </MenuIcon>
                    </NavbarContainer>

                </Nav>
            </IconContext.Provider>
        </div>
    )
}

export default Navbar;
