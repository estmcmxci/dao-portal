## October 27 2025

Steps completed:

- Installed Autark CLI via 'npm install -g autark' 
- Installed and verified Storacha CLI via 'npm install -g @storacha/client' 
- Registered 'fundamentalia.eth'
- Acquired testnet ETH on sepolia via unit1.base.eth 
- Set up a Safe account 'fundamentalis' @ 0xB080f646D53798e412BFC830271886C3B11c9e08
- Created a Safe API key 
- Stored this information in the Notes app
- Configured project @ secure-deploy.config.yaml 
- Created a .env file, routed both the .env and config files into .gitignore

---

## October 31 2025

Steps completed:

- Ran a full smoke test on Sepolia using the existing test Safe to validate the deployment flow end to end
- Determined the `.eth.link` gateway requires mainnet content; kicked off the production lifecycle targeting mainnet
- Provisioned a new mainnet Safe and API key for production operations (0x35BD5Cf4235eF208D6d741Ffb79fAA9E8d8d6b7d)
- Generated `launch/secure-deploy.config.json` so Autark CLI would read the updated mainnet deployment settings
- Diagnosed the ENS lookup failure and confirmed the published CLI release is hardcoded for Sepolia
- Patched the CLI’s ENS contract map to point at the mainnet NameWrapper and related addresses, then redeployed
- Verified the mainnet deployment; site now live at `v0.fundamentalia.eth.link`

---


## November 1 2025

Steps completed:

- Initialized a new Docusaurus project from scratch
- Developed core documentation pages and tested local deployment workflow
- Successfully deployed documentation site on three separate preview subdomains: `v1.fundamentalia.eth.link`, `v2.fundamentalia.eth.link`, and `v3.fundamentalia.eth.link`
- Evaluated Docusaurus as a solution and determined its default formatting and templates would be cumbersome for long-term needs
- Concluded to build the frontend completely from scratch for full control over formatting and layout
- Decided to leverage Autark’s support for arbitrary static sites to deploy a custom-built site using the established `v0.fundamentalia.eth.link` infrastructure

---



