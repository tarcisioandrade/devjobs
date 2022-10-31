import { Navbar } from "flowbite-react";
import { Avatar, Dropdown } from "flowbite-react";
import React from "react";
import { useUserContext } from "@contexts/userContext";

const Header = () => {
  const { login, user, logout } = useUserContext();

  console.log(user)
  return (
    <header>
      <Navbar fluid>
        <Navbar.Brand href="www.google.com">
          <span className="self-center whitespace-nowrap dark:text-white text-xl font-semibold">
            HaveJobs
          </span>
        </Navbar.Brand>

        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded={true}
              />
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

            <Dropdown.Item>Vagas Aplicadas</Dropdown.Item>
            <Dropdown.Item>Meu Perfil</Dropdown.Item>
            <Dropdown.Item>Postar Vaga</Dropdown.Item>
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
