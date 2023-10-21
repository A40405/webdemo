import {
    FooterSection,
    FooterContainer,
    FooterNewsletter,
    FooterNewsletterForm,
    FooterNewsletterInput,
    FooterNewsletterTitle,
    FooterBtn,
    FooterLinkContainer,
    FooterLinkTitle,
    FooterLinks, 
    FooterLink,
    FooterCopyRight 
} from './Footer.styles';

function Footer() {
    return (
        <div>
            <FooterSection>
                <FooterContainer>
                    <FooterNewsletter>
                        <FooterNewsletterTitle>Nhập email để nhận thông tin về khóa dạy nấu ăn</FooterNewsletterTitle>
                        <FooterNewsletterForm>
                            <FooterNewsletterInput name="email" id="email" type="email" placeholder="Email address" />
                            <FooterBtn>Submit</FooterBtn>
                        </FooterNewsletterForm>
                    </FooterNewsletter>
                    <FooterLinkContainer>
                        <FooterLinkTitle>Liên hệ</FooterLinkTitle>
                        <FooterLinks>
                            <FooterLink to='https://www.instagram.com/'>Instagram</FooterLink>
                            <FooterLink to='https://www.facebook.com/'>Facebook</FooterLink>
                            <FooterLink to='https://www.youtube.com/'>Youtube</FooterLink>
                            <FooterLink to='https://www.linkedin.com/?original_referer=https%3A%2F%2Fwww.google.com%2F'>Linkedin</FooterLink>
                        </FooterLinks>
                    </FooterLinkContainer>
                    <FooterCopyRight to='https://github.com/a40405'> &copy; Copyright 2023, Design and programming with 💝 by Hữu Huấn</FooterCopyRight>
                </FooterContainer>
            </FooterSection>
        </div>
    )
}

export default Footer;
