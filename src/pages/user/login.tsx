import DevButton from "@components/UI/DevButton";
import DevInput from "@components/UI/DevInput";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { patternEmail } from "@utils/REGEX";
import Head from "next/head";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Router from "next/router";
import { Toast } from "flowbite-react";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmitLogin: SubmitHandler<FormValues> = async ({
    email,
    password,
  }) => {
    try {
      setLoading(true);
      setError(false);
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (!res?.ok) throw new Error("Failed in login.");
      Router.push("/");
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const {
    onChange: onChangeEmail,
    onBlur: onBlurEmail,
    name: nameEmail,
    ref: refEmail,
  } = register("email", {
    pattern: {
      value: patternEmail,
      message: "Digite um e-mail válido.",
    },
  });

  const {
    onChange: onChangePassword,
    onBlur: onBlurPassword,
    name: namePassword,
    ref: refPassword,
  } = register("password", {
    minLength: {
      value: 8,
      message: "Digite uma senha com minímo de 8 carácteres.",
    },
  });

  return (
    <main className="h-screen flex items-center justify-center px-4">
      <Head>
        <title>DevJobs | Login</title>
      </Head>
      <form
        className="bg-gray-100 dark:bg-transparent border-blue-500 border p-4 rounded w-full md:max-w-[400px]"
        onSubmit={handleSubmit(onSubmitLogin)}
      >
        <Link
          href="/"
          className="block text-5xl font-semibold text-center dark:text-white mb-6"
        >
          DevJobs
        </Link>
        <div>
          <DevInput
            label="E-mail"
            type="email"
            onChange={onChangeEmail}
            onBlur={onBlurEmail}
            name={nameEmail}
            ref={refEmail}
            errors={errors}
            required
          />
        </div>
        <div className="my-4">
          <DevInput
            label="Senha"
            type="password"
            onChange={onChangePassword}
            onBlur={onBlurPassword}
            name={namePassword}
            ref={refPassword}
            errors={errors}
            required
          />
        </div>
        <DevButton type="submit" className="w-full" loading={+loading}>
          Entrar
        </DevButton>
        <p className="dark:text-gray-200 mt-4">
          Não tem cadastro?{" "}
          <Link href="/user/signup" className="text-blue-500 underline">
            Cadastre-se
          </Link>
        </p>
      </form>
      {error ? (
        <Toast className="absolute top-4">
          <div className="inline-flex items-center justify-center w-8 h-8 text-blue-500 bg-blue-100 rounded-lg shrink-0 dark:bg-red-800 dark:text-blue-200">
            !
          </div>
          <div className="ml-3 text-sm font-normal">
            Login ou senha incorretos.
          </div>
          <Toast.Toggle />
        </Toast>
      ) : null}
    </main>
  );
};

export default Login;
