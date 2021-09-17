// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: false,

  API_BASE: 'https://192.168.0.110:6443',

  TIMEOUT_HTTP_REQUEST: 5000

  headers: new HttpHeaders()
            .set("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ik1oYV9kVmVuT2lBR2VKNndJSzFxQ1BESENsWDVPTUhyS0tiZ1VKbWwxS3MifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJkZWZhdWx0Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6ImFwaS11c2VyLXRva2VuLTZtY2tjIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6ImFwaS11c2VyIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiODVhZjRkN2QtNjMyZC00OTE3LThiMzItMWZiNWUyMDA0ZWM2Iiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50OmRlZmF1bHQ6YXBpLXVzZXIifQ.ZYR6y1d8We91qUhAbZdiS03TRiewXSC6Q5ZtEajKfwiGGtKAaqiF-EQuPkMMHrjW1scvulpIAI0vshED37abhFYENhj1Z0rN7HTtWJYpq2ui8II_WIm3gFXour0QNbh5lUQ-hF2Gu_2zkvGiink1xIlhrnrYo971gRSNhJDkjapmFR_s4CixqTQswrCyzRddrQ_aLX_RZ3CiuGYR8GKpmsTG7_ytAOPvcoaNEP9mE7ZZngs2BPR4xZJkVIru2Gx834ntSsg64HmoLn__ttcJqgPaK7Fc71RgIc7ikhxW0LRWV-EjEo2TogzQzYA1y1oTadFGFwKlnB1zZEVVUWKBYQ")
            .set("Access-Control-Allow-Origin", "*")
};
