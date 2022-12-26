/* eslint-disable @next/next/no-img-element */
import Layout from "@components/Layout";
import DevBadge from "@components/UI/Badge";
import Link from "next/link";
import Head from "next/head";
import useFormatter from "src/hooks/useFormatter";
import Router from "next/router";
import { GetServerSideProps } from "next";
import { User } from "src/types/User";
import { fetchUserWithIdDevJobs } from "@services/fetchUser";
import { EggBreak } from "@components/svg";
import { Button } from "flowbite-react";
import { getSession } from "next-auth/react";

const PublicProfile = ({ user, isUserThisPefil }: Props) => {
  const { formatter } = useFormatter();

  const title = `DevJobs | ${user?.name
    .charAt(0)
    .toUpperCase()}${user?.name.slice(1)} ${user?.surname
    .charAt(0)
    .toUpperCase()}${user?.surname.slice(1)}`;

  console.log(isUserThisPefil);
  return (
    <Layout>
      <Head>
        <title>{user ? title : "DevJobs"}</title>
      </Head>
      <main className="mainContainer">
        {user && isUserThisPefil ? (
          <Button
            className="mb-4 w-fit ml-auto"
            onClick={() => Router.push("/user/profile")}
          >
            Editar Meu Perfil
          </Button>
        ) : null}

        {user ? (
          <div className="border border-blue-500 rounded p-4 ">
            <div>
              <img
                className="mx-auto object-cover max-w-[200px] max-h-[300px] rounded"
                src={user.avatar || "assets/user/no-profile.jpg"}
                alt={user.name}
              />
            </div>
            <div className="text-center mt-4">
              <strong className="dark:text-gray-200 text-4xl font-medium capitalize">
                {user.name} {user.surname}
              </strong>
              <div className="dark:text-gray-400 mt-2">
                {user.user_type === "worker"
                  ? "A Proucura de Trabalho"
                  : "A Proucura de um Trabalhador"}
              </div>
            </div>
            <table className="profilePublicTable w-full mt-12">
              <tbody>
                {user.location ? (
                  <tr>
                    <td>Localização</td>
                    <td>{user.location}</td>
                  </tr>
                ) : null}
                <tr>
                  <td>E-mail</td>
                  <td>
                    <Link href={`mailto:${user.email}`}>{user.email}</Link>
                  </td>
                </tr>
                {user.website_url ? (
                  <tr>
                    <td>WebSite</td>
                    <td>
                      <Link
                        href={`https://${user.website_url}`}
                        target="_blank"
                      >
                        {user.website_url}
                      </Link>
                    </td>
                  </tr>
                ) : null}
                {user.github_url ? (
                  <tr>
                    <td>Github</td>
                    <td>
                      <Link href={`https://${user.github_url}`} target="_blank">
                        {user.github_url}
                      </Link>
                    </td>
                  </tr>
                ) : null}
                {user.linkedin_url ? (
                  <tr>
                    <td>Linkedin</td>
                    <td>
                      <Link
                        href={`https://${user.linkedin_url}`}
                        target="_blank"
                      >
                        {user.linkedin_url}
                      </Link>
                    </td>
                  </tr>
                ) : null}
                {user.stacks.length ? (
                  <tr>
                    <td>Stacks</td>
                    <td>
                      <div className="flex gap-4 flex-wrap">
                        {user.stacks.map((stack) => (
                          <DevBadge key={stack}>{stack}</DevBadge>
                        ))}
                      </div>
                    </td>
                  </tr>
                ) : null}
                {user.biography ? (
                  <tr>
                    <td>Biografia</td>
                    <td className="leading-relaxed">{user.biography}</td>
                  </tr>
                ) : null}
                {user.fluents.length ? (
                  <tr>
                    <td>Fluente em</td>
                    <td>
                      <div className="flex gap-4 flex-wrap">
                        {user.fluents.map((fluent) => (
                          <DevBadge key={fluent}>{fluent}</DevBadge>
                        ))}
                      </div>
                    </td>
                  </tr>
                ) : null}
                <tr>
                  <td>Membro há</td>
                  <td>{formatter(user.createdAt)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-2xl md:text-4xl dark:text-gray-600 text-center flex items-center flex-col gap-4">
            Usuário não encontrado. <EggBreak />
          </div>
        )}
      </main>
    </Layout>
  );
};

type Props = {
  user: User | null;
  isUserThisPefil: boolean;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { id_devjobs } = ctx.query;
  const session = await getSession(ctx);
  const user: User | null = await fetchUserWithIdDevJobs(id_devjobs as string);
  const isUserThisPefil = session?.user.id === user?.id;

  return { props: { user: user || null, isUserThisPefil } };
};

export default PublicProfile;
