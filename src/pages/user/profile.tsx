/* eslint-disable @next/next/no-img-element */
import Layout from "@components/Layout";
import {
  Button,
  FileInput,
  Modal,
  Select,
  Textarea,
  TextInput,
} from "flowbite-react";
import estadosBR from "@utils/estadosBR.json";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  matchCommaAndSpaces,
  patternOnlyLetters,
  patternURL,
} from "@utils/REGEX";
import ErrorMessage from "@components/ErrorMessage";
import { GetServerSideProps } from "next";
import { User } from "src/types/User";
import fetchServerUser from "@services/fetchServerUser";
import Head from "next/head";
import useImgPreview from "src/hooks/useImgPreview";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "@pages/api/auth/[...nextauth]";
import fetchUserUpdate from "@services/fetchUserUpdate";
import Router from "next/router";
import fetchUserDelete from "@services/fetchUserDelete";
import { signOut } from "next-auth/react";
import ErrorToast from "@components/ErrorToast";
import fetchImageUpload from "@services/fetchImageUpload";

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
  location: string;
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
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { getPreviewImage, preview, selectedFile } = useImgPreview();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmitProfile: SubmitHandler<FormValues> = async (data) => {
    try {
      setLoading(true);
      setError("");
      let avatarImage;
      if (selectedFile) {
        const { data: axiosData } = await fetchImageUpload(
          selectedFile as File,
          "user_profile"
        );
        avatarImage = `https://res.cloudinary.com/drdzrfm15/image/upload/c_crop,g_face,w_550/v1669900046/${axiosData.public_id}.${axiosData.format}`;
      }
      const userInfosForUpdate = {
        id: user.id,
        user_type: data.account_type,
        name: data.name,
        surname: data.surname,
        avatar: avatarImage || user.avatar,
        gender: data.gender,
        location: data.location,
        biography: data.biography,
        website_url: data.website,
        github_url: data.github,
        linkedin_url: data.linkedin,
        stacks: data.stacks.split(matchCommaAndSpaces),
      };
      const res = await fetchUserUpdate(userInfosForUpdate);
      if (res.status === 200) Router.reload();
    } catch (error) {
      setError("Ocorreu um erro no servidor, por favor, tente novamente.");
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const defaultStacksValue = user.stacks.join(", ");

  const textTitle = `DevJobs | ${user.name}`;

  const handleOpenModal = () => setModalOpen(!modalOpen);

  const deleteAccount = async () => {
    try {
      await fetchUserDelete(user.id);
      Router.push("/");
      signOut();
    } catch (error) {
      setError("Ocorreu um erro no servidor, por favor, tente novamente.");
    }
  };

  return (
    <Layout>
      <main className="mainContainer">
        <Head>
          <title>{textTitle}</title>
        </Head>
        <form onSubmit={handleSubmit(onSubmitProfile)}>
          <div className="p-4 lg:p-0 lg:py-4">
            <Button type="submit" className="ml-auto" disabled={loading}>
              Salvar Mudanças
            </Button>
          </div>
          <div className="border border-blue-500 rounded p-4 ">
            <table className="devTable w-full">
              <tbody>
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
                    <label htmlFor="location">Localização*</label>
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
            <Button type="submit" className="ml-auto" disabled={loading}>
              Salvar Mudanças
            </Button>
          </div>
        </form>
      </main>

      <Modal
        show={modalOpen}
        size="md"
        popup={true}
        onClose={handleOpenModal}
        className="h-screen"
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
      {error ? <ErrorToast message={error} /> : null}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );
  const user: User = await fetchServerUser(session?.user.id as string);

  if (!session)
    return {
      redirect: {
        destination: "/user/login",
        permanent: false,
      },
    };

  return {
    props: { user },
  };
};

export default Profile;
