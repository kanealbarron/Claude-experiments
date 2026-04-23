export const COLUMNS = [
  { id: 'name',       label: 'Name',        type: 'text',    visible: true,  width: 200 },
  { id: 'status',     label: 'Status',      type: 'select',  visible: true,  width: 140 },
  { id: 'priority',   label: 'Priority',    type: 'select',  visible: true,  width: 120 },
  { id: 'assignee',   label: 'Assignee',    type: 'text',    visible: true,  width: 150 },
  { id: 'dueDate',    label: 'Due Date',    type: 'date',    visible: true,  width: 130 },
  { id: 'progress',   label: 'Progress',    type: 'number',  visible: true,  width: 110 },
  { id: 'tags',       label: 'Tags',        type: 'tags',    visible: true,  width: 200 },
  { id: 'category',   label: 'Category',    type: 'select',  visible: false, width: 140 },
  { id: 'createdBy',  label: 'Created By',  type: 'text',    visible: false, width: 150 },
];

export const STATUS_OPTIONS  = ['Not Started', 'In Progress', 'Review', 'Done', 'Blocked'];
export const PRIORITY_OPTIONS = ['Low', 'Medium', 'High', 'Critical'];
export const CATEGORY_OPTIONS = ['Engineering', 'Design', 'Marketing', 'Product', 'Legal'];

const TAGS_POOL = ['frontend', 'backend', 'urgent', 'bug', 'feature', 'research', 'docs', 'api'];

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function pickTags() {
  const count = Math.floor(Math.random() * 3) + 1;
  return [...new Set(Array.from({ length: count }, () => pickRandom(TAGS_POOL)))];
}
function randomDate() {
  const d = new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
  return d.toISOString().split('T')[0];
}

const NAMES = [
  'Redesign landing page', 'Fix login bug', 'Write unit tests', 'Deploy to staging',
  'API rate limit investigation', 'Onboarding flow revamp', 'Set up CI pipeline',
  'Customer interview synthesis', 'Update design system', 'Performance audit',
  'Accessibility review', 'Mobile responsive fixes', 'SEO optimisation',
  'Data migration script', 'OAuth integration', 'Dashboard analytics',
  'Email template update', 'Payment gateway refactor', 'Docs portal launch',
  'Beta feedback triage',
];

const ASSIGNEES = ['Alice Chen', 'Bob Kim', 'Carol Wu', 'Dan Lee', 'Eve Martin', 'Frank Ng'];

export const ROWS = NAMES.map((name, i) => ({
  id: i + 1,
  name,
  status:    pickRandom(STATUS_OPTIONS),
  priority:  pickRandom(PRIORITY_OPTIONS),
  assignee:  pickRandom(ASSIGNEES),
  dueDate:   randomDate(),
  progress:  Math.floor(Math.random() * 101),
  tags:      pickTags(),
  category:  pickRandom(CATEGORY_OPTIONS),
  createdBy: pickRandom(ASSIGNEES),
}));
