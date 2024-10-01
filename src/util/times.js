import moment from "moment"

export const getScheduleString = (object = {start: "12:00:00", start: "15:00:00"}) => {
  return `${moment(object.start, "HH:mm:ss").format("HH:mm")} - ${moment(object.end, "HH:mm:ss").format("HH:mm")}`
}