export interface User {
  id: string;
  username: string;
  avatar: string;
  reputation: number;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  code?: string;
  language?: string;
  author: User;
  votes: number;
  comments: number;
  tags: string[];
  createdAt: string;
  views: number;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  votes: number;
  createdAt: string;
  replies?: Comment[];
}

export const mockUsers: User[] = [
  {
    id: "1",
    username: "AIEnthusiast",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AIEnthusiast",
    reputation: 2450
  },
  {
    id: "2",
    username: "CodeMaster",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CodeMaster",
    reputation: 1820
  },
  {
    id: "3",
    username: "ClaudeExplorer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ClaudeExplorer",
    reputation: 3100
  },
  {
    id: "4",
    username: "DevGuru",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DevGuru",
    reputation: 890
  },
];

export const mockPosts: Post[] = [
  {
    id: "1",
    title: "How Claude helped me optimize a React component's performance",
    content: "I was struggling with performance issues in a complex data visualization component. Claude suggested using useMemo and React.memo strategically, and the results were amazing! Here's the conversation and the solution...",
    code: `const MemoizedChart = React.memo(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      computed: expensiveCalculation(item)
    }));
  }, [data]);

  return <Chart data={processedData} />;
});`,
    language: "typescript",
    author: mockUsers[0],
    votes: 127,
    comments: 18,
    tags: ["React", "Performance", "Claude"],
    createdAt: "2024-01-15T10:30:00Z",
    views: 1523
  },
  {
    id: "2",
    title: "Claude's approach to debugging a tricky async race condition",
    content: "Had a nasty race condition in my async code that was causing intermittent failures. Claude walked me through identifying the issue using AbortController and proper cleanup. The explanation was incredibly clear!",
    code: `useEffect(() => {
  const controller = new AbortController();
  
  async function fetchData() {
    try {
      const response = await fetch(url, { 
        signal: controller.signal 
      });
      const data = await response.json();
      setData(data);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error(error);
      }
    }
  }
  
  fetchData();
  return () => controller.abort();
}, [url]);`,
    language: "javascript",
    author: mockUsers[1],
    votes: 94,
    comments: 12,
    tags: ["JavaScript", "Async", "Debugging"],
    createdAt: "2024-01-14T15:45:00Z",
    views: 892
  },
  {
    id: "3",
    title: "Building a custom AI chatbot with Claude's guidance",
    content: "Claude helped me architect a full-stack chatbot application from scratch. The conversation covered everything from API design to state management. Here's the backend structure we settled on...",
    code: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();
  
  const response = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    messages: messages,
  });
  
  return Response.json(response);
}`,
    language: "typescript",
    author: mockUsers[2],
    votes: 203,
    comments: 31,
    tags: ["AI", "Claude", "TypeScript", "API"],
    createdAt: "2024-01-13T09:20:00Z",
    views: 2341
  },
  {
    id: "4",
    title: "Python data pipeline optimization with Claude",
    content: "My ETL pipeline was taking forever to process large datasets. Claude suggested using generators and multiprocessing, which reduced processing time by 70%!",
    code: `from multiprocessing import Pool
from typing import Iterator, List

def process_chunk(chunk: List[dict]) -> List[dict]:
    return [transform_item(item) for item in chunk]

def process_data_parallel(data: Iterator[dict], chunk_size: int = 1000):
    with Pool() as pool:
        chunks = []
        chunk = []
        
        for item in data:
            chunk.append(item)
            if len(chunk) >= chunk_size:
                chunks.append(chunk)
                chunk = []
        
        if chunk:
            chunks.append(chunk)
        
        results = pool.map(process_chunk, chunks)
        return [item for sublist in results for item in sublist]`,
    language: "python",
    author: mockUsers[3],
    votes: 76,
    comments: 9,
    tags: ["Python", "Performance", "Data"],
    createdAt: "2024-01-12T14:10:00Z",
    views: 654
  },
  {
    id: "5",
    title: "Understanding Tailwind's design system with Claude's help",
    content: "I wanted to create a consistent design system using Tailwind. Claude explained the importance of CSS variables and semantic tokens, transforming how I approach styling.",
    author: mockUsers[0],
    votes: 45,
    comments: 7,
    tags: ["CSS", "Tailwind", "Design"],
    createdAt: "2024-01-11T11:25:00Z",
    views: 432
  }
];

export const mockComments: Record<string, Comment[]> = {
  "1": [
    {
      id: "c1",
      content: "This is brilliant! I had a similar issue and this approach solved it perfectly. One question though - what about handling the loading states?",
      author: mockUsers[1],
      votes: 12,
      createdAt: "2024-01-15T11:30:00Z",
      replies: [
        {
          id: "c1-r1",
          content: "Good point! I added a loading state using a separate useState hook. The memoization still works great with it.",
          author: mockUsers[0],
          votes: 8,
          createdAt: "2024-01-15T12:15:00Z"
        }
      ]
    },
    {
      id: "c2",
      content: "Have you benchmarked the performance improvement? Would love to see some numbers!",
      author: mockUsers[2],
      votes: 5,
      createdAt: "2024-01-15T13:45:00Z",
      replies: [
        {
          id: "c2-r1",
          content: "Yes! Render time went from ~120ms to ~15ms on average. I used React DevTools Profiler to measure it.",
          author: mockUsers[0],
          votes: 15,
          createdAt: "2024-01-15T14:20:00Z"
        },
        {
          id: "c2-r2",
          content: "That's impressive! Did you test with different data sizes?",
          author: mockUsers[3],
          votes: 3,
          createdAt: "2024-01-15T15:00:00Z"
        }
      ]
    }
  ],
  "2": [
    {
      id: "c3",
      content: "AbortController is such an underrated API! Saved me so many times from memory leaks.",
      author: mockUsers[2],
      votes: 8,
      createdAt: "2024-01-14T16:30:00Z"
    },
    {
      id: "c4",
      content: "Great explanation! I'd also recommend looking into React Query for managing async state - it handles a lot of this automatically.",
      author: mockUsers[3],
      votes: 11,
      createdAt: "2024-01-14T17:00:00Z",
      replies: [
        {
          id: "c4-r1",
          content: "Thanks for the suggestion! I've been meaning to try React Query. Does it handle cleanup as elegantly?",
          author: mockUsers[1],
          votes: 4,
          createdAt: "2024-01-14T17:30:00Z"
        }
      ]
    }
  ]
};
