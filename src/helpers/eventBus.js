const listeners = {};

const eventBus = {
  // Đăng ký sự kiện
  on(event, callback) {
    if (!listeners[event]) {
      listeners[event] = [];
    }
    listeners[event].push(callback);
  },
  
  // Hủy đăng ký sự kiện
  off(event, callback) {
    if (!listeners[event]) return;
    const index = listeners[event].indexOf(callback);
    if (index > -1) {
      listeners[event].splice(index, 1);
    }
  },
  
  // Phát ra sự kiện
  emit(event, data) {
    if (!listeners[event]) return;
    listeners[event].forEach(callback => callback(data));
  }
};

export default eventBus;