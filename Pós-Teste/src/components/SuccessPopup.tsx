
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface SuccessPopupProps {
  onClose: () => void;
}

const SuccessPopup = ({ onClose }: SuccessPopupProps) => (
  <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center animate-fade-in">
    <Card className="bg-slate-800/90 border-slate-700 max-w-md w-full shadow-2xl">
      <CardHeader className="text-center">
        <div className="mb-2 flex justify-center">
          <img
            src="/lovable-uploads/362217eb-fd70-4ec7-a2d0-938f7e255b70.png"
            alt="Academia de Líderes Logo"
            className="h-16 md:h-20 mx-auto animate-scale-in"
          />
        </div>
        <CardTitle className="text-white text-2xl md:text-3xl font-bold mb-1">
          Academia de Líderes Módulo l
        </CardTitle>
        <h2 className="text-lg md:text-xl font-semibold text-yellow-400 mb-3">
          Pós Teste
        </h2>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-5 p-6">
        <Check size={48} className="text-green-400 bg-green-900/30 p-2 rounded-full border-4 border-green-400 shadow-lg" />
        <div className="text-center">
          <p className="text-xl text-white font-semibold mb-1">
            Avaliação enviada com sucesso!
          </p>
          <p className="text-gray-200 text-base mt-2">
            Agradecemos por participar do treinamento.<br/>
            Sua resposta é muito importante para nós!
          </p>
        </div>
        <Button
          onClick={onClose}
          className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-2"
        >
          Fechar
        </Button>
      </CardContent>
    </Card>
  </div>
);

export default SuccessPopup;
