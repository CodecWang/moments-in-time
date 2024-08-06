interface PageHeaderProps {
  title: string;
  children?: React.ReactNode;
}

export default function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <div className="sticky top-0 z-10 flex h-14 w-full items-center border-b border-gray-300 bg-base-100 px-4 py-2">
      <span className="sm:text-xl">{title}</span>

      <div className="flex flex-1 items-center justify-end">{children}</div>
    </div>
  );
}
