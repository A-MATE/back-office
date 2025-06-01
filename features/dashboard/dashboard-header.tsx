interface DashboardHeaderProps {
  heading: string;
  description?: string;
  children?: React.ReactNode;
}

export function DashboardHeader({
  heading,
  description,
  children,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-1 md:gap-2">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-2xl md:text-3xl">{heading}</h1>
          {description && (
            <p className="text-sm md:text-base text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}