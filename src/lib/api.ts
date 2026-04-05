import {
  mockActivities,
  mockCohorts,
  mockDashboardMetrics,
  mockPatients,
  mockScenarios,
  mockTemplates,
  mockTimelineEvents,
} from "@/mocks/data"

const wait = async (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms))

export const api = {
  async getDashboard() {
    await wait()
    return { metrics: mockDashboardMetrics, activities: mockActivities }
  },
  async listScenarios() {
    await wait()
    return mockScenarios
  },
  async getScenarioById(id: string) {
    await wait()
    const scenario = mockScenarios.find((item) => item.id === id) ?? null
    const patient = mockPatients.find((item) => item.id === scenario?.patientId) ?? null
    const events = mockTimelineEvents.filter((item) => item.scenarioId === id)
    return { scenario, patient, events }
  },
  async listTemplates() {
    await wait()
    return mockTemplates
  },
  async listCohorts() {
    await wait()
    return mockCohorts
  },
  async exportScenarioAsJson(id: string) {
    await wait()
    const data = await this.getScenarioById(id)
    return JSON.stringify(data, null, 2)
  },
}
