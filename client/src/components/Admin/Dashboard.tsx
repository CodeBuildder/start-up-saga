import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
const Dashboard = () => {
  const [value, setValue] = useState<string | null>("");
  const [calendarView, setCalendarView] = useState(false);

  return (
    <div>
      {calendarView === false ? (
        <h1 onClick={() => setCalendarView(true)}>SELECT DATE</h1>
      ) : (
        <DatePicker
          value={value}
          multiple={true}
          placeholder="SELECT DATE"
          id="date-picker"
          format="DD/MM/YYYY"
        />
      )}

      <button
        onClick={() =>
          setValue(
            document
              .getElementsByClassName("rmdp-input")[0]
              .getAttribute("value")
          )
        }
      >
        SAVE DATES
      </button>
      <button onClick={() => console.log(value?.split(" "))}>CALC</button>
    </div>
    //   ) : (
    //     <Redirect to="/" />
    //   )}
    // </>
  );
};
export default Dashboard;
