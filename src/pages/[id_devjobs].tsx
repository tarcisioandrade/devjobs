/* eslint-disable @next/next/no-img-element */
import Layout from "@components/Layout";
import DevBadge from "@components/UI/Badge";
import Link from "next/link";
import Head from "next/head";
import useFormatter from "src/hooks/useFormatter";
import Router from "next/router";
import { GetServerSideProps } from "next";
import { User } from "src/types/User";
import {
  fetchAuthUserToken,
  fetchUserWithIdDevJobs,
} from "@services/fetchUser";
import { EggBreak } from "@components/svg";
import { Button } from "flowbite-react";
import { getCookie } from "cookies-next";

const PublicProfile = ({ user, isUserThisPefil, user_devjobs }: Props) => {
  const { formatter } = useFormatter();

  const title = `DevJobs | ${user_devjobs?.name
    .charAt(0)
    .toUpperCase()}${user_devjobs?.name.slice(1)} ${user_devjobs?.surname
    .charAt(0)
    .toUpperCase()}${user_devjobs?.surname.slice(1)}`;

  return (
    <Layout user={user}>
      <Head>
        <title>{user_devjobs ? title : "DevJobs"}</title>
      </Head>
      <main className="mainContainer">
        {user_devjobs && isUserThisPefil ? (
          <Button
            className="mb-4 w-fit ml-auto"
            onClick={() => Router.push("/user/profile")}
          >
            Editar Meu Perfil
          </Button>
        ) : null}

        {user_devjobs ? (
          <div className="border border-blue-500 rounded p-4 ">
            <div>
              <img
                className="mx-auto object-cover max-w-[200px] max-h-[300px] rounded"
                src={user_devjobs.avatar || "assets/user/no-profile.jpg"}
                alt={user_devjobs.name}
              />
            </div>
            <div className="text-center mt-4">
              <strong className="dark:text-gray-200 text-4xl font-medium capitalize">
                {user_devjobs.name} {user_devjobs.surname}
              </strong>
              <div className="dark:text-gray-400 mt-2">
                {user_devjobs.user_type === "worker"
                  ? "A Proucura de Trabalho"
                  : "A Proucura de um Trabalhador"}
              </div>
            </div>
            <table className="profilePublicTable w-full mt-12">
              <tbody>
                {user_devjobs.location ? (
                  <tr>
                    <td>Localização</td>
                    <td>{user_devjobs.location}</td>
                  </tr>
                ) : null}
                <tr>
                  <td>E-mail</td>
                  <td>
                    <Link href={`mailto:${user_devjobs.email}`}>
                      {user_devjobs.email}
                    </Link>
                  </td>
                </tr>
                {user_devjobs.website_url ? (
                  <tr>
                    <td>WebSite</td>
                    <td>
                      <Link
                        href={`https://${user_devjobs.website_url}`}
                        target="_blank"
                      >
                        {user_devjobs.website_url}
                      </Link>
                    </td>
                  </tr>
                ) : null}
                {user_devjobs.github_url ? (
                  <tr>
                    <td>Github</td>
                    <td>
                      <Link
                        href={`https://${user_devjobs.github_url}`}
                        target="_blank"
                      >
                        {user_devjobs.github_url}
                      </Link>
                    </td>
                  </tr>
                ) : null}
                {user_devjobs.linkedin_url ? (
                  <tr>
                    <td>Linkedin</td>
                    <td>
                      <Link
                        href={`https://${user_devjobs.linkedin_url}`}
                        target="_blank"
                      >
                        {user_devjobs.linkedin_url}
                      </Link>
                    </td>
                  </tr>
                ) : null}
                {user_devjobs.stacks.length ? (
                  <tr>
                    <td>Stacks</td>
                    <td>
                      <div className="flex gap-4 flex-wrap">
                        {user_devjobs.stacks.map((stack) => (
                          <DevBadge key={stack}>{stack}</DevBadge>
                        ))}
                      </div>
                    </td>
                  </tr>
                ) : null}
                {user_devjobs.biography ? (
                  <tr>
                    <td>Biografia</td>
                    <td className="leading-relaxed">
                      {user_devjobs.biography}
                    </td>
                  </tr>
                ) : null}
                {user_devjobs.fluents.length ? (
                  <tr>
                    <td>Fluente em</td>
                    <td>
                      <div className="flex gap-4 flex-wrap">
                        {user_devjobs.fluents.map((fluent) => (
                          <DevBadge key={fluent}>{fluent}</DevBadge>
                        ))}
                      </div>
                    </td>
                  </tr>
                ) : null}
                <tr>
                  <td>Membro há</td>
                  <td>{formatter(user_devjobs.createdAt)}</td>
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
  user_devjobs: User | null;
  user: User | null;
  isUserThisPefil: boolean;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { id_devjobs } = ctx.query;
  const token = getCookie("token", { req: ctx.req, res: ctx.res });

  // User in page
  const user: User | null = await fetchUserWithIdDevJobs(id_devjobs as string);

  // Verify if user logged is user in page
  const userLogged: User = await fetchAuthUserToken(token as string);
  const isUserThisPefil = userLogged?.id === user?.id;

  return {
    props: {
      user: userLogged || null,
      user_devjobs: user || null,
      isUserThisPefil,
    },
  };
};

export default PublicProfile;
