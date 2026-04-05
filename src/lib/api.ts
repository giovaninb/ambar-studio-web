import {
  mockActivities,
  mockCohorts,
  mockDashboardMetrics,
  mockPatients,
  mockScenarios,
  mockTemplates,
  mockTimelineEvents,
} from "@/mocks/data"
import type {
  ActivityItem,
  Cohort,
  DashboardMetrics,
  EventType,
  Patient,
  Scenario,
  TimelineEvent,
} from "@/types/domain"

const wait = async (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms))
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ""
const API_DEV_SUB = import.meta.env.VITE_API_DEV_SUB ?? "ana"
const API_TOKEN = import.meta.env.VITE_API_TOKEN

let devTokenCache: string | null = null
const LOCAL_COHORTS_KEY = "ambar:cohorts"

interface BackendPatient {
  id: string
  displayName: string
  createdAt: string
  updatedAt: string
}

interface BackendPatientPage {
  items: BackendPatient[]
  total: number
  page: number
  size: number
}

interface BackendDashboard {
  totalPatients: number
  recentlyUpdatedPatients: number
}

interface BackendTimelineEvent {
  sourceId: string
  type: "CONSULTATION" | "SYMPTOM" | "RECORD"
  occurredAt: string
  title: string
  subtitle: string | null
}

const buildUrl = (path: string) => `${API_BASE_URL.replace(/\/$/, "")}${path}`

const mapTimelineType = (type: BackendTimelineEvent["type"]): EventType => {
  if (type === "CONSULTATION") return "consulta"
  if (type === "SYMPTOM") return "sintoma"
  return "exame"
}

const mapPatientToScenario = (
  patient: BackendPatient,
  eventCount = 0,
  timeline?: BackendTimelineEvent[],
): Scenario => {
  const complexity =
    eventCount >= 8 ? "Alta" : eventCount >= 4 ? "Média" : "Baixa"

  const firstDate = timeline?.[0]?.occurredAt
  const lastDate = timeline?.[timeline.length - 1]?.occurredAt
  const durationDays =
    firstDate && lastDate
      ? Math.max(
          7,
          Math.ceil(
            (new Date(lastDate).getTime() - new Date(firstDate).getTime()) /
              (1000 * 60 * 60 * 24),
          ),
        )
      : 90

  return {
    id: patient.id,
    name: patient.displayName,
    durationDays,
    complexity,
    patientId: patient.id,
    updatedAt: patient.updatedAt,
    eventCount,
    tags: ["clínico", "sintético"],
  }
}

const mapTimeline = (
  patientId: string,
  scenarioId: string,
  events: BackendTimelineEvent[],
): TimelineEvent[] =>
  events.map((event) => ({
    id: `${scenarioId}-${event.sourceId}`,
    scenarioId,
    date: event.occurredAt,
    type: mapTimelineType(event.type),
    title: event.title,
    description: event.subtitle ?? `Evento ${event.type.toLowerCase()} do paciente ${patientId}.`,
    status: "realizado",
  }))

const mapPatient = (patient: BackendPatient): Patient => ({
  id: patient.id,
  fullName: patient.displayName,
  // Placeholder até termos demographics no backend.
  birthDate: "1985-01-01",
  sex: "Outro",
  conditions: ["Não informado"],
})

const mapDashboardMetrics = (summary: BackendDashboard): DashboardMetrics => ({
  totalScenarios: summary.totalPatients,
  totalSyntheticPatients: summary.totalPatients,
  totalTemplates: mockDashboardMetrics.totalTemplates,
  totalCohorts: mockDashboardMetrics.totalCohorts,
})

const buildActivitiesFromPatients = (patients: BackendPatient[]): ActivityItem[] =>
  patients.slice(0, 5).map((patient) => ({
    id: `activity-${patient.id}`,
    title: "Paciente atualizado",
    description: `${patient.displayName} foi atualizado recentemente.`,
    at: patient.updatedAt,
  }))

const shouldUseMock =
  (import.meta.env.VITE_USE_MOCKS ?? "false").toLowerCase() === "true"

const canUseLocalStorage = () => typeof window !== "undefined" && Boolean(window.localStorage)

const readLocalCohorts = (): Cohort[] => {
  if (!canUseLocalStorage()) return []
  const raw = window.localStorage.getItem(LOCAL_COHORTS_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as Cohort[]
  } catch {
    return []
  }
}

const writeLocalCohorts = (cohorts: Cohort[]) => {
  if (!canUseLocalStorage()) return
  window.localStorage.setItem(LOCAL_COHORTS_KEY, JSON.stringify(cohorts))
}

const getDevToken = async (): Promise<string | null> => {
  if (API_TOKEN) {
    return API_TOKEN
  }
  if (devTokenCache) {
    return devTokenCache
  }

  try {
    const response = await fetch(buildUrl(`/api/dev/token?sub=${encodeURIComponent(API_DEV_SUB)}`))
    if (!response.ok) {
      return null
    }
    const payload = (await response.json()) as { token?: string }
    devTokenCache = payload.token ?? null
    return devTokenCache
  } catch {
    return null
  }
}

const apiFetch = async <T>(path: string): Promise<T> => {
  const token = await getDevToken()
  const response = await fetch(buildUrl(path), {
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : undefined,
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`)
  }
  return (await response.json()) as T
}

const apiPost = async <TResponse, TBody extends object>(
  path: string,
  body: TBody,
): Promise<TResponse> => {
  const token = await getDevToken()
  const response = await fetch(buildUrl(path), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`)
  }
  return (await response.json()) as TResponse
}

const withMockFallback = async <T>(realCall: () => Promise<T>, mockCall: () => Promise<T>) => {
  if (shouldUseMock) {
    return mockCall()
  }
  try {
    return await realCall()
  } catch {
    return mockCall()
  }
}

interface CreateScenarioInput {
  name: string
  durationDays?: number
  summary?: string
}

interface CreateCohortInput {
  name: string
  patientCount: number
  templateId?: string
  conditions?: string[]
  severity?: Cohort["severity"]
  durationDays?: number
}

export const api = {
  async getDashboard() {
    return withMockFallback(
      async () => {
        const [summary, patientPage] = await Promise.all([
          apiFetch<BackendDashboard>("/api/dashboard/summary"),
          apiFetch<BackendPatientPage>("/api/patients?page=0&size=5&sort=updatedAt,desc"),
        ])

        return {
          metrics: mapDashboardMetrics(summary),
          activities: buildActivitiesFromPatients(patientPage.items),
        }
      },
      async () => {
        await wait()
        return { metrics: mockDashboardMetrics, activities: mockActivities }
      },
    )
  },
  async listScenarios() {
    return withMockFallback(
      async () => {
        const page = await apiFetch<BackendPatientPage>("/api/patients?page=0&size=20&sort=updatedAt,desc")
        return page.items.map((patient) => mapPatientToScenario(patient))
      },
      async () => {
        await wait()
        return mockScenarios
      },
    )
  },
  async getScenarioById(id: string) {
    return withMockFallback(
      async () => {
        const [patientRaw, timelineRaw] = await Promise.all([
          apiFetch<BackendPatient>(`/api/patients/${id}`),
          apiFetch<BackendTimelineEvent[]>(`/api/patients/${id}/timeline`),
        ])
        const timeline = [...timelineRaw].sort((a, b) => a.occurredAt.localeCompare(b.occurredAt))
        const scenario = mapPatientToScenario(patientRaw, timeline.length, timeline)
        return {
          scenario,
          patient: mapPatient(patientRaw),
          events: mapTimeline(patientRaw.id, scenario.id, timeline),
        }
      },
      async () => {
        await wait()
        const scenario = mockScenarios.find((item) => item.id === id) ?? null
        const patient = mockPatients.find((item) => item.id === scenario?.patientId) ?? null
        const events = mockTimelineEvents.filter((item) => item.scenarioId === id)
        return { scenario, patient, events }
      },
    )
  },
  async listTemplates() {
    await wait()
    return mockTemplates
  },
  async createScenario(input: CreateScenarioInput) {
    return withMockFallback(
      async () => {
        const patient = await apiPost<BackendPatient, { displayName: string }>("/api/patients", {
          displayName: input.name,
        })

        // Cria um evento clínico inicial quando há resumo no wizard.
        if (input.summary?.trim()) {
          await apiPost("/api/consultations", {
            patientId: patient.id,
            occurredOn: new Date().toISOString(),
            reason: input.summary.trim(),
          })
        }

        const created = await this.getScenarioById(patient.id)
        if (!created.scenario) {
          throw new Error("Scenario creation failed")
        }
        return created.scenario
      },
      async () => {
        await wait()
        const now = new Date().toISOString()
        const id =
          typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
            ? crypto.randomUUID()
            : `scn-${Date.now()}`
        const patientId =
          typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
            ? crypto.randomUUID()
            : `pat-${Date.now()}`

        const newPatient: Patient = {
          id: patientId,
          fullName: input.name,
          birthDate: "1985-01-01",
          sex: "Outro",
          conditions: ["Não informado"],
        }
        const newScenario: Scenario = {
          id,
          name: input.name,
          durationDays: input.durationDays ?? 90,
          complexity: "Média",
          patientId,
          updatedAt: now,
          eventCount: input.summary?.trim() ? 1 : 0,
          tags: ["clínico", "sintético"],
        }

        mockPatients.unshift(newPatient)
        mockScenarios.unshift(newScenario)
        if (input.summary?.trim()) {
          mockTimelineEvents.unshift({
            id: `evt-${id}`,
            scenarioId: id,
            date: now,
            type: "consulta",
            title: "Consulta inicial",
            description: input.summary.trim(),
            status: "realizado",
          })
        }
        return newScenario
      },
    )
  },
  async listCohorts() {
    await wait()
    const local = readLocalCohorts()
    return [...local, ...mockCohorts]
  },
  async createCohort(input: CreateCohortInput) {
    await wait()
    const cohort: Cohort = {
      id:
        typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : `coh-${Date.now()}`,
      name: input.name,
      patientCount: input.patientCount,
      templateId: input.templateId ?? "manual",
      conditions: input.conditions?.length ? input.conditions : ["Não informado"],
      severity: input.severity ?? "Moderada",
      durationDays: input.durationDays ?? 90,
      generatedAt: new Date().toISOString(),
    }
    const local = readLocalCohorts()
    const next = [cohort, ...local]
    writeLocalCohorts(next)
    return cohort
  },
  async exportScenarioAsJson(id: string) {
    const data = await this.getScenarioById(id)
    return JSON.stringify(data, null, 2)
  },
}
