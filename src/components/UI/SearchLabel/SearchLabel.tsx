import { UseFormRegister } from "react-hook-form";

type Input = {
  search: string;
};

type Props = {
  register: UseFormRegister<Input>;
};

const SearchLabel = ({ register }: Props) => {
  return (
    <div className="flex justify-center">
      <div className="relative lg:min-w-[500px]">
        <label className="sr-only" htmlFor="search">
          Pesquisar
        </label>
        <input
          type="search"
          id="search"
          className="block p-4 w-full z-20 text-gray-900 bg-gray-50 rounded-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
          placeholder="Ex: frontend, node, javascript..."
          {...register("search")}
        />
        <button
          type="submit"
          className="absolute top-0 right-0 p-4 font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default SearchLabel;
