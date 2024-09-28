import moment from "moment";
import getRandomInt from "../util/getRandomInt";

const mockGetReservationsByDate = (date = moment(), amount = getRandomInt()) => {
  let reservations = [];
  for (let i = 0; i<amount; i++){
    reservations.push({
      start: moment().hours(12 + i).minutes(25),
      end: moment().hours(14 + i).minutes(35),
    })
  }
  return reservations;
}

export default mockGetReservationsByDate