import { Hono } from "hono";
import { getAppInfo, getAppVersionApkUrl } from "./rustore";
import { AppInfoDisplay } from "./Display";
import { readApkFromZip } from "./unzip";

const app = new Hono();

app.get("/a/:name", async (c) => {
  const appInfo = await getAppInfo(c.req.param("name"));

  return c.html(<AppInfoDisplay info={appInfo} />);
});

app.get("/d/:appId{.+\\.apk}", async (c) => {
  const appId = parseInt(c.req.param("appId"));

  const url = await getAppVersionApkUrl(appId);

  if (url.endsWith(".apk")) {
    return c.redirect(url);
  }

  if (url.endsWith(".zip")) {
    const buffer = await readApkFromZip(url);

    if (buffer) {
      const file = new File([buffer], `${appId}.apk`);
      return c.body(file.stream());
    }
  }

  return c.notFound();
});

Bun.serve({ ...app, idleTimeout: 255 });
