import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./BlogView.css";

interface Heading {
  id: string;
  level: number;
  text: string;
  icon?: string;
}

const BlogView = () => {
  const [activeHeadingIndex, setActiveHeadingIndex] = useState<number>(-1);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const readerRef = useRef<HTMLDivElement>(null);

  const markdownContent = `
# PHASE 1, WEEK 1: PYTHON BASICS + ENVIRONMENT

## TOPICS TO MASTER THIS WEEK

### 1️⃣ PYTHON INSTALLATION & VIRTUAL ENVIRONMENTS

**Why Virtual Environments?**

Virtual environments are isolated Python installations for different projects. Each project gets its own dependencies without conflicts.

#### How to Set Up (macOS/Linux/Windows)

**Step 1: Check Python Installation**

\`\`\`shell
python --version
python3 --version
\`\`\`

**Step 2: Create a Project Folder**

\`\`\`shell
# Create folder for Week 1 learning
mkdir ~/ai-engineer-learning
cd ~/ai-engineer-learning
\`\`\`

**Step 3: Create Virtual Environment**

\`\`\`shell
# Create virtual environment named 'venv'
python -m venv venv venv
\`\`\`

This creates a folder \`venv/\` with Python isolated just for this project.

**Step 4: Activate Virtual Environment**

On macOS/Linux:

\`\`\`shell
source venv/bin/activate
\`\`\`

On Windows:

\`\`\`shell
venv\\Scripts\\activate
\`\`\`

You should see \`(venv)\` at the start of your terminal line. This means you're "inside" the virtual environment.

### 2️⃣ VARIABLES, DATA TYPES & STRING OPERATIONS

**What are Variables?**

Variables are containers that store values. Think of them as labeled boxes holding information.

**Data Types Explained**

Python has several fundamental data types:

- **int**: Whole numbers (5, -10, 0)
- **float**: Decimal numbers (3.14, -2.5)
- **str**: Text/strings ("Hello", 'World')
- **bool**: True or False
- **list**: Ordered collection [1, 2, 3]
- **dict**: Key-value pairs {"name": "Alice"}

**STRING OPERATIONS & F-STRINGS (Most Important!)**

F-strings make string formatting clean and readable:

\`\`\`python
name = "Alice"
age = 25
print(f"Hello {name}, you are {age} years old")
\`\`\`

**Why F-Strings Matter for AI?**

F-strings are used everywhere in modern Python, especially in AI frameworks like PyTorch and TensorFlow. They're also more efficient than older string methods.

### 3️⃣ INPUT/OUTPUT (I/O)

**OUTPUT: print()**

\`\`\`python
print("Hello, World!")
print(f"Variable value: {variable_name}")
\`\`\`

**INPUT: input()**

\`\`\`python
name = input("What is your name? ")
print(f"Hello {name}!")
\`\`\`

### 4️⃣ COMMENTS & DOCUMENTATION

Comments explain your code. Always document your thinking!

\`\`\`python
# This is a single-line comment
x = 5  # You can comment inline too

"""
This is a multi-line comment/docstring.
Use it to explain functions and modules.
"""
\`\`\`

### 5️⃣ WHY PYTHON FOR AI?

1. **Simple syntax** - Focus on algorithms, not syntax complexity
2. **Rich ecosystem** - NumPy, PyTorch, TensorFlow, scikit-learn
3. **Community** - Largest AI/ML community globally
4. **Research-friendly** - Academic papers use Python
5. **Production-ready** - Scales from notebooks to microservices

### 🧠 MEMORY MANAGEMENT BASICS

Python uses automatic memory management via garbage collection. You don't need to manually free memory like in C++.

### ✏️ WEEK 1 CHECKPOINT: YOUR FIRST SCRIPT

Create a file \`hello_ai.py\`:

\`\`\`python
# Week 1 Checkpoint Script
name = input("What is your name? ")
age = input("What is your age? ")
print(f"Hello {name}! In 10 years, you'll be {int(age) + 10} years old.")
print("You're on your way to becoming an AI Engineer!")
\`\`\`

### ✅ WEEK 1 CHECKPOINT QUESTIONS

1. What is the difference between \`int\` and \`float\`?
2. How do you create a virtual environment?
3. What do f-strings do?
4. When would you use \`input()\` vs \`print()\`?

### 💜 WEEK 1 MINI-PROJECT (Optional but Recommended)

Build a simple calculator that:
- Takes two numbers as input
- Performs basic operations (+, -, *, /)
- Prints results using f-strings
`;

  // Extract all headings (H1, H2, H3)
  useEffect(() => {
    const reader = readerRef.current;
    if (!reader) return;

    // Small delay to ensure markdown is fully rendered
    setTimeout(() => {
      const headingElements = reader.querySelectorAll("h1, h2, h3");
      const extractedHeadings: Heading[] = [];

      headingElements.forEach((element, index) => {
        const text = element.textContent || `Heading ${index}`;
        const id = `heading-${index}`;

        const level = parseInt(element.tagName[1]);
        extractedHeadings.push({ id, level, text });
        console.log(`Found heading ${index}: ${text}`);
      });
      console.log("Total headings found:", extractedHeadings.length);

      setHeadings(extractedHeadings);
    }, 100);
  }, []);

  // When activeHeadingIndex changes, scroll to that heading and add active color
  useEffect(() => {
    const reader = readerRef.current;
    if (!reader) return;

    const headingElements = reader.querySelectorAll("h1, h2, h3");

    // Remove active color from all headings
    headingElements.forEach((el) => {
      el.classList.remove("active-heading");
    });

    // Add active color to matched heading
    if (activeHeadingIndex >= 0) {
      const element = headingElements[activeHeadingIndex] as HTMLElement;

      if (element) {
        // Add active color to heading
        element.classList.add("active-heading");

        // Scroll to it
        const offset = element.offsetTop - reader.offsetTop - 20;
        console.log("Scrolling to offset:", offset);
        reader.scrollTo({ top: offset, behavior: "smooth" });
      }
    }
  }, [activeHeadingIndex]);

  // Handle outline button click
  const handleHeadingClick = (index: number) => {
    console.log("Clicked heading index:", index);
    setActiveHeadingIndex(index);
  };

  return (
    <div className="blog-container">
      {/* Main Content Reader */}
      <div className="reader" ref={readerRef}>
        <div className="content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => <h1>{children}</h1>,
              h2: ({ children }) => <h2>{children}</h2>,
              h3: ({ children }) => <h3>{children}</h3>,
              p: ({ children }) => <p>{children}</p>,
              code: ({ children, ...props }) => {
                const inline = !props.className?.includes("language-");
                return inline ? (
                  <code>{children}</code>
                ) : (
                  <pre>
                    <span className="code-label">Shell</span>
                    <code>{children}</code>
                  </pre>
                );
              },
              ul: ({ children }) => <ul>{children}</ul>,
              li: ({ children }) => <li>{children}</li>,
              strong: ({ children }) => <strong>{children}</strong>,
            }}
          >
            {markdownContent}
          </ReactMarkdown>
        </div>
      </div>

      {/* Outline / TOC Sidebar */}
      <div className="outline">
        <div className="outline-label">📚 ON THIS PAGE</div>
        <div className="toc-list">
          {headings.map((heading, index) => {
            const isActive = activeHeadingIndex === index;
            return (
              <button
                key={heading.id}
                onClick={() => handleHeadingClick(index)}
                className={`toc-item level-${heading.level} ${isActive ? "active" : ""}`}
                style={
                  isActive
                    ? {
                        backgroundColor: "#e8e8e8",
                        color: "#2563eb",
                        borderLeftColor: "#2563eb",
                      }
                    : {}
                }
              >
                {heading.text}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogView;
