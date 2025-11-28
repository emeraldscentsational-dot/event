import Container from "components/Container";
import { FooterLogo } from "assets";
import { footerLinks } from "./constants";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-primary px-3 py-[64px] font-lato">
      <Container>
        <div className="w-full flex flex-col justify-between h-full gap-[80px]">
          <div className="w-full flex justify-between flex-col md:flex-row gap-10">
            <div className="w-full max-w-[320px] flex flex-col h-[114px] flex-grow-0 justify-between gap-[32px]">
              <img src={FooterLogo} alt="Logo" />
              <h1 className=" text-grayLight leading-[24px]">
                Connect, book, and showcase event services with ease and
                sophistication.
              </h1>
            </div>
            <div className="flex w-full max-w-[594px] flex-col md:flex-row gap-4 justify-between">
              <div className="text-white">
                <h1 className="font-[700] text-[14px]">Quick links</h1>
                <ul className="mt-[16px] flex flex-col gap-[12px]">
                  {footerLinks.map((link) => (
                    <li key={link.label}>
                      {link.icon ? (
                        <button className="flex gap-2 items-center">
                          {link.label}
                          <link.icon />
                        </button>
                      ) : (
                        <Link to={link.path}>{link.label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col justify-between w-full max-w-[360px] h-[204px]">
                <div className="text-white  flex flex-col gap-[16px]">
                  <h1 className=" font-bold text-[14px]">Stay up to date</h1>
                  <p className="text-[14px] leading-[17px]">
                    Be the first to know when we release new features, make
                    improvements or when there is an offer. No spam.
                  </p>
                  <div className="flex gap-4">
                    <input
                      type="email"
                      placeholder="Entet your email"
                      className="w-full max-w-[239px] py-[10px] px-[14px] rounded-[8px] bg-white outline-0 border-0 text-black"
                    />
                    <button className="w-full max-w-[105px] h-[44px] py-[10px] px-[18px] rounded-[8px] inline-flex justify-center items-center bg-secondaryLight">
                      Subscribe
                    </button>
                  </div>
                </div>

                <div className="flex gap-[24px]">
                  <FaTwitter color="#D1D1D1" size={24} />
                  <FaFacebook color="#D1D1D1" size={24} />
                  <FaInstagram color="#D1D1D1" size={24} />
                  <FaTiktok color="#D1D1D1" size={24} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between flex-col md:flex-row border-t border-t-primaryLight pt-[32px] text-grayLight">
            <p>
              © {new Date().getFullYear()} D’EventMatcha. All rights reserved.
            </p>
            <div className="flex items-center gap-4  h-4">
              <Link to="/">Terms</Link>
              <div className="w-[6px] h-[6px] rounded-full bg-grayLight" />
              <Link to="/">Privacy</Link>
              <div className="w-[6px] h-[6px] rounded-full bg-grayLight" />
              <Link to="/">Cookies</Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
