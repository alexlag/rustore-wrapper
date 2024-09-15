export type AppInfo = {
  id: number;
  name: string;
  version: string;
  apkUrl: string;
};

const BASE_URL = "https://backapi.rustore.ru";

async function getAppVersionApkUrl(appId: number): Promise<string> {
  const raw = await fetch(`${BASE_URL}/applicationData/download-link`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ appId, firstInstall: true }),
  });

  const res = await raw.json();

  return res["body"]["apkUrl"];
}

export async function getAppInfo(name: string): Promise<AppInfo> {
  const raw = await fetch(`${BASE_URL}/applicationData/overallInfo/${name}`, {
    headers: { "Content-Type": "application/json" },
  });

  const res = await raw.json();

  const id: number = res["body"]["appId"];
  const version: string = res["body"]["versionName"];
  const apkUrl = await getAppVersionApkUrl(id);

  return { id, name, version, apkUrl };
}
