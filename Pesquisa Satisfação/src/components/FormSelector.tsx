
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ClipboardCheck } from "lucide-react";

interface FormSelectorProps {
  onSelectForm: (formType: 'pretest' | 'survey') => void;
}

const FormSelector = ({ onSelectForm }: FormSelectorProps) => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="mb-6">
          <img
            src="https://fomrs-acad-lider.lovable.app/lovable-uploads/cd5b5d51-f39e-4ded-9d8a-686459ccc11b.png"
            alt="Academia de Líderes Logo"
            className="mx-auto h-20 md:h-24 mb-4"
          />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Academia de Líderes - Módulo I
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Selecione o formulário que deseja preencher
        </p>
      </div>

      {/* Form Options */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors cursor-pointer group">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-4 bg-blue-500/20 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
              <FileText className="h-8 w-8 text-blue-400" />
            </div>
            <CardTitle className="text-white text-xl">Pré Teste</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-300 mb-6">
              Avaliação de conhecimentos antes do treinamento com questões de múltipla escolha e medição de convicção.
            </p>
            <Button
              onClick={() => onSelectForm('pretest')}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              Iniciar Pré Teste
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors cursor-pointer group">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-4 bg-green-500/20 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
              <ClipboardCheck className="h-8 w-8 text-green-400" />
            </div>
            <CardTitle className="text-white text-xl">Pesquisa de Informação</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-300 mb-6">
              Avaliação da qualidade do treinamento, infraestrutura, atendimento e instrutor.
            </p>
            <Button
              onClick={() => onSelectForm('survey')}
              className="w-full bg-green-500 hover:bg-green-600 text-white"
            >
              Iniciar Pesquisa
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FormSelector;
