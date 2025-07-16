export const mapFrontendToBackend = (frontendData) => ({
  titulo: frontendData.title,
  hipotesis: frontendData.hypothesis,
  id_experimento_tipo: frontendData.experimentType,
  descripcion: frontendData.description,
  dia_inicio: frontendData.startDate,
  dia_fin: frontendData.endDate,
  anexo_url: frontendData.attachments,
  id_responsable: frontendData.responsible,
  status: frontendData.status,
});

export const mapBackendToFrontend = (backendData) => ({
  title: backendData.titulo,
  hypothesis: backendData.hipotesis,
  experimentType: backendData.id_experimento_tipo,
  description: backendData.descripcion,
  startDate: backendData.dia_inicio,
  endDate: backendData.dia_fin,
  attachments: backendData.anexo_url,
  responsible: backendData.id_responsable,
  status: backendData.status,
});