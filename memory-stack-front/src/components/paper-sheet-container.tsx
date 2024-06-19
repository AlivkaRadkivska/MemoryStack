interface PaperSheetContainerT {
  children: React.ReactNode;
}

export function PaperSheetContainer({ children }: PaperSheetContainerT) {
  return (
    <div className="flex flex-col items-start justify-start overflow-y-scroll text-wrap w-full h-full mx-1 p-1 pt-2 text-blue gap-1">
      <div className="w-full h-min notebook-texture pt-1 pb-7 leading-7 text-wrap">{children}</div>
    </div>
  );
}
