import CandidateLine from "./CandidateLine";
import ErrorToast from "@components/ErrorToast";
import SuccessToast from "@components/SuccessToast/SuccessToast";
import Router from "next/router";
import { Button, Modal } from "flowbite-react";
import { fetchDeleteJob } from "@services/fetchJob";
import { toast } from "react-hot-toast";
import { useState } from "react";

type Props = {
  candidates: string[];
  id: string;
};

const Dashboard = ({ candidates, id }: Props) => {
  const [openModal, setOpenModal] = useState(false);

  const handleDeleteJob = async () => {
    try {
      await fetchDeleteJob(id);
      toast.custom(() => (
        <SuccessToast message="Vaga deletada, a página será atualizada em 2 segundos." />
      ));
      setTimeout(() => Router.reload(), 2000);
    } catch (error) {
      toast.custom(() => (
        <ErrorToast message="Falha na solicitação, por favor, tente novamente." />
      ));
    }
  };

  const handleOpenModal = () => setOpenModal(!openModal);

  return (
    <div className="border border-gray-700 mt-[-2px] bg-gray-800 p-4 drop-shadow-xl rounded-b hidden">
      <Button
        color="failure"
        size="xs"
        className="mb-4 ml-auto w-fit"
        onClick={handleOpenModal}
      >
        Deletar Vaga
      </Button>
      {candidates.length ? (
        <span className="dark:text-gray-200 text-lg">Candidatos</span>
      ) : <span className="dark:text-gray-200 text-lg">Nenhum candidato aplicado a vaga.</span>}
      <div className="mt-6 flex flex-col gap-4">
        {candidates.map((candidate) => (
          <CandidateLine key={candidate} candidate={candidate} />
        ))}
      </div>

      <Modal
        show={openModal}
        size="md"
        popup={true}
        onClose={handleOpenModal}
        className="h-screen"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Tem certeza que deseja apagar esta vaga?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteJob}>
                Sim, eu tenho
              </Button>
              <Button color="gray" onClick={handleOpenModal}>
                Não, cancela
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Dashboard;
