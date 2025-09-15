import { toast } from "react-toastify";


export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

// chuyển từ "2025-06-14T14:18:33.664Z" thành June 14, 2025
export const formatDateToString = (date) => {
  const d = new Date(date);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return d.toLocaleDateString('en-US', options);
}


export const formatTimeMinute = (time) => {
  if (isNaN(time)) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString()}:${seconds.toString().padStart(2, "0")}`;
}

export const resizeImage = (img, width) => {
  return img.replace('upload/', `upload/c_limit,w_${width}/f_auto/`);
}

export const showToast = (message, type = "success") => {
  const theme = localStorage.getItem("vite-ui-theme") || "light"
  message = capitalizeFirstLetter(message);
  toast[type](message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme,
  });
}

// Lấy chữ cái đầu của họ (từ đầu tiên) và tên (từ cuối cùng)
export const getAvatarFallback = (name) => {
  if (!name || typeof name !== 'string') return '';

  const words = name.trim().split(/\s+/);
  if (words.length === 0) return '';

  const first = words[0][0].toUpperCase();
  const last = words.length > 1 ? words[words.length - 1][0].toUpperCase() : '';

  return first + last;
}

// hàm tách phần nghìn của số bởi dấu chấm
export const formatNumberWithDots = (number) => {
  if (isNaN(number)) return number;
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// hàm phân tích file LRC thành mảng các dòng lời bài hát
export const parseLRC = (lrcText) => {
  const lines = lrcText.split('\n');
  const lyricsArray = [];
  const regex = /^\[(?<time>\d{2}:\d{2}\.\d{2})\](?<text>.*)/;

  for (const line of lines) {
    const match = line.match(regex);
    if (match) {
      const { time, text } = match.groups;
      const [minutes, seconds] = time.split(':');
      const totalSeconds = parseInt(minutes) * 60 + parseFloat(seconds);
      lyricsArray.push({ time: totalSeconds, text: text.trim() });
    }
  }
  return lyricsArray;
};

export async function copyToClipboard(text) {
  const domain = window.location.origin + "/";
  try {
    await navigator.clipboard.writeText(domain + text);
    showToast("Copied to clipboard", "success");
  } catch {
    showToast("Failed to copy to clipboard", "error");
  }
}