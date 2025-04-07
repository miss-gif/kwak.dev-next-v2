interface AuthHeaderProps {
  title: string;
  description: string;
}

export const AuthHeader = ({ title, description }: AuthHeaderProps) => (
  <div className="pb-10 space-y-2">
    <div className="text-center text-5xl font-semibold">{title}</div>
    <div className="text-center text-xs text-gray-500">{description}</div>
  </div>
);
