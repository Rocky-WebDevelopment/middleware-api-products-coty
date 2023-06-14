import type { IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class ViaProducts extends ExternalClient {
  constructor(context: IOContext) {
    super('https://api.linximpulse.com/', context)
  }

  public searchProducts = (id: string): Promise<unknown> => {
    return this.http.get(`/engage/search/v3/search?apiKey=coty&secretKey=tYaJGA2+tJL5K531t3oJQQ==&pids=${id}`)
  }
}
