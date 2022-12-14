import ErrorToast from "@components/ErrorToast";
import DevButton from "@components/UI/DevButton";
import DevInput from "@components/UI/DevInput";
import api from "@libs/axios";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { patternEmail, patternOnlyLetters } from "@utils/REGEX";
import { Checkbox, Label } from "flowbite-react";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { fetchUserLogin } from "@services/fetchUser";
import { setCookie } from "cookies-next";
import MetaTags from "@components/MetaTags";

export type FormValuesSignup = {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: string;
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormValuesSignup>();

  const passwordMatchValue = useRef({});
  passwordMatchValue.current = watch("password", "");
  const termsAccepted = watch("terms");

  const onSubmitLogin: SubmitHandler<FormValuesSignup> = async ({
    email,
    surname,
    name,
    password,
  }) => {
    try {
      await api.post("api/user", {
        email,
        name,
        surname,
        password,
      });
      const res = await fetchUserLogin(email, password);
      setCookie("token", res.data);
      if (res.status === 200) Router.push("/user/profile");
    } catch (error: any) {
      if (error.response.status === 409) {
        toast.custom(() => (
          <ErrorToast message="Este e-mail já foi utilizado." />
        ));
      } else {
        toast.custom(() => (
          <ErrorToast message="Algum erro aconteceu, por favor, tente novamente." />
        ));
      }
    }
  };

  const {
    onChange: onChangeName,
    onBlur: onBlurName,
    name: nameName,
    ref: refName,
  } = register("name", {
    pattern: {
      value: patternOnlyLetters,
      message: "Digite apenas letras.",
    },
    minLength: {
      value: 4,
      message: "Minímo de 4 letras.",
    },
  });

  const {
    onChange: onChangeSurname,
    onBlur: onBlurSurname,
    name: nameSurname,
    ref: refSurname,
  } = register("surname", {
    pattern: {
      value: patternOnlyLetters,
      message: "Digite apenas letras.",
    },
    minLength: {
      value: 4,
      message: "Minímo de 4 letras.",
    },
  });

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

  const {
    onChange: onChangeConfirmPassword,
    onBlur: onBlurConfirmPassword,
    name: nameConfirmPassword,
    ref: refConfirmPassword,
  } = register("confirmPassword", {
    validate: (value) =>
      value === passwordMatchValue.current || "As senhas não batem.",
  });

  const {
    onChange: onChangeTerms,
    onBlur: onBlurTerms,
    name: nameTerms,
    ref: refTerms,
  } = register("terms");

  return (
    <main className="h-screen flex items-center justify-center px-4">
      <Head>
        <title>DevJobs | Cadastro</title>
        <MetaTags
          title={"Signup"}
          url={`${process.env.NEXT_PUBLIC_BASE_URL}/user/signup`}
          description={"Realizar cadastro no portal."}
        />
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
            label="Nome"
            type="text"
            onChange={onChangeName}
            onBlur={onBlurName}
            name={nameName}
            ref={refName}
            errors={errors}
            required
          />
        </div>
        <div className="my-4">
          <DevInput
            label="Sobrenome"
            type="text"
            onChange={onChangeSurname}
            onBlur={onBlurSurname}
            name={nameSurname}
            ref={refSurname}
            errors={errors}
            required
          />
        </div>
        <div className="my-4">
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
        <div className="my-4">
          <DevInput
            label="Confirme a Senha"
            type="password"
            onChange={onChangeConfirmPassword}
            onBlur={onBlurConfirmPassword}
            name={nameConfirmPassword}
            ref={refConfirmPassword}
            errors={errors}
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="accept"
            onChange={onChangeTerms}
            onBlur={onBlurTerms}
            name={nameTerms}
            ref={refTerms}
          />
          <Label htmlFor="accept">
            Eu li e concordo com os{" "}
            <a
              href=""
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              termos de uso.
            </a>
          </Label>
        </div>
        <DevButton
          type="submit"
          className="mt-4"
          disabled={!termsAccepted}
          loading={+isSubmitting}
        >
          Cadastrar
        </DevButton>
      </form>
    </main>
  );
};

export default Signup;
