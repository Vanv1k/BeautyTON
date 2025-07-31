import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toggleFavoriteRequest, type ToggleFavoriteData } from './request';

export const useToggleFavoriteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleFavoriteRequest,
    onSuccess: (_, variables: ToggleFavoriteData) => {
      // Инвалидируем кэш поиска мастеров после успешного изменения
      queryClient.invalidateQueries({ queryKey: ['searchMasters'] });

      // Можно также обновить конкретные данные мастера, если есть такой запрос
      queryClient.invalidateQueries({
        queryKey: ['master', variables.masterId],
      });
    },
    onError: () => {
      // TODO: Add proper error handling (toast notification, etc.)
    },
  });
};
