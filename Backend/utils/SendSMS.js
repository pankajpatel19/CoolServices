import axios from "axios";

const SendSMS = async (booking) => {
  try {
    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "q",
        sender_id: "FSTSMS",
        message:
          "Hi {#var#}, your {#var#} service is booked for {#var#} at {#var#}.",
        variables_values: `${booking.name},${booking.appliance},${booking.date},${booking.time}`,
        schedule_time: "",
        flash: 0,
        numbers: booking.phone.toString(),
      },
      {
        headers: {
          authorization: process.env.F2S_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("SMS sent ...", response.data);
  } catch (error) {
    console.log("SMS Error", error.response?.data || error.message);
  }
};

export default SendSMS;
