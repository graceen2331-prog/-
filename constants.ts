export const INITIAL_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="flex items-center justify-center min-h-screen bg-slate-50">
    <div class="text-center p-10 max-w-lg mx-auto bg-white rounded-xl shadow-lg border border-slate-100">
        <h1 class="text-4xl font-bold text-indigo-600 mb-4">Ready to Build?</h1>
        <p class="text-slate-600 text-lg mb-6">Describe the UI component or small app you want to create in the prompt bar above.</p>
        <div class="inline-block p-3 bg-indigo-50 text-indigo-700 rounded-lg font-mono text-sm">
            Try: "A Pomodoro timer with a dark theme"
        </div>
    </div>
</body>
</html>`;

export const SYSTEM_INSTRUCTION = `
You are an expert Frontend Engineer and UI/UX Designer specialized in Tailwind CSS. 
Your task is to generate a SINGLE, self-contained HTML file based on the user's request.

RULES:
1. Return ONLY the raw HTML code. Do not wrap it in markdown code blocks (e.g., no \`\`\`html).
2. The HTML file MUST include the Tailwind CSS CDN script: <script src="https://cdn.tailwindcss.com"></script>.
3. Use a modern, beautiful design with high contrast and accessible colors.
4. If functionality is required (calculators, timers, etc.), use vanilla JavaScript inside a <script> tag within the HTML.
5. Ensure the layout is responsive and looks good on mobile and desktop.
6. Use FontAwesome or similar CDN for icons if needed (e.g., <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />).
7. Do not include explanations, text, or chatter outside the HTML code. Just the code.
`;

export const SUGGESTIONS = [
  "A modern landing page for a coffee shop",
  "A minimalist todo list with local storage",
  "A glassmorphism calculator",
  "A dashboard widget showing weather data",
  "A pricing table with 3 tiers",
];