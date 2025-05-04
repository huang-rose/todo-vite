import './Modal.css';

export default function Modal({ isOpen, onClose, onSubmit, formData, setFormData }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>新增任務</h2>
        <input
          type="text"
          placeholder="任務標題"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="任務說明"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <input
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
        />
        <select
          value={formData.priority}
          onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
        >
          <option value="1">Priority 1</option>
          <option value="2">Priority 2</option>
          <option value="3">Priority 3</option>
          <option value="4">Priority 4</option>
        </select>
        <div className="modal-buttons">
          <button onClick={onSubmit}>確定</button>
          <button onClick={onClose}>取消</button>
        </div>
      </div>
    </div>
  );
}
