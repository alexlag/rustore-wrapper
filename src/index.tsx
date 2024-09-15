import { Hono } from "hono";
import { getAppInfo } from "./rustore";
import { AppInfoDisplay } from "./Display";

const app = new Hono();

app.get("/a/:name", async (c) => {
  const appInfo = await getAppInfo(c.req.param("name"))

  return c.html(<AppInfoDisplay info={appInfo} />);
});

export default app;
