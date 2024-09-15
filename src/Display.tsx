import type { FC } from "hono/jsx";
import { AppInfo } from "./rustore";

export const AppInfoDisplay: FC<{ info: AppInfo }> = ({ info }) => {
  return (
    <div>
      <p>ID: {info.id}</p>
      <p>NAME: {info.name}</p>
      <p>VERSION: {info.version}</p>
      <p>APK_URL: <a href={info.apkUrl}>link</a></p>
    </div>
  );
};
