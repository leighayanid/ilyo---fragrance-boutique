import Medusa from "@medusajs/js-sdk"

let client: Medusa | null = null

export const useMedusa = () => {
  if (!client) {
    const config = useRuntimeConfig()
    client = new Medusa({
      baseUrl: config.public.medusaUrl as string,
      publishableKey: config.public.medusaPublishableKey as string || '',
    })
  }
  return client
}
