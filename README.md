# ENS DAO Governance Documentation Portal

A decentralized governance documentation portal for the ENS Protocol and DAO. This portal provides comprehensive information about ENS DAO governance, including the Constitution, voting processes, working groups, proposals, and how to participate in the DAO.

## 🌐 Live Site

**Production:** [v7.fundamentalia.eth.link](https://v7.fundamentalia.eth.link)  
**IPFS Gateway:** [w3s.link/ipfs/...](https://w3s.link/ipfs/bafybeigl7uoodde66w2svovr6jo7dstzriprbwjgeabaircpjixdeu4ucm)

The site is deployed via ENS domains using [Autark CLI](https://github.com/autark-dev/autark) and decentralized storage (IPFS via Storacha).

## 🎯 Overview

This documentation portal serves as a comprehensive resource for the ENS DAO community, featuring:

- **Governance Documentation**: Complete information about the ENS DAO Constitution, voting processes, and proposal types
- **Working Groups**: Details about Meta-Governance, Ecosystem, and Public Goods working groups
- **Token Information**: Comprehensive guides on ENS tokens, delegation, and voting power
- **DAO Structure**: Information about the ENS Foundation, Security Council, Endowment, and operational wallets
- **Decentralized Hosting**: Fully deployed on ENS domains via Autark and decentralized storage

## 🛠️ Technology Stack

- **Framework**: Next.js (Static Export)
- **Deployment**: Autark CLI for ENS domain deployment
- **Storage**: Storacha (decentralized storage)
- **Blockchain**: Ethereum Mainnet
- **ENS Domain**: `fundamentalia.eth`

## 📦 Project Structure

```
basics/
├── dao portal/          # Source code directory
│   └── my-app/         # Next.js application
│       ├── app/         # Next.js app directory (pages, layouts)
│       ├── components/  # React components
│       ├── content/     # MDX content files
│       ├── lib/         # Utility libraries
│       ├── public/      # Static assets
│       ├── out/         # Build output (gitignored, generated)
│       ├── package.json # Dependencies
│       └── next.config.ts
├── launch/              # Deployment directory
│   ├── out/            # Deployment build output (gitignored, generated)
│   ├── deploy.sh       # Deployment script (builds and deploys)
│   ├── secure-deploy.config.yaml  # Config template (sanitized)
│   └── secure-deploy.config.*.example  # Example templates
├── .env                 # Environment variables (not committed)
├── .env.example         # Environment variable template
├── .gitignore          # Git ignore rules
├── log.md              # Development log
└── README.md           # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed
- An ENS domain registered
- A Safe wallet configured (for deployment)
- Autark CLI installed: `npm install -g autark`
- Storacha CLI installed: `npm install -g @storacha/client`

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd basics
   ```

2. Install dependencies for the Next.js app:
   ```bash
   cd "dao portal/my-app"
   npm install
   ```

3. Set up environment variables:
   ```bash
   cd ../..
   cp .env.example .env
   ```
   Edit `.env` and fill in your sensitive values:
   - `OWNER_PRIVATE_KEY`: Your Safe signer private key
   - `SAFE_API_KEY`: Your Safe API key
   - `RPC_URL`: Ethereum mainnet RPC endpoint
   - `SAFE_ADDRESS`: Your Safe wallet address
   - `ENS_DOMAIN`: Your ENS domain (e.g., `fundamentalia.eth`)

4. Install deployment tools:
   ```bash
   npm install -g autark
   npm install -g @storacha/client
   ```

### Development

To run the development server:

```bash
cd "dao portal/my-app"
npm run dev
```

The site will be available at `http://localhost:3000`

### Building

To build the static site:

```bash
cd "dao portal/my-app"
npm run build
```

The build output will be in `dao portal/my-app/out/`

### Deployment

**Using the deployment script (Recommended)**

The deployment script automatically builds from source and deploys:

```bash
cd launch
./deploy.sh
```

The script will:
- ✅ Check if the source has been built (builds automatically if needed)
- ✅ Copy fresh build output to `launch/out/`
- ✅ Remove any config files with secrets from build output
- ✅ Load environment variables from `.env` (root directory)
- ✅ Validate all required variables are present
- ✅ Upload to IPFS via Storacha
- ✅ Deploy via Autark CLI with command-line flags
- ✅ Create/update ENS subdomain (e.g., `v7.fundamentalia.eth`)

**Manual deployment**

If you prefer to deploy manually after building:

```bash
# Build first
cd "dao portal/my-app"
npm run build

# Then deploy
cd ../../launch
export $(grep -v '^#' ../.env | xargs)
autark deploy out/ \
  --ens-domain "${ENS_DOMAIN}" \
  --safe-address "${SAFE_ADDRESS}" \
  --owner-private-key "${OWNER_PRIVATE_KEY}" \
  --rpc-url "${RPC_URL}" \
  --safe-api-key "${SAFE_API_KEY}" \
  --network "${NETWORK:-mainnet}"
```

**Note**: After deployment, you'll need to approve the Safe transaction to set the contenthash. The site will be immediately available on IPFS gateways, and ENS gateways (`.eth.limo`, `.eth.link`) will be available after Safe transaction execution and propagation (5-15 minutes).

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

[Add your license here]

## 🤝 Contributing

This project is prepared for presentation to the ENS DAO community. Contributions and feedback from the ENS community are welcome.

## 📞 Contact

For questions or contributions related to this governance portal, please reach out through the [ENS DAO Governance Forum](https://discuss.ens.domains/).

---

**Note**: This project is being prepared for an announcement in the ENS DAO forum. Stay tuned for updates!

