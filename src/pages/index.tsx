import JobsContainer from "@components/JobsContainer";
import Layout from "@components/Layout";
import Head from "next/head";
import { GetServerSideProps } from "next/types";
import { getCookie, deleteCookie } from "cookies-next";
import { User } from "src/types/User";
import { fetchAuthUserToken } from "@services/fetchUser";
import { useEffect, useState } from "react";
import { Modal, Button } from "flowbite-react";
import { setCookie, hasCookie } from "cookies-next";
import MetaTags from "@components/MetaTags";

const Home = ({ user }: Props) => {
  const [showModal, setShowModal] = useState(false);

  const cookieExpires = new Date(
    new Date().getTime() + 1 * 24 * 60 * 60 * 1000
  ); // 2 days;

  const handleShow = () => {
    setShowModal(false);
    setCookie("modalHasBeenRead", true, { expires: cookieExpires });
  };

  useEffect(() => {
    const modalNotBeenRead = hasCookie("modalHasBeenRead");
    if (!modalNotBeenRead) {
      setShowModal(true);
    }
  }, []);

  return (
    <Layout user={user}>
      <Head>
        <title>DevJobs</title>
        <MetaTags
          title="DevJobs"
          url={process.env.NEXT_PUBLIC_BASE_URL as string}
          description="Plataforma de postagem e candidatura de vagas na área tecnológica."
        />
      </Head>
      <JobsContainer user={user} />
      <Modal position="center" show={showModal} size="md" onClose={handleShow}>
        <Modal.Header>Aviso!</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Todas as vagas aqui são meramentes ilustrativas.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleShow}>Entendi</Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

type Props = {
  user: User | null;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const token = getCookie("token", { req: ctx.req, res: ctx.res });
  let user;

  if (token) {
    try {
      const res = await fetchAuthUserToken(token as string);
      user = res.data;
    } catch (error) {
      deleteCookie("token", { req: ctx.req, res: ctx.res });
    }
  }

  return {
    props: { user: user || null },
  };
};

export default Home;
