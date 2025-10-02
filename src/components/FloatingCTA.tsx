interface FloatingCTAProps {
  onClick: () => void;
}

export function FloatingCTA({ onClick }: FloatingCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-amber-500 to-rose-500 shadow-2xl md:hidden">
      <div className="px-4 py-3">
        <button
          onClick={onClick}
          className="w-full bg-white text-gray-900 font-bold text-lg py-3 rounded-xl hover:bg-gray-100 transition-all transform active:scale-95 shadow-lg"
        >
          Garantir Minha Vaga!
        </button>
      </div>
    </div>
  );
}
