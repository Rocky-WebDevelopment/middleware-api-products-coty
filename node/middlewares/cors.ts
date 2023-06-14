const optionsResponse = async (ctx: any, next: () => Promise<any>) => {
  const {
    request: { header },
  } = ctx;

  ctx.set("Cache-Control", "no-cache");
  ctx.set("Vary", "Origin");

  let oneOf = false;
  if (header.origin) {
    ctx.set("Access-Control-Allow-Origin", header.origin);
    oneOf = true;
  }
  if (header["access-control-request-method"]) {
    ctx.set(
      "Access-Control-Allow-Methods",
      "GET, PUT, POST, PATCH, DELETE, OPTIONS"
    );
    oneOf = true;
  }
  if (header["access-control-request-headers"]) {
    ctx.set(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    oneOf = true;
  }
  if (oneOf) {
    ctx.set("Access-Control-Max-Age", `${60 * 60 * 24 * 365}`);
    ctx.set("Access-Control-Allow-Credentials", "true");
  }

  // intercept OPTIONS method
  if (oneOf && ctx.request.method == "OPTIONS") {
    ctx.status = 204;
  }

  await next();
};

export default optionsResponse;
