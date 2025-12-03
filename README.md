# Analytics Dashboard

A modern React/Next.js analytics dashboard featuring Bitcoin market data visualization and company data management with advanced form handling and data persistence.

## Features

- **Bitcoin Market Analytics**

  - Real-time Bitcoin price chart (30-day history)
  - Volume vs. price volatility scatter plot (180-day data)

- **Company Data Management**

  - AG Grid table with sorting, filtering, and pagination
  - Add/Edit company entries with comprehensive form validation
  - 5-field matching algorithm for intelligent duplicate detection
  - localStorage persistence across page reloads
  - Data reset functionality with confirmation dialog

- **Modern Tech Stack**
  - Next.js 16 with React 19
  - TypeScript with strict typing
  - Zustand for state management
  - Zod + React Hook Form for validation
  - Flowbite React components
  - ApexCharts for data visualization
  - AG Grid for advanced tables

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation & Running Locally

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Lawbrokr
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                   # Next.js app router
├── components/            # React components
│   ├── AddEntryForm.tsx
│   ├── AppSidebar.tsx
│   ├── BitcoinPriceChart.tsx
│   ├── BitcoinScatterChart.tsx
│   ├── CompanyTable.tsx
│   ├── DashboardLayout.tsx
│   └── MainContent.tsx
├── hooks/                 # Custom React hooks
│   ├── useBitcoinData.ts
│   ├── useCompanyData.ts
│   └── useLocalStorage.ts
├── lib/                   # Utility functions
│   ├── utils/
│   │   └── matchingAlgorithm.ts
│   └── validations/
│       └── companySchema.ts
├── store/                 # Zustand state management
│   └── companyStore.ts
└── types/                 # TypeScript types
    ├── bitcoin.ts
    └── company.ts
```
