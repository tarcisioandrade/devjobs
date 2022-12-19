import { formatDistanceStrict } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

const useFormatter = () => {
  const formatter = (date: Date) =>
    formatDistanceStrict(new Date(date), new Date(), {
      locale: ptBR,
    });

  return { formatter };
};

export default useFormatter;
