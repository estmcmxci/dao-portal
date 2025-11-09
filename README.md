# ENS DAO Governance Documentation Portal

Decentralized governance documentation portal for the ENS Protocol and DAO. This site aggregates constitution references, voting processes, working group details, proposal templates, and onboarding material. Deployments are versioned on ENS via Autark, replicated to IPFS (Storacha), and gated by Safe multisig approvals.

---

## Live Site

Update these links after each deployment.

- Production gateway: `https://v11.fundamentalia.eth.link`
- IPFS gateway (CID): `https://bafybeig7fnclwf4giw676gpjxw2rludrbwbkhdyzgedv2w2l2e.ipfs.w3s.link`

Deployments use the Autark CLI with Storacha-backed storage.

---

## Highlights

- Versioned ENS subdomains (`vN.fundamentalia.eth`) map to immutable IPFS CIDs.
- Safe multisig approvals provide human gatekeeping for contenthash updates.
- ENS gateways (`.eth.limo`, `.eth.link`) resolve mainnet deployments; IPFS gateways serve all networks.
- Deployment history is transparent and auditable on-chain.

---

## Prerequisites

- Node.js 20+ and npm
- Git
- Wallet (MetaMask or similar)
- ENS domain such as `fundamentalia.eth`, wrapped with NameWrapper for fuse controls
- Safe multisig (recommended 2-of-3) on the target network
- Sufficient ETH for Safe and EOA gas fees
- Command-line tools:
  - Autark CLI: `npm install -g autark`
  - Storacha CLI: `npm install -g @storacha/client`

Network guidance:

- Mainnet deployments resolve on ENS gateways.
- Sepolia deployments require direct IPFS access; ENS gateways do not index testnet records.

---

## Technology Stack

- Framework: Next.js (static export)
- Deployment: Autark CLI (contenthash + versioned ENS subdomains)
- Storage: IPFS via Storacha
- Blockchain: Ethereum (Sepolia for testing, Mainnet for production)
- ENS domain: `fundamentalia.eth`

---

## Project Structure

```
basics/
├── dao portal/
│   └── my-app/
│       ├── app/
│       ├── components/
│       ├── content/
│       ├── lib/
│       ├── public/
│       ├── out/
│       ├── package.json
│       └── next.config.ts
├── launch/
│   ├── out/
│   ├── deploy.sh
│   ├── secure-deploy.config.json
│   └── secure-deploy.config.*.example
├── .env
├── .env.example
├── .gitignore
├── log.md
└── README.md
```

---

## Getting Started

### 1. Clone and install

```bash
git clone <your-repo-url>
cd basics
cd "dao portal/my-app"
npm install
```

### 2. Create `.env`

From the repository root:

```bash
cd ../..
cp .env.example .env
```

Populate `.env` (no quotes; retain `0x` prefix for keys):

```bash
# Mainnet example
RPC_URL=https://mainnet.infura.io/v3/<YOUR_PROJECT_ID>
NETWORK=mainnet

# Sepolia example
# RPC_URL=https://sepolia.infura.io/v3/<YOUR_PROJECT_ID>
# NETWORK=sepolia

ENS_DOMAIN=fundamentalia.eth
SAFE_ADDRESS=0xYourMainnetOrSepoliaSafe
SAFE_API_KEY=sk_live_or_test_from_developer.safe.global
OWNER_PRIVATE_KEY=0x<64-hex-chars>
```

Keep `.env` out of version control.

### 3. Configure Autark

Create `launch/secure-deploy.config.json` (or edit your existing configuration):

```json
{
  "ensDomain": "fundamentalia.eth",
  "safeAddress": "0xYOUR_SAFE_ADDRESS",
  "network": "mainnet",
  "rpcUrl": "https://mainnet.infura.io/v3/<YOUR_PROJECT_ID>",
  "deploymentMode": "personal-owns-parent"
}
```

Notes:

- For Sepolia deployments set `network` to `sepolia` and point `rpcUrl` at a Sepolia endpoint.
- Omit `deploymentMode` if you prefer Autark auto-detection.
- If the Safe owns the parent ENS name, Autark batches subdomain creation and contenthash updates.

---

## Development

Run the development server:

```bash
cd "dao portal/my-app"
npm run dev
# http://localhost:3000
```

Build the static site:

```bash
cd "dao portal/my-app"
npm run build
# outputs to dao portal/my-app/out/
```

---

## Deployment

### Scripted deployment (recommended)

```bash
cd launch
./deploy.sh
```

Script responsibilities:

- Build the Next.js app if `out/` is missing or stale.
- Copy `dao portal/my-app/out/` into `launch/out/`.
- Load environment variables from `../.env`.
- Validate required entries (RPC URL, Safe credentials, ENS domain, owner key).
- Upload the static bundle to IPFS through Storacha.
- Invoke Autark to publish the next `vN.fundamentalia.eth` version and create the Safe proposal.

Autark prompts:

```
Burn CANNOT_UNWRAP fuse now? [y/N]:
```

- Answer `y` only if the parent name is wrapped and you are ready to enforce immutability.
- Otherwise answer `N` and burn later through the Safe interface.

### Manual deployment

```bash
# Build
cd "dao portal/my-app"
npm run build

# Deploy
cd ../../launch
export $(grep -v '^#' ../.env | xargs)

autark deploy out/ \
  --config ./secure-deploy.config.json \
  --ens-domain "${ENS_DOMAIN}" \
  --safe-address "${SAFE_ADDRESS}" \
  --rpc-url "${RPC_URL}" \
  --safe-api-key "${SAFE_API_KEY}" \
  --network "${NETWORK:-mainnet}"
```

Some Autark versions accept fewer CLI flags; prefer configuration files plus environment variables if a flag is rejected.

---

## Safe Approval Flow

1. After `autark deploy`, open the Safe transaction link printed in the terminal.
2. In Safe UI (`Transactions → Queue`), review the pending proposal:
   - Personal-owns flows: single `setContenthash` call.
   - Safe-owns flows: `createSubdomain` and `setContenthash` batched together.
3. Collect the required multisig confirmations (for example two of three owners).
4. Execute the transaction once the threshold is met.
5. Wait for on-chain confirmation (usually 15–30 seconds).

Verification commands:

```bash
autark status --subdomain vN.fundamentalia.eth --config ./launch/secure-deploy.config.json
```

Gateway checks:

- `https://vN.fundamentalia.eth.limo`
- `https://<CID>.ipfs.w3s.link`

---

## Network Guidance

- Mainnet: ENS gateways resolve the site directly after the Safe transaction confirms.
- Sepolia: use the IPFS gateway link until the project is promoted to mainnet.

---

## Troubleshooting

| Symptom                                           | Likely cause                                 | Recommended fix                                                                                                                               |
| ------------------------------------------------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `Missing required configuration: ownerPrivateKey` | Variable missing or without `0x` prefix      | Keep `OWNER_PRIVATE_KEY` in `.env` without quotes, source the file (`set -a; source .env; set +a`), and execute commands from the repo root. |
| Fuse burn revert (`setFuses` unauthorized)        | Wrong network or signer                      | Burn fuses on the network where the name is wrapped using the controlling owner (EOA or Safe).                                                |
| No proposal in Safe UI                            | Incorrect Safe address, network, or API key  | Confirm the chain, Safe address, and API key variant (mainnet vs Sepolia), then redeploy.                                                     |
| `.eth.limo` does not resolve                      | Deployment on Sepolia                        | Use the IPFS gateway link generated by Autark; ENS gateways index only mainnet.                                                               |
| `Unknown option` error when passing flags         | Autark CLI version mismatch                  | Move configuration into `secure-deploy.config.json` and rely on environment variables for sensitive values.                                   |

---

## Security

- Never commit secrets (`.env`, populated `secure-deploy.config.*`).
- Private keys must be `0x` followed by 64 hexadecimal characters and should remain unquoted.
- Use hardware wallets for production signers when possible.
- Maintain separate Safe API keys per network.

Required ignore rules:

```
.env
**/secure-deploy.config.json
**/secure-deploy.config.yaml
**/out/
**/.next/
**/node_modules/
```

---

## Quick Reference

```bash
# Development
cd "dao portal/my-app" && npm run dev

# Build
cd "dao portal/my-app" && npm run build

# Scripted deploy
cd launch && ./deploy.sh

# Manual deploy
cd launch
export $(grep -v '^#' ../.env | xargs)
autark deploy out/ --config ./secure-deploy.config.json --network "${NETWORK:-mainnet}"

# Verify a version
autark status --subdomain vN.fundamentalia.eth --config ./launch/secure-deploy.config.json
```

---

## Features

- Comprehensive governance documentation covering constitution, voting procedures, and proposal lifecycle.
- Working group overviews for Meta-Governance, Ecosystem, and Public Goods.
- Guidance on token distribution, delegation flows, and voting mechanics.
- Organizational references for the ENS Foundation, Security Council, Endowment, and operational wallets.
- Responsive design optimised for desktop and mobile clients.
- Fully decentralized hosting via ENS contenthash records and IPFS distribution.
- Information architecture tuned for onboarding, voting, working groups, and organizational context.

---

## Future Enhancements

- Real-time proposal status integration.
- Expanded voting interface support.
- Delegate discovery and profile tooling.
- Proposal authoring and submission workflows.

---

## Development Log

See `log.md` for milestone history and release notes.

---

## License

MIT License

---

## Contributing

The project is prepared for ENS DAO community review. Contributions and feedback are welcome through pull requests or issues.

---

## Contact

For questions or contributions related to this governance portal, reach out via the [ENS DAO Governance Forum](https://discuss.ens.domains/).
