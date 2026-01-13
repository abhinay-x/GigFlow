import { useEffect, useMemo, useRef, useState } from 'react';
import { X, Send, Pencil, Trash2, Check, Ban } from 'lucide-react';
import Button from './Button';

export default function ChatDrawer({
  isOpen,
  onClose,
  title,
  loading,
  messages,
  currentUserId,
  onSend,
  onEdit,
  onDelete
}) {
  const [text, setText] = useState('');
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const endRef = useRef(null);

  const orderedMessages = useMemo(() => messages || [], [messages]);

  useEffect(() => {
    if (!isOpen) return;
    setText('');
    setEditingMessageId(null);
    setEditingText('');
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [isOpen, orderedMessages.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await onSend(text.trim());
    setText('');
  };

  const startEdit = (message) => {
    setEditingMessageId(message._id);
    setEditingText(message.text || '');
  };

  const cancelEdit = () => {
    setEditingMessageId(null);
    setEditingText('');
  };

  const submitEdit = async (messageId) => {
    if (!editingText.trim()) return;
    if (onEdit) {
      await onEdit(messageId, editingText.trim());
    }
    cancelEdit();
  };

  const submitDelete = async (messageId) => {
    if (!onDelete) return;
    const ok = window.confirm('Delete this message?');
    if (!ok) return;
    await onDelete(messageId);
    if (editingMessageId === messageId) {
      cancelEdit();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      <aside className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white dark:bg-gray-800 shadow-xl border-l border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Bid conversation</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close"
          >
            <X className="text-gray-700 dark:text-gray-300" size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {loading ? (
            <p className="text-sm text-gray-600 dark:text-gray-400">Loading messages...</p>
          ) : orderedMessages.length === 0 ? (
            <p className="text-sm text-gray-600 dark:text-gray-400">No messages yet. Say hello.</p>
          ) : (
            orderedMessages.map((m) => {
              const mine = m.senderId?._id === currentUserId || m.senderId === currentUserId;
              const isEditing = editingMessageId === m._id;
              return (
                <div key={m._id} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
                  <div className="max-w-[80%]">
                    <div
                      className={`rounded-2xl px-4 py-2 text-sm leading-relaxed border ${
                        mine
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600'
                      }`}
                    >
                      {isEditing ? (
                        <div className="space-y-2">
                          <textarea
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            rows={3}
                            className={`w-full px-3 py-2 rounded-lg outline-none resize-none border ${
                              mine
                                ? 'bg-white/10 border-white/20 text-white placeholder:text-white/70'
                                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white'
                            }`}
                          />
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={cancelEdit}
                              className={`p-2 rounded-lg transition-colors ${
                                mine ? 'hover:bg-white/10' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                              }`}
                              aria-label="Cancel edit"
                            >
                              <Ban size={16} className={mine ? 'text-white' : 'text-gray-700 dark:text-gray-200'} />
                            </button>
                            <button
                              type="button"
                              onClick={() => submitEdit(m._id)}
                              className={`p-2 rounded-lg transition-colors ${
                                mine ? 'hover:bg-white/10' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                              }`}
                              aria-label="Save edit"
                            >
                              <Check size={16} className={mine ? 'text-white' : 'text-gray-700 dark:text-gray-200'} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="whitespace-pre-wrap">{m.text}</div>
                      )}

                      <div className={`mt-1 text-[11px] ${mine ? 'text-white/80' : 'text-gray-500 dark:text-gray-300'}`}>
                        {m.senderId?.name || ''}
                        {m.editedAt ? ' • edited' : ''}
                      </div>
                    </div>

                    {mine && !isEditing && (onEdit || onDelete) && (
                      <div className="mt-1 flex items-center justify-end gap-2">
                        {onEdit && (
                          <button
                            type="button"
                            onClick={() => startEdit(m)}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Edit message"
                          >
                            <Pencil size={16} className="text-gray-700 dark:text-gray-200" />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            type="button"
                            onClick={() => submitDelete(m._id)}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Delete message"
                          >
                            <Trash2 size={16} className="text-gray-700 dark:text-gray-200" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
          <div ref={endRef} />
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
            />
            <Button type="submit" disabled={!text.trim()} className="flex items-center gap-2">
              <Send size={16} />
              Send
            </Button>
          </div>
        </form>
      </aside>
    </div>
  );
}
