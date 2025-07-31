import { Autocomplete as BaseAutocomplete } from '@heroui/react';

const Autocomplete = <T extends object>(
  props: React.ComponentProps<typeof BaseAutocomplete<T>>,
) => {
  return (
    <BaseAutocomplete
      inputProps={{
        classNames: {
          inputWrapper: [
            'bg-default-200/50',
            'dark:bg-default/60',
            'backdrop-blur-xl',
            'backdrop-saturate-200',
            'hover:bg-default-200/70',
            'dark:hover:bg-default/70',
            'group-data-[focus=true]:bg-default-200/50',
            'dark:group-data-[focus=true]:bg-default/60',
          ],
        },
      }}
      {...props}
    />
  );
};

export default Autocomplete;
