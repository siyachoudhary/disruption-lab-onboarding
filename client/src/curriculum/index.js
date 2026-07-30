// The full Disruption Lab onboarding curriculum.
// Keep module ids + lesson counts in sync with server/src/curriculumMeta.js
//
// Shape:
//   module: { id, title, emoji, estMinutes, blurb, lessons[], quiz[] }
//   lesson: { id, title, minutes, body (markdown) }
//   quiz question: { q, options[], answer (index of correct option) }

export const TOTAL_ESTIMATE_HOURS = "10–15 hours";

export const SUGGESTED_PLAN = [
  { day: "Day 1", focus: "Welcome & Team Expectations  +  Dev Environment & Command Line", hours: "~1.5 hrs" },
  { day: "Days 2–3", focus: "Git & GitHub (the big one)", hours: "~3 hrs" },
  { day: "Day 4", focus: "APIs & How the Web Talks", hours: "~2 hrs" },
  { day: "Day 5", focus: "Cloud & AWS", hours: "~2.5 hrs" },
  { day: "Day 6", focus: "Data & Secrets  +  Using AI Tools", hours: "~3 hrs" },
  { day: "Day 7", focus: "Working in a Team & Shipping  +  Certificate", hours: "~2 hrs" },
];

export const modules = [
  // ───────────────────────────────────────────── Intro · Team Expectations
  {
    id: "welcome",
    title: "Welcome & Team Expectations",
    emoji: "",
    estMinutes: 52,
    blurb:
      "Before any code: how a Disruption Lab team runs week to week, what's expected of you, and who's there to help you grow.",
    lessons: [
      {
        id: "welcome-1",
        title: "The weekly rhythm: standup, dev night & client calls",
        minutes: 14,
        body: `## You're joining a team, not just a codebase

Disruption Lab projects are built by small teams shipping real software for real clients. That only works if everyone shows up to a few shared touchpoints each week. Here are the three you'll hear about constantly.

*(Exact days, times, and tools vary by team — your PM will share yours. What matters is understanding what each event is **for**.)*

> **⚠️ Your first deadline — read this now.** There is usually about **one week between kickoff and your first dev night**. You are expected to **complete this entire certification before Dev Night 1**. Not finishing it in time counts as a **strike** (see the *Strike system* lesson in this module). So don't leave it to the last minute — pace yourself across the week using the suggested schedule on your dashboard.

## Standup

A **standup** is a short, regular check-in (often 1–2x per week for student teams). Everyone quickly answers three questions:

1. **What did I do** since we last met?
2. **What am I doing** next?
3. **What's blocking me?**

**What it looks like:** the team goes around one by one, ~1–2 minutes each, usually led by the PM or TL. It is *not* a place to solve problems in depth — if you're blocked, you name it, and someone follows up with you after. The goal is **visibility**: everyone knows where the project stands and blockers surface early instead of festering.

## Dev night

**Dev night** is the team's main working session — **2 hours per week**, everyone building together. It's the heartbeat of the week. **Your project leadership sets the time and place**, so watch your team channel for the details.

**What it looks like:** you work through your assigned tasks, **pair up** with teammates, and **ask your TL for help** when you're stuck. The PM checks in on progress and priorities. Most of the real collaboration, learning, and unblocking happens here — which is exactly why showing up matters so much. Come with your environment set up and your current task in mind.

## Client calls

**Client calls** are meetings with the actual client or stakeholder the project is being built for. They're more formal than internal meetings.

**What they look like:** the PM (often with the TL) leads the conversation. You might **demo the feature you built**, answer questions about it, or take notes on new requirements. Be prepared, be professional, and **don't overpromise** — if you're unsure whether something is possible, say you'll follow up rather than committing on the spot. You represent Disruption Lab on these calls.`,
      },
      {
        id: "welcome-2",
        title: "Attendance & communication expectations",
        minutes: 13,
        body: `## Your teammates are counting on you

In a class, missing a session mostly affects you. On a team, **your absence blocks other people** — a reviewer waiting on your PR, a teammate who needs your endpoint, a PM reporting progress to the client. Reliability is the single most valued trait in a new member.

## Attendance

- **Treat standups, dev nights, and your client calls as commitments**, not optional drop-ins.
- Consistent presence is how you build trust, learn fastest, and get the good opportunities.

## The strike policy

Attendance is taken seriously: an **unexcused absence** from a required team event is one of the things that earns a **strike**, and **3 strikes means you're removed from the lab.** The word that matters is **unexcused** — an absence you communicate about in advance is a very different thing from simply not showing up. Strikes aren't only about absences, though — the **next lesson breaks down the full strike system**: everything that can earn a strike and exactly what happens at each one.

## When you can't make it

Life happens — that's fine, and it's how you avoid a strike. What's **not** fine is going silent. The expectation is simple:

- **Give notice in advance**, not after the fact — this is what gets an absence excused.
- Message your **PM or TL** as early as you know.
- A quick "I can't make dev night this week, but I'll have my ticket done by Friday and I'm available on Slack" keeps everything running.

## Everyday communication

- **Be reachable.** Check your team's channel (Slack/Discord) regularly and reply within about a day.
- **Raise blockers early.** If you're stuck for more than ~30 minutes, say so — struggling productively is good, suffering in silence for days is not.
- **Communicate status proactively.** If a task is going to slip, flag it *before* the deadline.
- **The worst thing you can do is disappear.** Ghosting a team — going quiet with no updates — breaks trust fast and is the fastest way to lose responsibilities.

## Professionalism

Especially on client calls and in shared channels, remember you're representing Disruption Lab. Be respectful, communicate clearly, and follow through on what you say you'll do.`,
      },
      {
        id: "welcome-strikes",
        title: "The strike system",
        minutes: 12,
        body: `## Why strikes exist

A Disruption Lab team only works if everyone can rely on everyone else. The **strike system** is how we keep that reliability fair and transparent: instead of vague expectations, there's a clear, limited set of consequences so you always know where you stand. Strikes are about **patterns of dropping the ball or disappearing** — not honest mistakes, not asking for help, and not the occasional thing that comes up in life (as long as you communicate).

## What can earn a strike

Your project leadership has the final say, but these are the things that typically count as a strike:

- **An unexcused absence** from a required team event — dev night, standup, or a client call you were expected to attend.
- **Not completing this onboarding certification before Dev Night 1.** You get about a week from kickoff; finishing it is your first responsibility on the team.
- **Going unresponsive / ghosting** — not replying in your team channel for an extended stretch with no heads-up.
- **Repeatedly missing your committed deadlines or tickets** without communicating about it.
- **No-showing or being clearly unprepared for a client call.**
- **Unprofessional conduct** toward teammates, leadership, or the client.

The common thread: almost every strike comes from **not communicating**. An absence or a slipped deadline you flag *in advance* is excused and does **not** earn a strike — the same event with silence does.

## What happens at each strike

| Strike | What happens |
|---|---|
| **Strike 1** | Recorded. Your PM or TL gives you a heads-up so you know where you stand and can course-correct. |
| **Strike 2** | A direct conversation with your project leadership about what's going wrong and how to fix it. Treat this as a final warning. |
| **Strike 3** | You are **removed from the lab.** |

## How to make sure you never get one

It's genuinely simple, and it's the same lesson as the rest of this module:

- **Communicate in advance.** Can't make a session? Deadline slipping? Say so *before*, to your PM/TL. That turns a potential strike into a non-issue.
- **Finish this certification before Dev Night 1.** Use the suggested weekly schedule on your dashboard so it doesn't pile up.
- **Stay reachable** and answer in your team channel.
- **Ask for help early** — being stuck is never a strike; disappearing is.

Do those, and the strike system is something you'll never have to think about again.`,
      },
      {
        id: "welcome-3",
        title: "Who's who: PMs, TLs & growing in DLab",
        minutes: 13,
        body: `## Two people you'll work closely with

Every Disruption Lab team has a **Project Manager (PM)** and a **Team Lead (TL)**. Knowing who to go to for what will save you a lot of time.

## Team Lead (TL) — your technical guide

The TL owns the **technical direction** of the project.

- Sets the architecture and tech decisions.
- **Reviews your code** and pull requests.
- **Unblocks you technically** and mentors you as you learn.

**Go to your TL for:** "How should I build this?", "Why won't this work?", "Is this the right approach?", code review, and anything hands-on-technical.

## Project Manager (PM) — your coordinator & client link

The PM owns **scope, timeline, and the client relationship**.

- Runs standups and keeps the project on track.
- Decides **priorities** — what the team works on and in what order.
- Is the **main point of contact with the client**.

**Go to your PM for:** "What should I work on next?", "What's the priority?", questions about deadlines, client requirements, or if you'll be absent.

| You need… | Ask the… |
|---|---|
| Help writing or fixing code | TL |
| A code review | TL |
| To know what to work on next | PM |
| To report you'll miss a session | PM (and your TL) |
| Clarity on a client requirement | PM |

## Senior leadership: Engineering Manager & Head of Tech

Beyond your PM and TL, every project has an **Engineering Manager (EM)** and a **Head of Tech** assigned from Disruption Lab's senior leadership team. They are **not as hands-on** as your PM and TL — you won't see them at every session — but they're **around every now and then** to support the project and check in.

Their job is to **help things run smoothly at a higher level**, for example:

- Helping **coordinate client communication** when it needs a senior touch.
- Sorting out **technical access** (accounts, tools, credentials, permissions the team needs).
- Providing guidance and unblocking issues that are above the day-to-day.

You generally won't go to them for routine work — your PM and TL are your first stops — but it's good to know they exist, and it's a great sign when they're around. Treat them with the same professionalism you'd bring to a client call.

## How PMs and TLs help you advance

Your PM and TL aren't just there to assign work — they're the people who **notice your growth and open doors** for you. In Disruption Lab, roles are often **filled from within**: today's developer is next semester's TL or PM.

They can help you advance by giving **feedback**, trusting you with **more ownership**, and recommending you for **leadership roles** — but they can only do that if you give them something to notice. The members who move up tend to:

- **Be reliable** — do what they said they'd do, on time.
- **Take ownership** — see a task through, and flag problems early instead of hiding them.
- **Communicate well** — keep the team in the loop.
- **Help teammates** — answer questions, review each other's work.
- **Ask for growth** — tell your PM/TL you're interested in more responsibility or in becoming a lead. They can't read your mind.

Do those consistently, and you won't just finish onboarding — you'll be on track to lead. That's the whole point of Disruption Lab.`,
      },
    ],
    quiz: [
      {
        q: "What are you expected to share at a standup?",
        options: [
          "A detailed live debugging session for your current bug",
          "What you did, what you're doing next, and any blockers — briefly",
          "A full demo of every feature to the client",
          "Nothing — standups are just for the PM to talk",
        ],
        answer: 1,
      },
      {
        q: "What is 'dev night'?",
        options: [
          "A formal presentation to the client",
          "An optional social event with no work involved",
          "The team's main working session where you build together and get help from your TL",
          "A written status report submitted online",
        ],
        answer: 2,
      },
      {
        q: "You realize you can't attend this week's dev night. What should you do?",
        options: [
          "Say nothing and explain afterward if someone asks",
          "Message your PM/TL in advance to let them know and share your plan",
          "Just skip it — attendance is optional",
          "Quietly leave the team's channel",
        ],
        answer: 1,
      },
      {
        q: "You're stuck on how to architect a feature technically. Who is your go-to?",
        options: [
          "The client, directly",
          "The Team Lead (TL)",
          "Nobody — you must figure it out alone",
          "The Project Manager (PM)",
        ],
        answer: 1,
      },
      {
        q: "Who typically owns the timeline, priorities, and the client relationship?",
        options: [
          "The Team Lead (TL)",
          "The Project Manager (PM)",
          "Each developer individually",
          "The client",
        ],
        answer: 1,
      },
      {
        q: "Which best describes how to advance toward a leadership role in Disruption Lab?",
        options: [
          "Work in silence and hope someone notices",
          "Be reliable, take ownership, communicate well, help teammates, and tell your PM/TL you want to grow",
          "Only focus on writing code and skip all meetings",
          "Wait until you're asked with no effort on your part",
        ],
        answer: 1,
      },
      {
        q: "By when are you expected to complete this entire certification?",
        options: [
          "There's no deadline — whenever you get to it",
          "Before your first dev night (about a week after kickoff)",
          "By the end of the semester",
          "Before the final client call",
        ],
        answer: 1,
      },
      {
        q: "What happens when you reach your 3rd strike?",
        options: [
          "Nothing — strikes aren't tracked",
          "You get a warning email only",
          "You are removed from the lab",
          "Your certificate is revoked",
        ],
        answer: 2,
      },
      {
        q: "Which of these would typically earn a strike?",
        options: [
          "Asking your TL for help when you're stuck",
          "Telling your PM in advance that you'll miss a dev night",
          "Not completing this certification before Dev Night 1, or an unexcused absence",
          "Finishing a ticket early",
        ],
        answer: 2,
      },
      {
        q: "How much time per week is dev night, and who sets when and where it happens?",
        options: [
          "2 hours per week; project leadership decides the time and place",
          "As long as you want; you pick the time yourself",
          "30 minutes per week; the client decides",
          "It has no set length and is optional",
        ],
        answer: 0,
      },
      {
        q: "What role do the Engineering Manager and Head of Tech play on your project?",
        options: [
          "They are your day-to-day contacts for every coding task",
          "Senior leaders who are less hands-on but help coordinate client comms and technical access",
          "They are the external client",
          "They only grade your onboarding quizzes",
        ],
        answer: 1,
      },
    ],
  },

  // ───────────────────────────────────────────────────────────── Module 1
  {
    id: "foundations",
    title: "Dev Environment & the Command Line",
    emoji: "🧰",
    estMinutes: 60,
    blurb:
      "Before writing a line of code you need a working environment and comfort in the terminal. This is the ground floor everything else stands on.",
    lessons: [
      {
        id: "foundations-1",
        title: "How software actually gets built",
        minutes: 20,
        body: `## The mental model

Modern apps are built by teams who each work on a copy of the same codebase, then combine their work. To do that safely everyone shares a few tools:

- **A code editor** (VS Code is the standard). It's where you read and write code.
- **A terminal** (a.k.a. command line / shell). A text way to tell your computer what to do.
- **Git** — tracks every change so nothing is ever lost and many people can work at once.
- **A runtime** — the thing that runs your code (Node.js for JavaScript, Python, etc.).

> **Deployment-friendly mindset:** an app is "deployment friendly" when *anyone* can clone it, install it, add a config file, and run it with one or two commands. Every habit in this course pushes toward that.

## Set up your machine

1. Install **VS Code** — free from code.visualstudio.com.
2. Install **Git** — \`git --version\` in a terminal tells you if it's already there.
3. Install **Node.js LTS** — from nodejs.org. Verify with \`node --version\`.
4. Make a **GitHub account** — this is where teams store code in the cloud.

You don't need to memorize any of this. You need to know *what each tool is for* so when something breaks you know where to look.`,
      },
      {
        id: "foundations-2",
        title: "Terminal survival kit",
        minutes: 20,
        body: `## The 12 commands you'll use every day

The terminal feels scary because it's silent — it does exactly what you say, no more. Here's the core set:

| Command | What it does |
|---|---|
| \`pwd\` | Print the folder you're currently in |
| \`ls\` | List files in the current folder |
| \`cd projects\` | Move *into* the \`projects\` folder |
| \`cd ..\` | Move *up* one folder |
| \`mkdir app\` | Make a new folder called \`app\` |
| \`touch file.js\` | Create an empty file |
| \`cat file.js\` | Print a file's contents |
| \`rm file.js\` | Delete a file (no undo!) |
| \`code .\` | Open the current folder in VS Code |
| \`clear\` | Clear the screen |

## Reading a command

\`\`\`bash
npm install react-router-dom
\`\`\`

- \`npm\` — the program you're running (Node's package manager)
- \`install\` — the subcommand
- \`react-router-dom\` — the argument (what to install)

Almost every tool follows this \`program subcommand arguments --flags\` pattern. Once you see it, the terminal stops being scary.

> **Tip:** press the **up arrow** to repeat your last command, and **Tab** to auto-complete file names.`,
      },
      {
        id: "foundations-3",
        title: "Packages, projects & running code",
        minutes: 20,
        body: `## What is a "package"?

Nobody writes everything from scratch. A **package** (or library/dependency) is code someone else wrote that you pull into your project. In JavaScript these come from **npm**.

- \`package.json\` — a file listing your project's dependencies and scripts. Think of it as the recipe card.
- \`node_modules/\` — the folder where downloaded packages actually live. **Never commit this to Git** (it's huge and rebuildable).
- \`npm install\` — reads \`package.json\` and downloads everything into \`node_modules\`.

## The universal "get a project running" flow

When you clone a teammate's project, you almost always do:

\`\`\`bash
git clone <url>        # download the code
cd project-folder      # go into it
npm install            # install dependencies
npm run dev            # start it
\`\`\`

If a project can't be started with roughly these four steps, it's *not* deployment-friendly — and part of your job is to keep projects that simple.

## Scripts

Inside \`package.json\` there's a \`"scripts"\` section:

\`\`\`json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "start": "node src/index.js"
}
\`\`\`

You run these with \`npm run <name>\` (e.g. \`npm run dev\`). Scripts are how a team standardizes "how do I start this thing" so nobody has to guess.`,
      },
    ],
    quiz: [
      {
        q: "What does the `node_modules/` folder contain, and should you commit it to Git?",
        options: [
          "Your source code — yes, always commit it",
          "Downloaded dependencies — no, it's rebuildable from package.json",
          "Secret keys — no, never commit secrets",
          "Compiled output — yes, so teammates don't rebuild",
        ],
        answer: 1,
      },
      {
        q: "You just cloned a teammate's JavaScript project. What's the usual next command before running it?",
        options: ["git push", "npm install", "rm -rf node_modules", "cd .."],
        answer: 1,
      },
      {
        q: "In `npm install react-router-dom`, what is `react-router-dom`?",
        options: [
          "The program being run",
          "A flag",
          "The argument — the package to install",
          "A subcommand",
        ],
        answer: 2,
      },
      {
        q: "Which command shows you which folder the terminal is currently in?",
        options: ["ls", "cd", "pwd", "cat"],
        answer: 2,
      },
      {
        q: "What makes an app 'deployment-friendly'?",
        options: [
          "It has lots of features",
          "Anyone can clone, install, configure, and run it in a couple of commands",
          "It's written in the newest language",
          "It has no dependencies at all",
        ],
        answer: 1,
      },
    ],
  },

  // ───────────────────────────────────────────────────────────── Module 2
  {
    id: "git",
    title: "Git & GitHub",
    emoji: "🌿",
    estMinutes: 180,
    blurb:
      "Version control is the single most important team skill. Master branches, commits, pull requests and forks and you can contribute to any project without fear of breaking things.",
    lessons: [
      {
        id: "git-1",
        title: "Why Git exists & the core loop",
        minutes: 45,
        body: `## The problem Git solves

Imagine five people editing the same document, all at once, with no "undo". Chaos. **Git** is a system that records snapshots of your project over time so you can:

- go back to any previous version,
- work on changes in isolation, and
- combine everyone's work safely.

**GitHub** is a website that hosts your Git repositories in the cloud so a team can share them. (GitLab and Bitbucket are alternatives — same idea.)

## The three areas

When you change a file, it moves through three stages:

1. **Working directory** — your actual files as you edit them.
2. **Staging area** — changes you've marked as "ready to save" (\`git add\`).
3. **Repository** — permanent snapshots you've committed (\`git commit\`).

## The everyday loop

\`\`\`bash
git status                     # what changed?
git add .                      # stage all changes
git commit -m "Add login form" # save a snapshot with a message
git push                       # upload snapshots to GitHub
\`\`\`

And to get others' work:

\`\`\`bash
git pull                       # download + merge the latest from GitHub
\`\`\`

**Commit early, commit often.** A commit is free and reversible. A good commit message finishes the sentence *"If applied, this commit will…"* → "Add login form", "Fix crash on empty search".`,
      },
      {
        id: "git-2",
        title: "Branches: working without fear",
        minutes: 45,
        body: `## What is a branch?

A **branch** is an independent line of work. The default branch is usually called \`main\`. When you want to build a feature, you make a new branch off \`main\`, do your work there, and \`main\` stays untouched and stable.

\`\`\`bash
git checkout -b feature/login   # create + switch to a new branch
# ...edit files, add, commit...
git push -u origin feature/login  # publish the branch to GitHub
\`\`\`

Switch between branches:

\`\`\`bash
git checkout main               # back to main
git checkout feature/login      # back to your feature
\`\`\`

## Why branches matter for teams

- Everyone works on their own branch → nobody steps on anyone's toes.
- \`main\` always stays deployable — it should always work.
- Experiments are safe: if a branch goes wrong, just delete it.

## Naming conventions

Teams pick a pattern, e.g.:

- \`feature/user-profile\`
- \`fix/login-crash\`
- \`chore/update-deps\`

Consistent names make the project readable at a glance.

> **Golden rule:** never commit directly to \`main\` on a team project. Branch, then open a Pull Request (next lesson).`,
      },
      {
        id: "git-3",
        title: "Pull Requests & code review",
        minutes: 45,
        body: `## What is a Pull Request (PR)?

A **Pull Request** is a proposal: *"Here are my changes on my branch — please review them and merge them into \`main\`."* It's the heart of team collaboration on GitHub.

### The flow

1. Push your feature branch to GitHub.
2. On GitHub, click **"Compare & pull request"**.
3. Write a clear title + description: *what* changed and *why*.
4. Teammates **review**: they read the diff, leave comments, request changes or approve.
5. Once approved (and any automated checks pass), you **merge** it into \`main\`.
6. Delete the branch. Done.

## Why PRs are non-negotiable on teams

- **Quality:** a second pair of eyes catches bugs before they reach \`main\`.
- **Shared knowledge:** reviewers learn what's changing in the codebase.
- **A safety gate:** automated tests and checks run on every PR.

## Writing a good PR

A good PR is **small and focused** — one feature or fix. A 2,000-line PR is nearly impossible to review well. Include:

- What problem it solves
- How to test it
- Screenshots if it's UI

## Reviewing well

Be kind and specific. "This function is confusing" is unhelpful; "Could we rename \`x\` to \`userCount\` so it's clearer?" is a gift. Review the *code*, not the person.`,
      },
      {
        id: "git-4",
        title: "Forks, remotes & fixing mistakes",
        minutes: 45,
        body: `## Forking

A **fork** is your *personal copy* of someone else's repository, living under your own GitHub account. You use forks when you don't have write access to the original — most famously to contribute to **open-source** projects.

The open-source contribution flow:

1. **Fork** the repo → you now have your own copy.
2. **Clone** your fork to your machine.
3. Create a **branch**, make changes, push to your fork.
4. Open a **Pull Request** from your fork back to the *original* repo.
5. The maintainers review and merge.

### Fork vs. branch

- **Branch** = a line of work *inside* a repo you can write to (your team's repo).
- **Fork** = a whole separate copy because you *can't* write to the original.

## Remotes

A **remote** is a named link to a repository on the internet.

- \`origin\` — by convention, your main remote (usually your fork or your team's repo).
- \`upstream\` — by convention, the *original* repo you forked from, so you can pull in updates:

\`\`\`bash
git remote add upstream <original-url>
git pull upstream main       # get the latest from the original project
\`\`\`

## Getting unstuck (everyone does)

\`\`\`bash
git status                   # your best friend — read it slowly
git checkout -- file.js      # discard changes to one file
git restore file.js          # same thing, newer syntax
git log --oneline            # see recent commits
git revert <commit>          # safely undo a commit with a new commit
\`\`\`

> **When truly stuck:** don't force things. Copy your changed files somewhere safe, ask a teammate, and never run scary commands you don't understand on shared branches.`,
      },
    ],
    quiz: [
      {
        q: "What is a Pull Request?",
        options: [
          "A command that downloads code from GitHub",
          "A proposal to merge your branch's changes, reviewed by teammates before merging",
          "A backup of your repository",
          "A way to delete the main branch",
        ],
        answer: 1,
      },
      {
        q: "You're on a team project. Where should you do your work for a new feature?",
        options: [
          "Directly on the main branch",
          "On a new feature branch, then open a PR",
          "In a separate cloned folder with no Git",
          "Only in the staging area",
        ],
        answer: 1,
      },
      {
        q: "What's the correct order of the everyday Git save loop?",
        options: [
          "commit → add → push",
          "push → add → commit",
          "add → commit → push",
          "pull → push → add",
        ],
        answer: 2,
      },
      {
        q: "When do you typically FORK a repository rather than branch it?",
        options: [
          "Whenever you start any new feature",
          "When you don't have write access — e.g. contributing to an open-source project",
          "To save a backup before deleting files",
          "Only when the repo is private",
        ],
        answer: 1,
      },
      {
        q: "By convention, what does the `upstream` remote usually point to?",
        options: [
          "Your personal fork",
          "The original repository you forked from",
          "Your local machine",
          "A deleted branch",
        ],
        answer: 1,
      },
      {
        q: "Which is the best commit message?",
        options: [
          "'stuff'",
          "'asdfgh'",
          "'Fix crash when search box is empty'",
          "'final FINAL v2 real'",
        ],
        answer: 2,
      },
    ],
  },

  // ───────────────────────────────────────────────────────────── Module 3
  {
    id: "apis",
    title: "APIs & How the Web Talks",
    emoji: "🔌",
    estMinutes: 120,
    blurb:
      "Almost every app is really just pieces talking to each other over the internet. Understand APIs and you understand how front-ends, back-ends and third-party services connect.",
    lessons: [
      {
        id: "apis-1",
        title: "What an API actually is",
        minutes: 40,
        body: `## The restaurant analogy

You (the **customer**) don't walk into the kitchen. You give your order to a **waiter**, who takes it to the kitchen and brings back your food. An **API** (Application Programming Interface) is the waiter: a defined way to *ask another system to do something or give you data*, without knowing how its kitchen works.

- Your app wants weather data → it asks the **weather API**.
- Your front-end wants the logged-in user's info → it asks *your own* **back-end API**.

## Client and server

- **Client** — the thing making the request (a browser, a mobile app, another server).
- **Server** — the thing that receives the request and sends a response.

They talk over **HTTP**, the language of the web.

## Requests & responses

Every interaction is a **request** and a **response**:

- **Request:** "GET me the user with id 42."
- **Response:** either the data, or an error explaining what went wrong.

That's the whole game. Everything else is detail on how the request and response are shaped.`,
      },
      {
        id: "apis-2",
        title: "HTTP methods, status codes & JSON",
        minutes: 40,
        body: `## The four verbs you need

REST APIs use **HTTP methods** to say what kind of action you want:

| Method | Meaning | Example |
|---|---|---|
| \`GET\` | Read data | Get a list of players |
| \`POST\` | Create data | Add a new player |
| \`PUT\`/\`PATCH\` | Update data | Edit a player's name |
| \`DELETE\` | Remove data | Delete a player |

These map to **URLs (endpoints)**:

\`\`\`
GET    /api/players        → list players
POST   /api/players        → create a player
GET    /api/players/42     → get player 42
DELETE /api/players/42     → delete player 42
\`\`\`

## Status codes

The response comes with a number telling you what happened:

- **2xx = success** (200 OK, 201 Created)
- **4xx = you messed up** (400 bad request, 401 not logged in, 403 not allowed, 404 not found)
- **5xx = the server messed up** (500 internal error)

Memorize the vibe, not the whole list: *4xx is your fault, 5xx is theirs.*

## JSON — the data format

APIs almost always speak **JSON** (JavaScript Object Notation). It's just readable text:

\`\`\`json
{
  "id": 42,
  "name": "Jordan",
  "positions": ["guard", "forward"],
  "active": true
}
\`\`\`

Keys in quotes, values are strings/numbers/booleans/arrays/objects. If you can read this, you can read 90% of API traffic.`,
      },
      {
        id: "apis-3",
        title: "Calling an API & keeping keys safe",
        minutes: 40,
        body: `## Making a request in code

In JavaScript you use \`fetch\`:

\`\`\`js
const res = await fetch("https://api.example.com/players/42");
const data = await res.json();   // parse the JSON body
console.log(data.name);          // "Jordan"
\`\`\`

Sending data with POST:

\`\`\`js
await fetch("https://api.example.com/players", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Jordan" }),
});
\`\`\`

- **Headers** carry metadata (content type, who you are).
- **Body** carries the data you're sending.

## Authentication

Most real APIs need to know *who's asking*. Common approaches:

- **API key** — a secret string you include in a header.
- **Bearer token / JWT** — a token you get after logging in and send on each request:

\`\`\`
Authorization: Bearer <your-token>
\`\`\`

## Never hard-code secrets

An **API key is a password.** If you paste it directly into your code and push to GitHub, anyone can steal it (bots scan GitHub for exactly this). Instead:

- Put secrets in **environment variables** (a \`.env\` file).
- Add \`.env\` to \`.gitignore\` so it's never committed.
- Commit a \`.env.example\` with the *names* but not the values.

\`\`\`js
const apiKey = process.env.WEATHER_API_KEY;  // read from environment, never written in code
\`\`\`

This one habit prevents a huge share of real-world security incidents. (More in Module 5.)`,
      },
    ],
    quiz: [
      {
        q: "Which HTTP method would you use to CREATE a new record?",
        options: ["GET", "POST", "DELETE", "HEAD"],
        answer: 1,
      },
      {
        q: "You get a 404 response. What does that generally mean?",
        options: [
          "Success",
          "The server crashed",
          "The thing you asked for wasn't found (a 4xx client error)",
          "You need to wait and retry",
        ],
        answer: 2,
      },
      {
        q: "What is JSON?",
        options: [
          "A programming language",
          "A readable text format for exchanging data (keys and values)",
          "A type of database",
          "A GitHub feature",
        ],
        answer: 1,
      },
      {
        q: "Where should an API key live?",
        options: [
          "Hard-coded directly in your source file",
          "In an environment variable / .env file that is gitignored",
          "In the README so teammates can find it",
          "In a comment next to the code",
        ],
        answer: 1,
      },
      {
        q: "In the client/server model, which is the 'client'?",
        options: [
          "The database",
          "The thing that receives requests",
          "The thing making the request (e.g. the browser)",
          "The API key",
        ],
        answer: 2,
      },
      {
        q: "A 500 status code usually means…",
        options: [
          "Your request was malformed",
          "You're not authorized",
          "Something went wrong on the server's side",
          "The resource moved",
        ],
        answer: 2,
      },
    ],
  },

  // ───────────────────────────────────────────────────────────── Module 4
  {
    id: "cloud",
    title: "Cloud & AWS",
    emoji: "☁️",
    estMinutes: 150,
    blurb:
      "'The cloud' is just someone else's computers you rent by the hour. Learn what the core AWS building blocks are and when to reach for each one.",
    lessons: [
      {
        id: "cloud-1",
        title: "What 'the cloud' really is",
        minutes: 50,
        body: `## Renting instead of owning

Running an app means it needs to live on a computer that's always on, connected to the internet. You *could* buy a server and keep it in a closet — but then you maintain hardware, power, cooling, and security. **Cloud providers** (AWS, Google Cloud, Azure) own giant data centers and rent you slices of their computers by the second.

Benefits:

- **No hardware to manage.**
- **Elastic:** need 100 servers for an hour? Rent them, then give them back.
- **Global:** deploy close to your users.
- **Pay for what you use.**

## AWS is the biggest

**Amazon Web Services (AWS)** is the market leader with ~200 services. That's overwhelming, so ignore 95% of it. As a new engineer you mostly need to recognize a handful of building blocks and what they're *for*.

## The two you'll meet first

- **EC2** — a rented virtual *computer* (compute).
- **S3** — cloud *storage* for files (buckets of objects).

The rest of this module dives into these two, plus a quick tour of others you'll hear in meetings.

> **Cost caution:** the cloud bills you continuously. A server left running, or storage left full, costs money 24/7. Always shut down what you're not using — and set a billing alert.`,
      },
      {
        id: "cloud-2",
        title: "EC2 — rented computers",
        minutes: 50,
        body: `## What EC2 is

**EC2 (Elastic Compute Cloud)** gives you a virtual machine — a full computer in the cloud that you control. You pick an operating system (usually Linux), a size, and AWS boots it up. You then SSH into it and it behaves like any Linux box: install Node, run your server, etc.

An EC2 machine is called an **instance**.

## Instance types & sizes

You choose how powerful the instance is:

- **t-series (e.g. t3.micro)** — small, cheap, "burstable". Great for learning, small apps, dev. The free tier includes a t2/t3.micro.
- **m-series** — balanced CPU/memory for general workloads.
- **c-series** — compute-optimized (heavy CPU work).
- **r-series** — memory-optimized (big in-memory datasets).

You don't need to memorize these — just know sizes trade **power for cost**, and you start small.

## When to use EC2

Use EC2 when you need **full control over a running server**:

- Hosting a custom back-end/API.
- Running software that must stay on continuously.
- You need a specific environment you fully control.

## When NOT to use EC2

- Just storing files? → use **S3**, not a server.
- A tiny function that runs occasionally? → **Lambda** (serverless) is cheaper and needs no management.
- You don't want to manage OS updates and scaling? → managed/serverless options.

> **Key trade-off:** EC2 = maximum control, but *you* are responsible for keeping it patched, secured, and running. That flexibility is power and burden at once.`,
      },
      {
        id: "cloud-3",
        title: "S3 & the wider AWS toolbox",
        minutes: 50,
        body: `## S3 — object storage

**S3 (Simple Storage Service)** stores **files** ("objects") in containers called **buckets**. Think of it as an infinitely large, extremely durable hard drive you access over HTTP.

Great for:

- User uploads (images, videos, PDFs).
- Static website files (HTML/CSS/JS).
- Backups and logs.
- Anything you need to store cheaply and retrieve by URL.

Each object has a **key** (its path/name) and lives in a bucket. S3 is famous for **11 nines of durability** — practically speaking, your files won't be lost.

### EC2 vs S3 — the classic distinction

- **EC2 = compute** (a computer that *runs* things).
- **S3 = storage** (a place that *holds* files). S3 can't run your code; EC2 can, but it's a pricier, worse place to dump files.

A typical app uses **both**: EC2 (or serverless) runs the API, S3 holds the uploaded images.

## Others you'll hear in meetings

You don't need depth here — just recognition:

- **Lambda** — run a function on demand without managing a server ("serverless"). Pay per execution.
- **RDS** — managed SQL databases (Postgres, MySQL) so you don't run the DB yourself.
- **DynamoDB** — managed NoSQL database.
- **CloudFront** — a CDN that caches your content globally so it loads fast.
- **IAM** — Identity & Access Management: who is allowed to do what. Security lives here.
- **Route 53** — DNS (connects domain names to your servers).

## Choosing: a quick heuristic

> Need to **run code continuously & control the box?** → EC2.
> Need to **store files?** → S3.
> Need to **run a small function occasionally?** → Lambda.
> Need a **database you don't want to babysit?** → RDS or DynamoDB.`,
      },
    ],
    quiz: [
      {
        q: "In one sentence, what is 'the cloud'?",
        options: [
          "A special kind of internet",
          "Computers and storage you rent from a provider instead of owning",
          "A backup of your laptop",
          "A programming language",
        ],
        answer: 1,
      },
      {
        q: "What is AWS EC2?",
        options: [
          "File storage in buckets",
          "A rented virtual computer (compute) you control",
          "A managed SQL database",
          "A global content cache",
        ],
        answer: 1,
      },
      {
        q: "You need to store user-uploaded profile photos. Which service fits best?",
        options: ["EC2", "S3", "IAM", "Route 53"],
        answer: 1,
      },
      {
        q: "What's the core difference between EC2 and S3?",
        options: [
          "EC2 is storage, S3 is compute",
          "EC2 is compute (runs code); S3 is storage (holds files)",
          "They're the same service",
          "EC2 is free, S3 is paid",
        ],
        answer: 1,
      },
      {
        q: "You have a tiny function that only runs when a file is uploaded. Cheapest fit?",
        options: [
          "A large EC2 instance running 24/7",
          "Lambda (serverless — pay per execution)",
          "An S3 bucket",
          "A CloudFront distribution",
        ],
        answer: 1,
      },
      {
        q: "Which is a real cost risk in the cloud?",
        options: [
          "Committing code too often",
          "Leaving servers/storage running when unused — you're billed continuously",
          "Using the free tier",
          "Writing too many comments",
        ],
        answer: 1,
      },
    ],
  },

  // ───────────────────────────────────────────────────────────── Module 5
  {
    id: "data",
    title: "Data, Databases & Secrets",
    emoji: "🗄️",
    estMinutes: 90,
    blurb:
      "Where does an app's information live, and how do you keep credentials safe? Learn the database basics and the security hygiene every engineer is expected to have.",
    lessons: [
      {
        id: "data-1",
        title: "Databases: SQL vs NoSQL",
        minutes: 30,
        body: `## Why not just use files?

Apps need to store data that persists and can be searched, updated, and shared safely by many users at once. That's a **database's** job.

## Two broad families

### SQL (relational)
Data lives in **tables** with rows and columns, like a spreadsheet, with strict structure. You query it with **SQL**.

\`\`\`sql
SELECT name FROM players WHERE active = true;
\`\`\`

- Examples: **PostgreSQL, MySQL**.
- Best when data is **structured and related** (users, orders, payments) and consistency matters.

### NoSQL (document / key-value / etc.)
Data is stored more flexibly — often as **JSON-like documents**.

\`\`\`json
{ "name": "Jordan", "positions": ["guard", "forward"], "active": true }
\`\`\`

- Examples: **MongoDB** (documents), **Redis** (key-value), **DynamoDB**.
- Best when data is **flexible or evolving**, or you need massive scale and speed over strict relationships.

## How to choose

There's no universal winner:

- **Clear structure & relationships, correctness critical** → SQL.
- **Flexible/changing shape, rapid iteration** → NoSQL (e.g. MongoDB).

*(This very onboarding app stores its users in **MongoDB** — a NoSQL document database — because the data is small and simple.)*`,
      },
      {
        id: "data-2",
        title: "CRUD & thinking in data",
        minutes: 30,
        body: `## CRUD — the four things you do to data

Every database interaction is one of four operations:

| CRUD | SQL | Meaning |
|---|---|---|
| **C**reate | INSERT | Add a new record |
| **R**ead | SELECT | Fetch records |
| **U**pdate | UPDATE | Change a record |
| **D**elete | DELETE | Remove a record |

Notice these map directly onto the **HTTP methods** from the API module (POST/GET/PUT/DELETE). That's not a coincidence — a typical API is a thin layer that turns web requests into CRUD operations on a database.

## A record ("document") in MongoDB

\`\`\`json
{
  "_id": "651a...",
  "name": "Siya",
  "email": "siya@example.com",
  "theme": "dark"
}
\`\`\`

- \`_id\` — a unique identifier every record gets.
- Fields hold the actual data.

## Thinking in data (schema design)

Before building a feature, ask: *what does one record look like, and what fields does it need?* Good data design up front prevents painful rewrites later. Keep it minimal — store only what you actually need. For example, this app stores just **name, email, and a password hash** per user. Nothing more.

## Never store raw passwords

Passwords are **never** stored as-is. You store a **hash** — a scrambled, one-way version (using bcrypt). Even if the database leaks, attackers can't read the real passwords. You'll see this exact pattern in the onboarding app's own code.`,
      },
      {
        id: "data-3",
        title: "Environment variables & secrets",
        minutes: 30,
        body: `## What counts as a secret

- Database connection strings
- API keys & tokens
- Passwords
- Anything that, if leaked, lets someone impersonate your app or read your data

## The rule: config lives outside code

Your code should be **public-safe** — you could show it to anyone without giving away access. Secrets and environment-specific settings live in **environment variables**, loaded at runtime.

### The .env pattern

\`\`\`bash
# .env  (NEVER commit this)
MONGODB_URI=mongodb+srv://user:password@cluster...
JWT_SECRET=super-long-random-string
\`\`\`

\`\`\`js
// in code — read, don't write:
const secret = process.env.JWT_SECRET;
\`\`\`

Then:

1. Add \`.env\` to **\`.gitignore\`** so it never reaches GitHub.
2. Commit a **\`.env.example\`** listing the *names* (no real values) so teammates know what to fill in.

## Why this matters so much

Leaked secrets are one of the most common real-world security failures. Bots continuously scan public GitHub for keys and exploit them within *minutes*. Treating config-as-environment isn't bureaucracy — it's the difference between a safe deploy and a 3am incident.

## Different values per environment

The same variable name can hold different values in development vs production (a test database locally, the real one in prod). Because your code only reads the *name*, it works everywhere without changes — a cornerstone of deployment-friendly apps.`,
      },
    ],
    quiz: [
      {
        q: "MongoDB is an example of which kind of database?",
        options: [
          "SQL / relational",
          "NoSQL / document",
          "A spreadsheet",
          "A cache only",
        ],
        answer: 1,
      },
      {
        q: "What does CRUD stand for?",
        options: [
          "Copy, Run, Update, Deploy",
          "Create, Read, Update, Delete",
          "Cache, Route, Upload, Download",
          "Connect, Read, Undo, Delete",
        ],
        answer: 1,
      },
      {
        q: "How should passwords be stored in a database?",
        options: [
          "As plain text so you can email them if forgotten",
          "As a one-way hash (e.g. bcrypt)",
          "In a comment in the code",
          "In the .env file",
        ],
        answer: 1,
      },
      {
        q: "Where does a database connection string with a password belong?",
        options: [
          "Hard-coded in the source file",
          "In an environment variable / .env that is gitignored",
          "In the README",
          "In the commit message",
        ],
        answer: 1,
      },
      {
        q: "You have highly structured, related data (users, orders, payments) where correctness is critical. Best fit?",
        options: [
          "A NoSQL key-value store",
          "A relational SQL database (e.g. PostgreSQL)",
          "Plain text files",
          "An S3 bucket",
        ],
        answer: 1,
      },
      {
        q: "Why commit a `.env.example` file?",
        options: [
          "To share the real secret values with the team",
          "To document which variable names exist, without exposing real values",
          "Because Git requires it",
          "To store backups of the database",
        ],
        answer: 1,
      },
    ],
  },

  // ───────────────────────────────────────────────────────────── Module 6
  {
    id: "ai-tools",
    title: "Using AI Tools Effectively",
    emoji: "🤖",
    estMinutes: 90,
    blurb:
      "AI coding assistants are now part of every engineer's workflow. Learn to use them as a force multiplier — and to avoid the traps that catch beginners.",
    lessons: [
      {
        id: "ai-tools-1",
        title: "What AI coding tools are good (and bad) at",
        minutes: 30,
        body: `## The landscape

Tools like **Claude / Claude Code, GitHub Copilot, Cursor, and ChatGPT** can read your code, explain it, write new code, find bugs, and answer questions in plain English. Used well they make you dramatically faster. Used blindly they create bugs you don't understand.

## Great uses

- **Explaining code:** "What does this function do?" — a fantastic learning accelerator.
- **Boilerplate:** forms, config files, repetitive CRUD endpoints.
- **Debugging:** paste an error message and ask what it means.
- **Learning a new tool:** "How do I make a POST request with fetch?"
- **Refactoring & naming:** "Suggest a clearer name for this variable."
- **Writing tests and docs.**

## Where they fall short

- **They can be confidently wrong** ("hallucinate") — inventing functions or facts.
- **They don't know your full context** unless you give it to them.
- **They can produce insecure or outdated code.**
- **They won't make product decisions** — that's your job.

## The mindset

Treat AI as a **fast, tireless junior pair-programmer**: brilliant for a first draft or a second opinion, but *you* are the senior who reviews, tests, and takes responsibility. **Never ship code you don't understand.**`,
      },
      {
        id: "ai-tools-2",
        title: "Prompting well",
        minutes: 30,
        body: `## Good prompts share four things

1. **Context** — what you're building, the language/framework, relevant code.
2. **The specific goal** — what you want to happen.
3. **Constraints** — style, libraries to use or avoid, edge cases.
4. **The format** — "give me just the function", "explain step by step".

### Weak vs strong

**Weak:** "make a login"

**Strong:** "In a Node/Express app using MongoDB and bcrypt, write a POST /login route that looks up the user by email, compares the password with bcrypt, and returns a JWT. Return 401 on bad credentials. Show only the route handler."

The second gets you something usable on the first try.

## Iterate in a conversation

You rarely get it perfect once. Follow up:

- "Now add input validation."
- "That errors when email is missing — handle that."
- "Explain why you used \`await\` there."

## Ask it to teach, not just do

The biggest beginner mistake is copy-pasting without learning. Add:

- "Explain each line."
- "What are the trade-offs of this approach?"
- "What could go wrong with this in production?"

You'll grow far faster and catch the AI's mistakes.`,
      },
      {
        id: "ai-tools-3",
        title: "Responsible & safe AI use",
        minutes: 30,
        body: `## Always verify

AI output is a **draft, not a source of truth.** Before using code:

- **Read it** and make sure you understand each part.
- **Run it** and test the edge cases.
- **Cross-check facts** (library names, API signatures) against real docs.

## Never paste secrets

Don't paste API keys, passwords, real customer data, or proprietary code you're not allowed to share into a third-party AI tool. Treat the chat box like a public place unless your org has an approved, private setup.

## Watch for security & licensing

- AI may suggest code with vulnerabilities (e.g. SQL injection, missing auth). Review with a security eye — everything you learned about secrets and validation still applies.
- Generated code can resemble licensed code. For anything you ship, make sure you're allowed to use it.

## Keep your own skills sharp

Use AI to **go faster on things you understand**, and to **learn things you don't** — not to skip understanding entirely. In a team, you're accountable for the code with your name on the commit. The engineers who thrive treat AI as leverage on top of real fundamentals — which is exactly what this whole onboarding is giving you.

## Team etiquette

- Be transparent when a large chunk was AI-generated, so reviewers look extra carefully.
- Still write clear commit messages and PR descriptions in *your* words.
- The quality bar for merged code is the same whether a human or an AI drafted it.`,
      },
    ],
    quiz: [
      {
        q: "What's the healthiest way to think about an AI coding assistant?",
        options: [
          "An infallible oracle — trust its output completely",
          "A fast junior pair-programmer whose work you must review and understand",
          "A replacement for learning fundamentals",
          "A tool only for experts",
        ],
        answer: 1,
      },
      {
        q: "Which is the stronger prompt?",
        options: [
          "'make a login'",
          "'fix it'",
          "'In a Node/Express + MongoDB app, write a POST /login route using bcrypt that returns a JWT and 401 on bad credentials; show only the handler'",
          "'write code'",
        ],
        answer: 2,
      },
      {
        q: "Before using AI-generated code, you should…",
        options: [
          "Ship it immediately to save time",
          "Read it, understand it, and test it",
          "Assume it's secure by default",
          "Delete your tests",
        ],
        answer: 1,
      },
      {
        q: "Which should you NOT paste into a third-party AI chat?",
        options: [
          "A generic error message",
          "A question about how fetch works",
          "Real API keys, passwords, or confidential customer data",
          "A snippet of open-source example code",
        ],
        answer: 2,
      },
      {
        q: "AI 'hallucination' refers to…",
        options: [
          "The tool running slowly",
          "The model confidently producing wrong or invented information",
          "A type of encryption",
          "A GitHub feature",
        ],
        answer: 1,
      },
    ],
  },

  // ───────────────────────────────────────────────────────────── Module 7
  {
    id: "teamwork",
    title: "Working in a Team & Shipping",
    emoji: "🚀",
    estMinutes: 120,
    blurb:
      "The final piece: how real teams organize work, communicate, and get software from a laptop into users' hands — end to end.",
    lessons: [
      {
        id: "teamwork-1",
        title: "How teams organize work (Agile basics)",
        minutes: 40,
        body: `## Why process exists

When several people build one product, you need a shared way to decide *what* to build, *who* does it, and *when it's done*. Most modern teams use a lightweight version of **Agile** — build in small increments, get feedback, adjust.

## The vocabulary you'll hear

- **Ticket / Issue** — one unit of work ("Add password reset"). Tracked in tools like **Jira, Linear, or GitHub Issues**.
- **Backlog** — the prioritized list of everything not yet done.
- **Sprint** — a short time-box (often 1–2 weeks) where the team commits to a set of tickets.
- **Standup** — a quick daily sync: *what I did, what I'm doing, what's blocking me.*
- **Retro (retrospective)** — a look back: what went well, what to improve.

## Your loop as a contributor

1. **Pick up a ticket** from the board and move it to "In Progress".
2. Create a **branch** for it.
3. Do the work; commit as you go.
4. Open a **PR**, link it to the ticket.
5. Address review feedback; get it merged.
6. Move the ticket to "Done".

## Definition of "done"

"Done" usually means more than "the code runs": it's reviewed, tested, merged, and often deployed. Agreeing on this as a team prevents the "well it worked on my machine" trap.`,
      },
      {
        id: "teamwork-2",
        title: "Communication & collaboration",
        minutes: 40,
        body: `## The skill that outranks coding

On a team, **clear communication beats raw coding speed.** A brilliant solution nobody understands, or that silently blocks a teammate, hurts the project.

## Practical habits

- **Ask early.** Stuck for more than ~30 minutes? Ask. Struggling productively is good; suffering silently for a day is not.
- **Ask well.** Share what you're trying to do, what you tried, and the exact error. "It doesn't work" wastes everyone's time; a clear question gets a fast answer.
- **Communicate status.** If you're blocked or running late on a ticket, say so *before* the deadline, not after.
- **Write things down.** Decisions in a thread or doc, not just in your head. Your teammates (and future you) will thank you.

## Working with Git as a team

- **Pull often** so your branch doesn't drift far from \`main\`.
- **Keep PRs small** — easier to review, faster to merge, fewer conflicts.
- **Resolve merge conflicts calmly:** they're normal. Git marks the clashing sections; you choose the correct combination, test, and commit.

## Giving & receiving feedback

- Reviews are about the **code, not the person.** Assume good intent.
- When you get feedback, respond to every comment — even just "done" or "good catch".
- Praise generously; critique specifically and kindly.

## Documentation

A good **README** (how to install, configure, and run the project) is a gift to every future teammate — and it's the first thing that makes a project *deployment-friendly*.`,
      },
      {
        id: "teamwork-3",
        title: "Shipping: from laptop to production",
        minutes: 40,
        body: `## The environments ladder

Code typically moves through stages before real users see it:

- **Local** — your machine.
- **Staging / preview** — a production-like environment for final testing.
- **Production** — the live app real users touch.

Environment variables (Module 5) let the *same code* behave correctly in each.

## Deployment, demystified

**Deploying** means putting your app somewhere always-on and reachable. Modern options make this easy:

- **Front-end / static sites:** Vercel, Netlify, GitHub Pages, or an **S3** bucket + CloudFront.
- **Back-ends / APIs:** Render, Railway, Fly.io, or **AWS EC2**/containers.
- **Databases:** managed services like **MongoDB Atlas** or AWS RDS.

The pattern is the same: connect your GitHub repo, set your environment variables, and the platform builds and hosts it.

## CI/CD

- **CI (Continuous Integration):** every PR automatically runs tests/checks so broken code doesn't reach \`main\`.
- **CD (Continuous Deployment):** merging to \`main\` automatically deploys the new version.

Tools like **GitHub Actions** run these pipelines. As a beginner you mostly need to know: *if the checks are red, don't merge; fix them first.*

## A deployment-friendly checklist

Bringing the whole course together, a healthy project has:

- Clear README (install + run in a couple commands)
- Secrets in env vars, \`.env\` gitignored, \`.env.example\` committed
- Small, reviewed PRs into a stable \`main\`
- Automated checks (CI) passing before merge
- One-command build/start scripts
- No \`node_modules\` or secrets committed

Hit these and *anyone* — a teammate, a new hire, a deployment platform — can pick up your project and run it. **That's the whole goal.**`,
      },
    ],
    quiz: [
      {
        q: "In Agile, what is a 'sprint'?",
        options: [
          "A single commit",
          "A short time-box (often 1–2 weeks) where the team commits to a set of work",
          "A type of server",
          "A daily code review",
        ],
        answer: 1,
      },
      {
        q: "You've been stuck on a bug for over 30 minutes on a team project. Best move?",
        options: [
          "Keep struggling silently all day",
          "Ask a teammate with a clear description of the goal, what you tried, and the error",
          "Delete the feature",
          "Merge broken code and move on",
        ],
        answer: 1,
      },
      {
        q: "What does CI (Continuous Integration) do?",
        options: [
          "Automatically writes your code",
          "Runs tests/checks on each PR so broken code doesn't reach main",
          "Stores your secrets",
          "Deletes old branches",
        ],
        answer: 1,
      },
      {
        q: "Which is NOT on the deployment-friendly checklist?",
        options: [
          "Secrets in env vars with .env gitignored",
          "Small, reviewed PRs into a stable main",
          "Committing node_modules and API keys to the repo",
          "A clear README with install + run steps",
        ],
        answer: 2,
      },
      {
        q: "What is a 'staging' environment for?",
        options: [
          "Writing code on your laptop",
          "A production-like environment for final testing before real users see it",
          "Storing backups",
          "Running the database",
        ],
        answer: 1,
      },
      {
        q: "The CI checks on your PR are red (failing). What should you do?",
        options: [
          "Merge anyway — checks are optional",
          "Fix the failing checks before merging",
          "Delete the tests",
          "Open a new PR to avoid them",
        ],
        answer: 1,
      },
    ],
  },
];

// Convenience lookups
export const moduleById = Object.fromEntries(modules.map((m) => [m.id, m]));
export const TOTAL_LESSONS = modules.reduce((n, m) => n + m.lessons.length, 0);
