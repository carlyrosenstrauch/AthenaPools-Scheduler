export interface Job {
  id: string;
  jobName: string;
  clientName: string;
  // Add other job-related properties as needed
  status: string;
  gateCode: string;
  notes: string;
  tasks: string[];  
}
