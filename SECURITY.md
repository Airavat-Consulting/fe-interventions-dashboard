# Security Considerations

The FleetEnergies Interventions Dashboard is designed as a **client‑side** application. All data parsing, calculations and state management take place in the user’s browser. There is no backend processing of uploaded data by default. The following measures have been adopted to mitigate risks:

## No Server Storage of Uploads

* Uploaded Excel files are processed entirely on the client using SheetJS. The application does **not** persist the contents of these files on a server or send them over the network.
* Persisted state (selected products, filters, scenario) is stored in the user’s `localStorage` namespace (`fe-dashboard-storage`). Clearing browser storage removes all data.
* Exports (XLSX and PDF) are generated on the client and downloaded directly.

## Demo Access Control

* An optional passcode gate protects the `/demo` route when `NEXT_PUBLIC_DEMO_PASSCODE` is set. Users must enter the passcode to view the pre‑seeded demo data.
* The passcode is stored only in an environment variable and compared locally; it is never logged.

## Dependencies & Patching

* Dependencies are locked to specific versions via `package.json` and should be kept up to date. Run `npm audit` regularly to discover and remediate vulnerabilities.
* Code quality checks (linting, type checking and unit tests) run in CI to prevent insecure patterns from being merged.

## Future Enhancements

* **OAuth/SSO**: For production deployments, authentication can be added via third‑party providers (e.g. GitHub, Azure AD) to restrict access to authorised users.
* **Serverless Functions**: If future features require server‑side computation (e.g. persistent dashboards, integration with registries), implement them using stateless serverless functions with strict input validation and encryption.