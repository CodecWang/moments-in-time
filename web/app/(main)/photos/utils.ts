import { GroupBy } from "@/enums";

export function groupPhotoByDate(rawPhotos: Photo[], groupBy?: GroupBy) {
  if (!groupBy || groupBy === GroupBy.NoGroup) {
    return [
      {
        title: "",
        photos: rawPhotos,
      },
    ];
  }

  const groupedPhotos = rawPhotos.reduce(
    (acc: { [key: string]: Photo[] }, photo) => {
      const dateObj = new Date(photo.shotTime);

      let options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      };

      switch (groupBy) {
        case GroupBy.Year:
          options = { year: "numeric" };
          break;
        case GroupBy.Month:
          options = { year: "numeric", month: "short" };
          break;
        case GroupBy.Day:
        default:
          break;
      }

      const date = dateObj.toLocaleDateString("en-US", options);

      if (!acc[date]) acc[date] = [];
      acc[date].push(photo);
      return acc;
    },
    {},
  );

  return Object.keys(groupedPhotos).map((date) => ({
    title: date,
    photos: groupedPhotos[date],
  }));
}
