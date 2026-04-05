export type ScenarioComplexity = "Baixa" | "Média" | "Alta"
export type EventType = "consulta" | "sintoma" | "exame" | "medicacao"

export interface Patient {
  id: string
  fullName: string
  birthDate: string
  sex: "Masculino" | "Feminino" | "Outro"
  conditions: string[]
}

export interface TimelineEvent {
  id: string
  scenarioId: string
  date: string
  type: EventType
  title: string
  description: string
  status: "planejado" | "realizado"
}

export interface Scenario {
  id: string
  name: string
  durationDays: number
  complexity: ScenarioComplexity
  patientId: string
  updatedAt: string
  eventCount: number
  tags: string[]
}

export interface Template {
  id: string
  name: string
  category: string
  durationDays: number
  complexity: ScenarioComplexity
  eventCount: number
  tags: string[]
  description: string
  variableParams: string[]
}

export interface Cohort {
  id: string
  name: string
  patientCount: number
  templateId: string
  conditions: string[]
  severity: "Leve" | "Moderada" | "Severa"
  durationDays: number
  generatedAt: string
}

export interface DashboardMetrics {
  totalScenarios: number
  totalSyntheticPatients: number
  totalTemplates: number
  totalCohorts: number
}

export interface ActivityItem {
  id: string
  title: string
  description: string
  at: string
}
