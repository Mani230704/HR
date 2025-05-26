# **App Name**: PerformPulse

## Core Features:

- Employee Directory: Display a searchable and filterable list of employees, sourced from the dummyjson.com API, with user cards showing key information and interactive buttons.
- Dynamic User Profiles: Provide dynamic user detail pages accessible via unique URLs, featuring detailed profiles, performance metrics, and a tabbed interface for 'Overview,' 'Projects,' and 'Feedback.'
- Bookmark Management: Enable users to bookmark employee profiles, manage the bookmark list, and trigger UI actions for 'Promote' or 'Assign to Project' directly from the bookmark manager.
- Analytics Dashboard: Present a chart visualizing department-wise average performance ratings and bookmark trends, using Chart.js or a similar library.
- Dark Mode: Implement a dark mode toggle using Tailwind CSS classes to switch between light and dark themes.
- AI-Powered Project Assignment: Use a generative AI tool to analyze the text from feedback given to an employee. Summarize the key skills shown in that feedback. Rank these in order. Use the summary as well as the employee role as input to suggest new project assignments.

## Style Guidelines:

- Primary color: Deep blue (#3F51B5), evoking a sense of trust and professionalism, essential for HR applications. This color should dominate the dashboard's main elements.
- Background color: Light gray (#F0F2F5), providing a clean, neutral backdrop that ensures readability and focuses attention on the data.
- Accent color: Vibrant purple (#7E57C2), used sparingly to highlight key interactive elements, such as buttons and call-to-action areas, drawing the user's eye without overwhelming the interface.
- Clean and readable sans-serif fonts for data clarity.
- Consistent use of minimalist icons for navigation and quick actions.
- A structured grid layout that adapts to different screen sizes, maintaining consistency.
- Subtle transitions and animations for tab and content loading.
- Dark theme background color: Dark gray (#333333) to reduce eye strain in low-light environments.
- Dark theme text color: Light gray (#DDDDDD) for readability against the dark background.
- Dark theme accent color: Teal (#008080) to provide contrast and highlight interactive elements.