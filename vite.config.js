import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Chuyển tiếp các yêu cầu bắt đầu bằng /api đến server MoMo
      '/api': {
        target: 'https://business.momo.vn', // URL của server đích (backend API)
        changeOrigin: true, // Đặt là true để ngụy trang thành source của backend
        rewrite: (path) => path.replace(/^\/api/, ''), // Xóa tiền tố /api
        secure: false, // Nếu server đích sử dụng HTTPS và có chứng chỉ tự ký (không cần khi dùng chứng chỉ hợp lệ)
      },
    },
  },
});
