export default function Card({ children, className = '', hover = true, ...props }) {
  const baseClasses = 'bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all duration-300';
  const hoverClasses = hover ? 'hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1' : '';
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`} {...props}>
      {children}
    </div>
  );
}
