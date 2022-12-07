type Props = {
  stacks: string[][];
  removeSelect: (stack: string) => void;
};

const StacksSelected = ({ stacks, removeSelect }: Props) => {

  if (stacks.length <= 0) return null;
  return (
    <div className="mt-5 flex items-center gap-4">
      {stacks.map((stack, i) => (
        <div
          className="border border-blueLock  p-1 rounded bg-gray-900  dark:text-blueLock"
          key={i}
        >
          {stack[1]}
          <button className="inline-block mx-1 cursor-pointer" onClick={() => removeSelect(stack[0])}>X</button>
        </div>
      ))}
    </div>
  );
};

export default StacksSelected;
