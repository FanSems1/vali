# Validator Dashboard Explorer

A modern, responsive dashboard for monitoring validator testnet performance, built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

### 📊 Dashboard
- **Project Info Tab**: Network overview, project details, and recent activity
- **Network Tab**: Real-time blocks and transactions monitoring
- **Live Statistics**: Validator count, staking metrics, and network health

### ⚡ Validators
- Complete validator list with rankings
- Voting power, commission, and uptime tracking
- Status indicators (Active, Inactive, Jailed)
- Advanced filtering and search functionality

### 📦 Blocks Explorer
- Real-time block monitoring
- Detailed block information (height, hash, proposer, transactions)
- Gas usage tracking with color-coded indicators
- Pagination for large datasets

### 💸 Transactions
- Comprehensive transaction history
- Multiple transaction types (Transfer, Stake, Delegate, Vote, etc.)
- Status tracking (Success, Failed, Pending)
- Advanced filtering by type and status

### 🔒 Staking Interface
- **Overview**: Top validators and staking statistics
- **Delegate**: Stake tokens to validators
- **Undelegate**: Remove staked tokens
- **Redelegate**: Move stakes between validators
- Real-time staking metrics and rewards calculation

### 🗳️ Governance
- **Proposals**: View and vote on governance proposals
- **Create Proposal**: Submit new governance proposals
- Voting results visualization
- Proposal status tracking (Deposit Period, Voting Period, Passed, etc.)

### 🔗 Wallet Integration
- Multi-wallet support (Phantom, OKX, Backpack, Keplr, MetaMask, WalletConnect)
- Modern wallet connection modal
- Address display with truncation
- Assets and disconnect functionality

## 🛠️ Technology Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS v3
- **Routing**: React Router v7
- **Build Tool**: Vite
- **Wallet Integration**: Multiple wallet adapters
- **Icons**: Custom SVG icons and emojis

## 🎨 Design Features

- **Modern Dark Theme**: Professional dark UI with purple-blue gradients
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Smooth Animations**: CSS transitions and hover effects
- **Glass Morphism**: Modern glass effects and backdrop blur
- **Status Indicators**: Color-coded status badges and progress bars
- **Interactive Elements**: Hover effects and smooth transitions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd validator-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5176`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Responsive Design

The dashboard is fully responsive and optimized for:
- **Desktop**: Full feature set with side navigation
- **Tablet**: Collapsible navigation with touch-friendly interactions
- **Mobile**: Stacked layout with mobile-optimized components

## 🎯 Key Components

### Layout Components
- `Layout.tsx` - Main application layout with navigation
- `WalletConnect.tsx` - Wallet connection modal and management

### Page Components
- `Dashboard.tsx` - Home dashboard with tabs
- `Validators.tsx` - Validator list and management
- `Blocks.tsx` - Block explorer with pagination
- `Transactions.tsx` - Transaction history and filtering
- `Staking.tsx` - Staking interface with multiple tabs
- `Governance.tsx` - Governance proposals and voting

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS v3 with custom configuration:
- Extended color palette
- Custom animations and keyframes
- Responsive breakpoints
- Custom shadows and effects

### Environment Variables
Create a `.env` file for environment-specific configurations:
```env
VITE_APP_TITLE=Validator Dashboard
VITE_API_URL=your-api-url
VITE_CHAIN_ID=testnet-validator-1
```

## 📊 Data Structure

The application currently uses static data for demonstration. To integrate with real blockchain data:

1. Replace static data with API calls
2. Implement WebSocket connections for real-time updates
3. Add proper error handling and loading states
4. Implement caching strategies

## 🎨 Customization

### Colors
The color scheme can be customized in `tailwind.config.js`:
- Primary colors (blue theme)
- Purple accent colors
- Gray scale for backgrounds

### Components
All components are modular and can be easily customized:
- Modify component props for different behaviors
- Update styling with Tailwind classes
- Add new features by extending existing components

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Upload dist folder to Netlify
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Inspired by [Nodes.Guru](https://explorers.guru/) design
- Built with modern React patterns
- Uses industry-standard tooling and best practices

---

**Note**: This is a demonstration dashboard with static data. For production use, integrate with real blockchain APIs and implement proper error handling, authentication, and data validation.# vali
