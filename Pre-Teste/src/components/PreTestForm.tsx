import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Loader2 } from "lucide-react";
import SuccessDialog from "./SuccessDialog";
import { supabase } from "@/integrations/supabase/client";

// CPF mask helper
function cpfMask(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})\.(\d{3})(\d)/, ".$1.$2-$3")
    .slice(0, 14);
}

// Perguntas com chaves igual a tabela
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
    title: "03) Assinale a simples característica de LIDERANÇA, para prevenção da vida?",
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
    options: ["Conheça o seu negócio.", "Confiança.", "Autenticidade.", "Integridade."],
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

const initialFormData = {
  nomeCompleto: "",
  cpf: "",
  pergunta01: "",
  conviccao01: [50],
  pergunta02: "",
  conviccao02: [50],
  pergunta03: "",
  conviccao03: [50],
  pergunta04: "",
  conviccao04: [50],
  pergunta05: "",
  conviccao05: [50],
  pergunta06: "",
  conviccao06: [50],
  pergunta07: "",
  conviccao07: [50],
  pergunta08: "",
  conviccao08: [50],
  pergunta09: "",
  conviccao09: [50],
  pergunta10: "",
  conviccao10: [50],
};

const PreTestForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [formData, setFormData] = useState<typeof initialFormData>(initialFormData);

  const handleInputChange = (field: keyof typeof initialFormData, value: string | number[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    // Requires nomeCompleto, cpf, todas as perguntas
    const requiredFields = ["nomeCompleto", "cpf", ...questions.map((q) => q.id)];
    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData] || formData[field as keyof typeof formData] === "") {
        return false;
      }
    }

    const cpfRegex = /^\d{11}$/;
    if (!cpfRegex.test(formData.cpf as string)) {
      toast({
        title: "CPF Inválido",
        description: "Digite somente números no formato 12345678910",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  // Função para verificar se o aluno existe na tabela Cadastro_Alunos
  async function checkAlunoExists(cpf: string) {
    const { data: alunos, error: fetchError } = await (supabase as any)
      .from("Cadastro_Alunos")
      .select("*")
      .eq("cpf", cpf);

    if (fetchError) {
      console.error("Erro ao buscar aluno:", fetchError);
      toast({
        title: "Erro inesperado",
        description: "Falha ao buscar informações de aluno",
        variant: "destructive",
      });
      throw fetchError;
    }

    // Retorna true se o aluno existe, false se não existe
    return alunos && alunos.length > 0;
  }

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
      // Verificar se o aluno existe antes de prosseguir
      const alunoExists = await checkAlunoExists(formData.cpf);
      
      if (!alunoExists) {
        toast({
          title: "CPF não encontrado",
          description: "Você não realizou o seu cadastro no formulário de cadastro de alunos. Efetue o seu cadastro antes de preencher o Pré Teste.",
          variant: "destructive",
          action: (
            <ToastAction altText="Abrir Formulário de Cadastro" onClick={() => window.open("https://acad-lid-mod-i-cadastro-alunos.vercel.app", "_blank")}>
              Abrir Formulário de Cadastro
            </ToastAction>
          ),
        });
        setIsSubmitting(false);
        return;
      }

      // Mapear respostas para as colunas TRUNCADAS do Supabase
      const payload: Record<string, any> = {
        nome_completo: formData.nomeCompleto,
        cpf: formData.cpf,
        // Os nomes das colunas abaixo correspondem às colunas truncadas no Supabase
        "01) No seu entendimento, como é classificado a cultura brasile": formData.pergunta01,
        conviccao01: (formData.conviccao01 as number[])[0],
        "02) Identifique três paradigmas (modelos mentais) de irrespons": formData.pergunta02,
        conviccao02: (formData.conviccao02 as number[])[0],
        "03) Assinale a simples característica de LIDERANÇA, para prev": formData.pergunta03,
        conviccao03: (formData.conviccao03 as number[])[0],
        "04) O que fez a Fórmula 1 reduzir drasticamente as fatalidades": formData.pergunta04,
        conviccao04: (formData.conviccao04 as number[])[0],
        "05) Qual o primeiro passo a ser dado para mudança, dentro dos ": formData.pergunta05,
        conviccao05: (formData.conviccao05 as number[])[0],
        "06) Segundo a pesquisa da GALLUP quantos porcento de pessoas es": formData.pergunta06,
        conviccao06: (formData.conviccao06 as number[])[0],
        "07) Qual a fórmula extraordinária de resultados sustentáveis": formData.pergunta07,
        conviccao07: (formData.conviccao07 as number[])[0],
        "08) Qual o pilar que serve como base de sustentação da Lidera": formData.pergunta08,
        conviccao08: (formData.conviccao08 as number[])[0],
        "09) Como se constrói a CONFIANÇA do líder junto a equipe?": formData.pergunta09,
        conviccao09: (formData.conviccao09 as number[])[0],
        "10) Defina Comportamento?": formData.pergunta10,
        conviccao10: (formData.conviccao10 as number[])[0],
      };

      // Fix: use 'as any' for tipagem customizada
      const { error } = await (supabase as any)
        .from("respostas_pre_teste")
        .insert([payload]);

      if (error) {
        console.error("Error submitting form:", error);
        toast({
          title: "Erro ao Enviar",
          description: "Ocorreu um erro ao enviar o formulário. Tente novamente.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      setSuccessOpen(true);
      setFormData({ ...initialFormData });
      setCurrentQuestion(0);
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

  const getConvictionImage = (value: number) => {
    if (value <= 30) {
      return "https://w1.pngwing.com/pngs/241/505/png-transparent-boy-football-soccer-soccer-ball-cartoon-soccer-kick-player-throwing-a-ball-playing-sports-football-player-thumbnail.png";
    } else if (value >= 70) {
      return "https://i.pinimg.com/474x/86/50/6a/86506a9a77cc49da93bfc2584edce5c7.jpg";
    }
    return "https://e7.pngegg.com/pngimages/48/293/png-clipart-painted-3d-3d-3d-villain-doubt-cartoon-creative-3d-thumbnail.png";
  };

  const getConvictionText = (value: number) => {
    if (value <= 30) return "Baixa convicção";
    if (value >= 70) return "Estou convicto da resposta";
    return "Estou em dúvida";
  };

  // Avançar para próxima questão ou finalizar
  const handleNext = () => setCurrentQuestion((prev) => prev + 1);
  const handlePrev = () => setCurrentQuestion((prev) => prev - 1);

  // Render one question at a time
  const renderSingleQuestion = (question: typeof questions[number], index: number) => {
    // Build the key for conviccao, e.g. conviccao01, conviccao02 ...
    const convictionKey = ("conviccao0" + (index + 1)) as keyof typeof initialFormData;
    // Safe get value as array of number
    const convictionRaw = formData[convictionKey];
    const convictionValueArray = Array.isArray(convictionRaw) ? convictionRaw : [50];
    const convictionValue = convictionValueArray[0];

    return (
      <div className="space-y-4 p-4 bg-slate-700/30 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">
            Pergunta {index + 1} de {questions.length}
          </span>
        </div>
        <h3 className="text-white font-medium text-base leading-relaxed">
          {question.title} *
        </h3>

        <RadioGroup
          value={typeof formData[question.id as keyof typeof initialFormData] === "string"
            ? (formData[question.id as keyof typeof initialFormData] as string)
            : ""}
          onValueChange={(value) => handleInputChange(question.id as keyof typeof initialFormData, value)}
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

        {/* Nível de Convicção */}
        <div className="mt-6 p-4 bg-slate-600/30 rounded-lg">
          <Label className="text-gray-300 font-medium mb-3 block">
            Nível de Convicção *
          </Label>

          <div className="space-y-4">
            <Slider
              value={convictionValueArray}
              onValueChange={(value) => handleInputChange(convictionKey, value)}
              max={100}
              step={1}
              className="w-full"
            />

            <div className="flex items-center justify-center space-x-4">
              <img
                src={getConvictionImage(typeof convictionValue === "number" ? convictionValue : 50)}
                alt="Conviction level"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-center">
                <div className="text-white font-bold text-lg">
                  {typeof convictionValue === "number" ? convictionValue : 50}%
                </div>
                <div className="text-gray-300 text-sm">
                  {getConvictionText(typeof convictionValue === "number" ? convictionValue : 50)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Se a questão atual está respondida
  const isQuestionAnswered = () => {
    const q = questions[currentQuestion];
    const convictionKey = ("conviccao0" + (currentQuestion + 1)) as keyof typeof initialFormData;
    const ans = formData[q.id as keyof typeof initialFormData];
    const convictionRaw = formData[convictionKey];
    const convictionValueArray = Array.isArray(convictionRaw) ? convictionRaw : [50];
    // check both the answer and the conviction value for this question
    return (
      typeof ans === "string" && ans.length > 0 &&
      typeof convictionValueArray[0] === "number"
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <SuccessDialog open={successOpen} onOpenChange={setSuccessOpen} />

      {/* Header */}
      <div className="text-center mb-8">
        <div className="mb-6">
          <img
            alt="Academia de Líderes Logo"
            className="mx-auto h-20 md:h-24 mb-4"
            src="/lovable-uploads/20ad0516-4432-4522-bcb2-b243b13efc0c.png"
          />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Academia de Líderes Módulo l
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-yellow-400 mb-3">
          Pré Teste
        </h2>
        <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
          Preencha seus dados abaixo e responda o questionário
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Dados Pessoais */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-xl">
              Dados do Aluno
            </CardTitle>
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
                CPF (somente números) *
              </Label>
              <Input
                id="cpf"
                value={cpfMask(formData.cpf)}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "");
                  handleInputChange("cpf", raw);
                }}
                placeholder="Digite somente números no formato 123.456.789-10"
                className="bg-slate-700 border-slate-600 text-white"
                maxLength={14}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* NOVO fluxo: apenas uma pergunta por vez */}
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
          </CardHeader>
          <CardContent>
            {renderSingleQuestion(questions[currentQuestion], currentQuestion)}
            <div className="flex justify-between items-center mt-6 gap-2">
              <Button
                type="button"
                disabled={currentQuestion === 0}
                onClick={handlePrev}
                className="bg-slate-600 text-white hover:bg-slate-700 px-6"
              >
                Anterior
              </Button>
              {currentQuestion < questions.length - 1 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8"
                  disabled={!isQuestionAnswered()}
                >
                  Próxima
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting || !isQuestionAnswered()}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 flex items-center"
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
            <div className="text-xs text-gray-500 text-center mt-3">
              Você pode revisar as respostas voltando pelas perguntas
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default PreTestForm;
