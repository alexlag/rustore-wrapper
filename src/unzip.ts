import AdmZip from "adm-zip";

export async function readApkFromZip(url: string): Promise<Buffer | null> {
  const raw = await fetch(url);
  const buffer = Buffer.from(await raw.arrayBuffer());
  const zip = new AdmZip(buffer);

  for (const entry of zip.getEntries()) {
    if (entry.entryName === "apk") {
      return entry.getData();
    }
  }

  return null;
}
