/* eslint-disable @next/next/no-img-element */
import Layout from "@components/Layout";
import estadosBR from "@utils/estadosBR.json";
import beneficios from "@utils/benefits.json";
import fetchImageUpload from "@services/fetchImageUpload";
import salarysRanges from "@utils/salaryRange.json";
import MultipleSelect from "@components/MultipleSelect";
import Head from "next/head";
import useImgPreview from "@hooks/useImgPreview";
import DevBadge from "@components/UI/Badge";
import DevButton from "@components/UI/DevButton";
import ErrorMessage from "@components/ErrorMessage";
import kebabCase from "just-kebab-case";
import Router from "next/router";
import JobCard from "@components/JobCard";
import ErrorToast from "@components/ErrorToast";
import { fetchJobPost } from "@services/fetchJob";
import { useCallback, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { patternEmail } from "@utils/REGEX";
import { Job } from "src/types/Job";
import { useState } from "react";
import { Avatar, FileInput, Select, TextInput } from "flowbite-react";
import { GetServerSideProps } from "next";
import { toast } from "react-hot-toast";
import { User } from "src/types/User";
import { getCookie, deleteCookie } from "cookies-next";
import { fetchAuthUserToken } from "@services/fetchUser";

type FormValues = {
  company_name: string;
  title_job: string;
  model: string;
  location: string;
  contract: string;
  type: string;
  company_email: string;
  salary_range: string;
};

const JobPost = ({ user }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>();

  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);
  const [selectedStacks, setSelectedStacks] = useState<string[]>([]);
  const [text, setText] = useState("");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobCardPreview, setJobCardPreview] = useState<any | null>(null);
  const { getPreviewImage, preview, selectedFile } = useImgPreview();

  const [multipleSelectError, setMultipleSelectError] = useState("");
  const handleSelectedBenefits = (benefict: string) => {
    const benefictHaveBeSelected = benefitsHasSelected(benefict);

    if (benefictHaveBeSelected) {
      const newValue = selectedBenefits.filter((item) => item != benefict);
      setSelectedBenefits(newValue);
      return;
    }
    setSelectedBenefits((prev) => [...prev, benefict]);
  };

  const benefitsHasSelected = (benefict: string) => {
    const benefictHaveBeSelected = selectedBenefits.includes(benefict);

    return benefictHaveBeSelected;
  };

  const jobTitleWatch = watch("title_job") || "Titulo da Vaga";
  const companyWatch = watch("company_name") || "Empresa";
  const emailWatch = watch("company_email") || "example@email.com";
  const salaryRangeWatch = watch("salary_range") || "";
  const modelWatch = watch("model");
  const contractWatch = watch("contract");
  const typeWatch = watch("type");
  const locationWatch = watch("location");

  const previewJob = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (previewJob.current != null)
      previewJob.current.innerHTML = `<div class="text-4xl dark:text-gray-200 font-semibold mb-4">${jobTitleWatch}</div>${text}${
        selectedBenefits.length > 0
          ? `<h1>Benefícios</h1><ul style="list-style: none; margin-left: 0">${selectedBenefits
              .map((benefict) => `<li>${benefict}</li>`)
              .join(" ")}`
          : ""
      }</ul><h1>Faixa Sálarial</h1><p>${salaryRangeWatch}</p>`;
  }, [text, jobTitleWatch, selectedBenefits, salaryRangeWatch]);

  const handleMultipleSelectErrorMessage = useCallback(() => {
    if (selectedStacks.length <= 0) {
      setMultipleSelectError("Este campo é obrigatório.");
    } else {
      setMultipleSelectError("");
    }
  }, [selectedStacks.length]);

  const onSubmitJob: SubmitHandler<FormValues> = async (data) => {
    const {
      location,
      title_job,
      company_email,
      company_name,
      contract,
      model,
      type,
      salary_range,
    } = data;
    try {
      setLoading(true);
      if (selectedStacks.length <= 0) {
        handleMultipleSelectErrorMessage();
        return;
      }
      let companyAvatar = ""
      if (selectedFile) {
        const { data: axiosData } = await fetchImageUpload(
          selectedFile,
          "company_avatar"
        );
        companyAvatar = `https://res.cloudinary.com/drdzrfm15/image/upload/c_scale,w_500/v1669900046/${axiosData.public_id}.${axiosData.format}`;
      }
      const job: Partial<Job> = {
        id_user: user.id,
        location: location,
        title_job,
        company_email,
        company_name,
        company_avatar: companyAvatar,
        contract,
        model,
        type,
        description: text,
        benefits: selectedBenefits,
        stacks: selectedStacks,
        salary_range,
        blob: kebabCase(
          `${data.title_job} ${data.model} ${data.location} ${user.id}`
        ),
      };
      await fetchJobPost(job);
      Router.push("/user/jobsposted");
    } catch (error) {
      toast.custom((t) => (
        <ErrorToast message="Falha na solicitação, por favor, tente novamente." />
      ));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setJobCardPreview({
      id: 999,
      company_avatar: preview,
      stacks: selectedStacks,
      title_job: jobTitleWatch,
      createdAt: new Date(),
      company_name: companyWatch,
      location: locationWatch,
      model: modelWatch,
      contract: contractWatch,
      type: typeWatch,
    });
  }, [
    companyWatch,
    contractWatch,
    jobTitleWatch,
    modelWatch,
    preview,
    selectedStacks,
    typeWatch,
    locationWatch,
  ]);

  return (
    <Layout user={user}>
      <main className="mainContainer">
        <Head>
          <title>DevJobs | Postar Vaga</title>
        </Head>
        <div className="border-blue-500 rounded border p-4">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmitJob)}
          >
            <div>
              <div className="mb-2">
                <label htmlFor="company_name" className="text-lg text-gray-200">
                  Nome da Empresa
                </label>
              </div>
              <TextInput
                id="company_name"
                autoComplete="no"
                {...register("company_name", {
                  required: "Este campo é obrigatório.",
                })}
                helperText="Digite o nome de sua empresa sem Inc., Ltd., etc."
              />
              <ErrorMessage message={errors.company_name?.message} />
            </div>

            <div>
              <div className="mb-2">
                <label htmlFor="title_job" className="text-lg text-gray-200">
                  Titulo da Vaga
                </label>
              </div>
              <TextInput
                id="title_job"
                autoComplete="no"
                {...register("title_job", {
                  required: "Este campo é obrigatório.",
                })}
              />
              <ErrorMessage message={errors.title_job?.message} />
            </div>

            <div>
              <div className="mb-2">
                <label
                  htmlFor="company_email"
                  className="text-lg text-gray-200"
                >
                  E-mail
                </label>
              </div>
              <TextInput
                id="company_email"
                autoComplete="no"
                type="email"
                {...register("company_email", {
                  required: "Este campo é obrigatório.",
                  pattern: {
                    value: patternEmail,
                    message: "Digite um e-mail válido.",
                  },
                })}
                helperText="Este e-mail é publico e será mostrado na página da vaga."
              />
              <ErrorMessage message={errors.company_email?.message} />
            </div>
            <div>
              <div className="mb-2">
                <label htmlFor="model" className="text-lg text-gray-200">
                  Modelo de Trabalho
                </label>
              </div>
              <Select {...register("model")} id="model">
                <option value="presencial">Presencial</option>
                <option value="remoto">Remoto</option>
                <option value="hibrido">Híbrido</option>
              </Select>
            </div>

            <div>
              <div className="mb-2">
                <label htmlFor="location" className="text-lg text-gray-200">
                  Localização
                </label>
              </div>
              <Select {...register("location")} id="location">
                {estadosBR.UF.map((item, index) => (
                  <option key={index}>{item.sigla}</option>
                ))}
              </Select>
            </div>

            <div>
              <div className="mb-2">
                <label htmlFor="contract" className="text-lg text-gray-200">
                  Contrato
                </label>
              </div>
              <Select {...register("contract")} id="contract">
                <option value="pj">PJ</option>
                <option value="clt">CLT</option>
                <option value="temporary">Temporário</option>
              </Select>
            </div>

            <div>
              <div className="mb-2">
                <label htmlFor="type" className="text-lg text-gray-200">
                  Nivel da Vaga
                </label>
              </div>
              <Select {...register("type")} id="type">
                <option value="estagio">Estágio</option>
                <option value="junior">Junior</option>
                <option value="pleno">Pleno</option>
                <option value="senior">Sênior</option>
              </Select>
            </div>

            <div>
              <div className="mb-2">
                <label htmlFor="stacks" className="text-lg text-gray-200">
                  Tags ou Stacks
                </label>
              </div>

              <div>
                <MultipleSelect
                  selected={selectedStacks}
                  setSelected={setSelectedStacks}
                  errorMessage={multipleSelectError}
                  setErrorMessage={setMultipleSelectError}
                  helperText="Escolha suas tags referente a vaga, as 3 primeiras tags serão mostradas no site, as demais serão mostradas na página da vaga (job/sua-vaga-aqui)."
                />
              </div>
            </div>
            <div className="w-fit">
              <div className="mb-2">
                <label
                  className="text-lg dark:text-gray-200"
                  htmlFor="company_logo"
                >
                  Foto da Empresa
                </label>
              </div>
              <div className="mb-4">
                <img
                  className="mx-auto lg:mx-0 object-cover max-w-[200px] max-h-[300px] rounded"
                  src={
                    preview ? preview : "/assets/company/no-company-profile.jpg"
                  }
                  alt="Foto do Perfil"
                />
              </div>

              <FileInput
                id="company_logo"
                name="company_img"
                onChange={getPreviewImage}
                helperText=".PNG, .JPG, Quadrado ou Redondo."
              />
            </div>

            <div>
              <div className="mb-2">
                <label
                  className="text-lg dark:text-gray-200"
                  htmlFor="salary_range"
                >
                  Faixa Sálarial
                </label>
              </div>
              <div>
                <Select id="salary_range" {...register("salary_range")}>
                  {salarysRanges.salarys.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <div>
              <div className="mb-2">
                <div className="text-lg text-gray-200">Benefícios</div>
              </div>
              <div
                className="flex items-center gap-2 flex-wrap"
                id="benefits-container"
              >
                {beneficios.benefits.map((item, index) => (
                  <div
                    className={`border select-none rounded-lg p-2 cursor-pointer ${
                      benefitsHasSelected(item.name)
                        ? "bg-blue-700 border-blue-700 text-white"
                        : "text-blueLock border-blueLock"
                    }`}
                    key={index}
                    onClick={() => handleSelectedBenefits(item.name)}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2">
                <div className="text-lg text-gray-200">Descrição da Vaga</div>
              </div>

              <Editor
                apiKey={process.env.NEXT_PUBLIC_API_TINY_KEY}
                value={value}
                init={{
                  menubar: false,
                  skin: "oxide-dark",
                  content_css: "dark",
                  height: "500px",
                }}
                onInit={(evt, editor) => {
                  setText(editor.getContent({ format: "html" }));
                }}
                onEditorChange={(newValue, editor) => {
                  setValue(newValue);
                  setText(editor.getContent({ format: "html" }));
                }}
                id="editor"
                plugins="lists"
                toolbar="undo redo | h1 h2 | bold italic | checklist numlist bullist indent outdent | removeformat"
              />
            </div>

            <div className="my-2">
              <DevButton size="xl" type="submit" loading={+loading}>
                Postar Vaga
              </DevButton>
            </div>
          </form>
        </div>

        <section className="mt-12 pb-4">
          <div className="text-3xl dark:text-gray-200 mb-4 pl-4 lg:pl-0">
            Pré-visualização
          </div>
          <div className="my-4 pointer-events-none">
            <JobCard job={jobCardPreview} />
          </div>
          <div className="lg:flex gap-4">
            <div
              ref={previewJob}
              className="JobContainer border-blue-500 rounded border p-4 flex-1"
            ></div>
            <div className="flex flex-col items-center border rounded border-blue-500 self-start p-4 lg:w-[500px] flex-[.4] mt-4 lg:mt-0">
              <Avatar img={preview} size="xl" />
              <div className="dark:text-gray-300 font-medium mt-2">
                {companyWatch}
              </div>
              <div className="dark:text-gray-400">{emailWatch}</div>
              <div className="bg-slate-800 h-0.5 w-full mt-2"></div>

              <DevButton size="lg" className="mt-4 w-full">
                Candidatar-se a Vaga
              </DevButton>

              <div className="dark:text-gray-300 mt-4">✅0 Candidatos</div>

              <div className="flex items-center justify-center flex-wrap gap-2 mt-4">
                {selectedStacks.map((stack) => (
                  <DevBadge key={stack}>{stack}</DevBadge>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

type Props = {
  user: User;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
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
      props: {
        user: res.data,
      },
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

export default JobPost;
