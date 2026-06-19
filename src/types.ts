export type NavTab =
  | "command_center"
  | "ledger"
  | "scam_intelligence"
  | "copilot"
  | "wealth_planning"
  | "wealth_projection"
  | "knowledge_center"
  | "security"
  | "settings";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: "Housing" | "Food" | "Utilities" | "Transport" | "Leisure" | "Investment" | "Salary" | "Miscellaneous";
  amount: number;
  type: "Credit" | "Debit";
}

export interface LedgerAnalysisResult {
  transactions: Transaction[];
  metrics: {
    totalCredit: number;
    totalDebit: number;
    savingsRate: number;
    primaryIncomeSource: string;
    topExpenseCategory: string;
  };
  categoryShares: Record<string, number>;
  aiSummary: string;
}

export interface ScamAnalysisResult {
  threatScore: number;
  riskClassification: "Minimal" | "Low" | "Medium" | "High" | "Critical";
  scamType: string;
  threatExplanation: string;
  redFlags: string[];
  recommendedActions: string[];
  scammerTricksUsed: string[];
}

export interface WealthGoal {
  id: string;
  name: string;
  category: "Emergency Fund" | "Laptop Purchase" | "Education" | "Travel" | "Vehicle" | "Custom Goal";
  targetAmount: number;
  currentAmount: number;
  milestones: string[];
  recommendation: string;
  deadlineDate: string;
}

export interface CopilotMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface SecurityEventLog {
  id: string;
  timestamp: string;
  event: string;
  status: "Completed" | "Warning" | "Authorized" | "Scanned" | "Blocked";
  ipAddress: string;
  device: string;
}
