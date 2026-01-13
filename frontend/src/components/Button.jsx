export default function Button({ children, variant = 'primary', size = 'md', type = 'button', disabled = false, className = '', ...props }) {
  const baseStyles = 'px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group transform hover:scale-105 active:scale-95';
  
  const sizes = {
    sm: 'px-4 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg'
  };

  const variants = {
    primary: 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-500 hover:to-primary-600 shadow-lg hover:shadow-primary-500/30',
    secondary: 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 hover:from-gray-300 hover:to-gray-400 shadow-md hover:shadow-gray-400/30 dark:from-gray-700 dark:to-gray-600 dark:text-white dark:hover:from-gray-600 dark:hover:to-gray-500',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 hover:border-primary-700 hover:text-primary-700 shadow-md hover:shadow-primary-500/20 dark:text-primary-400 dark:border-primary-400 dark:hover:bg-primary-900/20 dark:hover:text-primary-300',
    danger: 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-500 hover:to-red-600 shadow-lg hover:shadow-red-500/30',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white',
    gradient: 'bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 text-white hover:from-primary-500 hover:via-purple-500 hover:to-pink-500 shadow-lg hover:shadow-purple-500/30 animate-gradient-x'
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}
