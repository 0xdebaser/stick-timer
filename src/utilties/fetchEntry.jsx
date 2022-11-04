const API_URL =
  "https://ie35rr9hl9.execute-api.us-east-1.amazonaws.com/beta/fetch-entry";

async function fetchEntry(raceName, stickNumber) {
  console.log("Running fetchEntry");
  console.log(raceName, stickNumber);

  try {
    const requestData = {
      raceName: raceName,
      stickNumber: stickNumber,
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

    return data;
  } catch (error) {
    console.error(error);
  }
}

export default fetchEntry;
