const API_URL =
  "https://ie35rr9hl9.execute-api.us-east-1.amazonaws.com/beta/write-edited-entry";

async function writeEditedEntry(raceName, stickNumber, name, distance, gender) {
  console.log("Running writeEditedEntry");

  try {
    const requestData = {
      raceName: raceName,
      stickNumber: stickNumber,
      name: name,
      distance: distance,
      gender: gender,
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
      return null;
    }

    const data = await response.json();

    if (data.result !== "success") {
      alert(`${data.message}. Please try again.`);
      return null;
    } else if (data.hasOwnProperty("entry")) {
      return data.entry;
    } else return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default writeEditedEntry;
