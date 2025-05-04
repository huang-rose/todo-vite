import { useState, useEffect } from 'react';
import './App.css';
import Task from './Task';
import Modal from './Modal';
import { saveProjects, loadProjects } from './storage';

function App() {
  const [projects, setProjects] = useState(() => {
    const saved = loadProjects();
    return saved.length > 0 ? saved : [{ name: 'Inbox', tasks: [] }];
  });

  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: '1',
  });

  const tasks = projects[currentProjectIndex].tasks;

  useEffect(() => {
    saveProjects(projects);
  }, [projects]);

  // 新增任務
  function addTask() {
    if (formData.title.trim() === '') return;
    const newTask = new Task(
      formData.title,
      formData.description,
      formData.dueDate,
      formData.priority
    );
    const updatedProjects = [...projects];
    updatedProjects[currentProjectIndex].tasks.push(newTask);
    setProjects(updatedProjects);
    setIsModalOpen(false);
    setFormData({ title: '', description: '', dueDate: '', priority: '1' });
  }
  // 勾選任務完成/取消
function toggleTaskDone(taskIndex) {
  const updatedProjects = [...projects];
  const task = updatedProjects[currentProjectIndex].tasks[taskIndex];
  task.completed = !task.completed;
  setProjects(updatedProjects);
}

// 刪除任務
function deleteTask(taskIndex) {
  const updatedProjects = [...projects];
  updatedProjects[currentProjectIndex].tasks.splice(taskIndex, 1);
  setProjects(updatedProjects);
}


  // 呼叫 Bored API 新增任務
  async function fetchBoredActivity() {
    try {
      const res = await fetch('https://bored.api.lewagon.com/api/activity');
      const data = await res.json();
      const randomPriority = Math.floor(Math.random() * 4) + 1;
      const newTask = new Task(data.activity, '', '', String(randomPriority));
      const updatedProjects = [...projects];
      updatedProjects[currentProjectIndex].tasks.push(newTask);
      setProjects(updatedProjects);
    } catch (err) {
      console.error('API 呼叫失敗:', err);
    }
  }

  // 新增專案
  function addProject() {
    const name = prompt('輸入新專案名稱：');
    if (!name) return;
    const newProjects = [...projects, { name, tasks: [] }];
    setProjects(newProjects);
    setCurrentProjectIndex(newProjects.length - 1);
  }

  return (
    <div className="App" style={{ display: 'flex' }}>
      {/* 左側欄 */}
      <aside className="sidebar">
        <h2>專案</h2>
        <ul>
          {projects.map((project, index) => (
            <li
              key={index}
              style={{
                fontWeight: index === currentProjectIndex ? 'bold' : 'normal',
                cursor: 'pointer',
              }}
              onClick={() => setCurrentProjectIndex(index)}
            >
              {index === currentProjectIndex ? '➤ ' : ''}{project.name}
            </li>
          ))}
        </ul>
        <button onClick={addProject}>New Project</button>
      </aside>

      {/* 右側主區域 */}
      <main style={{ flex: 1, padding: '1rem' }}>
        <h1>Todo List - {projects[currentProjectIndex].name}</h1>

        <div style={{ marginBottom: '1rem' }}>
  <button onClick={() => setIsModalOpen(true)}>新增任務</button>
  <button onClick={fetchBoredActivity} style={{ marginLeft: '0.5rem' }}>
    無聊按鈕
  </button>
</div>

<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onSubmit={addTask}
  formData={formData}
  setFormData={setFormData}
/>


        {tasks.map((task, index) => (
        <div className="task-item" key={index}>
        <div className="task-content">
        <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTaskDone(index)}
      />
      <span className={`priority-dot priority-${task.priority}`}></span>
      <div className="task-text">
        <div style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          {task.title}
        </div>
        <span>{task.dueDate}{task.description ? `, ${task.description}` : ''}</span>
      </div>
    </div>
    <button className="task-delete" onClick={() => deleteTask(index)}>
      🗑️
    </button>
      </div>
    ))}

      </main>
    </div>
  );
}

export default App;
