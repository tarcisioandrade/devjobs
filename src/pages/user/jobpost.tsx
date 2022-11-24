/* eslint-disable @next/next/no-img-element */
import Layout from "@components/Layout";
import { Avatar, FileInput, Select, TextInput } from "flowbite-react";
import React, { useEffect, useRef } from "react";
import estadosBR from "@utils/estadosBR.json";
import beneficios from "@utils/benefits.json";
import salarysRanges from "@utils/salaryRange.json";
import { useState } from "react";
import MultipleSelect from "@components/MultipleSelect";
import stacks from "@utils/stacks.json";
import Head from "next/head";
import { Editor } from "@tinymce/tinymce-react";
import useImgPreview from "src/hooks/useImgPreview";
import { useForm, SubmitHandler } from "react-hook-form";
import DevBadge from "@components/UI/Badge";
import DevButton from "@components/UI/DevButton";
import { patternEmail } from "@utils/REGEX";
import ErrorMessage from "@components/ErrorMessage";
import kebabCase from "just-kebab-case";
import fetchJobPost from "@services/fetchJobPost";
import { JobPost } from "src/types/Job";
import Router from "next/router";
import JobCard from "@components/JobCard";

type FormValues = {
  company_name: string;
  title_job: string;
  model: string;
  localization: string;
  contract: string;
  type: string;
  company_email: string;
  salary_range: string;
};

const JobPost = () => {
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
  const [error, setError] = useState(false);
  const [jobCardPreview, setJobCardPreview] = useState<any | null>(null);
  const { getPreviewImage, preview } = useImgPreview();

  const stackList = Object.values(stacks);

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
  const localizationWatch = watch("localization");

  const previewJob = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (previewJob.current != null)
      previewJob.current.innerHTML = `<div class="text-4xl dark:text-gray-200 font-semibold">${jobTitleWatch}</div>${text}${
        selectedBenefits.length > 0
          ? `<h1>Benefícios</h1><ul style="list-style: none; margin-left: 0">${selectedBenefits
              .map((benefict) => `<li>${benefict}</li>`)
              .join(" ")}`
          : ""
      }</ul><h1>Faixa Sálarial</h1><p>${salaryRangeWatch}</p>`;
  }, [text, jobTitleWatch, selectedBenefits, salaryRangeWatch]);

  const onSubmitJob: SubmitHandler<FormValues> = async (data) => {
    const {
      localization,
      title_job,
      company_email,
      company_name,
      contract,
      model,
      type,
      salary_range,
    } = data;

    const job: JobPost = {
      id_user: 59,
      location: localization,
      title_job,
      company_email,
      company_name,
      contract,
      model,
      type,
      description: text,
      company_avatar: preview,
      benefits: selectedBenefits,
      stacks: selectedStacks,
      salary_range,
      blob: kebabCase(
        `${data.title_job}${data.model}${data.localization} ${1}`
      ),
    };

    try {
      setLoading(true);
      setError(false);
      const res = await fetchJobPost(job);
      if (res.status !== 200) throw new Error("Failed to fetch");
      Router.push("/");
    } catch (error) {
      setError(true);
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
      createAt: new Date(),
      company_name: companyWatch,
      location: localizationWatch,
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
    localizationWatch
  ]);

  return (
    <Layout>
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
                <option>Presencial</option>
                <option>Remoto</option>
                <option>Híbrido</option>
              </Select>
            </div>

            <div>
              <div className="mb-2">
                <label htmlFor="localization" className="text-lg text-gray-200">
                  Localização
                </label>
              </div>
              <Select {...register("localization")} id="localization">
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
                <option>PJ</option>
                <option>CLT</option>
                <option>Temporário</option>
              </Select>
            </div>

            <div>
              <div className="mb-2">
                <label htmlFor="type" className="text-lg text-gray-200">
                  Nivel da Vaga
                </label>
              </div>
              <Select {...register("type")} id="type">
                <option>Estágio</option>
                <option>Junior</option>
                <option>Pleno</option>
                <option>Sênior</option>
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
                  allOptionsList={stackList}
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
                    preview ? preview : "/assets/user/no-company-profile.jpg"
                  }
                  alt="Foto do Perfil"
                />
              </div>

              <FileInput
                id="company_logo"
                name="company_img"
                onChange={getPreviewImage}
                helperText=".PNG, .JPG, Quadrado ou Redondo"
                required
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
              <div className="flex items-center gap-2 flex-wrap">
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
              <DevButton
                className="w-full"
                size="xl"
                type="submit"
                loading={+loading}
              >
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

export default JobPost;
