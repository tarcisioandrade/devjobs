import { Button } from "flowbite-react";
import Head from "next/head";
import Link from "next/link";

const PageNotFound = () => {
  return (
    <main className="flex items-center justify-center h-screen">
      <Head>
        <title>DevJobs</title>
      </Head>
      <div>
        <p className="dark:text-white text-4xl">Página não encontrada.</p>
        <Link href="/">
          <Button className="mx-auto mt-4 block">Página Inicial</Button>
        </Link>
      </div>
    </main>
  );
};

export default PageNotFound;
