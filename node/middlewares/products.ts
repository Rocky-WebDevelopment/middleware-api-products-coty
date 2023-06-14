export async function products(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { viaProducts },
    vtex: { route }
  } = ctx

  const { params } = route
  const { id } = params

  const result = await viaProducts.searchProducts(id as string)
  const products = (result as any).products

  ctx.status = 200
  ctx.body = {
    response: products
  }
  ctx.set('content-Type', 'application/json')
  ctx.set('accept', 'application/json')
  ctx.set("Cache-Control", "no-cache")
  ctx.set("Access-Control-Allow-Origin", "*")
  ctx.set("Access-Control-Allow-Methods", "GET")

  await next()
}
