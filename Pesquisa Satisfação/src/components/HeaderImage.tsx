
import { useState } from "react";

const HEADER_IMG_URL = "/lovable-uploads/cca0dddd-7bea-48a8-98d2-d64bbd985ed1.png";
const FALLBACK_IMG_URL = "https://photo-1531297484001-80022131f5a1.lovable.app/photo-1531297484001-80022131f5a1"; // Placeholder interno da Lovable

interface HeaderImageProps {
  className?: string;
}

const HeaderImage = ({ className }: HeaderImageProps) => {
  const [src, setSrc] = useState(HEADER_IMG_URL);

  return (
    <img
      src={src}
      alt="Academia de Líderes Logo"
      onError={() => setSrc(FALLBACK_IMG_URL)}
      className={className ?? ""}
    />
  );
};

export default HeaderImage;

