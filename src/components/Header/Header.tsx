import { Navbar } from "flowbite-react";
import { Avatar, Dropdown } from "flowbite-react";
import React from "react";
import { useUserContext } from "@contexts/UserContext";
import Link from "next/link";

const Header = () => {
  const { login, user, logout } = useUserContext();

  return (
    <header>
      <Navbar fluid>
        <Navbar.Brand href="/">
          <span className="self-center whitespace-nowrap dark:text-white text-xl font-semibold">
            DevJobs
          </span>
        </Navbar.Brand>

        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={
              <Avatar alt="User settings" img={user?.avatar} rounded={true} />
            }
          >
            {user && (
              <Dropdown.Header>
                <span className="block text-sm">{`${user.name} ${user.surname}`}</span>
                <span className="block truncate text-sm font-medium">
                  {user.email}
                </span>
              </Dropdown.Header>
            )}

            <Dropdown.Item>
              <Link href="/user/jobsapplied">Vagas Aplicadas</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link href="/user/profile">Meu Perfil</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link href="/user/jobpost">Postar Vaga</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link href="/user/jobsposted">Vagas Postadas</Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            {user ? (
              <Dropdown.Item onClick={() => logout()}>Sair</Dropdown.Item>
            ) : (
              <Dropdown.Item onClick={() => login()}>Login</Dropdown.Item>
            )}
          </Dropdown>
        </div>
      </Navbar>
    </header>
  );
};

export default Header;
