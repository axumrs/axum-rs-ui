type ChildrenProps = {
  children: React.ReactNode;
};

type ClassNameProps = {
  className?: string;
};

type ComponentProps = ChildrenProps & ClassNameProps;
