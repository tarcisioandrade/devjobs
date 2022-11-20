/* eslint-disable @next/next/no-img-element */
import Layout from "@components/Layout";
import { Avatar, FileInput, Select, TextInput } from "flowbite-react";
import React, { useEffect, useRef } from "react";
import estadosBR from "@utils/estadosBR.json";
import beneficios from "@utils/benefits.json";
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

type FormValues = {
  company_name: string;
  title_job: string;
  model: string;
  localization: string;
  contract: string;
  type: string;
  company_email: string;
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
  const [value, setValue] = useState(
    `<h1>Descrição da Vaga</h1><p>...</p><h1>Responsabilidades</h1><p>...</p><h1>Requisitos</h1><p>...</p>`
  );

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

  const jobTitle = watch("title_job") || "Titulo da Vaga";
  const company = watch("company_name") || "Empresa";
  const email = watch("company_email") || "example@email.com";

  const previewJob = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (previewJob.current != null)
      previewJob.current.innerHTML = `<div class="text-4xl dark:text-gray-200 font-semibold">${jobTitle}</div>${text}<h1>Benefícios</h1><ul style="list-style: none; margin-left: 0">${selectedBenefits
        .map((benefict) => `<li>${benefict}</li>`)
        .join(" ")}</ul>`;
  }, [text, jobTitle, selectedBenefits]);

  const {
    onChange: onChangeCompanyName,
    onBlur: onBlurCompanyName,
    name: nameCompany,
    ref: refCompanyName,
  } = register("company_name", { required: "Este campo é obrigatório." });

  const {
    onChange: onChangeTitleJob,
    onBlur: onBlurTitleJob,
    name: nameTitleJob,
    ref: refTitleJob,
  } = register("title_job", { required: "Este campo é obrigatório." });

  const {
    onChange: onChangeCompanyEmail,
    onBlur: onBlurCompanyEmail,
    name: nameCompanyEmail,
    ref: refCompanyEmail,
  } = register("company_email", {
    pattern: { value: patternEmail, message: "Digite um e-mail válido." },
    required: "Este campo é obrigatório.",
  });

  const {
    onChange: onChangeContract,
    onBlur: onBlurContract,
    name: nameContract,
    ref: refContract,
  } = register("contract");

  const {
    onChange: onChangeLocalization,
    onBlur: onBlurLocalization,
    name: nameLocalization,
    ref: refLocalization,
  } = register("localization");

  const {
    onChange: onChangeModel,
    onBlur: onBlurModel,
    name: nameModel,
    ref: refModel,
  } = register("model");

  const {
    onChange: onChangeType,
    onBlur: onBlurType,
    name: nameType,
    ref: refType,
  } = register("type");

  const onSubmitJob: SubmitHandler<FormValues> = (data) => {
    console.log({
      ...data,
      description: text,
      avatar_company: preview,
      benefits: selectedBenefits,
      stacks: selectedStacks,
    });
  };

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
                onChange={onChangeCompanyName}
                onBlur={onBlurCompanyName}
                ref={refCompanyName}
                name={nameCompany}
                autoComplete="off"
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
                onChange={onChangeTitleJob}
                onBlur={onBlurTitleJob}
                autoComplete="off"
                ref={refTitleJob}
                name={nameTitleJob}
              />
              <ErrorMessage message={errors.title_job?.message} />
            </div>

            <div>
              <div className="mb-2">
                <label
                  htmlFor="email_company"
                  className="text-lg text-gray-200"
                >
                  E-mail
                </label>
              </div>
              <TextInput
                id="email_company"
                type="email"
                autoComplete="off"
                onChange={onChangeCompanyEmail}
                onBlur={onBlurCompanyEmail}
                ref={refCompanyEmail}
                name={nameCompanyEmail}
              />
              <ErrorMessage message={errors.company_email?.message} />
            </div>
            <div>
              <div className="mb-2">
                <label htmlFor="model" className="text-lg text-gray-200">
                  Modelo de Trabalho
                </label>
              </div>
              <Select
                onChange={onChangeModel}
                onBlur={onBlurModel}
                ref={refModel}
                name={nameModel}
                id="model"
              >
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
              <Select
                onChange={onChangeLocalization}
                onBlur={onBlurLocalization}
                ref={refLocalization}
                name={nameLocalization}
                id="localization"
              >
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
              <Select
                onChange={onChangeContract}
                onBlur={onBlurContract}
                ref={refContract}
                name={nameContract}
                id="contract"
              >
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
              <Select
                onChange={onChangeType}
                onBlur={onBlurType}
                ref={refType}
                name={nameType}
                id="type"
              >
                <option>Estágiario</option>
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
                <label className="text-lg text-gray-200" htmlFor="company_logo">
                  Foto da Empresa
                </label>
              </div>
              <div className="mb-4">
                <img
                  className="mx-auto lg:mx-0 object-cover max-w-[200px] max-h-[300px]"
                  src={preview ? preview : "/assets/user/no-profile.jpg"}
                  alt="Foto do Perfil"
                />
              </div>

              <FileInput
                id="company_logo"
                name="company_img"
                onChange={getPreviewImage}
                helperText=".PNG, .JPG, Quadrado ou Redondo"
              />
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
                apiKey={process.env.NEXT_PUBLIC_API_KEY}
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
              <DevButton className="w-full" size="xl" type="submit">
                Postar Vaga
              </DevButton>
            </div>
          </form>
        </div>

        <section className="mt-12 pb-4">
          <div className="text-3xl dark:text-gray-200 mb-4">
            Pré-visualização
          </div>
          <div className="flex gap-4">
            <div
              ref={previewJob}
              className="JobContainer border-blue-500 rounded border p-4 flex-1"
            ></div>
            <div className="flex flex-col items-center border rounded border-blue-500 self-start p-4 lg:w-[500px] flex-[.4]">
              <Avatar img={preview} size="xl" />
              <div className="dark:text-gray-300 font-medium mt-2">
                {company}
              </div>
              <div className="dark:text-gray-400">{email}</div>
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
