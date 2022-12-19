import ptBR from "date-fns/locale/pt-BR";
import { formatDistanceStrict, differenceInDays } from "date-fns";

const useFormatter = () => {
  const formatter = (date: Date) =>
    formatDistanceStrict(new Date(date), new Date(), {
      locale: ptBR,
    });

  const differenceDateAndToday = (date: Date) => {
    const today = new Date();
    return differenceInDays(today, date);
  };

  return { formatter, differenceDateAndToday };
};

export default useFormatter;
