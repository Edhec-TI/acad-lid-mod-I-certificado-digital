
import { useState } from "react";
import PreTestForm from "@/components/PreTestForm";
import InformationSurveyForm from "@/components/InformationSurveyForm";
import FormSelector from "@/components/FormSelector";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Index = () => {
  const [selectedForm, setSelectedForm] = useState<'pretest' | 'survey' | null>('survey');

  const handleSelectForm = (formType: 'pretest' | 'survey') => {
    setSelectedForm(formType);
  };

  const handleBackToSelector = () => {
    setSelectedForm('survey');
  };

  if (selectedForm === 'pretest') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="container mx-auto px-4 py-4">
          <Button
            onClick={handleBackToSelector}
            variant="outline"
            className="border-slate-600 text-gray-300 hover:bg-slate-700 mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar à Pesquisa
          </Button>
        </div>
        <PreTestForm />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <InformationSurveyForm />
    </div>
  );
};

export default Index;
