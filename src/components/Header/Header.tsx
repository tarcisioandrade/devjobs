import { Button } from "flowbite-react";
import { Avatar, Dropdown } from "flowbite-react";
import Link from "next/link";
import { signIn, useSession, signOut } from "next-auth/react";
import Router from "next/router";

const Header = () => {
  const { data: session } = useSession();
  
  return (
    <header className="bg-gray-800 min-h-[4rem] px-4">
      <div className="container mx-auto flex justify-between items-center h-full">
        <Link href="/" className="text-2xl font-semibold text-gray-200">
          DevJobs
        </Link>
        {session ? (
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={
                <Avatar
                  alt="User settings"
                  img={session.user.avatar}
                  rounded={true}
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{`${session.user.name} ${session.user.surname}`}</span>
                <span className="block truncate text-sm font-medium">
                  {session.user.email}
                </span>
              </Dropdown.Header>

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
              <Dropdown.Item onClick={() => signOut()}>Sair</Dropdown.Item>
            </Dropdown>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              className="dark:text-blue-200 underline"
              onClick={() => signIn()}
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
