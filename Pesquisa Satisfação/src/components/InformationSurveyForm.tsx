
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import HeaderImage from "./HeaderImage";

// Mapeamento dos campos do formulário para as colunas da tabela
const formToDbMapping: Record<string, string> = {
  // Atendimento
  recepcao: "Recepção?",
  coffeeBreak: "Coffee Breack e alimentação?",
  // Infraestrutura
  salas: "Salas, seu espaço, layout, isolamento acústico etc.?",
  hallAtendimento: "Hall de atendimento?",
  banheiros: "Banheiros, quanto a limpeza, acessibilidade, etc.?",
  climatizacao: "Climatização, a eficiência de seu funcionamento?",
  // Áudio Visual
  equipamentos: "Equipamentos de projeção e sonorização?",
  // Instrutor
  interesse: "Habilidade para criar interesse sobre o assunto?",
  clareza: "Clareza e objetividade na exposição do tema?",
  dominio: "Domínio dos conteúdos abordados?",
  tempo: "Capacidade de utilização do tempo",
  confianca: "Transmissão de confiança e credibilidade?",
  // Conteúdo
  profundidade: "Os temas foram desenvolvidos em grau de profundidade condizente",
  relacao: "O conteúdo Trabalhado tem relação com as minhas atividades d",
  cargaHoraria: "A carga horária ideal para o conteúdo abordado",
  avaliacaoGeral: "Avaliação geral do conteúdo?",
  // Opinião
  texto: "No campo abaixo, gostaríamos de te ouvir, pode ser um elogio, "
};

interface CategoryData {
  atendimento: {
    recepcao: string;
    coffeeBreak: string;
  };
  infraestrutura: {
    salas: string;
    hallAtendimento: string;
    banheiros: string;
    climatizacao: string;
  };
  audioVisual: {
    equipamentos: string;
  };
  instrutor: {
    interesse: string;
    clareza: string;
    dominio: string;
    tempo: string;
    confianca: string;
  };
  conteudo: {
    profundidade: string;
    relacao: string;
    cargaHoraria: string;
    avaliacaoGeral: string;
  };
  opiniao: {
    texto: string;
  };
}

const InformationSurveyForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<CategoryData>({
    atendimento: {
      recepcao: "",
      coffeeBreak: ""
    },
    infraestrutura: {
      salas: "",
      hallAtendimento: "",
      banheiros: "",
      climatizacao: ""
    },
    audioVisual: {
      equipamentos: ""
    },
    instrutor: {
      interesse: "",
      clareza: "",
      dominio: "",
      tempo: "",
      confianca: ""
    },
    conteudo: {
      profundidade: "",
      relacao: "",
      cargaHoraria: "",
      avaliacaoGeral: ""
    },
    opiniao: {
      texto: ""
    }
  });

  const options = ["N/A", "Fraco", "Regular", "Bom", "Excelente"];

  const categories = [
    {
      id: "atendimento",
      title: "Atendimento",
      subtitle: "Avalie os aspectos relacionados ao atendimento recebido.",
      questions: [
        { key: "recepcao", label: "Recepção" },
        { key: "coffeeBreak", label: "Coffee break e alimentação" }
      ]
    },
    {
      id: "infraestrutura",
      title: "Infraestrutura",
      subtitle: "Avalie as condições das instalações físicas.",
      questions: [
        { key: "salas", label: "Salas (seu espaço, layout, isolamento acústico, etc.)" },
        { key: "hallAtendimento", label: "Hall de atendimento" },
        { key: "banheiros", label: "Banheiros (quanto à limpeza, acessibilidade, etc.)" },
        { key: "climatizacao", label: "Climatização (a eficiência de seu funcionamento)" }
      ]
    },
    {
      id: "audioVisual",
      title: "Áudio Visual",
      subtitle: "Avalie a qualidade dos recursos audiovisuais.",
      questions: [
        { key: "equipamentos", label: "Equipamentos de projeção e sonorização" }
      ]
    },
    {
      id: "instrutor",
      title: "Instrutor",
      subtitle: "Avalie o desempenho e as qualidades do instrutor.",
      questions: [
        { key: "interesse", label: "Habilidade para criar interesse sobre o assunto" },
        { key: "clareza", label: "Clareza e objetividade na exposição do tema" },
        { key: "dominio", label: "Domínio dos conteúdos abordados" },
        { key: "tempo", label: "Capacidade de utilização do tempo" },
        { key: "confianca", label: "Transmissão de confiança e credibilidade" }
      ]
    },
    {
      id: "conteudo",
      title: "Conteúdo/Metodologia",
      subtitle: "Avalie a relevância e a forma de apresentação do conteúdo.",
      questions: [
        { key: "profundidade", label: "Os temas foram desenvolvidos em grau de profundidade condizente com os objetivos propostos?" },
        { key: "relacao", label: "O conteúdo trabalhado tem relação com as minhas atividades diárias?" },
        { key: "cargaHoraria", label: "A carga horária ideal para o conteúdo abordado" },
        { key: "avaliacaoGeral", label: "Avaliação geral do conteúdo?" }
      ]
    },
    {
      id: "opiniao",
      title: "Opinião, sugestão de melhorias e críticas!",
      subtitle: "No campo abaixo, gostaríamos de te ouvir, pode ser um elogio, uma crítica, uma sugestão de melhoria, etc. Fique à vontade e lembre-se este formulário é totalmente anônimo e seu único intuito é a melhoria da empresa como um todo.",
      questions: []
    }
  ];

  const handleInputChange = (category: keyof CategoryData, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const validateCurrentCategory = () => {
    const currentCat = categories[currentCategory];
    if (currentCat.id === "opiniao") {
      return true;
    } else {
      const categoryData = formData[currentCat.id as keyof CategoryData] as Record<string, string>;
      for (const question of currentCat.questions) {
        if (!categoryData[question.key]) {
          return false;
        }
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentCategory()) {
      toast({
        title: "Categoria Incompleta",
        description: "Por favor, preencha todos os campos obrigatórios antes de continuar.",
        variant: "destructive"
      });
      return;
    }
    if (currentCategory < categories.length - 1) {
      setCurrentCategory(currentCategory + 1);
    }
  };

  const handlePrevious = () => {
    if (currentCategory > 0) {
      setCurrentCategory(currentCategory - 1);
    }
  };

  // Função para mapear os dados do formulário para colunas da tabela
  function mapFormToDbColumns(form: CategoryData) {
    const result: Record<string, any> = {};

    Object.entries(form).forEach(([catKey, catValue]) => {
      if (typeof catValue === "object" && catValue !== null) {
        Object.entries(catValue).forEach(([key, value]) => {
          const dbColumn = formToDbMapping[key];
          if (dbColumn != null) {
            result[dbColumn] = value;
          }
        });
      }
    });

    // Adiciona campo timestamp automático
    result["Carimbo de data/hora"] = new Date().toISOString().slice(0, 10);

    console.log("Dados que serão enviados para o banco:", result);
    return result;
  }

  // Submissão usando Supabase
  const handleSubmit = async () => {
    if (!validateCurrentCategory()) {
      toast({
        title: "Formulário Incompleto",
        description: "Por favor, complete todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = mapFormToDbColumns(formData);
      console.log("Iniciando submissão com dados:", payload);

      // Faz o insert no Supabase
      const { data, error } = await supabase
        .from("pesquisa_satisfacao_academia")
        .insert([payload])
        .select();

      console.log("Resposta do Supabase:", { data, error });

      if (error) {
        console.error("Erro ao inserir na pesquisa_satisfacao_academia:", error);
        toast({
          title: "Erro ao Enviar",
          description: `Ocorreu um erro ao enviar a pesquisa: ${error.message}`,
          variant: "destructive"
        });
        return;
      }

      console.log("Dados salvos com sucesso:", data);
      toast({
        title: "Pesquisa Enviada com Sucesso!",
        description: "Obrigado por sua participação na pesquisa."
      });

      setIsSubmitted(true);
    } catch (error: any) {
      console.error("Erro desconhecido ao enviar formulário:", error);
      toast({
        title: "Erro inesperado",
        description: `Não foi possível enviar sua pesquisa: ${error.message || 'Erro desconhecido'}`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderGridQuestions = (categoryId: string, questions: Array<{key: string, label: string}>) => (
    <div className="overflow-x-auto">
      <div className="min-w-full">
        <div className="grid grid-cols-6 gap-2 mb-4 p-2 bg-slate-600/30 rounded-lg">
          <div className="text-gray-300 font-medium text-sm">Critério</div>
          {options.map(option => (
            <div key={option} className="text-gray-300 font-medium text-sm text-center">
              {option}
            </div>
          ))}
        </div>
        <div className="space-y-3">
          {questions.map((question) => (
            <div key={question.key} className="grid grid-cols-6 gap-2 items-center p-2 bg-slate-700/30 rounded-lg">
              <div className="text-gray-300 text-sm leading-relaxed pr-2">
                {question.label}
              </div>
              <RadioGroup
                value={(formData[categoryId as keyof CategoryData] as Record<string, string>)[question.key] || ""}
                onValueChange={(value) => handleInputChange(categoryId as keyof CategoryData, question.key, value)}
                className="grid grid-cols-5 col-span-5 gap-2"
              >
                {options.map((option) => (
                  <div key={option} className="flex justify-center">
                    <RadioGroupItem
                      value={option}
                      id={`${question.key}-${option}`}
                      className="border-white text-white"
                    />
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderOpinionForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="opiniao" className="text-gray-300">Sua opinião, sugestão ou crítica</Label>
        <Textarea
          id="opiniao"
          value={formData.opiniao.texto}
          onChange={e => handleInputChange('opiniao', 'texto', e.target.value)}
          placeholder="Fique à vontade para compartilhar sua opinião..."
          className="bg-slate-700 border-slate-600 text-white min-h-[120px]"
          maxLength={500}
        />
        <div className="text-right text-gray-400 text-sm mt-1">
          {formData.opiniao.texto.length}/500 caracteres
        </div>
      </div>
    </div>
  );

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="mb-6">
            <HeaderImage className="mx-auto h-20 md:h-24 mb-4" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Academia de Líderes - Módulo I
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-yellow-400 mb-3">
            Pesquisa de Satisfação
          </h2>
        </div>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="text-center py-12 px-6">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  Parabéns pela conclusão do treinamento Academia de Líderes!
                </h3>
                <p className="text-lg md:text-xl text-gray-300">
                  Desejamos um até breve nos próximos treinamentos.
                </p>
              </div>
              <div className="pt-8 space-y-4">
                <p className="text-gray-300 text-base md:text-lg">
                  Conheça mais sobre a EDHEC e nossos próximos treinamentos em nosso site:
                </p>
                <a
                  href="https://edhec.com.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3 rounded-lg transition-colors duration-200"
                >
                  edhec.com.br
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentCat = categories[currentCategory];
  const isLastCategory = currentCategory === categories.length - 1;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <div className="mb-6">
          <HeaderImage className="mx-auto h-20 md:h-24 mb-4" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Academia de Líderes - Módulo I
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-yellow-400 mb-3">
          Pesquisa de Satisfação
        </h2>
        <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
          Sua opinião é muito importante para nós. Esta pesquisa é totalmente anônima.
        </p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-300 text-sm">
            Etapa {currentCategory + 1} de {categories.length}
          </span>
          <span className="text-gray-300 text-sm">
            {Math.round(((currentCategory + 1) / categories.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div
            className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentCategory + 1) / categories.length) * 100}%` }}
          />
        </div>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-xl">{currentCat.title}</CardTitle>
          <p className="text-gray-300 text-sm">{currentCat.subtitle}</p>
        </CardHeader>
        <CardContent>
          {currentCat.id === "opiniao" && renderOpinionForm()}
          {currentCat.questions.length > 0 && renderGridQuestions(currentCat.id, currentCat.questions)}
        </CardContent>
      </Card>

      <div className="flex justify-between items-center mt-8">
        <Button
          onClick={handlePrevious}
          disabled={currentCategory === 0 || isSubmitting}
          variant="outline"
          className="border-slate-600 text-gray-300 hover:bg-slate-700"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Anterior
        </Button>

        {isLastCategory ? (
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              'Enviar Pesquisa'
            )}
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={isSubmitting}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8"
          >
            Próxima Etapa
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default InformationSurveyForm;
