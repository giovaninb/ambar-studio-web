import type {
  ActivityItem,
  Cohort,
  DashboardMetrics,
  Patient,
  Scenario,
  Template,
  TimelineEvent,
} from "@/types/domain"

export const mockPatients: Patient[] = [
  {
    id: "pat-001",
    fullName: "Maria das Dores Souza",
    birthDate: "1979-04-13",
    sex: "Feminino",
    conditions: ["Hipertensão", "Diabetes tipo 2"],
  },
  {
    id: "pat-002",
    fullName: "Carlos Henrique Almeida",
    birthDate: "1968-09-22",
    sex: "Masculino",
    conditions: ["DPOC"],
  },
  {
    id: "pat-003",
    fullName: "Ana Beatriz Costa",
    birthDate: "1992-02-09",
    sex: "Feminino",
    conditions: ["Asma"],
  },
]

export const mockScenarios: Scenario[] = [
  {
    id: "scn-001",
    name: "Controle ambulatorial de DM2",
    durationDays: 180,
    complexity: "Média",
    patientId: "pat-001",
    updatedAt: "2026-04-03T14:30:00Z",
    eventCount: 9,
    tags: ["endócrino", "atenção primária"],
  },
  {
    id: "scn-002",
    name: "Exacerbação respiratória com pronto atendimento",
    durationDays: 30,
    complexity: "Alta",
    patientId: "pat-002",
    updatedAt: "2026-04-02T10:15:00Z",
    eventCount: 14,
    tags: ["urgência", "respiratório"],
  },
  {
    id: "scn-003",
    name: "Seguimento de asma leve persistente",
    durationDays: 120,
    complexity: "Baixa",
    patientId: "pat-003",
    updatedAt: "2026-03-28T19:20:00Z",
    eventCount: 6,
    tags: ["respiratório", "ambulatorial"],
  },
]

export const mockTimelineEvents: TimelineEvent[] = [
  {
    id: "evt-001",
    scenarioId: "scn-001",
    date: "2026-01-05",
    type: "consulta",
    title: "Consulta inicial de acompanhamento",
    description: "Avaliação clínica e solicitação de exames laboratoriais.",
    status: "realizado",
  },
  {
    id: "evt-002",
    scenarioId: "scn-001",
    date: "2026-01-07",
    type: "exame",
    title: "HbA1c e perfil lipídico",
    description: "Coleta de exames de rotina para controle metabólico.",
    status: "realizado",
  },
  {
    id: "evt-003",
    scenarioId: "scn-001",
    date: "2026-01-10",
    type: "medicacao",
    title: "Ajuste de metformina",
    description: "Aumento gradual de dose conforme adesão e tolerância.",
    status: "realizado",
  },
  {
    id: "evt-004",
    scenarioId: "scn-001",
    date: "2026-03-10",
    type: "consulta",
    title: "Retorno trimestral",
    description: "Revisão de metas e reforço de plano terapêutico.",
    status: "planejado",
  },
]

export const mockTemplates: Template[] = [
  {
    id: "tpl-001",
    name: "Template diabetes ambulatorial 6 meses",
    category: "Crônico",
    durationDays: 180,
    complexity: "Média",
    eventCount: 12,
    tags: ["diabetes", "metabólico", "APS"],
    description: "Fluxo de acompanhamento com consultas seriadas e monitoramento laboratorial.",
    variableParams: ["Faixa etária", "Severidade", "Adesão ao tratamento"],
  },
  {
    id: "tpl-002",
    name: "Template crise respiratória aguda",
    category: "Agudo",
    durationDays: 21,
    complexity: "Alta",
    eventCount: 10,
    tags: ["respiratório", "urgência"],
    description: "Jornada de exacerbação com pronto atendimento e retorno precoce.",
    variableParams: ["Sexo", "Frequência de eventos", "Severidade"],
  },
]

export const mockCohorts: Cohort[] = [
  {
    id: "coh-001",
    name: "Cohort DM2 - adultos 40-70",
    patientCount: 120,
    templateId: "tpl-001",
    conditions: ["Diabetes tipo 2", "Hipertensão"],
    severity: "Moderada",
    durationDays: 180,
    generatedAt: "2026-04-01T09:00:00Z",
  },
]

export const mockActivities: ActivityItem[] = [
  {
    id: "act-001",
    title: "Cenário atualizado",
    description: "Controle ambulatorial de DM2 foi editado por Produto.",
    at: "2026-04-03T14:35:00Z",
  },
  {
    id: "act-002",
    title: "Nova coorte gerada",
    description: "Cohort DM2 - adultos 40-70 concluída com 120 pacientes.",
    at: "2026-04-01T09:04:00Z",
  },
  {
    id: "act-003",
    title: "Template duplicado",
    description: "Template crise respiratória aguda foi clonado para validação.",
    at: "2026-03-31T18:20:00Z",
  },
]

export const mockDashboardMetrics: DashboardMetrics = {
  totalScenarios: mockScenarios.length,
  totalSyntheticPatients: 432,
  totalTemplates: mockTemplates.length,
  totalCohorts: mockCohorts.length,
}
