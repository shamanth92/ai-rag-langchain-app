export const WEEKLYCONTENT: WEEKLYCONTENTTYPE[] = [
  {
    week: "WEEK 1",
    topic: "Overview of Kubernetes",
    concepts: [
      "Why you need Kubernetes and what it can do",
      "What Kubernetes is not",
      "Historical context for Kubernetes",
    ],
  },
  {
    week: "WEEK 2",
    topic: "Cluster Architecture",
    concepts: [
      "Control plane components",
      "Node components",
      "Architecture variations",
    ],
  },
  {
    week: "WEEK 3",
    topic: "Containers",
    concepts: ["Container images", "Container runtimes"],
  },
  {
    week: "WEEK 4",
    topic: "Workloads",
    concepts: ["Workload placement", "Pods"],
  },
  {
    week: "WEEK 5",
    topic: "Services, Load Balancing, and Networking",
    concepts: [
      "The Kubernetes network model",
      "Service",
      "Ingress",
      "Ingress Controllers",
    ],
  },
  {
    week: "WEEK 6",
    topic: "Storage",
    concepts: ["Volumes", "Persistent Volumes"],
  },
  {
    week: "WEEK 7",
    topic: "Configuration",
    concepts: ["ConfigMaps", "Secrets"],
  },
  {
    week: "WEEK 8",
    topic: "Security",
    concepts: ["Kubernetes security mechanisms", "Cloud provider security"],
  },
];

interface WEEKLYCONTENTTYPE {
  week: string;
  topic: string;
  concepts: string[];
}
