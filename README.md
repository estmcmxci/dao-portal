# ENS DAO Governance Documentation Portal

A decentralized governance documentation portal for the ENS Protocol and DAO. This portal provides comprehensive information about ENS DAO governance, including the Constitution, voting processes, working groups, proposals, and how to participate in the DAO.

## 🌐 Live Site

**Production:** [v0.fundamentalia.eth.link](https://v0.fundamentalia.eth.link)

The site is deployed via ENS domains using [Autark CLI](https://github.com/autark-dev/autark) and decentralized storage.

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
├── launch/              # Deployment directory
│   ├── out/            # Static build output (not committed)
│   ├── deploy.sh       # Deployment script (loads .env and deploys)
│   ├── secure-deploy.config.yaml  # Config template (sensitive values removed)
│   └── secure-deploy.config.yaml.example  # Example config template
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

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and fill in your sensitive values:
   - `OWNER_PRIVATE_KEY`: Your Safe signer private key
   - `SAFE_API_KEY`: Your Safe API key
   - `RPC_URL`: Ethereum mainnet RPC endpoint
   - `SAFE_ADDRESS`: Your Safe wallet address
   - `ENS_DOMAIN`: Your ENS domain (e.g., `fundamentalia.eth`)

3. Configure deployment:
   - Create `launch/secure-deploy.config.yaml` with your deployment settings
   - See `.env.example` for required configuration values

### Deployment

**Option 1: Using the deployment script (Recommended)**

The deployment script loads environment variables from `.env` and generates the config file automatically:

```bash
cd launch
./deploy.sh
```

**Option 2: Manual deployment**

If you prefer to deploy manually:

```bash
cd launch
# Load environment variables
export $(grep -v '^#' ../.env | xargs)
# Generate config.json (or create it manually with values from .env)
autark deploy --config secure-deploy.config.json
```

The site will be deployed to your configured ENS domain (e.g., `v0.fundamentalia.eth.link`).

**Note**: The deployment script (`deploy.sh`) automatically:
- Loads environment variables from `.env`
- Validates all required variables are present
- Generates `secure-deploy.config.json` with your credentials
- Runs the Autark CLI deployment

## 🔒 Security

**Important Security Notes:**

- ⚠️ **Never commit sensitive files**: The `.env` file and `secure-deploy.config.yaml` contain private keys and API keys
- ✅ All sensitive files are configured in `.gitignore`
- ✅ Use `.env.example` as a template for configuration
- ✅ Private keys are stored in `.env` and should never be shared or committed

### Files to Never Commit

- `.env` and `.env.local`
- `**/secure-deploy.config.yaml`
- `**/secure-deploy.config.json`
- `**/out/` (build outputs)

## 📝 Development Log

See [log.md](./log.md) for a detailed development history and milestones.

## 🌟 Features

- **Comprehensive Governance Documentation**: Complete guides on ENS DAO Constitution, voting procedures, and all proposal types
- **Working Group Details**: In-depth information about Meta-Governance, Ecosystem, and Public Goods working groups
- **Token & Delegation Guides**: Complete information about ENS token distribution, delegation process, and voting mechanics
- **DAO Organization Info**: Details about the ENS Foundation, Security Council, Endowment, and operational wallets
- **Mobile Responsive Design**: Works seamlessly across all device types
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

