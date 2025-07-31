export type ToggleFavoriteData = {
  masterId: number;
  isFavorite: boolean;
};

export type ToggleFavoriteResult =
  | { result: { success: boolean }; hasError: false }
  | { result: Error; hasError: true };

/**
 * Запрос для переключения избранного
 */
export const toggleFavoriteRequest = async (
  data: ToggleFavoriteData,
): Promise<ToggleFavoriteResult> => {
  try {
    // Симулируем задержку сети
    await new Promise((resolve) => setTimeout(resolve, 200));

    // В реальном API здесь был бы POST запрос на сервер
    // TODO: Implement real API call with data.masterId and data.isFavorite
    void data; // Используем data чтобы избежать ошибки TS

    return { result: { success: true }, hasError: false };
  } catch (error) {
    const errorResult =
      error instanceof Error ? error : new Error('Unknown error');
    return { result: errorResult, hasError: true };
  }
};
