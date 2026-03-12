import Link from 'next/link';

export default function Button({ 
    href, 
    children, 
    variant = 'primary', 
    className = '', 
    ...props 
}) {
    const baseStyles = "inline-block text-lg px-6 py-3 rounded-md font-semibold transition-all duration-300 border-2 leading-[1]";
    
    const variants = {
        primary: "bg-blue-600 border-blue-600 text-white hover:bg-blue-700 hover:border-blue-700",
        outline: "bg-transparent border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
        ghost: "bg-transparent border-white text-white hover:bg-white hover:text-blue-600",
        secondary: "bg-white border-white text-blue-600 hover:bg-transparent hover:text-white",
        link: "bg-transparent border-transparent text-blue-600 hover:underline hover:bg-transparent hover:border-transparent",
    };

    const variantStyles = variants[variant] || variants.primary;
    const combinedClassName = `${baseStyles} ${variantStyles} ${className}`;

    if (href) {
        return (
            <Link href={href} className={combinedClassName} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button className={combinedClassName} {...props}>
            {children}
        </button>
    );
}
