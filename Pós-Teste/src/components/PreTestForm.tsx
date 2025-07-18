import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import SuccessPopup from "./SuccessPopup";
import { supabase } from "@/integrations/supabase/client";

function formatCpfMask(cpf: string) {
  const numbers = cpf.replace(/\D/g, "").slice(0, 11);
  return numbers
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1-$2');
}

// Utilitário para obter a data atual formatada YYYY-MM-DD
function getTodayString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const PreTestForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    nomeCompleto: "",
    cpf: "",
    pergunta01: "",
    pergunta02: "",
    pergunta03: "",
    pergunta04: "",
    pergunta05: "",
    pergunta06: "",
    pergunta07: "",
    pergunta08: "",
    pergunta09: "",
    pergunta10: "",
  });

  const questions = [
    {
      id: "pergunta01",
      title:
        "01) No seu entendimento, como é classificado a cultura brasileira de confronto de negociação segundo o estudo HAVARD BUSINESS REVEW?",
      options: [
        "Evita confronto e não expressa emoção.",
        "Gosta de confrontar e não expressa emoção.",
        "Expressa emoção e evita confronto.",
        "Gosta de confrontar mas expressa emoção.",
      ],
    },
    {
      id: "pergunta02",
      title:
        "02) Identifique três paradigmas (modelos mentais) de irresponsabilidade, influenciado pela cultura dos líderes na ocorrência de um acidente de trabalho nas empresas brasileiras.",
      options: [
        "A culpa é do acidentado - Nunca pedi para ele fazer isso - Os acidentes acontecem é muito risco.",
        "Isso foi uma aberração - Não temos leis fortes de Segurança - Ele era um bom empregado.",
        "A família vai sofrer - A segurança é custo - Vamos cuidar dele.",
        "Vai implicar ação judicial - A empresa exige um padrão seguro - Aonde eu errei.",
      ],
    },
    {
      id: "pergunta03",
      title:
        "03) Assinale a simples característica de LIDERANÇA, para prevenção da vida?",
      options: [
        "É gestão que é priorização.",
        "Clarear as expectativas.",
        "Confrontar a realidade e assumindo a responsabilidade.",
        "Todas estão certas.",
      ],
    },
    {
      id: "pergunta04",
      title:
        "04) O que fez a Fórmula 1 reduzir drasticamente as fatalidades dos pilotos depois da Morte de Ayrton Senna?",
      options: [
        "Aprimoramento na gestão de risco.",
        "Melhorias de segurança nos carros e nas roupas dos pilotos.",
        "Correta decisão política.",
        "Investimento financeiro em pesquisa e desenvolvimento.",
      ],
    },
    {
      id: "pergunta05",
      title:
        "05) Qual o primeiro passo a ser dado para mudança, dentro dos oito passos de mudança do professor de Harvard John Kotter?",
      options: [
        "Estruturar a coalisão junto a liderança.",
        "Estabelecer Senso de Urgência.",
        "Desenvolver a Visão, Estratégia e Valores.",
        "Propiciar vitórias de curto prazo.",
      ],
    },
    {
      id: "pergunta06",
      title:
        "06) Segundo a pesquisa da GALLUP quantos porcento de pessoas estão engajadas no trabalho, trabalham com paixão e se sentem conectados com a sua empresa, trazem melhorias e inovação?",
      options: ["28%.", "58%", "78%.", "88%"],
    },
    {
      id: "pergunta07",
      title: "07) Qual a fórmula extraordinária de resultados sustentáveis?",
      options: [
        "Resultado=(Processos+Pessoas).",
        "Resultado=(Processos+Estrategia).",
        "Resultado=(Processos+Gestão+Estrategia).",
        "Resultado=(Processos+Empresa)",
      ],
    },
    {
      id: "pergunta08",
      title:
        "08) Qual o pilar que serve como base de sustentação da Liderança, conforme os 12 Pilares da Liderança do Brigadeiro William Cohen?",
      options: [
        "Conheça o seu negócio.",
        "Confiança.",
        "Autenticidade.",
        "Integridade.",
      ],
    },
    {
      id: "pergunta09",
      title: "09) Como se constrói a CONFIANÇA do líder junto a equipe?",
      options: [
        "Comunicação e Meta.",
        "Competência e Apoio.",
        "Diretrizes e Feedback.",
        "Conhecimento e Feedback.",
      ],
    },
    {
      id: "pergunta10",
      title: "10) Defina Comportamento?",
      options: [
        "São escolhas dentro de um padrão social.",
        "São alinhamento de valores e atitudes.",
        "São ações e atitudes visíveis impulsionadas pelas crenças, hábitos e valores.",
        "É a motivação interna e externas que forma o caráter de um indivíduo.",
      ],
    },
  ];
  const totalQuestions = questions.length;

  const handleInputChange = (field: string, value: string) => {
    if (field === "cpf") {
      const onlyNumbers = value.replace(/\D/g, "").slice(0, 11);
      setFormData((prev) => ({
        ...prev,
        cpf: onlyNumbers,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const validateForm = () => {
    const requiredFields = [
      "nomeCompleto",
      "cpf",
      "pergunta01",
      "pergunta02",
      "pergunta03",
      "pergunta04",
      "pergunta05",
      "pergunta06",
      "pergunta07",
      "pergunta08",
      "pergunta09",
      "pergunta10",
    ];
    for (const field of requiredFields) {
      if (
        !formData[field as keyof typeof formData] ||
        formData[field as keyof typeof formData] === ""
      ) {
        return false;
      }
    }

    // Validar formato do CPF (apenas números, 11 dígitos)
    const cpfRegex = /^\d{11}$/;
    if (!cpfRegex.test(formData.cpf)) {
      toast({
        title: "CPF Inválido",
        description: "Digite somente números no formato 123.456.789-10",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  // MAP fields to columns
  const toPosTesteColumns = () => {
    return {
      "Nome Completo": formData.nomeCompleto,
      "CPF": formData.cpf,
      "01) No seu entendimento, como é classificado a cultura brasile":
        formData.pergunta01,
      "02) Identifique três paradigmas (modelos mentais) de irrespons":
        formData.pergunta02,
      "03) Assinale a simples característica de LIDERANÇA, para prev":
        formData.pergunta03,
      "04) O que fez a Fórmula 1 reduzir drasticamente as fatalidades":
        formData.pergunta04,
      "05) Qual o primeiro passo a ser dado para mudança, dentro dos ":
        formData.pergunta05,
      "06) Segundo a pesquisa da GALLUP quantos porcento de pessoas es":
        formData.pergunta06,
      "07) Qual a fórmula extraordinária de resultados sustentáveis":
        formData.pergunta07,
      "08) Qual o pilar que serve como base de sustentação da Lidera":
        formData.pergunta08,
      "09) Como se constrói a CONFIANÇA do líder junto a equipe?":
        formData.pergunta09,
      "10) Defina Comportamento?": formData.pergunta10,
      "Carimbo de data/hora": getTodayString(),
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({
        title: "Formulário Incompleto",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      // Insert into Supabase
      const insertData = toPosTesteColumns();
      const { error } = await supabase.from("pos_teste").insert(insertData);

      if (error) {
        console.error("Supabase insert error:", error);
        toast({
          title: "Erro ao Enviar",
          description: "Ocorreu um erro ao enviar o formulário. Tente novamente.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      toast({
        title: "Formulário Enviado com Sucesso!",
        description: "Seus dados foram salvos com sucesso.",
      });

      setShowSuccess(true);

      setFormData({
        nomeCompleto: "",
        cpf: "",
        pergunta01: "",
        pergunta02: "",
        pergunta03: "",
        pergunta04: "",
        pergunta05: "",
        pergunta06: "",
        pergunta07: "",
        pergunta08: "",
        pergunta09: "",
        pergunta10: "",
      });
      setCurrentQuestionIdx(0);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Erro ao Enviar",
        description: "Ocorreu um erro ao enviar o formulário. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Funções para navegação entre perguntas
  const nextQuestion = () => {
    if (currentQuestionIdx < totalQuestions - 1) setCurrentQuestionIdx(idx => idx + 1);
  };
  const prevQuestion = () => {
    if (currentQuestionIdx > 0) setCurrentQuestionIdx(idx => idx - 1);
  };

  // Elementos de perguntas
  const question = questions[currentQuestionIdx];
  const questionKey = question.id as keyof typeof formData;

  // Progresso (percentual)
  const progress = Math.round(((currentQuestionIdx + 1) / totalQuestions) * 100);

  // Função para fechar o popup de sucesso
  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {showSuccess && <SuccessPopup onClose={handleCloseSuccess} />}
      {/* Header */}
      <div className="text-center mb-8">
        <div className="mb-6">
          <img
            src="/lovable-uploads/362217eb-fd70-4ec7-a2d0-938f7e255b70.png"
            alt="Academia de Líderes Logo"
            className="mx-auto h-20 md:h-24 mb-4"
          />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Academia de Líderes Módulo l
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-yellow-400 mb-3">
          Pós Teste
        </h2>
        <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
          Preencha seus dados para responder o pós teste
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Dados Pessoais */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-xl">Dados do Aluno</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="nomeCompleto" className="text-gray-300">
                Nome Completo *
              </Label>
              <Input
                id="nomeCompleto"
                value={formData.nomeCompleto}
                onChange={(e) =>
                  handleInputChange("nomeCompleto", e.target.value)
                }
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
            </div>

            <div>
              <Label htmlFor="cpf" className="text-gray-300">
                CPF *
              </Label>
              <Input
                id="cpf"
                inputMode="numeric"
                autoComplete="off"
                value={formatCpfMask(formData.cpf)}
                onChange={(e) => handleInputChange("cpf", e.target.value)}
                placeholder="123.456.789-10"
                className="bg-slate-700 border-slate-600 text-white"
                maxLength={14} // 14 caracteres contando pontos e hífen
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Seção de Avaliação com navegação e progresso */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-xl">
              Seção de Avaliação - Pré Teste
            </CardTitle>
            <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-4 mt-4">
              <p className="text-yellow-400 font-medium">
                Ao responder, considere que cada questão possui uma única alternativa correta.
              </p>
            </div>
            {/* Barra de Progresso */}
            <div className="mt-4">
              <span className="text-gray-300 text-sm">{`Pergunta ${currentQuestionIdx + 1} de ${totalQuestions}`}</span>
              <div className="mt-2">
                <Progress value={progress} className="h-2 bg-slate-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4 p-4 bg-slate-700/30 rounded-lg animate-fade-in">
              <h3 className="text-white font-medium text-sm md:text-base leading-relaxed">
                {question.title} *
              </h3>
              <RadioGroup
                value={formData[questionKey] as string}
                onValueChange={(value) =>
                  handleInputChange(question.id, value)
                }
                className="space-y-3"
              >
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-start space-x-3">
                    <RadioGroupItem
                      value={option}
                      id={`${question.id}-${optionIndex}`}
                      className="border-white text-white mt-1 flex-shrink-0"
                    />
                    <Label
                      htmlFor={`${question.id}-${optionIndex}`}
                      className="text-gray-300 text-sm leading-relaxed cursor-pointer flex-1"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Navegação entre perguntas */}
            <div className="flex justify-between gap-4 pt-2">
              <Button
                type="button"
                onClick={prevQuestion}
                disabled={currentQuestionIdx === 0}
                variant="secondary"
                className="px-6 py-2"
              >
                Anterior
              </Button>
              {currentQuestionIdx < totalQuestions - 1 ? (
                <Button
                  type="button"
                  onClick={nextQuestion}
                  disabled={!formData[questionKey]}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-2"
                >
                  Próxima
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting || !formData[questionKey]}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar Formulário"
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        {/* <div className="flex justify-center pt-6">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 text-lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar Formulário"
            )}
          </Button>
        </div> */}
      </form>
    </div>
  );
};

export default PreTestForm;
