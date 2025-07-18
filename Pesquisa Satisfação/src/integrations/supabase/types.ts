export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Cadastro_Alunos: {
        Row: {
          carimbo_data_hora: string | null
          cidade_residencia: string | null
          cidade_treinamento: string | null
          cpf: string
          data_treinamento: string | null
          email: string | null
          empresa: string | null
          escolaridade: string | null
          estado_emocional: string | null
          estado_residencia: string | null
          estado_treinamento: string | null
          funcao: string | null
          hora_treinamento: string | null
          id_aluno: string | null
          idade: string | null
          nome_completo: string | null
          telefone: string | null
          treinamento_id: number | null
        }
        Insert: {
          carimbo_data_hora?: string | null
          cidade_residencia?: string | null
          cidade_treinamento?: string | null
          cpf: string
          data_treinamento?: string | null
          email?: string | null
          empresa?: string | null
          escolaridade?: string | null
          estado_emocional?: string | null
          estado_residencia?: string | null
          estado_treinamento?: string | null
          funcao?: string | null
          hora_treinamento?: string | null
          id_aluno?: string | null
          idade?: string | null
          nome_completo?: string | null
          telefone?: string | null
          treinamento_id?: number | null
        }
        Update: {
          carimbo_data_hora?: string | null
          cidade_residencia?: string | null
          cidade_treinamento?: string | null
          cpf?: string
          data_treinamento?: string | null
          email?: string | null
          empresa?: string | null
          escolaridade?: string | null
          estado_emocional?: string | null
          estado_residencia?: string | null
          estado_treinamento?: string | null
          funcao?: string | null
          hora_treinamento?: string | null
          id_aluno?: string | null
          idade?: string | null
          nome_completo?: string | null
          telefone?: string | null
          treinamento_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Cadastro_Alunos_treinamento_id_fkey"
            columns: ["treinamento_id"]
            isOneToOne: false
            referencedRelation: "DADOS_TREINAMENTOS"
            referencedColumns: ["Treinamento_id"]
          },
        ]
      }
      DADOS_TREINAMENTOS: {
        Row: {
          CIDADE: string | null
          CONTRATO: string | null
          "Data Fim": string | null
          "DATA INICIO": string | null
          "EMPRESA CLIENTE": string | null
          EQUIPE: string | null
          ESTADO: string | null
          Treinamento_id: number
        }
        Insert: {
          CIDADE?: string | null
          CONTRATO?: string | null
          "Data Fim"?: string | null
          "DATA INICIO"?: string | null
          "EMPRESA CLIENTE"?: string | null
          EQUIPE?: string | null
          ESTADO?: string | null
          Treinamento_id: number
        }
        Update: {
          CIDADE?: string | null
          CONTRATO?: string | null
          "Data Fim"?: string | null
          "DATA INICIO"?: string | null
          "EMPRESA CLIENTE"?: string | null
          EQUIPE?: string | null
          ESTADO?: string | null
          Treinamento_id?: number
        }
        Relationships: []
      }
      pesquisa_satisfacao_academia: {
        Row: {
          "A carga horária ideal para o conteúdo abordado": string | null
          "Avaliação geral do conteúdo?": string | null
          "Banheiros, quanto a limpeza, acessibilidade, etc.?": string | null
          "Capacidade de utilização do tempo": string | null
          "Carimbo de data/hora": string | null
          "Clareza e objetividade na exposição do tema?": string | null
          "Climatização, a eficiência de seu funcionamento?": string | null
          "Coffee Breack e alimentação?": string | null
          "Domínio dos conteúdos abordados?": string | null
          "Equipamentos de projeção e sonorização?": string | null
          "Habilidade para criar interesse sobre o assunto?": string | null
          "Hall de atendimento?": string | null
          "No campo abaixo, gostaríamos de te ouvir, pode ser um elogio, ":
            | string
            | null
          "O conteúdo Trabalhado tem relação com as minhas atividades d":
            | string
            | null
          "Os temas foram desenvolvidos em grau de profundidade condizente":
            | string
            | null
          pesquisa_id: string
          "Recepção?": string | null
          "Salas, seu espaço, layout, isolamento acústico etc.?": string | null
          "Transmissão de confiança e credibilidade?": string | null
          "treinamento id": string | null
        }
        Insert: {
          "A carga horária ideal para o conteúdo abordado"?: string | null
          "Avaliação geral do conteúdo?"?: string | null
          "Banheiros, quanto a limpeza, acessibilidade, etc.?"?: string | null
          "Capacidade de utilização do tempo"?: string | null
          "Carimbo de data/hora"?: string | null
          "Clareza e objetividade na exposição do tema?"?: string | null
          "Climatização, a eficiência de seu funcionamento?"?: string | null
          "Coffee Breack e alimentação?"?: string | null
          "Domínio dos conteúdos abordados?"?: string | null
          "Equipamentos de projeção e sonorização?"?: string | null
          "Habilidade para criar interesse sobre o assunto?"?: string | null
          "Hall de atendimento?"?: string | null
          "No campo abaixo, gostaríamos de te ouvir, pode ser um elogio, "?:
            | string
            | null
          "O conteúdo Trabalhado tem relação com as minhas atividades d"?:
            | string
            | null
          "Os temas foram desenvolvidos em grau de profundidade condizente"?:
            | string
            | null
          pesquisa_id?: string
          "Recepção?"?: string | null
          "Salas, seu espaço, layout, isolamento acústico etc.?"?: string | null
          "Transmissão de confiança e credibilidade?"?: string | null
          "treinamento id"?: string | null
        }
        Update: {
          "A carga horária ideal para o conteúdo abordado"?: string | null
          "Avaliação geral do conteúdo?"?: string | null
          "Banheiros, quanto a limpeza, acessibilidade, etc.?"?: string | null
          "Capacidade de utilização do tempo"?: string | null
          "Carimbo de data/hora"?: string | null
          "Clareza e objetividade na exposição do tema?"?: string | null
          "Climatização, a eficiência de seu funcionamento?"?: string | null
          "Coffee Breack e alimentação?"?: string | null
          "Domínio dos conteúdos abordados?"?: string | null
          "Equipamentos de projeção e sonorização?"?: string | null
          "Habilidade para criar interesse sobre o assunto?"?: string | null
          "Hall de atendimento?"?: string | null
          "No campo abaixo, gostaríamos de te ouvir, pode ser um elogio, "?:
            | string
            | null
          "O conteúdo Trabalhado tem relação com as minhas atividades d"?:
            | string
            | null
          "Os temas foram desenvolvidos em grau de profundidade condizente"?:
            | string
            | null
          pesquisa_id?: string
          "Recepção?"?: string | null
          "Salas, seu espaço, layout, isolamento acústico etc.?"?: string | null
          "Transmissão de confiança e credibilidade?"?: string | null
          "treinamento id"?: string | null
        }
        Relationships: []
      }
      pos_teste: {
        Row: {
          "01) No seu entendimento, como é classificado a cultura brasile":
            | string
            | null
          "02) Identifique três paradigmas (modelos mentais) de irrespons":
            | string
            | null
          "03) Assinale a simples característica de LIDERANÇA, para prev":
            | string
            | null
          "04) O que fez a Fórmula 1 reduzir drasticamente as fatalidades":
            | string
            | null
          "05) Qual o primeiro passo a ser dado para mudança, dentro dos ":
            | string
            | null
          "06) Segundo a pesquisa da GALLUP quantos porcento de pessoas es":
            | string
            | null
          "07) Qual a fórmula extraordinária de resultados sustentáveis":
            | string
            | null
          "08) Qual o pilar que serve como base de sustentação da Lidera":
            | string
            | null
          "09) Como se constrói a CONFIANÇA do líder junto a equipe?":
            | string
            | null
          "10) Defina Comportamento?": string | null
          "Carimbo de data/hora": string | null
          CPF: string | null
          "Nome Completo": string | null
          pos_teste_id: string
          "Qual cidade você está realizando o treinamento?": string | null
          "Qual estado você esta realizando o treinamento?": string | null
          treinamento_id: number | null
        }
        Insert: {
          "01) No seu entendimento, como é classificado a cultura brasile"?:
            | string
            | null
          "02) Identifique três paradigmas (modelos mentais) de irrespons"?:
            | string
            | null
          "03) Assinale a simples característica de LIDERANÇA, para prev"?:
            | string
            | null
          "04) O que fez a Fórmula 1 reduzir drasticamente as fatalidades"?:
            | string
            | null
          "05) Qual o primeiro passo a ser dado para mudança, dentro dos "?:
            | string
            | null
          "06) Segundo a pesquisa da GALLUP quantos porcento de pessoas es"?:
            | string
            | null
          "07) Qual a fórmula extraordinária de resultados sustentáveis"?:
            | string
            | null
          "08) Qual o pilar que serve como base de sustentação da Lidera"?:
            | string
            | null
          "09) Como se constrói a CONFIANÇA do líder junto a equipe?"?:
            | string
            | null
          "10) Defina Comportamento?"?: string | null
          "Carimbo de data/hora"?: string | null
          CPF?: string | null
          "Nome Completo"?: string | null
          pos_teste_id?: string
          "Qual cidade você está realizando o treinamento?"?: string | null
          "Qual estado você esta realizando o treinamento?"?: string | null
          treinamento_id?: number | null
        }
        Update: {
          "01) No seu entendimento, como é classificado a cultura brasile"?:
            | string
            | null
          "02) Identifique três paradigmas (modelos mentais) de irrespons"?:
            | string
            | null
          "03) Assinale a simples característica de LIDERANÇA, para prev"?:
            | string
            | null
          "04) O que fez a Fórmula 1 reduzir drasticamente as fatalidades"?:
            | string
            | null
          "05) Qual o primeiro passo a ser dado para mudança, dentro dos "?:
            | string
            | null
          "06) Segundo a pesquisa da GALLUP quantos porcento de pessoas es"?:
            | string
            | null
          "07) Qual a fórmula extraordinária de resultados sustentáveis"?:
            | string
            | null
          "08) Qual o pilar que serve como base de sustentação da Lidera"?:
            | string
            | null
          "09) Como se constrói a CONFIANÇA do líder junto a equipe?"?:
            | string
            | null
          "10) Defina Comportamento?"?: string | null
          "Carimbo de data/hora"?: string | null
          CPF?: string | null
          "Nome Completo"?: string | null
          pos_teste_id?: string
          "Qual cidade você está realizando o treinamento?"?: string | null
          "Qual estado você esta realizando o treinamento?"?: string | null
          treinamento_id?: number | null
        }
        Relationships: []
      }
      respostas_pre_teste: {
        Row: {
          "01) No seu entendimento, como é classificado a cultura brasile": string
          "02) Identifique três paradigmas (modelos mentais) de irrespons": string
          "03) Assinale a simples característica de LIDERANÇA, para prev": string
          "04) O que fez a Fórmula 1 reduzir drasticamente as fatalidades": string
          "05) Qual o primeiro passo a ser dado para mudança, dentro dos ": string
          "06) Segundo a pesquisa da GALLUP quantos porcento de pessoas es": string
          "07) Qual a fórmula extraordinária de resultados sustentáveis": string
          "08) Qual o pilar que serve como base de sustentação da Lidera": string
          "09) Como se constrói a CONFIANÇA do líder junto a equipe?": string
          "10) Defina Comportamento?": string
          carimbo_data_hora: string | null
          conviccao01: number
          conviccao02: number
          conviccao03: number
          conviccao04: number
          conviccao05: number
          conviccao06: number
          conviccao07: number
          conviccao08: number
          conviccao09: number
          conviccao10: number
          cpf: string
          nome_completo: string
          respostas_id: string
          treinamentos_id: number | null
        }
        Insert: {
          "01) No seu entendimento, como é classificado a cultura brasile": string
          "02) Identifique três paradigmas (modelos mentais) de irrespons": string
          "03) Assinale a simples característica de LIDERANÇA, para prev": string
          "04) O que fez a Fórmula 1 reduzir drasticamente as fatalidades": string
          "05) Qual o primeiro passo a ser dado para mudança, dentro dos ": string
          "06) Segundo a pesquisa da GALLUP quantos porcento de pessoas es": string
          "07) Qual a fórmula extraordinária de resultados sustentáveis": string
          "08) Qual o pilar que serve como base de sustentação da Lidera": string
          "09) Como se constrói a CONFIANÇA do líder junto a equipe?": string
          "10) Defina Comportamento?": string
          carimbo_data_hora?: string | null
          conviccao01: number
          conviccao02: number
          conviccao03: number
          conviccao04: number
          conviccao05: number
          conviccao06: number
          conviccao07: number
          conviccao08: number
          conviccao09: number
          conviccao10: number
          cpf: string
          nome_completo: string
          respostas_id?: string
          treinamentos_id?: number | null
        }
        Update: {
          "01) No seu entendimento, como é classificado a cultura brasile"?: string
          "02) Identifique três paradigmas (modelos mentais) de irrespons"?: string
          "03) Assinale a simples característica de LIDERANÇA, para prev"?: string
          "04) O que fez a Fórmula 1 reduzir drasticamente as fatalidades"?: string
          "05) Qual o primeiro passo a ser dado para mudança, dentro dos "?: string
          "06) Segundo a pesquisa da GALLUP quantos porcento de pessoas es"?: string
          "07) Qual a fórmula extraordinária de resultados sustentáveis"?: string
          "08) Qual o pilar que serve como base de sustentação da Lidera"?: string
          "09) Como se constrói a CONFIANÇA do líder junto a equipe?"?: string
          "10) Defina Comportamento?"?: string
          carimbo_data_hora?: string | null
          conviccao01?: number
          conviccao02?: number
          conviccao03?: number
          conviccao04?: number
          conviccao05?: number
          conviccao06?: number
          conviccao07?: number
          conviccao08?: number
          conviccao09?: number
          conviccao10?: number
          cpf?: string
          nome_completo?: string
          respostas_id?: string
          treinamentos_id?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      armor: {
        Args: { "": string }
        Returns: string
      }
      dearmor: {
        Args: { "": string }
        Returns: string
      }
      gen_random_bytes: {
        Args: { "": number }
        Returns: string
      }
      gen_random_uuid: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      gen_salt: {
        Args: { "": string }
        Returns: string
      }
      generate_unique_alphanumeric_id: {
        Args:
          | Record<PropertyKey, never>
          | { length_param: number; table_name: string; column_name: string }
        Returns: string
      }
      pgp_armor_headers: {
        Args: { "": string }
        Returns: Record<string, unknown>[]
      }
      pgp_key_id: {
        Args: { "": string }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
