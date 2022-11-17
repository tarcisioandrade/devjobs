/* eslint-disable @next/next/no-img-element */
import Layout from "@components/Layout";
import {
  Button,
  FileInput,
  Label,
  Select,
  Textarea,
  TextInput,
} from "flowbite-react";
import estadosBR from "@utils/estadosBR.json";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { ChangeEvent, useEffect, useState } from "react";
import {
  matchCommaAndSpaces,
  patternOnlyLetters,
  patternURL,
} from "@utils/REGEX";
import ErrorMessage from "@components/UI/ErrorMessage";
import { GetServerSideProps } from "next";
import { User } from "src/types/User";
import fetchServerUser from "@services/fetchServerUser";
import Head from "next/head";

const TextHelper = ({ message, mt }: { message: string; mt?: boolean }) => {
  return (
    <p className={`text-base text-gray-300 font-normal ${mt && "mt-4"}`}>
      {message}
    </p>
  );
};

type FormValues = {
  account_type: string;
  name: string;
  surname: string;
  localization: string;
  biography: string;
  gender: string;
  website: string;
  github: string;
  linkedin: string;
  stacks: string;
};

type Props = {
  user: User;
};

const Profile = ({ user }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const {
    onChange: onChangeAccountType,
    onBlur: onBlurAccountType,
    ref: refAccountType,
    name: nameAccountType,
  } = register("account_type");

  const {
    onChange: onChangeName,
    onBlur: onBlurName,
    ref: refName,
    name: nameName,
  } = register("name", {
    pattern: {
      value: patternOnlyLetters,
      message: "Por favor, insira apenas letras.",
    },
  });

  const {
    onChange: onChangeSurname,
    onBlur: onBlurSurname,
    ref: refSurname,
    name: nameSurname,
  } = register("surname", {
    pattern: {
      value: patternOnlyLetters,
      message: "Por favor, insira apenas letras.",
    },
  });

  const {
    onChange: onChangeLocalization,
    onBlur: onBlurLocalization,
    ref: refLocalization,
    name: nameLocalization,
  } = register("localization");

  const {
    onChange: onChangeBiography,
    onBlur: onBlurBiography,
    ref: refBiography,
    name: nameBiography,
  } = register("biography");

  const {
    onChange: onChangeGender,
    onBlur: onBlurGender,
    ref: refGender,
    name: nameGender,
  } = register("gender");

  const {
    onChange: onChangeWebsite,
    onBlur: onBlurWebsite,
    ref: refWebsite,
    name: nameWebsite,
  } = register("website", {
    pattern: {
      value: patternURL,
      message: "Por favor, insira um URL Válido.",
    },
  });

  const {
    onChange: onChangeGithub,
    onBlur: onBlurGithub,
    ref: refGithub,
    name: nameGithub,
  } = register("github", {
    pattern: {
      value: patternURL,
      message: "Por favor, insira um URL Válido.",
    },
  });

  const {
    onChange: onChangeLinkedin,
    onBlur: onBlurLinkedin,
    ref: refLinkedin,
    name: nameLinkedin,
  } = register("linkedin", {
    pattern: {
      value: patternURL,
      message: "Por favor, insira um URL Válido.",
    },
  });

  const {
    onChange: onChangeStacks,
    onBlur: onBlurStacks,
    ref: refStacks,
    name: nameStacks,
  } = register("stacks");

  const onSubmitProfile: SubmitHandler<FormValues> = (data) => {
    console.log(data.stacks.split(matchCommaAndSpaces));
  };

  const getPreviewImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.files?.length != undefined &&
      event.target.files?.length > 0
    ) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview("");
      return;
    }

    const IMAGE = URL.createObjectURL(selectedFile);
    setPreview(IMAGE);

    return () => URL.revokeObjectURL(IMAGE);
  }, [selectedFile]);

  const defaultStacksValue = user.stacks.join(", ");

  const textTitle = `DevJobs | ${user.name}`;

  return (
    <Layout>
      <main className="mainContainer">
        <Head>
          <title>{textTitle}</title>
        </Head>
        <form onSubmit={handleSubmit(onSubmitProfile)}>
          <div className="p-4 lg:p-0 lg:py-4">
            <Button type="submit" className="ml-auto">
              Salvar Mudanças
            </Button>
          </div>
          <div className="border border-blue-500 rounded p-4 bg-gray-800">
            <table className="devTable w-full">
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="account_type">Tipo da Conta</label>
                  </td>
                  <td>
                    <Select
                      id="account_type"
                      defaultValue={user.account_type}
                      onChange={onChangeAccountType}
                      onBlur={onBlurAccountType}
                      name={nameAccountType}
                      ref={refAccountType}
                    >
                      <option value="worker">
                        Estou a Proucura de Trabalho
                      </option>
                      <option value="hiring">
                        Estou Proucurando Trabalhadores
                      </option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="name">Nome*</label>
                  </td>
                  <td>
                    <TextInput
                      id="name"
                      defaultValue={user.name}
                      onChange={onChangeName}
                      onBlur={onBlurName}
                      name={nameName}
                      ref={refName}
                      required
                    />
                    {errors.name?.message ? (
                      <ErrorMessage message={errors.name.message} />
                    ) : null}
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="surname">Sobrenome</label>*
                  </td>
                  <td>
                    <TextInput
                      id="surname"
                      defaultValue={user.surname}
                      onChange={onChangeSurname}
                      onBlur={onBlurSurname}
                      name={nameSurname}
                      ref={refSurname}
                      required
                    />
                    {errors.surname?.message ? (
                      <ErrorMessage message={errors.surname.message} />
                    ) : null}
                  </td>
                </tr>

                <tr>
                  <td>
                    <label htmlFor="file">Foto do Perfil</label>
                    <TextHelper
                      message="Defina uma foto do seu perfil (apenas o seu rosto), e nao
                    esqueça de sorrir :D"
                    />
                    <TextHelper
                      message="Certifique-se da foto ser quadrada, pelo menos 500x500px."
                      mt
                    />
                  </td>
                  <td>
                    <div className="w-fit">
                      <div className="mb-4">
                        <img
                          className="mx-auto lg:mx-0 object-cover max-w-[200px] max-h-[300px]"
                          src={
                            preview
                              ? preview
                              : user.avatar
                              ? user.avatar
                              : "/assets/user/no-profile.jpg"
                          }
                          alt="Foto do Perfil"
                        />
                      </div>
                      <FileInput
                        id="file"
                        onChange={getPreviewImage}
                        name="profile_image"
                      />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <label htmlFor="localization">Localização*</label>
                    <TextHelper message="Onde você está agora?" />
                  </td>
                  <td>
                    <Select
                      id="localization"
                      defaultValue={user.localization}
                      onChange={onChangeLocalization}
                      onBlur={onBlurLocalization}
                      name={nameLocalization}
                      ref={refLocalization}
                      required
                    >
                      {estadosBR.UF.map((item, index) => (
                        <option key={index} value={item.sigla}>
                          {item.sigla}
                        </option>
                      ))}
                    </Select>
                  </td>
                </tr>

                <tr>
                  <td>
                    <label htmlFor="biography">Biografia</label>{" "}
                    <TextHelper message="Fale um pouco sobre você." />
                  </td>
                  <td>
                    <Textarea
                      id="biography"
                      defaultValue={user.biography}
                      onChange={onChangeBiography}
                      onBlur={onBlurBiography}
                      name={nameBiography}
                      ref={refBiography}
                      rows={4}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="gender">Sexo</label>
                  </td>
                  <td>
                    <Select
                      id="gender"
                      defaultValue={user.gender}
                      onChange={onChangeGender}
                      onBlur={onBlurGender}
                      name={nameGender}
                      ref={refGender}
                    >
                      <option value="man">Masculino</option>
                      <option value="woman">Feminino</option>
                      <option value="other">Outro</option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="website">WebSite</label>
                  </td>

                  <td>
                    <div className="flex items-center">
                      <span className="text-sm">https://</span>
                      <TextInput
                        className="w-full"
                        id="website"
                        defaultValue={user.website_url}
                        onChange={onChangeWebsite}
                        onBlur={onBlurWebsite}
                        name={nameWebsite}
                        ref={refWebsite}
                      />
                    </div>
                    {errors.website?.message ? (
                      <ErrorMessage message={errors.website.message} />
                    ) : null}
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="github">GitHub</label>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <span className="text-sm">https://</span>
                      <TextInput
                        className="w-full"
                        id="github"
                        defaultValue={user.github_url}
                        onChange={onChangeGithub}
                        onBlur={onBlurGithub}
                        name={nameGithub}
                        ref={refGithub}
                      />
                    </div>
                    {errors.github?.message ? (
                      <ErrorMessage message={errors.github.message} />
                    ) : null}
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="linkedin">Linkedin</label>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <span className="text-sm">https://</span>
                      <TextInput
                        className="w-full"
                        id="linkedin"
                        defaultValue={user.linkedin_url}
                        onChange={onChangeLinkedin}
                        onBlur={onBlurLinkedin}
                        name={nameLinkedin}
                        ref={refLinkedin}
                      />
                    </div>
                    {errors.linkedin?.message ? (
                      <ErrorMessage message={errors.linkedin.message} />
                    ) : null}
                  </td>
                </tr>

                <tr>
                  <td>
                    <label htmlFor="stacks">Stacks</label>
                    <TextHelper message="Digite stack tais como: html, css, javascript." />
                    <TextHelper
                      message="Certifique-se de separar por vírgulas."
                      mt
                    />
                  </td>
                  <td>
                    <Textarea
                      id="stacks"
                      defaultValue={defaultStacksValue}
                      onChange={onChangeStacks}
                      onBlur={onBlurStacks}
                      name={nameStacks}
                      ref={refStacks}
                      rows={4}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="py-4">
            <Button type="submit" className="mx-auto">
              Salvar Mudanças
            </Button>
          </div>
        </form>
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const user: User = await fetchServerUser();

  return {
    props: { user },
  };
};

export default Profile;
