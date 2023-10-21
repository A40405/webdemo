import Navbar from '../Navbar/Navbar';
import {Button} from '../../Globalstyles';
import {
    HeroContainer,
    HeroContent,
    HeroContentText,
    HeroTitle,
    HeroTitleText,
    HeroText,
    HeroBtn,

} from './Hero.styles';

const Hero = () =>{
    return(
        <div>
           <HeroContainer>
               <Navbar/>
               <HeroContent>
                   <HeroContentText>
                        <HeroTitle>
                            <HeroTitleText>Nhật Kí Nấu Ăn</HeroTitleText>
                        </HeroTitle>
                        <HeroText> Cùng nhau cập nhật món ăn và bí quyết nấu ăn mỗi ngày nha </HeroText>
                        <HeroBtn to="/food-list">
                           <Button primary big bigFont bigRadius>Món ăn đã có</Button>
                        </HeroBtn>
                   </HeroContentText>
               </HeroContent>
           </HeroContainer>
        </div>
    )
}

export default Hero;