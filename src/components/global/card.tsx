
interface CardProps {
  title?: string; // Optional title for the card
  children: React.ReactNode; // Main content of the card
  className?: string; // Additional CSS classes for the card
  actions?: React.ReactNode; // Buttons or links for card actions
}

const Card: React.FC<CardProps> = ({ title, children, className, actions }) => {
  return (
    <div
      className={`bg-white shadow rounded-md p-4 ${className ? className : ""}`}
    >
      {/* Card Title */}
      {title && (
        <h3 className="text-lg font-semibold text-primary mb-2">{title}</h3>
      )}

      {/* Card Content */}
      <div className="text-gray-700">{children}</div>

      {/* Card Actions */}
      {actions && <div className="mt-4 flex justify-end space-x-2">{actions}</div>}
    </div>
  );
};

export default Card;
