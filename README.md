# ENS DAO Governance Documentation Portal

**Decentralized • Immutable • Team-Governed (Autark + ENS + Safe + IPFS)**

A decentralized governance documentation portal for the ENS Protocol and DAO. This portal provides comprehensive information about ENS DAO governance (constitution, voting, working groups, proposals, participation) and is deployed as a **versioned, immutable frontend** via **Autark**, stored on **IPFS (Storacha)**, and gated by **Safe multisig**.

---

## 🌐 Live Site

> Update these to your current production versions after each deploy.

* **Production (ENS gateway):** `https://v11.fundamentalia.eth.link`
  *(Example above; ENS gateways resolve **mainnet** only. Use your latest version, e.g. `v11`.)*
* **IPFS Gateway (direct CID):** `https://bafybeig7fnclwf4giw676gpjxw2rludvhcijrudrbwbkhdyzgedv2w2l2e.ipfs.w3s.link`

Deployed via [Autark CLI](https://github.com/autark-dev/autark) and decentralized storage (IPFS via Storacha).

---

## 🎯 What You Get

* **Immutable versions**: `v0`, `v1`, `v2`… each pinned to an IPFS **CID** and permanently accessible.
* **Human gatekeeping**: deployments require **Safe** approvals (e.g., **2/3** multisig).
* **Readable URLs**: versioned ENS subdomains (`vN.fundamentalia.eth`) resolve on `.eth.limo`/`.eth.link` (mainnet).
* **Auditability**: an on-chain history of what shipped, when, and by whom.

---

## 🧩 Prerequisites

* **Node.js v20+ / npm**
* **Git**
* **MetaMask** (or similar wallet)
* **ENS domain** (e.g., `fundamentalia.eth`)

  * **Wrapped** via ENS NameWrapper (required for fuses/immutability)
* **Safe multisig** (recommended 2/3) on your target network
* **Some ETH** on your target network (Safe + EOA gas)
* **CLIs**:

  * Autark: `npm install -g autark`
  * Storacha: `npm install -g @storacha/client` (then `storacha login you@example.com`)

> **Networks**
>
> * **Mainnet** for production (resolves on `.eth.limo`/`.eth.link`)
> * **Sepolia** for testing (use IPFS gateway to view; ENS gateways don’t resolve testnet)

---

## 🛠️ Technology Stack

* **Framework**: Next.js (Static Export)
* **Deployment**: Autark CLI (ENS contenthash + versioned subdomains)
* **Storage**: IPFS via Storacha
* **Blockchain**: Ethereum (Sepolia for test / Mainnet for prod)
* **ENS Domain**: `fundamentalia.eth`

---

## 📦 Project Structure

```
basics/
├── dao portal/                     # Source code directory
│   └── my-app/                     # Next.js application
│       ├── app/                    # Next.js app directory (routes, layouts)
│       ├── components/             # React components
│       ├── content/                # MDX content files
│       ├── lib/                    # Utilities
│       ├── public/                 # Static assets
│       ├── out/                    # Build output (gitignored, generated)
│       ├── package.json            # Dependencies
│       └── next.config.ts
├── launch/                         # Deployment directory
│   ├── out/                        # Copied build output (generated)
│   ├── deploy.sh                   # Build + deploy script (recommended path)
│   ├── secure-deploy.config.json   # Autark config (sanitized template)
│   └── secure-deploy.config.*.example
├── .env                            # Environment variables (NOT committed)
├── .env.example                    # Template for env vars
├── .gitignore
├── log.md                          # Development log
└── README.md                       # This file
```

---

## 🚀 Getting Started

### 1) Clone & Install

```bash
git clone <your-repo-url>
cd basics

# Install Next.js app deps
cd "dao portal/my-app"
npm install
```

### 2) Create & Fill `.env`

From repo root:

```bash
cd ../..
cp .env.example .env
```

Fill in `.env` (do **not** quote values; keep `0x` prefix on keys):

```bash
# Choose ONE of these two; comment the other:
# For MAINNET
RPC_URL=https://mainnet.infura.io/v3/<YOUR_PROJECT_ID>
NETWORK=mainnet

# For SEPOLIA (testing)
# RPC_URL=https://sepolia.infura.io/v3/<YOUR_PROJECT_ID>
# NETWORK=sepolia

# ENS
ENS_DOMAIN=fundamentalia.eth

# Safe (network-specific address!)
SAFE_ADDRESS=0xYourMainnetOrSepoliaSafe
SAFE_API_KEY=sk_live_or_test_from_developer.safe.global

# EOA private key that owns the ENS parent (personal-owns mode)
# or is a signer (safe-owns mode)
OWNER_PRIVATE_KEY=0x<64-hex-chars>
```

> Keep `.env` **gitignored**.

### 3) Configure Autark (JSON)

Create `launch/secure-deploy.config.json` (or use your existing one), **matching your network**:

```json
{
  "ensDomain": "fundamentalia.eth",
  "safeAddress": "0xYOUR_SAFE_ADDRESS",
  "network": "mainnet",
  "rpcUrl": "https://mainnet.infura.io/v3/<YOUR_PROJECT_ID>",
  "deploymentMode": "personal-owns-parent"
}
```

> * For **Sepolia**, set `"network": "sepolia"` and a Sepolia RPC URL.
> * Omit `deploymentMode` to let Autark auto-detect; including it is fine.
> * If your **Safe owns the parent ENS**, Autark will batch “create subdomain + set contenthash” in one proposal.

---

## 🧪 Development

**Run dev server:**

```bash
cd "dao portal/my-app"
npm run dev
# http://localhost:3000
```

**Build static site:**

```bash
cd "dao portal/my-app"
npm run build
# outputs to dao portal/my-app/out/
```

---

## 🚢 Deployment

### Option A — Recommended: Scripted (build + deploy)

From repo root:

```bash
cd launch
./deploy.sh
```

What `deploy.sh` should do (summary):

* Build the Next.js app if `out/` is missing or stale
* Copy `dao portal/my-app/out/` → `launch/out/`
* Load env from `../.env`
* Validate required env vars
* Upload to IPFS via Storacha
* Invoke Autark to create the next version (`vN.fundamentalia.eth`) and propose the Safe transaction

**Typical Autark behavior:**

* **Personal-owns-parent**: EOA creates `vN.` subdomain → Safe proposal **sets contenthash**
* **Safe-owns-parent**: Safe proposal **creates subdomain + sets contenthash** atomically

When prompted:

```
Burn CANNOT_UNWRAP fuse now? [y/N]:
```

* Answer **`y`** if the **parent is wrapped** on this network and you’re ready to lock immutability for that subname.
* Otherwise **`N`** (you can burn later via Safe UI).

### Option B — Manual

```bash
# 1) Build
cd "dao portal/my-app"
npm run build

# 2) Deploy
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

> Some Autark builds do **not** accept all flags above; the `--config` + env-vars approach is most reliable. If a flag is “unknown option”, ensure it’s set in config/env instead.

---

## 🔑 Safe (2/3) Approval Flow

1. After `autark deploy`, open the **Safe link** printed in the terminal.
2. In **Safe UI → Transactions → Queue**, open the pending proposal:

   * **Personal-owns**: single op (**setContenthash** for `vN.subdomain`)
   * **Safe-owns**: batched ops (**create subdomain + setContenthash**)
3. **Two of three** owners click **Confirm**.
4. Click **Execute** (any signer can execute once threshold met).
5. Wait ~15–30s for on-chain confirmation.

**Verify version:**

```bash
autark status --subdomain vN.fundamentalia.eth \
  --config ./launch/secure-deploy.config.json
```

**Open site (mainnet):**

```
https://vN.fundamentalia.eth.limo
```

(*Propagation on gateways: typically 5–15 minutes.*)

**Open via IPFS gateway (any network):**
Autark prints a gateway link for the CID, e.g.:

```
https://<CID>.ipfs.w3s.link
```

---

## 🧭 Networks & Gateways

* **Mainnet**: `.eth.limo` / `.eth.link` **work** (gateways index mainnet ENS).
* **Sepolia**: `.eth.limo` / `.eth.link` **do not** resolve testnet ENS.
  View via **IPFS gateway** links until you move to mainnet.

---

## 🧱 Common Pitfalls & Fixes

| Symptom                                           | Likely Cause                                 | Fix                                                                                                                                             |
| ------------------------------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `Missing required configuration: ownerPrivateKey` | Key not loaded; wrong var name; missing `0x` | Keep **`OWNER_PRIVATE_KEY`** in `.env` (no quotes, with `0x`); `set -a; source .env; set +a`; ensure you run from the folder with `.env`/config |
| Fuse burn revert (`setFuses` unauthorized)        | Burning on wrong network or wrong owner      | Burn on the **same network** where the ENS is wrapped; **owner** (EOA or Safe) must execute the fuse burn                                       |
| No proposal in Safe UI                            | Wrong `SAFE_ADDRESS` / network / API key     | Confirm network, **mainnet vs Sepolia**; ensure **Safe API key** matches the network; re-run                                                    |
| `.eth.limo` doesn’t show the site                 | You’re on Sepolia                            | Use the IPFS gateway link printed by Autark; move to mainnet to use `.limo`                                                                     |
| “Unknown option” when passing flags               | CLI version mismatch                         | Prefer config + env vars; keep flags minimal (`--config`, `--network`)                                                                          |

---

## 🔒 Security

* **Never commit secrets** (`.env`, any `secure-deploy.config.*` with secrets)
* Private keys must be **`0x` + 64 hex chars**, no quotes
* Prefer hardware wallets for mainnet signers
* Use a distinct Safe API key per network (Sepolia vs Mainnet)

**`.gitignore` must include:**

```
.env
**/secure-deploy.config.json
**/secure-deploy.config.yaml
**/out/
**/.next/
**/node_modules/
```

---

### Quick Reference (Cheat Sheet)

```bash
# Dev
cd "dao portal/my-app" && npm run dev

# Build
cd "dao portal/my-app" && npm run build

# Scripted deploy (recommended)
cd launch && ./deploy.sh

# Manual deploy
cd launch
export $(grep -v '^#' ../.env | xargs)
autark deploy out/ --config ./secure-deploy.config.json --network "${NETWORK:-mainnet}"

# Verify a version
autark status --subdomain vN.fundamentalia.eth --config ./launch/secure-deploy.config.json
```

---

## 🔒 Security

**Important Security Notes:**

- ⚠️ **Never commit sensitive files**: The `.env` file and `secure-deploy.config.yaml` contain private keys and API keys
- ✅ All sensitive files are configured in `.gitignore`
- ✅ Use `.env.example` as a template for configuration
- ✅ Private keys are stored in `.env` and should never be shared or committed

### Files to Never Commit

- `.env` and `.env.local`
- `**/secure-deploy.config.yaml` (except `.example` files)
- `**/secure-deploy.config.json` (except `.example` files)
- `**/out/` (build outputs)
- `**/.next/` (Next.js build cache)
- `**/node_modules/` (dependencies)

## 📝 Development Log

See [log.md](./log.md) for a detailed development history and milestones.

## 🌟 Features

- **Comprehensive Governance Documentation**: Complete guides on ENS DAO Constitution, voting procedures, and all proposal types
- **Working Group Details**: In-depth information about Meta-Governance, Ecosystem, and Public Goods working groups
- **Token & Delegation Guides**: Complete information about ENS token distribution, delegation process, and voting mechanics
- **DAO Organization Info**: Details about the ENS Foundation, Security Council, Endowment, and operational wallets
- **Mobile Responsive Design**: Fully optimized for mobile devices with proper text wrapping and overflow handling
- **Fully Decentralized**: Hosted on ENS domains using Autark CLI and decentralized storage
- **Easy Navigation**: Organized categories for Getting Started, Voting, Working Groups, and Organization

## 🔮 Future Enhancements

- Real-time proposal status updates
- Enhanced voting interface integration
- Delegate discovery and information
- Proposal creation and submission interface

## 📄 License

MIT

## 🤝 Contributing

This project is prepared for presentation to the ENS DAO community. Contributions and feedback from the ENS community are welcome.

## 📞 Contact

For questions or contributions related to this governance portal, please reach out through the [ENS DAO Governance Forum](https://discuss.ens.domains/).

