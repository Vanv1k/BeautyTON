import { Select as BaseSelect } from '@heroui/react';

const Select = (props: React.ComponentProps<typeof BaseSelect>) => {
  return (
    <BaseSelect
      classNames={{
        innerWrapper: 'bg-transparent',
        trigger: [
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

export default Select;
