import { Box, Heading } from "@chakra-ui/react";
import Countdown, { zeroPad } from "react-countdown";
const unixTimeEndOfDay = Math.floor(
  new Date(new Date().toUTCString().substring(0, 25)).setHours(23, 59, 59, 999),
);

export const Prize: React.FC = () => {
  return (
    <>
      <Heading as="h2" fontSize={"2rem"} mb={4}>
        Prize: $2,000
      </Heading>
      <Box mb={10}>
        <Countdown
          date={unixTimeEndOfDay}
          zeroPadTime={2}
          renderer={({ hours, minutes, seconds, completed }) => {
            if (completed) {
              // Render a completed state
              return <span>Round Ended, go to ... to check if you win this round</span>;
            } else {
              // Render a countdown
              return (
                <Heading as="h1" className="countdown" style={{ fontSize: 20 }}>
                  🔥 {"Ends In: "}
                  <span className="number">{zeroPad(hours)}</span>
                  <span className="label">Hours</span>
                  {" : "}
                  <span className="number">{zeroPad(minutes)}</span>
                  <span className="label">Minutes</span>
                  {" : "}
                  <span className="number">{zeroPad(seconds)}</span>
                  <span className="label">Seconds</span>
                  🔥
                </Heading>
              );
            }
          }}
        ></Countdown>
      </Box>
    </>
  );
};
