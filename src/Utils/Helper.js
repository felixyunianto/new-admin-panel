import dayjs from "dayjs";

export const dateFormat = (date, format) => {
    return dayjs(date).format(format);
};
