export const formatJSON = (jsonString) => {
  try {
    const parsed = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString
    return JSON.stringify(parsed, null, 2)
  } catch (e) {
    return jsonString
  }
}

export const highlightJSON = (json) => {
  let html = JSON.stringify(json, null, 2)
  html = html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
      let cls = 'number'
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key'
        } else {
          cls = 'string'
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean'
      } else if (/null/.test(match)) {
        cls = 'null'
      }
      return `<span class="${cls}">${match}</span>`
    })
  return html
}

export const getStatusColor = (status) => {
  if (status >= 200 && status < 300) return 'text-green-600'
  if (status >= 300 && status < 400) return 'text-blue-600'
  if (status >= 400 && status < 500) return 'text-orange-600'
  if (status >= 500) return 'text-red-600'
  return 'text-gray-600'
}

export const getStatusBgColor = (status) => {
  if (status >= 200 && status < 300) return 'bg-green-100'
  if (status >= 300 && status < 400) return 'bg-blue-100'
  if (status >= 400 && status < 500) return 'bg-orange-100'
  if (status >= 500) return 'bg-red-100'
  return 'bg-gray-100'
}
