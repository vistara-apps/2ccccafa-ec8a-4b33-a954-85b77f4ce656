# RightNow Guides

**Instantly know your rights, every time.**

A mobile-first application that provides instant, location-aware legal rights information and real-time guidance during high-stress encounters, primarily for individuals interacting with law enforcement.

## 🚀 Features

### Core Features

- **📍 Location-Aware Rights Cards**: One-page, mobile-optimized guides detailing what to do, what not to say, and state-specific laws when stopped by authorities
- **🎯 Real-time Guidance Scripts**: Bilingual (English/Spanish) scripts and prompts to guide users through interactions
- **🎥 One-Tap Interaction Recorder**: Quick audio and/or video recording with secure storage
- **📋 Automated Shareable Summary Cards**: AI-generated summary cards with key details for legal counsel

### Technical Features

- **🔐 Secure Authentication**: Privy integration with Base Wallet support
- **🌐 Decentralized Storage**: IPFS integration via Pinata for evidence storage
- **🤖 AI-Powered**: OpenAI integration for script generation and summary cards
- **💳 Micro-transactions**: Stripe integration for premium features
- **📱 PWA Ready**: Full Progressive Web App capabilities

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Authentication**: Privy (Base Wallet integration)
- **State Management**: Zustand with persistence
- **Animations**: Framer Motion
- **Storage**: IPFS via Pinata
- **AI**: OpenAI GPT-4
- **Payments**: Stripe
- **Data**: Airstack for location-based legal information

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Required API keys (see Environment Variables)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rightnow-guides
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your API keys:
   ```env
   # Privy Configuration
   NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id_here
   
   # OpenAI Configuration
   OPENAI_API_KEY=your_openai_api_key_here
   
   # Pinata IPFS Configuration
   PINATA_API_KEY=your_pinata_api_key_here
   PINATA_SECRET_API_KEY=your_pinata_secret_key_here
   
   # Airstack Configuration
   AIRSTACK_API_KEY=your_airstack_api_key_here
   
   # Stripe Configuration
   STRIPE_SECRET_KEY=your_stripe_secret_key_here
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Usage

### First-Time Setup

1. **Connect Wallet**: Use Base Wallet or email to authenticate
2. **Enable Location**: Grant location permissions for state-specific rights
3. **Review Rights Guide**: Familiarize yourself with your local rights

### During an Encounter

1. **Quick Record**: Tap the prominent record button
2. **Access Scripts**: Use pre-written de-escalation scripts
3. **Stay Calm**: Follow the guidance provided in your rights card

### After an Encounter

1. **Review Recording**: Check your recorded evidence
2. **Add Notes**: Document important details
3. **Generate Summary**: Create a shareable summary card
4. **Share Securely**: Send to legal counsel via secure IPFS links

## 🏗 Architecture

### Data Model

```typescript
// Core entities
interface User {
  userId: string;
  walletAddress: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Interaction {
  interactionId: string;
  userId: string;
  timestamp: Date;
  duration: number;
  location: LocationData;
  notes: string;
  recordingUrl?: string;
  scriptUsed?: string;
  shareCardUrl?: string;
  createdAt: Date;
}

interface RightsGuide {
  guideId: string;
  state: string;
  content: RightsContent;
  languages: ('english' | 'spanish')[];
  lastUpdated: Date;
}
```

### Component Architecture

- **Layout Components**: AppShell for consistent mobile layout
- **UI Components**: ActionCard, QuickRecordButton, etc.
- **Feature Components**: LocationAwareGuide, ScriptDisplay
- **Hooks**: useLocation, useRecording, useScripts
- **Store**: Zustand for state management with persistence

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

### Code Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── layout/         # Layout components
│   └── features/       # Feature-specific components
├── hooks/              # Custom React hooks
├── lib/                # API clients and utilities
├── store/              # Zustand store
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

### Design System

The app uses a custom design system built on Tailwind CSS:

- **Colors**: Dark theme with primary blue and accent orange
- **Typography**: Responsive text scales with semantic naming
- **Spacing**: Consistent spacing scale (sm, md, lg, xl)
- **Components**: Reusable component variants
- **Animations**: Smooth transitions with cubic-bezier easing

## 🔒 Security & Privacy

- **End-to-End Encryption**: All recordings are encrypted
- **Decentralized Storage**: Evidence stored on IPFS
- **No Data Tracking**: Minimal data collection
- **Secure Authentication**: Wallet-based authentication
- **Local Storage**: Sensitive data stored locally when possible

## 🌍 Deployment

### Vercel (Recommended)

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Set Environment Variables**: Add all required API keys
3. **Deploy**: Automatic deployment on push to main branch

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm run start
   ```

## 📄 API Documentation

### Core APIs

- **OpenAI**: Script generation and summary cards
- **Pinata**: IPFS storage for recordings and evidence
- **Airstack**: Location-based legal information
- **Stripe**: Payment processing for premium features
- **Privy**: Authentication and wallet management

### Custom Endpoints

- `POST /api/recordings/upload` - Upload recordings to IPFS
- `POST /api/scripts/generate` - Generate custom scripts
- `POST /api/summaries/create` - Create summary cards
- `POST /api/payments/create-intent` - Create payment intents

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Legal Disclaimer

This application provides general information about legal rights and is not a substitute for professional legal advice. Laws vary by jurisdiction and situation. Always consult with a qualified attorney for specific legal guidance.

## 🆘 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs via GitHub Issues
- **Community**: Join our Discord for discussions
- **Legal Resources**: Contact local legal aid organizations

## 🙏 Acknowledgments

- **ACLU**: For legal rights information and guidance
- **EFF**: For digital rights advocacy
- **Base**: For blockchain infrastructure
- **Privy**: For authentication solutions
- **OpenAI**: For AI capabilities

---

**Remember: Know your rights, stay safe, and document everything.**
