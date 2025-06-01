interface DashboardShellProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardShell({
  children,
  className,
  ...props
}: DashboardShellProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="flex flex-1 flex-col space-y-4 md:space-y-6"
      {...props}
    >
      {children}
    </div>
  );
}