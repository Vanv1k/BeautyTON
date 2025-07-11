import { Textarea as BaseTextarea } from '@heroui/react';

const Textarea = (props: React.ComponentProps<typeof BaseTextarea>) => {
  return (
    <BaseTextarea
      classNames={{
        label: 'text-black/50 dark:text-white/90',
        input: [
          'bg-transparent',
          'text-black/90 dark:text-white/90',
          'placeholder:text-default-700/50 dark:placeholder:text-white/60',
        ],
        innerWrapper: 'bg-transparent',
        inputWrapper: [
          'bg-default-200/50',
          'dark:bg-default/60',
          'backdrop-blur-xl',
          'backdrop-saturate-200',
          'hover:bg-default-200/70',
          'dark:hover:bg-default/70',
          'group-data-[focus=true]:bg-default-200/50',
          'dark:group-data-[focus=true]:bg-default/60',
          '!cursor-text',
        ],
      }}
      {...props}
    />
  );
};

export default Textarea;
