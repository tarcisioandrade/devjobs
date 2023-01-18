/* eslint-disable @next/next/no-img-element */
import Layout from "@components/Layout";
import estadosBR from "@utils/estadosBR.json";
import ErrorMessage from "@components/ErrorMessage";
import Head from "next/head";
import useImgPreview from "@hooks/useImgPreview";
import Router from "next/router";
import ErrorToast from "@components/ErrorToast";
import fetchImageUpload from "@services/fetchImageUpload";
import {
  fetchUserUpdate,
  fetchUserDelete,
  fetchAuthUserToken,
} from "@services/fetchUser";
import { GetServerSideProps } from "next";
import { User } from "src/types/User";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import {
  Button,
  FileInput,
  Modal,
  Select,
  Textarea,
  TextInput,
} from "flowbite-react";
import {
  matchCommaAndSpaces,
  patternDevJobsID,
  patternOnlyLetters,
  patternURL,
} from "@utils/REGEX";
import { toast } from "react-hot-toast";
import SuccessToast from "@components/SuccessToast/SuccessToast";
import { getCookie, deleteCookie, removeCookies } from "cookies-next";

const TextHelper = ({ message, mt }: { message: string; mt?: boolean }) => {
  return (
    <p
      className={`text-base text-gray-500 dark:text-gray-400 font-normal ${
        mt && "mt-4"
      }`}
    >
      {message}
    </p>
  );
};

type FormValues = {
  account_type: string;
  name: string;
  surname: string;
  location: string;
  biography: string;
  gender: string;
  website: string;
  github: string;
  linkedin: string;
  stacks: string;
  id_devjobs: string;
  fluents: string;
};

type Props = {
  user: User;
};

const Profile = ({ user }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const { getPreviewImage, preview, selectedFile } = useImgPreview();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmitProfile: SubmitHandler<FormValues> = async (data) => {
    try {
      let avatarImage;
      if (selectedFile) {
        const { data: axiosData } = await fetchImageUpload(
          selectedFile as File,
          "user_profile"
        );
        avatarImage = `https://res.cloudinary.com/drdzrfm15/image/upload/c_scale,w_550/v1669900046/${axiosData.public_id}.${axiosData.format}`;
      }
      const userInfosForUpdate = {
        id: user.id,
        user_type: data.account_type,
        id_devjobs: data.id_devjobs.toLowerCase(),
        name: data.name,
        surname: data.surname,
        avatar: avatarImage || user.avatar,
        gender: data.gender,
        location: data.location,
        biography: data.biography || undefined,
        website_url: data.website || undefined,
        github_url: data.github || undefined,
        linkedin_url: data.linkedin || undefined,
        stacks: data.stacks.length
          ? data.stacks.split(matchCommaAndSpaces)
          : undefined,
        fluents: data.fluents.length
          ? data.fluents.split(matchCommaAndSpaces)
          : undefined,
      };
      const res = await fetchUserUpdate(userInfosForUpdate);
      toast.custom(() => <SuccessToast message="Perfil atualizado." />);
      if (res.status === 200) {
        Router.reload();
      }
    } catch (error) {
      toast.custom(() => (
        <ErrorToast message="Algum erro aconteceu, por favor, tente novamente." />
      ));
    }
  };

  const defaultStacksValue = user.stacks.join(", ");
  const defaultFluentsValue = user.fluents.join(", ");

  const textTitle = `DevJobs | ${user.name
    .charAt(0)
    .toUpperCase()}${user.name.slice(1)}`;

  const handleOpenModal = () => setModalOpen(!modalOpen);

  const deleteAccount = async () => {
    try {
      await fetchUserDelete(user.id);
      removeCookies("token");
      Router.push("/");
    } catch (error) {
      toast.custom(() => (
        <ErrorToast message="Algum erro aconteceu, por favor, tente novamente." />
      ));
    }
  };

  return (
    <Layout user={user}>
      <main className="mainContainer">
        <Head>
          <title>{textTitle}</title>
        </Head>
        <form onSubmit={handleSubmit(onSubmitProfile)}>
          <div className="p-4 lg:p-0 lg:py-4">
            <Button type="submit" className="ml-auto" disabled={isSubmitting}>
              Salvar Mudanças
            </Button>
          </div>
          <div className="border border-blue-500 rounded p-4 ">
            <table className="devTable w-full">
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="id_devjobs">DevJobs ID</label>
                    <TextHelper message="Certifique-se de colocar o '@' no inicio do ID." />
                  </td>
                  <td>
                    <TextInput
                      id="id_devjobs"
                      defaultValue={user.id_devjobs}
                      {...register("id_devjobs", {
                        required: "Este campo é obrigatório.",
                        minLength: {
                          value: 3,
                          message: "Mínimo de 3 Carácteres.",
                        },
                        maxLength: {
                          value: 20,
                          message: "Máximo de 20 Carácteres.",
                        },
                        pattern: {
                          value: patternDevJobsID,
                          message: "Digite um ID Válido.",
                        },
                      })}
                    />
                    {errors.id_devjobs?.message ? (
                      <ErrorMessage message={errors.id_devjobs.message} />
                    ) : null}
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="account_type">Tipo da Conta</label>
                  </td>
                  <td>
                    <Select
                      id="account_type"
                      defaultValue={user.user_type}
                      {...register("account_type")}
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
                    <label htmlFor="name">Nome</label>
                  </td>
                  <td>
                    <TextInput
                      id="name"
                      defaultValue={user.name}
                      {...register("name", {
                        pattern: {
                          value: patternOnlyLetters,
                          message: "Por favor, insira apenas letras.",
                        },
                        required: "Este campo é obrigatório.",
                      })}
                    />
                    {errors.name?.message ? (
                      <ErrorMessage message={errors.name.message} />
                    ) : null}
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="surname">Sobrenome</label>
                  </td>
                  <td>
                    <TextInput
                      id="surname"
                      defaultValue={user.surname}
                      {...register("surname", {
                        pattern: {
                          value: patternOnlyLetters,
                          message: "Por favor, insira apenas letras.",
                        },
                        required: "Este campo é obrigatório.",
                      })}
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
                          className="mx-auto lg:mx-0 object-cover max-w-[200px] max-h-[300px] rounded"
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
                    <label htmlFor="location">Localização</label>
                    <TextHelper message="Onde você está agora?" />
                  </td>
                  <td>
                    <Select
                      id="location"
                      defaultValue={user.location}
                      {...register("location")}
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
                      {...register("biography")}
                      rows={4}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="fluents">Fluente em</label>
                    <TextHelper message="Ex: Português, inglês, espanhol." />
                    <TextHelper
                      message="Certifique-se de separar por vírgulas."
                      mt
                    />
                  </td>
                  <td>
                    <Textarea
                      id="fluents"
                      defaultValue={defaultFluentsValue}
                      {...register("fluents")}
                      rows={2}
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
                      {...register("gender")}
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
                        {...register("website", {
                          pattern: {
                            value: patternURL,
                            message: "Por favor, insira um URL Válido.",
                          },
                        })}
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
                        {...register("github", {
                          pattern: {
                            value: patternURL,
                            message: "Por favor, insira um URL Válido.",
                          },
                        })}
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
                        {...register("linkedin", {
                          pattern: {
                            value: patternURL,
                            message: "Por favor, insira um URL Válido.",
                          },
                        })}
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
                      {...register("stacks")}
                      rows={4}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <div
                      className="text-sm text-red-500 hover:underline cursor-pointer -mb-4"
                      onClick={handleOpenModal}
                    >
                      Deletar Conta
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="py-4">
            <Button type="submit" className="ml-auto" disabled={isSubmitting}>
              Salvar Mudanças
            </Button>
          </div>
        </form>
      </main>

      <Modal
        className="h-screen"
        show={modalOpen}
        size="md"
        popup={true}
        onClose={handleOpenModal}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Tem certeza que deseja deletar esta conta?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteAccount}>
                Sim, eu tenho
              </Button>
              <Button color="gray" onClick={handleOpenModal}>
                Não, cancela
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = getCookie("token", { req: ctx.req, res: ctx.res });

  if (!token)
    return {
      redirect: {
        destination: "/user/login",
        permanent: false,
      },
    };

  try {
    const res: { data: User } = await fetchAuthUserToken(token as string);

    return {
      props: { user: res.data },
    };
  } catch (error) {
    deleteCookie("token", { req: ctx.req, res: ctx.res });
    return {
      redirect: {
        destination: "/user/login",
        permanent: false,
      },
    };
  }
};

export default Profile;
