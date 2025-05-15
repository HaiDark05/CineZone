export const getOjectById = (data, id) => {
    
    return data?.find(e => e.id === id);
};

export const filterListById = (data,id,title) => {

    return data?.filter(e => e[title] === id);
}

export const getNowShowingMovies = (data) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Chuẩn hóa ngày sau 3 ngày
  const threeDaysLater = new Date(today);
  threeDaysLater.setDate(today.getDate() + 3);

  return data.filter(e => {
    const releaseDate = new Date(e.release_date);
    releaseDate.setHours(0, 0, 0, 0);

    return releaseDate >= today && releaseDate <= threeDaysLater;
  });
};

export const getUpcomingMovies = (data) => {
  // Chuẩn hóa ngày hiện tại về 00:00:00
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Tính ngày bắt đầu từ sau 3 ngày
  const afterThreeDays = new Date(today);
  afterThreeDays.setDate(today.getDate() + 4); // bắt đầu từ ngày thứ 4

  return data.filter(e => {
    const releaseDate = new Date(e.release_date);
    releaseDate.setHours(0, 0, 0, 0);

    return releaseDate >= afterThreeDays;
  });
};


export const getWeekRange = () => {
    return Array.from({ length: 7 }, (_, i) => {
        const day = new Date();
        day.setDate(day.getDate() + i - 3); // Lấy 3 ngày trước và 3 ngày sau

        return {
            weekday: day.toLocaleDateString("vi-VN", { weekday: "long" }),
            date: day.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })
        };
    });
};

export const formatFirebaseDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
};

export const formatFirebaseDateTime = (timestamp) => {
    return new Date(timestamp).toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour12: false,
    });
  };
  
export const dayNow = (screen) => {
  const today = new Date();
  const releaseDate = new Date(screen.release_date);

  // Đặt giờ về 0 để chỉ so sánh theo ngày
  today.setHours(0, 0, 0, 0);
  releaseDate.setHours(0, 0, 0, 0);

  return today.getTime() === releaseDate.getTime(); // so sánh số timestamp
};
