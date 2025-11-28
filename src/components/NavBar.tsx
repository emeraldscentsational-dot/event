import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { CiMenuFries } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import logo from "../assets/logo-nav.svg";
import Container from "./Container";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import useLogout from "hooks/useLogout";
interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

const navigation: NavigationItem[] = [
  { name: "Home", href: "#", current: true },
  { name: "About Us", href: "/about-us", current: false },
  { name: "Our Services", href: "#", current: false },
  { name: "Contact Us", href: "#", current: false },
  { name: "Blog", href: "#", current: false },
];
const authenticationNav: NavigationItem[] = [
  { name: "Login", href: "/login", current: false },
  { name: "Sign Up for Free", href: "/sign-up", current: true },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const isAuth = useSelector<RootState>((state) => state.auth.isAuth);
  const { handleLogout } = useLogout();
  console.log(isAuth, "isAuth");
  return (
    <Container>
      <Disclosure as="nav" className="w-full font-lg">
        {({ open }: { open: boolean }) => (
          <>
            <div className="">
              <div className="relative flex h-24 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                  {/* Mobile menu button*/}
                  <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <MdCancel className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <CiMenuFries
                        className="block h-6 w-6"
                        aria-hidden="true"
                      />
                    )}
                  </DisclosureButton>
                </div>
                <div className="flex flex-1 items-center justify-center lg:items-stretch lg:justify-between">
                  <div className="flex flex-shrink-0 items-center">
                    <Link to="/">
                      <img
                        className="h-10 w-auto"
                        src={logo}
                        alt="Your Company"
                      />
                    </Link>
                  </div>
                  <div className="hidden lg:ml-6 lg:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? " text-green"
                              : "text-black hover:text-green ",
                            "rounded-md px-3 py-2 text-lg"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="hidden lg:ml-6 lg:block">
                    <div className="flex space-x-4">
                      {isAuth ? (
                        <button
                          className={
                            "bg-green text-white rounded-md px-5 py-2 text-lg"
                          }
                          onClick={handleLogout}
                        >
                          Sign out
                        </button>
                      ) : (
                        authenticationNav.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={classNames(
                              item.current
                                ? "bg-green text-white"
                                : "text-green hover:bg-green hover:text-white",
                              "rounded-md px-5 py-2 text-lg"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DisclosurePanel className="lg:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "text-green"
                        : "text-black  hover:text-green",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </Container>
  );
}
