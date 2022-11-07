const API_URL =
  "https://ie35rr9hl9.execute-api.us-east-1.amazonaws.com/beta/add-new-entry";

async function addEntryToDatabase(raceName, stickNumber, time) {
  console.log("Running addEntryToDatabase");
  console.log(raceName, stickNumber, time);

  try {
    const requestData = {
      raceName: raceName,
      stickNumber: stickNumber,
      time: time,
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (response.status !== 200) {
      alert(
        `There has been a server error (${response.status}). Please try again.`
      );
      return;
    }

    const data = await response.json();

    if (data.result !== "success") {
      alert(`${data.message}. Please try again.`);
      return;
    }
  } catch (error) {
    console.error(error);
    addEntryToDatabase(raceName, stickNumber, time);
  }
}

export default addEntryToDatabase;
