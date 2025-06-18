interface DashboardShellProps {
  children: React.ReactNode;
  className?: string;
}

export function PageWrapper({
  children,
  className,
  ...props
}: DashboardShellProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="flex flex-1 flex-col space-y-4 md:space-y-6 p-4" {...props}>
      {children}
    </div>
  );
}
