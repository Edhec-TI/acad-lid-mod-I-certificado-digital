
interface HeaderProps {
  logoUrl: string;
  title: string;
  subtitle: string;
}

export const Header = ({ logoUrl, title, subtitle }: HeaderProps) => {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-8">
          <img
          src={logoUrl}
          alt="Logo"
          className="mx-auto h-40 md:h-44 mb-4"
          />
      </div>
      
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-wide animate-fade-in">
        <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          {title.split(' - ')[0]}
        </span>
        {title.includes(' - ') && (
          <>
            <br />
            <span className="text-2xl md:text-4xl" style={{ color: '#DDDC00' }}>
              {title.split(' - ')[1]}
            </span>
          </>
        )}
      </h1>
      
      <p className="text-xl md:text-2xl font-semibold tracking-wider animate-fade-in" style={{ color: '#DDDC00' }}>
        {subtitle}
      </p>
      
      <div className="mt-6 w-24 h-1 bg-gradient-to-r from-green-400 to-orange-400 mx-auto rounded-full"></div>
    </div>
  );
};
