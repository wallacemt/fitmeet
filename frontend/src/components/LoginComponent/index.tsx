export const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-10 h-10 border-4 border-primaria border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">Carregando...</p>
      </div>
    </div>
  );
};
