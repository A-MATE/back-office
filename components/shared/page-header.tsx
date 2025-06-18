interface PageHeaderProps {
  heading: string;
  description?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  heading,
  description,
  children,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-1 md:gap-2">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="font-semibold text-2xl md:text-3xl">{heading}</h1>
          {description && (
            <p className="text-sm md:text-base text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        {children && (
          <div className="flex items-center gap-2 ml-4">{children}</div>
        )}
      </div>
    </div>
  );
}
