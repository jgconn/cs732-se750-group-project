import { Card } from './ui/card';

interface InstructionProps {
  step: number;
  title: string;
  description: string;
}

export const Instruction = ({ step, title, description }: InstructionProps) => {
  return (
    <Card className='flex flex-col border-none bg-tertiary px-8 py-12 font-semibold text-white'>
      <h1 className='mb-4 text-xl'>
        <span className='mr-2 text-4xl'>{step}.</span> {title}
      </h1>
      <p>{description}</p>
    </Card>
  );
};
