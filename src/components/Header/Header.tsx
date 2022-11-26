import { Button } from "flowbite-react";
import { Avatar, Dropdown } from "flowbite-react";
import { useUserContext } from "@contexts/UserContext";
import Link from "next/link";

const Header = () => {
  const { login, user, logout } = useUserContext();

  return (
    <header className="bg-gray-800 min-h-[4rem] px-4">
      <div className="container mx-auto flex justify-between items-center h-full">
        <Link href="/" className="text-2xl font-semibold text-gray-200">
          DevJobs
        </Link>
        {user ? (
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
        ) : (
          <Button
            size="sm"
            gradientDuoTone="greenToBlue"
            onClick={() => login()}
          >
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
