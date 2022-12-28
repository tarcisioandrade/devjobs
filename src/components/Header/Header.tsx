import Link from "next/link";
import Router from "next/router";
import { Button, Dropdown, Avatar } from "flowbite-react";
import { User } from "src/types/User";
import { deleteCookie } from "cookies-next";

type Props = {
  user: User | null;
};

const Header = ({ user }: Props) => {
  const initialsUserName = `${user?.name.charAt(0)}${user?.surname.charAt(0)}`;

  const logout = () => {
    deleteCookie("token");
    Router.reload();
  };

  return (
    <header className="bg-gray-800 h-16 px-4">
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
                <Avatar
                  rounded={true}
                  placeholderInitials={initialsUserName.toUpperCase()}
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm capitalize">{`${user.name} ${user.surname}`}</span>
                <span className="block truncate text-sm font-medium">
                  {user.email}
                </span>
              </Dropdown.Header>

              <Dropdown.Item>
                <Link href="/user/jobsapplied">Vagas Aplicadas</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link href={`/${user.id_devjobs}`}>Meu Perfil</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link href="/user/jobpost">Postar Vaga</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link href="/user/jobsposted">Vagas Postadas</Link>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logout}>Sair</Dropdown.Item>
            </Dropdown>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              className="dark:text-blue-200 underline"
              onClick={() => Router.push("/user/login")}
            >
              Login
            </button>
            <span className="dark:text-gray-200">ou</span>
            <Button size="sm" onClick={() => Router.push("/user/signup")}>
              Signup
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
