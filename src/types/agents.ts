export interface AgentConfig {
    [key: string]: any; // Expand based on your actual config structure
  }
  
  export interface Agent {
    agent_title: string;
    agent_config: AgentConfig;
  }
  
  export interface FunctionConfig {
    name: string;
    description: string;
    parameters: {
      type: string;
      properties: Record<string, { type: string; description: string }>;
    };
  }