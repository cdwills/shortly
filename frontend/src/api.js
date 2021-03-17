function client(
  endpoint,
  {data, ...customConfig} = {},
) {
  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-Type': data ? 'application/json' : undefined,
    },
    ...customConfig,
  }

  return window.fetch(endpoint, config).then(async (response) => {
    const responseData = await response.json()
    if (response.ok) {
      return responseData
    } else {
      return Promise.reject(responseData)
    }
  })
}

const saveLink = (endpoint, data) => client(endpoint, { data })

export { saveLink }
