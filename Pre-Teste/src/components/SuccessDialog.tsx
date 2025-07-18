
import { Dialog, DialogContent } from "@/components/ui/dialog";

type SuccessDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function SuccessDialog({ open, onOpenChange }: SuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-800/90 border-slate-700 max-w-md p-6 rounded-xl flex flex-col items-center text-center">
        <img
          src="/lovable-uploads/20ad0516-4432-4522-bcb2-b243b13efc0c.png"
          alt="Academia de Líderes Logo"
          className="mx-auto h-20 md:h-24 mb-2"
        />
        <h2 className="text-2xl font-bold text-yellow-400 mt-2 mb-2">
          Formulário Enviado!
        </h2>
        <p className="text-gray-300 mb-4">
          Seus dados foram salvos com sucesso.<br />
          Obrigado por participar.<br />
          Você pode fechar esta mensagem ou sair da página com segurança.
        </p>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-2 rounded"
          onClick={() => onOpenChange(false)}
        >
          Fechar
        </button>
      </DialogContent>
    </Dialog>
  );
}

