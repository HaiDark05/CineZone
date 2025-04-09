export const getOjectById = (data, id) => {
    
    return data?.find(e => e.id === id);
};

export const filterListById = (data,id,title) => {

    return data?.filter(e => e[title] === id);
}

export const getNowShowingMovies = (data) => {
    const today = new Date(); // Lấy ngày hôm nay
    const threeDaysLater = new Date();
    threeDaysLater.setDate(today.getDate() + 3); // Ngày sau 3 ngày

    return data.filter(e => {
        const releaseDate = new Date(e.release_date);
        return releaseDate >= today && releaseDate <= threeDaysLater;
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