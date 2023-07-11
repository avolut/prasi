import { spawn } from "child_process";
import { writeAsync } from "fs-jetpack";

export type INginx = {
  domain: string;
  pathNginxConfig: string;
  mode: "dev" | "prod";
};

export const GenerateVhost = async (params: INginx) => {
  const { domain, pathNginxConfig, mode } = params;
  try {
    await writeAsync(
      `/${pathNginxConfig}/${domain}`,
      `\
  server {
  listen 80;
  
  listen [::]:80;
  
  server_name ${domain};
  
  location / {
  proxy_pass http://127.0.0.1:4550/site/${domain}/;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection 'upgrade';
  proxy_set_header Host $host;
  proxy_cache_bypass $http_upgrade;
  proxy_read_timeout 7d;
  }
  }`
    );

    if (mode === "prod") {
      await new Promise((resolve) => {
        const child = spawn(`service`, [`nginx`, `reload`]);

        child.on("exit", resolve);
      });
    }
  } catch (e) {
    console.log("======== error ============================");
    console.log(e);
    console.log("====================================");
  }
};
