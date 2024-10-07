import moment from "moment"

export const getHHssString = (time = "12:00:00") => {
  return moment(time, "HH:mm:ss").format("HH:mm");
}

export const getScheduleString = (object = {start: "12:00:00", end: "15:00:00"}) => {
  return `${getHHssString(object.start)} - ${getHHssString(object.end)}`
}

export const sortAsc = (momentA, momentB) => {
  return moment(momentA).diff(moment(momentB))
}